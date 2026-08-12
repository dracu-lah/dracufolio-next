#!/usr/bin/env node
/**
 * Blocks em dashes from reaching the repo. They read as machine-written here and
 * the house style has no use for them.
 */
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

// Escaped so this file does not trip its own check.
const EM_DASH = String.fromCharCode(0x2014);
const SKIP = /^(pnpm-lock\.yaml|public\/|\.next\/|node_modules\/)|\.(png|jpe?g|webp|ico|pdf|svg|woff2?)$/;

const files = execSync("git ls-files", { encoding: "utf8" })
  .split("\n")
  .filter((f) => f && !SKIP.test(f));

const hits = [];
for (const file of files) {
  let text;
  try {
    text = readFileSync(file, "utf8");
  } catch {
    continue;
  }
  if (!text.includes(EM_DASH)) continue;
  text.split("\n").forEach((line, i) => {
    if (line.includes(EM_DASH)) hits.push(`${file}:${i + 1}: ${line.trim()}`);
  });
}

if (hits.length) {
  console.error(`Em dashes found in ${hits.length} place(s):\n`);
  hits.forEach((hit) => console.error("  " + hit));
  console.error("\nReplace them with a comma, a full stop, or parentheses.");
  process.exit(1);
}

console.log("No em dashes.");
