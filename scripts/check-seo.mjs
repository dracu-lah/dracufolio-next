#!/usr/bin/env node
/**
 * Content-level SEO checks against a running server. These are the things a
 * build cannot catch: a page that renders but forgot the WhatsApp link, two
 * location pages that ended up with the same opening paragraph, a crawl file
 * that lost the phone number.
 *
 * Usage: node scripts/check-seo.mjs [baseUrl]
 */
const BASE = process.argv[2] ?? "http://localhost:3111";

const fails = [];
const notes = [];
const fail = (msg) => fails.push(msg);

const get = async (path) => {
  const res = await fetch(`${BASE}${path}`, { redirect: "manual" });
  return { status: res.status, headers: res.headers, body: await res.text() };
};

const sitemap = await get("/sitemap.xml");
const paths = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (m) => new URL(m[1]).pathname,
);
notes.push(`sitemap lists ${paths.length} URLs`);

// Every indexable page must offer the primary action.
const pages = new Map();
for (const path of paths) {
  const page = await get(path);
  pages.set(path, page);
  if (page.status !== 200) fail(`${path}: HTTP ${page.status}`);
  if (!page.body.includes("wa.me/919207932070"))
    fail(`${path}: no WhatsApp link`);
  if (!/<link rel="canonical"/.test(page.body))
    fail(`${path}: no canonical link`);
  if (!/property="og:image"/.test(page.body)) fail(`${path}: no og:image`);
  const h1 = [...page.body.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)];
  if (h1.length !== 1) fail(`${path}: ${h1.length} h1 elements, expected 1`);
}

// Sitemap hygiene.
const lastmods = [...sitemap.body.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map(
  (m) => m[1],
);
if (lastmods.length !== paths.length)
  fail(`sitemap: ${lastmods.length} lastmod for ${paths.length} URLs`);
const images = [...sitemap.body.matchAll(/<image:loc>/g)].length;
if (images < 20) fail(`sitemap: only ${images} image entries`);
notes.push(`sitemap has ${images} image entries`);
const priorities = new Set(
  [...sitemap.body.matchAll(/<priority>([^<]+)<\/priority>/g)].map((m) => m[1]),
);
if (priorities.size < 4)
  fail(`sitemap: priorities are not differentiated (${[...priorities]})`);
notes.push(`sitemap priorities: ${[...priorities].sort().join(", ")}`);

// The 29 location pages must not read as one page with the name swapped.
const locationPaths = paths.filter(
  (p) => p.startsWith("/hire/") && p !== "/hire",
);
notes.push(`${locationPaths.length} location pages`);
const firstParagraphs = new Map();
for (const path of locationPaths) {
  const body = pages.get(path).body;
  // The blockquote-style unique paragraph carries the border-l-2 class.
  const match = body.match(/border-l-2[^>]*>([\s\S]*?)<\/p>/);
  const text = (match?.[1] ?? "").replace(/<[^>]+>/g, "").trim();
  if (!text) {
    fail(`${path}: no unique location paragraph`);
    continue;
  }
  if (firstParagraphs.has(text))
    fail(`${path}: same paragraph as ${firstParagraphs.get(text)}`);
  firstParagraphs.set(text, path);
  if (!/lang="ml"/.test(body)) fail(`${path}: no Malayalam subline`);
}
notes.push(`${firstParagraphs.size} distinct location paragraphs`);

// Malayalam on the pages that promised it.
for (const path of ["/", "/hire"]) {
  if (!/lang="ml"/.test(pages.get(path).body))
    fail(`${path}: no lang="ml" element`);
}

// Crawl files.
const robots = await get("/robots.txt");
for (const agent of [
  "GPTBot",
  "OAI-SearchBot",
  "ClaudeBot",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
]) {
  if (!robots.body.includes(agent)) fail(`robots.txt: ${agent} not named`);
}
if (!robots.body.includes("Bytespider")) fail("robots.txt: Bytespider not blocked");
if (!robots.body.includes("Sitemap:")) fail("robots.txt: no Sitemap line");

const llms = await get("/llms.txt");
for (const needle of [
  "+91 92079 32070",
  "wa.me/919207932070",
  "nevilkrishna@gmail.com",
  "nevil-krishna-k.jpg",
  "Poonkunnam",
  "Kasaragod",
  "TMPlayer",
  "Malayalam",
]) {
  if (!llms.body.includes(needle)) fail(`llms.txt: missing "${needle}"`);
}
const llmsFull = await get("/llms-full.txt");
if (llmsFull.body.length < llms.body.length)
  fail("llms-full.txt is shorter than llms.txt");
notes.push(
  `llms.txt ${llms.body.length} bytes, llms-full.txt ${llmsFull.body.length} bytes`,
);

const feed = await get("/feed.xml");
if (!feed.body.startsWith("<?xml")) fail("feed.xml: not XML");
const items = [...feed.body.matchAll(/<item>/g)].length;
if (items < 2) fail(`feed.xml: ${items} items`);
notes.push(`feed.xml has ${items} items`);

// Short links must be permanent and point somewhere sane.
const shortLinks = {
  "/whatsapp": "https://wa.me/919207932070",
  "/resume": "/appwrite/resume/Nevil-3-Years-Frontend-Resume.pdf",
  "/hire-me": "/hire",
  "/x": "https://x.com/nevilkrishnak",
  "/rss": "/feed.xml",
};
for (const [path, target] of Object.entries(shortLinks)) {
  const res = await get(path);
  if (res.status !== 308) fail(`${path}: status ${res.status}, expected 308`);
  const location = res.headers.get("location");
  if (location !== target) fail(`${path}: goes to ${location}, expected ${target}`);
  if (location && /[ "<>]/.test(location))
    fail(`${path}: Location header has an unescaped character`);
}

// The 404 must be a real 404 and must not be indexable.
const missing = await get("/this-page-does-not-exist");
if (missing.status !== 404) fail(`404 page returns ${missing.status}`);
if (!/noindex/.test(missing.body)) fail("404 page is not noindex");

console.log(notes.map((n) => "  " + n).join("\n"));
if (fails.length) {
  console.error(`\n${fails.length} problem(s):\n`);
  fails.forEach((f) => console.error("  " + f));
  process.exit(1);
}
console.log("\nAll content checks pass.");
