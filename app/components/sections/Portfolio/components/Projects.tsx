"use client";
import Image from "next/image";
import Link from "next/link";
import { Globe, Github } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { type Project } from "@/types/portfolio";

// Project Card Component
const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: (index % 2) * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative flex min-w-80 snap-center flex-col overflow-hidden border border-border bg-card transition-colors duration-300 hover:border-muted-foreground"
    >
      {/* Whole card opens the project page */}
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`Open ${project.title} details`}
        className="absolute inset-0 z-10"
      />

      <div className="flex items-center justify-between border-b border-border px-5 py-3 font-mono text-[13px] uppercase tracking-[0.25em] text-muted-foreground">
        <span>{String(index + 1).padStart(2, "0")}</span>
        {project.year && <span>{project.year}</span>}
      </div>

      <div className="relative">
        <div className="relative aspect-video">
          <Image
            draggable="false"
            fill
            sizes="(min-width: 1024px) 50vw, 90vw"
            src={project.images[0]}
            className="h-full w-full object-cover duration-300 lg:group-hover:opacity-90"
            alt={`Screenshot of ${project.title}`}
          />
        </div>

        {/* Quick links sit above the stretched link */}
        <div className="absolute top-3 right-3 z-20 flex gap-2">
          {project.liveUrl && (
            <Button
              asChild
              size="sm"
              className="bg-background/85 backdrop-blur-sm"
            >
              <a
                target="_blank"
                href={project.liveUrl}
                rel="noopener noreferrer"
                aria-label="Visit project website"
              >
                <span className="font-medium">Live</span>
                <Globe size={18} />
              </a>
            </Button>
          )}
          {project.githubUrl && (
            <Button
              asChild
              size="sm"
              className="bg-background/85 backdrop-blur-sm"
            >
              <a
                target="_blank"
                href={project.githubUrl}
                rel="noopener noreferrer"
                aria-label="View GitHub repository"
              >
                <span className="font-medium">Code</span>
                <Github size={18} />
              </a>
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex-1 border-t border-border px-6 py-5">
          <h3 className="font-display mb-3 text-left text-xl font-bold tracking-tight transition-colors duration-300 group-hover:text-phosphor md:text-2xl">
            {project.title}
          </h3>
          <p className="line-clamp-3 text-left text-base leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 overflow-hidden px-6 pb-6">
          {project.skills.map((skill: string) => (
            <span
              key={skill}
              className="inline-block border border-border px-2.5 py-1 font-mono text-sm tracking-wide text-muted-foreground"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
};

// Main Projects Component
const Projects = ({ projects }: { projects: Project[] }) => {
  return (
    <>
      {/* Mobile: Horizontal Scroll */}
      <div className="relative lg:hidden">
        <div className="scrollbar-visible flex max-w-[90vw] snap-x snap-mandatory gap-4 overflow-x-scroll overflow-y-hidden pb-4">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>

      {/* Desktop: two-column grid for larger imagery */}
      <div className="hidden gap-8 lg:grid lg:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </>
  );
};

export default Projects;
