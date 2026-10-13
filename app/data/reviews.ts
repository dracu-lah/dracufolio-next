import data from "./google-reviews.json";

/**
 * Reviews from the Google Business Profile. `google-reviews.json` is written
 * by `pnpm reviews:import`, which reads the profile in a browser you are
 * signed in to, so the site itself never calls Google and never slows down
 * waiting on it. Nothing in that file is typed by hand except a correction.
 *
 * They are shown, never marked up. Google ignores Review and AggregateRating
 * markup that a business puts on its own site about itself (the self-serving
 * rule, since 2019), so the stars would never appear in search, and a review
 * schema built from someone else's platform is the pattern its review
 * guidelines warn about. The value here is the visitor who reads them before
 * tapping WhatsApp.
 */

export type GoogleReview = {
  id: string;
  author: string;
  rating: number;
  /** Empty for a star rating left without words. */
  text: string;
  /** First seen. Maps only shows "2 weeks ago", so this is when the import met it. */
  date: string;
  /** Google profile photo, without the size suffix. The card adds `=s96-c`. */
  avatar?: string;
};

export const googleRating = {
  rating: data.rating,
  count: data.count,
  checked: data.checked,
  url: data.profileUrl,
};

export const googleReviews: GoogleReview[] = data.reviews;

/**
 * Reviews that say what working with me is like, in the order a client would
 * want to read them. Anything not listed falls in after these, longest first,
 * so a new review shows up without an edit here.
 */
const FEATURED_AUTHORS = ["Aby Varghese", "Deepak Dev", "Muhammed Navas"];

export const featuredReviews = googleReviews
  .filter((review) => review.text.trim().length > 0)
  .sort((a, b) => {
    const ai = FEATURED_AUTHORS.indexOf(a.author);
    const bi = FEATURED_AUTHORS.indexOf(b.author);
    if (ai !== -1 || bi !== -1)
      return (ai === -1 ? Infinity : ai) - (bi === -1 ? Infinity : bi);
    return b.text.length - a.text.length;
  });

export const hasReviews = googleRating.count > 0 && featuredReviews.length > 0;
