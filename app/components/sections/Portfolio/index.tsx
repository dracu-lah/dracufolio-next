import Link from "next/link";
import type { ReactNode } from "react";
import ProjectsRail from "./components/ProjectsRail";
import Reveal from "@/components/common/Reveal";
import { ArrowRight } from "@/components/common/icons";
import { GetProjectsAPI } from "@/services/api";
import { type Project } from "@/types/portfolio";

/**
 * The projects rail and its heading, shared by the landing page and the hire
 * pages so there is one project card treatment on the site.
 *
 * `limit` keeps the landing rail to a look at the work rather than the whole
 * list. A page whose job is to show the work passes `"all"`, and the link
 * beside the heading only appears when the rail is holding something back.
 */
const PortfolioSection = async ({
  heading = "Projects",
  intro,
  limit = 4,
}: {
  heading?: string;
  intro?: ReactNode;
  limit?: number | "all";
}) => {
  let projects: Project[] = [];

  try {
    projects = await GetProjectsAPI();
  } catch (error) {
    console.error("Failed to load projects:", error);
  }

  const featured = limit === "all" ? projects : projects.slice(0, limit);
  const hasMore = featured.length < projects.length;

  return (
    /*
     * The rail is a sibling of the heading rather than a child of the same
     * capped container. Inside it, `max-w-7xl` clamped the scroller at 1280
     * and the bleed stopped short of the screen: on a 1430px window the last
     * card was sliced 75px from the edge with a strip of empty page after it,
     * which reads as a layout bug rather than as "there is more here". Only
     * the heading is capped now, and the rail runs the full width.
     */
    <section id="portfolio" className="flex flex-col gap-5 py-8 md:gap-6 md:py-10">
      <div className="mx-auto w-full max-w-7xl">
        {/* Heading and the link out sit on one line, so the section starts with
            work instead of with two stacked rows of chrome. That link is the
            only route to the full list; a second button under the rail was the
            same destination twice. */}
        <Reveal className="px-6 md:px-10 lg:px-14">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                {heading}
              </h2>
              {hasMore && (
                <Link
                  href="/projects"
                  className="group flex items-center gap-2 text-base text-muted-foreground transition-colors duration-200 hover:text-accent"
                >
                  All {projects.length} projects
                  <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              )}
            </div>
            {intro && (
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                {intro}
              </p>
            )}
          </div>
        </Reveal>

      </div>

      <ProjectsRail projects={featured} />
    </section>
  );
};

export default PortfolioSection;
