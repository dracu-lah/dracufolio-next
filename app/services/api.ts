import socialsData from "@/data/socials.json";
import aboutData from "@/data/about.json";
import projectsData from "@/data/projects.json";
import { type Project } from "@/types/portfolio";

const projects = projectsData as Project[];

export async function GetGithubURLAPI() {
  return socialsData.github_url;
}

export async function GetResumeAPI() {
  return "/appwrite/resume/Nevil-Krishna-Frontend-Resume.pdf";
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

export async function GetProjectsAPI(): Promise<Project[]> {
  return projects.filter((p) => p.published).sort((a, b) => a.order - b.order);
}

export async function GetProjectBySlugAPI(
  slug: string,
): Promise<Project | undefined> {
  return projects.find((p) => p.published && p.slug === slug);
}
