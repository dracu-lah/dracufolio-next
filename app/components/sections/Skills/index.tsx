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
    <section id="skills" className="mx-auto max-w-6xl px-6 py-16 md:py-24 lg:py-32">
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
              Two and a half years of <b>React</b> work, mostly design
              handoffs turned into shipped screens. The full work history lives
              on{" "}
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
              href="/experience"
              className="font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground underline underline-offset-4 transition-colors duration-300 hover:text-foreground"
            >
              full experience and toolkit
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
export default SkillsSection;
