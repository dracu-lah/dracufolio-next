"use client";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import type { PointerEvent, PropsWithChildren } from "react";
import { usePointerEffects } from "@/hooks/usePointer";

const MAX_DEGREES = 14;
const SPRING = { stiffness: 260, damping: 18, mass: 0.4 };

/**
 * Tilts an icon toward the pointer inside a perspective box, and with `chip`
 * sets it on a glossy tile whose specular highlight tracks the tilt. The
 * highlight moving against the rotation is what sells it as a solid object
 * rather than a picture of one.
 *
 * `float` adds a slow idle drift and is reserved for the one floating button.
 * A grid of twelve drifting icons would be noise, not depth.
 *
 * With no pointer, or under reduced motion, this renders the chip and the
 * glyph with no movement at all: the gloss is static, which still looks like
 * an object.
 */
const Icon3D = ({
  children,
  className,
  float = false,
  chip = false,
  chipClassName = "size-14",
}: PropsWithChildren<{
  className?: string;
  float?: boolean;
  chip?: boolean;
  chipClassName?: string;
}>) => {
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

  // The sheen slides the opposite way to the rotation, the way a reflection does.
  const sheenX = useSpring(
    useTransform(pointerX, [-0.5, 0.5], ["-18%", "18%"]),
    SPRING,
  );
  const sheenY = useSpring(
    useTransform(pointerY, [-0.5, 0.5], ["-18%", "18%"]),
    SPRING,
  );
  const sheenTransform = useMotionTemplate`translate(${sheenX}, ${sheenY})`;

  const body = chip ? (
    <span className={`icon-chip squircle ${chipClassName}`}>
      {enabled ? (
        <motion.span
          className="icon-chip-sheen"
          style={{ transform: sheenTransform }}
          aria-hidden
        />
      ) : (
        <span
          className="icon-chip-sheen"
          style={{ transform: "translate(-8%, -12%)" }}
          aria-hidden
        />
      )}
      <span className="relative">{children}</span>
    </span>
  ) : (
    children
  );

  if (!enabled) {
    return <span className={className}>{body}</span>;
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
        {body}
      </motion.span>
    </span>
  );
};

export default Icon3D;
