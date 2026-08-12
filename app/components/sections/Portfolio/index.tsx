import Link from "next/link";
import Projects from "./components/Projects";
import Reveal from "@/components/common/Reveal";
import { GetProjectsAPI } from "@/services/api";
import { type Project } from "@/types/portfolio";

const FEATURED_COUNT = 6;

const PortfolioSection = async () => {
  let projects: Project[] = [];

  try {
    projects = await GetProjectsAPI();
  } catch (error) {
    console.error("Failed to load projects:", error);
  }

  const featured = projects.slice(0, FEATURED_COUNT);

  return (
    <section
      id="portfolio"
      className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14 py-14 md:py-20"
    >
      <div className="flex flex-col gap-8 md:gap-12">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-10">
          <div className="flex flex-col gap-5">
            <Reveal>
              <p className="font-mono text-base uppercase tracking-[0.22em] text-muted-foreground">
                What I have built
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                Projects
              </h2>
            </Reveal>
          </div>
          {projects.length > FEATURED_COUNT && (
            <Reveal delay={0.16}>
              <Link
                href="/projects"
                className="font-mono text-base uppercase tracking-[0.18em] text-muted-foreground underline underline-offset-4 transition-colors duration-300 hover:text-foreground"
              >
                All {projects.length} projects
              </Link>
            </Reveal>
          )}
        </div>
        <Projects projects={featured} />
      </div>
    </section>
  );
};

export default PortfolioSection;
