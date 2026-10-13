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
  /**
   * A design study rather than a commissioned site: a brand I redesigned or
   * imagined on my own. The card and the project page label it, so nobody
   * reads it as client work.
   */
  concept?: boolean;
  /**
   * Set for software people install, so the project page describes it as a
   * SoftwareApplication rather than a CreativeWork. No version number: the
   * releases move faster than this file does.
   */
  app?: {
    /** A schema.org applicationCategory, e.g. "MultimediaApplication". */
    category: string;
    operatingSystem: string;
    downloadUrl: string;
    license: string;
  };
  /** Small square mark, usually the live site favicon */
  logo?: string;
  published: boolean;
  order: number;
};

export type Projects = Project[];

export type AboutSection = {
  about_description: string;
};
