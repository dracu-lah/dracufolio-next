"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CheckCircle, CopyIcon, ArrowUpRight } from "@/components/common/icons";
import { SQUIRCLE, Squircle, useSquircle } from "@/components/ui/squircle";

/**
 * The QR tile, and the enlarged view behind it.
 *
 * A code at 96px scans from about a hand's width away and no further, which is
 * exactly the distance somebody is not sitting at. Clicking it opens the same
 * code at 280px, where a phone picks it up across a desk, with the destination
 * written out and a copy button for anybody who would rather paste it.
 *
 * The SVG is generated on the server at build time and handed down as a
 * string. Nothing here touches user input.
 */
const QrTile = ({
  svg,
  url,
  label,
  hint,
  className = "",
}: {
  svg: string;
  url: string;
  label: string;
  hint?: string;
  className?: string;
}) => {
  const [copied, setCopied] = useState(false);
  const {
    attach: tileRef,
    style: tileStyle,
    fill: tileFill,
  } = useSquircle<HTMLButtonElement>({
    cornerRadius: SQUIRCLE.card,
    borderWidth: 1,
    fillClassName: "bg-card transition-colors",
  });

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard is blocked in some browsers without a user gesture chain.
      // The link is on screen either way, so there is nothing to recover.
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label={`${label}, open the larger code`}
          ref={tileRef}
          style={tileStyle}
          className={`group relative isolate hidden w-full cursor-pointer items-center gap-4 bg-border p-4 text-left transition-colors duration-300 hover:bg-accent-edge md:flex ${className}`}
        >
          {tileFill}
          {/*
            A fixed code, not a stretched one. `self-stretch aspect-square`
            looked right until the caption wrapped: the code took the row
            height, its width followed, that squeezed the caption into a
            narrower column, which made it taller, which grew the code again.
            At this size the code is the tallest thing in the row, so it sets
            the height and the padding comes out even on all four sides.
          */}
          <Squircle
            as="div"
            cornerRadius={SQUIRCLE.sm}
            className="size-28 shrink-0 bg-white p-2 [&>svg]:size-full"
            // Generated from `url` on the server, never from user input.
            dangerouslySetInnerHTML={{ __html: svg }}
          />
          <span className="relative flex min-w-0 flex-1 flex-col justify-center gap-1">
            <span className="text-base font-medium text-foreground transition-colors duration-300 group-hover:text-accent">
              {label}
            </span>
            {hint && (
              <span className="text-base leading-relaxed text-muted-foreground">
                {hint}
              </span>
            )}
          </span>
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogTitle className="font-display text-2xl font-bold tracking-tight">
          {label}
        </DialogTitle>
        <DialogDescription className="text-base leading-relaxed text-muted-foreground">
          {hint ?? "Point your phone camera at the code."}
        </DialogDescription>

        <div className="flex flex-col items-center gap-5 pt-2">
          <Squircle
            cornerRadius={SQUIRCLE.card}
            className="size-70 bg-white p-4"
            dangerouslySetInnerHTML={{ __html: svg }}
          />

          <div className="flex w-full flex-col gap-2">
            <p className="truncate text-center text-base text-muted-foreground">
              {url.replace(/^https?:\/\//, "").split("?")[0]}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={copy}
                className="flex h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-border text-sm font-medium tracking-[0.06em] uppercase transition-colors duration-200 hover:border-accent-edge hover:bg-accent-tint"
              >
                {copied ? (
                  <CheckCircle className="size-5" />
                ) : (
                  <CopyIcon className="size-5" />
                )}
                {copied ? "Copied" : "Copy link"}
              </button>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-accent bg-accent text-sm font-medium tracking-[0.06em] text-accent-foreground uppercase transition-colors duration-200 hover:bg-accent-muted"
              >
                Open here
                <ArrowUpRight className="size-5" />
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QrTile;
