import { GetProjectsAPI } from "@/services/api";
import Projects from "@/components/sections/Portfolio/components/Projects";
import Footer from "@/components/common/Footer";
import BackLink from "@/components/common/BackLink";
import JsonLd from "@/components/common/JsonLd";
import { AUTHOR, SITE_URL, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const revalidate = 86400;

const description =
  "Everything Nevil Krishna has shipped since 2022: travel products, open-source tools, and side projects built with React and Next.js.";

export const metadata = pageMetadata({
  title: "Projects",
  description,
  path: "/projects",
});

const ProjectsPage = async () => {
  const projects = await GetProjectsAPI();

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `Projects | ${AUTHOR}`,
            description,
            url: `${SITE_URL}/projects`,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: projects.map((project, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: project.title,
                url: `${SITE_URL}/projects/${project.slug}`,
              })),
            },
          },
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
          ]),
        ]}
      />
      <main className="mx-auto max-w-6xl px-6 pt-28 pb-20 md:pt-32 md:pb-24">
        <div className="flex flex-col gap-10 md:gap-12">
          <div className="flex flex-col items-start gap-5">
            <BackLink />
            <p className="font-mono text-sm uppercase tracking-[0.3em] text-muted-foreground">
              {projects.length} projects · most of them live
            </p>
            <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              All Projects
            </h1>
          </div>
          <Projects projects={projects} />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProjectsPage;
