import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Nevil Krishna K, full stack developer in Thrissur, Kerala";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

const Image = () =>
  ogImage({
    eyebrow: "Full stack developer, Thrissur, Kerala",
    title: "Nevil Krishna K",
    description:
      "React, Next.js and TypeScript on the web, Kotlin on Android. Freelance, remote and full time.",
  });

export default Image;
