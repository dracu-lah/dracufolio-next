import HeroSection from "./components/sections/Hero";
import PortfolioSection from "./components/sections/Portfolio";
import ServicesSection from "./components/sections/Services";
import LatestPosts from "./components/sections/LatestPosts";
import SkillsSection from "./components/sections/Skills";
import FaqSection from "./components/sections/Faq";
import LocationsSection from "./components/sections/Locations";
import TestimonialsSection from "./components/sections/Testimonials";
import ContactSection from "./components/sections/Contact";
import Footer from "./components/common/Footer";
import JsonLd from "./components/common/JsonLd";
import { faqNode, ID, pageGraph, ref } from "./lib/schema";
import { homeFaqs } from "./data/faq";
import { CONTENT_DATES } from "./data/updated";
import { HOME_DESCRIPTION, HOME_TITLE, pageMetadata } from "./lib/seo";

export const revalidate = 86400;

export const metadata = pageMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  path: "/",
  absoluteTitle: true,
});

const Home = () => (
  <>
    <JsonLd
      data={pageGraph(
        {
          path: "/",
          // One node for the home page. A second ProfilePage node beside the
          // WebPage split the same URL into two pages with different facts.
          type: ["WebPage", "ProfilePage"],
          mainEntity: ref(ID.person),
          name: "Nevil Krishna K, Full Stack Developer in Thrissur, Kerala",
          description: HOME_DESCRIPTION,
          dateModified: CONTENT_DATES.home,
          primaryImage: "/nevil-krishna-k.jpg",
        },
        [faqNode("/", homeFaqs)],
      )}
    />
    <main>
      <HeroSection />
      <PortfolioSection />
      <LatestPosts />
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
