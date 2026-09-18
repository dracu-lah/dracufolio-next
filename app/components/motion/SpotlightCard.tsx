"use client";
import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";
import { useSpotlight } from "@/hooks/useSpotlight";
import { SQUIRCLE, useSquircle } from "@/components/ui/squircle";
import { cn } from "@/lib/utils";

/**
 * A bordered card whose hairline lights up under the pointer, so the card you
 * are about to click is the one that looks live. No fill change.
 *
 * `border` draws the card in border mode: the element carries the
 * edge colour and `fillClassName` is the surface inside it, because a
 * clip-path cuts a normal CSS border off at the corner.
 */
const SpotlightCard = ({
  children,
  className,
  radius,
  border = false,
  cornerRadius = SQUIRCLE.card,
  fillClassName = "bg-card",
}: PropsWithChildren<{
  className?: string;
  radius?: number;
  border?: boolean;
  cornerRadius?: number;
  fillClassName?: string;
}>) => {
  const spotlight = useSpotlight(radius);
  const {
    attach: clipRef,
    style: clipStyle,
    fill: clipFill,
  } = useSquircle<HTMLDivElement>({
    cornerRadius,
    borderWidth: border ? 1 : 0,
    fillClassName,
  });

  return (
    <div
      ref={clipRef}
      style={clipStyle}
      className={cn("relative isolate", className)}
      {...(spotlight?.handlers ?? {})}
    >
      {clipFill}
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
