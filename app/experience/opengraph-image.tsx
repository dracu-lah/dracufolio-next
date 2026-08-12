import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Experience of Nevil Krishna K";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

const Image = () =>
  ogImage({
    eyebrow: "Experience",
    title: "Experience",
    description: "Lascade LLP and Udyata Information Systems, React and Next.js work shipped since 2023.",
  });

export default Image;
