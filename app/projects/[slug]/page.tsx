import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  GithubLogo,
  Globe,
  ScopeDocument,
} from "@/components/common/icons";
import Badge from "@/components/common/Badge";
import { SQUIRCLE, Squircle } from "@/components/ui/squircle";
import { publishedPosts } from "@/data/posts";
import { GetProjectsAPI, GetProjectBySlugAPI } from "@/services/api";
import { Button } from "@/components/ui/button";
import Footer from "@/components/common/Footer";
import JsonLd from "@/components/common/JsonLd";
import CtaBlock from "@/components/cta/CtaBlock";
import QrPanel from "@/components/common/QrPanel";
import { ID, pageGraph, ref } from "@/lib/schema";
import { absolute, pageMetadata } from "@/lib/seo";

export const revalidate = 86400;

type Params = { slug: string };

export async function generateStaticParams() {
  const projects = await GetProjectsAPI();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await GetProjectBySlugAPI(slug);

  if (!project) {
    return {
      title: "Project not found",
      robots: { index: false, follow: false },
    };
  }

  const description = project.tagline ?? project.description;

  return pageMetadata({
    title: project.title,
    description,
    path: `/projects/${project.slug}`,
    type: "article",
    // The real screenshot beats a generated card whenever there is one.
    image: project.images[0],
  });
}

