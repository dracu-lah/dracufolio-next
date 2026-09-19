import Contact from "./components/ContactForm";
import Reveal from "@/components/common/Reveal";
import QrPanel from "@/components/common/QrPanel";
import Icon3D from "@/components/motion/Icon3D";
import {
  EnvelopeSimple,
  GithubLogo,
  LinkedinLogo,
  Phone,
  WhatsappLogo,
  XLogo,
  YoutubeLogo,
} from "@/components/common/icons";
import {
  EMAIL,
  EMAIL_MAILTO,
  GITHUB_URL,
  LINKEDIN_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  WHATSAPP_URL,
  X_URL,
  YOUTUBE_URL,
} from "@/data/contact";

/**
 * WhatsApp first, then the phone, then everything else. That order is the
 * whole point: a shop owner in Thrissur will message on WhatsApp and will not
 * fill in a form, and a recruiter will use email. Both are one tap away.
 */
const ROWS = [
  {
    href: WHATSAPP_URL,
    label: "WhatsApp",
    value: PHONE_DISPLAY,
    icon: WhatsappLogo,
    external: true,
  },
  {
    href: PHONE_TEL,
    label: "Phone",
    value: PHONE_DISPLAY,
    icon: Phone,
    external: false,
  },
  {
    href: EMAIL_MAILTO,
    label: "Email",
    value: EMAIL,
    icon: EnvelopeSimple,
    external: false,
  },
  {
    href: LINKEDIN_URL,
    label: "LinkedIn",
    value: "nevil-krishna-k",
    icon: LinkedinLogo,
    external: true,
  },
  {
    href: GITHUB_URL,
    label: "GitHub",
    value: "dracu-lah",
    icon: GithubLogo,
    external: true,
  },
  {
    href: X_URL,
    label: "X",
    value: "@nevilkrishnak",
    icon: XLogo,
    external: true,
  },
  {
    href: YOUTUBE_URL,
    label: "YouTube",
    value: "@nevilkrishnak4064",
    icon: YoutubeLogo,
    external: true,
  },
];

const ContactSection = ({ asPage = false }: { asPage?: boolean }) => {
  const Heading = asPage ? "h1" : "h2";
  return (
    <section
      id="contact"
      className="mx-auto max-w-7xl px-6 py-8 md:px-10 md:py-12 lg:px-14"
    >
      {/* Equal halves. The 0.9/1.1 split made the form wider than the column
          beside it, so the two sides never lined up at the bottom. */}
      <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="flex w-full flex-col items-start gap-6">
          <Reveal delay={0.08}>
            <Heading className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Contact
            </Heading>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              Open to full time roles, freelance projects and remote contracts.
              WhatsApp is fastest.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="w-full">
            <ul className="w-full divide-y divide-border border-t border-b border-border">
              {ROWS.map(({ href, label, value, icon: Glyph, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex items-center gap-4 py-3.5 text-base transition-colors duration-300 hover:text-accent md:text-lg"
                  >
                    <Icon3D chip size="sm" tone="accent">
                      <Glyph className="size-5" />
                    </Icon3D>
                    <span className="flex flex-1 flex-wrap items-baseline gap-x-3">
                      <span className="text-base text-muted-foreground">
                        {label}
                      </span>
                      <span>{value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.24} className="mt-auto w-full">
            <QrPanel
              url={WHATSAPP_URL}
              label="Scan to chat"
              hint="Point your phone camera here to open WhatsApp."
            />
          </Reveal>
        </div>

        <Reveal delay={0.15} className="w-full">
          <Contact />
        </Reveal>
      </div>
    </section>
  );
};

export default ContactSection;
