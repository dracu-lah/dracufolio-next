/**
 * Short notes, imported from a LinkedIn data export with
 * `node scripts/import-linkedin.mjs`. Empty until that runs, and the /notes
 * route stays out of the sitemap and the navigation while it is empty, the
 * same way the testimonials section does.
 *
 * These deliberately live on one page rather than becoming one blog post each.
 * A LinkedIn post is usually a few sentences, and a site full of two-hundred
 * word pages is thin content: it competes with the real posts and drags the
 * whole domain down. One page of dated notes is original content by the author
 * and reads as what it is.
 */

export type Note = {
  /** ISO date the note was first posted. */
  date: string;
  /** The text, as written, with the trailing hashtag block stripped. */
  body: string;
  /** The original LinkedIn post, so the canonical source is always credited. */
  source?: string;
  /** A link the note was about, if it shared one. */
  link?: string;
  tags: string[];
};

export const notes: Note[] = [];

export const hasNotes = notes.length > 0;

export const notesByNewest = [...notes].sort((a, b) =>
  b.date.localeCompare(a.date),
);
