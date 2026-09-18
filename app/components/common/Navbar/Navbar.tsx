"use client";
import { Button } from "@/components/ui/button";
import { GithubLogo } from "@/components/common/icons";
import {
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useState } from "react";
import { GITHUB_URL } from "@/data/contact";

const navLinks = [
  { href: "/hire", label: "hire" },
  { href: "/projects", label: "projects" },
  { href: "/blog", label: "blog" },
  { href: "/about", label: "about" },
  { href: "/open-source", label: "open source" },
];

const Navbar = ({ children }: PropsWithChildren) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const pathname = usePathname();

  // A project detail page still counts as "projects", a location page as "hire".
  const activeHref =
    navLinks.find((link) => pathname.startsWith(link.href))?.href ??
    (pathname === "/" ? "/" : null);
  const highlighted = hovered ?? activeHref;

  /**
   * Scroll state comes from useScroll rather than a window scroll listener.
   * The old listener called setState on every frame of every scroll, which
   * re-rendered the whole navbar sixty times a second to change one border
   * colour. This fires once per crossing of the threshold.
   */
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    const scrolled = latest > 8;
    setIsScrolled((was) => (was === scrolled ? was : scrolled));
  });

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
        aria-label="Home"
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
            className="fill-foreground opacity-40"
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
        className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center lg:flex"
        onMouseLeave={() => setHovered(null)}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onMouseEnter={() => setHovered(link.href)}
            aria-current={activeHref === link.href ? "page" : undefined}
            className={`relative px-3 py-2 font-mono text-base uppercase tracking-wide transition-colors duration-200 ${
              highlighted === link.href
                ? "text-background"
                : "text-muted-foreground"
            }`}
          >
            {highlighted === link.href && (
              <motion.span
                layoutId="nav-hover"
                className="absolute inset-0 -z-10 rounded-lg squircle bg-foreground"
                transition={{ type: "spring", stiffness: 500, damping: 40 }}
              />
            )}
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-x-2 md:gap-x-3">
        {/* No WhatsApp button here. The floating one is on screen at every
            scroll position already, so a second one in the navbar put two
            links with the same accessible name on the page at once and gave a
            390px navbar three buttons. */}
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block"
          aria-label="GitHub profile"
        >
          <Button className="h-full">
            <GithubLogo className="size-4" />
            GitHub
          </Button>
        </a>
        {children}
      </div>
    </motion.nav>
  );
};

export default Navbar;
