export const experience = [
  {
    role: "Full Stack Developer",
    company: "Lascade LLP",
    logo: "/logos/lascade.png",
    site: "https://lascade.com",
    period: "Nov 2025 - Present",
    points: [
      "Builds and ships SeatInfo, a seat map product on Next.js 16 and the Cloudflare stack: Workers via OpenNext, D1 for seat map data, R2 for assets, Durable Objects and cron triggers",
      "Owns the seat map experience end to end, from to-scale SVG rendering and zoom and pan interaction down to the seed pipeline that validates and imports every map",
      "Localised the product with next-intl and a translation sync engine, keeping every locale file in step with one source of truth",
      "Set up the SEO baseline across the catalog pages, plus Mixpanel event tagging so every outbound link reports the surface it came from",
      "Integrated the Resend SDK with Django to automate transactional email workflows",
    ],
    stack:
      "Next.js · TypeScript · Tailwind · Zustand · TanStack Query · Cloudflare Workers, D1, R2 · OpenNext · next-intl · Auth.js · Django · Docker",
  },
  {
    role: "Frontend Developer",
    company: "Udyata Information Systems",
    logo: "/logos/udyata.png",
    site: "https://udyata.com",
    period: "Jun 2023 - Aug 2025",
    points: [
      "Built and maintained 20+ reusable React components, improving development efficiency by 30%",
      "Cut initial load times through code splitting, lazy loading, and memoization",
      "Reduced network overhead by 20% through optimized API integrations, and deployment errors by 15% with GitHub Actions CI/CD",
      "Built the TukTuko admin panel and self-hosted OpenStreetMap services (Nominatim, OSRM) for a commission-free ride-hailing platform",
    ],
    stack: "React · React Native · Flutter · Next.js · Tailwind · Docker",
  },
];

export const toolkit = [
  {
    label: "Languages",
    value: "TypeScript, JavaScript, Kotlin, Python, HTML, CSS",
  },
  {
    label: "Frameworks",
    value:
      "React, Next.js, React Native, Tailwind CSS, shadcn/ui, Zustand, TanStack Query, React Hook Form, Zod, Jetpack Compose",
  },
  {
    label: "Platform",
    value:
      "Cloudflare Workers, D1, R2, Durable Objects, OpenNext, Wrangler, Docker, AWS, GCP, Vercel",
  },
  {
    label: "Practices",
    value:
      "Component-driven UI, React Server Components, REST APIs, i18n with next-intl, product analytics, SEO, CI/CD, Agile",
  },
];
