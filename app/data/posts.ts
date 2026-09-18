/**
 * The blog registry. One entry per post, and it is the single source for the
 * index page, the sitemap, the RSS feed, the OG cards and the "more posts"
 * links. The MDX file holds the words; this file holds the facts about it.
 *
 * `date` is the real publish date and it goes on the page as a visible byline,
 * because a dated, signed answer is what a search engine and an AI assistant
 * will quote over an undated one.
 */

export type Post = {
  slug: string;
  title: string;
  /** Used for the meta description, the index card and the RSS summary. */
  description: string;
  date: string;
  updated?: string;
  tags: string[];
  readingMinutes: number;
  /** Site-relative image for the OG card and the feed, when there is one. */
  image?: string;
};

export const posts: Post[] = [
  {
    slug: "telegram-video-before-it-finishes-downloading",
    title: "Play a Telegram video before it finishes downloading",
    description:
      "How TMPlayer streams a Telegram video on Android TV while the file is still downloading: a custom Media3 DataSource over TDLib, partial downloads, and seeking into a part of the file that is not there yet.",
    date: "2026-09-18",
    tags: ["Kotlin", "Android", "Media3", "TDLib", "Jetpack Compose"],
    readingMinutes: 8,
    image: "/appwrite/projects/tmplayer.webp",
  },
  {
    slug: "nextjs-16-cloudflare-workers-opennext",
    title: "Next.js 16 on Cloudflare Workers with OpenNext",
    description:
      "What shipping a seat map product on Cloudflare Workers taught me about OpenNext, D1, R2, Durable Objects, cron triggers and running next-intl at the edge.",
    date: "2026-09-18",
    tags: ["Next.js", "Cloudflare", "OpenNext", "TypeScript", "SEO"],
    readingMinutes: 9,
    image: "/appwrite/projects/seatinfo.webp",
  },
];

export const publishedPosts = [...posts].sort((a, b) =>
  b.date.localeCompare(a.date),
);

export const postBySlug = (slug: string) =>
  posts.find((post) => post.slug === slug);

/** The other posts, newest first, for the "more posts" row. */
export const otherPosts = (slug: string) =>
  publishedPosts.filter((post) => post.slug !== slug);
