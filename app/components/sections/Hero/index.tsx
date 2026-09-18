import Link from "next/link";
import HeroImage from "./components/HeroImage";
import Reveal from "@/components/common/Reveal";
import InlineLogo from "@/components/common/InlineLogo";
import RoleCycle from "@/components/motion/RoleCycle";
import Spotlight from "@/components/motion/Spotlight";
import WhatsAppButton from "@/components/cta/WhatsAppButton";
import { Button } from "@/components/ui/button";
import Badge from "@/components/common/Badge";
import { AVAILABILITY } from "@/data/contact";
import { ml } from "@/data/ml";

/**
 * Four text elements and two buttons, and it has to fit the first screen at
 * 390px as well as at 1280px. The greeting is the hero's one small label, so
 * there is no eyebrow above the name.
 *
 * The role after the name cycles because the roles are the thing a visitor
 * came to establish: it says full stack, React, Next.js and Android inside a
 * couple of seconds without spending a paragraph on it. The full list stays in
 * the DOM for crawlers and screen readers.
 */
const ROLES = [
  { text: "Full Stack Developer" },
  { text: "React Developer" },
  { text: "Next.js Developer" },
  { text: "Android Developer" },
  { text: ml.roleFullStack, lang: "ml" as const },
];

const HeroSection = () => (
  <section
    id="hero"
    className="mx-auto max-w-7xl px-6 pt-24 pb-8 md:px-10 md:pt-28 md:pb-10 lg:px-14"
  >
    <Spotlight />
    <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
      <div className="flex flex-col items-start gap-6 md:gap-8">
        <Reveal>
          {/* One row, two jobs: the local greeting and the one fact a
              recruiter looks for first. Neither costs a line of its own. */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {AVAILABILITY.open && (
              <Badge tone="accent" dot size="md">
                {AVAILABILITY.label}
              </Badge>
            )}
            <p lang="ml" className="text-lg text-muted-foreground">
              {ml.heroGreeting}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Nevil Krishna K
            <span className="mt-4 block font-mono text-lg font-normal text-muted-foreground sm:text-xl">
              <RoleCycle roles={ROLES} />
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Three years building web apps, websites and Android apps people
            actually use. At{" "}
            <span className="text-foreground">
              <InlineLogo src="/logos/lascade.png">Lascade</InlineLogo>
            </span>{" "}
            in Thrissur, Kerala, remote across India.
          </p>
        </Reveal>

        <Reveal delay={0.18} className="w-full">
          <div className="flex w-full max-w-xl flex-col gap-3 sm:flex-row md:gap-4">
            <WhatsAppButton message="Hi Nevil, I found your site. I would like to talk about a project." />
            <Link href="/projects" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto">Projects</Button>
            </Link>
          </div>
        </Reveal>
      </div>

      <Reveal
        delay={0.24}
        y={40}
        className="justify-self-center lg:justify-self-end"
      >
        <HeroImage />
      </Reveal>
    </div>
  </section>
);

export default HeroSection;
