#!/usr/bin/env node
/**
 * Prints scripts/resume.html to the resume PDF that the site links.
 *
 * The PDF has no other source, so it is generated, never hand edited. Chromium is
 * the renderer because the layout depends on real font metrics: Carlito stands in
 * for Calibri and matches the geometry of the original Google Docs resume.
 */
import { execFileSync } from "node:child_process";
import { existsSync, statSync } from "node:fs";
import { resolve } from "node:path";

const SOURCE = resolve("scripts/resume.html");
const OUTPUT = resolve(
  "public/appwrite/resume/Nevil-3-Years-Frontend-Resume.pdf",
);

// Chromium, per the house rule. Chrome is not used for rendering here.
const CANDIDATES = ["chromium-browser", "chromium", "chromium-freeworld"];

const binary = CANDIDATES.find((name) => {
  try {
    execFileSync("which", [name], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
});

if (!binary) {
  console.error(`No chromium binary found. Tried: ${CANDIDATES.join(", ")}`);
  process.exit(1);
}

if (!existsSync(SOURCE)) {
  console.error(`Missing ${SOURCE}`);
  process.exit(1);
}

execFileSync(
  binary,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--no-pdf-header-footer",
    `--print-to-pdf=${OUTPUT}`,
    // Give webfont loading and layout time to settle before the page is printed.
    "--virtual-time-budget=4000",
    SOURCE,
  ],
  { stdio: ["ignore", "ignore", "inherit"] },
);

const { size } = statSync(OUTPUT);
console.log(`${OUTPUT} (${Math.round(size / 1024)} KB)`);

// A resume that spills onto a second page is a bug, so say so loudly.
try {
  const info = execFileSync("pdfinfo", [OUTPUT], { encoding: "utf8" });
  const pages = Number(info.match(/^Pages:\s+(\d+)$/m)?.[1]);
  if (pages > 1) {
    console.error(`Warning: ${pages} pages. Trim the content back to one.`);
    process.exit(1);
  }
} catch {
  // pdfinfo is optional, the PDF is already written either way.
}
