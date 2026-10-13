import Reveal from "@/components/common/Reveal";
import ReviewerAvatar from "@/components/common/ReviewerAvatar";
import GoogleRating from "@/components/common/GoogleRating";
import { ArrowRight, StarIcon } from "@/components/common/icons";
import { Squircle } from "@/components/ui/squircle";
import {
  featuredReviews,
  googleRating,
  hasReviews,
  reviewerStanding,
} from "@/data/reviews";
import { GOOGLE_MAPS_URL } from "@/data/contact";

/**
 * Google reviews as proof, placed where a visitor is deciding: after the work
 * on the home page and under the hero on the hire pages.
 *
 * A static grid, not the scrolling marquee most review blocks use. A marquee
 * is a second perpetual animation (CLAUDE.md allows one), and a quote that
 * moves cannot be read. Every review with words is shown, stacked on a phone:
 * it was a sideways swipe row at first, and people saw one card and assumed
 * that was all of them.
 *
 * Every card links to the profile, because a review someone can check is the
 * only kind worth showing.
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

  return (
    <section
      id="reviews"
      className="mx-auto max-w-7xl px-6 py-8 md:px-10 md:py-12 lg:px-14"
    >
      <div className="flex flex-col gap-5 md:gap-7">
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

        <ul className="grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <li key={review.id}>
              <Reveal delay={Math.min(index, 3) * 0.06} className="h-full">
                <Squircle
                  as="figure"
                  borderWidth={1}
                  fillClassName="bg-card"
                  className="flex h-full flex-col gap-4 bg-border p-5 md:p-6"
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
                  <blockquote className="text-base leading-relaxed whitespace-pre-line text-foreground md:text-lg">
                    {review.text}
                  </blockquote>
                  <figcaption className="mt-auto flex items-center gap-3 pt-2">
                    <ReviewerAvatar
                      name={review.author}
                      src={review.avatar}
                    />
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
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Reviews;
