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
  /**
   * The project this post is about, by slug. The project page uses it to link
   * to the write-up, so the two pages point at each other instead of being two
   * dead ends about the same thing.
   */
  project?: string;
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
    project: "tmplayer",
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
    project: "seatinfo",
  },
  {
    slug: "shadcn-registry-image-cropper",
    title: "Publishing a React component through the shadcn registry",
    description:
      "Why an image cropper ships as a shadcn registry entry instead of an npm package, what its three props do, and why the states around the crop took longer than the crop.",
    date: "2026-09-18",
    tags: ["React", "shadcn/ui", "Registry", "TypeScript"],
    readingMinutes: 5,
    image: "/appwrite/projects/image-cropper.png",
    project: "image-cropper",
  },
  {
    slug: "pdf-resume-back-into-editable-json",
    title: "Turning a PDF resume back into editable JSON",
    description:
      "A free resume builder that keeps one JSON object as the source of truth, reads an existing PDF back into it, and stores nothing on a server.",
    date: "2026-09-18",
    tags: ["React", "Vite", "PDF", "js.org"],
    readingMinutes: 6,
    image: "/appwrite/projects/resume-builder.png",
    project: "resume-builder",
  },
  {
    slug: "job-outreach-from-your-own-gmail",
    title: "Sending job outreach from your own Gmail, one email at a time",
    description:
      "Bulk job outreach without a marketing platform: individual sends instead of BCC, a Gmail app password that never leaves the browser, and the small things that matter at two hundred emails.",
    date: "2026-09-18",
    tags: ["Next.js", "Gmail", "SMTP", "Open Source"],
    readingMinutes: 5,
    image: "/appwrite/projects/email-sender.png",
    project: "email-sender",
  },
  {
    slug: "translation-sync-without-breaking-icu",
    title: "Keeping locale files in step without breaking ICU messages",
    description:
      "LangSync parses ICU messages into a tree before translating them, batches the fragments to cut API overhead by up to 98 percent, and keeps a state snapshot so it knows what actually changed.",
    date: "2026-09-18",
    tags: ["Python", "i18n", "CLI", "next-intl"],
    readingMinutes: 6,
    /*
     * A CLI has no screen to photograph, so the card is a run of the tool
     * itself, rendered in the site's own colours and mono face. It replaces a
     * borrowed SeatInfo screenshot, which told the reader the post was about a
     * different product.
     */
    image: "/appwrite/blog/langsync-run.webp",
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
