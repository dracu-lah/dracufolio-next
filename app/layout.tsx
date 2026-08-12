import RightButtons from "./components/common/RightButtons";
import Navbar from "./components/common/Navbar/Navbar";
import type { Metadata } from "next";
import { Google_Sans_Code } from "next/font/google";
import "./globals.css";
import ResumeDownloadButton from "./components/common/Navbar/ResumeDownloadButton";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import JsonLd from "./components/common/JsonLd";
import {
  AUTHOR,
  SITE_NAME,
  SITE_URL,
  personJsonLd,
  websiteJsonLd,
} from "./lib/seo";

// one family for the whole site: sans, display and mono all resolve to this
const googleSans = Google_Sans_Code({
  variable: "--font-google-sans",
  subsets: ["latin"],
});

const description =
  "Nevil Krishna is a full stack developer from Thrissur, Kerala with 3 years of React and Next.js experience, building fast web apps and open-source tools.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Nevil Krishna K | Full Stack Developer & React Engineer",
    template: "%s | Nevil Krishna",
  },
  icons: {
    icon: "/favicon.ico",
  },
  description,
  keywords: [
    "Nevil Krishna K",
    "Nevil Krishna",
    "React Developer",
    "Full Stack Developer",
    "Next.js Developer",
    "Kerala",
    "Thrissur",
    "Portfolio",
  ],
  authors: [{ name: AUTHOR, url: SITE_URL }],
  creator: AUTHOR,
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
  },
  openGraph: {
    title: "Nevil Krishna K | Full Stack Developer & React Engineer",
    description,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nevil Krishna K | Full Stack Developer & React Engineer",
    description,
    creator: "@nevilkrishnak",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`bg-background text-foreground ${googleSans.variable} font-sans antialiased`}
      >
        <JsonLd data={[personJsonLd, websiteJsonLd]} />
        <Navbar>
          <ResumeDownloadButton />
        </Navbar>
        {children}
        <RightButtons />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
