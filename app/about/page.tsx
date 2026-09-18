import AboutSection from "@/components/sections/AboutSection";
import Footer from "@/components/common/Footer";
import BackLink from "@/components/common/BackLink";
import JsonLd from "@/components/common/JsonLd";
import CtaBlock from "@/components/cta/CtaBlock";
import { pageGraph } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { CONTENT_DATES } from "@/data/updated";
import { roleWords } from "@/data/keywords";

const description =
  "Nevil Krishna K is a full stack developer in Thrissur, Kerala, working with React, Next.js and TypeScript on travel products at Lascade, Kotlin on Android, and open source the rest of the time. Available for jobs, freelance and remote work across India.";

export const metadata = pageMetadata({
  title: "About: full stack developer in Thrissur",
  description,
  path: "/about",
  type: "profile",
  keywords: [
    "Nevil Krishna K",
    "about Nevil Krishna",
    ...roleWords.slice(0, 12),
  ],
  image: "/nevil-krishna-k.jpg",
});

const AboutPage = () => (
  <>
    <JsonLd
      data={pageGraph({
        path: "/about",
        name: "About Nevil Krishna K",
        description,
        type: "AboutPage",
        dateModified: CONTENT_DATES.about,
        primaryImage: "/nevil-krishna-k.jpg",
        breadcrumb: [
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ],
      })}
    />
    <main className="mx-auto max-w-7xl px-6 pt-28 md:px-10 md:pt-32 lg:px-14">
      <BackLink />
    </main>
    <AboutSection asPage />
    <CtaBlock message="Hi Nevil, I read your about page and wanted to get in touch." />
    <Footer />
  </>
);

export default AboutPage;
