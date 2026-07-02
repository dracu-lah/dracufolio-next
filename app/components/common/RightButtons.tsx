"use client";
import { useMotionValueEvent, useScroll, motion } from "framer-motion";
import { useState } from "react";

const navItems = [
  { id: "top", href: "/", label: "home" },
  { id: "portfolio", href: "/#portfolio", label: "projects" },
  { id: "skills", href: "/#skills", label: "skills" },
  { id: "contact", href: "/#contact", label: "contact" },
];

const RightButtons = () => {
  const [show, setShow] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
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
        className="hidden flex-col gap-0.5 border border-border bg-background/90 p-1.5 backdrop-blur-sm lg:flex"
        onMouseLeave={() => setHovered(null)}
      >
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onMouseEnter={() => setHovered(item.href)}
            className="relative px-4 py-2.5 font-mono text-[13px] uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-200 hover:text-background"
          >
            {hovered === item.href && (
              <motion.span
                layoutId="side-nav-hover"
                className="absolute inset-0 -z-10 bg-foreground"
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
