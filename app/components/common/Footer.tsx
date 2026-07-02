const Footer = () => (
  <footer className="border-t border-border">
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground md:flex-row">
      <p>© {new Date().getFullYear()} Nevil Krishna</p>
      <nav className="flex gap-6" aria-label="Footer">
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
