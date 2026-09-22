import type { Metadata, Viewport } from "next";
import Navbar from "./components/common/Navbar/Navbar";
import ResumeDownloadButton from "./components/common/Navbar/ResumeDownloadButton";
import MobileActionBar from "./components/cta/MobileActionBar";
import QuotePrompt from "./components/cta/QuotePrompt";
import ConsoleSignature from "./components/eggs/ConsoleSignature";
import KeyboardShortcuts from "./components/eggs/KeyboardShortcuts";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { fontVariables } from "./lib/fonts";
import { token } from "./lib/palette";
import { AUTHOR, SITE_NAME, SITE_URL, TITLE_TEMPLATE } from "./lib/seo";
import { metaKeywords } from "./data/keywords";
import {
  COUNTRY_CODE,
  GEO,
  LOCALITY,
  PHONE_E164,
  REGION,
  REGION_CODE,
  X_HANDLE,
} from "./data/contact";
import "./globals.css";

const title = `${AUTHOR} | Full Stack Developer in Thrissur, Kerala`;

const description =
  "Nevil Krishna K is a full stack developer in Thrissur, Kerala with 3 years of React, Next.js and TypeScript experience, plus Kotlin and React Native on mobile. Available for jobs, freelance projects and remote contracts across India. WhatsApp +91 92079 32070.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: TITLE_TEMPLATE,
  },
  /*
   * Declared by hand rather than left to the app/favicon.ico convention. That
   * convention emits a link whose href carries a content hash, and the file it
   * pointed at was 32x25: Google needs a square favicon at a multiple of 48 and
   * a URL that does not move, so it showed a blank globe instead. These are
   * stable paths under public/, generated from one source by `pnpm icons`.
   */
  icons: {
    icon: { url: "/favicon.ico", type: "image/x-icon", sizes: "48x48" },
    apple: { url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" },
  },
  description,
  keywords: metaKeywords,
  authors: [{ name: AUTHOR, url: SITE_URL }],
  creator: AUTHOR,
  publisher: AUTHOR,
  applicationName: SITE_NAME,
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": `${SITE_URL}/feed.xml`,
    },
  },
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    /*
     * No alternateLocale. og:locale:alternate claims the same content exists
     * at another URL in that language, and there is no Malayalam version of
     * any page here. The Malayalam on the site is a line inside an English
     * page, which lang="ml" already marks.
     */
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: X_HANDLE,
  },
  /**
   * Geo meta tags. Google stopped using them years ago, but Bing and several
   * regional crawlers still read them, and ChatGPT search runs on Bing's
   * index. Cheap to ship, occasionally read, never harmful.
   */
  other: {
    "geo.region": REGION_CODE,
    "geo.placename": LOCALITY,
    "geo.position": `${GEO.latitude};${GEO.longitude}`,
    ICBM: `${GEO.latitude}, ${GEO.longitude}`,
    "business:contact_data:locality": LOCALITY,
    "business:contact_data:region": REGION,
    "business:contact_data:country_name": COUNTRY_CODE,
    "business:contact_data:phone_number": PHONE_E164,
  },
};

export const viewport: Viewport = {
  // The browser chrome colour on a phone. Read from the stylesheet so it cannot
  // drift from --background the way it had, by two hex values.
  themeColor: token("background"),
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /*
     * The font variables go on <html>, not <body>. globals.css declares
     * --font-display and friends on :root, and a custom property that
     * references another one resolves it on the element where it is declared.
     * With the next/font classes on <body>, :root could not see
     * --font-sans-face, so every stack was invalid there and the whole site
     * silently rendered in the system fallback.
     */
    <html lang="en" className={`dark ${fontVariables}`}>
      <body className="bg-background text-foreground font-sans antialiased">
        <Navbar>
          <ResumeDownloadButton />
        </Navbar>
        {children}
        <MobileActionBar />
        <QuotePrompt />
        <KeyboardShortcuts />
        <ConsoleSignature />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
