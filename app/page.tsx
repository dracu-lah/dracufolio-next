import HeroSection from "./components/sections/Hero";
// import AboutSection from "./components/sections/AboutSection";
// import OpenSourceSection from "./components/sections/OpenSource";
import SkillsSection from "./components/sections/Skills";
import PortfolioSection from "./components/sections/Portfolio";
import ContactSection from "./components/sections/Contact";
import TerminalRule from "./components/common/TerminalRule";
import Footer from "./components/common/Footer";

export const revalidate = 86400;
export default function Home() {
  return (
    <main>
      <HeroSection />
      <PortfolioSection />
      <TerminalRule path="experience" />
      <SkillsSection />
      {/* Open source lives on /open-source */}
      {/* <TerminalRule path="open-source" /> */}
      {/* <OpenSourceSection /> */}
      {/* About lives on /about */}
      {/* <TerminalRule path="about" /> */}
      {/* <AboutSection /> */}
      <TerminalRule path="contact" />
      <ContactSection />
      <Footer />
    </main>
  );
}
