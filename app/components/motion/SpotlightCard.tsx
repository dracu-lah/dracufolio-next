"use client";
import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";
import { useSpotlight } from "@/hooks/useSpotlight";
import { cn } from "@/lib/utils";

/**
 * A bordered card whose hairline lights up under the pointer, so the card you
 * are about to click is the one that looks live. Monochrome, no fill change.
 */
const SpotlightCard = ({
  children,
  className,
  radius,
}: PropsWithChildren<{ className?: string; radius?: number }>) => {
  const spotlight = useSpotlight(radius);

  return (
    <div
      className={cn("relative", className)}
      {...(spotlight?.handlers ?? {})}
    >
      {children}
      {spotlight && (
        <motion.span
          aria-hidden
          className="border-spotlight"
          style={spotlight.style}
        />
      )}
    </div>
  );
};

export default SpotlightCard;
