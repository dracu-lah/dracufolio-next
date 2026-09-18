import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BackLink from "@/components/common/BackLink";
import Footer from "@/components/common/Footer";
import JsonLd from "@/components/common/JsonLd";
import QrPanel from "@/components/common/QrPanel";
import Reveal from "@/components/common/Reveal";
import CtaBlock from "@/components/cta/CtaBlock";
import WhatsAppButton from "@/components/cta/WhatsAppButton";
import Faq from "@/components/sections/Faq";
import HowItWorks from "@/components/sections/HowItWorks";
import Locations from "@/components/sections/Locations";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Portfolio/components/Projects";
import ScrollProgress from "@/components/motion/ScrollProgress";
import { MapPin } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import { GetProjectsAPI } from "@/services/api";
import { faqNode, pageGraph, ref, ID } from "@/lib/schema";
import { absolute, pageMetadata } from "@/lib/seo";
import { locationBySlug, locations } from "@/data/locations";
import { locationFaqs } from "@/data/faq";
import { locationKeywords } from "@/data/keywords";
import { mlLocationSubline } from "@/data/ml";
import { PHONE_DISPLAY, PHONE_TEL, whatsappUrl } from "@/data/contact";
import {
  costAnswer,
  headline,
  inPersonAnswer,
  intro,
  metaDescription,
  reasons,
  whatsappMessage,
} from "../copy";

export const revalidate = 86400;

type Params = { location: string };

export const generateStaticParams = async () =>
  locations.map((location) => ({ location: location.slug }));

export const generateMetadata = async ({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> => {
  const { location: slug } = await params;
  const location = locationBySlug(slug);
  if (!location) return { title: "Not found", robots: { index: false } };

  return pageMetadata({
    title: headline(location),
    description: metaDescription(location),
    path: `/hire/${location.slug}`,
    keywords: locationKeywords(location.name, location.altNames),
  });
};

const LocationPage = async ({ params }: { params: Promise<Params> }) => {
  const { location: slug } = await params;
  const location = locationBySlug(slug);
  if (!location) notFound();

  const projects = (await GetProjectsAPI()).slice(0, 3);
  const message = whatsappMessage(location);
  const faqs = locationFaqs({
    name: location.name,
    inPerson: inPersonAnswer(location),
    costLine: costAnswer(location),
  });
  const nearby = location.nearby
    .map((near) => locationBySlug(near))
    .filter((near): near is NonNullable<typeof near> => Boolean(near));

  const path = `/hire/${location.slug}`;

  return (
    <>
      <ScrollProgress />
      <JsonLd
        data={pageGraph(
          {
            path,
            name: headline(location),
            description: metaDescription(location),
            breadcrumb: [
              { name: "Home", path: "/" },
              { name: "Hire", path: "/hire" },
              { name: location.name, path },
            ],
          },
          [
            {
              "@type": "Service",
              "@id": `${absolute(path)}#service`,
              name: headline(location),
              description: metaDescription(location),
              provider: ref(ID.service),
              areaServed: {
                "@type":
                  location.kind === "country" ? "Country" : "AdministrativeArea",
                name: location.name,
                ...(location.altNames.length
                  ? { alternateName: location.altNames }
                  : {}),
                ...(location.kind === "town"
                  ? {
                      containedInPlace: {
                        "@type": "AdministrativeArea",
                        name: `${location.district}, Kerala`,
                      },
                    }
                  : {}),
              },
              serviceType: "Web and mobile app development",
              url: absolute(path),
            },
            faqNode(path, faqs),
          ],
        )}
      />

      <main className="mx-auto max-w-7xl px-6 pt-24 md:px-10 md:pt-28 lg:px-14">
        <div className="grid items-start gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
          <div className="flex flex-col items-start gap-6">
            <BackLink href="/hire" label="hire" />
            <Reveal>
              <h1 className="font-display text-4xl leading-[1.05] font-bold tracking-tight md:text-5xl">
                {headline(location)}
              </h1>
            </Reveal>
            <Reveal delay={0.06}>
              <p lang="ml" className="text-lg text-muted-foreground">
                {mlLocationSubline(location.nameMl)}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                {intro(location)}
              </p>
            </Reveal>
            {/* The one paragraph on the page that exists nowhere else. */}
            <Reveal delay={0.14}>
              <p className="max-w-2xl border-l-2 border-border pl-5 text-base leading-relaxed text-muted-foreground md:text-lg">
                {location.blurb}
              </p>
            </Reveal>
            <Reveal delay={0.18} className="w-full">
              <div className="flex w-full max-w-xl flex-col gap-3 sm:flex-row md:gap-4">
                <WhatsAppButton size="lg" message={message} />
                <Link href="/projects" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto">
                    Projects
                  </Button>
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="font-mono text-sm text-muted-foreground">
                Or call{" "}
                <a
                  href={PHONE_TEL}
                  className="text-foreground underline underline-offset-4"
                >
                  {PHONE_DISPLAY}
                </a>
                .
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.26} className="w-full lg:justify-self-end">
            <QrPanel
              url={whatsappUrl(message)}
              label={`Scan to chat`}
              hint={`Opens WhatsApp with "I am in ${location.name}" already typed.`}
            />
          </Reveal>
        </div>
      </main>

      <Services heading={`What I build for people in ${location.name}`} />

      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16 lg:px-14 lg:py-20">
        <div className="flex flex-col gap-7 md:gap-10">
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Why me
            </h2>
          </Reveal>
          <div className="grid divide-y divide-border border-t border-b border-border md:grid-cols-3 md:divide-x md:divide-y-0">
            {reasons(location).map((reason, i) => (
              <Reveal key={reason.title} delay={i * 0.06} className="h-full">
                <div className="flex h-full flex-col gap-3 py-6 md:px-6 md:py-8 md:first:pl-0">
                  <h3 className="font-display text-xl font-bold tracking-tight">
                    {reason.title}
                  </h3>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {reason.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <HowItWorks />

      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16 lg:px-14 lg:py-20">
        <div className="flex flex-col gap-7 md:gap-10">
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Recent work
            </h2>
          </Reveal>
          <Projects projects={projects} />
        </div>
      </section>

      <Faq faqs={faqs} heading={`Hiring a developer in ${location.name}`} />

      {nearby.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16 lg:px-14 lg:py-20">
          <div className="flex flex-col gap-6">
            <Reveal>
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                Nearby
              </h2>
            </Reveal>
            <Reveal>
              <ul className="flex flex-wrap gap-2">
                {nearby.map((near) => (
                  <li key={near.slug}>
                    <Link
                      href={`/hire/${near.slug}`}
                      className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 font-mono text-sm text-muted-foreground transition-colors duration-300 hover:border-foreground hover:text-accent"
                    >
                      <MapPin
                       
                        className="size-4 shrink-0"
                       
                      />
                      {near.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      <Locations currentSlug={location.slug} />
      <CtaBlock
        heading={`Ready to start in ${location.name}?`}
        message={message}
      />
      <Footer />
    </>
  );
};

export default LocationPage;
