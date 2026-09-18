import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/common/JsonLd";
import CtaBlock from "@/components/cta/CtaBlock";
import QrPanel from "@/components/common/QrPanel";
import { ArrowLeft } from "@/components/common/icons";
import { blogPostingNode, formatPostDate } from "@/lib/blog";
import { pageGraph } from "@/lib/schema";
import { SITE_URL } from "@/lib/seo";
import { otherPosts, postBySlug } from "@/data/posts";
import { PORTRAIT_PATH } from "@/data/contact";

/**
 * Title, byline and date at the top of a post. It is a component rather than
 * markdown in every file so the byline, the photo and the structured data can
 * never drift between posts, and so the whole page graph is emitted once.
 */
export const PostHeader = ({ slug }: { slug: string }) => {
  const post = postBySlug(slug);
  if (!post) return null;
  const node = blogPostingNode(slug);

  return (
    <>
      <JsonLd
        data={pageGraph(
          {
            path: `/blog/${post.slug}`,
            name: post.title,
            description: post.description,
            datePublished: post.date,
            dateModified: post.updated ?? post.date,
            primaryImage: post.image,
            breadcrumb: [
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
              { name: post.title, path: `/blog/${post.slug}` },
            ],
          },
          node ? [node] : [],
        )}
      />
      <nav aria-label="Breadcrumb" className="not-prose">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Blog
        </Link>
      </nav>

      <header className="not-prose flex flex-col gap-6 pt-7 pb-10 md:pt-9">
        <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <Link href="/about" className="flex items-center gap-3">
            <Image
              src={PORTRAIT_PATH}
              alt="Nevil Krishna K, full stack developer in Thrissur, Kerala"
              width={80}
              height={80}
              className="size-9 rounded-full object-cover"
            />
            <span className="text-base">Nevil Krishna K</span>
          </Link>
          <span aria-hidden className="text-muted-foreground">
            /
          </span>
          <time
            dateTime={post.date}
            className="font-mono text-sm text-muted-foreground"
          >
            {formatPostDate(post.date)}
          </time>
          <span aria-hidden className="text-muted-foreground">
            /
          </span>
          <span className="font-mono text-sm text-muted-foreground">
            {post.readingMinutes} min read
          </span>
        </div>
      </header>
    </>
  );
};

/** Tags, the other posts, the desktop-to-phone QR, then the shared CTA. */
export const PostFooter = ({ slug }: { slug: string }) => {
  const post = postBySlug(slug);
  if (!post) return null;
  const more = otherPosts(slug);

  return (
    <div className="not-prose flex flex-col gap-10 pt-14">
      <ul className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-md squircle border border-border px-2.5 py-1 font-mono text-sm text-muted-foreground"
          >
            {tag}
          </li>
        ))}
      </ul>

      <QrPanel
        url={`${SITE_URL}/blog/${post.slug}`}
        label="Read on your phone"
        hint="Point a camera at this to carry the article with you."
      />

      {more.length > 0 && (
        <nav aria-label="More posts" className="flex flex-col gap-4">
          <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground">
            More posts
          </h2>
          <ul className="divide-y divide-border border-t border-b border-border">
            {more.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/blog/${other.slug}`}
                  className="flex flex-col gap-1 py-4 transition-opacity duration-300 hover:opacity-75"
                >
                  <span className="font-display text-xl font-bold tracking-tight">
                    {other.title}
                  </span>
                  <span className="text-base leading-relaxed text-muted-foreground">
                    {other.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <CtaBlock
        heading="Building something like this?"
        message={`Hi Nevil, I read your post "${post.title}" and wanted to ask about a project.`}
        className="px-0 md:px-0 lg:px-0"
      />
    </div>
  );
};
