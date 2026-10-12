"use client";

import Image from "next/image";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, ArrowRight, CloseX } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import type { GalleryImage } from "@/types/portfolio";

/** How far a swipe has to travel before it counts as previous or next. */
const SWIPE = 80;

// Variants rather than inline values so the outgoing image reads the new
// direction from AnimatePresence's `custom`, not the one it was mounted with.
const slide = {
  enter: (dir: number) => ({ x: dir * 60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir * -60, opacity: 0 }),
};
const fade = {
  enter: { opacity: 1 },
  center: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0 } },
};

const GalleryViewer = ({
  title,
  images,
  index,
  onIndexChange,
  onClose,
}: {
  title: string;
  images: GalleryImage[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}) => {
  const reduceMotion = useReducedMotion();
  // Which way the last step went, so the slide says it: next comes in from
  // the right, previous from the left.
  const [direction, setDirection] = useState(1);
  const count = images.length;
  const image = images[index];

  const go = (step: number) => {
    setDirection(step);
    onIndexChange((index + step + count) % count);
  };

  const neighbours = [
    ...new Set(
      count > 1
        ? [images[(index + 1) % count], images[(index - 1 + count) % count]]
        : [],
    ),
  ];

  return (
    <DialogPrimitive.Root open onOpenChange={(open) => !open && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-background" />
        <DialogPrimitive.Content
          className="fixed inset-0 z-50 flex flex-col outline-none"
          onKeyDown={(e) => {
            if (count < 2) return;
            if (e.key === "ArrowRight") go(1);
            if (e.key === "ArrowLeft") go(-1);
          }}
        >
          <DialogPrimitive.Title className="sr-only">
            {title} screenshots
          </DialogPrimitive.Title>

          <div className="flex items-center justify-between px-4 pt-4 md:px-6">
            <p className="text-base font-medium text-muted-foreground" aria-live="polite">
              {index + 1} of {count}
            </p>
            <DialogPrimitive.Close asChild>
              <Button size="icon" aria-label="Close">
                <CloseX size={20} />
              </Button>
            </DialogPrimitive.Close>
          </div>

          <div className="relative flex-1 overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={image.src}
                custom={direction}
                className="absolute inset-4 md:inset-6"
                variants={reduceMotion ? fade : slide}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                drag={count > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -SWIPE) go(1);
                  else if (info.offset.x > SWIPE) go(-1);
                }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="100vw"
                  priority
                  className="object-contain"
                  draggable="false"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-4 px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] md:px-6 md:pb-6">
            {count > 1 && (
              <Button size="icon" aria-label="Previous screenshot" onClick={() => go(-1)}>
                <ArrowLeft size={20} />
              </Button>
            )}
            <DialogPrimitive.Description className="flex-1 text-center text-base text-foreground">
              {image.alt}
            </DialogPrimitive.Description>
            {count > 1 && (
              <Button size="icon" aria-label="Next screenshot" onClick={() => go(1)}>
                <ArrowRight size={20} />
              </Button>
            )}
          </div>

          {/* Fetched ahead so the next step is already on screen when it lands. */}
          {neighbours.map((img) => (
            <Image
              key={`pre-${img.src}`}
              src={img.src}
              alt=""
              aria-hidden
              fill
              sizes="100vw"
              loading="eager"
              className="invisible"
            />
          ))}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default GalleryViewer;
