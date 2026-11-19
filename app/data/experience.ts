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
      "Builds and runs travel products on Next.js 16, deployed to Cloudflare Workers with OpenNext, D1 and R2",
      "Owns the core interactive view end to end, from the rendering and zoom to the data pipeline behind it",
      "Took the product multilingual with next-intl and a sync tool I wrote, and set up SEO and analytics",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Zustand",
      "TanStack Query",
      "Cloudflare Workers",
      "D1",
      "R2",
      "OpenNext",
      "next-intl",
      "Auth.js",
      "Django",
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
      "Product analytics",
      "SEO",
      "CI/CD",
      "Agile",
    ],
  },
];

/**
 * Facts that sit beside the jobs, from the resume's Achievements and Leadership
 * block and from the project's own public numbers. The about page and the
 * answers in `faq.ts` read these so a number is written down once.
 */
export const leadership = [
  "Kept client projects shipping through festival and election season peaks with no reported downtime",
  "Mentored juniors on React patterns, wiring up backends and running servers",
];

/** TMPlayer's public numbers: GitHub stars, and the download count on tmplayer.org. */
export const tmplayerProof = {
  stars: "240+",
  downloads: "24k+",
};
