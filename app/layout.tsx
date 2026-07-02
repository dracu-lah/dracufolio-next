import RightButtons from "./components/common/RightButtons";
import Navbar from "./components/common/Navbar/Navbar";
import type { Metadata } from "next";
import {
  Martian_Mono,
  IBM_Plex_Mono,
  Instrument_Sans,
} from "next/font/google";
import "./globals.css";
import ResumeDownloadButton from "./components/common/Navbar/ResumeDownloadButton";
import { Analytics } from "@vercel/analytics/next";

const martianMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nevil.dev"),
  title: {
    default: "Nevil Krishna K | Frontend Engineer & React Developer",
    template: "%s | Nevil Krishna",
  },
  icons: {
    icon: "/favicon.ico",
  },
  description:
    "Nevil Krishna is a frontend engineer from Thrissur, Kerala with 3 years of React and Next.js experience, building fast, accessible, high-performance web apps and open-source tools.",
  keywords: [
    "Nevil Krishna K",
    "Nevil Krishna",
    "React Developer",
    "Frontend Engineer",
    "Next.js Developer",
    "Kerala",
    "Thrissur",
    "Portfolio",
  ],
  authors: [{ name: "Nevil Krishna K", url: "https://nevil.dev" }],
  creator: "Nevil Krishna K",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Nevil Krishna K | Frontend Engineer & React Developer",
    description:
      "Frontend engineer from Kerala with 3 years of React and Next.js experience. High-performance web apps, open-source tools, and 17 shipped projects.",
    url: "https://nevil.dev",
    siteName: "Nevil Krishna Portfolio",
    images: [
      {
        url: "https://nevil.dev/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nevil Krishna Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nevil Krishna K | Frontend Engineer & React Developer",
    description:
      "Frontend engineer from Kerala with 3 years of React and Next.js experience. High-performance web apps, open-source tools, and 17 shipped projects.",
    creator: "@nevilkrishnak",
    images: ["https://nevil.dev/og-image.png"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nevil Krishna K",
  url: "https://nevil.dev",
  jobTitle: "Frontend Engineer",
  email: "mailto:nevilkrishna@gmail.com",
  sameAs: [
    "https://github.com/dracu-lah",
    "https://www.linkedin.com/in/nevil-krishna-k-77170222a/",
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Frontend Engineering",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`bg-background text-foreground ${martianMono.variable} ${plexMono.variable} ${instrumentSans.variable} font-sans antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Navbar>
          <ResumeDownloadButton />
        </Navbar>
        {children}
        <RightButtons />
        <Analytics />
      </body>
    </html>
  );
}
