import Link from "next/link";
import Reveal from "@/components/common/Reveal";
import { Squircle } from "@/components/ui/squircle";
import { githubRepo } from "@/data/contact";
import { tmplayerProof, yearsInReact } from "@/data/experience";

/**
 * Four numbers under the hero, each one a link to the page where it can be
 * checked. A visitor deciding in ten seconds gets the evidence before the
 * scroll, and anyone doubting a figure is one tap from its source.
 *
 * Server rendered on purpose: it is text a crawler should quote, and none of
 * it needs the browser. Every number is read from experience.ts (TMPlayer's
 * proof and the years in React), so a re-check changes one place. The Google
 * rating is not here: the reviews section carries it, and it shows once.
 */
type Tile = {
  value: string;
  label: string;
  href: string;
  external?: boolean;
};

const tiles: Tile[] = [
  {
    value: tmplayerProof.stars,
    label: "GitHub stars on TMPlayer",
    href: githubRepo("TMPlayer"),
    external: true,
  },
  {
    value: tmplayerProof.downloads,
    label: "TMPlayer downloads",
    href: "https://tmplayer.org",
    external: true,
  },
  {
    value: yearsInReact,
    label: "years in React and Next.js",
    href: "/about#work-history",
  },
  {
    value: tmplayerProof.releases,
    label: `TMPlayer releases in about ${tmplayerProof.releaseWeeks} weeks`,
    href: `${githubRepo("TMPlayer")}/releases`,
    external: true,
  },
];

const ProofStrip = () => (
  <section
    aria-label="Proof"
    className="mx-auto max-w-7xl px-6 pb-4 md:px-10 md:pb-6 lg:px-14"
  >
    <ul className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
      {tiles.map((tile, i) => {
        const classes =
          "flex h-full flex-col gap-1 p-4 md:p-5 focus-visible:outline-none";
        const body = (
          <>
            <span className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {tile.value}
            </span>
            {/* Two lines of room on a phone, so a label that wraps late (after the
                font swap) cannot make the tile taller than its clipped frame. */}
            <span className="min-h-11 text-base leading-snug text-muted-foreground sm:min-h-0">
              {tile.label}
            </span>
          </>
        );
        return (
          <li key={tile.label}>
            <Reveal delay={i * 0.04} className="h-full">
              <Squircle
                borderWidth={1}
                fillClassName="bg-card"
                className="group h-full bg-border transition-colors duration-200 focus-within:bg-accent-edge hover:bg-accent-edge [&>[data-fill]]:hover:bg-accent-tint"
              >
                {tile.external ? (
                  <a
                    href={tile.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes}
                  >
                    {body}
                  </a>
                ) : (
                  <Link href={tile.href} className={classes}>
                    {body}
                  </Link>
                )}
              </Squircle>
            </Reveal>
          </li>
        );
      })}
    </ul>
  </section>
);

export default ProofStrip;
