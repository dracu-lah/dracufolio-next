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
  /**
   * A shorter <title> for search results, when the headline runs past the 60
   * characters Google shows. The page still uses `title` as its h1.
   */
  seoTitle?: string;
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
    slug: "tmplayer-1-26-low-storage-mode",
    title: "TMPlayer 1.26.0: streaming a film bigger than the free space",
    description:
      "TMPlayer 1.26.0 streams a film bigger than the free space through a rolling download window, adds Android TV home rows and posters, and a Mac build from CI.",
    date: "2026-10-15",
    tags: ["Kotlin", "Android TV", "TDLib", "Compose Desktop", "macOS"],
    readingMinutes: 12,
    image: "/appwrite/projects/tmplayer-tv-home.webp",
    project: "tmplayer",
  },
  {
    slug: "sway-setup-i-work-in",
    title: "The Sway setup I work in every day",
    description:
      "A tiling Wayland desktop without GNOME doing it for you: power without TLP, battery limits at 50 and 80 percent, idle timeouts, clipboard history and recording.",
    date: "2026-10-13",
    tags: ["Linux", "Sway", "Wayland", "Fedora", "Shell"],
    readingMinutes: 7,
    image: "/appwrite/blog/swaydots-desktop.png",
  },
  {
    slug: "nextjs-on-cloudflare-workers-with-opennext",
    title: "Next.js on Cloudflare Workers with OpenNext",
    description:
      "Moving a Next.js app from Vercel to Cloudflare Workers with OpenNext: the R2, D1 and Durable Object caches, Wrangler bindings, images and static headers.",
    date: "2026-10-13",
    tags: ["Next.js", "Cloudflare Workers", "OpenNext", "R2", "D1"],
    readingMinutes: 7,
  },
  {
    slug: "translating-game-menus-on-android-without-root",
    title: "Translating game menus on Android without root",
    description:
      "How TapTL draws live English over a Chinese game menu: a brightness diff decides when to read, ML Kit translates on the phone, and every tap passes through.",
    date: "2026-10-13",
    tags: ["Kotlin", "Android", "ML Kit", "MediaProjection", "OCR"],
    readingMinutes: 8,
    image: "/appwrite/projects/taptl-after.webp",
    project: "taptl",
  },
  {
    slug: "tmplayer-on-windows-and-linux",
    title: "Taking a Telegram video player from Android TV to Windows and Linux",
    seoTitle: "TMPlayer on Windows and Linux, from Android TV",
    description:
      "Eleven TMPlayer releases in three weeks: one streaming core for Media3 and libmpv, a Windows file lock, a crash only TVs had, and a download cut in half.",
    date: "2026-10-13",
    tags: ["Kotlin", "Compose Desktop", "libmpv", "TDLib", "Android TV"],
    readingMinutes: 7,
    image: "/appwrite/projects/tmplayer-desktop.webp",
    project: "tmplayer",
  },
  {
    slug: "telegram-video-before-it-finishes-downloading",
    title: "Play a Telegram video before it finishes downloading",
    description:
      "How TMPlayer plays a Telegram video on Android TV while it downloads: a custom Media3 DataSource over TDLib, partial downloads, and seeking ahead of them.",
    date: "2026-09-18",
    tags: ["Kotlin", "Android", "Media3", "TDLib", "Jetpack Compose"],
    readingMinutes: 8,
    image: "/appwrite/projects/tmplayer.webp",
    project: "tmplayer",
  },
  {
    slug: "shadcn-registry-image-cropper",
    title: "Publishing a React component through the shadcn registry",
    description:
      "Why an image cropper ships as a shadcn registry entry instead of an npm package, what its three props do, and why the states took longer than the crop.",
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
    seoTitle: "Job outreach from your own Gmail, one email at a time",
    description:
      "Bulk job outreach without a marketing tool: one send per person instead of BCC, a Gmail app password that stays in the browser, and what matters at 200 emails.",
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
      "LangSync parses ICU messages into a tree before translating, batches fragments to cut API overhead by up to 98 percent, and only translates what changed.",
    date: "2026-09-18",
    tags: ["Python", "i18n", "CLI", "next-intl"],
    readingMinutes: 6,
    /*
     * A CLI has no screen to photograph, so the card is a run of the tool
     * itself, rendered in the site's own colours and mono face. A borrowed
     * screenshot of another product told the reader the post was about
     * something else.
     */
    image: "/appwrite/blog/langsync-run.webp",
    project: "langsync",
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
