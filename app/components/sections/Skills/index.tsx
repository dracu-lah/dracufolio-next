import Link from "next/link";
import Skills from "./components/Skills";
import ExperienceList from "./components/ExperienceList";
import Toolkit from "./components/Toolkit";
import Reveal from "@/components/common/Reveal";
import { GetSkillsAPI } from "@/services/api";

const SkillsSection = async () => {
  let skills: string[] = [];

  try {
    skills = await GetSkillsAPI();
  } catch (error) {
    console.error("Failed to load skills:", error);
  }

  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 md:px-10 py-24 md:py-32 lg:py-40">
      <div className="flex flex-col gap-8 md:gap-12">
        <div className="flex max-w-2xl flex-col gap-5">
          <Reveal>
            <p className="font-mono text-sm uppercase tracking-[0.3em] text-muted-foreground">
              What I work with
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Skills &amp; Experience
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              Three years of <b>React</b> work across product teams, from
              design handoff to production. The full work history is on{" "}
              <a
                className="underline underline-offset-4 transition-colors duration-300 hover:text-foreground"
                href="https://www.linkedin.com/in/nevil-krishna-k-77170222a/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              .
            </p>
          </Reveal>
        </div>

        <Skills skills={skills} />

        <Toolkit />

        <div className="flex flex-col gap-8">
          <Reveal>
            <h3 className="font-mono text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Experience
            </h3>
          </Reveal>
          <ExperienceList />
          <Reveal>
            <Link
              href="/about"
              className="font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground underline underline-offset-4 transition-colors duration-300 hover:text-foreground"
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
