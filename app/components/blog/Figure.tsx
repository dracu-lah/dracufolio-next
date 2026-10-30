import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { SQUIRCLE, Squircle } from "@/components/ui/squircle";
import { cn } from "@/lib/utils";

/**
 * The one picture surface a post is allowed to use, for a screenshot or for a
 * diagram drawn inline in the MDX. It is a component rather than markdown
 * image syntax because a picture in a post needs a caption, real dimensions
 * and the site's own frame, and markdown gives you none of those.
 *
 * Border mode: the figure carries the edge colour and the fill layer is the
 * card surface, so the border follows the squircle instead of being clipped
 * off at the corner.
 */

type FigureBase = {
  /** Always written. A picture with no caption is decoration. */
  caption: ReactNode;
  className?: string;
};

type FigureImage = FigureBase & {
  src: string;
  alt: string;
  /** The file's real pixel size, so the layout never shifts when it loads. */
  width: number;
  height: number;
  children?: never;
  images?: never;
};

type Shot = { src: string; alt: string; width: number; height: number };

type FigureRow = FigureBase & {
  /**
   * Phone screenshots shown side by side. One tall portrait shot at the full
   * column width runs several screens long; a row keeps each at phone size.
   */
  images: Shot[];
  src?: never;
  children?: never;
};

type FigureDiagram = FigureBase & {
  /** An inline SVG drawn in the MDX. */
  children: ReactNode;
  src?: never;
  images?: never;
};

export default function Figure(props: FigureImage | FigureRow | FigureDiagram) {
  const { caption, className } = props;
  const cols = props.images?.length ?? 1;
  const narrowCols = cols > 3 ? 2 : cols;

  return (
    <Squircle
      as="figure"
      cornerRadius={SQUIRCLE.panel}
      borderWidth={1}
      fillClassName="bg-card"
      className={cn("not-prose my-10 bg-border", className)}
    >
      {props.src ? (
        // The image sits inside a small mat so the frame reads as a frame and
        // the photo keeps a corner of its own.
        <div className="p-1.5">
          <Squircle
            cornerRadius={SQUIRCLE.card}
            className="overflow-hidden bg-muted"
          >
            <Image
              src={props.src}
              alt={props.alt}
              width={props.width}
              height={props.height}
              sizes="(min-width: 768px) 720px, 100vw"
              className="h-auto w-full"
            />
          </Squircle>
        </div>
      ) : props.images ? (
        // Four phones across a 390px screen are under 90px each, too small
        // to read, so a row of four or more wraps to two columns below `sm`.
        <div
          className="grid grid-cols-(--cols-narrow) gap-1.5 p-1.5 sm:grid-cols-(--cols)"
          style={
            {
              "--cols": `repeat(${cols}, minmax(0, 1fr))`,
              "--cols-narrow": `repeat(${narrowCols}, minmax(0, 1fr))`,
            } as CSSProperties
          }
        >
          {props.images.map((shot) => (
            <Squircle
              key={shot.src}
              cornerRadius={SQUIRCLE.card}
              className="overflow-hidden bg-muted"
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
                sizes={`(min-width: 768px) ${Math.ceil(720 / cols)}px, (min-width: 640px) ${Math.ceil(100 / cols)}vw, ${Math.ceil(100 / narrowCols)}vw`}
                className="h-auto w-full"
              />
            </Squircle>
          ))}
        </div>
      ) : (
        <div className="px-4 py-6 sm:px-6">{props.children}</div>
      )}

      <figcaption className="px-5 pt-4 pb-5 text-base leading-relaxed text-muted-foreground">
        {caption}
      </figcaption>
    </Squircle>
  );
}

/**
 * The fallback for plain markdown image syntax. It gets the same frame, minus
 * the caption, so a post that reaches for `![]()` does not land unstyled. The
 * dimensions are a placeholder ratio for the first paint; CSS hands the real
 * one back once the file loads.
 */
export function MdxImage({
  src,
  alt = "",
}: {
  src?: string;
  alt?: string;
}) {
  if (!src) return null;

  return (
    <Squircle
      cornerRadius={SQUIRCLE.panel}
      borderWidth={1}
      fillClassName="bg-card"
      className="not-prose my-10 bg-border"
    >
      <div className="p-1.5">
        <Squircle
          cornerRadius={SQUIRCLE.card}
          className="overflow-hidden bg-muted"
        >
          <Image
            src={src}
            alt={alt}
            width={1600}
            height={900}
            sizes="(min-width: 768px) 720px, 100vw"
            className="h-auto w-full"
          />
        </Squircle>
      </div>
    </Squircle>
  );
}
