"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { SQUIRCLE, SquircleButton } from "@/components/ui/squircle";
import type { GalleryImage } from "@/types/portfolio";

// The viewer is only needed once someone opens a screenshot, so its code and
// framer-motion's drag stay out of the page's first load.
const GalleryViewer = dynamic(() => import("./GalleryViewer"), { ssr: false });

const frame =
  "group block w-full cursor-zoom-in overflow-hidden bg-border p-px transition-colors duration-300 hover:bg-accent-edge focus-visible:bg-accent focus-visible:outline-none";

const isTall = (img: GalleryImage) => img.height > img.width;

const ProjectGallery = ({
  title,
  images,
}: {
  title: string;
  images: GalleryImage[];
}) => {
  const [open, setOpen] = useState<number | null>(null);

  // Display order and viewer order are the same list, so the arrows in the
  // viewer walk the page top to bottom: the hero, the wide shots, the phones.
  const wide = images.filter((img) => !isTall(img));
  const tall = images.filter(isTall);
  const ordered = [...wide, ...tall];
  const [hero, ...rest] = ordered;
  const restWide = rest.filter((img) => !isTall(img));

  const indexOf = (img: GalleryImage) => ordered.indexOf(img);

  if (!hero) return null;

  return (
    <>
      <SquircleButton
        type="button"
        cornerRadius={SQUIRCLE.panel}
        borderWidth={1}
        fillClassName="bg-card"
        className={frame}
        onClick={() => setOpen(0)}
        aria-label={`View larger: ${hero.alt}`}
      >
        <Image
          priority
          src={hero.src}
          width={hero.width}
          height={hero.height}
          sizes="(min-width: 1024px) 60rem, 100vw"
          alt={hero.alt}
          className="relative w-full object-cover"
          draggable="false"
        />
      </SquircleButton>

      {restWide.length > 0 && (
        <div className="grid items-start gap-6 pt-6 md:grid-cols-2">
          {restWide.map((img) => (
            <SquircleButton
              key={img.src}
              type="button"
              cornerRadius={SQUIRCLE.card}
              borderWidth={1}
              fillClassName="bg-card"
              className={frame}
              onClick={() => setOpen(indexOf(img))}
              aria-label={`View larger: ${img.alt}`}
            >
              <Image
                src={img.src}
                width={img.width}
                height={img.height}
                sizes="(min-width: 768px) 30rem, 100vw"
                alt={img.alt}
                className="relative w-full"
                draggable="false"
              />
            </SquircleButton>
          ))}
        </div>
      )}

      {tall.length > 0 && (
        /* Phone screens at half the column would stand a thousand pixels
           tall, so they get a row of their own: a swipeable strip on a phone,
           up to four across from md up. */
        <ul className="-mx-6 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 md:mx-0 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
          {tall.map((img) => (
            <li key={img.src} className="w-[60vw] max-w-60 shrink-0 snap-start md:w-auto md:max-w-none">
              <SquircleButton
                type="button"
                cornerRadius={SQUIRCLE.card}
                borderWidth={1}
                fillClassName="bg-card"
                className={frame}
                onClick={() => setOpen(indexOf(img))}
                aria-label={`View larger: ${img.alt}`}
              >
                <Image
                  src={img.src}
                  width={img.width}
                  height={img.height}
                  sizes="(min-width: 768px) 15rem, 60vw"
                  alt={img.alt}
                  className="relative aspect-[9/19.5] w-full object-cover object-top"
                  draggable="false"
                />
              </SquircleButton>
            </li>
          ))}
        </ul>
      )}

      {open !== null && (
        <GalleryViewer
          title={title}
          images={ordered}
          index={open}
          onIndexChange={setOpen}
          onClose={() => setOpen(null)}
        />
      )}
    </>
  );
};

export default ProjectGallery;
