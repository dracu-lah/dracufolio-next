import RightButtons from "./components/common/RightButtons";
import Navbar from "./components/common/Navbar/Navbar";
import type { Metadata } from "next";
import { Google_Sans_Code } from "next/font/google";
import "./globals.css";
import ResumeDownloadButton from "./components/common/Navbar/ResumeDownloadButton";
import { Analytics } from "@vercel/analytics/next";

// one family for the whole site: sans, display and mono all resolve to this
const googleSans = Google_Sans_Code({
  variable: "--font-google-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nevil.dev"),
  title: {
    default: "Nevil Krishna K | Full Stack Developer & React Engineer",
    template: "%s | Nevil Krishna",
  },
  icons: {
    icon: "/favicon.ico",
  },
  description:
    "Nevil Krishna is a full stack developer from Thrissur, Kerala with 3 years of React and Next.js experience, building fast web apps and open-source tools.",
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
    title: "Nevil Krishna K | Full Stack Developer & React Engineer",
    description:
      "Full stack developer from Kerala with 3 years of React and Next.js experience. Web apps, open-source tools, and shipped side projects.",
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
    title: "Nevil Krishna K | Full Stack Developer & React Engineer",
    description:
      "Full stack developer from Kerala with 3 years of React and Next.js experience. Web apps, open-source tools, and shipped side projects.",
    creator: "@nevilkrishnak",
    images: ["https://nevil.dev/og-image.png"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nevil Krishna K",
  url: "https://nevil.dev",
  jobTitle: "Full Stack Developer",
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
    "Full Stack Development",
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
        className={`bg-background text-foreground ${googleSans.variable} font-sans antialiased`}
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
