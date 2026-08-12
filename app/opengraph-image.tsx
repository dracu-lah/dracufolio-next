import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Nevil Krishna K, full stack developer";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

const Image = () =>
  ogImage({
    eyebrow: "Portfolio",
    title: "Nevil Krishna K",
    description: "Full stack developer building React and Next.js products from Thrissur, Kerala.",
  });

export default Image;
