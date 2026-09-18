import { GetProjectsAPI } from "@/services/api";
import Projects from "@/components/sections/Portfolio/components/Projects";
import Footer from "@/components/common/Footer";
import BackLink from "@/components/common/BackLink";
import Badge from "@/components/common/Badge";
import JsonLd from "@/components/common/JsonLd";
import CtaBlock from "@/components/cta/CtaBlock";
import { pageGraph } from "@/lib/schema";
import { AUTHOR, SITE_URL, pageMetadata } from "@/lib/seo";
import { CONTENT_DATES } from "@/data/updated";

export const revalidate = 86400;

const description =
  "Everything Nevil Krishna K has shipped since 2022: travel products, seat mapping, an Android TV app, admin dashboards and open-source tools, built with React, Next.js, TypeScript and Kotlin.";

export const metadata = pageMetadata({
  title: "Projects: React, Next.js and Android work",
  description,
  path: "/projects",
  keywords: [
    "React developer projects",
    "Next.js portfolio",
    "Kotlin Android app",
    "full stack developer Thrissur projects",
  ],
});

const ProjectsPage = async () => {
  const projects = await GetProjectsAPI();

  return (
    <>
      <JsonLd
        data={pageGraph(
          {
            path: "/projects",
            name: `Projects | ${AUTHOR}`,
            description,
            type: "CollectionPage",
            dateModified: CONTENT_DATES.projects,
            breadcrumb: [
              { name: "Home", path: "/" },
              { name: "Projects", path: "/projects" },
            ],
          },
          [
            {
              "@type": "ItemList",
              "@id": `${SITE_URL}/projects#list`,
              numberOfItems: projects.length,
              itemListElement: projects.map((project, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: project.title,
                url: `${SITE_URL}/projects/${project.slug}`,
              })),
            },
          ],
        )}
      />
      <main className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14 pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="flex flex-col gap-10 md:gap-12">
          <div className="flex flex-col items-start gap-5">
            <BackLink />
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                All Projects
              </h1>
              <Badge size="md">{projects.length} shipped</Badge>
            </div>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Client work, products and things I built for myself. Every card
              opens a write-up with the stack, the decisions and a link to the
              live site or the repo.
            </p>
          </div>
          <Projects projects={projects} />
        </div>
      </main>
      <CtaBlock />
      <Footer />
    </>
  );
};

export default ProjectsPage;
