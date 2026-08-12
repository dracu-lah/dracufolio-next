import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Projects by Nevil Krishna K";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

const Image = () =>
  ogImage({
    eyebrow: "Projects",
    title: "All Projects",
    description: "Travel products, open-source tools, and side projects built with React and Next.js.",
  });

export default Image;
