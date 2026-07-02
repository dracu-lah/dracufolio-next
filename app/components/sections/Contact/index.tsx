import Contact from "./components/ContactForm";
import Reveal from "@/components/common/Reveal";
import { Linkedin, Mail } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-16 md:py-24 lg:py-32">
      <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div className="flex flex-col items-start gap-6">
          <Reveal>
            <p className="font-mono text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Get in touch
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
              Contact Me
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              Have a role, a project, or a bug that refuses to die? Send a
              message and I&apos;ll reply within a day.
            </p>
          </Reveal>
          <Reveal delay={0.24} className="w-full">
            <ul className="w-full max-w-md divide-y divide-border border border-border">
              <li>
                <a
                  href="mailto:nevilkrishna@gmail.com"
                  className="flex items-center gap-4 px-5 py-4 text-base transition-colors duration-300 hover:bg-card md:text-lg"
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
                  className="flex items-center gap-4 px-5 py-4 text-base transition-colors duration-300 hover:bg-card md:text-lg"
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
