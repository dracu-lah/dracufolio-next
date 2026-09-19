"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Phone, WhatsappLogo } from "@/components/common/icons";
import { PHONE_TEL, WHATSAPP_URL } from "@/data/contact";
import { SquircleLink } from "@/components/ui/squircle";
import { usePageCtaOnScreen } from "./usePageCtaOnScreen";

/**
 * The phone-sized replacement for the floating bubble that used to sit in the
 * bottom right corner.
 *
 * It is a bar rather than a blob for two reasons: a bar cannot cover a form
 * field, and at 390px a 48px high full width target is the easiest thing on
 * the page to hit with a thumb. Above `md` it does not render at all, because
 * the header already carries the same action.
 *
 * It steps out of the way for the contact form, so it is never sitting on top
 * of the send button it is competing with, and for any WhatsApp button the
 * page puts on screen. It used to watch the form alone, which meant it sat
 * over the hero button on the hire pages and over the one in the closing
 * block: two WhatsApp CTAs at once, the exact thing this bar exists to stop.
 */
const MobileActionBar = () => {
  const reduceMotion = useReducedMotion();
  const ctaOnScreen = usePageCtaOnScreen();
  const formOnScreen = usePageCtaOnScreen("#contact", "0px 0px -20% 0px");
  const hidden = ctaOnScreen || formOnScreen;

  return (
    <motion.div
      data-mobile-action-bar
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-lg md:hidden"
      initial={reduceMotion ? false : { y: 80 }}
      animate={{
        y: hidden ? 80 : 0,
        opacity: hidden ? 0 : 1,
        pointerEvents: hidden ? "none" : "auto",
      }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center gap-2 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <SquircleLink
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 flex-1 items-center justify-center gap-2.5 bg-accent text-sm font-medium tracking-[0.06em] text-accent-foreground uppercase transition-transform duration-150 active:translate-y-px"
        >
          <WhatsappLogo className="size-5" />
          WhatsApp
        </SquircleLink>
        <SquircleLink
          href={PHONE_TEL}
          aria-label="Call Nevil"
          borderWidth={1}
          fillClassName="bg-background transition-colors"
          className="flex size-12 items-center justify-center bg-border transition-colors duration-200 [&>[data-fill]]:active:bg-accent-tint"
        >
          <Phone className="size-5" />
        </SquircleLink>
      </div>
    </motion.div>
  );
};

export default MobileActionBar;
