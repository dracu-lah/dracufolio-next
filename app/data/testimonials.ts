/**
 * Real quotes only. The section and the Review schema stay off the page while
 * this list is empty, which is the point: an empty testimonials block is
 * better than an invented one.
 *
 * Shape of an entry:
 *   {
 *     name: "Full name",
 *     role: "Their job title",
 *     company: "Where they work",
 *     quote: "Their words, unedited apart from typos.",
 *     link: "https://linkedin.com/in/them",  // optional, proves they exist
 *     date: "2026-10-01",                    // when they said it
 *   }
 */

export type Testimonial = {
  name: string;
  role: string;
  company: string;
  quote: string;
  link?: string;
  date: string;
};

export const testimonials: Testimonial[] = [];

export const hasTestimonials = testimonials.length > 0;
