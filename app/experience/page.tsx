import ExperienceList from "@/components/sections/Skills/components/ExperienceList";
import Toolkit from "@/components/sections/Skills/components/Toolkit";
import Footer from "@/components/common/Footer";
import BackLink from "@/components/common/BackLink";
import JsonLd from "@/components/common/JsonLd";
import Reveal from "@/components/common/Reveal";
import { experience } from "@/data/experience";
import { AUTHOR, breadcrumbJsonLd, pageMetadata, SITE_URL } from "@/lib/seo";

const description =
  "Work history of Nevil Krishna K: full stack developer at Lascade LLP and frontend developer at Udyata Information Systems, building React, Next.js and React Native products since 2023.";

export const metadata = pageMetadata({
  title: "Experience",
  description,
  path: "/experience",
});

const ExperiencePage = () => (
  <>
    <JsonLd
      data={[
        {
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          name: `Experience | ${AUTHOR}`,
          description,
          url: `${SITE_URL}/experience`,
          mainEntity: {
            "@type": "Person",
            name: AUTHOR,
            url: SITE_URL,
            hasOccupation: experience.map((job) => ({
              "@type": "Occupation",
              name: job.role,
              occupationLocation: {
                "@type": "Organization",
                name: job.company,
                url: job.site,
              },
            })),
          },
        },
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Experience", path: "/experience" },
        ]),
      ]}
    />
    <main className="mx-auto max-w-6xl px-6 pt-28 pb-16 md:pt-32 md:pb-24">
      <div className="flex flex-col gap-8 md:gap-12">
        <div className="flex max-w-2xl flex-col items-start gap-5">
          <BackLink />
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Since 2023
          </p>
          <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            Experience
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
            Two roles so far, both hands on the frontend, one of them with the
            backend and deploys attached. Everything below shipped to users.
          </p>
        </div>

        <ExperienceList />

        <div className="flex flex-col gap-6">
          <Reveal>
            <h2 className="font-mono text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Toolkit
            </h2>
          </Reveal>
          <Toolkit />
        </div>
      </div>
    </main>
    <Footer />
  </>
);

export default ExperiencePage;
