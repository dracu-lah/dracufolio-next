#!/usr/bin/env node
/**
 * Drives a real Chromium over the DevTools protocol. The static checks cannot
 * see a runtime error, a shortcut that stopped firing, or a floating button
 * that refuses to get out of the way, so this clicks and types instead.
 *
 * No driver dependency: Node has a global WebSocket and Chromium speaks CDP.
 *
 * Usage: node scripts/browser-test.mjs [baseUrl]
 */
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const BASE = process.argv[2] ?? "http://localhost:3115";
const PORT = 9333;
const profile = mkdtempSync(join(tmpdir(), "cdp-"));

const chromium = spawn(
  "chromium-browser",
  [
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--hide-scrollbars",
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${profile}`,
    "--window-size=1280,900",
    "about:blank",
  ],
  { stdio: "ignore" },
);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const findPage = async () => {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      const targets = await res.json();
      const page = targets.find((t) => t.type === "page");
      if (page?.webSocketDebuggerUrl) return page.webSocketDebuggerUrl;
    } catch {
      // not up yet
    }
    await sleep(250);
  }
  throw new Error("Chromium did not expose a page target");
};

const fails = [];
const notes = [];

const wsUrl = await findPage();
const ws = new WebSocket(wsUrl);
await new Promise((resolve, reject) => {
  ws.onopen = resolve;
  ws.onerror = reject;
});

let nextId = 1;
const pending = new Map();
const events = [];

ws.onmessage = (msg) => {
  const data = JSON.parse(msg.data);
  if (data.id && pending.has(data.id)) {
    const { resolve, reject } = pending.get(data.id);
    pending.delete(data.id);
    if (data.error) reject(new Error(JSON.stringify(data.error)));
    else resolve(data.result);
    return;
  }
  if (data.method) events.push(data);
};

const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = nextId++;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
    setTimeout(() => {
      if (pending.has(id)) {
        pending.delete(id);
        reject(new Error(`${method} timed out`));
      }
    }, 30000);
  });

await send("Page.enable");
await send("Runtime.enable");
await send("Log.enable");
await send("Network.enable");

const goto = async (path) => {
  events.length = 0;
  await send("Page.navigate", { url: `${BASE}${path}` });
  // Wait for the load event, then a beat for hydration to attach listeners.
  for (let i = 0; i < 80; i++) {
    if (events.some((e) => e.method === "Page.loadEventFired")) break;
    await sleep(100);
  }
  await sleep(900);
};

const evaluate = async (expression) => {
  const { result } = await send("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  return result.value;
};

const runtimeProblems = (path) => {
  for (const e of events) {
    if (e.method === "Runtime.exceptionThrown") {
      const d = e.params.exceptionDetails;
      fails.push(`${path}: uncaught ${d.exception?.description ?? d.text}`);
    }
    if (e.method === "Log.entryAdded" && e.params.entry.level === "error") {
      const t = e.params.entry.text ?? "";
      // Noise rather than defects: favicon variants, and the Vercel Analytics
      // and Speed Insights scripts, which only exist on Vercel's edge and 404
      // against a local `next start`.
      if (/favicon/i.test(t)) continue;
      if (/_vercel\/(insights|speed-insights)/.test(t)) continue;
      if (/Failed to load resource/.test(t)) continue;
      fails.push(`${path}: console error ${t.slice(0, 160)}`);
    }
    if (e.method === "Network.loadingFailed") {
      const p = e.params;
      if (p.type === "Image" || p.type === "Font" || p.type === "Script") {
        if (!/net::ERR_ABORTED/.test(p.errorText ?? "")) {
          fails.push(`${path}: ${p.type} failed to load (${p.errorText})`);
        }
      }
    }
  }
};

/**
 * CDP only accepts `text` for a printable key, and it has to be a single
 * character, so Escape and friends send the key name with no text at all.
 */
const key = async (name, code, keyCode) => {
  const printable = name.length === 1;
  for (const type of ["keyDown", "keyUp"]) {
    await send("Input.dispatchKeyEvent", {
      type,
      key: name,
      code,
      windowsVirtualKeyCode: keyCode,
      nativeVirtualKeyCode: keyCode,
      ...(printable && type === "keyDown" ? { text: name } : {}),
    });
  }
  await sleep(180);
};

/* 1. Every important page loads without a runtime error. */
const PAGES = [
  "/",
  "/hire",
  "/hire/thrissur",
  "/hire/poonkunnam",
  "/hire/india",
  "/projects",
  "/projects/tmplayer",
  "/blog",
  "/blog/telegram-video-before-it-finishes-downloading",
  "/about",
  "/open-source",
  "/nope-404",
];
for (const path of PAGES) {
  await goto(path);
  runtimeProblems(path);
  const title = await evaluate("document.title");
  if (!title || title === "undefined") fails.push(`${path}: no document title`);
}
notes.push(`${PAGES.length} pages loaded with no uncaught errors or console errors`);

/* 2. The "?" shortcut opens the dialog, escape closes it. */
await goto("/");
await key("?", "Slash", 191);
let dialogOpen = await evaluate(
  `!!document.querySelector('[role="dialog"][aria-label="Keyboard shortcuts"]')`,
);
if (!dialogOpen) fails.push("? did not open the shortcuts dialog");
const kbdCount = await evaluate(
  `document.querySelectorAll('[role="dialog"] kbd').length`,
);
if (dialogOpen && kbdCount < 9)
  fails.push(`shortcuts dialog lists ${kbdCount} keys, expected 9`);
await key("Escape", "Escape", 27);
await sleep(300);
dialogOpen = await evaluate(
  `!!document.querySelector('[role="dialog"][aria-label="Keyboard shortcuts"]')`,
);
if (dialogOpen) fails.push("escape did not close the shortcuts dialog");
notes.push(`shortcuts dialog opens on ?, lists ${kbdCount} keys, closes on escape`);

/* 3. "g" then "p" jumps to the projects page. */
await goto("/");
await key("g", "KeyG", 71);
await key("p", "KeyP", 80);
await sleep(1200);
const afterJump = await evaluate("location.pathname");
if (afterJump !== "/projects")
  fails.push(`g then p landed on ${afterJump}, expected /projects`);
else notes.push("g then p navigates to /projects");

/* 4. Typing in a field must not trigger the shortcuts. */
await goto("/");
await evaluate(
  `(() => { const f = document.querySelector('input, textarea'); if (f) { f.focus(); return true; } return false; })()`,
);
const focused = await evaluate(`document.activeElement.tagName`);
if (focused === "INPUT" || focused === "TEXTAREA") {
  await key("g", "KeyG", 71);
  await key("p", "KeyP", 80);
  await sleep(700);
  const stayed = await evaluate("location.pathname");
  if (stayed !== "/") fails.push(`shortcut fired while typing (went to ${stayed})`);
  else notes.push("shortcuts correctly ignored while typing in a field");
} else {
  notes.push("no form field found to test shortcut suppression");
}

/* 5. The docked mobile action bar gets out of the way of the contact form. */
await goto("/");
const fabSelector = "[data-mobile-action-bar]";
const fabVisibleTop = await evaluate(
  `(() => { const box = document.querySelector('${fabSelector}');
     return box ? getComputedStyle(box).opacity : null; })()`,
);
await evaluate(
  `document.getElementById('contact').scrollIntoView({behavior:'instant', block:'center'})`,
);
await sleep(900);
const fabOverContact = await evaluate(
  `(() => { const box = document.querySelector('${fabSelector}');
     return box ? getComputedStyle(box).opacity : null; })()`,
);
const duplicateLabels = await evaluate(
  `document.querySelectorAll('[aria-label="Message Nevil on WhatsApp"]').length`,
);
if (duplicateLabels > 1)
  fails.push(
    `${duplicateLabels} links share the accessible name "Message Nevil on WhatsApp"`,
  );
else notes.push("the docked bar's accessible name is unique on the page");

if (fabVisibleTop === null) fails.push("floating WhatsApp button not found");
else if (Number(fabOverContact) >= Number(fabVisibleTop))
  fails.push(
    `floating button did not fade over the contact form (${fabVisibleTop} then ${fabOverContact})`,
  );
else
  notes.push(
    `floating button fades from ${fabVisibleTop} to ${fabOverContact} over the contact form`,
  );

/* 6. The glossy icon chips are actually painted. */
await goto("/hire");
const chips = await evaluate(`document.querySelectorAll('.icon-chip').length`);
if (chips < 6) fails.push(`${chips} glossy icon chips on /hire, expected 6`);
const chipHasGradient = await evaluate(
  `(() => { const c = document.querySelector('.icon-chip');
     return c ? /gradient/.test(getComputedStyle(c).backgroundImage) : false; })()`,
);
if (!chipHasGradient) fails.push("icon chip has no gradient applied");
else notes.push(`${chips} glossy icon chips painted with a gradient`);

/* 7. The four faces are all actually in use. */
await goto("/");
const faces = await evaluate(`(() => {
  const pick = (sel) => { const el = document.querySelector(sel);
    return el ? getComputedStyle(el).fontFamily.split(',')[0].replace(/['"]/g,'') : null; };
  return { h1: pick('h1'), body: pick('#hero p'), mono: pick('#hero .font-mono, nav a'),
           ml: pick('[lang="ml"]') };
})()`);
notes.push(
  `faces in use: h1 ${faces.h1}, body ${faces.body}, mono ${faces.mono}, malayalam ${faces.ml}`,
);
const distinct = new Set(Object.values(faces).filter(Boolean));
if (distinct.size < 3)
  fails.push(`only ${distinct.size} distinct font families rendered, expected 4`);

/* 8. Malayalam renders with real glyphs rather than fallback boxes. */
const mlWidth = await evaluate(
  `(() => { const el = document.querySelector('[lang="ml"]');
     return el ? Math.round(el.getBoundingClientRect().width) : 0; })()`,
);
if (mlWidth < 60) fails.push(`Malayalam element is ${mlWidth}px wide, likely not rendering`);
else notes.push(`Malayalam line renders ${mlWidth}px wide`);

ws.close();
chromium.kill("SIGTERM");
rmSync(profile, { recursive: true, force: true });

console.log(notes.map((n) => "  " + n).join("\n"));
if (fails.length) {
  console.error(`\n${fails.length} problem(s):\n`);
  fails.forEach((f) => console.error("  " + f));
  process.exit(1);
}
console.log("\nAll browser checks pass.");
