import Link from "next/link";
import Reveal from "@/components/common/Reveal";
import { ArrowRight, MapPin } from "@/components/common/icons";
import { locations } from "@/data/locations";
import { LOCALITY, REGION } from "@/data/contact";

/**
 * Where the work happens, as three rows of links rather than one long bullet
 * list. Each pill is a real page with its own text, so this doubles as the
 * internal link map that gets those 29 pages crawled.
 */
const GROUPS = [
  {
    label: "Around Thrissur",
    match: (kind: string) => kind === "town",
  },
  {
    label: "Kerala districts",
    match: (kind: string) => kind === "district",
  },
  {
    label: "Statewide and remote",
    match: (kind: string) => kind === "state" || kind === "country",
  },
];

/**
 * `compact` is the home page. A visitor who came to judge a developer does not
 * need thirty one place names, so the home page shows the districts and the
 * statewide rows and sends the towns to /hire, where somebody searching for a
 * developer in their town actually lands. The town pages keep every internal
 * link they had, from /hire, from the footer and from each other.
 */
const Locations = ({
  currentSlug,
  compact = false,
}: {
  currentSlug?: string;
  compact?: boolean;
}) => (
  <section
    id="locations"
    className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16 lg:px-14 lg:py-20"
  >
    <div className="flex flex-col gap-7 md:gap-10">
      <Reveal className="flex flex-col gap-4">
        <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
          Where I work
        </h2>
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
          I am in {LOCALITY}, so anywhere in the district is a short drive and
          most of {REGION} is a day trip. Everything else is remote, which is
          how most of my work has run anyway.
        </p>
      </Reveal>

      <div className="flex flex-col gap-7">
        {GROUPS.filter(
          (group) => !compact || group.label !== "Around Thrissur",
        ).map((group) => {
          const items = locations.filter((l) => group.match(l.kind));
          return (
            <Reveal key={group.label} className="flex flex-col gap-3">
              <h3 className="font-mono text-sm tracking-[0.2em] text-muted-foreground uppercase">
                {group.label}
              </h3>
              <ul className="scrollbar-visible -mx-6 flex snap-x gap-2 overflow-x-auto px-6 pb-2 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0">
                {items.map((location) => {
                  const current = location.slug === currentSlug;
                  return (
                    <li key={location.slug} className="snap-start">
                      <Link
                        href={`/hire/${location.slug}`}
                        aria-current={current ? "page" : undefined}
                        className={`flex h-9 items-center gap-2 rounded-full border px-3.5 font-mono text-sm whitespace-nowrap transition-colors duration-200 ${
                          current
                            ? "border-accent-edge bg-accent-tint text-accent"
                            : "border-border bg-secondary/60 text-muted-foreground hover:border-accent-edge hover:bg-accent-tint hover:text-accent"
                        }`}
                      >
                        <MapPin className="size-4 shrink-0" />
                        {location.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          );
        })}
        {compact && (
          <Link
            href="/hire"
            className="group inline-flex items-center gap-2 font-mono text-sm tracking-wide text-muted-foreground uppercase transition-colors duration-200 hover:text-accent"
          >
            And 13 towns around Thrissur
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>
    </div>
  </section>
);

export default Locations;
