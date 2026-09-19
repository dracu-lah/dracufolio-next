import Link from "next/link";
// import Skills from "./components/Skills";
import ExperienceList from "./components/ExperienceList";
import Toolkit from "./components/Toolkit";
import Reveal from "@/components/common/Reveal";
import { LINKEDIN_URL } from "@/data/contact";
// import { GetSkillsAPI } from "@/services/api";

const SkillsSection = () => {
  return (
    <section
      id="experience"
      className="mx-auto max-w-7xl px-6 py-8 md:px-10 md:py-12 lg:px-14"
    >
      <div className="grid items-start gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
        <div className="flex flex-col gap-5 lg:sticky lg:top-28">
          <Reveal delay={0.08}>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Experience
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              Three years of <b>React</b> work across product teams, from design
              handoff to production. The full work history is on{" "}
              <a
                className="underline underline-offset-4 transition-colors duration-300 hover:text-accent"
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              .
            </p>
          </Reveal>
        </div>

        {/* Skills logo grid is parked, add back if needed */}
        {/* <Skills skills={skills} /> */}

        <div className="flex flex-col gap-8 md:gap-10">
          <Toolkit />
          <ExperienceList />
          <Reveal>
            <Link
              href="/about"
              className="text-base text-muted-foreground underline underline-offset-4 transition-colors duration-300 hover:text-accent"
            >
              Full profile
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
export default SkillsSection;
