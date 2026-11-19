import Link from "next/link";
import Reveal from "@/components/common/Reveal";
import { Squircle } from "@/components/ui/squircle";
import { GITHUB_URL, LINKEDIN_URL, RESUME_PATH } from "@/data/contact";

/**
 * How I work, on the about page. It is plain text on the server on purpose: a
 * crawler has to be able to quote it. Every claim is something the repo or a
 * blog post already says, and each one links to where it is said.
 *
 * It says nothing about what I am looking for, an employer, a start date or a
 * team size: none of those belong on a page that is open to everyone.
 */

const evidence: { title: string; body: React.ReactNode }[] = [
  {
    title: "Performance work, with the method",
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
    title: "Write-ups that mark what was a guess",
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
];

const withTeams: { title: string; body: string }[] = [
  {
    title: "One piece, all the way through",
    body: "I like owning a feature from the screen to the data behind it, from design to production.",
  },
  {
    title: "Tests for the awkward cases first",
    body: "I pin down the parts that are easy to get wrong, like how a download window moves when you skip ahead, with unit tests that need no network. When a bug gets through, the fix comes with the test that would have caught it.",
  },
  {
    title: "With other people",
    body: "I work with a designer and my pull requests are reviewed by the team lead. I mentored junior developers at Udyata. I use AI tools for drafts and refactors, and I read and test every change myself.",
  },
];

const HowIWork = () => (
  <section
    id="how-i-work"
    className="mx-auto max-w-7xl scroll-mt-24 px-6 py-8 md:px-10 md:py-12 lg:px-14"
  >
    <div className="grid items-start gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
      <div className="flex flex-col gap-5 lg:sticky lg:top-28">
        <Reveal>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            How I work
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
            Three things I can point to, each one linked to where it can be
            checked, and how I work with other people.
          </p>
        </Reveal>
        <Reveal delay={0.12}>
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
        <ul className="flex flex-col gap-5">
          {evidence.map((item, i) => (
            <li key={item.title}>
              <Reveal delay={Math.min(i, 3) * 0.04}>
                <h3 className="font-display text-xl font-bold tracking-tight">
                  {item.title}
                </h3>
                <p className="pt-1 text-base leading-relaxed text-muted-foreground md:text-lg">
                  {item.body}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal>
          <Squircle
            borderWidth={1}
            fillClassName="bg-card"
            className="bg-border p-6 md:p-8"
          >
            <ul className="flex flex-col gap-5">
              {withTeams.map((item) => (
                <li key={item.title}>
                  <h3 className="font-display text-lg font-bold tracking-tight">
                    {item.title}
                  </h3>
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

export default HowIWork;
