import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Silence is not permission to a cautious crawler, and the single biggest own
 * goal in this area is a robots.txt that quietly blocks the assistants people
 * now ask for recommendations. So the AI crawlers are named and allowed
 * explicitly, split into the two kinds that matter:
 *
 *   - search and answer agents (OAI-SearchBot, PerplexityBot, ClaudeBot and
 *     friends) fetch a page to cite it in an answer. Being in those answers is
 *     the entire point of this site.
 *   - training crawlers (GPTBot, Google-Extended, Applebot-Extended, CCBot)
 *     read it into a model. For a person whose product is being known by name,
 *     that is also the point.
 *
 * Bytespider and the other scrapers that ignore rate limits and cite nothing
 * are left out: they cost bandwidth and return no visibility.
 */
const AI_AGENTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "Amazonbot",
  "meta-externalagent",
  "DuckAssistBot",
  "YouBot",
  "cohere-ai",
  "CCBot",
  "Bingbot",
  "Googlebot",
];

/*
 * Only the API. /_next/ used to be here too, which hid the JS, CSS and every
 * /_next/image the site serves, so Google rendered the pages without them and
 * could not index a single screenshot.
 */
const BLOCKED_PATHS = ["/api/"];

const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: "*",
      allow: "/",
      disallow: BLOCKED_PATHS,
    },
    ...AI_AGENTS.map((userAgent) => ({
      userAgent,
      allow: "/",
      disallow: BLOCKED_PATHS,
    })),
    {
      userAgent: "Bytespider",
      disallow: "/",
    },
  ],
  sitemap: `${SITE_URL}/sitemap.xml`,
});

export default robots;
