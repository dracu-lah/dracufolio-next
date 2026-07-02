export type Project = {
  id: string;
  slug: string;
  title: string;
  description: string;
  tagline: string | null;
  longDescription: string[];
  features: string[];
  skills: string[];
  images: string[];
  liveUrl: string | null;
  githubUrl: string | null;
  year: string | null;
  published: boolean;
  order: number;
};

export type Projects = Project[];

export type AboutSection = {
  about_description: string;
};

export type Socials = {
  linkedin_url: string;
  github_url: string;
};
