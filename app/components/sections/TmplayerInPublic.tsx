import Link from "next/link";
import Reveal from "@/components/common/Reveal";
import { ArrowUpRight, GithubLogo, Globe } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import { Squircle } from "@/components/ui/squircle";
import { githubRepo } from "@/data/contact";
import { tmplayerProof } from "@/data/experience";
import { formatPostDate } from "@/lib/blog";
import { publishedPosts } from "@/data/posts";

/**
 * TMPlayer as proof of how I work, not as one more card in the project grid:
 * a product with users, a release history anyone can read, and write-ups of
 * what went wrong. Every figure comes from `tmplayerProof` and links to where
 * it can be checked. The write-ups are the newest posts tagged to the
 * project, so a new release note shows up here without editing this file.
 */
const stats = [
  { value: tmplayerProof.stars, label: "GitHub stars" },
  { value: tmplayerProof.downloads, label: "downloads" },
  {
    value: tmplayerProof.releases,
    label: `releases in about ${tmplayerProof.releaseWeeks} weeks`,
  },
  { value: tmplayerProof.forks, label: "forks" },
  { value: tmplayerProof.languages, label: "languages" },
];

const writeUps = publishedPosts
  .filter((post) => post.project?.startsWith("tmplayer"))
  .slice(0, 3);

const TmplayerInPublic = () => (
  <section
    id="tmplayer"
    className="mx-auto max-w-7xl scroll-mt-24 px-6 py-8 md:px-10 md:py-12 lg:px-14"
  >
    <Reveal>
      <Squircle
        borderWidth={1}
        fillClassName="bg-card"
        className="grid gap-8 bg-border p-5 md:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12"
      >
        <div className="flex flex-col items-start gap-5">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            Built and maintained in public
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            TMPlayer is an open source app that plays the videos already in
            your own Telegram chats, on Android TV, phones, Windows, Linux and
            in the browser. The code, the issues and every release note are
            public, so what I say about it can be checked.
          </p>
          <dl className="grid w-full max-w-xl grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <dt className="order-2 text-base leading-snug text-muted-foreground">
                  {stat.label}
                </dt>
                <dd className="order-1 font-display text-3xl font-bold tracking-tight">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
          <div className="flex w-full flex-wrap items-center gap-3 md:gap-4">
            <Button asChild>
              <a
                href={githubRepo("TMPlayer")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubLogo className="size-5" />
                Source code
              </a>
            </Button>
            <Button asChild variant="ghost">
              <a
                href="https://tmplayer.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe className="size-5" />
                tmplayer.org
              </a>
            </Button>
          </div>
          <p className="text-base text-muted-foreground">
            <Link
              href="/projects/tmplayer"
              className="text-foreground underline underline-offset-4 transition-colors duration-200 hover:text-accent"
            >
              The project page
            </Link>{" "}
            has screenshots of each platform.{" "}
            <a
              href="https://tmplayer.org/legal/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-4 transition-colors duration-200 hover:text-accent"
            >
              Lawful use
            </a>{" "}
            is spelled out on its site.
          </p>
        </div>

        {writeUps.length > 0 && (
          <div className="flex flex-col gap-4">
            <h3 className="font-display text-xl font-bold tracking-tight">
              Write-ups
            </h3>
            <ul className="flex flex-col divide-y divide-border">
              {writeUps.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex items-start justify-between gap-3 py-3 first:pt-0"
                  >
                    <span className="flex flex-col gap-1">
                      <span className="text-base font-medium text-foreground transition-colors duration-200 group-hover:text-accent">
                        {post.title}
                      </span>
                      <span className="text-base text-muted-foreground">
                        {formatPostDate(post.date)}
                      </span>
                    </span>
                    <ArrowUpRight className="mt-0.5 size-5 shrink-0 text-muted-foreground transition-colors duration-200 group-hover:text-accent" />
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/blog"
              className="inline-block py-3 text-base text-foreground underline underline-offset-4 transition-colors duration-200 hover:text-accent"
            >
              All {publishedPosts.length} posts
            </Link>
          </div>
        )}
      </Squircle>
    </Reveal>
  </section>
);

export default TmplayerInPublic;
