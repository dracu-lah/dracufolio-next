"use client";
import { getSvgPath } from "figma-squircle";
import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * iOS-style smooth corners, drawn as a clip-path so every engine gets the same
 * curve.
 *
 * This replaces the `corner-shape: squircle` rule the site used to carry.
 * `corner-shape` is cheaper, but only Chromium implements it, so the corners
 * were a in one browser and a plain arc in every other one, and the
 * same class produced two different shapes on the same page. A clip-path is
 * geometry, so it renders identically everywhere.
 *
 * The path goes through React's own `style` prop rather than a class appended
 * at runtime. That detail is load-bearing: React rewrites `className` from the
 * JSX on every render, so a class added from outside is wiped on the first
 * state change and the element snaps back to a square.
 *
 * `borderWidth` opts into border mode, which is the answer to "the border has
 * to be a too". A clip-path cuts a normal CSS border off at the
 * corner, so in border mode the element's own background becomes the border
 * colour and the returned `fill` node, inset by one border width and clipped
 * to the inner path, carries the real surface. Both edges are then the same
 * curve rather than a curve inside a rectangle.
 *
 * The fill node carries `data-fill`, so a call site that has to restyle it on
 * hover can reach it with `[&>[data-fill]]:` instead of threading a class
 * through every layer.
 *
 * Radii here are larger than the `rounded-*` value they replace. A squircle
 * with the same radius reads visibly squarer than a circular arc, so the sizes
 * in `SQUIRCLE` are the compensated forms of the Tailwind steps this site
 * uses (rounded-md 9px, rounded-lg 12px, rounded-xl 18px, rounded-2xl 24px).
 */

const CORNER_SMOOTHING = 1;

/** The site's four corner sizes, already compensated. Use these, not numbers. */
export const SQUIRCLE = {
  /** Small controls and tiles: the compensated `rounded-md`. */
  sm: 12,
  /** Buttons, inputs, chips: the compensated `rounded-lg`. */
  control: 16,
  /** Cards and bordered blocks: the compensated `rounded-xl`. */
  card: 24,
  /** Dialogs and the big figures: the compensated `rounded-2xl`. */
  panel: 30,
} as const;

export interface SquircleOptions {
  cornerRadius?: number;
  /** Opts into border mode: element bg = border colour, `fill` = the surface. */
  borderWidth?: number;
  /** Background utility for the fill layer in border mode. */
  fillClassName?: string;
}

