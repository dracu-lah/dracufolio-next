"use client";
import { Button } from "@/components/ui/button";
import { SquircleButton } from "@/components/ui/squircle";
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
import { PropsWithChildren, useEffect, useState } from "react";
import { usePageCtaOnScreen } from "@/components/cta/usePageCtaOnScreen";
import {
  GITHUB_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  WHATSAPP_URL,
} from "@/data/contact";

/**
 * Five links, not six. Open source came off the bar: it is the longest label
 * of the set and it was the first thing to crowd the centre group, and the
 * footer and the about page both still route to it.
 */
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/hire", label: "Hire" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

const Navbar = ({ children }: PropsWithChildren) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  /*
   * A project detail page still counts as "projects", a location page as
   * "hire". Home is matched last, because every path starts with "/" and it
   * would otherwise win every comparison.
   */
  const activeHref =
    navLinks.find(
      (link) => link.href !== "/" && pathname.startsWith(link.href),
    )?.href ?? (pathname === "/" ? "/" : null);
  const highlighted = hovered ?? activeHref;

  /* The page's own WhatsApp button, if it has one in view: the hire hero, the
     closing block at the foot of every inner page. The button below defers to
     it. */
  const pageCtaOnScreen = usePageCtaOnScreen();

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

  /*
   * An open menu had exactly one way out: the Close button. Tapping the page,
   * pressing Escape and navigating all left it hanging over the content.
   * Escape and the route change are handled here, the tap by the scrim below.
   */
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  /*
   * Closing the menu on a route change is an adjustment during render, not an
   * effect. Calling setState inside an effect queues a second render pass, so
   * the menu painted once over the new page before it closed, and the
   * react-hooks rule flags it for exactly that reason.
   */
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

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
      {/* The tap target that closes the menu. It fades rather than appearing,
          so it reads as a layer going over the page instead of a flicker. */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="menu-scrim"
            aria-hidden
            onClick={() => setMenuOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 -z-10 bg-background/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Same container as every page: `max-w-7xl` and the page gutter. The bar
          used to run edge to edge at `px-4`, so on a 1440px screen the logo sat
          112px left of the page's own left edge, the WhatsApp button the same
          distance right of it, and the site read as though nothing was centred.
          The link group below is absolute against the bar, which is the full
          width of the screen, so it stays on the viewport centre either way. */}
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-3 md:px-10 lg:px-14">
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
              className={`relative px-3 py-2 text-base font-medium tracking-wide uppercase transition-colors duration-200 ${
                highlighted === link.href
                  ? "text-accent"
                  : "text-muted-foreground"
              }`}
            >
              {highlighted === link.href && (
                <motion.span
                  layoutId="nav-hover"
                  className="absolute inset-0 -z-10 rounded-lg border border-accent-edge bg-accent-tint"
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
              the contact form.

              `md` and not `sm`: the docked bar is `md:hidden`, so at `sm` this
              button and the bar were both on screen, which is the two WhatsApp
              CTAs at once that the bar exists to prevent.

              It also drops the accent fill while the page's own WhatsApp
              button is on screen. This bar is fixed, so on the hire hero and
              at the foot of every page with a closing block there were two
              accent filled buttons for the same action, a few hundred pixels
              apart. It is the same deference the docked bar makes on a phone.
              The button keeps its place and its size, so nothing moves: it
              stops being the loud one while something louder is in view. */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block"
          >
            <Button variant={pageCtaOnScreen ? "default" : "solid"}>
              <WhatsappLogo className="size-5" />
              WhatsApp
            </Button>
          </a>

          <SquircleButton
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            borderWidth={1}
            fillClassName="bg-background transition-colors"
            className="flex h-11 cursor-pointer items-center gap-2 bg-border px-3.5 text-sm font-medium tracking-[0.06em] uppercase transition-colors duration-200 hover:bg-accent-edge [&>[data-fill]]:hover:bg-accent-tint lg:hidden"
          >
            {menuOpen ? (
              <CloseX className="size-5" />
            ) : (
              <HamburgerMenu className="size-5" />
            )}
            {menuOpen ? "Close" : "Menu"}
          </SquircleButton>
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
            className="overflow-hidden border-t border-border bg-background lg:hidden"
          >
            {/* The panel runs to the bottom of the screen rather than stopping
                where its last link stops: a half-height sheet with the page
                showing under it read as an unfinished dropdown.

                4.3125rem is the bar: a 44px row plus the 12px padding either
                side plus its own border. The height is a real value rather
                than `auto` so the open animation still has something to
                measure, and it scrolls because a phone in landscape has about
                330px of height to give. */}
            <div className="flex h-[calc(100dvh-4.3125rem)] flex-col gap-4 overflow-y-auto px-6 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              {/* The links take the free height and sit in the middle of it.
                  Stacked at the top they left a screen of empty background
                  between the last one and the buttons, which reads as a panel
                  that failed to finish loading. */}
              <div className="flex flex-1 flex-col justify-center gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={activeHref === link.href ? "page" : undefined}
                    className={`flex min-h-14 items-center rounded-lg px-3 text-lg font-medium tracking-wide uppercase transition-colors duration-200 ${
                      activeHref === link.href
                        ? "bg-accent-tint text-accent"
                        : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div
                className="flex flex-col gap-2 border-t border-border pt-4"
                onClick={() => setMenuOpen(false)}
              >
                {/* Call and the resume, not WhatsApp: the docked bar at the
                    bottom of the screen is already carrying that one. */}
                <a href={PHONE_TEL} className="w-full">
                  <Button className="w-full justify-start">
                    <Phone className="size-5" />
                    {PHONE_DISPLAY}
                  </Button>
                </a>
                <span className="[&>a]:w-full [&_button]:w-full [&_button]:justify-start">
                  {children}
                </span>
                {/* GitHub is icon-only from `md` up, which left it with no
                    route at all on the widths this menu covers. */}
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button variant="ghost" className="w-full justify-start">
                    <GithubLogo className="size-5" />
                    GitHub
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
