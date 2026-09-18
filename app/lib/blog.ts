import type { Metadata } from "next";
import { postBySlug } from "@/data/posts";
import { AUTHOR, SITE_URL, absolute } from "./seo";
import { pageMetadata } from "./seo";
import { ID, ref } from "./schema";

/** Metadata for a post, built from the registry so the MDX file stays prose. */
export const postMetadata = (slug: string): Metadata => {
  const post = postBySlug(slug);
  if (!post) return { title: "Post not found", robots: { index: false } };

  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
    image: post.image,
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
    ...(post.image ? { image: absolute(post.image) } : {}),
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
