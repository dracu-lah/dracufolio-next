"use client";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { type Project } from "@/types/portfolio";
import { useSpotlight } from "@/hooks/useSpotlight";
import Badge from "@/components/common/Badge";
import { ArrowRight } from "@/components/common/icons";

const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const spotlight = useSpotlight(240);

  return (
    /*
     * The entrance is the `rise-in` keyframe in globals.css, not a framer
     * initial state: a card that needs JavaScript before it is visible is a
     * card that can stay invisible. See the note beside the keyframe.
     */
    <article
      {...(spotlight?.handlers ?? {})}
      style={{ "--rise-delay": `${Math.min(index, 5) * 60}ms` } as CSSProperties}
      className="rise-in group relative flex h-full flex-col overflow-hidden rounded-xl squircle border border-border bg-card transition-colors duration-300 hover:border-accent-edge"
    >
      {spotlight && (
        <motion.span
          aria-hidden
          className="border-spotlight z-20"
          style={spotlight.style}
        />
      )}
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`Open ${project.title} details`}
        className="absolute inset-0 z-10"
      />

      <div className="relative aspect-video overflow-hidden">
        <Image
          draggable="false"
          fill
          sizes="(min-width: 1024px) 50vw, 90vw"
          src={project.images[0]}
          className="h-full w-full object-cover transition-transform duration-500 ease-out lg:group-hover:scale-[1.03]"
          alt={`Screenshot of ${project.title}`}
        />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col gap-2 border-t border-border p-5 md:p-6">
          <h3 className="font-display text-left text-xl font-bold tracking-tight md:text-2xl">
            {project.title}
          </h3>
          {/* Two lines, always. A card that is three lines tall next to one that
              is one line tall breaks the row, and the detail page has the rest. */}
          <p className="line-clamp-3 text-left text-base leading-relaxed text-muted-foreground md:line-clamp-2">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-4 md:px-6">
          <div className="flex flex-wrap items-center gap-1.5">
            {project.skills.slice(0, 3).map((skill: string) => (
              <Badge key={skill}>{skill}</Badge>
            ))}
            {project.skills.length > 3 && (
              <Badge tone="ghost">+{project.skills.length - 3}</Badge>
            )}
          </div>
          {/* The affordance. The whole card is the link, but a card with no
              visible action reads as a picture rather than as a door. */}
          <span className="flex items-center gap-1.5 font-mono text-sm tracking-wide text-muted-foreground uppercase transition-colors duration-300 group-hover:text-accent">
            Case study
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
};

const Projects = ({ projects }: { projects: Project[] }) => (
  /*
   * One column on a phone rather than a horizontal rail. The rail showed one
   * card at a time, so five of the six pieces of proof were behind a swipe
   * most people never make. The last three are held back until `sm` so the
   * phone page does not turn into six full-width screenshots.
   */
  <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:gap-8">
    {projects.map((project, index) => (
      <div
        key={project.id}
        className={index > 2 ? "hidden sm:block" : undefined}
      >
        <ProjectCard project={project} index={index} />
      </div>
    ))}
  </div>
);

export default Projects;