function useSize<T extends HTMLElement>() {
  const [size, setSize] = React.useState({ width: 0, height: 0 });
  const observerRef = React.useRef<ResizeObserver | null>(null);

  const attach = React.useCallback((el: T | null) => {
    observerRef.current?.disconnect();
    observerRef.current = null;
    if (!el) return;
    /*
     * `offsetWidth`, not `clientWidth`. A clip-path is resolved against the
     * border box, and `clientWidth` excludes the element's own border, so a
     * clipped element that also carries a CSS border was clipped one pixel
     * inside it and the border vanished completely rather than being cut at
     * the corner. That is what ate every divider in the services grid.
     */
    const measure = () => {
      const width = el.offsetWidth;
      const height = el.offsetHeight;
      setSize((prev) =>
        prev.width === width && prev.height === height
          ? prev
          : { width, height },
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    observerRef.current = observer;
  }, []);

  return [attach, size] as const;
}

export interface SquircleRender<T extends HTMLElement> {
  /**
   * Callback ref for the clipped element. Named `attach` rather than `ref` so
   * the react-hooks rule does not mistake this object for a ref object.
   */
  attach: (el: T | null) => void;
  style: React.CSSProperties;
  /** Border-mode fill layer. Render it as the element's first child. */
  fill: React.ReactNode;
}

export function useSquircle<T extends HTMLElement>({
  cornerRadius = SQUIRCLE.card,
  borderWidth = 0,
  fillClassName,
}: SquircleOptions): SquircleRender<T> {
  const [attach, { width, height }] = useSize<T>();
  const measured = width > 0 && height > 0;

  // Memoised on the geometry. getSvgPath is not cheap and this runs for every
  // on the page, so it only recomputes when a dimension moves.
  const outer = React.useMemo(
    () =>
      measured
        ? getSvgPath({
            width,
            height,
            cornerRadius,
            cornerSmoothing: CORNER_SMOOTHING,
            preserveSmoothing: true,
          })
        : null,
    [measured, width, height, cornerRadius],
  );

  const inner = React.useMemo(
    () =>
      measured && borderWidth > 0
        ? getSvgPath({
            width: Math.max(0, width - borderWidth * 2),
            height: Math.max(0, height - borderWidth * 2),
            cornerRadius: Math.max(0, cornerRadius - borderWidth),
            cornerSmoothing: CORNER_SMOOTHING,
            preserveSmoothing: true,
          })
        : null,
    [measured, width, height, cornerRadius, borderWidth],
  );

  // Before the first measurement (server render, or one frame behind on mount)
  // it falls back to a plain circular radius, so the corner is never square.
  const style: React.CSSProperties = outer
    ? { clipPath: `path('${outer}')` }
    : { borderRadius: cornerRadius };

  const fill =
    borderWidth > 0 ? (
      <span
        aria-hidden
        data-fill=""
        className={cn("pointer-events-none absolute -z-10", fillClassName)}
        style={
          inner
            ? { inset: borderWidth, clipPath: `path('${inner}')` }
            : {
                inset: borderWidth,
                borderRadius: Math.max(0, cornerRadius - borderWidth),
              }
        }
      />
    ) : null;

  return { attach, style, fill };
}

/** The tags a clipped surface is ever allowed to be. */
type SquircleTag =
  | "div"
  | "section"
  | "article"
  | "figure"
  | "dl"
  | "ul"
  | "ol"
  | "li"
  | "nav"
  | "aside";

type SquircleProps = React.HTMLAttributes<HTMLElement> &
  SquircleOptions & {
    /** The element to render. A clipped list stays a list, a figure a figure. */
    as?: SquircleTag;
  };

export function Squircle({
  as: Tag = "div",
  cornerRadius = SQUIRCLE.card,
  borderWidth,
  fillClassName,
  className,
  style,
  children,
  ...props
}: SquircleProps) {
  const {
    attach,
    style: clip,
    fill,
  } = useSquircle<HTMLElement>({ cornerRadius, borderWidth, fillClassName });

  // React refuses children next to `dangerouslySetInnerHTML`, and the QR
  // plates are exactly that: a clipped box whose only content is a generated
  // SVG string. Those never have a border, so there is no fill layer to lose.
  const shared = {
    ref: attach as React.Ref<never>,
    className: cn(borderWidth ? "relative isolate" : undefined, className),
    style: { ...clip, ...style },
    ...(props as React.HTMLAttributes<never>),
  };

  if (props.dangerouslySetInnerHTML) return <Tag {...shared} />;

  return (
    <Tag {...shared}>
      {fill}
      {children}
    </Tag>
  );
}

type SquircleLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  SquircleOptions;

/** The same surface as a link, for the CTAs that are anchors rather than buttons. */
export function SquircleLink({
  cornerRadius = SQUIRCLE.control,
  borderWidth,
  fillClassName,
  className,
  style,
  children,
  ...props
}: SquircleLinkProps) {
  const {
    attach,
    style: clip,
    fill,
  } = useSquircle<HTMLAnchorElement>({
    cornerRadius,
    borderWidth,
    fillClassName,
  });

  return (
    <a
      ref={attach}
      className={cn(borderWidth ? "relative isolate" : undefined, className)}
      style={{ ...clip, ...style }}
      {...props}
    >
      {fill}
      {children}
    </a>
  );
}

type SquircleButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  SquircleOptions;

export function SquircleButton({
  cornerRadius = SQUIRCLE.control,
  borderWidth,
  fillClassName,
  className,
  style,
  children,
  ...props
}: SquircleButtonProps) {
  const {
    attach,
    style: clip,
    fill,
  } = useSquircle<HTMLButtonElement>({
    cornerRadius,
    borderWidth,
    fillClassName,
  });

  return (
    <button
      ref={attach}
      className={cn(borderWidth ? "relative isolate" : undefined, className)}
      style={{ ...clip, ...style }}
      {...props}
    >
      {fill}
      {children}
    </button>
  );
}
