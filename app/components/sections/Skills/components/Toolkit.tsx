import Reveal from "@/components/common/Reveal";
import { toolkit } from "@/data/experience";

const Toolkit = () => (
  <Reveal className="w-full">
    <dl className="grid overflow-hidden rounded-xl squircle divide-y divide-border border border-border md:grid-cols-2 md:divide-y-0">
      {toolkit.map((row, i) => (
        <div
          key={row.label}
          className={`flex flex-col gap-2 px-5 py-5 md:px-6 ${
            i % 2 === 0 ? "md:border-r md:border-border" : ""
          } ${i < 2 ? "md:border-b md:border-border" : ""}`}
        >
          <dt className="font-mono text-sm uppercase tracking-[0.25em] text-muted-foreground">
            {row.label}
          </dt>
          <dd className="text-base leading-relaxed md:text-lg">{row.value}</dd>
        </div>
      ))}
    </dl>
  </Reveal>
);

export default Toolkit;
