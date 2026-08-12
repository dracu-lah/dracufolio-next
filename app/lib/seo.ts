import type { Metadata } from "next";

export const SITE_URL = "https://nevil.dev";
export const SITE_NAME = "Nevil Krishna Portfolio";
export const AUTHOR = "Nevil Krishna K";

export const absolute = (path: string) =>
  path.startsWith("http") ? path : `${SITE_URL}${path}`;

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** Absolute or site-relative image. Defaults to the route's generated OG image. */
  image?: string;
  type?: "website" | "article" | "profile";
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
}: PageMetaInput): Metadata => {
  const url = absolute(path);
  const images = image ? [{ url: absolute(image) }] : undefined;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${AUTHOR}`,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      type,
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${AUTHOR}`,
      description,
      creator: "@nevilkrishnak",
      ...(images ? { images: images.map((i) => i.url) } : {}),
    },
  };
};

export const breadcrumbJsonLd = (
  trail: { name: string; path: string }[],
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: trail.map((crumb, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: crumb.name,
    item: absolute(crumb.path),
  })),
});

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: AUTHOR,
  alternateName: "Nevil Krishna",
  url: SITE_URL,
  image: absolute("/appwrite/hero-image/hero_image_v2.jpg"),
  jobTitle: "Full Stack Developer",
  email: "mailto:nevilkrishna@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Thrissur",
    addressRegion: "Kerala",
    addressCountry: "IN",
  },
  worksFor: {
    "@type": "Organization",
    name: "Lascade LLP",
    url: "https://lascade.com",
  },
  alumniOf: {
    "@type": "Organization",
    name: "Udyata Information Systems",
    url: "https://udyata.com",
  },
  sameAs: [
    "https://github.com/dracu-lah",
    "https://www.linkedin.com/in/nevil-krishna-k-77170222a/",
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Full Stack Development",
  ],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "en",
  author: { "@type": "Person", name: AUTHOR, url: SITE_URL },
};
