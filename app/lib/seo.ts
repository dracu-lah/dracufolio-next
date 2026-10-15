import type { Metadata } from "next";
import { PHONE_DISPLAY, X_HANDLE } from "@/data/contact";

/**
 * The canonical origin, in one place. nevil.dev stays canonical: it is the
 * indexed domain, and .dev is on the HSTS preload list so it can only ever be
 * served over HTTPS. If the site ever moves to another domain, set
 * NEXT_PUBLIC_SITE_URL and nothing else in the codebase needs to change.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://nevil.dev"
).replace(/\/$/, "");

export const SITE_NAME = "Nevil Krishna K";
export const AUTHOR = "Nevil Krishna K";
export const TITLE_TEMPLATE = "%s | Nevil Krishna K";

/** Where Google truncates in results. `check-seo.mjs` holds pages to these. */
export const TITLE_MAX = 60;
export const DESCRIPTION_MAX = 160;

/** The home page's title and description, also the root layout's defaults. */
export const HOME_TITLE = `${AUTHOR} | Full Stack Developer in Thrissur, Kerala`;
export const HOME_DESCRIPTION = `Nevil Krishna K, full stack developer in Thrissur, Kerala. React, Next.js, TypeScript and Kotlin. Freelance or full time. WhatsApp ${PHONE_DISPLAY}.`;

export const absolute = (path: string) =>
  path.startsWith("http") ? path : `${SITE_URL}${path}`;

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** Absolute or site-relative image. Defaults to the route's generated OG image. */
  image?: string;
  type?: "website" | "article" | "profile";
  keywords?: string[];
  publishedTime?: string;
  modifiedTime?: string;
  /** Set for pages that exist for people, not for an index. */
  noindex?: boolean;
  /**
   * Use `title` as written instead of through the "| Nevil Krishna K"
   * template. Only the home page, whose title already leads with the name.
   */
  absoluteTitle?: boolean;
};

/**
 * One metadata shape for every page: canonical, Open Graph and Twitter cards
 * stay in step instead of drifting per route.
 */
export const pageMetadata = ({
  title,
  description,
  path,
  image,
  type = "website",
  keywords,
  publishedTime,
  modifiedTime,
  noindex,
  absoluteTitle,
}: PageMetaInput): Metadata => {
  const url = absolute(path);
  /*
   * Google cuts a title at about 60 characters. A long post title keeps its
   * words and loses the name instead, since the name is in og:site_name and
   * the byline anyway, and a cut-off suffix only reads as "| Nevil Kri...".
   */
  const fitsSuffix = `${title} | ${AUTHOR}`.length <= TITLE_MAX;
  const bare = absoluteTitle || !fitsSuffix;
  const fullTitle = bare ? title : `${title} | ${AUTHOR}`;
  /*
   * alt travels with the image. A route that passes its own `image` opts out
   * of the opengraph-image file convention, and that convention was the only
   * thing supplying og:image:alt, so exactly the pages with a real screenshot
   * were the ones shipping an unlabelled card.
   */
  const images = image
    ? [{ url: absolute(image), alt: `${title}, by ${AUTHOR}` }]
    : undefined;

  return {
    title: bare ? { absolute: title } : title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    /*
     * Setting alternates here replaces the root layout's, so the feed link is
     * repeated or it only appears on the home page. A noindexed page declares
     * no canonical: pointing one at a page you also ask not to index is two
     * signals that disagree.
     */
    alternates: {
      ...(noindex ? { canonical: null } : { canonical: path }),
      types: { "application/rss+xml": "/feed.xml" },
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      type,
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
      ...(type === "article" && modifiedTime ? { modifiedTime } : {}),
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      creator: X_HANDLE,
      ...(images ? { images } : {}),
    },
  };
};

