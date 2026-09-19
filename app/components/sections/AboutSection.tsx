import Image from "next/image";
import {
  ArrowUpRight,
  EnvelopeSimple,
  GithubLogo,
  LinkedinLogo,
  WhatsappLogo,
  XLogo,
  YoutubeLogo,
} from "@/components/common/icons";
import Reveal from "@/components/common/Reveal";
import InlineLogo from "@/components/common/InlineLogo";
import { GetHeroImageAPI } from "@/services/api";
import Icon3D from "@/components/motion/Icon3D";
import { Squircle } from "@/components/ui/squircle";
import {
  EMAIL_MAILTO,
  GITHUB_URL,
  LANGUAGES,
  LINKEDIN_URL,
  WHATSAPP_URL,
  X_URL,
  YOUTUBE_URL,
} from "@/data/contact";
import { roleShortlist } from "@/data/keywords";

const profile = [
  { key: "Role", value: "Full Stack Developer" },
  {
    key: "Roles",
    value: roleShortlist.join(", "),
  },
  { key: "Location", value: "Thrissur, Kerala (IST)" },
  {
    key: "Serves",
    value:
      "Thrissur district in person, Kerala within a day, all of India remotely",
  },
  { key: "Languages", value: LANGUAGES.join(", ") },
  { key: "Experience", value: "3+ years" },
  { key: "Focus", value: "React, Next.js, TypeScript" },
  { key: "Backend", value: "Django, Node.js, REST APIs" },
  { key: "Infra", value: "Cloudflare Workers, D1, R2, OpenNext, Docker" },
  { key: "Also", value: "Kotlin and Jetpack Compose on Android" },
  { key: "Environment", value: "Fedora, Neovim" },
  { key: "Availability", value: "Open to new work" },
];

const socialLinks = [
  { href: WHATSAPP_URL, label: "WhatsApp", icon: WhatsappLogo, external: true },
  { href: EMAIL_MAILTO, label: "Email", icon: EnvelopeSimple, external: false },
  { href: GITHUB_URL, label: "GitHub", icon: GithubLogo, external: true },
  { href: LINKEDIN_URL, label: "LinkedIn", icon: LinkedinLogo, external: true },
  { href: X_URL, label: "X", icon: XLogo, external: true },
  {
    href: YOUTUBE_URL,
    label: "YouTube",
    icon: YoutubeLogo,
    external: true,
  },
];

const contentLink =
  "underline underline-offset-4 transition-colors duration-300 hover:text-accent";

const AboutSection = async ({ asPage = false }: { asPage?: boolean }) => {
  const Heading = asPage ? "h1" : "h2";
  let portrait: string | null = null;
  try {
    portrait = await GetHeroImageAPI();
  } catch (error) {
    console.error("Failed to load portrait:", error);
  }

  return (
    <section
      id="about"
      className="mx-auto max-w-7xl px-6 py-8 md:px-10 md:py-12 lg:px-14"
    >
      {/* Photo left, the writing beside it from `md` up. It used to stack until
          `lg`, so an iPad got a wide photo with the page under it. */}
      <div className="grid items-start gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-10 lg:gap-16">
        <Reveal className="w-full">
          <div className="flex flex-col gap-6">
            {/* The same square crop as the hero, capped below `lg`: as a full
                width 4:5 it was a 342 by 427 photo on a 390px screen, which is
                most of the first screen of a page that is meant to be read. */}
            {portrait && (
              <Squircle
                as="figure"
                borderWidth={1}
                fillClassName="bg-card"
                className="w-full max-w-[14rem] overflow-hidden bg-border sm:max-w-[18rem] md:max-w-none"
              >
                <Image
                  width={720}
                  height={720}
                  sizes="(min-width: 1024px) 26rem, (min-width: 768px) 18rem, 14rem"
                  draggable="false"
                  className="aspect-square w-full object-cover"
                  src={portrait}
                  alt="Nevil Krishna K, full stack developer in Thrissur, Kerala"
                />
              </Squircle>
            )}
            {/* A column, not a wrapped row. Six names of very different
                lengths wrapped into a ragged two line block under a square
                photo; stacked, they line up with each other and with the
                photo's edge.

                `md` and up only, which is where the photo gets a column of its
                own. On a phone this was six full width rows standing between
                the heading and the first sentence of the page, and the footer
                carries the same six links there anyway. */}
            <ul className="hidden w-full flex-col divide-y divide-border border-t border-b border-border md:flex">
              {socialLinks.map(({ href, label, icon: Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex items-center gap-4 py-4 text-xl text-muted-foreground transition-colors duration-300 hover:text-accent"
                  >
                    <Icon3D chip size="md" tone="accent">
                      <Icon className="size-7" />
                    </Icon3D>
                    {label}
                    <ArrowUpRight className="ml-auto size-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="flex flex-col items-start gap-6">
          <Reveal delay={0.08}>
            <Heading className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              About
            </Heading>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              Full stack developer with{" "}
              <b>3 years in the React and Next.js ecosystem</b>, currently
              building high-traffic travel products like{" "}
              <a
                className={contentLink}
                href="https://seatinfo.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InlineLogo src="/logos/seatinfo.png">SeatInfo</InlineLogo>
              </a>{" "}
              and{" "}
              <a
                className={contentLink}
                href="https://www.flightpoints.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InlineLogo src="/logos/flightpoints.png">
                  Flightpoints
                </InlineLogo>
              </a>{" "}
              at{" "}
              <b>
                <InlineLogo src="/logos/lascade.png">Lascade</InlineLogo>
              </b>
              .
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              I work mostly on performance, accessibility and the parts of a
              product that decide whether it feels finished. Outside of client
              work I maintain open source tools and take part in the local{" "}
              <b>FOSS community</b>.
            </p>
          </Reveal>

          <Reveal delay={0.24} className="w-full pt-2">
            <dl className="w-full divide-y divide-border border-t border-b border-border">
              {profile.map((row) => (
                <div
                  key={row.key}
                  className="grid grid-cols-[8rem_1fr] gap-6 py-4 text-base md:grid-cols-[12rem_1fr] md:text-lg"
                >
                  <dt className="text-base text-muted-foreground">{row.key}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
