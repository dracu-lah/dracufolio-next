import Reveal from "@/components/common/Reveal";
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
      className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20 lg:px-14"
    >
      <div className="flex flex-col gap-8 md:gap-12">
        <Reveal>
          <Heading className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            {heading}
          </Heading>
        </Reveal>

        <div className="grid overflow-hidden rounded-xl squircle border border-border md:grid-cols-2">
          {services.map((service, i) => {
            const Glyph = GLYPHS[service.icon];
            const isLeftColumn = i % 2 === 0;
            const isLastRow = i >= services.length - 2;
            return (
              <Reveal key={service.slug} delay={(i % 2) * 0.06}>
                <SpotlightCard
                  radius={220}
                  className={`h-full ${i > 0 ? "border-t border-border md:border-t-0" : ""} ${
                    isLeftColumn ? "md:border-r md:border-border" : ""
                  } ${!isLastRow ? "md:border-b md:border-border" : ""}`}
                >
                  <div className="flex h-full flex-col gap-4 p-6 md:p-8">
                    <Icon3D className="text-foreground">
                      <Glyph className="size-8" aria-hidden />
                    </Icon3D>
                    <h3 className="font-display text-xl font-bold tracking-tight">
                      {service.title}
                    </h3>
                    <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                      {service.blurb}
                    </p>
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
