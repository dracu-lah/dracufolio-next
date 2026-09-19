import localFont from "next/font/local";
import { DM_Sans } from "next/font/google";

/**
 * Three faces, one job each. DM Sans carries display and body, separated by
 * weight and size rather than by a second family, Google Sans Code carries
 * every UI label, and Anek Malayalam carries Malayalam from any of them.
 *
 * Google Sans itself is Google's proprietary brand face: not on Google Fonts,
 * not licensed for a site like this one. Google Sans Code is the public,
 * OFL-1.1 sibling, so the UI role gets a genuine Google face and the sans role
 * gets DM Sans, which is the closest open drawing to Google Sans's geometric
 * humanist shape.
 *
 * Both latin faces are self-hosted. Only the Malayalam face sets
 * `preload: false`: it sits at the end of every stack, so the browser fetches
 * it when a Malayalam code point actually needs it and never on an
 * English-only page.
 */

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans-face",
  display: "swap",
});

/**
 * The weight axis of Google Sans Code, latin subset, copied out of
 * `@fontsource-variable/google-sans-code` so the file is in the repo rather
 * than resolved out of node_modules at build time. The licence sits beside it.
 */
const mono = localFont({
  src: [{ path: "../fonts/GoogleSansCode-latin.woff2", style: "normal" }],
  weight: "300 800",
  variable: "--font-mono-face",
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "monospace"],
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

/** Every font variable, for the <html> className. */
export const fontVariables = [
  sans.variable,
  mono.variable,
  malayalam.variable,
].join(" ");
