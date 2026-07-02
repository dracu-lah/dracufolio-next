"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { PropsWithChildren, useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "home" },
  { href: "/#portfolio", label: "projects" },
  { href: "/#skills", label: "skills" },
  { href: "/#about", label: "about" },
];

const Navbar = ({ children }: PropsWithChildren) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      transition={{ duration: 0.5 }}
      animate={{ y: 0 }}
      className={`fixed z-50 flex min-w-full items-center justify-between border-b px-4 py-3 transition-colors duration-300 md:px-6 ${
        isScrolled
          ? "border-border bg-background/90 backdrop-blur-lg"
          : "border-transparent"
      }`}
    >
      <motion.a
        href="/"
        className="flex items-center gap-x-3"
        whileHover="hover"
        initial="rest"
        animate="rest"
      >
        <motion.svg
          variants={{ rest: { rotate: 0 }, hover: { rotate: -6 } }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="size-10"
          viewBox="0 0 90 71"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="6"
            y="10"
            width="35"
            className="fill-foreground"
            height="52"
          ></rect>
          <path
            className="fill-background"
            d="M0 0V70.338H89.521V0H0ZM19.184 53.481L12.79 47.085L19.184 40.691L25.578 34.2971C25.578 34.2971 21.681 30.4 19.184 27.903C16.687 25.406 12.79 21.509 12.79 21.509L15.987 18.3115L19.184 15.114L28.7755 24.7055L38.367 34.2971L28.7755 43.889L19.184 53.481Z"
          ></path>
          <rect
            className="animate-pulse fill-phosphor opacity-60"
            x="45"
            y="44"
            width="29"
            height="8"
          ></rect>
        </motion.svg>
        <span className="font-display text-lg font-bold tracking-[0.2em] md:text-2xl">
          DVLPR
        </span>
      </motion.a>

      <div
        className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center md:flex"
        onMouseLeave={() => setHovered(null)}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onMouseEnter={() => setHovered(link.href)}
            className="relative px-4 py-2 font-mono text-sm uppercase tracking-wide text-muted-foreground transition-colors duration-200 hover:text-background"
          >
            {hovered === link.href && (
              <motion.span
                layoutId="nav-hover"
                className="absolute inset-0 -z-10 bg-foreground"
                transition={{ type: "spring", stiffness: 500, damping: 40 }}
              />
            )}
            {link.label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-x-3">
        <a href={"/#contact"} className="hidden md:block">
          <Button size="sm">contact</Button>
        </a>
        {children}
      </div>
    </motion.nav>
  );
};

export default Navbar;
