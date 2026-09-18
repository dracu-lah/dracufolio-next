import { mlKeywords } from "./ml";

/**
 * The words people actually type. Split by job so each list can be dropped
 * into the right place: role words belong in real sentences on the page,
 * skills belong in the toolkit and in knowsAbout, phrases belong in titles.
 */

/** Title and H1 level phrases. One page owns each of these. */
export const primaryPhrases = [
  "full stack developer in Thrissur",
  "full stack developer Kerala",
  "React developer Thrissur",
  "Next.js developer Kerala",
  "freelance web developer Thrissur",
  "software developer Thrissur",
  "hire a developer in Kerala",
  "web developer in Thrissur",
  "mobile app developer Thrissur",
  "Nevil Krishna K",
];

/**
 * Every job title and shorthand that describes the same person. These go into
 * sentences and into hasOccupation, never into a hidden keyword block.
 */
export const roleWords = [
  "full stack developer",
  "full stack engineer",
  "frontend developer",
  "front end developer",
  "backend developer",
  "software developer",
  "software engineer",
  "SDE",
  "SWE",
  "web developer",
  "website developer",
  "React developer",
  "ReactJS developer",
  "Next.js developer",
  "NextJS developer",
  "TypeScript developer",
  "JavaScript developer",
  "UI developer",
  "UI engineer",
  "MERN developer",
  "mobile app developer",
  "React Native developer",
  "Android developer",
  "Kotlin developer",
  "freelance developer",
  "remote developer",
  "contract developer",
  "programmer",
  "coder",
  "dev",
  "web dev",
  "app dev",
  "product engineer",
  "Cloudflare developer",
  "Tailwind developer",
];

/** The short ones that read fine in a list on the page. */
export const roleShortlist = [
  "Full stack developer",
  "Frontend developer",
  "Software engineer (SDE/SWE)",
  "React and Next.js developer",
  "Web developer",
  "React Native and Android developer",
];

/** Occupations for schema.org hasOccupation. */
export const occupations = [
  "Full Stack Developer",
  "Frontend Developer",
  "Software Engineer",
  "React Developer",
  "Next.js Developer",
  "Mobile App Developer",
];

export const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "shadcn/ui",
  "Zustand",
  "TanStack Query",
  "React Native",
  "Kotlin",
  "Jetpack Compose",
  "Python",
  "Django",
  "Node.js",
  "REST APIs",
  "Cloudflare Workers",
  "Cloudflare D1",
  "Cloudflare R2",
  "Durable Objects",
  "OpenNext",
  "Docker",
  "AWS",
  "GCP",
  "Vercel",
  "next-intl",
  "SEO",
  "CI/CD",
  "GitHub Actions",
  "Linux",
];

/**
 * The keywords meta tag. Google ignores it; Bing and several AI crawlers still
 * read it, and ChatGPT search runs on Bing's index, so it is worth filling.
 */
export const metaKeywords = [
  "Nevil Krishna K",
  "Nevil Krishna",
  "nevil.dev",
  ...primaryPhrases,
  ...roleWords.slice(0, 20),
  ...skills.slice(0, 12),
  ...mlKeywords,
];

/** Same idea, narrowed to one place. Used by the /hire/{location} pages. */
export const locationKeywords = (name: string, altNames: string[] = []) => {
  const places = [name, ...altNames];
  return places.flatMap((place) => [
    `full stack developer in ${place}`,
    `web developer in ${place}`,
    `React developer ${place}`,
    `software developer ${place}`,
    `freelance developer ${place}`,
    `app developer ${place}`,
    `hire a developer in ${place}`,
  ]);
};
