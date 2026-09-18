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
  icons: [
    { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    {
      src: "/nevil-krishna-k.jpg",
      sizes: "835x835",
      type: "image/jpeg",
      purpose: "any",
    },
  ],
});

export default manifest;
