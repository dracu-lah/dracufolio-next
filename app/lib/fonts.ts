import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

/**
 * Three faces, one job each. Geist carries display and body, separated by
 * weight and size rather than by a second family, Geist Mono carries every UI
 * label, and Anek Malayalam carries Malayalam from any of them.
 *
 * Geist ships its own optimised files through the `geist` package, so the two
 * latin faces need no `localFont` declaration and no subset files in the repo.
 * Only the Malayalam face is declared here, with `preload` off: it sits at the
 * end of every stack, so the browser fetches it when a Malayalam code point
 * actually needs it and never on an English-only page.
 */

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
  GeistSans.variable,
  GeistMono.variable,
  malayalam.variable,
].join(" ");
