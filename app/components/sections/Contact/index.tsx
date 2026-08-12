import Contact from "./components/ContactForm";
import Reveal from "@/components/common/Reveal";
import { Linkedin, Mail } from "lucide-react";

const ContactSection = ({ asPage = false }: { asPage?: boolean }) => {
  const Heading = asPage ? "h1" : "h2";
  return (
    <section
      id="contact"
      className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14 py-14 md:py-20"
    >
      <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="flex max-w-2xl flex-col items-start gap-6">
          <Reveal delay={0.08}>
            <Heading className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Contact Me
            </Heading>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              Available for full time roles and freelance work. Send a message
              here, or reach me directly.
            </p>
          </Reveal>
          <Reveal delay={0.24} className="w-full">
            <ul className="w-full max-w-md divide-y divide-border border-t border-b border-border">
              <li>
                <a
                  href="mailto:nevilkrishna@gmail.com"
                  className="flex items-center gap-4 py-4 text-base transition-colors duration-300 hover:text-foreground md:text-lg"
                >
                  <Mail className="size-6 text-muted-foreground" aria-hidden />
                  nevilkrishna@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/nevil-krishna-k-77170222a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 py-4 text-base transition-colors duration-300 hover:text-foreground md:text-lg"
                >
                  <Linkedin
                    className="size-6 text-muted-foreground"
                    aria-hidden
                  />
                  LinkedIn
                </a>
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="w-full">
          <Contact />
        </Reveal>
      </div>
    </section>
  );
};

export default ContactSection;
