"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { PointerEvent, PropsWithChildren } from "react";
import { usePointerEffects } from "@/hooks/usePointer";

const PULL = 6;
const SPRING = { stiffness: 300, damping: 20 };

/**
 * Pulls the wrapped control a few pixels toward the pointer and springs back.
 * Six pixels is the ceiling on purpose: enough that the hand notices the page
 * answered, not enough to move the hit target out from under the click.
 *
 * Used only on the one action each page wants, never on a row of links.
 */
const Magnetic = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  const enabled = usePointerEffects();
  const x = useSpring(useMotionValue(0), SPRING);
  const y = useSpring(useMotionValue(0), SPRING);

  if (!enabled) return <span className={className}>{children}</span>;

  const onPointerMove = (event: PointerEvent<HTMLSpanElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    x.set(((event.clientX - box.left) / box.width - 0.5) * 2 * PULL);
    y.set(((event.clientY - box.top) / box.height - 0.5) * 2 * PULL);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      className={className}
      style={{ x, y, display: "inline-flex" }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.span>
  );
};

export default Magnetic;
