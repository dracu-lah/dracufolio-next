import Link from "next/link";
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
import Testimonials from "@/components/sections/Testimonials";
import Projects from "@/components/sections/Portfolio/components/Projects";
import ScrollProgress from "@/components/motion/ScrollProgress";
import { Button } from "@/components/ui/button";
import { GetProjectsAPI } from "@/services/api";
import { pageGraph, faqNode } from "@/lib/schema";
import { AUTHOR, pageMetadata } from "@/lib/seo";
import { homeFaqs } from "@/data/faq";
import { ml } from "@/data/ml";
import { locationKeywords, primaryPhrases, roleShortlist } from "@/data/keywords";
import { HOURS, PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from "@/data/contact";

export const revalidate = 86400;

const title = "Hire a Full Stack Developer in Thrissur";
const description =
  "Hire Nevil Krishna K, a full stack developer in Thrissur, Kerala. React, Next.js and TypeScript websites and web apps, React Native and Kotlin mobile apps, dashboards and Cloudflare deployment. Freelance and remote work across Kerala and India. WhatsApp +91 92079 32070 for a written quote.";

export const metadata = pageMetadata({
  title,
  description,
  path: "/hire",
  keywords: [...primaryPhrases, ...locationKeywords("Thrissur", ["Trichur"])],
});

const HirePage = async () => {
  const projects = (await GetProjectsAPI()).slice(0, 3);

  return (
    <>
      <ScrollProgress />
      <JsonLd
        data={pageGraph(
          {
            path: "/hire",
            name: title,
            description,
            breadcrumb: [
              { name: "Home", path: "/" },
              { name: "Hire", path: "/hire" },
            ],
          },
          [faqNode("/hire", homeFaqs)],
        )}
      />

      <main className="mx-auto max-w-7xl px-6 pt-28 md:px-10 md:pt-32 lg:px-14">
        <div className="grid items-start gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
          <div className="flex flex-col items-start gap-6">
            <BackLink />
            <Reveal>
              <h1 className="font-display text-4xl leading-[1.05] font-bold tracking-tight md:text-5xl">
                Hire a full stack developer in Thrissur, Kerala
              </h1>
            </Reveal>
            <Reveal delay={0.06}>
              <p lang="ml" className="text-lg text-muted-foreground">
                {ml.hireSubline}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                I am Nevil Krishna K. I build websites, web apps, dashboards and
                mobile apps, and I have spent three years shipping them to real
                users. You brief the person who writes the code. No agency
                layer, no account manager, no price list you have to reverse
                engineer.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
                Hired as a{" "}
                {roleShortlist.join(", ").toLowerCase()}. Available for
                freelance projects, contract work and full time roles, in
                Thrissur, anywhere in Kerala, and remote across India.
              </p>
            </Reveal>
            <Reveal delay={0.18} className="w-full">
              <div className="flex w-full max-w-xl flex-col gap-3 sm:flex-row md:gap-4">
                <WhatsAppButton
                  size="lg"
                  message="Hi Nevil, I found your hire page. I would like to talk about a project."
                />
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
                <a href={PHONE_TEL} className="text-foreground underline underline-offset-4">
                  {PHONE_DISPLAY}
                </a>
                . {HOURS.display}.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.26} className="w-full lg:justify-self-end">
            <QrPanel
              url={WHATSAPP_URL}
              label="Scan to chat"
              hint="Reading this on a laptop? Point your phone camera here and WhatsApp opens with the first message written."
            />
          </Reveal>
        </div>
      </main>

      <Services heading="What I build" />
      <HowItWorks />

      <section className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20 lg:px-14">
        <div className="flex flex-col gap-8 md:gap-12">
          <Reveal className="flex flex-col gap-4">
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Work you can open
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Three of them below, and every project on{" "}
              <Link href="/projects" className="text-foreground underline underline-offset-4">
                the projects page
              </Link>{" "}
              links to something live.
            </p>
          </Reveal>
          <Projects projects={projects} />
        </div>
      </section>

      <Testimonials />
      <Locations />
      <Faq faqs={homeFaqs} heading={`Questions people ask ${AUTHOR.split(" ")[0]}`} />
      <CtaBlock message="Hi Nevil, I found your hire page. I would like to talk about a project." />
      <Footer />
    </>
  );
};

export default HirePage;
