"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { WhatsappLogo } from "@/components/common/icons";
import Icon3D from "@/components/motion/Icon3D";
import Magnetic from "@/components/motion/Magnetic";
import { WHATSAPP_URL } from "@/data/contact";

/**
 * The one button that follows you down the page. It steps out of the way when
 * the contact form is on screen: at 390px the floating pill sits exactly where
 * the submit button lands, and a CTA that covers the form it is asking you to
 * fill in is worse than no CTA.
 */
const WhatsAppFab = () => {
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
      className="fixed right-4 bottom-4 z-50 md:right-6 md:bottom-6"
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{
        opacity: hidden ? 0 : 1,
        y: hidden ? 12 : 0,
        pointerEvents: hidden ? "none" : "auto",
      }}
      transition={{ duration: 0.3 }}
    >
      <Magnetic>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Message Nevil on WhatsApp"
          className="flex items-center gap-2.5 rounded-lg squircle border border-foreground bg-foreground px-4 py-3 font-mono text-sm uppercase tracking-[0.16em] text-background transition-colors duration-300 hover:bg-background hover:text-foreground"
        >
          <Icon3D float>
            <WhatsappLogo className="size-5" aria-hidden />
          </Icon3D>
          WhatsApp
        </a>
      </Magnetic>
    </motion.div>
  );
};

export default WhatsAppFab;
