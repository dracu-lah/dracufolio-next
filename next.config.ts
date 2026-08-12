import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // Old and alternate paths keep their link equity instead of dead-ending in a 404.
  async redirects() {
    return [
      {
        source: "/project/:slug",
        destination: "/projects/:slug",
        statusCode: 301,
      },
      { source: "/work", destination: "/experience", statusCode: 301 },
      { source: "/portfolio", destination: "/projects", statusCode: 301 },
      { source: "/oss", destination: "/open-source", statusCode: 301 },
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
    ];
  },
};

export default nextConfig;
