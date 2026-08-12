import Link from "next/link";
import HeroImage from "./components/HeroImage";
import Reveal from "@/components/common/Reveal";
import InlineLogo from "@/components/common/InlineLogo";
import { Button } from "@/components/ui/button";

const HeroSection = () => (
  <section
    id="hero"
    className="mx-auto max-w-7xl px-6 pt-28 pb-14 md:px-10 lg:px-14 md:pt-36 md:pb-20"
  >
    <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
      <div className="flex flex-col items-start gap-8">
        <Reveal>
          <h1 className="font-display text-5xl leading-[1.05] font-bold tracking-tight sm:text-6xl">
            Nevil Krishna K
            <span className="mt-5 block text-lg font-normal tracking-[0.3em] text-muted-foreground uppercase sm:text-xl">
              Full Stack Developer
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            I build React and Next.js applications. Currently working on travel
            products at{" "}
            <span className="text-foreground">
              <InlineLogo src="/logos/lascade.png" alt="" />
              Lascade
            </span>
            , in Thrissur, Kerala.
          </p>
        </Reveal>

        <Reveal delay={0.16} className="w-full">
          <div className="flex w-full max-w-xl flex-col gap-3 sm:flex-row md:gap-4">
            <Link href="/projects" className="w-full sm:w-auto">
              <Button variant="solid" className="w-full sm:w-auto">
                Projects
              </Button>
            </Link>
            <a href="#contact" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto">Contact</Button>
            </a>
          </div>
        </Reveal>
      </div>

      <Reveal
        delay={0.2}
        y={40}
        className="justify-self-center lg:justify-self-end"
      >
        <HeroImage />
      </Reveal>
    </div>
  </section>
);

export default HeroSection;