const ProjectPage = async ({ params }: { params: Promise<Params> }) => {
  const { slug } = await params;
  const project = await GetProjectBySlugAPI(slug);
  if (!project) notFound();

  const projects = await GetProjectsAPI();
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[currentIndex - 1] ?? null;
  const next = projects[currentIndex + 1] ?? null;
  const writeUp = publishedPosts.find((post) => post.project === project.slug);

  const path = `/projects/${project.slug}`;
  const creativeWork = {
    "@type": "CreativeWork",
    "@id": `${absolute(path)}#work`,
    name: project.title,
    description: project.tagline ?? project.description,
    url: absolute(path),
    sameAs: [project.liveUrl, project.githubUrl].filter(Boolean),
    image: project.images[0] ? absolute(project.images[0]) : undefined,
    keywords: project.skills.join(", "),
    // Points at the site-wide Person rather than repeating it, so every
    // project resolves to the same entity in the knowledge graph.
    author: ref(ID.person),
    creator: ref(ID.person),
    ...(project.year ? { dateCreated: project.year } : {}),
  };

  return (
    <>
      <JsonLd
        data={pageGraph(
          {
            path,
            name: project.title,
            description: project.tagline ?? project.description,
            primaryImage: project.images[0],
            breadcrumb: [
              { name: "Home", path: "/" },
              { name: "Projects", path: "/projects" },
              { name: project.title, path },
            ],
          },
          [creativeWork],
        )}
      />
      <main className="mx-auto max-w-5xl px-6 pt-24 pb-16 md:pt-28 md:pb-20">
        <nav aria-label="Breadcrumb">
          <Link
            href="/projects"
            className="inline-flex items-center gap-3 text-base text-muted-foreground transition-colors duration-300 hover:text-accent"
          >
            <ArrowLeft size={16} />
            Back to projects
          </Link>
        </nav>

        <header className="flex flex-col gap-4 pt-7 pb-9 md:gap-6 md:pt-10 md:pb-12">
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
            {project.title}
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            {project.tagline ?? project.description}
          </p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
            {project.liveUrl && (
              <Button
                asChild
                size="lg"
                variant="solid"
                className="w-full sm:w-auto"
              >
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit live <Globe size={18} />
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button asChild size="lg" className="w-full sm:w-auto">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View source <GithubLogo size={18} />
                </a>
              </Button>
            )}
            {writeUp && (
              /* A project page and a post about the same thing were two dead
                 ends. Now each one points at the other. */
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href={`/blog/${writeUp.slug}`}>
                  Read the write-up <ScopeDocument size={18} />
                </Link>
              </Button>
            )}
          </div>
        </header>

        <Squircle
          as="figure"
          cornerRadius={SQUIRCLE.panel}
          borderWidth={1}
          fillClassName="bg-card"
          className="overflow-hidden bg-border"
        >
          <Image
            priority
            width={1920}
            height={1080}
            sizes="(min-width: 1024px) 60rem, 100vw"
            src={project.images[0]}
            alt={`Screenshot of ${project.title}`}
            className="w-full object-cover"
            draggable="false"
          />
        </Squircle>

        {project.images.length > 1 && (
          <div className="grid gap-6 pt-6 md:grid-cols-2">
            {project.images.slice(1).map((img) => (
              <Image
                key={img}
                width={960}
                height={540}
                sizes="(min-width: 768px) 30rem, 100vw"
                src={img}
                alt={`${project.title} screenshot`}
                className="w-full rounded-xl border border-border object-cover"
                draggable="false"
              />
            ))}
          </div>
        )}

        <div className="grid gap-10 pt-10 md:pt-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
          <div className="flex flex-col gap-6">
            <h2 className="text-base text-muted-foreground">
              About this project
            </h2>
            {(project.longDescription.length
              ? project.longDescription
              : [project.description]
            ).map((paragraph, i) => (
              <p
                key={i}
                className="text-base leading-relaxed text-muted-foreground md:text-lg"
              >
                {paragraph}
              </p>
            ))}

            {project.features.length > 0 && (
              <>
                <h2 className="pt-4 text-base text-muted-foreground">
                  Features
                </h2>
                <ul className="flex flex-col gap-3">
                  {project.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-3 text-base leading-relaxed text-muted-foreground md:text-lg"
                    >
                      <span
                        aria-hidden
                        className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <Squircle
            as="aside"
            borderWidth={1}
            fillClassName="bg-card"
            className="h-fit overflow-hidden bg-border"
          >
            <p className="border-b border-border p-6 text-base text-muted-foreground">
              Project info
            </p>
            <dl className="flex flex-col gap-4 p-6">
              {project.year && (
                <div className="grid grid-cols-[4.5rem_1fr] gap-3 text-base md:grid-cols-[6rem_1fr] md:gap-4">
                  <dt className="text-muted-foreground">Year</dt>
                  <dd>{project.year}</dd>
                </div>
              )}
              <div className="grid grid-cols-[4.5rem_1fr] gap-3 text-base md:grid-cols-[6rem_1fr] md:gap-4">
                <dt className="text-muted-foreground">Stack</dt>
                <dd className="flex flex-wrap gap-1.5">
                  {project.skills.map((skill) => (
                    <Badge key={skill}>{skill}</Badge>
                  ))}
                </dd>
              </div>
              <div className="grid grid-cols-[4.5rem_1fr] gap-3 text-base md:grid-cols-[6rem_1fr] md:gap-4">
                <dt className="text-muted-foreground">Status</dt>
                <dd>
                  {project.liveUrl ? (
                    <Badge tone="accent" dot>
                      Deployed
                    </Badge>
                  ) : (
                    <Badge>Archived</Badge>
                  )}
                </dd>
              </div>
            </dl>
            {project.liveUrl && (
              <div className="border-t border-border p-6 pt-6">
                <QrPanel
                  url={project.liveUrl}
                  label="Open on your phone"
                  hint={`Open ${project.title} on your phone.`}
                  className="border-0 bg-transparent p-0"
                />
              </div>
            )}
          </Squircle>
        </div>

        <Squircle
          as="nav"
          aria-label="Project navigation"
          borderWidth={1}
          fillClassName="bg-background"
          className="mt-12 grid divide-y divide-border overflow-hidden bg-border md:mt-16 md:grid-cols-2 md:divide-x md:divide-y-0"
        >
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
              className="group flex items-center justify-between gap-4 p-6 transition-colors duration-300 hover:bg-card"
            >
              <span className="flex items-center gap-3 text-base text-muted-foreground">
                <ArrowLeft size={16} /> Previous
              </span>
              <span className="font-display font-bold">{prev.title}</span>
            </Link>
          ) : (
            <span className="p-6 text-base text-muted-foreground/40">
              Start of list
            </span>
          )}
          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="group flex items-center justify-between gap-4 p-6 transition-colors duration-300 hover:bg-card"
            >
              <span className="font-display font-bold">{next.title}</span>
              <span className="flex items-center gap-3 text-base text-muted-foreground">
                Next <ArrowRight size={16} />
              </span>
            </Link>
          ) : (
            <span className="p-6 text-right text-base text-muted-foreground/40">
              End of list
            </span>
          )}
        </Squircle>
      </main>
      <CtaBlock
        heading="Want something like this built for your product?"
        message={`Hi Nevil, I saw ${project.title} on your site and wanted to talk about a project.`}
      />
      <Footer />
    </>
  );
};

export default ProjectPage;
