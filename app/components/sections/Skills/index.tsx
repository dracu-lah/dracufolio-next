import Skills from "./components/Skills";
import Reveal from "@/components/common/Reveal";
import { GetSkillsAPI } from "@/services/api";

const experience = [
  {
    role: "Web Developer",
    company: "Lascade LLP",
    period: "Nov 2025 - Present",
    points: [
      "Deploys Next.js projects with OpenNext to Cloudflare Workers, improving deployment speed and caching",
      "Integrated the Resend SDK with Django to automate transactional email workflows",
      "Optimized SEO and load times with React Server Components for high-traffic travel apps",
    ],
    stack: "Next.js · Tailwind · Zustand · Docker · Django · Cloudflare Workers",
  },
  {
    role: "Frontend Developer",
    company: "Udyata Information Systems",
    period: "Jun 2023 - Aug 2025",
    points: [
      "Built and maintained 20+ reusable React components, improving development efficiency by 30%",
      "Cut initial load times through code splitting, lazy loading, and memoization",
      "Reduced network overhead by 20% through optimized API integrations, and deployment errors by 15% with GitHub Actions CI/CD",
      "Built the TukTuko admin panel and self-hosted OpenStreetMap services (Nominatim, OSRM) for a commission-free ride-hailing platform",
    ],
    stack: "React · React Native · Flutter · Next.js · Tailwind · Docker",
  },
];

const toolkit = [
  { label: "Languages", value: "JavaScript, TypeScript, HTML, CSS" },
  {
    label: "Frameworks",
    value: "React, Next.js, Tailwind CSS, Shadcn UI, Redux, Zustand",
  },
  {
    label: "Tools",
    value: "Git, Docker, AWS, GCP, Cloudflare Workers, Vercel, Figma, Neovim",
  },
  {
    label: "Practices",
    value: "Component-driven UI, RESTful APIs, Responsive design, Agile, CI/CD",
  },
];

const SkillsSection = async () => {
  let skills: string[] = [];

  try {
    skills = await GetSkillsAPI();
  } catch (error) {
    console.error("Failed to load skills:", error);
    // skills will remain empty array if API fails
  }

  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-16 md:py-24 lg:py-32">
      <div className="flex flex-col gap-8 md:gap-12">
        <div className="flex max-w-2xl flex-col gap-5">
          <Reveal>
            <p className="font-mono text-sm uppercase tracking-[0.3em] text-muted-foreground">
              A problem is a chance to do your best
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Skills &amp; Experience
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              I turn designs into accessible, production-ready interfaces with{" "}
              <b>React</b>. This is the toolkit I reach for every day. The full
              work history lives on{" "}
              <a
                className="underline underline-offset-4 transition-colors duration-300 hover:text-foreground"
                href="https://www.linkedin.com/in/nevil-krishna-k-77170222a/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              .
            </p>
          </Reveal>
        </div>

        <Skills skills={skills} />

        <Reveal className="w-full">
          <dl className="grid divide-y divide-border border border-border md:grid-cols-2 md:divide-y-0">
            {toolkit.map((row, i) => (
              <div
                key={row.label}
                className={`flex flex-col gap-2 px-6 py-5 ${
                  i % 2 === 0 ? "md:border-r md:border-border" : ""
                } ${i < 2 ? "md:border-b md:border-border" : ""}`}
              >
                <dt className="font-mono text-sm uppercase tracking-[0.25em] text-muted-foreground">
                  {row.label}
                </dt>
                <dd className="text-base leading-relaxed md:text-lg">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="flex flex-col gap-8">
          <Reveal>
            <h3 className="font-mono text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Experience
            </h3>
          </Reveal>
          {experience.map((job, index) => (
            <Reveal key={job.company} delay={index * 0.08} className="w-full">
              <article className="border border-border bg-card px-6 py-6 md:px-8 md:py-7">
                <div className="flex flex-col justify-between gap-2 pb-4 md:flex-row md:items-baseline">
                  <h4 className="font-display text-xl font-bold tracking-tight md:text-2xl">
                    {job.role}{" "}
                    <span className="text-muted-foreground">
                      · {job.company}
                    </span>
                  </h4>
                  <p className="font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground">
                    {job.period}
                  </p>
                </div>
                <ul className="flex flex-col gap-2.5">
                  {job.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-base leading-relaxed text-muted-foreground md:text-lg"
                    >
                      <span
                        aria-hidden
                        className="mt-2.5 size-1.5 shrink-0 bg-phosphor"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
                <p className="pt-4 font-mono text-sm text-muted-foreground">
                  {job.stack}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
export default SkillsSection;
