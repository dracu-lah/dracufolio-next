import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GetProjectsAPI } from "@/services/api";
import Projects from "@/components/sections/Portfolio/components/Projects";
import Footer from "@/components/common/Footer";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Everything Nevil Krishna has shipped since 2022: travel products, open-source tools, and side projects built with React and Next.js.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects | Nevil Krishna",
    description:
      "Everything Nevil Krishna has shipped since 2022: travel products, open-source tools, and side projects built with React and Next.js.",
    url: "https://nevil.dev/projects",
    type: "website",
  },
};

const ProjectsPage = async () => {
  const projects = await GetProjectsAPI();

  return (
    <>
      <main className="mx-auto max-w-6xl px-6 pt-28 pb-20 md:pt-32 md:pb-24">
        <div className="flex flex-col gap-10 md:gap-12">
          <div className="flex flex-col items-start gap-5">
            <Link
              href="/"
              className="flex items-center gap-2 font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              <ArrowLeft className="size-4" aria-hidden />
              home
            </Link>
            <p className="font-mono text-sm uppercase tracking-[0.3em] text-muted-foreground">
              {projects.length} projects · deployed, not just localhost
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
