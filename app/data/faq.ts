import { ml } from "./ml";
import { PHONE_DISPLAY } from "./contact";

/**
 * Ten questions, answered the way I would answer them on a call. Each answer
 * opens with the direct reply in the first sentence, because that first
 * sentence is what a search result and an AI assistant quote back.
 */

export type Faq = { q: string; a: string };

export const homeFaqs: Faq[] = [
  {
    q: "Who is the best full stack developer in Thrissur?",
    a: "Nobody can honestly claim that title, so here is what you can check instead. I have three years of production work, I build with React, Next.js and TypeScript, I have shipped a seat map product on Cloudflare Workers and an Android TV app, and every project on this site links to something live you can open. Compare that against anyone else you are talking to.",
  },
  {
    q: "Do you take freelance work?",
    a: "Yes, alongside my job at Lascade. I take web apps, websites, dashboards and mobile apps, usually for businesses in Kerala or remote clients elsewhere in India. Message me on WhatsApp with what you need and I will tell you within a day whether I am the right person for it.",
  },
  {
    q: "Are you open to full time jobs?",
    a: "Yes, for React, Next.js, full stack or frontend roles, in Kochi, Bangalore or remote. My resume is on this site as a one page PDF and my LinkedIn is up to date. I reply to recruiters the same day.",
  },
  {
    q: "Do you build mobile apps?",
    a: "Yes. React Native when the app should ship to both stores from one codebase, Kotlin with Jetpack Compose when it needs to be properly native. TMPlayer, my Telegram video player for Android TV, is the Kotlin one, and it is on this site.",
  },
  {
    q: "Can you do SEO?",
    a: "Yes, the technical half of it, which is the half most sites get wrong. Server rendered pages, correct titles and descriptions, structured data, a real sitemap, fast loading on a phone, and a Google Business Profile set up properly. This site is the demo.",
  },
  {
    q: "Do you work with clients outside Kerala?",
    a: "Yes, most remote work is easier than local work. I have worked with teams across Indian timezones and I keep to written scope, weekly demos and a shared repo so you can see progress without asking.",
  },
  {
    q: "What do you charge?",
    a: "I quote per project rather than per hour, after a short call about what you actually need. A small business website and a seat mapping platform are not the same job, so a price list on a web page would be a made up number. The call is free and takes twenty minutes.",
  },
  {
    q: "How do I contact you?",
    a: `WhatsApp is fastest: ${PHONE_DISPLAY}. You can also call the same number between 9am and 7pm, Monday to Saturday, or use the form on this page. I answer WhatsApp within a few hours on a working day.`,
  },
  {
    q: "Which languages do you speak?",
    a: `Malayalam and English. ${ml.weSpeakMalayalam} Technical writing, documentation and client email are in English.`,
  },
  {
    q: "Where are you based?",
    a: "Thrissur, Kerala. I can meet in person anywhere in Thrissur district, drive to Palakkad, Ernakulam or Malappuram for a project worth the trip, and work remotely with anyone in India.",
  },
];

/**
 * Three questions per location page. They have to give different answers per
 * place or the 29 pages read as one page with the name swapped out.
 */
export const locationFaqs = ({
  name,
  inPerson,
  costLine,
}: {
  name: string;
  inPerson: string;
  costLine: string;
}): Faq[] => [
  {
    q: `Do you meet clients in ${name}?`,
    a: inPerson,
  },
  {
    q: `Who is the best web developer in ${name}?`,
    a: `There is no ranking anyone can point at, so judge on evidence. I am a full stack developer based in Thrissur with three years of production React and Next.js work, I take projects in ${name}, and everything I have built is linked on this site with a live URL. Ask whoever else you are considering for the same.`,
  },
  {
    q: `How much does a website cost in ${name}?`,
    a: costLine,
  },
];
