import aboutData from "@/data/about.json";
import { RESUME_PATH } from "@/data/contact";
import projectsData from "@/data/projects.json";
import { type Project } from "@/types/portfolio";

const projects = projectsData as Project[];

export async function GetResumeAPI() {
  return RESUME_PATH;
}

export async function GetHeroImageAPI() {
  return "/appwrite/hero-image/hero_image_v2.jpg";
}

export async function GetAboutDescriptionAPI() {
  return aboutData.about_description;
}

export async function GetSkillsAPI() {
  return [
    "/appwrite/skills/git.png",
    "/appwrite/skills/html5.png",
    "/appwrite/skills/react.png",
    "/appwrite/skills/tailwindcss.png",
    "/appwrite/skills/linux.png",
    "/appwrite/skills/zustand.png",
    "/appwrite/skills/neovim.png",
    "/appwrite/skills/typescript.png",
  ];
}

/** Every published project, early ones included. Pages, sitemap and llms.txt use this. */
export async function GetProjectsAPI(): Promise<Project[]> {
  return projects.filter((p) => p.published).sort((a, b) => a.order - b.order);
}

/** The main grid: every published project except the early ones. */
export async function GetMainProjectsAPI(): Promise<Project[]> {
  return (await GetProjectsAPI()).filter((p) => p.era !== "early");
}

/** The early, tutorial-era projects, newest year first. */
export async function GetEarlyProjectsAPI(): Promise<Project[]> {
  return (await GetProjectsAPI())
    .filter((p) => p.era === "early")
    .sort(
      (a, b) =>
        Number(b.year ?? 0) - Number(a.year ?? 0) || a.order - b.order,
    );
}

export async function GetProjectBySlugAPI(
  slug: string,
): Promise<Project | undefined> {
  return projects.find((p) => p.published && p.slug === slug);
}
