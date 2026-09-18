import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Blog by Nevil Krishna K";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

const Image = () =>
  ogImage({
    eyebrow: "Blog",
    title: "Notes from real work",
    description:
      "Android and Media3, Next.js on Cloudflare Workers, and the SEO that comes with them.",
  });

export default Image;
