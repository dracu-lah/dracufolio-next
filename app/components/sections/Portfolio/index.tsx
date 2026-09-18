import Link from "next/link";
import Projects from "./components/Projects";
import Reveal from "@/components/common/Reveal";
import { ArrowRight } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import { GetProjectsAPI } from "@/services/api";
import { type Project } from "@/types/portfolio";

const PortfolioSection = async () => {
  let projects: Project[] = [];

  try {
    projects = await GetProjectsAPI();
  } catch (error) {
    console.error("Failed to load projects:", error);
  }

  const featured = projects.slice(0, 6);

  return (
    <section
      id="portfolio"
      className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16 lg:px-14 lg:py-20"
    >
      <div className="flex flex-col gap-7 md:gap-10">
        {/* Heading and the link out sit on one line, so the section starts with
            work instead of with two stacked rows of chrome. */}
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Projects
            </h2>
            <Link
              href="/projects"
              className="group hidden items-center gap-2 font-mono text-sm tracking-wide text-muted-foreground uppercase transition-colors duration-200 hover:text-accent sm:flex"
            >
              All {projects.length} projects
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>

        <Projects projects={featured} />

        <Reveal className="flex justify-center">
          <Link href="/projects" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto">
              See all {projects.length} projects
            </Button>
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

export default PortfolioSection;
