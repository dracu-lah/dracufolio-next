import Reveal from "@/components/common/Reveal";
import { CaretDown, WhatsappLogo } from "@/components/common/icons";
import Icon3D from "@/components/motion/Icon3D";
import { WHATSAPP_URL } from "@/data/contact";
import type { Faq as FaqItem } from "@/data/faq";

/**
 * A native <details> accordion. No state, no JavaScript, works before hydration
 * and with the keyboard for free, and the answer text is in the DOM whether or
 * not it is open, which is what makes it worth anything to a crawler.
 *
 * Opening and closing is animated in globals.css through `::details-content`,
 * so the height transition costs nothing at runtime and degrades to the old
 * instant open on a browser that does not support it yet.
 *
 * Every answer opens with the direct reply in its first sentence, because that
 * sentence is what a rich result and an AI assistant lift.
 */
const Faq = ({
  faqs,
  heading = "Questions",
  id = "faq",
}: {
  faqs: FaqItem[];
  heading?: string;
  id?: string;
}) => (
  <section
    id={id}
    className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16 lg:px-14 lg:py-20"
  >
    <div className="grid items-start gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:gap-16">
      <Reveal>
        <div className="flex flex-col gap-6 lg:sticky lg:top-28">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            {heading}
          </h2>
          {/* The column beside a ten row accordion was empty at every width
              above lg. A question that is not on the list has somewhere to go
              now, which is the whole point of the section. */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden max-w-xs items-start gap-4 rounded-xl border border-border bg-card p-5 transition-colors duration-300 hover:border-accent-edge lg:flex"
          >
            <Icon3D chip size="sm" tone="accent">
              <WhatsappLogo className="size-5" />
            </Icon3D>
            <span className="flex flex-col gap-1">
              <span className="font-mono text-sm tracking-[0.14em] uppercase transition-colors duration-300 group-hover:text-accent">
                Not on the list
              </span>
              <span className="text-base leading-relaxed text-muted-foreground">
                Ask it on WhatsApp. Answered the same day.
              </span>
            </span>
          </a>
        </div>
      </Reveal>

      <dl className="divide-y divide-border border-t border-b border-border">
        {faqs.map((faq, i) => (
          <div key={faq.q}>
            <details className="group" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-4 text-lg font-medium marker:content-none group-hover:text-accent md:text-xl">
                <dt className="transition-colors duration-200">{faq.q}</dt>
                <CaretDown className="mt-1 size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-180 group-hover:text-accent" />
              </summary>
              <dd className="pb-5 text-base leading-relaxed text-muted-foreground md:text-lg">
                {faq.a}
              </dd>
            </details>
          </div>
        ))}
      </dl>
    </div>
  </section>
);

export default Faq;
