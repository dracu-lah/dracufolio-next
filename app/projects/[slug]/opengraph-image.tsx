import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { GetProjectsAPI, GetProjectBySlugAPI } from "@/services/api";

export const alt = "Project by Nevil Krishna K";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export async function generateStaticParams() {
  const projects = await GetProjectsAPI();
  return projects.map((project) => ({ slug: project.slug }));
}

// params is a Promise in Next 16. It was typed and read as a plain object
// here, so every project card rendered the fallback: the eyebrow said Project,
// the title said Project, and nineteen shares looked identical.
const Image = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const project = await GetProjectBySlugAPI(slug);

  return ogImage({
    eyebrow: project?.year ? `Project · ${project.year}` : "Project",
    title: project?.title ?? "Project",
    description: project?.tagline ?? project?.description,
  });
};

export default Image;
