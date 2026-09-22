import Link from "next/link";
import HeroImage from "./components/HeroImage";
import Reveal from "@/components/common/Reveal";
import InlineLogo from "@/components/common/InlineLogo";
import Spotlight from "@/components/motion/Spotlight";
import { Button } from "@/components/ui/button";
import { BriefcaseIcon, SquaresFour } from "@/components/common/icons";

/**
 * Two text elements and two buttons, and it has to fit the first screen at
 * 390px as well as at 1280px.
 *
 * The roles sit on one static line. They used to cycle through a typewriter,
 * which meant the one fact a visitor came to establish was never all on screen
 * at once and the page never stopped moving. Written out, every role is
 * readable in the first glance and there is no perpetual animation left on the
 * site.
 *
 * Android is `wideOnly`: it shows once there is a full desktop line to put it
 * on. On a phone and on a tablet the line wrapped onto a second row for one
 * word, which pushed the paragraph and both buttons further down the first
 * screen. The separator belongs to the role in front of it, so it is hidden
 * with the role it would otherwise dangle in front of.
 */
const ROLES = [
  { label: "Full Stack Developer" },
  { label: "React" },
  { label: "Next.js" },
  { label: "Android", wideOnly: true },
];

const HeroSection = () => (
  <section
    id="hero"
    className="mx-auto max-w-7xl px-6 pt-20 pb-8 md:px-10 md:pt-28 md:pb-10 lg:px-14"
  >
    <Spotlight />
    {/* Two columns from `md`, not from `lg`. On an iPad the photo used to drop
        under the text and sit in the middle of the page, which left a wide
        screen holding one narrow column of words. */}
    <div className="grid items-center gap-8 md:grid-cols-[1.2fr_0.8fr] md:gap-10 lg:gap-16">
      <div className="flex flex-col items-start gap-4 md:gap-5">
        <Reveal>
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Nevil Krishna K
            {/* The slash trails its role rather than leading the next one, so
                a wrap never starts a line with a stray separator. */}
            {/* `tracking-normal` because this span sits inside the h1 and was
                inheriting its `tracking-tight`. A monospace shrugged that off;
                DM Sans at -0.025em reads as cramped. */}
            <span className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-base leading-snug font-medium tracking-normal text-muted-foreground sm:text-lg">
              {ROLES.map((role, i) => {
                const next = ROLES[i + 1];
                return (
                  <span
                    key={role.label}
                    className={`whitespace-nowrap ${
                      role.wideOnly ? "hidden lg:inline" : ""
                    }`}
                  >
                    {role.label}
                    {next && (
                      <span
                        aria-hidden
                        className={`pl-2 text-border ${
                          next.wideOnly ? "hidden lg:inline" : ""
                        }`}
                      >
                        /
                      </span>
                    )}
                  </span>
                );
              })}
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.06}>
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Three years building web apps, websites and Android apps people
            actually use. At{" "}
            <span className="text-foreground">
              <InlineLogo src="/logos/lascade.png">Lascade</InlineLogo>
            </span>{" "}
            in Thrissur, Kerala, remote across India.
          </p>
        </Reveal>

        {/*
          Two doors, not the WhatsApp button that the header and the docked bar
          are already carrying: somebody with a project or a role goes to
          /hire, somebody judging the work goes to /projects. The resume is
          deliberately not a third button here, it is already in the header
          from `lg` up and in the mobile menu below it. WhatsApp stays the one
          accent-filled button in view, so neither of these is solid.
        */}
        <Reveal delay={0.12} className="w-full">
          <div className="flex w-full max-w-xl flex-wrap items-center gap-3 md:gap-4">
            <Button
              asChild
              className="bg-accent-edge hover:bg-accent hover:text-accent-foreground"
            >
              <Link href="/hire">
                <BriefcaseIcon className="size-5" />
                Hire me
              </Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/projects">
                <SquaresFour className="size-5" />
                Projects
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>

      <Reveal
        delay={0.18}
        y={40}
        className="justify-self-center md:justify-self-end"
      >
        <HeroImage />
      </Reveal>
    </div>
  </section>
);

export default HeroSection;
