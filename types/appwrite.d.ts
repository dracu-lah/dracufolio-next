export type Projects = {
    $id: string;
    project_title: string;
    project_meta_description: string;
    project_link: string | null;
    project_skills: string[];
    img_url: string;
    isPublished: boolean;
    sort_order: number;
    github_link: string | null;
}[];

export type AboutSection = {
    about_description: string;
};

export type Socials = {
    linkedin_url: string;
    github_url: string;
};
