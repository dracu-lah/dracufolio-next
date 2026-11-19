import Link from "next/link";
import Reveal from "@/components/common/Reveal";
import { Squircle } from "@/components/ui/squircle";
import { githubRepo } from "@/data/contact";
import { tmplayerProof, yearsInReact } from "@/data/experience";
import { publishedPosts } from "@/data/posts";
import { googleRating } from "@/data/reviews";

/**
 * Five numbers under the hero, each one a link to the page where it can be
 * checked. A visitor deciding in ten seconds gets the evidence before the
 * scroll, and anyone doubting a figure is one tap from its source.
 *
 * Server rendered on purpose: it is text a crawler should quote, and none of
 * it needs the browser. Every number is read from a data file (TMPlayer's in
 * experience.ts, the rating in the imported Google reviews, the post count
 * from the blog registry), so a re-check changes one place.
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
  ...(googleRating.count > 0
    ? [
        {
          value: googleRating.rating.toFixed(1),
          label: `from ${googleRating.count} Google reviews`,
          href: "#reviews",
        },
      ]
    : []),
  {
    value: yearsInReact,
    label: "years in React and Next.js",
    href: "/about#work-history",
  },
  {
    value: String(publishedPosts.length),
    label: "posts on the blog",
    href: "/blog",
  },
];

const ProofStrip = () => (
  <section
    aria-label="Proof"
    className="mx-auto max-w-7xl px-6 pb-4 md:px-10 md:pb-6 lg:px-14"
  >
    <ul className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-5">
      {tiles.map((tile, i) => {
        const spansRow = i === tiles.length - 1 && tiles.length % 2 === 1;
        const classes =
          "flex h-full flex-col gap-1 p-4 md:p-5 focus-visible:outline-none";
        const body = (
          <>
            <span className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {tile.value}
            </span>
            {/* Two lines of room on a phone, so a label that wraps late (after the
                font swap) cannot make the tile taller than its clipped frame. */}
            <span
              className={`text-base leading-snug text-muted-foreground ${
                spansRow ? "" : "min-h-11 sm:min-h-0"
              }`}
            >
              {tile.label}
            </span>
          </>
        );
        return (
          <li
            key={tile.label}
            // An odd last tile spans the row on a phone instead of leaving a hole.
            className={spansRow ? "col-span-2 lg:col-span-1" : undefined}
          >
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
