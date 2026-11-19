import AboutSection from "@/components/sections/AboutSection";
import Footer from "@/components/common/Footer";
import BackLink from "@/components/common/BackLink";
import JsonLd from "@/components/common/JsonLd";
import CtaBlock from "@/components/cta/CtaBlock";
import HiringTeams from "@/components/sections/HiringTeams";
import ExperienceList from "@/components/sections/Skills/components/ExperienceList";
import Reveal from "@/components/common/Reveal";
import { pageGraph } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { CONTENT_DATES } from "@/data/updated";
import { roleWords } from "@/data/keywords";

const description =
  "Full stack developer in Thrissur: React, Next.js and TypeScript at Lascade, Kotlin on Android. Open to full time roles in Kochi, Bangalore or remote.";

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
    <main className="mx-auto max-w-7xl px-6 pt-24 md:px-10 md:pt-28 lg:px-14">
      <BackLink />
    </main>
    <AboutSection asPage />
    <HiringTeams />
    <section
      id="work-history"
      className="mx-auto max-w-7xl scroll-mt-24 px-6 py-8 md:px-10 md:py-12 lg:px-14"
    >
      <div className="flex flex-col gap-5 md:gap-7">
        <Reveal>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            Work history
          </h2>
        </Reveal>
        <ExperienceList />
      </div>
    </section>
    <CtaBlock
      quote
      message="Hi Nevil, I read your about page and wanted to get in touch."
    />
    <Footer />
  </>
);

export default AboutPage;
