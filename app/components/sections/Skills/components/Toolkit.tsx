import Badge from "@/components/common/Badge";
import Reveal from "@/components/common/Reveal";
import { toolkit } from "@/data/experience";

const Toolkit = () => (
  <Reveal className="w-full">
    <dl className="grid overflow-hidden rounded-xl squircle divide-y divide-border border border-border md:grid-cols-2 md:divide-y-0">
      {toolkit.map((row, i) => (
        <div
          key={row.label}
          className={`flex flex-col gap-2 p-6 ${
            i % 2 === 0 ? "md:border-r md:border-border" : ""
          } ${i < 2 ? "md:border-b md:border-border" : ""}`}
        >
          <dt className="font-mono text-sm tracking-[0.2em] text-muted-foreground uppercase">
            {row.label}
          </dt>
          <dd className="flex flex-wrap gap-1.5">
            {row.items.map((item) => (
              <Badge key={item} size="md">
                {item}
              </Badge>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  </Reveal>
);

export default Toolkit;
