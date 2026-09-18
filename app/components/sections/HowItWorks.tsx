import Reveal from "@/components/common/Reveal";

/**
 * Four steps, headed by the verb rather than by "Step 1". Somebody deciding
 * whether to message a stranger wants to know what happens next, and numbering
 * it like a form makes it feel like more work than it is.
 */
const STEPS = [
  {
    title: "Message",
    body: "WhatsApp me what you need, in as much or as little detail as you have. A photo of a sketch is fine.",
  },
  {
    title: "Talk",
    body: "A twenty minute call, free, in Malayalam or English. I will tell you what it needs, and if I am the wrong person for it I will say so.",
  },
  {
    title: "Quote",
    body: "A written scope and a fixed figure, so there is no argument later about what was included.",
  },
  {
    title: "Build",
    body: "A demo you can click every week, in a repository you own. You see it going wrong early enough to change course.",
  },
];

const HowItWorks = () => (
  <section
    id="how-it-works"
    className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20 lg:px-14"
  >
    <div className="flex flex-col gap-8 md:gap-12">
      <Reveal>
        <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
          How it works
        </h2>
      </Reveal>
      <ol className="grid divide-y divide-border border-t border-b border-border md:grid-cols-4 md:divide-x md:divide-y-0">
        {STEPS.map((step, i) => (
          <li key={step.title}>
            <Reveal delay={i * 0.06} className="h-full">
              <div className="flex h-full flex-col gap-3 py-6 md:px-6 md:py-8 md:first:pl-0">
                <h3 className="font-display text-xl font-bold tracking-tight">
                  {step.title}
                </h3>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default HowItWorks;
