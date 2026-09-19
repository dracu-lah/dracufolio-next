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
 * There is no parallax on the screenshot: making the image shift inside its
 * frame means scaling it up first, and that cropped a tenth off the evidence
 * the card exists to show.
 */
const ProjectsRail = ({ projects }: { projects: Project[] }) => {
  return (
    <div
      /*
       * The rail bleeds to the right edge so a half-visible card says "there
       * is more here", but its left edge and its first card still line up with
       * the page container above it.
       */
      className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-6 pb-2 md:gap-6 md:scroll-px-10 lg:scroll-px-14 xl:scroll-px-[calc(max(0px,(100%-80rem)/2)+3.5rem)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      aria-label="Projects, scroll sideways"
    >
      {/* Spacers, not padding. A scroll container drops the inline padding on
          its content box in every engine I checked, so the first card sat at
          the page edge while the heading above it sat at the gutter. A real
          element cannot be dropped.

          The width is the page gutter plus whatever `max-w-7xl` leaves at the
          side, so the first card lines up with the heading above it while the
          rail itself runs to the screen edge. `100%` rather than `100vw`,
          because `100vw` counts the scrollbar and would push the rail past
          the client area and give the page a horizontal scrollbar of its own. */}
      <div
        aria-hidden
        className="w-6 shrink-0 md:w-10 lg:w-14 xl:w-[calc(max(0px,(100%-80rem)/2)+3.5rem)]"
      />
      {projects.map((project, index) => (
        <div
          key={project.id}
          className="w-[82vw] max-w-[26rem] shrink-0 snap-start sm:w-[58vw] lg:w-[24rem]"
        >
          <ProjectCard project={project} index={index} />
        </div>
      ))}
      {/* Lets the last card come fully clear of the right edge. */}
      <div
        aria-hidden
        className="w-6 shrink-0 md:w-10 lg:w-14 xl:w-[calc(max(0px,(100%-80rem)/2)+3.5rem)]"
      />
    </div>
  );
};

export default ProjectsRail;
