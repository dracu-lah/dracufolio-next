import { publishedPosts } from "@/data/posts";
import { AUTHOR, SITE_URL, absolute } from "@/lib/seo";
import { EMAIL } from "@/data/contact";

export const dynamic = "force-static";
export const revalidate = 86400;

const escape = (text: string) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** RSS, because the developers this blog is aimed at still read feeds. */
export const GET = async () => {
  const items = publishedPosts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      return `    <item>
      <title>${escape(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${escape(post.description)}</description>
      <author>${EMAIL} (${AUTHOR})</author>
${post.tags.map((tag) => `      <category>${escape(tag)}</category>`).join("\n")}${
        post.image
          ? `\n      <enclosure url="${absolute(post.image)}" type="image/webp" />`
          : ""
      }
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${AUTHOR}</title>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Notes from real work by ${AUTHOR}, a full stack developer in Thrissur, Kerala.</description>
    <language>en</language>
    <managingEditor>${EMAIL} (${AUTHOR})</managingEditor>
    <lastBuildDate>${new Date(`${publishedPosts[0]?.date ?? "2026-09-18"}T00:00:00Z`).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
};
