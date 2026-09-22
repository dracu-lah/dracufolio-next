"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { SQUIRCLE, useSquircle } from "@/components/ui/squircle";

/**
 * One button, four intents. `solid` is the accent fill and there is exactly one
 * of it in any view, because two equally loud buttons is the same as none.
 *
 * The press state is a 1px push rather than a shadow change, so the flat
 * surface rule holds and the feedback still feels physical. Labels stay on one
 * line: `whitespace-nowrap` is deliberate, a CTA that wraps is a broken CTA.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer rounded-lg text-base font-medium uppercase tracking-[0.04em] transition-[background-color,border-color,color,transform] duration-200 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-ring/60 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "group bg-border text-foreground hover:bg-accent-edge [&>[data-fill]]:bg-card [&>[data-fill]]:transition-colors hover:[&>[data-fill]]:bg-accent-tint",
        solid: "bg-accent text-accent-foreground hover:bg-accent-muted",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive/40",
        outline:
          "group bg-input text-foreground hover:bg-accent-edge [&>[data-fill]]:bg-background [&>[data-fill]]:transition-colors hover:[&>[data-fill]]:bg-accent-tint",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent-tint hover:text-foreground",
        link: "text-accent underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 py-2 has-[>svg]:px-4",
        sm: "h-9 gap-1.5 px-4 text-sm has-[>svg]:px-3",
        lg: "h-13 px-8 text-base has-[>svg]:px-6",
        icon: "size-11",
        "icon-sm": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

/** The variants whose edge is a line rather than a fill. */
const BORDERED = new Set(["default", "outline"]);

function Button({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  /*
   * The corner is a clip-path rather than a border-radius, so it is the same
   * shape in every engine. A clip cuts a CSS border off at the corner, which
   * is why the bordered variants are drawn in border mode instead: the button
   * background is the edge colour and the fill layer inside it is the surface.
   */
  const bordered = BORDERED.has(variant ?? "default");
  const { attach, style, fill } = useSquircle<HTMLElement>({
    cornerRadius: size === "lg" ? SQUIRCLE.control + 2 : SQUIRCLE.control,
    borderWidth: bordered ? 1 : 0,
  });

  /*
   * `asChild` used to hand the children straight through, which meant an
   * anchor styled as a button got a plain radius and no fill layer. So every
   * CTA that navigates wrapped a real <button> in an <a> instead, and that is
   * interactive content inside a link: invalid HTML, a focusable node under
   * `aria-hidden` in the header, and one of the shapes React names when a
   * hydration mismatch is thrown.
   *
   * The slotted element gets the ref, the clip and the fill layer as its own
   * first child, so <Button asChild><Link/></Button> is the same surface as a
   * button and still gets Next's prefetch.
   */
  if (asChild) {
    const only = React.Children.only(children) as React.ReactElement<{
      children?: React.ReactNode;
    }>;

    return (
      <Slot
        data-slot="button"
        ref={attach as React.Ref<never>}
        style={style}
        className={cn(
          "relative isolate",
          buttonVariants({ variant, size, className }),
        )}
        {...props}
      >
        {React.cloneElement(
          only,
          undefined,
          <>
            {fill}
            {only.props.children}
          </>,
        )}
      </Slot>
    );
  }

  return (
    <button
      data-slot="button"
      ref={attach as React.Ref<HTMLButtonElement>}
      style={style}
      className={cn(
        "relative isolate",
        buttonVariants({ variant, size, className }),
      )}
      {...props}
    >
      {fill}
      {children}
    </button>
  );
}

export { Button, buttonVariants };
