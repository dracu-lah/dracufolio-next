"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { type Project } from "@/types/portfolio";

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
      className="group relative flex min-w-80 snap-center flex-col overflow-hidden rounded-xl squircle border border-border transition-colors duration-300 hover:border-foreground"
    >
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`Open ${project.title} details`}
        className="absolute inset-0 z-10"
      />

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

      <div className="flex flex-1 flex-col">
        <div className="flex-1 border-t border-border p-6">
          <h3 className="font-display mb-3 flex items-center gap-3 text-left text-xl font-bold tracking-tight md:text-2xl">
            {project.logo && (
              <Image
                src={project.logo}
                alt=""
                aria-hidden
                width={64}
                height={64}
                className="size-6 shrink-0 rounded-md object-contain md:size-7"
              />
            )}
            {project.title}
          </h3>
          <p className="line-clamp-3 text-left text-base leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 overflow-hidden px-6 pb-6">
          {project.skills.map((skill: string) => (
            <span
              key={skill}
              className="inline-block font-mono text-base tracking-wide text-muted-foreground"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
};

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
