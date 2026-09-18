/**
 * Real last-modified dates, edited by hand when a page's content changes.
 * The sitemap used to stamp every URL with the build time, which told crawlers
 * that all 70 pages changed on every deploy and taught them to ignore the
 * field. One honest date per page is worth more than seventy fresh ones.
 */

export const CONTENT_DATES = {
  home: "2026-09-18",
  hire: "2026-09-18",
  locations: "2026-09-18",
  projects: "2026-09-18",
  about: "2026-09-18",
  openSource: "2026-09-18",
  blog: "2026-09-18",
} as const;

export const asDate = (iso: string) => new Date(`${iso}T00:00:00Z`);
