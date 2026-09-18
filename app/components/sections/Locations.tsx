import Link from "next/link";
import Reveal from "@/components/common/Reveal";
import { MapPin } from "@/components/common/icons";
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

const Locations = ({ currentSlug }: { currentSlug?: string }) => (
  <section
    id="locations"
    className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20 lg:px-14"
  >
    <div className="flex flex-col gap-8 md:gap-10">
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
        {GROUPS.map((group) => {
          const items = locations.filter((l) => group.match(l.kind));
          return (
            <Reveal key={group.label} className="flex flex-col gap-3">
              <h3 className="font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground">
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
                        className={`flex items-center gap-2 rounded-lg squircle border px-3 py-2 font-mono text-sm whitespace-nowrap transition-colors duration-300 ${
                          current
                            ? "border-foreground bg-foreground text-background"
                            : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                        }`}
                      >
                        <MapPin
                         
                          className="size-4 shrink-0"
                          aria-hidden
                        />
                        {location.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

export default Locations;
