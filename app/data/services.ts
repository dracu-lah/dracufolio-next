/**
 * The six things people actually hire me for. Ordered by how often they get
 * asked for, not by what is most fun to build. `icon` is a Phosphor icon name;
 * the component maps it so the data file stays free of imports.
 */

export type Service = {
  slug: string;
  title: string;
  /** Icon name from @phosphor-icons/react, duotone weight. */
  icon:
    | "Browsers"
    | "MagnifyingGlass"
    | "DeviceMobile"
    | "SquaresFour"
    | "CloudArrowUp"
    | "Gauge";
  blurb: string;
  /** Feeds hasOfferCatalog and the serviceType list in schema. */
  serviceType: string;
};

export const services: Service[] = [
  {
    slug: "web-apps",
    title: "Web apps",
    icon: "Browsers",
    blurb:
      "React and Next.js applications with real users behind them. Auth, payments, roles, the parts that get hard after the demo.",
    serviceType: "Web application development",
  },
  {
    slug: "websites-that-rank",
    title: "Websites that rank",
    icon: "MagnifyingGlass",
    blurb:
      "Next.js sites built for search from the first commit: server rendered pages, schema, sitemaps, and a Lighthouse score you can show a client.",
    serviceType: "Website design and SEO",
  },
  {
    slug: "mobile-apps",
    title: "Mobile apps",
    icon: "DeviceMobile",
    blurb:
      "React Native for both stores, or Kotlin and Jetpack Compose when the app needs to be native. I have shipped an Android TV app too.",
    serviceType: "Mobile app development",
  },
  {
    slug: "dashboards",
    title: "Dashboards and admin panels",
    icon: "SquaresFour",
    blurb:
      "The screen your team uses all day. Tables that handle ten thousand rows, filters that survive a refresh, permissions that hold.",
    serviceType: "Admin dashboard development",
  },
  {
    slug: "cloudflare-and-deployment",
    title: "Cloudflare and deployment",
    icon: "CloudArrowUp",
    blurb:
      "Workers, D1, R2, Durable Objects and cron, wired up with OpenNext. Also Docker, CI on GitHub Actions, and getting off a server you are tired of paying for.",
    serviceType: "Cloud deployment and DevOps",
  },
  {
    slug: "performance-fixes",
    title: "Performance fixes and rescues",
    icon: "Gauge",
    blurb:
      "A slow site, a build nobody can run, or a project the last developer left half finished. I will read it, tell you what it needs, and fix it.",
    serviceType: "Website performance optimisation",
  },
];

export const serviceTypes = services.map((s) => s.serviceType);
