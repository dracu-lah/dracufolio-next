import Link from "next/link";
import { Button } from "@/components/ui/button";
import QrPanel from "@/components/common/QrPanel";
import WhatsAppButton from "./WhatsAppButton";
import { PHONE_DISPLAY, PHONE_TEL, whatsappUrl } from "@/data/contact";
import { HOURS } from "@/data/contact";

/**
 * The same closing block at the end of every page that is not the home page.
 * Two actions and the number, nothing else. The QR is the desktop-to-phone
 * hand-off: reading on a laptop, messaging from a phone.
 */
const CtaBlock = ({
  heading = "Have a project or a role in mind?",
  message,
  className = "",
}: {
  heading?: string;
  message?: string;
  className?: string;
}) => (
  <section
    className={`mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20 lg:px-14 ${className}`}
  >
    <div className="flex flex-col gap-8 rounded-xl squircle border border-border bg-card p-6 md:p-10 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-col gap-4">
        <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
          {heading}
        </h2>
        <p className="max-w-xl leading-relaxed text-muted-foreground md:text-lg">
          WhatsApp is fastest. Call{" "}
          <a
            href={PHONE_TEL}
            className="text-foreground underline underline-offset-4"
          >
            {PHONE_DISPLAY}
          </a>{" "}
          if you would rather talk. {HOURS.display}.
        </p>
        <div className="flex w-full flex-col gap-3 pt-2 sm:w-auto sm:flex-row sm:gap-4">
          <WhatsAppButton message={message} size="lg" />
          <Link href="/hire" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto">
              Hire me
            </Button>
          </Link>
        </div>
      </div>
      <QrPanel
        url={whatsappUrl(message)}
        label="Scan to chat"
        hint="Opens WhatsApp on your phone with the first message already written."
        className="shrink-0"
      />
    </div>
  </section>
);

export default CtaBlock;
