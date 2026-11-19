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
      "Logins, payments and the parts that get hard after the demo, built to handle real users. A web app is a site you sign in to and use, like a booking or ordering system.",
    serviceType: "Web application development",
  },
  {
    slug: "websites-that-rank",
    title: "Websites that rank",
    icon: "Ranking",
    blurb:
      "Built to appear high in Google results from day one, and fast enough to keep the people who arrive.",
    serviceType: "Website design and SEO",
  },
  {
    slug: "mobile-apps",
    title: "Mobile apps",
    icon: "DeviceMobile",
    blurb:
      "One app for both the Play Store and the App Store with React Native, or Kotlin when it has to be a true Android app. Android TV included.",
    serviceType: "Mobile app development",
  },
  {
    slug: "dashboards",
    title: "Dashboards and admin panels",
    icon: "SquaresFour",
    blurb:
      "The screen your team uses all day to see and manage its data. Big lists stay fast and nobody loses their place.",
    serviceType: "Admin dashboard development",
  },
  {
    slug: "cloudflare-and-deployment",
    title: "Cloudflare and deployment",
    icon: "CloudArrowUp",
    blurb:
      "Getting it live and keeping it live on Cloudflare, hosting that serves your site from a server near each visitor, for a few hundred rupees a month.",
    serviceType: "Cloud deployment and DevOps",
  },
  {
    slug: "performance-fixes",
    title: "Performance fixes and rescues",
    icon: "Gauge",
    blurb:
      "Making a slow site fast, or taking over a project the last developer left half finished. I read the code and fix it.",
    serviceType: "Website performance optimisation",
  },
];

export const serviceTypes = services.map((s) => s.serviceType);
