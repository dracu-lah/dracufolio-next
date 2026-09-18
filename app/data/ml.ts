/**
 * Every Malayalam string on the site, in one place, each with its English gloss
 * so the spelling can be corrected in a single file. Anything rendered from
 * here carries lang="ml" so screen readers and search engines switch language.
 */

export const ml = {
  /** Hello, I am Nevil. */
  heroGreeting: "നമസ്കാരം, ഞാൻ നെവിൽ.",
  /** Full stack developer */
  roleFullStack: "ഫുൾ സ്റ്റാക്ക് ഡെവലപ്പർ",
  /** Thrissur, Kerala */
  thrissurKerala: "തൃശ്ശൂർ, കേരളം",
  /** We can talk in Malayalam too. */
  weSpeakMalayalam: "മലയാളത്തിലും സംസാരിക്കാം.",
  /** Website, app, dashboard. Message on WhatsApp. */
  hireSubline:
    "വെബ്‌സൈറ്റ്, ആപ്പ്, ഡാഷ്‌ബോർഡ്. വാട്ട്‌സ്ആപ്പിൽ മെസേജ് അയക്കൂ.",
  /** Malayalam and English. */
  languagesAnswer: "മലയാളവും ഇംഗ്ലീഷും.",
  /** Nevil Krishna K */
  name: "നെവിൽ കൃഷ്ണ കെ",
} as const;

/**
 * Do you need a website or an app in {place}? Message on WhatsApp.
 * Used as the bilingual subline on every /hire/{location} page.
 */
export const mlLocationSubline = (placeMl: string) =>
  `${placeMl}-ൽ വെബ്‌സൈറ്റോ ആപ്പോ വേണോ? വാട്ട്‌സ്ആപ്പിൽ മെസേജ് അയക്കൂ.`;

/** Long tail phrases people type in Malayalam. Fed into the keywords meta. */
export const mlKeywords = [
  "തൃശ്ശൂർ വെബ് ഡെവലപ്പർ",
  "തൃശ്ശൂരിലെ ഫുൾ സ്റ്റാക്ക് ഡെവലപ്പർ",
  "കേരളം സോഫ്റ്റ്‌വെയർ ഡെവലപ്പർ",
  "വെബ്‌സൈറ്റ് ഡിസൈനർ തൃശ്ശൂർ",
  "ആപ്പ് ഡെവലപ്പർ കേരളം",
  "റിയാക്ട് ഡെവലപ്പർ",
];
