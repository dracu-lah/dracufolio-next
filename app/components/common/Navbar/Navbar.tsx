"use client";
import { Button } from "@/components/ui/button";
import {
  CloseX,
  GithubLogo,
  HamburgerMenu,
  Phone,
  WhatsappLogo,
} from "@/components/common/icons";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useState } from "react";
import {
  AVAILABILITY,
  GITHUB_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  WHATSAPP_URL,
} from "@/data/contact";

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
  const [menuOpen, setMenuOpen] = useState(false);
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
      className={`fixed z-50 min-w-full border-b transition-colors duration-300 ${
        isScrolled || menuOpen
          ? "border-border bg-background/90 backdrop-blur-lg"
          : "border-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
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
              className="fill-accent"
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
              className={`relative px-3 py-2 font-mono text-base tracking-wide uppercase transition-colors duration-200 ${
                highlighted === link.href ? "text-accent" : "text-muted-foreground"
              }`}
            >
              {highlighted === link.href && (
                <motion.span
                  layoutId="nav-hover"
                  className="absolute inset-0 -z-10 rounded-lg squircle border border-accent-edge bg-accent-tint"
                  transition={{ type: "spring", stiffness: 500, damping: 40 }}
                />
              )}
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-x-2 md:gap-x-3">
          {/* GitHub is an icon here. At this width the word costs more than it
              says, and the mark is the thing developers scan for. */}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block"
            aria-label="GitHub profile"
          >
            <Button size="icon" aria-hidden>
              <GithubLogo className="size-5" />
            </Button>
          </a>

          <span className="hidden lg:block">{children}</span>

          {/* The one solid button on the page, present at every scroll
              position. It replaced the floating bubble that used to sit over
              the contact form. */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:block"
          >
            <Button variant="solid">
              <WhatsappLogo className="size-5" />
              WhatsApp
            </Button>
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex h-11 cursor-pointer items-center gap-2 rounded-lg squircle border border-border px-3.5 font-mono text-sm tracking-[0.14em] uppercase transition-colors duration-200 hover:border-accent-edge hover:bg-accent-tint lg:hidden"
          >
            {menuOpen ? (
              <CloseX className="size-5" />
            ) : (
              <HamburgerMenu className="size-5" />
            )}
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {/* Below lg there were no navigation links at all, only a logo and a
          resume button, so every other page was unreachable from a phone. */}
      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-border lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={activeHref === link.href ? "page" : undefined}
                  className={`rounded-lg squircle px-3 py-3 font-mono text-base tracking-wide uppercase transition-colors duration-200 ${
                    activeHref === link.href
                      ? "bg-accent-tint text-accent"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div
                className="mt-2 flex flex-col gap-2 border-t border-border pt-4"
                onClick={() => setMenuOpen(false)}
              >
                <a href={PHONE_TEL} className="w-full">
                  <Button className="w-full justify-start">
                    <Phone className="size-5" />
                    {PHONE_DISPLAY}
                  </Button>
                </a>
                <span className="[&>a]:w-full [&_button]:w-full [&_button]:justify-start">
                  {children}
                </span>
                {AVAILABILITY.open && (
                  <p className="px-1 pt-1 font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
                    {AVAILABILITY.label}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
