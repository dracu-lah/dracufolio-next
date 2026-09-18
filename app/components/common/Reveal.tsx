import type { CSSProperties, PropsWithChildren } from "react";

type RevealProps = PropsWithChildren<{
  delay?: number;
  className?: string;
  /** Kept so existing call sites compile. The distance is set in CSS now. */
  y?: number;
}>;

/**
 * The site's entrance animation, in CSS.
 *
 * It used to be framer-motion with `whileInView`, which writes `opacity: 0`
 * into the server rendered HTML and waits for hydration to take it off. That
 * is a section of a page that stays invisible until JavaScript arrives, and on
 * a slow phone, or a page carrying eighteen screenshots, that was long enough
 * to look broken. The `.reveal` class in globals.css does the same job with a
 * keyframe: scroll-linked where the browser has a view timeline, a plain fade
 * in on load where it does not, nothing under reduced motion, and never
 * dependent on a script.
 *
 * It is a server component now, so none of this ships to the browser.
 */
export const Reveal = ({ children, delay = 0, className }: RevealProps) => (
  <div
    className={`reveal ${className ?? ""}`}
    style={{ "--rise-delay": `${Math.round(delay * 1000)}ms` } as CSSProperties}
  >
    {children}
  </div>
);

export default Reveal;
