export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

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
  /**
   * Captioned screenshots with their real sizes, drawn by the project page in
   * place of `images`. `images[0]` stays the share card and sitemap image.
   */
  gallery?: GalleryImage[];
  liveUrl: string | null;
  githubUrl: string | null;
  year: string | null;
  /** Small square mark, usually the live site favicon */
  logo?: string;
  published: boolean;
  order: number;
};

export type Projects = Project[];

export type AboutSection = {
  about_description: string;
};
