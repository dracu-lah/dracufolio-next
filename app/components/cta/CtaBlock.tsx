import Badge from "@/components/common/Badge";
import QrPanel from "@/components/common/QrPanel";
import Icon3D from "@/components/motion/Icon3D";
import { Squircle } from "@/components/ui/squircle";
import WhatsAppButton from "./WhatsAppButton";
import { Button } from "@/components/ui/button";
import {
  EnvelopeSimple,
  Phone,
  WhatsappLogo,
} from "@/components/common/icons";
import {
  AVAILABILITY,
  EMAIL,
  EMAIL_MAILTO,
  HOURS,
  PHONE_DISPLAY,
  PHONE_TEL,
  whatsappUrl,
} from "@/data/contact";

/**
 * The closing block on every page that is not the home page, and the last
 * thing most visitors read.
 *
 * It used to be a heading, a sentence and two buttons in a dark rectangle,
 * which asked for a decision while giving nothing to decide with. Now the left
 * side answers the three questions somebody has before messaging a stranger
 * (are you free, how fast do you reply, can we talk in my language) and the
 * right side is the three ways to reach me, ranked, with the QR for the
 * desktop to phone hand off under them.
 */
const CtaBlock = ({
  heading = "Have a project or a role in mind?",
  message,
  className = "",
}: {
  heading?: string;
  message?: string;
  className?: string;
}) => {
  const rows = [
    {
      label: "WhatsApp",
      value: "Fastest, replies same day",
      href: whatsappUrl(message),
      icon: WhatsappLogo,
      external: true,
    },
    {
      label: "Call",
      value: PHONE_DISPLAY,
      href: PHONE_TEL,
      icon: Phone,
      external: false,
    },
    {
      label: "Email",
      value: EMAIL,
      href: EMAIL_MAILTO,
      icon: EnvelopeSimple,
      external: false,
    },
  ];

  return (
    <section
      className={`mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16 lg:px-14 lg:py-20 ${className}`}
    >
      <Squircle
        borderWidth={1}
        fillClassName="bg-card"
        className="grid overflow-hidden bg-border lg:grid-cols-[1.15fr_0.85fr]"
      >
        <div className="flex flex-col gap-5 p-6 md:p-10">
          <div className="flex flex-wrap items-center gap-2">
            {AVAILABILITY.open && (
              <Badge tone="accent" dot>
                {AVAILABILITY.label}
              </Badge>
            )}
            <Badge>Free 20 minute call</Badge>
            <Badge>Malayalam and English</Badge>
          </div>

          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            {heading}
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            Tell me what you are building. You get a fixed scope and a fixed
            figure back, from the person who writes the code.
          </p>
          <p className="font-mono text-sm tracking-[0.14em] text-muted-foreground uppercase">
            {HOURS.display}
          </p>

          <div className="flex w-full flex-col gap-3 pt-1 sm:w-auto sm:flex-row sm:gap-4">
            <WhatsAppButton message={message} size="lg" />
            <a href={PHONE_TEL} className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto">
                <Phone className="size-5" />
                Call
              </Button>
            </a>
          </div>
        </div>

        {/* The three ways to reach me, ranked, then the hand off to a phone. */}
        <div className="flex flex-col gap-5 border-t border-border p-6 md:p-10 lg:border-t-0 lg:border-l">
          <ul className="flex flex-col divide-y divide-border">
            {rows.map((row) => {
              const Glyph = row.icon;
              return (
                <li key={row.label}>
                  <a
                    href={row.href}
                    {...(row.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex items-center gap-4 py-3 first:pt-0"
                  >
                    <Icon3D chip size="sm" tone="accent">
                      <Glyph className="size-5" />
                    </Icon3D>
                    <span className="flex min-w-0 flex-col">
                      <span className="font-mono text-sm tracking-[0.14em] text-muted-foreground uppercase">
                        {row.label}
                      </span>
                      <span className="truncate text-base transition-colors duration-200 group-hover:text-accent">
                        {row.value}
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          <QrPanel
            url={whatsappUrl(message)}
            label="Scan to chat"
            hint="Opens WhatsApp on your phone with the first message written."
          />
        </div>
      </Squircle>
    </section>
  );
};

export default CtaBlock;
