"use client";
import { useMotionValueEvent, useScroll, motion } from "framer-motion";
import { useState } from "react";
import useActiveSection from "@/hooks/useActiveSection";

const navItems = [
  { id: "hero", href: "/", label: "Home" },
  { id: "portfolio", href: "/#portfolio", label: "Projects" },
  { id: "open-source", href: "/#open-source", label: "Open source" },
  { id: "about", href: "/#about", label: "About" },
  { id: "contact", href: "/#contact", label: "Contact" },
];

const sectionIds = navItems.map((item) => item.id);

const RightButtons = () => {
  const [show, setShow] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const activeId = useActiveSection(sectionIds);
  const highlighted = hovered ?? activeId;
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (progress) => {
    setShow(progress > 0);
  });

  return (
    <div className="fixed top-[38vh] right-8 z-50">
      <motion.nav
        aria-label="Section shortcuts"
        initial={{ x: 200 }}
        animate={{ x: show ? 0 : 200 }}
        className="hidden flex-col gap-0.5 rounded-xl border border-border bg-background/90 p-1.5 backdrop-blur-sm lg:flex"
        onMouseLeave={() => setHovered(null)}
      >
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onMouseEnter={() => setHovered(item.id)}
            aria-current={activeId === item.id ? "true" : undefined}
            className={`relative px-4 py-2.5 text-base transition-colors duration-200 ${
              highlighted === item.id
                ? "text-background"
                : "text-muted-foreground"
            }`}
          >
            {highlighted === item.id && (
              <motion.span
                layoutId="side-nav-hover"
                className="absolute inset-0 -z-10 rounded-lg bg-foreground"
                transition={{ type: "spring", stiffness: 500, damping: 40 }}
              />
            )}
            {item.label}
          </a>
        ))}
      </motion.nav>
    </div>
  );
};

export default RightButtons;
