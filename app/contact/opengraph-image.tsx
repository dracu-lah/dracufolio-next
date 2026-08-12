import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Contact Nevil Krishna K";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

const Image = () =>
  ogImage({
    eyebrow: "Contact",
    title: "Contact",
    description: "Hiring, building something, or stuck on a bug? Send a message.",
  });

export default Image;
