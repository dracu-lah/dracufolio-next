import QRCode from "qrcode";

/**
 * QR codes are generated at build time, not in the browser. They are static for
 * a given URL, so shipping a QR library to every visitor to redraw the same
 * squares would be a waste of a download.
 *
 * Rendered dark-on-light even though the site is dark. Scanners cope badly
 * with inverted codes, so the tile stays white and the page puts a border
 * around it instead.
 */
const cache = new Map<string, string>();

export const qrSvg = async (url: string) => {
  const hit = cache.get(url);
  if (hit) return hit;

  const svg = await QRCode.toString(url, {
    type: "svg",
    margin: 0,
    errorCorrectionLevel: "M",
    color: { dark: "#000000", light: "#ffffff" },
  });

  // next/image and the CSP are happier without the XML prolog, and the width
  // and height attributes fight the responsive container.
  const cleaned = svg
    .replace(/<\?xml.*?\?>/, "")
    .replace(/ (width|height)="[^"]*"/g, "")
    .replace("<svg", '<svg class="h-full w-full"');

  cache.set(url, cleaned);
  return cleaned;
};
