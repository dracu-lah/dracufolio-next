import { CONTENT_DATES } from "@/data/updated";
import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/common/Badge";
import { CalendarIcon, ClockIcon } from "@/components/common/icons";
import BackLink from "@/components/common/BackLink";
import Footer from "@/components/common/Footer";
import JsonLd from "@/components/common/JsonLd";
import CtaBlock from "@/components/cta/CtaBlock";
import Reveal from "@/components/common/Reveal";
import SpotlightCard from "@/components/motion/SpotlightCard";
import { formatPostDate } from "@/lib/blog";
import { ID, pageGraph } from "@/lib/schema";
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
          dateModified: CONTENT_DATES.blog,
          breadcrumb: [
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ],
        },
        [
          {
            "@type": "Blog",
            "@id": ID.blog,
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
    <main className="mx-auto max-w-7xl px-6 pt-24 md:px-10 md:pt-28 lg:px-14">
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

        <ul className="flex flex-col gap-5">
          {publishedPosts.map((post, index) => (
            <li key={post.slug}>
              <Reveal delay={index * 0.06}>
                <SpotlightCard
                  border
                  className="overflow-hidden bg-border transition-colors duration-300 hover:bg-accent-edge"
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col lg:h-70 lg:flex-row"
                  >
                    {/* A post with a picture of the thing it is about gets
                        opened. A wall of dated headlines does not. The posts
                        with nothing to photograph get the generated title card
                        instead, so no row is missing its left half. */}
                    {/* 16:9 at every width. The thumbnail used to stretch to
                        the row height, which turned it into a near square on a
                        tablet and cropped the screenshot to its middle third.
                        Holding the ratio and letting `h-full` set the width
                        means the row is the same shape as the picture in it. */}
                    <span className="relative block aspect-video w-full shrink-0 overflow-hidden border-b border-border lg:h-full lg:w-auto lg:border-r lg:border-b-0">
                      <Image
                        src={post.image ?? `/blog/card/${post.slug}`}
                        alt={post.title}
                        fill
                        sizes="(min-width: 1024px) 500px, 100vw"
                        className="object-cover"
                      />
                    </span>

                    {/* `p-5` on a phone, which is what the project card
                        already uses. At `p-6` the date and the read time
                        needed 299px in a 294px box, so they broke onto two
                        rows for the sake of five pixels. */}
                    <span className="flex flex-1 flex-col gap-3 p-5 md:p-6">
                      <span className="flex flex-wrap items-center gap-2">
                        <Badge icon={CalendarIcon}>
                          <time dateTime={post.date}>
                            {formatPostDate(post.date)}
                          </time>
                        </Badge>
                        <Badge icon={ClockIcon}>
                          {post.readingMinutes} min read
                        </Badge>
                      </span>

                      {/* Clamped, and the row has a fixed height above `md`.
                          A title that ran to two lines and a description that
                          ran to three made every card a different shape, and a
                          list of things that are all the same kind of thing
                          should not look like a ransom note. */}
                      <h2 className="font-display line-clamp-2 text-xl font-bold tracking-tight transition-colors duration-300 group-hover:text-accent md:text-2xl">
                        {post.title}
                      </h2>
                      <p className="line-clamp-2 text-base leading-relaxed text-muted-foreground">
                        {post.description}
                      </p>

                      <span className="mt-auto flex h-8 flex-wrap gap-1.5 overflow-hidden pt-2">
                        {post.tags.slice(0, 4).map((tag) => (
                          <Badge key={tag}>{tag}</Badge>
                        ))}
                      </span>
                    </span>
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
