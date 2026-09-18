import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Hire Nevil Krishna K, full stack developer in Thrissur";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

const Image = () =>
  ogImage({
    eyebrow: "Full stack developer, Thrissur, Kerala",
    title: "Hire me",
    description:
      "Websites, web apps, dashboards and mobile apps. WhatsApp +91 92079 32070.",
  });

export default Image;
