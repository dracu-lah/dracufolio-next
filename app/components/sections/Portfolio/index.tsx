import Link from "next/link";
import Projects from "./components/Projects";
import Reveal from "@/components/common/Reveal";
import { Button } from "@/components/ui/button";
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
    <section id="portfolio" className="mx-auto max-w-6xl px-6 py-16 md:py-24 lg:py-32">
      <div className="flex flex-col gap-8 md:gap-12">
        <div className="flex flex-col gap-5">
          <Reveal>
            <p className="font-mono text-sm uppercase tracking-[0.3em] text-muted-foreground">
              {projects.length} projects · deployed, not just localhost
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Selected Work
            </h2>
          </Reveal>
        </div>
        <Projects projects={featured} />
        {projects.length > FEATURED_COUNT && (
          <Reveal className="flex justify-center">
            <Link href="/projects" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto">
                all {projects.length} projects
              </Button>
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;
