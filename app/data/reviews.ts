import data from "./google-reviews.json";
import consentFile from "./review-consent.json";

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
  /** Google's Local Guide badge: the reviewer has a history of reviewing places. */
  localGuide?: boolean;
  /** How many reviews the reviewer has written on Google in total. */
  reviewerReviews?: number;
};

export const googleRating = {
  rating: data.rating,
  count: data.count,
  checked: data.checked,
  url: data.profileUrl,
};

export const googleReviews: GoogleReview[] = data.reviews;

type ReviewSettings = { consent?: string; priority?: number };

/**
 * Consent and order live in review-consent.json, not here and not in the
 * imported file, so a re-import can never switch a review on by accident.
 * A review is shown only with a consent date: the day the reviewer agreed to
 * their name, photo and words on this site. Without one it still counts in
 * the Google rating, which is public and names nobody.
 */
const settings: Record<string, ReviewSettings> = consentFile.reviews;

const consented = (review: GoogleReview) => Boolean(settings[review.id]?.consent);
const priorityOf = (review: GoogleReview) =>
  settings[review.id]?.priority ?? Number.POSITIVE_INFINITY;

/**
 * How much a review should persuade a client, as a score. The order on the
 * page follows it, highest first, unless a `priority` in review-consent.json
 * pins a review (1 shows first).
 *
 * Who is vouching:
 * - A business, named as one (+4). A company putting its name to a review is
 *   the strongest signal a freelancer can show.
 * - A Google Local Guide (+1.5), whose reviews Google itself weighs more.
 * - The reviewer's history on Google (up to +1 at ten or more reviews).
 *
 * What they say, one point for each kind of thing a client wants to know:
 * delivery, a recommendation, how the work was run, a real project or
 * business behind it, and skill. Detail adds up to +2. A review of a few words
 * loses 4, whoever wrote it, so "Awesome work" never leads.
 *
 * Kept as plain rules rather than a hand-made list so a new review lands in
 * the right place on import, and so the order can be explained.
 */
const BUSINESS =
  /\b(computers?|solutions?|technolog(y|ies)|tech|systems|studios?|labs?|ltd|llp|llc|pvt|inc|enterprises?|agency|services|stores?|traders|academy|institute|digital|media|consultancy|group)\b/i;

const SIGNALS = [
  /\b(deliver(ed|s)?|deadline|on time|launched|shipped|built|set(ting)? up|setup|fix(ed)?)\b/i,
  /\b(recommend(ed)?|reliable|trust(ed|worthy)?)\b/i,
  /\b(professional|quality|attention to detail|dedicated|explained|clear(ly)?|smooth(ly)?|helpful)\b/i,
  /\b(project|business|client|our|we|us|channel|website|app|apps|applications?|store|team)\b/i,
  /\b(expert(ise)?|skilled|brilliant|technical|talented)\b/i,
];

const SHORT = 40;

export const isBusiness = (review: GoogleReview) => BUSINESS.test(review.author);

export const reviewScore = (review: GoogleReview) => {
  const text = review.text.trim();
  const who =
    (isBusiness(review) ? 4 : 0) +
    (review.localGuide ? 1.5 : 0) +
    Math.min(review.reviewerReviews ?? 0, 10) / 10;
  const said =
    SIGNALS.filter((signal) => signal.test(text)).length +
    Math.min(text.length, 240) / 120 -
    (text.length < SHORT ? 4 : 0);
  return who + said;
};

export const featuredReviews = googleReviews
  .filter((review) => consented(review) && review.text.trim().length > 0)
  .sort((a, b) => {
    // Compared rather than subtracted: Infinity minus Infinity is NaN.
    if (priorityOf(a) !== priorityOf(b)) return priorityOf(a) < priorityOf(b) ? -1 : 1;
    return reviewScore(b) - reviewScore(a);
  });

/** "Local Guide, 9 reviews" or "6 reviews on Google", for under the name. */
export const reviewerStanding = (review: GoogleReview) => {
  const count = review.reviewerReviews;
  const reviews = count ? `${count} review${count === 1 ? "" : "s"}` : "";
  if (review.localGuide) return reviews ? `Local Guide, ${reviews}` : "Local Guide";
  return reviews ? `${reviews} on Google` : "Google review";
};

export const hasReviews = googleRating.count > 0 && featuredReviews.length > 0;
