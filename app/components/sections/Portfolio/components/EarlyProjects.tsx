import Link from "next/link";
import Badge from "@/components/common/Badge";
import { ArrowRight } from "@/components/common/icons";
import { SQUIRCLE, Squircle } from "@/components/ui/squircle";
import { type Project } from "@/types/portfolio";

/**
 * The early, tutorial-era projects, kept as a quiet list under the main grid.
 * No screenshots: they are small, and the section should read as history
 * rather than compete with the work above it. Server rendered, and every
 * link is a real anchor.
 *
 * The title link stretches over the card (`after:absolute after:inset-0`),
 * and the live demo link sits above it, so there is no anchor inside an anchor.
 */
const EarlyProjects = ({ projects }: { projects: Project[] }) => (
  <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {projects.map((project) => {
      const stack = project.skills.slice(0, 3);
      return (
        <li key={project.id} className="min-w-0">
          <Squircle
            as="article"
            cornerRadius={SQUIRCLE.sm}
            borderWidth={1}
            fillClassName="bg-card"
            className="group h-full bg-border transition-colors duration-300 hover:bg-accent-edge"
          >
            <div className="relative flex h-full flex-col gap-3 p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-lg font-bold tracking-tight">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="after:absolute after:inset-0 after:content-['']"
                  >
                    {project.title}
                  </Link>
                </h3>
                {project.year && (
                  <Badge tone="ghost" className="shrink-0">
                    {project.year}
                  </Badge>
                )}
              </div>
              <p className="line-clamp-2 text-base leading-relaxed text-muted-foreground">
                {project.description}
              </p>
              <div className="mt-auto flex flex-col items-start gap-3 pt-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  {stack.map((skill) => (
                    <Badge key={skill}>{skill}</Badge>
                  ))}
                </div>
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open the live demo of ${project.title}`}
                    className="relative z-10 inline-flex items-center gap-1.5 text-base text-muted-foreground transition-colors duration-200 hover:text-accent"
                  >
                    Live demo
                    <ArrowRight aria-hidden className="size-5" />
                  </a>
                ) : null}
              </div>
            </div>
          </Squircle>
        </li>
      );
    })}
  </ul>
);

export default EarlyProjects;
