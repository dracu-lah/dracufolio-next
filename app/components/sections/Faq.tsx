import Reveal from "@/components/common/Reveal";
import { CaretDown } from "@/components/common/icons";
import type { Faq as FaqItem } from "@/data/faq";

/**
 * A native <details> accordion. No state, no JavaScript, works before hydration
 * and with the keyboard for free, and the answer text is in the DOM whether or
 * not it is open, which is what makes it worth anything to a crawler.
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
    className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20 lg:px-14"
  >
    <div className="grid items-start gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:gap-16">
      <Reveal>
        <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl lg:sticky lg:top-28">
          {heading}
        </h2>
      </Reveal>

      <dl className="divide-y divide-border border-t border-b border-border">
        {faqs.map((faq) => (
          <div key={faq.q}>
            <details className="group">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-lg font-medium marker:content-none md:text-xl">
                <dt>{faq.q}</dt>
                <CaretDown
                  weight="duotone"
                  aria-hidden
                  className="mt-1 size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-180"
                />
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
