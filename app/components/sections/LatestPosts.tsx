import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/common/Badge";
import Reveal from "@/components/common/Reveal";
import { ArrowRight, CalendarIcon } from "@/components/common/icons";
import SpotlightCard from "@/components/motion/SpotlightCard";
import { formatPostDate } from "@/lib/blog";
import { publishedPosts } from "@/data/posts";

/**
 * The newest posts, on the home page. Each post used to be linked from the
 * blog index, its project and the other posts, and nowhere a visitor lands
 * first, so the strongest page on the site passed nothing to the writing.
 * Three, because a fourth pushes the row past one screen on a laptop.
 */
const LatestPosts = ({ count = 3 }: { count?: number }) => {
  const posts = publishedPosts.slice(0, count);
  if (!posts.length) return null;

  return (
    <section
      id="writing"
      className="mx-auto max-w-7xl px-6 py-8 md:px-10 md:py-12 lg:px-14"
    >
      <div className="flex flex-col gap-5 md:gap-7">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Writing
            </h2>
            <Link
              href="/blog"
              className="group flex items-center gap-2 text-base text-muted-foreground transition-colors duration-200 hover:text-accent"
            >
              All {publishedPosts.length} posts
              <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>

        <ul className="grid gap-5 md:grid-cols-3">
          {posts.map((post, index) => (
            <li key={post.slug}>
              <Reveal delay={index * 0.06} className="h-full">
                <SpotlightCard
                  border
                  className="h-full overflow-hidden bg-border transition-colors duration-300 hover:bg-accent-edge"
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex h-full flex-col"
                  >
                    <span className="relative block aspect-video w-full shrink-0 overflow-hidden border-b border-border">
                      <Image
                        src={post.image ?? `/blog/card/${post.slug}`}
                        alt={post.title}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover"
                      />
                    </span>
                    <span className="flex flex-1 flex-col gap-3 p-5">
                      {/* A wrapper so the badge keeps its own width
                          instead of stretching across the column. */}
                      <span className="flex">
                        <Badge icon={CalendarIcon}>
                          <time dateTime={post.date}>
                            {formatPostDate(post.date)}
                          </time>
                        </Badge>
                      </span>
                      <h3 className="font-display line-clamp-2 text-xl font-bold tracking-tight transition-colors duration-300 group-hover:text-accent">
                        {post.title}
                      </h3>
                      <p className="line-clamp-3 text-base leading-relaxed text-muted-foreground">
                        {post.description}
                      </p>
                    </span>
                  </Link>
                </SpotlightCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default LatestPosts;
