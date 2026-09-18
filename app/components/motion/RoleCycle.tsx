"use client";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const TYPE_MS = 55;
const DELETE_MS = 28;
const HOLD_MS = 1900;
const GAP_MS = 320;

export type Role = { text: string; lang?: "ml" };

/**
 * Types the role after the name, holds it, deletes it, moves on. This is the
 * one perpetual animation on the site, and it is here because the roles are
 * the thing a visitor came to find out: it says full stack, React, Next.js and
 * Android in the first few seconds without a paragraph.
 *
 * The complete list stays in the DOM in a visually hidden span, so a crawler
 * and a screen reader get the whole sentence while the animated copy is
 * hidden from the accessibility tree. Under reduced motion only the static
 * line renders and nothing moves.
 *
 * The visible substring is a discrete value on a timer, which is exactly what
 * useState is for. Pointer and scroll values elsewhere use motion values.
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
  // Starts fully typed rather than empty. The first paint has to read as a
  // finished sentence: a role line that types itself in from nothing shows an
  // almost blank line for the first second, which is the second that matters.
  const [length, setLength] = useState(roles[0].text.length);
  const [deleting, setDeleting] = useState(false);

  const staticLine = roles.map((role) => role.text).join(", ");
  const current = roles[index] ?? roles[0];

  useEffect(() => {
    if (reduceMotion) return;

    if (!deleting && length === current.text.length) {
      const hold = setTimeout(() => setDeleting(true), HOLD_MS);
      return () => clearTimeout(hold);
    }

    if (deleting && length === 0) {
      const gap = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % roles.length);
      }, GAP_MS);
      return () => clearTimeout(gap);
    }

    const step = setTimeout(
      () => setLength((n) => n + (deleting ? -1 : 1)),
      deleting ? DELETE_MS : TYPE_MS,
    );
    return () => clearTimeout(step);
  }, [length, deleting, index, current.text.length, roles.length, reduceMotion]);

  if (reduceMotion) {
    return (
      <span className={className}>
        {roles[0].text}
      </span>
    );
  }

  return (
    <span className={className}>
      <span className="sr-only">{staticLine}</span>
      <span aria-hidden {...(current.lang ? { lang: current.lang } : {})}>
        {current.text.slice(0, length)}
      </span>
      <span
        aria-hidden
        className="ml-0.5 inline-block w-[0.5em] translate-y-[0.06em] animate-pulse bg-phosphor align-baseline"
        style={{ height: "0.9em" }}
      />
    </span>
  );
};

export default RoleCycle;
