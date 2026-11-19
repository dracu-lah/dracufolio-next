/**
 * The work history, as data. `points` are the things that shipped, one line
 * each: a bullet that runs to three lines stops being scanned, and the resume
 * PDF carries the long version.
 *
 * `stack` is a list rather than a sentence so the UI can render it as badges.
 * The same goes for every toolkit row.
 */
export const experience = [
  {
    role: "Full Stack Developer",
    company: "Lascade LLP",
    logo: "/logos/lascade.png",
    site: "https://lascade.com",
    period: "Nov 2025 - Present",
    points: [
      "Full stack developer on a Next.js and TypeScript web app deployed on Cloudflare Workers",
      "Own front end features from UI to API integration, including performance work",
      "Added multilingual support with next-intl, and set up the SEO baseline and analytics tagging",
      "Work with a designer and a team lead, with reviewed pull requests, and fix production issues",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Zustand",
      "TanStack Query",
      "Cloudflare Workers",
      "next-intl",
    ],
  },
  {
    role: "Frontend Developer",
    company: "Udyata Information Systems",
    logo: "/logos/udyata.png",
    site: "https://udyata.com",
    period: "Jun 2023 - Aug 2025",
    points: [
      "Built a shared library of 20+ React components that cut the team's build time by about 30 percent",
      "Cut first load with code splitting and lazy loading, and cut network calls by 20 percent",
      "Set up GitHub Actions CI/CD, which cut deploy errors by 15 percent",
      "Shipped B2B and healthcare apps in React and React Native, plus an admin panel and a self hosted OpenStreetMap stack (Nominatim, OSRM)",
    ],
    stack: [
      "React",
      "React Native",
      "Flutter",
      "Next.js",
      "Tailwind",
      "Redux",
      "Zustand",
      "GitHub Actions",
      "Docker",
    ],
  },
];

export const toolkit = [
  {
    label: "Languages",
    items: ["TypeScript", "JavaScript", "Kotlin", "Python", "HTML", "CSS"],
  },
  {
    label: "Frameworks",
    items: [
      "React",
      "Next.js",
      "React Native",
      "Tailwind CSS",
      "shadcn/ui",
      "Zustand",
      "TanStack Query",
      "React Hook Form",
      "Zod",
      "Jetpack Compose",
    ],
  },
  {
    label: "Platform",
    items: [
      "Cloudflare Workers",
      "D1",
      "R2",
      "Durable Objects",
      "OpenNext",
      "Wrangler",
      "Docker",
      "AWS",
      "GCP",
      "Vercel",
    ],
  },
  {
    label: "Practices",
    items: [
      "Component-driven UI",
      "React Server Components",
      "REST APIs",
      "i18n with next-intl",
      "SEO",
      "CI/CD",
    ],
  },
];

/**
 * Facts that sit beside the jobs, from the resume's Achievements and Leadership
 * block and from the project's own public numbers. The about page and the
 * answers in `faq.ts` read these so a number is written down once.
 */
export const leadership = [
  "Mentored junior developers on React patterns, wiring up backends and running servers",
];

/**
 * TMPlayer's public numbers, as of 20 Nov 2026. Stars, forks and releases come
 * from the GitHub repo, downloads from the counter on tmplayer.org. They are
 * strings so a sentence can print them as written, and they are the only copy:
 * the home page, the hiring section, the FAQ and llms.txt all read from here.
 * Update them together when the numbers are re-checked.
 */
export const tmplayerProof = {
  stars: "241",
  downloads: "24.4K",
  forks: "33",
  languages: "22",
  releases: "18",
  /** How many of those releases are stable, not pre-releases. */
  stableReleases: "15",
  /** The 18 releases landed in about this many weeks. */
  releaseWeeks: "12",
  checked: "2026-11-20",
};

/** Years in the React and Next.js ecosystem, as the resume and about page state it. */
export const yearsInReact = "3+";
