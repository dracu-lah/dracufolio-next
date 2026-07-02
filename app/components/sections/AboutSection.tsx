import { Github, Linkedin, Mail } from "lucide-react";
import Reveal from "@/components/common/Reveal";

const systemInfo = [
  { key: "os", value: "Fedora + SwayWM" },
  { key: "host", value: "Dell Latitude 7430" },
  { key: "locale", value: "Thrissur, Kerala (IST)" },
  { key: "editor", value: "Neovim (btw)" },
  { key: "mem", value: "32GB" },
  { key: "disk", value: "512GB SSD" },
  { key: "stack", value: "React · Next.js · TS" },
  { key: "uptime", value: "3+ yrs frontend" },
  { key: "caffeine", value: "█████████░ 92%" },
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

const AboutSection = () => {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-16 md:py-24 lg:py-32">
      <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div className="flex flex-col items-start gap-6">
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Hey, I&apos;m Nevil.
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              Frontend developer with{" "}
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
              Outside work you&apos;ll find me at <b>FOSS meetups</b> or deep
              in my dotfiles. I dual boot Fedora and Arch, so when I say it
              works on my machine, I mean <b>both of them</b>.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <ul className="flex flex-wrap gap-3 pt-2">
              {socialLinks.map(({ href, label, icon: Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="flex items-center gap-3 border border-border px-4 py-3 text-sm uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 hover:border-foreground hover:text-foreground"
                  >
                    <Icon className="size-5" aria-hidden />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="w-full">
          <div className="overflow-hidden rounded-lg border border-border bg-card font-mono shadow-lg">
            <div className="flex items-center gap-2 border-b border-border bg-secondary/60 px-4 py-3">
              <span className="size-3 rounded-full bg-[#ff5f57]" aria-hidden />
              <span className="size-3 rounded-full bg-[#febc2e]" aria-hidden />
              <span className="size-3 rounded-full bg-[#28c840]" aria-hidden />
              <p className="flex-1 text-center text-sm text-muted-foreground">
                nevil@bread: ~
              </p>
            </div>
            <div className="px-5 py-5 md:px-6">
              <p className="pb-4 text-base md:text-lg">
                <span className="text-phosphor">nevil@bread</span>
                <span className="text-muted-foreground">:~$</span> fastfetch
              </p>
              <dl className="space-y-3">
                {systemInfo.map((row) => (
                  <div
                    key={row.key}
                    className="grid grid-cols-[7rem_1fr] gap-4 text-base md:text-lg"
                  >
                    <dt className="uppercase tracking-[0.15em] text-muted-foreground">
                      {row.key}
                    </dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default AboutSection;
