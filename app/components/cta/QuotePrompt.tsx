"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import Icon3D from "@/components/motion/Icon3D";
import { SquircleLink } from "@/components/ui/squircle";
import { CallTimer, Phone, WhatsappLogo } from "@/components/common/icons";
import { PHONE_DISPLAY, PHONE_TEL, whatsappUrl } from "@/data/contact";

const DELAY_MS = 30_000;
const STORAGE_KEY = "dracufolio:quote-prompt";

/**
 * One offer, once, and only on a pointer device.
 *
 * Timing: thirty seconds on the page, or the moment the pointer leaves toward
 * the browser chrome, whichever lands first. Google's intrusive interstitial
 * rule is about mobile pages that cover the content on arrival from search,
 * which is why this never renders below `md`: a phone already has the docked
 * WhatsApp bar, so a phone gets nothing it did not already have.
 *
 * Once dismissed or acted on, it is remembered in localStorage and never shown
 * again. Escape and the backdrop both close it, and nothing inside is
 * autofocused, so it cannot hijack a keyboard or open a soft keyboard.
 */
const QuotePrompt = ({ message }: { message?: string }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // A coarse pointer is a touch screen. Narrow windows are excluded too, so
    // a resized desktop window behaves like the phone it is pretending to be.
    const isPhone =
      window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
    if (isPhone) return;

    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      // Storage can be blocked. Showing it once per page load is acceptable.
    }

    let done = false;
    const fire = () => {
      if (done) return;
      done = true;
      setOpen(true);
      try {
        localStorage.setItem(STORAGE_KEY, String(Date.now()));
      } catch {}
    };

    const timer = setTimeout(fire, DELAY_MS);
    // Exit intent: the pointer crossing the top edge of the viewport is the
    // move toward the tab bar or the address bar.
    const onLeave = (event: MouseEvent) => {
      if (event.clientY <= 0) fire();
    };
    document.addEventListener("mouseout", onLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseout", onLeave);
    };
  }, []);

  const href = whatsappUrl(
    message ??
      "Hi Nevil, I would like a quote. Here is what I am trying to build:",
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[calc(100%-1.5rem)] p-5 sm:max-w-md sm:p-6">
        <div className="flex flex-col gap-4 sm:gap-5">
          {/*
            The chip sits above the title rather than beside it. Next to a
            two-line heading in a narrow dialog it was pushing the text into a
            column barely wide enough for two words.
          */}
          <div className="flex flex-col items-start gap-3">
            <Icon3D chip size="md" tone="accent">
              <CallTimer className="size-6" />
            </Icon3D>
            <DialogTitle className="font-display text-2xl font-bold tracking-tight text-balance">
              Free twenty minute call
            </DialogTitle>
          </div>

          <DialogDescription className="text-base leading-relaxed text-muted-foreground">
            Tell me what you are building and you get a fixed scope and a fixed
            figure back. No meeting, no agency in between, and if I am the wrong
            person for it I will say so.
          </DialogDescription>

          {/*
            One height for both, and the row never wraps: the phone number is
            the long label, so it gets the flexible track and the WhatsApp
            button keeps its intrinsic width. Below `sm` they stack and both go
            full width, which is the only way a 44px target survives at 320px.
          */}
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
            <SquircleLink
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex h-12 w-full items-center justify-center gap-2.5 bg-accent px-5 text-sm font-medium tracking-[0.06em] text-accent-foreground uppercase transition-colors duration-200 hover:bg-accent-muted sm:w-auto sm:shrink-0"
            >
              <WhatsappLogo className="size-5" />
              WhatsApp
            </SquircleLink>
            <SquircleLink
              href={PHONE_TEL}
              onClick={() => setOpen(false)}
              borderWidth={1}
              fillClassName="bg-background transition-colors"
              className="group flex h-12 w-full min-w-0 flex-1 items-center justify-center gap-2.5 bg-border px-4 text-sm font-medium tracking-[0.06em] whitespace-nowrap transition-colors duration-200 hover:bg-accent-edge [&>[data-fill]]:hover:bg-accent-tint sm:w-auto"
            >
              <Phone className="size-5 shrink-0" />
              {PHONE_DISPLAY}
            </SquircleLink>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuotePrompt;
