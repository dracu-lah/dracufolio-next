import Image from "next/image";
import { Github, Linkedin, Mail } from "lucide-react";
import Reveal from "@/components/common/Reveal";
import InlineLogo from "@/components/common/InlineLogo";
import { GetHeroImageAPI } from "@/services/api";

const profile = [
  { key: "Role", value: "Full Stack Developer" },
  { key: "Location", value: "Thrissur, Kerala (IST)" },
  { key: "Experience", value: "3+ years" },
  { key: "Focus", value: "React, Next.js, TypeScript" },
  { key: "Backend", value: "Django, Node.js, REST APIs" },
  { key: "Infra", value: "Cloudflare Workers, D1, R2, OpenNext, Docker" },
  { key: "Also", value: "Kotlin and Jetpack Compose on Android" },
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

const contentLink =
  "underline underline-offset-4 transition-colors duration-300 hover:text-foreground";

const AboutSection = async ({ asPage = false }: { asPage?: boolean }) => {
  const Heading = asPage ? "h1" : "h2";
  let portrait: string | null = null;
  try {
    portrait = await GetHeroImageAPI();
  } catch (error) {
    console.error("Failed to load portrait:", error);
  }

  return (
    <section
      id="about"
      className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20 lg:px-14"
    >
      <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal className="w-full">
          <div className="flex flex-col gap-6">
            {portrait && (
              <figure className="overflow-hidden rounded-xl squircle border border-border">
                <Image
                  width={720}
                  height={900}
                  sizes="(min-width: 1024px) 26rem, 100vw"
                  draggable="false"
                  className="aspect-[4/5] w-full object-cover"
                  src={portrait}
                  alt="Portrait of Nevil Krishna K, full stack developer"
                />
              </figure>
            )}
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3">
              {socialLinks.map(({ href, label, icon: Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="flex items-center gap-2 font-mono text-base uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
                  >
                    <Icon className="size-4" aria-hidden />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="flex flex-col items-start gap-6">

          <Reveal delay={0.08}>
            <Heading className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              About
            </Heading>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              Full stack developer with <b>3 years in the React and Next.js
              ecosystem</b>, currently building high-traffic travel products
              like{" "}
              <a
                className={contentLink}
                href="https://seatinfo.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InlineLogo src="/logos/seatinfo.png">SeatInfo</InlineLogo>
              </a>{" "}
              and{" "}
              <a
                className={contentLink}
                href="https://www.flightpoints.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InlineLogo src="/logos/flightpoints.png">
                  Flightpoints
                </InlineLogo>
              </a>{" "}
              at{" "}
              <b>
                <InlineLogo src="/logos/lascade.png">Lascade</InlineLogo>
              </b>
              .
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              I work mostly on performance, accessibility and the parts of a
              product that decide whether it feels finished. Outside of client
              work I maintain open source tools and take part in the local{" "}
              <b>FOSS community</b>.
            </p>
          </Reveal>

          <Reveal delay={0.24} className="w-full pt-2">
            <dl className="w-full divide-y divide-border border-t border-b border-border">
              {profile.map((row) => (
                <div
                  key={row.key}
                  className="grid grid-cols-[8rem_1fr] gap-6 py-4 text-base md:grid-cols-[12rem_1fr] md:text-lg"
                >
                  <dt className="font-mono text-base uppercase tracking-[0.18em] text-muted-foreground">
                    {row.key}
                  </dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
