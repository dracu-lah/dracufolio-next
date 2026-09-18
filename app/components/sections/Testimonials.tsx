import Reveal from "@/components/common/Reveal";
import { Squircle } from "@/components/ui/squircle";
import { testimonials } from "@/data/testimonials";

/**
 * Renders nothing until there are real quotes in the data file. An empty
 * section is better than an invented one, and a made up testimonial is the
 * fastest way to lose the trust the rest of this site is trying to build.
 */
const Testimonials = () => {
  if (testimonials.length === 0) return null;

  return (
    <section
      id="testimonials"
      className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16 lg:px-14 lg:py-20"
    >
      <div className="flex flex-col gap-7 md:gap-10">
        <Reveal>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            What people say
          </h2>
        </Reveal>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((person, i) => (
            <li key={person.name}>
              <Reveal delay={i * 0.06} className="h-full">
                <Squircle
                  as="figure"
                  borderWidth={1}
                  fillClassName="bg-card"
                  className="flex h-full flex-col gap-5 bg-border p-6"
                >
                  <blockquote className="text-base leading-relaxed text-muted-foreground md:text-lg">
                    {person.quote}
                  </blockquote>
                  <figcaption className="mt-auto flex flex-col gap-1">
                    <span className="text-base text-foreground">
                      {person.link ? (
                        <a
                          href={person.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline underline-offset-4"
                        >
                          {person.name}
                        </a>
                      ) : (
                        person.name
                      )}
                    </span>
                    <span className="font-mono text-sm text-muted-foreground">
                      {person.role}, {person.company}
                    </span>
                  </figcaption>
                </Squircle>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Testimonials;
