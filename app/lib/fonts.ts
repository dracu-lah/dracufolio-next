import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";

/**
 * Four faces, one job each. Loading rules that matter:
 *
 * - `preload` is on only for the two faces that paint above the fold on every
 *   page (display and mono). The latin-ext and Malayalam files are declared as
 *   separate families and sit further down the CSS font stack, so the browser
 *   fetches them only when a glyph actually needs them.
 * - `adjustFontFallback` is off on the local faces because these are display
 *   and mono faces whose metrics do not match the system stack closely enough
 *   for the synthetic adjustment to help; the explicit `fallback` list keeps
 *   the swap from moving layout much. Geist keeps the adjustment, since its
 *   metrics are close to the system sans.
 */

const display = localFont({
  src: [{ path: "../fonts/BricolageGrotesque-latin.woff2", style: "normal" }],
  weight: "200 800",
  variable: "--font-bricolage",
  display: "swap",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
  adjustFontFallback: false,
});

const displayExt = localFont({
  src: [
    { path: "../fonts/BricolageGrotesque-latin-ext.woff2", style: "normal" },
  ],
  weight: "200 800",
  variable: "--font-bricolage-ext",
  display: "swap",
  preload: false,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
  adjustFontFallback: false,
});

const mono = localFont({
  src: [{ path: "../fonts/GoogleSansCode-latin.woff2", style: "normal" }],
  variable: "--font-google-sans",
  display: "swap",
  preload: true,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
  adjustFontFallback: false,
});

const monoExt = localFont({
  src: [{ path: "../fonts/GoogleSansCode-latin-ext.woff2", style: "normal" }],
  variable: "--font-google-sans-ext",
  display: "swap",
  preload: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
  adjustFontFallback: false,
});

/** Malayalam subset only (U+0D00 to U+0D7F plus the joiners). */
const malayalam = localFont({
  src: [{ path: "../fonts/AnekMalayalam-malayalam.woff2", style: "normal" }],
  weight: "100 800",
  variable: "--font-malayalam",
  display: "swap",
  preload: false,
  fallback: ["Noto Sans Malayalam", "Manjari", "sans-serif"],
  adjustFontFallback: false,
});

/** Every font variable, for the <body> className. */
export const fontVariables = [
  display.variable,
  displayExt.variable,
  mono.variable,
  monoExt.variable,
  malayalam.variable,
  GeistSans.variable,
].join(" ");
