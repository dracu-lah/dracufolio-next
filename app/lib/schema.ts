import {
  COUNTRY,
  COUNTRY_CODE,
  EMAIL,
  GEO,
  GITHUB_URL,
  HOURS,
  LANGUAGE_CODES,
  LINKEDIN_URL,
  LOCALITY,
  PHONE_E164,
  PORTRAIT_PATH,
  REGION,
  WHATSAPP_URL,
  X_URL,
  YOUTUBE_URL,
} from "@/data/contact";
import { occupations, skills } from "@/data/keywords";
import { serviceTypes, services } from "@/data/services";
import { locations } from "@/data/locations";
import { testimonials } from "@/data/testimonials";
import type { Faq } from "@/data/faq";
import { AUTHOR, SITE_NAME, SITE_URL, absolute } from "./seo";

/**
 * One JSON-LD graph per page, the way the tools that read it expect.
 *
 * The important part is the `@id`s. Person, ProfessionalService and WebSite get
 * a stable id anchored to the site root, and every page-level node points at
 * those ids instead of repeating the whole object. That is how Google and the
 * AI crawlers decide that the Nevil on /hire/ollur, the Nevil on a blog post
 * and the Nevil in the knowledge graph are one entity rather than three.
 */

export const ID = {
  person: `${SITE_URL}/#person`,
  service: `${SITE_URL}/#service`,
  website: `${SITE_URL}/#website`,
  organisation: `${SITE_URL}/#service`,
} as const;

const ref = (id: string) => ({ "@id": id });

const postalAddress = {
  "@type": "PostalAddress",
  addressLocality: LOCALITY,
  addressRegion: REGION,
  addressCountry: COUNTRY_CODE,
};

const geoCoordinates = {
  "@type": "GeoCoordinates",
  latitude: GEO.latitude,
  longitude: GEO.longitude,
};

const portrait = {
  "@type": "ImageObject",
  "@id": `${SITE_URL}/#portrait`,
  url: absolute(PORTRAIT_PATH),
  contentUrl: absolute(PORTRAIT_PATH),
  width: 835,
  height: 835,
  caption: `${AUTHOR}, full stack developer in ${LOCALITY}, ${REGION}`,
};

/**
 * Third-party profiles, in the order a person would check them. Every new
 * account gets added here and nowhere else: llms.txt and the footer read the
 * same list, so the entity stays consistent across the whole site.
 */
export const sameAs = [
  GITHUB_URL,
  LINKEDIN_URL,
  X_URL,
  YOUTUBE_URL,
  "https://tmplayer.org",
  "https://resumebuilder.js.org",
];

const personNode = {
  "@type": "Person",
  "@id": ID.person,
  name: AUTHOR,
  alternateName: ["Nevil Krishna", "Nevil"],
  givenName: "Nevil",
  familyName: "Krishna",
  url: `${SITE_URL}/`,
  image: portrait,
  telephone: PHONE_E164,
  email: `mailto:${EMAIL}`,
  jobTitle: occupations,
  hasOccupation: occupations.map((name) => ({
    "@type": "Occupation",
    name,
    occupationLocation: {
      "@type": "AdministrativeArea",
      name: `${REGION}, ${COUNTRY}`,
    },
  })),
  knowsAbout: skills,
  knowsLanguage: LANGUAGE_CODES.map((code) => ({
    "@type": "Language",
    alternateName: code,
    name: code === "ml" ? "Malayalam" : "English",
  })),
  address: postalAddress,
  homeLocation: {
    "@type": "Place",
    name: `${LOCALITY}, ${REGION}, ${COUNTRY}`,
    address: postalAddress,
    geo: geoCoordinates,
  },
  nationality: { "@type": "Country", name: COUNTRY },
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
  sameAs,
};

const areaServed = locations.map((location) => ({
  "@type": location.kind === "country" ? "Country" : "AdministrativeArea",
  name: location.name,
  ...(location.altNames.length ? { alternateName: location.altNames } : {}),
}));

const serviceNode = {
  "@type": "ProfessionalService",
  "@id": ID.service,
  name: `${AUTHOR}, web and app development`,
  alternateName: `Full stack developer in ${LOCALITY}`,
  url: `${SITE_URL}/hire`,
  founder: ref(ID.person),
  employee: ref(ID.person),
  image: portrait,
  logo: absolute(PORTRAIT_PATH),
  telephone: PHONE_E164,
  email: `mailto:${EMAIL}`,
  priceRange: "Quote per project",
  currenciesAccepted: "INR",
  address: postalAddress,
  geo: geoCoordinates,
  areaServed,
  serviceType: serviceTypes,
  knowsLanguage: LANGUAGE_CODES,
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: PHONE_E164,
      email: EMAIL,
      availableLanguage: ["Malayalam", "English"],
      url: WHATSAPP_URL,
    },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: HOURS.days,
      opens: HOURS.opens,
      closes: HOURS.closes,
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Development services",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.blurb,
        serviceType: service.serviceType,
        provider: ref(ID.service),
      },
    })),
  },
  sameAs,
  // Only ever rendered when there are real reviews in the data file.
  ...(testimonials.length
    ? {
        review: testimonials.map((t) => ({
          "@type": "Review",
          author: { "@type": "Person", name: t.name },
          reviewBody: t.quote,
          datePublished: t.date,
        })),
      }
    : {}),
};

const websiteNode = {
  "@type": "WebSite",
  "@id": ID.website,
  name: SITE_NAME,
  alternateName: "nevil.dev",
  url: `${SITE_URL}/`,
  description: `Portfolio and hire page of ${AUTHOR}, a full stack developer in ${LOCALITY}, ${REGION}.`,
  publisher: ref(ID.person),
  inLanguage: ["en", "ml"],
};

type WebPageInput = {
  path: string;
  name: string;
  description: string;
  /** Overrides the default WebPage type for collections, contact pages, etc. */
  type?: string;
  datePublished?: string;
  dateModified?: string;
  breadcrumb?: { name: string; path: string }[];
  primaryImage?: string;
};

const webPageNode = ({
  path,
  name,
  description,
  type = "WebPage",
  datePublished,
  dateModified,
  breadcrumb,
  primaryImage,
}: WebPageInput) => {
  const url = absolute(path);
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: ref(ID.website),
    about: ref(ID.person),
    inLanguage: "en",
    ...(primaryImage
      ? {
          primaryImageOfPage: {
            "@type": "ImageObject",
            url: absolute(primaryImage),
          },
        }
      : {}),
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    ...(breadcrumb ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
  };
};

const breadcrumbNode = (
  path: string,
  trail: { name: string; path: string }[],
) => ({
  "@type": "BreadcrumbList",
  "@id": `${absolute(path)}#breadcrumb`,
  itemListElement: trail.map((crumb, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: crumb.name,
    item: absolute(crumb.path),
  })),
});

export const faqNode = (path: string, faqs: Faq[]) => ({
  "@type": "FAQPage",
  "@id": `${absolute(path)}#faq`,
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
});

/**
 * The graph every page ships. `extra` is where a page adds its own nodes
 * (FAQPage, BlogPosting, CreativeWork, ItemList) without repeating the Person,
 * the service or the site.
 */
export const pageGraph = (
  page: WebPageInput,
  extra: Record<string, unknown>[] = [],
) => ({
  "@context": "https://schema.org",
  "@graph": [
    personNode,
    serviceNode,
    websiteNode,
    webPageNode(page),
    ...(page.breadcrumb ? [breadcrumbNode(page.path, page.breadcrumb)] : []),
    ...extra,
  ],
});

export { personNode, serviceNode, websiteNode, ref };
