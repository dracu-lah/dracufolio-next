import { Github, Linkedin, Mail } from "lucide-react";
import Reveal from "@/components/common/Reveal";

const profile = [
  { key: "Role", value: "Full Stack Developer" },
  { key: "Location", value: "Thrissur, Kerala (IST)" },
  { key: "Experience", value: "3+ years" },
  { key: "Focus", value: "React, Next.js, TypeScript" },
  { key: "Backend", value: "Django, Node.js, REST APIs" },
  { key: "Infra", value: "Docker, Cloudflare Workers, AWS" },
  { key: "Environment", value: "Fedora, Neovim" },
  { key: "Availability", value: "Open to new work" },
];

const socialLinks = [
  {
    href: "mailto:nevilkrishna@gmail.com",
    label: "email",
    icon: Mail,
    external: false,
  },
  {
    href: "https://github.com/dracu-lah",
    label: "github",
    icon: Github,
    external: true,
  },
  {
    href: "https://www.linkedin.com/in/nevil-krishna-k-77170222a/",
    label: "linkedin",
    icon: Linkedin,
    external: true,
  },
];

const AboutSection = ({ asPage = false }: { asPage?: boolean }) => {
  const Heading = asPage ? "h1" : "h2";
  return (
    <section
      id="about"
      className="mx-auto max-w-6xl px-6 md:px-10 py-24 md:py-32 lg:py-40"
    >
      <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div className="flex flex-col items-start gap-6">
          <Reveal>
            <Heading className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              About
            </Heading>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              Full stack developer with{" "}
              <b>3 years in the React/Next.js ecosystem</b>, currently
              building high-traffic travel products like{" "}
              <a
                className="underline underline-offset-4 transition-colors duration-300 hover:text-foreground"
                href="https://seatinfo.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                SeatInfo
              </a>{" "}
              and{" "}
              <a
                className="underline underline-offset-4 transition-colors duration-300 hover:text-foreground"
                href="https://www.flightpoints.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Flightpoints
              </a>{" "}
              at <b>Lascade</b>.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              I work mostly on performance, accessibility and the parts of a
              product that decide whether it feels finished. Outside of client
              work I maintain open source tools and take part in the local{" "}
              <b>FOSS community</b>.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <ul className="flex flex-wrap gap-x-6 gap-y-3 pt-2">
              {socialLinks.map(({ href, label, icon: Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="flex items-center gap-2 font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
                  >
                    <Icon className="size-4" aria-hidden />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="w-full">
          <dl className="w-full divide-y divide-border border-t border-b border-border">
            {profile.map((row) => (
              <div
                key={row.key}
                className="grid grid-cols-[8rem_1fr] gap-6 py-4 text-base md:grid-cols-[10rem_1fr] md:py-5 md:text-lg"
              >
                <dt className="font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground">
                  {row.key}
                </dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
};

export default AboutSection;
