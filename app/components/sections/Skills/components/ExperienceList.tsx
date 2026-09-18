import Image from "next/image";
import Badge from "@/components/common/Badge";
import Reveal from "@/components/common/Reveal";
import { Squircle } from "@/components/ui/squircle";
import { CalendarIcon } from "@/components/common/icons";
import { experience } from "@/data/experience";

const ExperienceList = () => (
  <div className="flex flex-col gap-6 md:gap-8">
    {experience.map((job, index) => (
      <Reveal key={job.company} delay={index * 0.08} className="w-full">
        <Squircle
          as="article"
          borderWidth={1}
          fillClassName="bg-card"
          className="bg-border p-6 transition-colors duration-300 hover:bg-accent-edge md:p-8"
        >
          <div className="flex items-start gap-4 pb-6">
            <Image
              src={job.logo}
              alt={`${job.company} logo`}
              width={128}
              height={128}
              className="size-11 shrink-0 rounded-lg object-cover md:size-12"
            />
            <div className="flex flex-col gap-1">
              <h3 className="font-display text-lg font-bold tracking-tight sm:text-xl md:text-2xl">
                {job.role}
              </h3>
              <p className="text-base text-muted-foreground md:text-lg">
                {job.company}
              </p>
              <Badge icon={CalendarIcon} className="mt-1 self-start">
                {job.period}
              </Badge>
            </div>
          </div>
          <ul className="flex flex-col gap-2.5">
            {job.points.map((point) => (
              <li
                key={point}
                className="flex gap-3 text-base leading-relaxed text-muted-foreground"
              >
                <span
                  aria-hidden
                  className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent"
                />
                {point}
              </li>
            ))}
          </ul>
          {/* The stack was one mono sentence full of middle dots, which reads
              as a run-on. Badges let the eye pick out the one thing it came
              looking for. */}
          <div className="flex flex-wrap gap-1.5 pt-6">
            {job.stack.map((tool) => (
              <Badge key={tool}>{tool}</Badge>
            ))}
          </div>
        </Squircle>
      </Reveal>
    ))}
  </div>
);

export default ExperienceList;
