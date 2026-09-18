/**
 * Every way to reach Nevil, in one file. Nothing else in the app hard codes a
 * phone number, an email address or a profile URL: they all read from here so a
 * change lands everywhere at once (site, schema, llms.txt, OG cards, resume).
 */

export const PHONE_E164 = "+919207932070";
export const PHONE_DISPLAY = "+91 92079 32070";
export const PHONE_TEL = `tel:${PHONE_E164}`;

export const EMAIL = "nevilkrishna@gmail.com";
export const EMAIL_MAILTO = `mailto:${EMAIL}`;

/** wa.me wants the number without the plus. */
const WA_NUMBER = PHONE_E164.replace("+", "");

const DEFAULT_WHATSAPP_MESSAGE =
  "Hi Nevil, I found your site. I would like to talk about a project.";

/**
 * A WhatsApp deep link with the first message already typed. Every CTA passes
 * its own message so the chat says where the person came from.
 */
export const whatsappUrl = (message: string = DEFAULT_WHATSAPP_MESSAGE) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

export const WHATSAPP_URL = whatsappUrl();

export const LINKEDIN_URL =
  "https://www.linkedin.com/in/nevil-krishna-k-77170222a/";
export const GITHUB_URL = "https://github.com/dracu-lah";
export const X_URL = "https://x.com/nevilkrishnak";
export const X_HANDLE = "@nevilkrishnak";
export const SOURCE_URL = "https://github.com/dracu-lah/dracufolio-next";

export const RESUME_PATH = "/appwrite/resume/Nevil-3-Years-Frontend-Resume.pdf";
export const PORTRAIT_PATH = "/nevil-krishna-k.jpg";

export const LANGUAGES = ["Malayalam", "English"];
/** Schema.org language codes for knowsLanguage. */
export const LANGUAGE_CODES = ["ml", "en"];

export const LOCALITY = "Thrissur";
export const REGION = "Kerala";
export const REGION_CODE = "IN-KL";
export const COUNTRY = "India";
export const COUNTRY_CODE = "IN";
export const GEO = { latitude: 10.5276, longitude: 76.2144 };

/** Mon to Sat, 09:00 to 19:00 IST. Used by the site copy and by schema. */
export const HOURS = {
  days: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  opens: "09:00",
  closes: "19:00",
  display: "Monday to Saturday, 9am to 7pm IST",
};

/**
 * Availability, as a fact rather than a mood. The badge next to the CTA and
 * the one in the header both read from here, so "open for work" is changed in
 * one file the day it stops being true.
 */
export const AVAILABILITY = {
  open: true,
  label: "Open to roles and projects",
  /** The promise under the primary button. Keep it to something you can keep. */
  replyTime: "Most messages get an answer the same day",
  shortReply: "Answers the same day",
};
