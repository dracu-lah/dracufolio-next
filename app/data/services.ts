/**
 * The six things people actually hire me for. Ordered by how often they get
 * asked for, not by what is most fun to build. `icon` is a Phosphor icon name;
 * the component maps it so the data file stays free of imports.
 */

export type Service = {
  slug: string;
  title: string;
  /** Icon name from components/common/icons, mapped in the component. */
  icon:
    | "Browsers"
    | "Ranking"
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
      "Logins, payments and the parts that get hard after the demo, built to handle real users.",
    serviceType: "Web application development",
  },
  {
    slug: "websites-that-rank",
    title: "Websites that rank",
    icon: "Ranking",
    blurb:
      "Built to be found on Google from day one, and fast enough to keep the people who arrive.",
    serviceType: "Website design and SEO",
  },
  {
    slug: "mobile-apps",
    title: "Mobile apps",
    icon: "DeviceMobile",
    blurb:
      "React Native for both stores, or Kotlin when it has to be native. Android TV included.",
    serviceType: "Mobile app development",
  },
  {
    slug: "dashboards",
    title: "Dashboards and admin panels",
    icon: "SquaresFour",
    blurb:
      "The screen your team uses all day. Big lists stay fast and nobody loses their place.",
    serviceType: "Admin dashboard development",
  },
  {
    slug: "cloudflare-and-deployment",
    title: "Cloudflare and deployment",
    icon: "CloudArrowUp",
    blurb:
      "Getting it live and keeping it live, on hosting that costs a few hundred rupees a month.",
    serviceType: "Cloud deployment and DevOps",
  },
  {
    slug: "performance-fixes",
    title: "Performance fixes and rescues",
    icon: "Gauge",
    blurb:
      "A slow site, or a project the last developer left half finished. I read it and fix it.",
    serviceType: "Website performance optimisation",
  },
];

export const serviceTypes = services.map((s) => s.serviceType);
