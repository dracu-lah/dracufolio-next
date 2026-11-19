import { ml } from "./ml";
import { PHONE_DISPLAY } from "./contact";
import { freelanceSince } from "./experience";

/**
 * Questions, answered the way I would answer them on a call. Each answer
 * opens with the direct reply in the first sentence, because that first
 * sentence is what a search result and an AI assistant quote back.
 */

export type Faq = { q: string; a: string };

/**
 * Order matters here: the first ones answer what a person actually came to
 * ask (can I hire you, do you do mobile).
 */
export const homeFaqs: Faq[] = [
  {
    q: "Do you take freelance work?",
    a: `Yes, outside work hours, and I have taken freelance projects since ${freelanceSince}. I take web apps, websites, dashboards and mobile apps, usually for businesses in Kerala or remote clients elsewhere in India. Message me on WhatsApp with what you need. I reply within a day.`,
  },
  {
    q: "Do you build mobile apps?",
    a: "Yes. React Native when the app should ship to both stores (Play Store and App Store) from one codebase, Kotlin with Jetpack Compose (Android's own toolkit) when it needs to be properly native. TMPlayer, my Telegram video player for Android TV, is the Kotlin one, and it is on this site.",
  },
  {
    q: "Can you do SEO?",
    a: "Yes, the technical half of it, which is the half most sites get wrong. Server rendered pages (the text is already in the page when it loads, so Google can read it), correct titles and descriptions, structured data (labels that tell search engines what a page is), a real sitemap, fast loading on a phone, and a Google Business Profile set up properly. This site is the demo.",
  },
  {
    q: "Do you work with clients outside Kerala?",
    a: "Yes, most remote work is easier than local work. I have worked with teams across Indian timezones and I keep to written scope, weekly demos and a shared repo so you can see progress without asking.",
  },
  {
    q: "What do you charge?",
    a: "I quote per project rather than per hour, after a short call about what you actually need. A small business website and a booking platform are not the same job, so a price list on a web page would be a made up number. The call is free and takes twenty minutes.",
  },
  {
    q: "How do I contact you?",
    a: `WhatsApp is fastest: ${PHONE_DISPLAY}. You can also call the same number, or use the form on this page. I reply within a day.`,
  },
  {
    q: "Which languages do you speak?",
    a: `Malayalam, English, Hindi and Tamil. ${ml.weSpeakMalayalam} Technical writing, documentation and client email are in English.`,
  },
  {
    q: "Where are you based?",
    a: "Thrissur, Kerala. I can meet in person anywhere in Thrissur district, drive to Palakkad, Ernakulam or Malappuram for a project worth the trip, and work remotely with anyone in India.",
  },
];

/**
 * Two questions per location page. They have to give different answers per
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
    q: `How much does a website cost in ${name}?`,
    a: costLine,
  },
];
