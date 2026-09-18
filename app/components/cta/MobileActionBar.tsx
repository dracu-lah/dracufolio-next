"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Phone, WhatsappLogo } from "@/components/common/icons";
import { PHONE_TEL, WHATSAPP_URL } from "@/data/contact";

/**
 * The phone-sized replacement for the floating bubble that used to sit in the
 * bottom right corner.
 *
 * It is a bar rather than a blob for two reasons: a bar cannot cover a form
 * field, and at 390px a 48px high full width target is the easiest thing on
 * the page to hit with a thumb. Above `md` it does not render at all, because
 * the header already carries the same action.
 *
 * It still steps out of the way while the contact form is on screen, so the
 * bar is never sitting on top of the send button it is competing with.
 */
const MobileActionBar = () => {
  const reduceMotion = useReducedMotion();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { rootMargin: "0px 0px -20% 0px" },
    );
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

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
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 flex-1 items-center justify-center gap-2.5 rounded-lg squircle border border-accent bg-accent font-mono text-sm tracking-[0.14em] text-accent-foreground uppercase transition-transform duration-150 active:translate-y-px"
        >
          <WhatsappLogo className="size-5" />
          WhatsApp
        </a>
        <a
          href={PHONE_TEL}
          aria-label="Call Nevil"
          className="flex size-12 items-center justify-center rounded-lg squircle border border-border transition-colors duration-200 active:bg-accent-tint"
        >
          <Phone className="size-5" />
        </a>
      </div>
    </motion.div>
  );
};

export default MobileActionBar;
