"use client";
import { motion, useScroll, useReducedMotion } from "framer-motion";

/**
 * A one pixel reading position line. Earns its place on the long pages (hire,
 * blog) where "how much is left" is a real question. Driven by useScroll, so
 * scrolling never re-renders React.
 */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 z-60 h-px w-full origin-left bg-foreground"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

export default ScrollProgress;
