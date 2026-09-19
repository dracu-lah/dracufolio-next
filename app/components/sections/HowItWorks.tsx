import Reveal from "@/components/common/Reveal";
import DrawLine from "@/components/motion/DrawLine";
import Icon3D from "@/components/motion/Icon3D";
import {
  CallTimer,
  ChatMessage,
  ScopeDocument,
  ShipFlash,
} from "@/components/common/icons";

/**
 * Four steps, headed by the verb rather than by "Step 1". Somebody deciding
 * whether to message a stranger wants to know what happens next, and numbering
 * it like a form makes it feel like more work than it is.
 *
 * The sequence is carried by a rail instead: horizontal behind the icons at
 * `lg`, vertical down the left below it, so the four steps read in order on
 * both shapes without a single number on screen. Each step is one sentence,
 * because the old four-column wall of text was the reason this section felt
 * like work to read.
 */
const STEPS = [
  {
    title: "Message",
    icon: ChatMessage,
    body: "WhatsApp me what you need. A photo of a sketch is enough to start.",
  },
  {
    title: "Talk",
    icon: CallTimer,
    body: "A free twenty minute call, Malayalam or English. If I am wrong for it, I say so.",
  },
  {
    title: "Quote",
    icon: ScopeDocument,
    body: "A written scope and a fixed figure, so nothing gets argued about later.",
  },
  {
    title: "Build",
    icon: ShipFlash,
    body: "A demo you can click every week, in a repository you own.",
  },
];

const HowItWorks = () => (
  <section
    id="how-it-works"
    className="mx-auto max-w-7xl px-6 py-8 md:px-10 md:py-12 lg:px-14"
  >
    <div className="flex flex-col gap-5 md:gap-7">
      <Reveal>
        <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
          How it works
        </h2>
      </Reveal>

      <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {/* The rail. It sits at the vertical centre of the chips and runs
            behind them, so the icons read as stations on one line. */}
        <DrawLine className="absolute top-7 right-0 left-0 hidden h-px bg-border lg:block" />

        {STEPS.map((step, i) => {
          const Glyph = step.icon;
          return (
            <li key={step.title} className="relative">
              <Reveal delay={i * 0.06} className="h-full">
                <div className="flex h-full gap-4 lg:flex-col lg:gap-5">
                  <div className="flex flex-col items-center lg:items-start">
                    {/* The background knocks the rail out behind the chip. */}
                    <span className="relative z-10 inline-flex bg-background lg:pr-5">
                      <Icon3D chip tone="accent">
                        <Glyph className="size-7" />
                      </Icon3D>
                    </span>
                    {/* The rail again, vertical, for the stacked layout. */}
                    {i < STEPS.length - 1 && (
                      <DrawLine
                        vertical
                        className="mt-3 w-px flex-1 bg-border lg:hidden"
                      />
                    )}
                  </div>

                  <div className="flex flex-col gap-2 pb-6 lg:pb-0">
                    <h3 className="font-display text-xl font-bold tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      {step.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </div>
  </section>
);

export default HowItWorks;
