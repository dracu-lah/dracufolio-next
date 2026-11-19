import Link from "next/link";
import Reveal from "@/components/common/Reveal";
import Badge from "@/components/common/Badge";
import { Squircle } from "@/components/ui/squircle";
import { GITHUB_URL, LINKEDIN_URL, RESUME_PATH } from "@/data/contact";
import { leadership, tmplayerProof } from "@/data/experience";
import { publishedPosts } from "@/data/posts";

/**
 * The section for recruiters and engineering managers. It is plain text on the
 * server on purpose: a hiring person skims, and a crawler has to be able to
 * quote it. Every claim is something the repo, the resume or a blog post
 * already says, and each one links to where it is said.
 *
 * Nothing here states a team size, a salary, a notice period or a start date,
 * because none of those are written down anywhere on the site.
 */

const strengths: { title: string; body: React.ReactNode }[] = [
  {
    title: "Front end that holds up for real users",
    body: (
      <>
        At Udyata I built a shared library of more than 20 React components,
        which took roughly 30 percent off the team&apos;s build time, and sped
        up the first load by sending less code up front and only when a page
        needs it. At Lascade I own the main interactive view of a travel
        product, from drawing and zooming on screen to the data pipeline that
        feeds it.
      </>
    ),
  },
  {
    title: "I measure before I say something got faster",
    body: (
      <>
        On{" "}
        <Link
          href="/blog/tmplayer-music-telegram-audio-player"
          className="text-foreground underline underline-offset-4"
        >
          the music player
        </Link>
        , an animated seek bar was using 95 to 100 percent of a CPU core on a
        cheap phone. I measured it on two real phones after each change, cut
        it, and wrote down the numbers. LangSync, my translation tool, makes up
        to 98 percent fewer network calls by sending strings in batches.
      </>
    ),
  },
  {
    title: "Tests, and the one that was missing",
    body: (
      <>
        <Link
          href="/projects/tmplayer"
          className="text-foreground underline underline-offset-4"
        >
          TMPlayer
        </Link>{" "}
        has well over a thousand tests. When a crash only showed up on a TV
        stick, I found that I had tests for the arithmetic and none that
        checked a screen could be drawn at all, so I added a test that draws that
        screen in a TV setup, and{" "}
        <Link
          href="/blog/tmplayer-on-windows-and-linux"
          className="text-foreground underline underline-offset-4"
        >
          wrote about it
        </Link>
        . The browser version runs end to end tests in two browsers before
        every deploy.
      </>
    ),
  },
  {
    title: "A product with real users, kept up",
    body: (
      <>
        TMPlayer is an Android TV app that plays the videos in your own
        Telegram chats. It has {tmplayerProof.stars} GitHub stars and{" "}
        {tmplayerProof.downloads} downloads, it also runs on Windows, Linux and
        in the browser, and people file issues on GitHub.
      </>
    ),
  },
  {
    title: "Honest write-ups",
    body: (
      <>
        <Link
          href="/blog/nextjs-on-cloudflare-workers-with-opennext"
          className="text-foreground underline underline-offset-4"
        >
          One post
        </Link>{" "}
        starts by saying that a guide I wrote earlier was partly wrong, and
        marks which parts. Another says casting is the feature I trust least,
        and why. If something is a guess, the post says so.
      </>
    ),
  },
  {
    title: "Linux first",
    body: (
      <>
        I work on Fedora with Neovim and the Sway window manager, and{" "}
        <Link
          href="/blog/sway-setup-i-work-in"
          className="text-foreground underline underline-offset-4"
        >
          I wrote down the setup
        </Link>
        . Comfortable in a terminal, on a server and in a CI log.
      </>
    ),
  },
];

/** "Mentored juniors" becomes "I mentored juniors", for the how-I-work voice. */
const first = (line: string) => `I ${line.charAt(0).toLowerCase()}${line.slice(1)}`;

const howIWork: { title: string; body: string }[] = [
  {
    title: "One piece, all the way through",
    body: "I like owning a feature from the screen to the data behind it, so nothing gets lost in a handoff. That is how the main view at Lascade works: the same person covers the rendering and the pipeline.",
  },
  {
    title: "Tests for the awkward cases first",
    body: "I pin down the parts that are easy to get wrong, like how a download window moves when you skip ahead, with unit tests that need no network. When a bug gets through, the fix comes with the test that would have caught it.",
  },
  {
    title: "Write it up",
    body: `A feature is not finished until I can explain what I chose, what it cost and what I would change. That is why the blog has ${publishedPosts.length} posts, and why they say what went wrong as well as what shipped.`,
  },
  {
    title: "With other people",
    body: `${first(leadership[1])}. ${first(leadership[0])}. I use AI coding tools such as Claude Code, Codex and Cursor for refactors and review.`,
  },
];

const HiringTeams = () => (
  <section
    id="for-hiring-teams"
    className="mx-auto max-w-7xl scroll-mt-24 px-6 py-8 md:px-10 md:py-12 lg:px-14"
  >
    <div className="grid items-start gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
      <div className="flex flex-col gap-5 lg:sticky lg:top-28">
        <Reveal>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            For hiring teams
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
            I am looking for a full time role as a React, Next.js, full stack or
            frontend developer. I live in Thrissur and I am open to Kochi,
            Bangalore or remote.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex flex-wrap gap-2">
            <Badge size="md">Full time</Badge>
            <Badge size="md">Kochi</Badge>
            <Badge size="md">Bangalore</Badge>
            <Badge size="md">Remote</Badge>
          </div>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="text-base leading-relaxed text-muted-foreground">
            Full stack means I work on both the part people see in the browser
            (the frontend) and the server and data behind it. I am employed at
            Lascade at the moment, so start dates are something to talk about
            directly.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-base">
            <li>
              <a
                href={RESUME_PATH}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4 transition-colors duration-300 hover:text-accent"
              >
                Resume, one page PDF
              </a>
            </li>
            <li>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4 transition-colors duration-300 hover:text-accent"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4 transition-colors duration-300 hover:text-accent"
              >
                GitHub
              </a>
            </li>
          </ul>
        </Reveal>
      </div>

      <div className="flex flex-col gap-8 md:gap-10">
        <div className="flex flex-col gap-5">
          <Reveal>
            <h3 className="font-display text-2xl font-bold tracking-tight">
              What I am strongest at
            </h3>
          </Reveal>
          <ul className="flex flex-col gap-5">
            {strengths.map((item, i) => (
              <li key={item.title}>
                <Reveal delay={Math.min(i, 3) * 0.04}>
                  <h4 className="font-display text-lg font-bold tracking-tight">
                    {item.title}
                  </h4>
                  <p className="pt-1 text-base leading-relaxed text-muted-foreground md:text-lg">
                    {item.body}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <Reveal>
          <Squircle
            borderWidth={1}
            fillClassName="bg-card"
            className="bg-border p-6 md:p-8"
          >
            <h3 className="font-display text-2xl font-bold tracking-tight">
              How I work
            </h3>
            <ul className="flex flex-col gap-5 pt-5">
              {howIWork.map((item) => (
                <li key={item.title}>
                  <h4 className="font-display text-lg font-bold tracking-tight">
                    {item.title}
                  </h4>
                  <p className="pt-1 text-base leading-relaxed text-muted-foreground md:text-lg">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </Squircle>
        </Reveal>
      </div>
    </div>
  </section>
);

export default HiringTeams;
