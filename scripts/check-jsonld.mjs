#!/usr/bin/env node
/**
 * Fetches every route from a running server, parses every ld+json block, and
 * fails on invalid JSON or a page missing the entity nodes it should carry.
 *
 * The point is the graph, not the presence of a script tag: a page whose
 * Person node has drifted to a different @id is worse than a page with no
 * schema, because it splits one entity into two in the knowledge graph.
 *
 * Usage: node scripts/check-jsonld.mjs [baseUrl]
 */
const BASE = process.argv[2] ?? "http://localhost:3111";

const REQUIRED = ["Person", "ProfessionalService", "WebSite"];

/**
 * A page-level node has to be one of these. CollectionPage, AboutPage and
 * ProfilePage are all WebPage subtypes, so a page using one is not missing a
 * WebPage, it is being more specific than one.
 */
const WEBPAGE_TYPES = [
  "WebPage",
  "CollectionPage",
  "AboutPage",
  "ProfilePage",
  "ItemPage",
  "ContactPage",
];

const sitemapUrls = async () => {
  const res = await fetch(`${BASE}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => m[1])
    .map((url) => new URL(url).pathname);
};

const blocks = (html) =>
  [
    ...html.matchAll(
      /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
    ),
  ].map((m) => m[1]);

const typesIn = (node, found = new Set()) => {
  if (Array.isArray(node)) {
    node.forEach((item) => typesIn(item, found));
    return found;
  }
  if (node && typeof node === "object") {
    const type = node["@type"];
    if (typeof type === "string") found.add(type);
    if (Array.isArray(type)) type.forEach((t) => found.add(t));
    Object.values(node).forEach((value) => typesIn(value, found));
  }
  return found;
};

const failures = [];
const paths = await sitemapUrls();
console.log(`Checking ${paths.length} routes from the sitemap.`);

for (const path of paths) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) {
    failures.push(`${path}: HTTP ${res.status}`);
    continue;
  }
  const html = await res.text();
  const raw = blocks(html);

  if (raw.length === 0) {
    failures.push(`${path}: no ld+json block`);
    continue;
  }

  const found = new Set();
  const ids = new Set();
  for (const text of raw) {
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (error) {
      failures.push(`${path}: invalid JSON (${error.message})`);
      continue;
    }
    typesIn(parsed).forEach((type) => found.add(type));
    const graph = parsed["@graph"] ?? [];
    for (const node of graph) {
      if (node["@id"]) ids.add(node["@id"]);
    }
  }

  const missing = REQUIRED.filter((type) => !found.has(type));
  if (missing.length) {
    failures.push(`${path}: missing ${missing.join(", ")}`);
  }

  if (!WEBPAGE_TYPES.some((type) => found.has(type))) {
    failures.push(`${path}: no page-level node (WebPage or a subtype)`);
  }

  // Breadcrumbs are required everywhere below the root.
  if (path !== "/" && !found.has("BreadcrumbList")) {
    failures.push(`${path}: no BreadcrumbList`);
  }

  const person = [...ids].find((id) => id.endsWith("#person"));
  if (!person) failures.push(`${path}: Person has no stable #person @id`);
}

if (failures.length) {
  console.error(`\n${failures.length} problem(s):\n`);
  failures.forEach((f) => console.error("  " + f));
  process.exit(1);
}

console.log(`All ${paths.length} routes carry a valid graph.`);
