import Image from "next/image";
import Link from "next/link";
import { Github } from "lucide-react";

import Reveal from "@/components/common/Reveal";

type Item = {
  name: string;
  logo?: string;
  href: string;
  internal?: boolean;
  description: string;
  meta: string;
};

const items: Item[] = [
  {
    name: "TMPlayer",
    logo: "/logos/tmplayer.png",
    href: "/projects/tmplayer",
    internal: true,
    description:
      "Telegram video player for Android TV and phone. Signs in with a QR code and streams from your own chats while the file is still downloading.",
    meta: "Kotlin · Jetpack Compose · TDLib · Media3 · GPL-3.0",
  },
  {
    name: "Resume Builder",
    logo: "/logos/resume-builder.png",
    href: "/projects/resume-builder",
    internal: true,
    description:
      "Free developer resume builder with live editing and PDF import. Accepted into js.org as resumebuilder.js.org.",
    meta: "React · js.org",
  },
  {
    name: "LangSync",
    href: "https://github.com/dracu-lah/langsync-cli",
    description:
      "Parallel i18n sync engine that keeps translation files in step with one source of truth.",
    meta: "CLI · Node.js",
  },
  {
    name: "Image Cropper",
    href: "/projects/image-cropper",
    internal: true,
    description:
      "shadcn/ui registry component for uploading and cropping images.",
    meta: "React · shadcn/ui",
  },
  {
    name: "Email Sender",
    href: "/projects/email-sender",
    internal: true,
    description:
      "Next.js app for personalised job outreach from your own Gmail account.",
    meta: "Next.js · Gmail API",
  },
  {
    name: "swaydots and hyprdots",
    href: "https://github.com/dracu-lah/swaydots",
    description:
      "My desktop setup published in full: Sway and Hyprland configs, scripts and theming.",
    meta: "Shell · Sway · Hyprland",
  },
  {
    name: "Community contributions",
    href: "https://github.com/firstcontributions/first-contributions",
    description:
      "Merged pull requests to first-contributions and the FOSSMeet community projects.",
    meta: "first-contributions · FOSSMeet",
  },
];

const OpenSourceSection = ({ asPage = false }: { asPage?: boolean }) => {
  const Heading = asPage ? "h1" : "h2";
  return (
    <section
      id="open-source"
      className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20 lg:px-14"
    >
      <div className="grid items-start gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
        <div className="flex flex-col gap-5 lg:sticky lg:top-28">
          <Reveal delay={0.08}>
            <Heading className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Open Source
            </Heading>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              163 public repos on{" "}
              <a
                className="underline underline-offset-4 transition-colors duration-300 hover:text-foreground"
                href="https://github.com/dracu-lah"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>{" "}
              since 2022. Selected work below.
            </p>
          </Reveal>
        </div>

        <ul className="divide-y divide-border border-t border-b border-border">
          {items.map((item) => {
            const body = (
              <>
                <h3 className="font-display flex items-center gap-3 text-xl font-bold tracking-tight md:text-2xl">
                  {item.logo ? (
                    <Image
                      src={item.logo}
                      alt=""
                      aria-hidden
                      width={64}
                      height={64}
                      className="size-6 shrink-0 rounded-md object-contain md:size-7"
                    />
                  ) : (
                    <Github className="size-6 shrink-0 md:size-7" aria-hidden />
                  )}
                  {item.name}
                </h3>
                <p className="pt-2 text-base leading-relaxed text-muted-foreground md:text-lg">
                  {item.description}
                </p>
                <p className="pt-3 font-mono text-base text-muted-foreground">
                  {item.meta}
                </p>
              </>
            );

            return (
              <li key={item.name}>
                <Reveal>
                  {item.internal ? (
                    <Link
                      href={item.href}
                      className="block py-6 transition-opacity duration-300 hover:opacity-75"
                    >
                      {body}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block py-6 transition-opacity duration-300 hover:opacity-75"
                    >
                      {body}
                    </a>
                  )}
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default OpenSourceSection;
