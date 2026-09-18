import Link from "next/link";
import Badge from "@/components/common/Badge";
import Icon3D from "@/components/motion/Icon3D";
import {
  EnvelopeSimple,
  GithubLogo,
  LinkedinLogo,
  Phone,
  WhatsappLogo,
  XLogo,
} from "@/components/common/icons";
import {
  AVAILABILITY,
  EMAIL,
  EMAIL_MAILTO,
  GITHUB_URL,
  LINKEDIN_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  SOURCE_URL,
  WHATSAPP_URL,
  X_URL,
} from "@/data/contact";
import { ml } from "@/data/ml";
import { locations } from "@/data/locations";

const pages = [
  { href: "/hire", label: "Hire me" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/open-source", label: "Open Source" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

/** The marks people look for. Labelled for screen readers, icon only on screen. */
const socials = [
  { href: WHATSAPP_URL, label: "WhatsApp", icon: WhatsappLogo },
  { href: GITHUB_URL, label: "GitHub", icon: GithubLogo },
  { href: LINKEDIN_URL, label: "LinkedIn", icon: LinkedinLogo },
  { href: X_URL, label: "X", icon: XLogo },
  { href: EMAIL_MAILTO, label: "Email", icon: EnvelopeSimple },
];

/** The places worth a footer link: the district, the state, the country. */
const FOOTER_PLACES = ["thrissur", "ernakulam", "palakkad", "kerala", "india"];

const link =
  "inline-flex items-center gap-2 transition-colors duration-200 hover:text-accent";

/**
 * The footer is the last chance to be useful, so it carries the two things a
 * visitor at the bottom of the page still wants: how to reach me, and where
 * else to look. Three columns of plain text links did neither.
 *
 * The social marks are icon buttons rather than a word list, because a mark is
 * recognised faster than its name and five words in a column read as filler.
 */
const Footer = () => {
  const places = FOOTER_PLACES.map((slug) =>
    locations.find((location) => location.slug === slug),
  ).filter((location): location is NonNullable<typeof location> =>
    Boolean(location),
  );

  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 pt-12 md:grid-cols-[1.3fr_1fr_1fr] md:px-10 lg:px-14">
        <div className="flex flex-col items-start gap-4">
          <Link
            href="/"
            className="font-display text-xl font-bold tracking-[0.2em]"
          >
            DVLPR
          </Link>
          <p className="max-w-xs text-base leading-relaxed text-muted-foreground">
            Nevil Krishna K. Full stack developer in Thrissur, Kerala, working
            remotely across India.
          </p>
          {AVAILABILITY.open && (
            <Badge tone="accent" dot>
              {AVAILABILITY.label}
            </Badge>
          )}
          <div className="flex flex-col gap-2 pt-1 text-base text-muted-foreground">
            <a href={PHONE_TEL} className={`${link} font-mono`}>
              <Phone className="size-4" />
              {PHONE_DISPLAY}
            </a>
            <a href={EMAIL_MAILTO} className={link}>
              <EnvelopeSimple className="size-4" />
              {EMAIL}
            </a>
          </div>
        </div>

        <nav aria-label="Site" className="flex flex-col gap-3">
          <h2 className="font-mono text-sm tracking-[0.2em] text-muted-foreground uppercase">
            Pages
          </h2>
          <ul className="flex flex-col gap-2 text-base text-muted-foreground">
            {pages.map((page) => (
              <li key={page.href}>
                <Link href={page.href} className={link}>
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Where I work" className="flex flex-col gap-3">
          <h2 className="font-mono text-sm tracking-[0.2em] text-muted-foreground uppercase">
            Hire a developer in
          </h2>
          <ul className="flex flex-col gap-2 text-base text-muted-foreground">
            {places.map((place) => (
              <li key={place.slug}>
                <Link href={`/hire/${place.slug}`} className={link}>
                  {place.name}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={SOURCE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${link} pt-1 font-mono text-sm text-muted-foreground`}
          >
            <GithubLogo className="size-4" />
            Source of this site
          </a>
        </nav>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col items-center justify-between gap-5 border-t border-border px-6 py-8 text-base text-muted-foreground md:flex-row md:px-10 lg:px-14">
        <div className="flex items-center gap-2">
          {socials.map(({ href, label, icon: Glyph }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              {...(href.startsWith("mailto:")
                ? {}
                : { target: "_blank", rel: "noopener noreferrer" })}
              className="text-muted-foreground transition-colors duration-200 hover:text-accent"
            >
              <Icon3D chip size="sm">
                <Glyph className="size-5" />
              </Icon3D>
            </a>
          ))}
        </div>

        <div className="flex flex-col items-center gap-1 md:items-end">
          <p>
            {"©"} {new Date().getFullYear()} Nevil Krishna K
          </p>
          <p className="flex flex-wrap items-center justify-center gap-x-3 text-sm">
            <span>Thrissur, Kerala, India</span>
            <span aria-hidden>/</span>
            <span lang="ml">{ml.thrissurKerala}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
