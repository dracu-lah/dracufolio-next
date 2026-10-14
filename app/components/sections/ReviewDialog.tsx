"use client";

// A client component because the dialog holds open state. The card itself
// stays server rendered, with the full review text in its HTML.

import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

/**
 * Opens the whole review in a dialog, since the card clamps long reviews to
 * keep the row level. The trigger is a transparent button stretched over the
 * card: a button can't wrap the figure and blockquote, so it sits on top.
 *
 * `hidden` is for the repeats in the loop, which are aria-hidden: their
 * button still answers a click but stays out of the tab order.
 */
const ReviewDialog = ({
  author,
  hidden = false,
  children,
}: {
  author: string;
  hidden?: boolean;
  children: ReactNode;
}) => (
  <Dialog>
    <DialogTrigger
      className="absolute inset-0 z-10 cursor-pointer"
      aria-label={`Read the full review from ${author}`}
      {...(hidden ? { tabIndex: -1 } : {})}
    />
    <DialogContent
      aria-describedby={undefined}
      className="max-w-[calc(100%-1.5rem)] gap-5 p-5 sm:max-w-xl sm:p-7"
    >
      <DialogTitle className="sr-only">Review from {author}</DialogTitle>
      {children}
    </DialogContent>
  </Dialog>
);

export default ReviewDialog;
