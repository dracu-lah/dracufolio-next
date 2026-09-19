"use client";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { usePointerEffects } from "@/hooks/usePointer";

const SIZE = 600;
const SPRING = { stiffness: 90, damping: 20, mass: 0.7 };

/**
 * A soft light that follows the pointer while the hero is on screen. The page
 * answers the hand the way a terminal answers a keystroke, which is the whole
 * point; it is a light rather than a surface, so the flat-surface rule still
 * holds, but it is the only radial gradient in the stylesheet.
 *
 * The spring lag is deliberate. A light that tracks the pointer exactly reads
 * as a cursor; one that trails slightly reads as a light in a room.
 */
const Spotlight = () => {
  const enabled = usePointerEffects();
  const sentinel = useRef<HTMLSpanElement>(null);
  const heroOnScreen = useInView(sentinel);

  const x = useSpring(useMotionValue(-SIZE), SPRING);
  const y = useSpring(useMotionValue(-SIZE), SPRING);
  const background = useMotionTemplate`radial-gradient(${SIZE}px circle at ${x}px ${y}px, color-mix(in oklch, var(--foreground) 7%, transparent), transparent 70%)`;

  useEffect(() => {
    if (!enabled) return;
    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, x, y]);

  return (
    <>
      {/* Anchors the effect to the hero without wrapping the hero's layout. */}
      <span ref={sentinel} aria-hidden className="pointer-events-none block" />
      {enabled && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10"
          style={{ background }}
          animate={{ opacity: heroOnScreen ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
      )}
    </>
  );
};

export default Spotlight;
