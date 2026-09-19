import ProjectCard from "./ProjectCard";
import { type Project } from "@/types/portfolio";

/**
 * The grid, used by every page that lists projects as a list: /projects,
 * /hire and the location pages. The landing page uses `ProjectsRail` instead.
 *
 * One column on a phone. This used to hide everything past the third card
 * below `sm`, which made sense when the landing page was the only caller and
 * six screenshots in a column was the problem. On a page whose whole job is
 * the list, hiding most of the list is a bug, and the landing page no longer
 * renders this at all.
 */
const Projects = ({ projects }: { projects: Project[] }) => (
  <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:gap-8">
    {projects.map((project, index) => (
      <ProjectCard key={project.id} project={project} index={index} />
    ))}
  </div>
);

export default Projects;
