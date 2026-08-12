import Image from "next/image";
import Reveal from "@/components/common/Reveal";
import { experience } from "@/data/experience";

const ExperienceList = () => (
  <div className="flex flex-col gap-6 md:gap-8">
    {experience.map((job, index) => (
      <Reveal key={job.company} delay={index * 0.08} className="w-full">
        <article className="rounded-xl squircle border border-border bg-card px-5 py-5 md:px-8 md:py-7">
          <div className="flex flex-col justify-between gap-3 pb-4 md:flex-row md:items-center">
            <div className="flex items-center gap-4">
              <Image
                src={job.logo}
                alt={`${job.company} logo`}
                width={128}
                height={128}
                className="size-11 shrink-0 rounded-lg squircle object-cover md:size-12"
              />
              <h3 className="font-display text-lg font-bold tracking-tight sm:text-xl md:text-2xl">
                {job.role}{" "}
                <span className="block text-muted-foreground md:inline">
                  <span className="hidden md:inline">· </span>
                  {job.company}
                </span>
              </h3>
            </div>
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
          <p className="pt-4 font-mono text-sm break-words text-muted-foreground">
            {job.stack}
          </p>
        </article>
      </Reveal>
    ))}
  </div>
);

export default ExperienceList;
