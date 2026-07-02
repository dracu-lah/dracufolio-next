import HeroImage from "./components/HeroImage";
import Reveal from "@/components/common/Reveal";
import { Button } from "@/components/ui/button";
import { GetProjectsAPI } from "@/services/api";

const HeroSection = async () => {
  let projectCount = 0;
  try {
    projectCount = (await GetProjectsAPI()).length;
  } catch (error) {
    console.error("Failed to load projects:", error);
  }

  const stats = [
    { value: `${projectCount || 18}+`, label: "projects" },
    { value: "3+", label: "yrs react" },
    { value: "FOSS", label: "community" },
  ];

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <div aria-hidden className="hairline-grid absolute inset-0" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 px-6 pt-28 pb-14 md:pt-32 md:pb-16 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="flex flex-col items-start gap-7">
          <Reveal>
            <h1 className="font-display text-5xl leading-[1.05] font-bold tracking-tight sm:text-6xl xl:text-7xl">
              Nevil
              <br />
              Krishna K
              <span className="mt-5 block text-lg font-normal tracking-[0.3em] text-muted-foreground uppercase sm:text-xl">
                Frontend Engineer
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              I build <b>React</b> and <b>Next.js</b> interfaces that load
              fast and hold up in production.
            </p>
          </Reveal>

          <Reveal delay={0.16} className="w-full">
            <div className="flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:flex-wrap md:gap-4">
              <a href="#portfolio" className="w-full sm:w-auto">
                <Button size="lg" variant="solid" className="w-full sm:w-auto">
                  view projects
                </Button>
              </a>
              <a href="#contact" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto">
                  contact
                </Button>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.24} className="w-full">
            <dl className="grid w-full max-w-xl grid-cols-3 divide-x divide-border border border-border bg-background/60">
              {stats.map((stat) => (
                <div key={stat.label} className="px-3 py-3 md:px-6 md:py-4">
                  <dd className="font-display text-xl font-bold md:text-3xl">
                    {stat.value}
                  </dd>
                  <dt className="pt-1 text-[10px] uppercase tracking-[0.1em] text-muted-foreground md:text-[13px] md:tracking-[0.25em]">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal
          delay={0.2}
          y={40}
          className="justify-self-center lg:justify-self-end"
        >
          <HeroImage />
        </Reveal>
      </div>
    </section>
  );
};

export default HeroSection;
