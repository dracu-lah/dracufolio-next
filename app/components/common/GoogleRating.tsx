import Link from "next/link";
import { GoogleLogo, StarIcon } from "@/components/common/icons";
import { googleRating } from "@/data/reviews";

/**
 * "5.0, 7 reviews on Google" as one line, for the places a visitor decides
 * whether to message: under the hero buttons and beside the WhatsApp button
 * in the closing card. A rating from a platform the visitor already trusts is
 * worth more there than any sentence I could write about myself.
 *
 * `href` decides where it goes. Inside the site it points at the reviews
 * section, so the visitor stays on the page with the WhatsApp button; at the
 * end of a page it opens the profile itself, in a new tab.
 */
const GoogleRating = ({
  href,
  className = "",
}: {
  href: string;
  className?: string;
}) => {
  if (googleRating.count === 0) return null;

  const external = href.startsWith("http");
  const filled = Math.round(googleRating.rating);
  const label = `Rated ${googleRating.rating.toFixed(1)} out of 5 from ${googleRating.count} Google reviews`;

  const body = (
    <>
      {/* Stars and score stay together, and so do the count and the source,
          so a narrow card wraps between the two halves and never inside one. */}
      <span className="flex items-center gap-2 whitespace-nowrap">
        <span className="flex items-center gap-0.5 text-foreground" aria-hidden>
          {Array.from({ length: 5 }, (_, i) => (
            <StarIcon
              key={i}
              className={`size-5 ${i < filled ? "" : "text-border"}`}
            />
          ))}
        </span>
        <span className="font-medium text-foreground">
          {googleRating.rating.toFixed(1)}
        </span>
      </span>
      <span className="flex items-center gap-1.5 whitespace-nowrap">
        {googleRating.count} reviews on
        <GoogleLogo className="size-5" />
        Google
      </span>
    </>
  );

  const classes = `group inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-base text-muted-foreground transition-colors duration-200 hover:text-accent ${className}`;

  return external ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={classes}
    >
      {body}
    </a>
  ) : (
    <Link href={href} aria-label={label} className={classes}>
      {body}
    </Link>
  );
};

export default GoogleRating;
