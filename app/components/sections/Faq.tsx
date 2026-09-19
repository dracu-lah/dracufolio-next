import Reveal from "@/components/common/Reveal";
import {
  ArrowUpRight,
  CaretDown,
  WhatsappLogo,
} from "@/components/common/icons";
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
    className="mx-auto max-w-7xl px-6 py-8 md:px-10 md:py-12 lg:px-14"
  >
    <div className="grid items-start gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:gap-16">
      <Reveal>
        <div className="flex flex-col gap-6 lg:sticky lg:top-28">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            {heading}
          </h2>
          {/*
            This was an icon chip, an uppercase eyebrow and an explainer line
            inside a bordered box: the exact shape every generated portfolio
            uses for a small aside, and three pieces of chrome around one
            sentence. It is a sentence and a link now, hung off a rule, which
            is what it always was.

            Still `lg` only. Below that the docked WhatsApp bar is on screen,
            and two WhatsApp CTAs at once is the thing that bar exists to stop.
          */}
          <div className="hidden max-w-xs flex-col gap-3 border-t border-border pt-5 lg:flex">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Something not answered here? Ask it directly, and you get an
              answer the same day.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 self-start text-lg font-medium text-foreground underline decoration-border underline-offset-[6px] transition-colors duration-200 hover:text-accent hover:decoration-accent-edge"
            >
              <WhatsappLogo className="size-5 text-accent" />
              WhatsApp
              <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </div>
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
