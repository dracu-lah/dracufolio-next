"use client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { RESUME_PATH, WHATSAPP_URL } from "@/data/contact";

/**
 * Vim-style go-to navigation, because the person who owns this site lives in
 * Neovim and so does a good share of the audience. `g` then a letter jumps,
 * `?` lists the keys. It starts as something to find and ends up being the
 * fastest way around the site, which is the only kind of easter egg worth
 * shipping.
 */
const JUMPS: {
  keys: string;
  label: string;
  href: string;
  external?: boolean;
}[] = [
  { keys: "g h", label: "Home", href: "/" },
  { keys: "g p", label: "Projects", href: "/projects" },
  { keys: "g i", label: "Hire me", href: "/hire" },
  { keys: "g b", label: "Blog", href: "/blog" },
  { keys: "g a", label: "About", href: "/about" },
  { keys: "g o", label: "Open source", href: "/open-source" },
  { keys: "g c", label: "Contact", href: "/#contact" },
  { keys: "g r", label: "Resume PDF", href: RESUME_PATH, external: true },
  { keys: "g w", label: "WhatsApp", href: WHATSAPP_URL, external: true },
];

const isTyping = (target: EventTarget | null) => {
  const el = target as HTMLElement | null;
  if (!el) return false;
  const tag = el.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    el.isContentEditable
  );
};

const KeyboardShortcuts = () => {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  // `g` arms the next keypress for one and a half seconds, the way vim does.
  const armed = useRef(false);
  const armedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  const go = useCallback(
    (jump: (typeof JUMPS)[number]) => {
      if (jump.external) {
        window.open(jump.href, "_blank", "noopener,noreferrer");
      } else {
        router.push(jump.href);
      }
    },
    [router],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (isTyping(event.target)) return;

      if (event.key === "Escape" && open) {
        setOpen(false);
        return;
      }

      if (event.key === "?") {
        event.preventDefault();
        setOpen((o) => !o);
        return;
      }

      if (event.key === "g" && !armed.current) {
        armed.current = true;
        if (armedTimer.current) clearTimeout(armedTimer.current);
        armedTimer.current = setTimeout(() => {
          armed.current = false;
        }, 1500);
        return;
      }

      if (armed.current) {
        armed.current = false;
        if (armedTimer.current) clearTimeout(armedTimer.current);
        const jump = JUMPS.find((j) => j.keys.endsWith(event.key));
        if (jump) {
          event.preventDefault();
          setOpen(false);
          go(jump);
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      if (armedTimer.current) clearTimeout(armedTimer.current);
    };
  }, [open, go]);

  useEffect(() => {
    if (open) closeButton.current?.focus();
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-70 flex items-center justify-center p-6"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <button
            type="button"
            aria-label="Close shortcuts"
            className="absolute inset-0 cursor-default bg-background/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Keyboard shortcuts"
            className="relative w-full max-w-md overflow-hidden rounded-xl border border-border bg-card"
            initial={reduceMotion ? false : { y: 8 }}
            animate={{ y: 0 }}
            exit={{ y: 8 }}
            transition={{ duration: 0.18 }}
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <p className="text-sm text-muted-foreground">Shortcuts</p>
              <button
                ref={closeButton}
                type="button"
                onClick={() => setOpen(false)}
                className="text-sm text-muted-foreground transition-colors hover:text-accent"
              >
                esc
              </button>
            </div>
            <ul className="divide-y divide-border">
              {JUMPS.map((jump) => (
                <li
                  key={jump.keys}
                  className="flex items-center justify-between gap-6 px-5 py-2.5"
                >
                  <span className="text-sm text-muted-foreground">
                    {jump.label}
                  </span>
                  <kbd className="rounded-md border border-border px-2 py-0.5 font-mono text-sm text-foreground">
                    {jump.keys}
                  </kbd>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default KeyboardShortcuts;
