import Link from "next/link";

const pages = [
  { href: "/projects", label: "Projects" },
  { href: "/open-source", label: "Open Source" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const Footer = () => (
  <footer className="border-t border-border">
    <nav
      aria-label="Site"
      className="mx-auto flex max-w-6xl flex-wrap gap-x-6 gap-y-3 px-6 pt-8 text-sm text-muted-foreground"
    >
      {pages.map((page) => (
        <Link
          key={page.href}
          href={page.href}
          className="transition-colors duration-300 hover:text-foreground"
        >
          {page.label}
        </Link>
      ))}
    </nav>
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground md:flex-row">
      <p>© {new Date().getFullYear()} Nevil Krishna</p>
      <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2" aria-label="Elsewhere">
        <a
          className="transition-colors duration-300 hover:text-foreground"
          href="https://github.com/dracu-lah"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          className="transition-colors duration-300 hover:text-foreground"
          href="https://www.linkedin.com/in/nevil-krishna-k-77170222a/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a
          className="transition-colors duration-300 hover:text-foreground"
          href="mailto:nevilkrishna@gmail.com"
        >
          Email
        </a>
        <a
          className="transition-colors duration-300 hover:text-foreground"
          href="https://github.com/dracu-lah/dracufolio-next"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source
        </a>
      </nav>
    </div>
  </footer>
);

export default Footer;
