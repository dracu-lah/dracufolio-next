#!/usr/bin/env node
/**
 * Every icon the site ships, rendered from one source: scripts/assets/icon.svg.
 *
 * The favicon that shipped before this script was 32x25. Google wants a square
 * favicon and asks for a multiple of 48, so a non-square file is dropped from
 * search results before anything else about it is considered. It was that shape
 * because it had been exported cropped to the ink of the mark, by hand, once.
 * Generating the set instead means the shape cannot drift again.
 *
 * Needs ImageMagick, the same `magick` the project already uses to compress
 * screenshots. It is a manual step (`pnpm icons`), not a build step: Vercel has
 * no ImageMagick, and these files change about once a year.
 */
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = join(root, "scripts/assets/icon.svg");
const publicDir = join(root, "public");

const magick = (...args) =>
  execFileSync("magick", args.map(String), { stdio: ["ignore", "pipe", "pipe"] });

const render = (svg, size, out) =>
  magick(
    "-background", "none",
    svg,
    "-resize", `${size}x${size}`,
    "-depth", "8",
    "-strip",
    out,
  );

/** The tile without its rounded corners, for the two icons that get masked. */
const squareSource = (svg) => svg.replace(/ rx="\d+"/, "");

/**
 * A maskable icon is cropped to whatever shape the launcher wants, and only the
 * middle 80 percent is guaranteed to survive. So it loses the rounded tile, the
 * background bleeds to the edge, and the mark is scaled into the safe circle.
 */
const maskableSource = (svg) =>
  squareSource(svg).replace(
    /<g /,
    '<g transform="translate(256 256) scale(0.82) translate(-256 -256)" ',
  );

const tmp = mkdtempSync(join(tmpdir(), "icons-"));
try {
  const svg = readFileSync(source, "utf8");

  // A multi resolution .ico. 48 is the size Google asks for, 16 and 32 are what
  // a browser tab actually draws, and letting the file carry all three beats
  // making the browser downscale one.
  const icoParts = [16, 32, 48].map((size) => {
    const out = join(tmp, `ico-${size}.png`);
    render(source, size, out);
    return out;
  });
  magick(...icoParts, join(publicDir, "favicon.ico"));

  // iOS home screen. Rendered from the square tile, because iOS rounds the
  // corners itself and a pre-rounded icon leaves four transparent notches that
  // it composites onto black.
  const squareSvg = join(tmp, "square.svg");
  writeFileSync(squareSvg, squareSource(svg));
  render(squareSvg, 180, join(publicDir, "apple-touch-icon.png"));

  for (const size of [192, 512]) {
    render(source, size, join(publicDir, `icon-${size}.png`));
  }

  const maskable = join(tmp, "maskable.svg");
  writeFileSync(maskable, maskableSource(svg));
  render(maskable, 512, join(publicDir, "icon-maskable-512.png"));

  // The source itself ships too, for anything that prefers a vector.
  writeFileSync(join(publicDir, "icon.svg"), svg);

  console.log(
    [
      "favicon.ico (16, 32, 48)",
      "apple-touch-icon.png (180)",
      "icon-192.png",
      "icon-512.png",
      "icon-maskable-512.png",
      "icon.svg",
    ]
      .map((line) => `  public/${line}`)
      .join("\n"),
  );
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
