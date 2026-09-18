import Link from "next/link";
import BackLink from "@/components/common/BackLink";
import Footer from "@/components/common/Footer";
import JsonLd from "@/components/common/JsonLd";
import CtaBlock from "@/components/cta/CtaBlock";
import Reveal from "@/components/common/Reveal";
import SpotlightCard from "@/components/motion/SpotlightCard";
import { formatPostDate } from "@/lib/blog";
import { pageGraph } from "@/lib/schema";
import { AUTHOR, SITE_URL, pageMetadata } from "@/lib/seo";
import { publishedPosts } from "@/data/posts";
import { hasNotes } from "@/data/notes";

const description =
  "Notes from real work by Nevil Krishna K, a full stack developer in Thrissur, Kerala: Android and Media3, Next.js on Cloudflare Workers, React patterns and the SEO that comes with them.";

export const metadata = pageMetadata({
  title: "Blog",
  description,
  path: "/blog",
  keywords: [
    "Next.js blog",
    "Cloudflare Workers",
    "Android Media3",
    "React developer blog Kerala",
  ],
});

const BlogPage = () => (
  <>
    <JsonLd
      data={pageGraph(
        {
          path: "/blog",
          name: `Blog | ${AUTHOR}`,
          description,
          type: "CollectionPage",
          breadcrumb: [
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ],
        },
        [
          {
            "@type": "Blog",
            "@id": `${SITE_URL}/blog#blog`,
            name: `Blog | ${AUTHOR}`,
            description,
            url: `${SITE_URL}/blog`,
            blogPost: publishedPosts.map((post) => ({
              "@type": "BlogPosting",
              "@id": `${SITE_URL}/blog/${post.slug}#post`,
              headline: post.title,
              datePublished: post.date,
              url: `${SITE_URL}/blog/${post.slug}`,
            })),
          },
        ],
      )}
    />
    <main className="mx-auto max-w-7xl px-6 pt-28 md:px-10 md:pt-32 lg:px-14">
      <div className="flex flex-col gap-10 md:gap-12">
        <div className="flex flex-col items-start gap-5">
          <BackLink />
          <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            Blog
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Write-ups of problems I actually had to solve, with the code and the
            numbers. Also on{" "}
            <Link
              href="/feed.xml"
              className="text-foreground underline underline-offset-4"
            >
              RSS
            </Link>
            {hasNotes ? (
              <>
                , and the shorter ones are in{" "}
                <Link
                  href="/notes"
                  className="text-foreground underline underline-offset-4"
                >
                  notes
                </Link>
                .
              </>
            ) : (
              "."
            )}
          </p>
        </div>

        <ul className="flex flex-col gap-6">
          {publishedPosts.map((post, index) => (
            <li key={post.slug}>
              <Reveal delay={index * 0.06}>
                <SpotlightCard className="overflow-hidden rounded-xl squircle border border-border bg-card transition-colors duration-300 hover:border-foreground">
                  <Link href={`/blog/${post.slug}`} className="block p-6 md:p-8">
                    <div className="flex flex-wrap items-center gap-3 font-mono text-sm text-muted-foreground">
                      <time dateTime={post.date}>
                        {formatPostDate(post.date)}
                      </time>
                      <span aria-hidden>/</span>
                      <span>{post.readingMinutes} min read</span>
                    </div>
                    <h2 className="font-display pt-3 text-xl font-bold tracking-tight md:text-3xl">
                      {post.title}
                    </h2>
                    <p className="max-w-3xl pt-3 text-base leading-relaxed text-muted-foreground md:text-lg">
                      {post.description}
                    </p>
                    <p className="pt-4 font-mono text-sm text-muted-foreground">
                      {post.tags.join("  ")}
                    </p>
                  </Link>
                </SpotlightCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </main>
    <CtaBlock />
    <Footer />
  </>
);

export default BlogPage;
