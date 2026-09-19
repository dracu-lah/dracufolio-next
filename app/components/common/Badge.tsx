import type { ComponentType } from "react";
import type { IconProps } from "@/components/common/icons";

/**
 * The site's one badge. Before this, a tech stack was bare text with a gap
 * between the words, which reads as a sentence that lost its commas rather
 * than as a set of labels.
 *
 * A badge is a small object: a border, a tint, a fixed height, mono type, and
 * the same 999px corner everywhere so it never competes with the squircle
 * cards around it. Three tones, and the tone carries the meaning:
 *
 *   neutral  a fact about the thing (a stack, a year, a tag)
 *   accent   something live or something you can act on
 *   ghost    a fact that should stay quiet next to a busier neighbour
 *
 * `dot` exists for real state only (available for work, open source, live),
 * never as decoration.
 */
const TONES = {
  neutral: "border-border bg-secondary/60 text-muted-foreground",
  accent: "border-accent-edge bg-accent-tint text-accent",
  ghost: "border-transparent bg-transparent text-muted-foreground",
} as const;

const SIZES = {
  sm: "h-7 gap-1.5 px-3 text-sm",
  md: "h-8 gap-2 px-3.5 text-base",
} as const;

const Badge = ({
  children,
  tone = "neutral",
  size = "sm",
  icon: Icon,
  dot = false,
  className = "",
}: {
  children: React.ReactNode;
  tone?: keyof typeof TONES;
  size?: keyof typeof SIZES;
  icon?: ComponentType<IconProps>;
  dot?: boolean;
  className?: string;
}) => (
  <span
    className={`inline-flex items-center rounded-full border font-medium leading-none whitespace-nowrap ${TONES[tone]} ${SIZES[size]} ${className}`}
  >
    {dot && (
      <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-current" />
    )}
    {Icon && <Icon className="size-3.5 shrink-0" />}
    {children}
  </span>
);

export default Badge;
