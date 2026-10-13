#!/usr/bin/env node
/**
 * Tells Bing, Yandex and the other IndexNow engines which URLs changed, so a
 * new post is crawled in hours instead of whenever Bing next reads the
 * sitemap. Bing's index is also what ChatGPT and Copilot search read.
 *
 *   pnpm indexnow                 URLs whose sitemap lastmod is in the last 2 days
 *   pnpm indexnow --days 7        a wider window, after a missed deploy
 *   pnpm indexnow /blog/a /hire   exactly these paths
 *   pnpm indexnow --dry-run       print the list, send nothing
 *
 * lastmod comes from content dates (app/data/updated.ts and each post's own
 * date), never the build time, so a deploy that changed no content pings
 * nothing. Pinging unchanged URLs again and again is how a key gets throttled.
 * Two days rather than one because the dates are written in IST and the
 * runner is on UTC.
 */
import { readdirSync, readFileSync } from "node:fs";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://nevil.dev").replace(/\/$/, "");
const HOST = new URL(SITE).host;

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const daysAt = args.indexOf("--days");
const days = daysAt >= 0 ? Number(args[daysAt + 1]) : 2;
const paths = args.filter(
  (a, i) => !a.startsWith("--") && !(daysAt >= 0 && i === daysAt + 1),
);

// The key file's name is the key, and its contents must match it.
const keyFile = readdirSync("public").find((f) => /^[a-f0-9]{32}\.txt$/.test(f));
if (!keyFile) {
  console.error("No IndexNow key file in public/");
  process.exit(1);
}
const key = keyFile.replace(".txt", "");
if (readFileSync(`public/${keyFile}`, "utf8").trim() !== key) {
  console.error(`public/${keyFile} does not contain its own name`);
  process.exit(1);
}

let urls;
if (paths.length) {
  urls = paths.map((p) => (p.startsWith("http") ? p : `${SITE}${p.startsWith("/") ? "" : "/"}${p}`));
} else {
  const res = await fetch(`${SITE}/sitemap.xml`);
  if (!res.ok) {
    console.error(`sitemap.xml: HTTP ${res.status}`);
    process.exit(1);
  }
  const xml = await res.text();
  const since = Date.now() - days * 86_400_000;
  urls = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)]
    .map(([, block]) => ({
      loc: block.match(/<loc>([^<]+)<\/loc>/)?.[1],
      lastmod: block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1],
    }))
    .filter((u) => u.loc && u.lastmod && Date.parse(u.lastmod) >= since)
    .map((u) => u.loc);
}

if (!urls.length) {
  console.log(`Nothing changed in the last ${days} day(s). No ping sent.`);
  process.exit(0);
}

console.log(urls.join("\n"));
if (dryRun) {
  console.log(`\n${urls.length} URL(s), dry run, nothing sent.`);
  process.exit(0);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key,
    keyLocation: `${SITE}/${keyFile}`,
    urlList: urls,
  }),
});

// 200 and 202 are both success. 403 is a key file the engine could not read,
// 422 is a URL on another host.
console.log(`\nIndexNow: HTTP ${res.status} for ${urls.length} URL(s)`);
if (res.status !== 200 && res.status !== 202) process.exit(1);
