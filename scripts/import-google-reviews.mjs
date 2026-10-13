#!/usr/bin/env node
/**
 * Copies the reviews on my Google Business Profile into
 * app/data/google-reviews.json, so the site can show them without calling
 * Google on every request.
 *
 *   pnpm reviews:import
 *
 * It opens a real, visible Chromium window with its own profile in
 * ~/.config/dracufolio-reviews. Signed out, Maps shows a "limited view" with
 * no reviews in it, so the first run waits while you sign in to Google in
 * that window; later runs reuse the session. It reads the page the way you
 * would, once, on your own machine, about your own profile. It does not run
 * on the server, in CI, or on a schedule, and it never tries to get past a
 * robot check: if Google shows one, solve it in the window or try later.
 *
 * Maps renames its CSS classes from time to time. When the import finds no
 * reviews, the selectors below are the first thing to check.
 *
 * Existing reviews keep the date they were first imported, because Maps only
 * says "3 weeks ago" and that gets less precise every week.
 */
import { spawn } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const FILE = "app/data/google-reviews.json";
const PROFILE = join(homedir(), ".config", "dracufolio-reviews");
const PORT = 9366;

const current = JSON.parse(readFileSync(FILE, "utf8"));
const url = `${current.profileUrl}&hl=en`;

mkdirSync(PROFILE, { recursive: true });
const chromium = spawn(
  "chromium-browser",
  [
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${PROFILE}`,
    "--lang=en-US",
    "--window-size=1280,1000",
    url,
  ],
  { stdio: "ignore" },
);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let page;
for (let i = 0; i < 80 && !page; i++) {
  try {
    const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
    page = list.find((p) => p.type === "page" && p.url.includes("google"));
  } catch {}
  await sleep(250);
}
if (!page) {
  console.error("Chromium did not open the profile page.");
  chromium.kill();
  process.exit(1);
}

const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0;
const pending = new Map();
ws.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg.result);
    pending.delete(msg.id);
  }
};
const send = (method, params = {}) =>
  new Promise((resolve) => {
    const n = ++id;
    pending.set(n, resolve);
    ws.send(JSON.stringify({ id: n, method, params }));
  });
const evaluate = async (expression) =>
  (await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true }))
    .result?.value;

// Wait for the Reviews tab. Signed out it never appears, so this is also
// where the first run waits for you to sign in.
console.log("Waiting for the Reviews tab. Sign in to Google in the window if it asks.");
let tab = false;
for (let i = 0; i < 300 && !tab; i++) {
  tab = await evaluate(`(() => {
    const t = [...document.querySelectorAll('button[role="tab"]')]
      .find((b) => /^Reviews/.test(b.getAttribute('aria-label') || b.textContent || ''));
    if (t) { t.click(); return true; }
    return false;
  })()`);
  if (!tab) await sleep(1000);
}
if (!tab) {
  console.error("No Reviews tab after five minutes. Nothing was changed.");
  chromium.kill();
  process.exit(1);
}
await sleep(2500);

// Scroll the review list until it stops growing, then open every "More".
let seen = -1;
for (let i = 0; i < 20; i++) {
  const count = await evaluate(`(() => {
    const first = document.querySelector('div[data-review-id]');
    let el = first?.parentElement;
    while (el && el.scrollHeight <= el.clientHeight) el = el.parentElement;
    el?.scrollBy(0, 4000);
    return document.querySelectorAll('div[data-review-id][aria-label]').length;
  })()`);
  if (count === seen) break;
  seen = count;
  await sleep(1500);
}
await evaluate(`(async () => {
  document.querySelectorAll('button.w8nwRe, button[aria-label="See more"]').forEach((b) => b.click());
  await new Promise((r) => setTimeout(r, 800));
})()`);

const scraped = await evaluate(`(() => {
  const header = document.querySelector('div.F7nice')?.textContent ?? '';
  const reviews = [...document.querySelectorAll('div[data-review-id][aria-label]')].map((el) => ({
    id: el.getAttribute('data-review-id'),
    author: el.getAttribute('aria-label'),
    stars: el.querySelector('[role="img"][aria-label*="star"]')?.getAttribute('aria-label') ?? '',
    when: el.querySelector('.rsqaWe')?.textContent ?? '',
    text: el.querySelector('.wiI7pd')?.textContent ?? '',
  }));
  return { header, reviews };
})()`);

ws.close();
chromium.kill();

if (!scraped?.reviews?.length) {
  console.error("Found no reviews on the page. Maps may have renamed its classes; nothing was changed.");
  process.exit(1);
}

/** "3 weeks ago" to a date, for reviews this import has not seen before. */
const toDate = (when) => {
  const now = new Date();
  const m = when.match(/(an?|\d+)\s+(minute|hour|day|week|month|year)s?\s+ago/);
  if (m) {
    const n = m[1] === "a" || m[1] === "an" ? 1 : Number(m[1]);
    const unit = { minute: 6e4, hour: 3.6e6, day: 8.64e7, week: 6.048e8, month: 2.63e9, year: 3.156e10 }[m[2]];
    now.setTime(now.getTime() - n * unit);
  }
  return now.toISOString().slice(0, 10);
};

const known = new Map(current.reviews.map((r) => [r.author, r]));
const reviews = scraped.reviews.map((r) => {
  const before = known.get(r.author);
  return {
    id: r.id,
    author: r.author,
    rating: Number(r.stars.match(/\d/)?.[0] ?? 5),
    // Maps marks text it cut short with a trailing ellipsis even after "More".
    text: r.text.replace(/\s*…\s*$/, "").trim(),
    date: before?.date ?? toDate(r.when),
  };
});

const header = scraped.header.match(/(\d[.,]\d)\s*\(?\s*([\d,]+)/);
const next = {
  profileUrl: current.profileUrl,
  rating: header ? Number(header[1].replace(",", ".")) : current.rating,
  count: header ? Number(header[2].replace(/,/g, "")) : Math.max(current.count, reviews.length),
  checked: new Date().toISOString().slice(0, 10),
  reviews,
};

writeFileSync(FILE, JSON.stringify(next, null, 2) + "\n");
const added = reviews.filter((r) => !known.has(r.author)).map((r) => r.author);
console.log(
  `${reviews.length} reviews read, ${next.rating.toFixed(1)} from ${next.count}. ` +
    (added.length ? `New: ${added.join(", ")}.` : "No new reviews.") +
    `\nCheck the diff of ${FILE}, then commit it.`,
);
