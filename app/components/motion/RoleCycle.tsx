"use client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const HOLD_MS = 2400;

export type Role = { text: string; lang?: "ml" };

/**
 * Swaps the role after the name every couple of seconds. This is the one
 * perpetual animation on the site, and it is here because the roles are the
 * thing a visitor came to find out: it says full stack, React, Next.js and
 * Android in the first few seconds without spending a paragraph on it.
 *
 * It used to type the role out character by character, which meant the most
 * important line on the page spent most of its life as a fragment: a
 * screenshot taken at the wrong moment read "An". A whole word that swaps
 * cannot be caught half written.
 *
 * Every role is also rendered invisibly in the same grid cell as a sizer, so
 * the box is as wide as the widest role and as tall as the tallest, including
 * the Malayalam one, and a swap never reflows the paragraph and the buttons
 * below it.
 *
 * The complete list stays in the DOM in a visually hidden span, so a crawler
 * and a screen reader get the whole sentence while the animated copy is hidden
 * from the accessibility tree. Under reduced motion only the first role
 * renders and nothing moves.
 */
const RoleCycle = ({
  roles,
  className,
}: {
  roles: Role[];
  className?: string;
}) => {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  const staticLine = roles.map((role) => role.text).join(", ");
  const current = roles[index] ?? roles[0];

  useEffect(() => {
    if (reduceMotion) return;
    const timer = setTimeout(
      () => setIndex((i) => (i + 1) % roles.length),
      HOLD_MS,
    );
    return () => clearTimeout(timer);
  }, [index, roles.length, reduceMotion]);

  const sizers = roles.map((role) => (
    <span
      key={role.text}
      aria-hidden
      className="invisible col-start-1 row-start-1 whitespace-nowrap"
      {...(role.lang ? { lang: role.lang } : {})}
    >
      {role.text}
    </span>
  ));

  if (reduceMotion) {
    return (
      <span className={`inline-grid align-top ${className ?? ""}`}>
        {sizers}
        <span className="col-start-1 row-start-1 whitespace-nowrap">
          {roles[0].text}
        </span>
      </span>
    );
  }

  return (
    <span className={`inline-grid align-top ${className ?? ""}`}>
      <span className="sr-only">{staticLine}</span>
      {sizers}
      <span className="col-start-1 row-start-1 flex items-center overflow-hidden whitespace-nowrap">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={current.text}
            aria-hidden
            initial={{ y: "0.6em", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-0.6em", opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            {...(current.lang ? { lang: current.lang } : {})}
          >
            {current.text}
          </motion.span>
        </AnimatePresence>
        <span
          aria-hidden
          className="ml-1 inline-block w-[0.5em] shrink-0 animate-pulse bg-accent"
          style={{ height: "0.9em" }}
        />
      </span>
    </span>
  );
};

export default RoleCycle;
