import socialsData from "@/appwrite/data/socials.json";
import aboutData from "@/appwrite/data/about.json";
import projectsData from "@/appwrite/data/projects.json";

export async function GetGithubURLAPI() {
  return socialsData.github_url;
}

export async function GetResumeAPI() {
  return "/appwrite/resume/Nevil-2-Years-Frontend-Resume.pdf";
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

export async function GetProjectsAPI() {
  return projectsData.filter((p) => p.isPublished).sort((a, b) => a.sort_order - b.sort_order);
}
