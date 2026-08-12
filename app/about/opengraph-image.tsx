import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "About Nevil Krishna K";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

const Image = () =>
  ogImage({
    eyebrow: "About",
    title: "Hey, I am Nevil.",
    description: "Full stack developer, FOSS regular, Fedora and Sway on a Latitude 7430.",
  });

export default Image;
