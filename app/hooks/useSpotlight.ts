"use client";
import {
  useMotionTemplate,
  useMotionValue,
  useSpring,
  type MotionStyle,
} from "framer-motion";
import type { PointerEvent } from "react";
import { usePointerEffects } from "./usePointer";

/**
 * Props to spread onto a bordered card so its hairline brightens under the
 * pointer. The card you are about to click is the one that looks lit, which is
 * the only reason this effect exists.
 *
 * Returns null when the device has no fine pointer, so the overlay element is
 * never rendered on touch.
 */
export const useSpotlight = (radius = 180) => {
  const enabled = usePointerEffects();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useSpring(0, { stiffness: 220, damping: 30 });
  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${x}px ${y}px, var(--foreground), transparent 70%)`;

  const handlers = {
    onPointerMove: (event: PointerEvent<HTMLElement>) => {
      const box = event.currentTarget.getBoundingClientRect();
      x.set(event.clientX - box.left);
      y.set(event.clientY - box.top);
      opacity.set(1);
    },
    onPointerLeave: () => opacity.set(0),
  };

  if (!enabled) return null;
  return { handlers, style: { background, opacity } as MotionStyle };
};
