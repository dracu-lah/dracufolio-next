#!/usr/bin/env node
/**
 * Turns a LinkedIn data export into app/data/notes.ts.
 *
 * LinkedIn cannot be scraped: a profile and its activity feed both answer a
 * request without a session with a 301 to an auth wall, and LinkedIn's
 * robots.txt says in plain words that automated access without their
 * permission is prohibited. Their own export is the supported way to get your
 * posts out, and it is your content, so this reads that instead.
 *
 * How to get the file:
 *   1. LinkedIn, Settings and privacy, Data privacy
 *   2. "Get a copy of your data"
 *   3. Pick "Posts" (it may be listed as Shares), request the archive
 *   4. LinkedIn emails a zip within about ten minutes, unzip it
 *   5. node scripts/import-linkedin.mjs ~/Downloads/Basic_LinkedInDataExport/Shares.csv
 *
 * Then read app/data/notes.ts and delete the ones not worth keeping. The
 * import is deliberately conservative: it keeps nothing under MIN_WORDS,
 * because a one line post is not content.
 */
import { readFileSync, writeFileSync } from "node:fs";

const source = process.argv[2];
const MIN_WORDS = 25;

if (!source) {
  console.error(
    "Usage: node scripts/import-linkedin.mjs <path to Shares.csv>\n" +
      "See the comment at the top of this file for how to export it.",
  );
  process.exit(1);
}

/**
 * A real CSV parser, because LinkedIn post text contains commas, quotes and
 * newlines and splitting on commas would shred it.
 */
const parseCsv = (text) => {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (quoted) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          quoted = false;
        }
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') quoted = true;
    else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (char !== "\r") {
      field += char;
    }
  }
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.some((c) => c.trim()));
};

const raw = readFileSync(source, "utf8");
const rows = parseCsv(raw);
const header = rows.shift().map((h) => h.trim().replace(/^﻿/, ""));

const col = (name) => {
  const i = header.findIndex((h) => h.toLowerCase() === name.toLowerCase());
  return i === -1 ? null : i;
};

const iDate = col("Date");
const iText = col("ShareCommentary") ?? col("Commentary");
const iLink = col("ShareLink") ?? col("Link");
const iShared = col("SharedUrl") ?? col("SharedURL");

if (iDate === null || iText === null) {
  console.error(
    `Could not find the Date and ShareCommentary columns. Header was:\n  ${header.join(", ")}`,
  );
  process.exit(1);
}

/** Hashtags are a LinkedIn reflex; they become tags, not body text. */
const splitTags = (body) => {
  const tags = [...body.matchAll(/#(\w{2,30})/g)].map((m) => m[1]);
  const cleaned = body
    .replace(/(\s*#\w{2,30})+\s*$/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return { cleaned, tags: [...new Set(tags)] };
};

const EM_DASH = String.fromCharCode(0x2014);

const notes = [];
const skipped = { short: 0, empty: 0 };

for (const row of rows) {
  const text = (row[iText] ?? "").trim();
  if (!text) {
    skipped.empty++;
    continue;
  }
  const { cleaned, tags } = splitTags(text);
  if (cleaned.split(/\s+/).length < MIN_WORDS) {
    skipped.short++;
    continue;
  }

  const stamp = (row[iDate] ?? "").trim();
  const date = new Date(stamp);
  notes.push({
    date: Number.isNaN(date.getTime())
      ? stamp.slice(0, 10)
      : date.toISOString().slice(0, 10),
    // The house style has no em dashes, and the check script blocks a push
    // that ships one, so they are replaced on the way in.
    body: cleaned.split(EM_DASH).join(", "),
    source: (row[iLink] ?? "").trim() || undefined,
    link: iShared !== null ? (row[iShared] ?? "").trim() || undefined : undefined,
    tags,
  });
}

notes.sort((a, b) => b.date.localeCompare(a.date));

const header_comment = readFileSync("app/data/notes.ts", "utf8").split(
  "export const notes",
)[0];

const body = `export const notes: Note[] = ${JSON.stringify(notes, null, 2)};

export const hasNotes = notes.length > 0;

export const notesByNewest = [...notes].sort((a, b) =>
  b.date.localeCompare(a.date),
);
`;

writeFileSync("app/data/notes.ts", header_comment + body);

console.log(`Imported ${notes.length} notes into app/data/notes.ts`);
console.log(
  `Skipped ${skipped.short} under ${MIN_WORDS} words and ${skipped.empty} empty rows.`,
);
console.log(
  "Read the file, delete anything not worth keeping, then run pnpm check:dashes and pnpm build.",
);
