import QrPanel from "@/components/common/QrPanel";
import Icon3D from "@/components/motion/Icon3D";
import { Squircle } from "@/components/ui/squircle";
import WhatsAppButton from "./WhatsAppButton";
import { Button } from "@/components/ui/button";
import { EnvelopeSimple, Phone } from "@/components/common/icons";
import {
  EMAIL,
  EMAIL_MAILTO,
  PHONE_DISPLAY,
  PHONE_TEL,
  whatsappUrl,
} from "@/data/contact";

/**
 * The closing block on every page that is not the home page, and the last
 * thing most visitors read.
 *
 * The left side asks for the message and the right side is the other ways to
 * reach me, with the QR for the desktop to phone hand off under them. WhatsApp
 * is deliberately not in that list: it is already the button on the left, and
 * the same label twice inside one card is the repetition this card was
 * supposed to resolve.
 */
const CtaBlock = ({
  heading = "Have a project or a role in mind?",
  message,
  bare = false,
  className = "",
}: {
  heading?: string;
  message?: string;
  /**
   * Drops the page gutter and the max width, for a caller that already has a
   * reading column of its own. It is a flag rather than a `px-0` passed in a
   * class, because two padding utilities on one element are resolved by the
   * order of the stylesheet and not by the order of the attribute, so the
   * override lost every time.
   */
  bare?: boolean;
  className?: string;
}) => {
  const rows = [
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
    /*
     * A container query, not a viewport one. This card is dropped into a
     * full-width page section and into the 768px reading column of a blog
     * post, and `lg:` only knows about the window: on a desktop the post
     * version was splitting a 720px column into two 330px halves and breaking
     * the contact rows. `@container` makes it answer to the space it is
     * actually given.
     */
    <section
      className={`@container ${
        bare
          ? "w-full py-8 md:py-12"
          : "mx-auto max-w-7xl px-6 py-8 md:px-10 md:py-12 lg:px-14"
      } ${className}`}
    >
      <Squircle
        borderWidth={1}
        fillClassName="bg-card"
        className="grid overflow-hidden bg-border @4xl:grid-cols-2"
      >
        {/*
          The right column is the taller of the two (three rows plus the QR
          tile), so it sets the card height and this one centres against it.
          Without that, losing the badge row left the heading pinned to the top
          with a block of dead card under the buttons.
        */}
        <div className="flex flex-col justify-center gap-5 p-5 @4xl:p-7">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            {heading}
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
            Tell me what you are building. You get a fixed scope and a fixed
            figure back, from the person who writes the code.
          </p>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
            <WhatsAppButton message={message} size="lg" />
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a href={PHONE_TEL}>
                <Phone className="size-5" />
                Call
              </a>
            </Button>
          </div>
        </div>

        {/* The other ways to reach me, then the hand off to a phone. */}
        <div className="flex flex-col gap-5 border-t border-border p-5 @4xl:border-t-0 @4xl:border-l @4xl:p-7">
          <ul className="flex flex-col gap-3">
            {rows.map((row) => {
              const Glyph = row.icon;
              return (
                <li key={row.label}>
                  <a
                    href={row.href}
                    {...(row.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex items-center gap-4"
                  >
                    <Icon3D chip size="sm" tone="accent">
                      <Glyph className="size-5" />
                    </Icon3D>
                    <span className="flex min-w-0 flex-col">
                      <span className="text-base text-muted-foreground">
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
            hint="Opens WhatsApp on your phone."
          />
        </div>
      </Squircle>
    </section>
  );
};

export default CtaBlock;
