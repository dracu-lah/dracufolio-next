import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * The site's colour tokens, read out of `globals.css` at build time.
 *
 * Satori, which draws every generated card, has no CSS variables, no `oklch()`
 * and no `color-mix()`, so a card has to hand it plain hex. Writing those hex
 * values into the card file is how the OG card ended up still drawing the
 * pre-leaf-green phosphor on a colder black months after the repaint: nothing
 * connected it to the palette any more. Reading the stylesheet means the cards
 * move when `--accent` moves, and a token that stops being a plain `oklch()`
 * throws with its own name instead of quietly drawing the wrong colour.
 */

/** oklch to sRGB hex, the sRGB matrix from the CSS Color 4 conversions. */
export const oklchToHex = (l: number, c: number, hue: number) => {
  const h = (hue * Math.PI) / 180;
  const a = c * Math.cos(h);
  const b = c * Math.sin(h);

  const lp = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const mp = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const sp = (l - 0.0894841775 * a - 1.291485548 * b) ** 3;

  const linear = [
    4.0767416621 * lp - 3.3077115913 * mp + 0.2309699292 * sp,
    -1.2684380046 * lp + 2.6097574011 * mp - 0.3413193965 * sp,
    -0.0041960863 * lp - 0.7034186147 * mp + 1.707614701 * sp,
  ];

  return `#${linear
    .map((channel) => {
      const gamma =
        channel <= 0.0031308
          ? 12.92 * channel
          : 1.055 * channel ** (1 / 2.4) - 0.055;
      const byte = Math.round(Math.min(1, Math.max(0, gamma)) * 255);
      return byte.toString(16).padStart(2, "0");
    })
    .join("")}`;
};

const cache = new Map<string, string>();
let css: string | null = null;

/**
 * One token by name, without the leading dashes: `token("accent")`. Throws if
 * the token is missing or is no longer a plain `oklch()` triple, because a
 * generated card drawing a silently wrong palette is worse than a failed build.
 */
export const token = (name: string) => {
  const hit = cache.get(name);
  if (hit) return hit;

  css ??= readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
  const match = css.match(new RegExp(`--${name}:\\s*oklch\\(([^)]+)\\)`));
  if (!match) {
    throw new Error(`--${name} is not a plain oklch token in app/globals.css`);
  }

  const [l, c, h] = match[1].trim().split(/\s+/).map(Number);
  const hex = oklchToHex(l, c, h);
  cache.set(name, hex);
  return hex;
};

/** Several at once, keyed by the names asked for. */
export const palette = <T extends string>(...names: T[]) =>
  Object.fromEntries(names.map((name) => [name, token(name)])) as Record<
    T,
    string
  >;
