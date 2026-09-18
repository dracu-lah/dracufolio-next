import type { Metadata } from "next";
import { X_HANDLE } from "@/data/contact";

/**
 * The canonical origin, in one place. nevil.dev stays canonical: it is the
 * indexed domain, and .dev is on the HSTS preload list so it can only ever be
 * served over HTTPS. nevilkrishna.com redirects here rather than duplicating
 * the site. If that ever flips, set NEXT_PUBLIC_SITE_URL and nothing else in
 * the codebase needs to change.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://nevil.dev"
).replace(/\/$/, "");

export const SITE_NAME = "Nevil Krishna K";
export const AUTHOR = "Nevil Krishna K";
export const TITLE_TEMPLATE = "%s | Nevil Krishna K";

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
}: PageMetaInput): Metadata => {
  const url = absolute(path);
  const images = image ? [{ url: absolute(image) }] : undefined;

  return {
    title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: { canonical: path },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title: `${title} | ${AUTHOR}`,
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
      title: `${title} | ${AUTHOR}`,
      description,
      creator: X_HANDLE,
      ...(images ? { images: images.map((i) => i.url) } : {}),
    },
  };
};

/**
 * Standalone breadcrumb, for the few places that are not part of a page graph.
 * Pages built with `pageGraph()` get their breadcrumb from the graph instead.
 */
export const breadcrumbJsonLd = (trail: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: trail.map((crumb, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: crumb.name,
    item: absolute(crumb.path),
  })),
});
