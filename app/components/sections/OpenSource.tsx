import Reveal from "@/components/common/Reveal";

const contentLink =
  "underline underline-offset-4 transition-colors duration-300 hover:text-foreground";

const items = [
  <>
    Built{" "}
    <a className={contentLink} href="/projects/resume-builder">
      Resume Builder
    </a>
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
    <a className={contentLink} href="/projects/email-sender">
      Email Sender
    </a>
    , a Next.js app for personalized job outreach from your own Gmail
  </>,
  <>
    Made{" "}
    <a className={contentLink} href="/projects/image-cropper">
      Image Cropper
    </a>
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

const OpenSourceSection = () => {
  return (
    <section id="open-source" className="mx-auto max-w-6xl px-6 py-16 md:py-24 lg:py-32">
      <div className="flex flex-col gap-8 md:gap-12">
        <div className="flex max-w-2xl flex-col gap-5">
          <Reveal>
            <p className="font-mono text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Public by default
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Open Source
            </h2>
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
              since 2022. The highlights:
            </p>
          </Reveal>
        </div>

        <ul className="grid gap-4 md:grid-cols-2">
          {items.map((item, i) => (
            <li key={i} className="h-full">
              <Reveal delay={(i % 2) * 0.08} className="h-full">
                <div className="flex h-full gap-3 border border-border bg-card px-5 py-4 text-base leading-relaxed text-muted-foreground md:px-6 md:py-5 md:text-lg">
                  <span
                    aria-hidden
                    className="mt-2.5 size-1.5 shrink-0 bg-phosphor"
                  />
                  <span>{item}</span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default OpenSourceSection;
