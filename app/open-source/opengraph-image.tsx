import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Open source work by Nevil Krishna K";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

const Image = () =>
  ogImage({
    eyebrow: "Open Source",
    title: "Open Source",
    description: "Resume Builder on js.org, LangSync, a shadcn image cropper, and the dotfiles behind the desk.",
  });

export default Image;
