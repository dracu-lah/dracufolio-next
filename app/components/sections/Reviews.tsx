import type { CSSProperties } from "react";
import Reveal from "@/components/common/Reveal";
import ReviewerAvatar from "@/components/common/ReviewerAvatar";
import GoogleRating from "@/components/common/GoogleRating";
import { ArrowRight, StarIcon } from "@/components/common/icons";
import { Squircle } from "@/components/ui/squircle";
import {
  type GoogleReview,
  featuredReviews,
  googleRating,
  hasReviews,
  reviewerStanding,
} from "@/data/reviews";
import { GOOGLE_MAPS_URL } from "@/data/contact";

/**
 * A group has at least this many cards, so one group is wider than the widest
 * screen and the loop never shows a gap at the end of a short row.
 */
const MIN_CARDS = 8;
/** Seconds per card, which keeps the speed the same however long a row is. */
const SECONDS_PER_CARD = 8;
/** Below this many reviews one row is enough; two would repeat every card. */
const TWO_ROWS_FROM = 6;

const ReviewCard = ({ review }: { review: GoogleReview }) => (
  <Squircle
    as="figure"
    borderWidth={1}
    fillClassName="bg-card"
    className="flex h-full w-[18rem] shrink-0 flex-col gap-4 bg-border p-5 md:w-[22rem] md:p-6"
  >
    <span
      className="flex items-center gap-0.5 text-foreground"
      role="img"
      aria-label={`${review.rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon
          key={i}
          className={`size-5 ${i < review.rating ? "" : "text-border"}`}
        />
      ))}
    </span>
    <blockquote className="text-base leading-relaxed whitespace-pre-line text-foreground">
      {review.text}
    </blockquote>
    <figcaption className="mt-auto flex items-center gap-3 pt-2">
      <ReviewerAvatar name={review.author} src={review.avatar} />
      <span className="flex flex-col">
        <span className="text-base font-medium text-foreground">
          {review.author}
        </span>
        <span className="text-base text-muted-foreground">
          {reviewerStanding(review)}
        </span>
      </span>
    </figcaption>
  </Squircle>
);

/**
 * One looping row. The visible group repeats its reviews until it holds
 * MIN_CARDS, and the track carries that group twice so the slide by -50%
 * lands exactly where it started.
 *
 * Only the first appearance of each review is exposed. Repeats inside the
 * group and the whole second copy are aria-hidden and inert: a screen reader
 * hears each review once and focus never lands on a duplicate. Under reduced
 * motion the copy is not drawn at all (see .marquee-copy in globals.css).
 */
const MarqueeRow = ({
  reviews,
  direction,
}: {
  reviews: GoogleReview[];
  direction: "left" | "right";
}) => {
  const repeats = Math.max(1, Math.ceil(MIN_CARDS / reviews.length));
  const group = Array.from({ length: repeats }, () => reviews).flat();
  const style = {
    "--marquee-duration": `${group.length * SECONDS_PER_CARD}s`,
  } as CSSProperties;

  const cards = (copy: boolean) =>
    group.map((review, i) => {
      const repeat = copy || i >= reviews.length;
      return (
        <li
          key={`${review.id}-${i}`}
          className="flex"
          {...(repeat ? { "aria-hidden": true, inert: true } : {})}
        >
          <ReviewCard review={review} />
        </li>
      );
    });

  return (
    <div className="marquee overflow-hidden">
      <div
        className="marquee-track flex w-max items-stretch"
        data-direction={direction}
        style={style}
      >
        {/* The trailing padding matches the gap, so both groups are the same
            width and the -50% slide has no seam. */}
        <ul className="flex items-stretch gap-4 pr-4 md:gap-5 md:pr-5">
          {cards(false)}
        </ul>
        <ul
          aria-hidden
          className="marquee-copy flex items-stretch gap-4 pr-4 md:gap-5 md:pr-5"
        >
          {cards(true)}
        </ul>
      </div>
    </div>
  );
};

/**
 * Google reviews as proof, placed where a visitor is deciding: after the work
 * on the home page and under the hero on the hire pages.
 *
 * Two rows that loop in opposite directions, at Nevil's request, so every
 * review passes through view in the height of two cards. The reviews are
 * dealt alternately between the rows in their credibility order, so the
 * strongest two lead the two rows. A row stops while a pointer is over it or
 * a card has focus, and under reduced motion it is a static strip you scroll.
 *
 * Every review here has a consent date in review-consent.json; see
 * app/data/reviews.ts.
 */
const Reviews = ({
  heading = "What people say",
  limit,
}: {
  heading?: string;
  /** Leave unset to show every review that has text. */
  limit?: number;
}) => {
  if (!hasReviews) return null;
  const reviews = limit ? featuredReviews.slice(0, limit) : featuredReviews;
  const rows =
    reviews.length >= TWO_ROWS_FROM
      ? [
          reviews.filter((_, i) => i % 2 === 0),
          reviews.filter((_, i) => i % 2 === 1),
        ]
      : [reviews];

  return (
    <section
      id="reviews"
      className="flex flex-col gap-5 py-8 md:gap-7 md:py-12"
    >
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-14">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
            <div className="flex flex-col gap-2">
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                {heading}
              </h2>
              <GoogleRating href={googleRating.url} />
            </div>
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-base text-muted-foreground transition-colors duration-200 hover:text-accent"
            >
              Read all on Google
              <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </div>
        </Reveal>
      </div>

      {/* Full bleed on purpose: a loop reads as endless only when it runs
          past both edges of the screen. */}
      <div className="flex flex-col gap-4 md:gap-5">
        {rows.map((row, i) => (
          <MarqueeRow
            key={i}
            reviews={row}
            direction={i % 2 === 0 ? "left" : "right"}
          />
        ))}
      </div>
    </section>
  );
};

export default Reviews;
