import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import {
  GITHUB_URL,
  GOOGLE_MAPS_URL,
  GOOGLE_REVIEW_URL,
  LINKEDIN_URL,
  PHONE_E164,
  RESUME_PATH,
  SOURCE_URL,
  X_URL,
} from "./app/data/contact";
import projects from "./app/data/projects.json";
import { remoteDistricts } from "./app/data/locations";

// No prefilled text here on purpose. Next decodes percent-escapes in a
// redirect destination, which would put raw spaces in the Location header and
// that is invalid. These short links are the ones typed by hand or read out
// loud; the in-page buttons build their own wa.me URL with the message
// properly encoded.
const WHATSAPP = `https://wa.me/${PHONE_E164.replace("+", "")}`;
const RESUME = RESUME_PATH;

const PUBLISHED_SLUGS = projects
  .filter((p) => p.published)
  .map((p) => p.slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
  .join("|");

const REMOTE_DISTRICTS = remoteDistricts.map((d) => d.slug).join("|");

const nextConfig: NextConfig = {
  // Blog posts are .mdx page files, so the router has to look for them.
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // Old and alternate paths keep their link equity instead of dead-ending in a
  // 404. 308 rather than 301 on the new ones: it is the permanent redirect that
  // is also guaranteed to keep the method, and search engines treat the two the
  // same for ranking.
  async redirects() {
    return [
      { source: "/project/:slug", destination: "/projects/:slug", statusCode: 301 },
      { source: "/work", destination: "/about", statusCode: 301 },
      { source: "/experience", destination: "/about", statusCode: 301 },
      { source: "/contact", destination: "/#contact", statusCode: 301 },
      { source: "/portfolio", destination: "/projects", statusCode: 301 },
      { source: "/oss", destination: "/open-source", statusCode: 301 },
      // A project that comes off the list keeps its old URL alive by landing on
      // the list. The rule is built from projects.json rather than a list of
      // slugs, so a removed project is not named again in this file.
      {
        // The list page's own share image lives under the same prefix and must
        // not be caught, or /projects ships an og:image that redirects to HTML.
        source: `/projects/:slug((?!(?:${PUBLISHED_SLUGS}|opengraph-image|twitter-image)$)[^/]+)`,
        destination: "/projects",
        statusCode: 308,
      },
      // Districts I serve remotely are one list on /hire/kerala now, not a
      // page each. Their old URLs, and their share images, land on that list.
      {
        source: `/hire/:district(${REMOTE_DISTRICTS})/:rest*`,
        destination: "/hire/kerala",
        statusCode: 308,
      },
      // The retired OpenNext post was about a product that is not mine to
      // name. Its URL goes to the post written from my own guide instead.
      {
        source: "/blog/nextjs-16-cloudflare-workers-opennext",
        destination: "/blog/nextjs-on-cloudflare-workers-with-opennext",
        statusCode: 308,
      },
      {
        source: "/appwrite/resume/Nevil-Krishna-Frontend-Resume.pdf",
        destination: RESUME,
        statusCode: 301,
      },

      // Short links that fit on a business card, in a bio field, or spoken out
      // loud on a phone call. These are the ones that get typed by hand.
      { source: "/whatsapp", destination: WHATSAPP, statusCode: 308 },
      { source: "/wa", destination: WHATSAPP, statusCode: 308 },
      // A redirect cannot target a tel: URI, so /call lands on the contact
      // block where the number is a real link.
      { source: "/call", destination: "/#contact", statusCode: 308 },
      { source: "/resume", destination: RESUME, statusCode: 308 },
      { source: "/cv", destination: RESUME, statusCode: 308 },
      { source: "/linkedin", destination: LINKEDIN_URL, statusCode: 308 },
      { source: "/github", destination: GITHUB_URL, statusCode: 308 },
      { source: "/x", destination: X_URL, statusCode: 308 },
      { source: "/twitter", destination: X_URL, statusCode: 308 },
      { source: "/source", destination: SOURCE_URL, statusCode: 308 },
      // nevil.dev/review is the link to send a client after a project; it is
      // short enough to say out loud. /reviews is the profile, to read them.
      { source: "/review", destination: GOOGLE_REVIEW_URL, statusCode: 308 },
      { source: "/reviews", destination: GOOGLE_MAPS_URL, statusCode: 308 },
      { source: "/hire-me", destination: "/hire", statusCode: 308 },
      { source: "/services", destination: "/hire", statusCode: 308 },
      { source: "/freelance", destination: "/hire", statusCode: 308 },
      { source: "/blog/feed", destination: "/feed.xml", statusCode: 308 },
      { source: "/rss", destination: "/feed.xml", statusCode: 308 },
      { source: "/rss.xml", destination: "/feed.xml", statusCode: 308 },
      // Paths people and old link checkers guess. Each one 404'd on 15 Oct.
      { source: "/feed", destination: "/feed.xml", statusCode: 308 },
      { source: "/atom.xml", destination: "/feed.xml", statusCode: 308 },
      { source: "/sitemap", destination: "/sitemap.xml", statusCode: 308 },
      { source: "/home", destination: "/", statusCode: 308 },
      { source: "/index.html", destination: "/", statusCode: 308 },
      { source: "/resume.pdf", destination: RESUME, statusCode: 308 },
      { source: "/about-me", destination: "/about", statusCode: 308 },
      { source: "/skills", destination: "/about", statusCode: 308 },
      { source: "/contact-me", destination: "/#contact", statusCode: 308 },
      { source: "/works", destination: "/projects", statusCode: 308 },
      { source: "/project", destination: "/projects", statusCode: 308 },
      { source: "/blogs/:slug*", destination: "/blog/:slug*", statusCode: 308 },
      { source: "/posts/:slug*", destination: "/blog/:slug*", statusCode: 308 },
      { source: "/post/:slug*", destination: "/blog/:slug*", statusCode: 308 },
      { source: "/tags/:rest*", destination: "/blog", statusCode: 308 },
      { source: "/tag/:rest*", destination: "/blog", statusCode: 308 },
      // Old and English names for places, so a guessed town still lands.
      { source: "/hire/trichur/:rest*", destination: "/hire/thrissur", statusCode: 308 },
      {
        source: "/hire/:city(kochi|cochin|trivandrum|calicut)/:rest*",
        destination: "/hire/kerala",
        statusCode: 308,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        // The crawl files are read by bots that cache aggressively, so they get
        // a shorter shelf life than a page.
        source: "/:file(llms.txt|llms-full.txt|humans.txt)",
        headers: [
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
          { key: "Cache-Control", value: "public, max-age=3600" },
        ],
      },
      {
        // Fonts are content-hashed by next/font, so they can be cached forever.
        source: "/_next/static/media/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
