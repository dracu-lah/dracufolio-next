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
      "Ships SeatInfo, a seat map product on Next.js 16 and Cloudflare Workers, D1, R2 and Durable Objects",
      "Owns the seat map end to end, from to-scale rendering and zoom to the import pipeline behind it",
      "Runs the i18n sync engine and the SEO baseline, plus Mixpanel tagging on every outbound link",
      "Wired the Resend SDK into Django for transactional email",
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
      "Docker",
    ],
  },
  {
    role: "Frontend Developer",
    company: "Udyata Information Systems",
    logo: "/logos/udyata.png",
    site: "https://udyata.com",
    period: "Jun 2023 - Aug 2025",
    points: [
      "Built and maintained 20+ reusable React components, cutting build time by 30 percent",
      "Cut first load through code splitting, lazy loading and memoization",
      "Cut API overhead by 20 percent and deploy errors by 15 percent with GitHub Actions CI/CD",
      "Built the TukTuko admin panel and self-hosted OpenStreetMap services (Nominatim, OSRM)",
    ],
    stack: [
      "React",
      "React Native",
      "Flutter",
      "Next.js",
      "Tailwind",
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
