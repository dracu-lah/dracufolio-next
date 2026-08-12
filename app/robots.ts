import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: "*",
      allow: "/",
      // Nothing under these paths should ever reach an index.
      disallow: ["/api/", "/_next/", "/404", "/500"],
    },
  ],
  sitemap: `${SITE_URL}/sitemap.xml`,
  host: SITE_URL,
});

export default robots;
