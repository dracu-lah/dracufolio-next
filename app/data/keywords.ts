import { mlKeywords } from "./ml";

/**
 * The words people actually type. Split by job so each list can be dropped
 * into the right place: role words belong in real sentences on the page,
 * skills belong in the toolkit and in knowsAbout, phrases belong in titles.
 */

/** Title and H1 level phrases. One page owns each of these. */
export const primaryPhrases = [
  "full stack developer in Thrissur",
  "Next.js and React developer Kerala",
  "freelance web developer in Thrissur",
  "freelance web developer Kerala",
  "web developer in Thrissur",
  "website developer Thrissur",
  "freelance Next.js developer India",
  "mobile app developer Thrissur",
  "hire a developer in Kerala",
  "Nevil Krishna K",
];

/**
 * The job titles that describe the same person. These go into sentences and
 * into the keywords meta tag, never into a hidden keyword block. Kept short:
 * a long list of near-duplicate titles reads as stuffing.
 */
export const roleWords = [
  "full stack developer",
  "frontend developer",
  "web developer",
  "React developer",
  "Next.js developer",
  "TypeScript developer",
  "mobile app developer",
  "freelance web developer",
];

/** The short list that reads fine on a page. */
export const roleShortlist = [
  "Full stack developer",
  "Frontend developer",
  "Android developer",
];

/** The About page's keywords meta: the name plus three role words. */
export const aboutKeywords = [
  "Nevil Krishna K",
  "about Nevil Krishna",
  ...roleWords.slice(0, 3),
];

/** Occupations for schema.org hasOccupation. */
export const occupations = [
  "Full Stack Developer",
  "Frontend Developer",
  "Freelance Web Developer",
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
  ...roleWords,
  ...skills.slice(0, 12),
  ...mlKeywords,
];

/** Same idea, narrowed to one place. Used by the /hire/{location} pages. */
export const locationKeywords = (name: string, altNames: string[] = []) => {
  const places = [name, ...altNames];
  return places.flatMap((place) => [
    `freelance web developer in ${place}`,
    `web developer in ${place}`,
    `website developer ${place}`,
    `full stack developer in ${place}`,
    `React developer ${place}`,
    `software developer ${place}`,
    `freelance developer ${place}`,
    `app developer ${place}`,
    `hire a developer in ${place}`,
  ]);
};
