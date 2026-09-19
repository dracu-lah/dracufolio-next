"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * True while something matching `selector` is on screen.
 *
 * Two CTAs are permanent: the solid WhatsApp button in the header from `md`
 * up, and the docked bar below it. A page that carries its own WhatsApp
 * button (the hire hero, the closing block on every inner page) therefore has
 * two of the same action in view the moment that button scrolls in, which is
 * the one thing the docked bar was written to prevent. Both permanent CTAs
 * ask this hook and defer: the bar slides away, the header button drops its
 * accent fill and keeps its place.
 *
 * `rootMargin` is per caller because the targets are different shapes. A
 * button should count the moment any of it is visible. The contact form is
 * a tall section, and counting its top pixel would hide the bar while the
 * form was still most of a screen away.
 */
export const usePageCtaOnScreen = (
  selector = "[data-whatsapp-cta]",
  rootMargin = "0px",
) => {
  const pathname = usePathname();
  const [onScreen, setOnScreen] = useState(false);

  /*
   * A route change clears the answer during render rather than in the effect
   * below: the new page may have no target at all, and setting state inside
   * the effect would queue a second render pass, so the header button would
   * paint accent filled for one frame over a page it should be deferring to.
   */
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOnScreen(false);
  }

  /* Keyed on the path because both callers outlive the page under them: the
     effect has to find the new page's targets after a route change. */
  useEffect(() => {
    const targets = document.querySelectorAll(selector);
    if (targets.length === 0) return;

    /*
     * One observer over several targets reports only the ones that changed,
     * so the answer is a set built up across callbacks rather than whatever
     * the last entry happened to say.
     */
    const visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        setOnScreen(visible.size > 0);
      },
      { rootMargin },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [pathname, selector, rootMargin]);

  return onScreen;
};
