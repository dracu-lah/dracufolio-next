import type { Metadata } from "next";
import type { Post } from "@/data/posts";
import { postBySlug } from "@/data/posts";
import { AUTHOR, SITE_URL, absolute } from "./seo";
import { pageMetadata } from "./seo";
import { ID, ref } from "./schema";

/**
 * The picture that stands for a post, everywhere a picture is asked for.
 *
 * A post with no screenshot used to drop out of the OG card, the feed
 * enclosure, the sitemap image and the BlogPosting schema, which is four
 * weaker results for the posts that are hardest to illustrate. The generated
 * title card at `/blog/card/<slug>` exists for every published post, so there
 * is always something to point at.
 */
export const postImage = (post: Post) => post.image ?? `/blog/card/${post.slug}`;

/** Servable type for that image, since the generated card is a PNG. */
export const postImageType = (post: Post) =>
  postImage(post).endsWith(".webp")
    ? "image/webp"
    : postImage(post).endsWith(".jpg") || postImage(post).endsWith(".jpeg")
      ? "image/jpeg"
      : "image/png";

/** Metadata for a post, built from the registry so the MDX file stays prose. */
export const postMetadata = (slug: string): Metadata => {
  const post = postBySlug(slug);
  if (!post) return { title: "Post not found", robots: { index: false } };

  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
    image: postImage(post),
    keywords: post.tags,
    publishedTime: post.date,
    modifiedTime: post.updated ?? post.date,
  });
};

/** Schema for a post. Author points at the site-wide Person by id. */
export const blogPostingNode = (slug: string) => {
  const post = postBySlug(slug);
  if (!post) return null;
  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    "@type": "BlogPosting",
    "@id": `${url}#post`,
    headline: post.title,
    description: post.description,
    url,
    mainEntityOfPage: { "@id": `${url}#webpage` },
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: ref(ID.person),
    publisher: ref(ID.person),
    inLanguage: "en",
    keywords: post.tags.join(", "),
    wordCount: post.readingMinutes * 200,
    timeRequired: `PT${post.readingMinutes}M`,
    image: absolute(postImage(post)),
  };
};

export const formatPostDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

export const BLOG_AUTHOR = AUTHOR;
