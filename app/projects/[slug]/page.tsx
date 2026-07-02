import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Github, Globe } from "lucide-react";
import { GetProjectsAPI, GetProjectBySlugAPI } from "@/services/api";
import { Button } from "@/components/ui/button";
import Footer from "@/components/common/Footer";

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
  if (!project) return {};

  const description = project.tagline ?? project.description;
  return {
    title: project.title,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} | Nevil Krishna`,
      description,
      url: `https://nevil.dev/projects/${project.slug}`,
      images: project.images[0]
        ? [{ url: `https://nevil.dev${project.images[0]}` }]
        : undefined,
      type: "website",
    },
  };
}

const ProjectPage = async ({ params }: { params: Promise<Params> }) => {
  const { slug } = await params;
  const project = await GetProjectBySlugAPI(slug);
  if (!project) notFound();

  const projects = await GetProjectsAPI();
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[currentIndex - 1] ?? null;
  const next = projects[currentIndex + 1] ?? null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.tagline ?? project.description,
    url: project.liveUrl ?? `https://nevil.dev/projects/${project.slug}`,
    image: project.images[0]
      ? `https://nevil.dev${project.images[0]}`
      : undefined,
    author: {
      "@type": "Person",
      name: "Nevil Krishna K",
      url: "https://nevil.dev",
    },
    ...(project.year ? { dateCreated: project.year } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="mx-auto max-w-5xl px-6 pt-24 pb-16 md:pt-32 md:pb-20">
        <nav aria-label="Breadcrumb">
          <Link
            href="/projects"
            className="inline-flex items-center gap-3 font-mono text-sm uppercase tracking-[0.25em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
          >
            <ArrowLeft size={16} aria-hidden />
            Back to projects
          </Link>
        </nav>

        <header className="flex flex-col gap-4 pt-7 pb-9 md:gap-6 md:pt-10 md:pb-12">
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Project{project.year && ` · ${project.year}`}
          </p>
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
                  visit live <Globe size={18} />
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
                  view source <Github size={18} />
                </a>
              </Button>
            )}
          </div>
        </header>

        <figure className="border border-border bg-card">
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
        </figure>

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
                className="w-full border border-border object-cover"
                draggable="false"
              />
            ))}
          </div>
        )}

        <div className="grid gap-10 pt-10 md:pt-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
          <div className="flex flex-col gap-6">
            <h2 className="font-mono text-sm uppercase tracking-[0.3em] text-muted-foreground">
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
                <h2 className="pt-4 font-mono text-sm uppercase tracking-[0.3em] text-muted-foreground">
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
                        className="mt-2.5 size-1.5 shrink-0 bg-phosphor"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <aside className="h-fit border border-border bg-card">
            <p className="border-b border-border px-5 py-3 font-mono text-[13px] uppercase tracking-[0.25em] text-muted-foreground">
              Project info
            </p>
            <dl className="flex flex-col gap-4 px-5 py-5">
              {project.year && (
                <div className="grid grid-cols-[4.5rem_1fr] gap-3 text-base md:grid-cols-[6rem_1fr] md:gap-4">
                  <dt className="uppercase tracking-[0.2em] text-muted-foreground">
                    year
                  </dt>
                  <dd>{project.year}</dd>
                </div>
              )}
              <div className="grid grid-cols-[4.5rem_1fr] gap-3 text-base md:grid-cols-[6rem_1fr] md:gap-4">
                <dt className="uppercase tracking-[0.2em] text-muted-foreground">
                  stack
                </dt>
                <dd className="flex flex-wrap gap-2">
                  {project.skills.map((skill) => (
                    <span
                      key={skill}
                      className="border border-border px-2.5 py-1 font-mono text-sm text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </dd>
              </div>
              <div className="grid grid-cols-[4.5rem_1fr] gap-3 text-base md:grid-cols-[6rem_1fr] md:gap-4">
                <dt className="uppercase tracking-[0.2em] text-muted-foreground">
                  status
                </dt>
                <dd>
                  <span className="text-phosphor">●</span>{" "}
                  {project.liveUrl ? "deployed" : "archived"}
                </dd>
              </div>
            </dl>
          </aside>
        </div>

        <nav
          aria-label="Project navigation"
          className="mt-12 grid divide-y divide-border border border-border md:mt-16 md:grid-cols-2 md:divide-x md:divide-y-0"
        >
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
              className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors duration-300 hover:bg-card md:px-6 md:py-5"
            >
              <span className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-muted-foreground">
                <ArrowLeft size={16} aria-hidden /> prev
              </span>
              <span className="font-display font-bold">{prev.title}</span>
            </Link>
          ) : (
            <span className="px-6 py-5 text-sm uppercase tracking-[0.2em] text-muted-foreground/40">
              start of list
            </span>
          )}
          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors duration-300 hover:bg-card md:px-6 md:py-5"
            >
              <span className="font-display font-bold">{next.title}</span>
              <span className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-muted-foreground">
                next <ArrowRight size={16} aria-hidden />
              </span>
            </Link>
          ) : (
            <span className="px-6 py-5 text-right text-sm uppercase tracking-[0.2em] text-muted-foreground/40">
              end of list
            </span>
          )}
        </nav>
      </main>
      <Footer />
    </>
  );
};

export default ProjectPage;
