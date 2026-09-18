import type { Location } from "@/data/locations";
import { LOCALITY } from "@/data/contact";

/**
 * Per-location copy. This module exists so the difference between the 29 hire
 * pages is written down in one auditable place instead of being buried in JSX.
 *
 * The rule the pages follow: a page that only swaps a town name into a
 * template is a doorway page, and Google treats it as one. So every page gets
 * its own opening paragraph (from `blurb`), its own answer to "do you meet
 * clients here" (driven by real travel time), its own reasons, and its own
 * links out. Nothing here is padding and nothing is hidden.
 */

/** Districts I will actually drive to from Thrissur for a project. */
const DRIVABLE = new Set(["thrissur", "palakkad", "ernakulam", "malappuram"]);

export const headline = (location: Location) => {
  if (location.kind === "country") return "Hire a full stack developer in India";
  if (location.kind === "state")
    return "Full stack developer in Kerala, available across all 14 districts";
  if (location.kind === "town")
    return `Full stack developer in ${location.name}, ${location.district}`;
  return `Full stack developer in ${location.name}, Kerala`;
};

export const intro = (location: Location) => {
  if (location.kind === "country")
    return "I work with teams and businesses across India from Thrissur, Kerala. Web apps, websites, dashboards and mobile apps, on Indian hours, in English or Malayalam.";
  if (location.kind === "state")
    return "I am based in Thrissur and take work from every district in Kerala. Some of it in person, most of it remote, all of it with the same written scope and weekly demos.";
  if (location.kind === "town")
    return `I build websites, web apps and mobile apps for people in ${location.name} and the rest of ${location.district} district. You deal with the person writing the code, not an account manager.`;
  return `I build websites, web apps and mobile apps for businesses in ${location.name} district. You deal with the person writing the code, not an account manager.`;
};

/** Answer to "Do you meet clients in X?", driven by how far it actually is. */
export const inPersonAnswer = (location: Location) => {
  if (location.kind === "country")
    return "Rarely, and it is almost never needed. I run projects across India remotely: a written scope up front, a shared repository, a demo you can click every week, and WhatsApp in between. If a project genuinely needs me in the room, we can plan a trip into the budget.";

  if (location.kind === "state")
    return "In Thrissur, Palakkad, Ernakulam and Malappuram, yes, and often. Further north or south I would rather put the travel time into the work and meet on a call instead, unless the project needs a site visit.";

  if (location.district === "Thrissur")
    return `Yes. ${location.name} is inside Thrissur district, so I can come to you for the first conversation and for anything that needs a whiteboard rather than a screen share. After that most of it runs on WhatsApp and a weekly demo.`;

  // The Thrissur district page fell through to the "drivable" branch and read
  // "Thrissur is close enough to Thrissur", which is the one page where that
  // sentence had to be right.
  if (location.slug === "thrissur")
    return "Yes, easily. I live and work in Thrissur, so meeting in person costs nothing but the time, and anything that needs a whiteboard rather than a screen share can happen the same week.";

  if (location.slug === "shoranur")
    return "Yes. Shoranur is about an hour from Thrissur by road and a shorter hop by train, so a first meeting in person is easy to arrange. The rest of the project runs on WhatsApp and weekly demo calls.";

  if (DRIVABLE.has(location.slug))
    return `Yes, for a project worth the drive. ${location.name} is close enough to Thrissur that I can be there and back in a day, so the kickoff meeting and any review that needs a room can happen face to face.`;

  return `Usually not, and it has not held a project back yet. ${location.name} is far enough from Thrissur that the travel time is better spent building, so I run these projects remotely: written scope, shared repository, weekly demo, WhatsApp in between. I speak Malayalam, so calls are easy either way.`;
};

/** Answer to "How much does a website cost in X?". */
export const costAnswer = (location: Location) => {
  const where =
    location.kind === "country"
      ? "India"
      : location.kind === "state"
        ? "Kerala"
        : location.name;

  if (location.kind === "town")
    return `There is no price list, and a developer who quotes one before seeing your requirement is guessing. A five page site for a shop in ${where} is a different job from a booking system with payments, logins and an admin panel. Send me what you need on WhatsApp and you get a written quote, with the scope spelled out, usually within a day.`;

  if (location.kind === "district")
    return `It depends entirely on scope, so I quote per project rather than publish a rate. Most enquiries from ${where} fall into one of three shapes: a small business site, a web app with logins and payments, or a rescue of something half built. Describe yours and I will give you a written figure and what is included.`;

  return `I quote per project after a twenty minute call, because scope is the only thing that decides the number. Anyone publishing a fixed price for "a website" across ${where} is either selling a template or planning to charge you for the difference later. The call is free.`;
};

/** Three reasons, the third of which is specific to where you are. */
export const reasons = (location: Location) => {
  const local =
    location.kind === "country"
      ? {
          title: "Indian hours, no agency layer",
          body: "I am in IST, I reply on WhatsApp the same day, and the person you brief is the person who writes the code. Nothing gets lost on the way to a developer you never meet.",
        }
      : location.district === "Thrissur" || DRIVABLE.has(location.slug)
        ? {
            title: "Close enough to turn up",
            body: `${location.name} is a short trip from where I live, so the first meeting can happen in person and you know who you are dealing with before any money moves.`,
          }
        : {
            title: "Remote, properly",
            body: `Working with ${location.kind === "state" ? "clients across Kerala" : location.name} means the process has to carry itself: written scope, a repository you own, a demo every week, and Malayalam or English on the call.`,
          };

  return [
    {
      title: "Production work, not a portfolio",
      body: "Three years of it. A seat map product on Cloudflare Workers, a flight rewards site, a ride hailing admin panel, and an Android TV app with real users filing real issues. Every one of them is linked on this site.",
    },
    {
      title: "Built to be found",
      body: "Most sites are handed over and then quietly never appear in search. I set up server rendered pages, structured data, a real sitemap and your Google Business Profile as part of the job, not as an upsell.",
    },
    local,
  ];
};

/** The first WhatsApp message, prefilled with where the person came from. */
export const whatsappMessage = (location: Location) =>
  `Hi Nevil, I am in ${location.name}${
    location.kind === "town" ? `, ${location.district}` : ""
  }. I would like to talk about a project.`;

export const metaDescription = (location: Location) => {
  const roles =
    "Full stack, React, Next.js and mobile app developer";
  if (location.kind === "country")
    return `${roles} available across India, based in ${LOCALITY}, Kerala. Websites, web apps, dashboards and Android apps. WhatsApp +91 92079 32070 for a quote.`;
  return `${roles} for ${location.name}${
    location.kind === "town" ? `, ${location.district} district` : ""
  }. Websites, web apps, dashboards and mobile apps built in ${LOCALITY}, Kerala. WhatsApp +91 92079 32070 for a written quote.`;
};
