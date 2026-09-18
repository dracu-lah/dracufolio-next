"use client";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import type { PointerEvent, PropsWithChildren } from "react";
import { usePointerEffects } from "@/hooks/usePointer";

const MAX_DEGREES = 12;
const SPRING = { stiffness: 260, damping: 18, mass: 0.4 };

/**
 * Tilts an icon toward the pointer inside a perspective box. The duotone glyph
 * has two stacked layers, so a small rotation is enough to read as depth.
 *
 * `float` adds a slow idle drift and is reserved for the one floating button;
 * a grid of twelve drifting icons would be noise, not depth.
 */
const Icon3D = ({
  children,
  className,
  float = false,
}: PropsWithChildren<{ className?: string; float?: boolean }>) => {
  const enabled = usePointerEffects();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(
    useTransform(pointerY, [-0.5, 0.5], [MAX_DEGREES, -MAX_DEGREES]),
    SPRING,
  );
  const rotateY = useSpring(
    useTransform(pointerX, [-0.5, 0.5], [-MAX_DEGREES, MAX_DEGREES]),
    SPRING,
  );

  if (!enabled) {
    return <span className={className}>{children}</span>;
  }

  const onPointerMove = (event: PointerEvent<HTMLSpanElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - box.left) / box.width - 0.5);
    pointerY.set((event.clientY - box.top) / box.height - 0.5);
  };

  const reset = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <span
      className={className}
      style={{ perspective: 420, display: "inline-flex" }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
    >
      <motion.span
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="inline-flex"
        {...(float
          ? {
              animate: { y: [0, -3, 0] },
              transition: {
                duration: 3.2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }
          : {})}
      >
        {children}
      </motion.span>
    </span>
  );
};

export default Icon3D;
