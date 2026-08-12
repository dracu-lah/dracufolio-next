import type { MetadataRoute } from "next";
import { GetProjectsAPI } from "@/services/api";
import { SITE_URL } from "@/lib/seo";

export const revalidate = 86400;

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = (
    [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/projects`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/about`, changeFrequency: "yearly", priority: 0.7 },
    {
      url: `${SITE_URL}/open-source`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ] as const
  ).map((route) => ({ ...route, lastModified }));

  const projects = await GetProjectsAPI();
  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified,
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes];
};

export default sitemap;
