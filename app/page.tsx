import HeroSection from "./components/sections/Hero";
import PortfolioSection from "./components/sections/Portfolio";
import ServicesSection from "./components/sections/Services";
import SkillsSection from "./components/sections/Skills";
import FaqSection from "./components/sections/Faq";
import LocationsSection from "./components/sections/Locations";
import TestimonialsSection from "./components/sections/Testimonials";
import ContactSection from "./components/sections/Contact";
import Footer from "./components/common/Footer";
import JsonLd from "./components/common/JsonLd";
import { faqNode, pageGraph } from "./lib/schema";
import { SITE_URL } from "./lib/seo";
import { homeFaqs } from "./data/faq";
import { CONTENT_DATES } from "./data/updated";

export const revalidate = 86400;

const description =
  "Nevil Krishna K is a full stack developer in Thrissur, Kerala. React, Next.js and TypeScript for the web, Kotlin for Android. Freelance, remote and full time work across Kerala and India.";

const Home = () => (
  <>
    <JsonLd
      data={pageGraph(
        {
          path: "/",
          name: "Nevil Krishna K, Full Stack Developer in Thrissur, Kerala",
          description,
          dateModified: CONTENT_DATES.home,
          primaryImage: "/nevil-krishna-k.jpg",
        },
        [
          faqNode("/", homeFaqs),
          {
            "@type": "ProfilePage",
            "@id": `${SITE_URL}/#profilepage`,
            mainEntity: { "@id": `${SITE_URL}/#person` },
          },
        ],
      )}
    />
    <main>
      <HeroSection />
      <PortfolioSection />
      <ServicesSection />
      <SkillsSection />
      <TestimonialsSection />
      <FaqSection faqs={homeFaqs} heading="Questions" />
      <LocationsSection compact />
      <ContactSection />
      <Footer />
    </main>
  </>
);

export default Home;
