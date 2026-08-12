import Image from "next/image";
import Reveal from "@/components/common/Reveal";
import { experience } from "@/data/experience";

const ExperienceList = () => (
  <div className="flex flex-col gap-6 md:gap-8">
    {experience.map((job, index) => (
      <Reveal key={job.company} delay={index * 0.08} className="w-full">
        <article className="rounded-xl squircle border border-border bg-card p-6 md:p-8">
          <div className="flex items-start gap-4 pb-6">
            <Image
              src={job.logo}
              alt={`${job.company} logo`}
              width={128}
              height={128}
              className="size-11 shrink-0 rounded-lg squircle object-cover md:size-12"
            />
            <div className="flex flex-col gap-1">
              <h3 className="font-display text-lg font-bold tracking-tight sm:text-xl md:text-2xl">
                {job.role}
              </h3>
              <p className="text-base text-muted-foreground md:text-lg">
                {job.company}
              </p>
              <p className="font-mono text-base uppercase tracking-[0.18em] text-muted-foreground">
                {job.period}
              </p>
            </div>
          </div>
          <ul className="flex flex-col gap-2.5">
            {job.points.map((point) => (
              <li
                key={point}
                className="flex gap-3 text-base leading-relaxed text-muted-foreground md:text-lg"
              >
                <span
                  aria-hidden
                  className="mt-2.5 size-1.5 shrink-0 bg-muted-foreground"
                />
                {point}
              </li>
            ))}
          </ul>
          <p className="pt-6 font-mono text-base break-words text-muted-foreground">
            {job.stack}
          </p>
        </article>
      </Reveal>
    ))}
  </div>
);

export default ExperienceList;
