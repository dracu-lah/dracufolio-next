import Reveal from "@/components/common/Reveal";
import { Squircle } from "@/components/ui/squircle";
import Icon3D from "@/components/motion/Icon3D";
import SpotlightCard from "@/components/motion/SpotlightCard";
import {
  Browsers,
  CloudArrowUp,
  DeviceMobile,
  Gauge,
  Ranking,
  SquaresFour,
} from "@/components/common/icons";
import { services } from "@/data/services";

/**
 * Six services on a two column rhythm inside one bordered block, rather than a
 * row of three floating cards. Grouping by border instead of elevation keeps
 * the flat-surface rule and stops the section reading as a pricing table.
 */
/** How many of the six show on a phone. The rest are `md` and up. */
const PHONE_LIMIT = 4;

const GLYPHS = {
  Browsers,
  Ranking,
  DeviceMobile,
  SquaresFour,
  CloudArrowUp,
  Gauge,
} as const;

const Services = ({
  asPage = false,
  heading = "What I build",
}: {
  asPage?: boolean;
  heading?: string;
}) => {
  const Heading = asPage ? "h2" : "h2";

  return (
    <section
      id="services"
      className="mx-auto max-w-7xl px-6 py-8 md:px-10 md:py-12 lg:px-14"
    >
      <div className="flex flex-col gap-5 md:gap-7">
        <Reveal>
          <Heading className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            {heading}
          </Heading>
        </Reveal>

        <Squircle
          borderWidth={1}
          fillClassName="bg-background"
          className="grid overflow-hidden bg-border md:grid-cols-2"
        >
          {services.map((service, i) => {
            const Glyph = GLYPHS[service.icon];
            const isLeftColumn = i % 2 === 0;
            const isLastRow = i >= services.length - 2;
            /*
             * Six of these in one column is most of a phone screen of cards
             * that all say the same thing in a different noun. The last two
             * stay on the desktop, where they cost one row of a two column
             * grid instead of two more screens of scrolling.
             */
            const phoneHidden = i >= PHONE_LIMIT ? "hidden md:block" : "";
            return (
              <Reveal
                key={service.slug}
                delay={(i % 2) * 0.06}
                className={phoneHidden}
              >
                {/*
                  The divider sits on the padded child, not on the clipped card,
                  and the card is clipped at radius 0. A clip-path is measured
                  from clientWidth, which excludes the border, so a border on a
                  clipped element is cut off by exactly its own width and
                  disappears. That is what ate every divider in this block.
                */}
                <SpotlightCard radius={220} cornerRadius={0} className="h-full">
                  <div
                    className={`flex h-full flex-col gap-5 p-6 md:p-8 ${
                      i > 0 ? "border-t border-border md:border-t-0" : ""
                    } ${isLeftColumn ? "md:border-r md:border-border" : ""} ${
                      !isLastRow ? "md:border-b md:border-border" : ""
                    }`}
                  >
                    <Icon3D chip size="lg" className="text-foreground">
                      <Glyph className="size-8 md:size-9" />
                    </Icon3D>
                    <div className="flex flex-col gap-2">
                      <h3 className="font-display text-xl font-bold tracking-tight">
                        {service.title}
                      </h3>
                      <p className="text-base leading-relaxed text-muted-foreground">
                        {service.blurb}
                      </p>
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </Squircle>
      </div>
    </section>
  );
};

export default Services;
