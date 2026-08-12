"use client";
import { useEffect, useState } from "react";

/**
 * Tracks which section is currently in view and returns its href
 * (e.g. "/#skills"), or "/" while the hero is on screen.
 * Returns null on pages that have none of the given sections.
 */
const useActiveSection = (ids: string[]) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        }

        if (visible.size === 0) return;

        // Prefer the section covering the most of the viewport, ties go to
        // the one that appears first in the document.
        const best = ids
          .filter((id) => visible.has(id))
          .reduce((a, b) => (visible.get(b)! > visible.get(a)! ? b : a));

        setActiveId(best);
      },
      {
        rootMargin: "-20% 0px -35% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
};

export default useActiveSection;
