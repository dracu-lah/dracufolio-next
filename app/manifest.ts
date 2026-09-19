import type { MetadataRoute } from "next";
import { AUTHOR } from "@/lib/seo";

/**
 * A manifest is a small entity signal (name, icons, theme) and it makes the
 * site installable, which is worth having when somebody scans a QR code and
 * lands here on a phone.
 */
const manifest = (): MetadataRoute.Manifest => ({
  name: `${AUTHOR}, Full Stack Developer in Thrissur`,
  short_name: "Nevil Krishna K",
  description:
    "Portfolio and hire page of Nevil Krishna K, a full stack developer in Thrissur, Kerala. React, Next.js, TypeScript and Android.",
  start_url: "/",
  display: "standalone",
  background_color: "#000000",
  theme_color: "#000000",
  lang: "en",
  categories: ["business", "developer", "portfolio"],
  /*
   * The portrait used to be the second icon here. A photograph is not a brand
   * mark, and an install prompt crops whatever it is given, so it is out. These
   * are generated from scripts/assets/icon.svg by `pnpm icons`. The maskable
   * one keeps the mark inside the middle 80 percent, which is all a launcher
   * guarantees to keep.
   */
  icons: [
    { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
    { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    {
      src: "/icon-maskable-512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "maskable",
    },
  ],
});

export default manifest;
