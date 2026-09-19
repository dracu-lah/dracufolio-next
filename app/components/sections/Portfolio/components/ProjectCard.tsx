"use client";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { type Project } from "@/types/portfolio";
import { useSpotlight } from "@/hooks/useSpotlight";
import { SQUIRCLE, useSquircle } from "@/components/ui/squircle";
import Badge from "@/components/common/Badge";
import { ArrowRight } from "@/components/common/icons";

/**
 * The card shows the whole screenshot. A parallax pass used to scale the image
 * up so it could shift inside the frame without showing its edge, which meant
 * the frame was cropping about a tenth off every side. The screenshot is the
 * evidence on this card, so it is not worth a depth effect.
 */
const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  /*
   * A budget in characters, not a fixed count. The footer has room for roughly
   * 26 characters of badge text before the "+N" counter stops fitting beside
   * the arrow, so names are taken while they fit and everything left over is
   * counted. At least one always shows, however long its name is.
   */
  const BUDGET = 26;
  const visible: string[] = [];
  let used = 0;
  for (const skill of project.skills) {
    if (visible.length && used + skill.length > BUDGET) break;
    visible.push(skill);
    used += skill.length;
  }
  const hidden = project.skills.length - visible.length;

  const spotlight = useSpotlight(240);
  // Border mode: a clip-path cuts a CSS border off at the corner, so the card
  // paints the hairline as its own background and the fill layer is the card.
  const {
    attach: clipRef,
    style: clipStyle,
    fill: clipFill,
  } = useSquircle<HTMLElement>({
    cornerRadius: SQUIRCLE.card,
    borderWidth: 1,
    fillClassName: "bg-card",
  });

  return (
    /*
     * The entrance is the `rise-in` keyframe in globals.css, not a framer
     * initial state: a card that needs JavaScript before it is visible is a
     * card that can stay invisible. See the note beside the keyframe.
     */
    <article
      {...(spotlight?.handlers ?? {})}
      ref={clipRef}
      style={
        {
          "--rise-delay": `${Math.min(index, 5) * 60}ms`,
          ...clipStyle,
        } as CSSProperties
      }
      className="rise-in group relative isolate flex h-full flex-col bg-border transition-colors duration-300 hover:bg-accent-edge"
    >
      {clipFill}
      {spotlight && (
        <motion.span
          aria-hidden
          className="border-spotlight z-20"
          style={spotlight.style}
        />
      )}
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`Open ${project.title} details`}
        className="absolute inset-0 z-10"
      />

      <div className="relative aspect-video overflow-hidden">
        <Image
          draggable="false"
          fill
          sizes="(min-width: 1024px) 24rem, 82vw"
          src={project.images[0]}
          className="h-full w-full object-cover"
          alt={`Screenshot of ${project.title}`}
        />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col gap-2 border-t border-border p-5 md:p-6">
          <h3 className="font-display text-left text-xl font-bold tracking-tight md:text-2xl">
            {project.title}
          </h3>
          {/* Two lines, always. A card that is three lines tall next to one that
              is one line tall breaks the row, and the detail page has the rest. */}
          <p className="line-clamp-3 text-left text-base leading-relaxed text-muted-foreground md:line-clamp-2">
            {project.description}
          </p>
        </div>

        {/*
          One line, never two. This row used to be `flex-wrap`, so a project
          with long stack names (TMPlayer: Kotlin, Jetpack Compose, Android TV)
          pushed the "+5" onto a second line and the arrow onto a third, and
          that card then stood taller than the three beside it.

          Now the row cannot wrap: the badges take whatever width is left and
          the arrow is pinned. `visible` is computed from the name lengths
          rather than being a fixed slice, because three short names fit where
          two long ones do not, and the remainder always goes into the counter.
        */}
        <div className="flex flex-nowrap items-center justify-between gap-3 border-t border-border px-5 py-4 md:px-6">
          <div className="flex min-w-0 flex-nowrap items-center gap-1.5">
            {visible.map((skill: string) => (
              <Badge key={skill}>{skill}</Badge>
            ))}
            {hidden > 0 && <Badge tone="ghost">+{hidden}</Badge>}
          </div>
          {/* The affordance, without the words. "Case study" under every card
              in a row of four is the same label read four times, and the whole
              card is already the link. The arrow alone says it is a door. */}
          <ArrowRight
            aria-hidden
            className="size-5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-accent"
          />
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
