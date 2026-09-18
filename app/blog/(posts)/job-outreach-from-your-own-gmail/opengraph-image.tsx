import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { postBySlug } from "@/data/posts";

const post = postBySlug("job-outreach-from-your-own-gmail");

export const alt = post?.title ?? "Post by Nevil Krishna K";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

const Image = () =>
  ogImage({
    eyebrow: "Blog",
    title: post?.title ?? "Post",
    description: post?.description,
  });

export default Image;
