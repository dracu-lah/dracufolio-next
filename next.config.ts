import createMDX from "@next/mdx";
import type { NextConfig } from "next";

// No prefilled text here on purpose. Next decodes percent-escapes in a
// redirect destination, which would put raw spaces in the Location header and
// that is invalid. These short links are the ones typed by hand or read out
// loud; the in-page buttons build their own wa.me URL with the message
// properly encoded.
const WHATSAPP = "https://wa.me/919207932070";
const RESUME = "/appwrite/resume/Nevil-3-Years-Frontend-Resume.pdf";

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
      {
        source: "/appwrite/resume/Nevil-Krishna-Frontend-Resume.pdf",
        destination: "/appwrite/resume/Nevil-3-Years-Frontend-Resume.pdf",
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
      {
        source: "/linkedin",
        destination: "https://www.linkedin.com/in/nevil-krishna-k-77170222a/",
        statusCode: 308,
      },
      { source: "/github", destination: "https://github.com/dracu-lah", statusCode: 308 },
      { source: "/x", destination: "https://x.com/nevilkrishnak", statusCode: 308 },
      { source: "/twitter", destination: "https://x.com/nevilkrishnak", statusCode: 308 },
      {
        source: "/source",
        destination: "https://github.com/dracu-lah/dracufolio-next",
        statusCode: 308,
      },
      { source: "/hire-me", destination: "/hire", statusCode: 308 },
      { source: "/services", destination: "/hire", statusCode: 308 },
      { source: "/freelance", destination: "/hire", statusCode: 308 },
      { source: "/blog/feed", destination: "/feed.xml", statusCode: 308 },
      { source: "/rss", destination: "/feed.xml", statusCode: 308 },
      { source: "/rss.xml", destination: "/feed.xml", statusCode: 308 },
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
