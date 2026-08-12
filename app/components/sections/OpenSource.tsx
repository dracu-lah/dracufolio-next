import Link from "next/link";

import Reveal from "@/components/common/Reveal";

const contentLink =
  "underline underline-offset-4 transition-colors duration-300 hover:text-foreground";

const items = [
  <>
    Built{" "}
    <Link className={contentLink} href="/projects/resume-builder">
      Resume Builder
    </Link>
    , a free developer resume builder, and got{" "}
    <a
      className={contentLink}
      href="https://resumebuilder.js.org/"
      target="_blank"
      rel="noopener noreferrer"
    >
      resumebuilder.js.org
    </a>{" "}
    accepted into js.org
  </>,
  <>
    Shipped{" "}
    <Link className={contentLink} href="/projects/email-sender">
      Email Sender
    </Link>
    , a Next.js app for personalized job outreach from your own Gmail
  </>,
  <>
    Made{" "}
    <Link className={contentLink} href="/projects/image-cropper">
      Image Cropper
    </Link>
    , a shadcn/ui registry component for uploading and cropping images
  </>,
  <>
    Built{" "}
    <a
      className={contentLink}
      href="https://github.com/dracu-lah/langsync-cli"
      target="_blank"
      rel="noopener noreferrer"
    >
      LangSync
    </a>
    , a parallel i18n sync engine that keeps translation files in step with one
    source of truth
  </>,
  <>
    Open-sourced my desktop setup:{" "}
    <a
      className={contentLink}
      href="https://github.com/dracu-lah/swaydots"
      target="_blank"
      rel="noopener noreferrer"
    >
      swaydots
    </a>{" "}
    for Sway and{" "}
    <a
      className={contentLink}
      href="https://github.com/dracu-lah/hyprdots"
      target="_blank"
      rel="noopener noreferrer"
    >
      hyprdots
    </a>{" "}
    for Hyprland
  </>,
  <>
    Merged PRs to{" "}
    <a
      className={contentLink}
      href="https://github.com/firstcontributions/first-contributions"
      target="_blank"
      rel="noopener noreferrer"
    >
      first-contributions
    </a>{" "}
    and{" "}
    <a
      className={contentLink}
      href="https://github.com/fossmeet/place"
      target="_blank"
      rel="noopener noreferrer"
    >
      FOSSMeet
    </a>{" "}
    community projects
  </>,
];

const OpenSourceSection = ({ asPage = false }: { asPage?: boolean }) => {
  const Heading = asPage ? "h1" : "h2";
  return (
    <section
      id="open-source"
      className="mx-auto max-w-6xl px-6 md:px-10 py-24 md:py-32 lg:py-40"
    >
      <div className="flex flex-col gap-8 md:gap-12">
        <div className="flex max-w-2xl flex-col gap-5">
          <Reveal>
            <p className="font-mono text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Contributions
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <Heading className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Open Source
            </Heading>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              163 public repos on{" "}
              <a
                className={contentLink}
                href="https://github.com/dracu-lah"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>{" "}
              since 2022. Selected work:
            </p>
          </Reveal>
        </div>

        <ul className="max-w-3xl divide-y divide-border border-t border-b border-border">
          {items.map((item, i) => (
            <li key={i}>
              <Reveal delay={0.04}>
                <p className="py-5 text-base leading-relaxed text-muted-foreground md:text-lg">
                  {item}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default OpenSourceSection;
