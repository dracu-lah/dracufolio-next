"use client";
import { motion, useReducedMotion } from "framer-motion";

/**
 * A hairline that draws itself once, when it scrolls into view.
 *
 * Reason it exists: the four steps are a sequence, and a line that arrives
 * left to right says "in this order" without a single "Step 1" label. It runs
 * once, never loops, and under reduced motion it is simply there.
 */
const DrawLine = ({
  className = "",
  vertical = false,
}: {
  className?: string;
  vertical?: boolean;
}) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      aria-hidden
      className={className}
      style={{ transformOrigin: vertical ? "top" : "left" }}
      initial={reduceMotion ? false : { scaleX: vertical ? 1 : 0, scaleY: vertical ? 0 : 1 }}
      whileInView={{ scaleX: 1, scaleY: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    />
  );
};

export default DrawLine;
