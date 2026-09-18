import Link from "next/link";
import {
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

const elsewhere = [
  { href: WHATSAPP_URL, label: "WhatsApp", external: true },
  { href: GITHUB_URL, label: "GitHub", external: true },
  { href: LINKEDIN_URL, label: "LinkedIn", external: true },
  { href: X_URL, label: "X", external: true },
  { href: EMAIL_MAILTO, label: "Email", external: false },
  { href: SOURCE_URL, label: "Source", external: true },
];

/** The places worth a footer link: the district, the state, the country. */
const FOOTER_PLACES = ["thrissur", "ernakulam", "palakkad", "kerala", "india"];

const link =
  "transition-colors duration-300 hover:text-foreground";

const Footer = () => {
  const places = FOOTER_PLACES.map((slug) =>
    locations.find((location) => location.slug === slug),
  ).filter((location): location is NonNullable<typeof location> =>
    Boolean(location),
  );

  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 pt-12 md:grid-cols-3 md:px-10 lg:px-14">
        <nav aria-label="Site" className="flex flex-col gap-3">
          <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground">
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

        <nav aria-label="Elsewhere" className="flex flex-col gap-3">
          <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Elsewhere
          </h2>
          <ul className="flex flex-col gap-2 text-base text-muted-foreground">
            {elsewhere.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={link}
                  {...(item.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Where I work" className="flex flex-col gap-3">
          <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground">
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
          <a href={PHONE_TEL} className={`${link} pt-1 font-mono text-base`}>
            {PHONE_DISPLAY}
          </a>
        </nav>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-10 text-base text-muted-foreground md:flex-row md:px-10 lg:px-14">
        <p>
          {"©"} {new Date().getFullYear()} Nevil Krishna K
        </p>
        <p className="flex flex-wrap items-center justify-center gap-x-3">
          <span>Thrissur, Kerala, India</span>
          <span aria-hidden>/</span>
          <span lang="ml">{ml.thrissurKerala}</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
