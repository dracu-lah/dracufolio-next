"use client";
import { type Project } from "@/types/portfolio";
import ProjectCard from "./ProjectCard";

/**
 * The projects rail: one horizontal scroller, the same on a phone and on a
 * desktop, driven by the browser.
 *
 * It used to pin the section and spend vertical scroll on horizontal travel.
 * That is a scroll hijack, and a hijack on the second section of the page
 * takes the scrollbar away from somebody who is still deciding whether to
 * stay. Here the rail scrolls when it is scrolled and the page scrolls when
 * the page is scrolled, which is the behaviour people already know.
 *
 * It also used to bleed to the screen edge, which meant a card ran past the
 * page's right gutter while every other section stopped at it. The rail now
 * sits in the same capped container as the rest of the page: the scroll is
 * still there, the last card is still cut to say there is more, and the cut
 * lands on the gutter instead of on the edge of the screen.
 *
 * There is no parallax on the screenshot: making the image shift inside its
 * frame means scaling it up first, and that cropped a tenth off the evidence
 * the card exists to show.
 */
const ProjectsRail = ({ projects }: { projects: Project[] }) => {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-14">
      <div
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 md:gap-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Projects, scroll sideways"
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="w-[78vw] max-w-[26rem] shrink-0 snap-start sm:w-[52vw] lg:w-[24rem]"
          >
            <ProjectCard project={project} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsRail;
