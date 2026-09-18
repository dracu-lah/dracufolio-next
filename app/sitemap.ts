import type { MetadataRoute } from "next";
import { GetProjectsAPI } from "@/services/api";
import { SITE_URL, absolute } from "@/lib/seo";
import { locations } from "@/data/locations";
import { publishedPosts } from "@/data/posts";
import { hasNotes } from "@/data/notes";
import { CONTENT_DATES, asDate } from "@/data/updated";
import { PORTRAIT_PATH } from "@/data/contact";

export const revalidate = 86400;

/**
 * Roughly seventy URLs, all in one file. Splitting a sitemap starts to matter
 * in the tens of thousands, not here.
 *
 * Two things this fixes from the old version. Every URL used to be stamped
 * with the build time, which told crawlers the whole site changed on every
 * deploy and taught them to ignore the field; dates now come from a hand
 * edited map and differ per route. And the pages that have a real image now
 * declare it, which is how the portrait and the project screenshots get into
 * image search.
 */
const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const projects = await GetProjectsAPI();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: asDate(CONTENT_DATES.home),
      changeFrequency: "weekly",
      priority: 1,
      images: [absolute(PORTRAIT_PATH)],
    },
    {
      url: `${SITE_URL}/hire`,
      lastModified: asDate(CONTENT_DATES.hire),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: asDate(CONTENT_DATES.projects),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: asDate(CONTENT_DATES.blog),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // Only listed once the LinkedIn import has actually put something there.
    ...(hasNotes
      ? [
          {
            url: `${SITE_URL}/notes`,
            lastModified: asDate(CONTENT_DATES.blog),
            changeFrequency: "weekly" as const,
            priority: 0.5,
          },
        ]
      : []),
    {
      url: `${SITE_URL}/about`,
      lastModified: asDate(CONTENT_DATES.about),
      changeFrequency: "monthly",
      priority: 0.6,
      images: [absolute(PORTRAIT_PATH)],
    },
    {
      url: `${SITE_URL}/open-source`,
      lastModified: asDate(CONTENT_DATES.openSource),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // Thrissur itself is the phrase worth most, so it sits level with /hire.
  // Districts outrank towns, which outrank the state and country pages: those
  // two exist to be landed on, not to compete with the local ones.
  const priorityFor = (kind: string, slug: string) => {
    if (slug === "thrissur") return 0.9;
    if (kind === "district") return 0.8;
    if (kind === "town") return 0.7;
    return 0.6;
  };

  const locationRoutes: MetadataRoute.Sitemap = locations.map((location) => ({
    url: `${SITE_URL}/hire/${location.slug}`,
    lastModified: asDate(CONTENT_DATES.locations),
    changeFrequency: "monthly",
    priority: priorityFor(location.kind, location.slug),
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: asDate(CONTENT_DATES.projects),
    changeFrequency: "yearly",
    priority: 0.8,
    ...(project.images[0] ? { images: [absolute(project.images[0])] } : {}),
  }));

  const postRoutes: MetadataRoute.Sitemap = publishedPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: asDate(post.updated ?? post.date),
    changeFrequency: "yearly",
    priority: 0.7,
    ...(post.image ? { images: [absolute(post.image)] } : {}),
  }));

  return [
    ...staticRoutes,
    ...locationRoutes,
    ...projectRoutes,
    ...postRoutes,
  ];
};

export default sitemap;
