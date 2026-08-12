import Link from "next/link";
import Projects from "./components/Projects";
import Reveal from "@/components/common/Reveal";
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

  return (
    <section
      id="portfolio"
      className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20 lg:px-14"
    >
      <div className="flex flex-col gap-8 md:gap-12">
        <Reveal>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            Projects
          </h2>
        </Reveal>
        <Projects projects={projects} />
        <Reveal className="flex justify-center">
          <Link href="/projects" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto">
              All {projects.length} projects
            </Button>
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

export default PortfolioSection;
