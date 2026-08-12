import AboutSection from "@/components/sections/AboutSection";
import Footer from "@/components/common/Footer";
import BackLink from "@/components/common/BackLink";
import JsonLd from "@/components/common/JsonLd";
import { breadcrumbJsonLd, pageMetadata, personJsonLd, SITE_URL } from "@/lib/seo";

const description =
  "Nevil Krishna K is a full stack developer in Thrissur, Kerala, working with React and Next.js on travel products at Lascade and on open source the rest of the time.";

export const metadata = pageMetadata({
  title: "About",
  description,
  path: "/about",
  type: "profile",
});

const AboutPage = () => (
  <>
    <JsonLd
      data={[
        {
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About Nevil Krishna K",
          description,
          url: `${SITE_URL}/about`,
          mainEntity: personJsonLd,
        },
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]),
      ]}
    />
    <main className="mx-auto max-w-6xl px-6 md:px-10 pt-28 md:pt-32">
      <BackLink />
    </main>
    <AboutSection asPage />
    <Footer />
  </>
);

export default AboutPage;
