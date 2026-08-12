import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { GetProjectsAPI, GetProjectBySlugAPI } from "@/services/api";

export const alt = "Project by Nevil Krishna K";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export async function generateStaticParams() {
  const projects = await GetProjectsAPI();
  return projects.map((project) => ({ slug: project.slug }));
}

const Image = async ({ params }: { params: { slug: string } }) => {
  const project = await GetProjectBySlugAPI(params.slug);

  return ogImage({
    eyebrow: project?.year ? `Project · ${project.year}` : "Project",
    title: project?.title ?? "Project",
    description: project?.tagline ?? project?.description,
  });
};

export default Image;
