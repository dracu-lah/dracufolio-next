import Badge from "@/components/common/Badge";
import { Squircle } from "@/components/ui/squircle";
import Reveal from "@/components/common/Reveal";
import { toolkit } from "@/data/experience";

/** Rows that show on a phone. The rest are `md` and up. */
const PHONE_ROWS = 2;

const Toolkit = () => (
  <Reveal className="w-full">
    <Squircle
      as="dl"
      borderWidth={1}
      fillClassName="bg-background"
      className="grid divide-y divide-border overflow-hidden bg-border md:grid-cols-2 md:divide-y-0"
    >
      {toolkit.map((row, i) => (
        /*
         * Two of the four rows on a phone. Four rows of wrapped badges is
         * roughly a screen and a half of chips before the work history starts,
         * and the two that go are the ones somebody scrolling a phone is least
         * likely to be checking. On a desktop they cost one grid row.
         */
        <div
          key={row.label}
          className={`flex flex-col gap-2 p-6 ${
            i >= PHONE_ROWS ? "hidden md:flex" : ""
          } ${i % 2 === 0 ? "md:border-r md:border-border" : ""} ${
            i < 2 ? "md:border-b md:border-border" : ""
          }`}
        >
          <dt className="text-base text-muted-foreground">{row.label}</dt>
          <dd className="flex flex-wrap gap-1.5">
            {row.items.map((item) => (
              <Badge key={item} size="md">
                {item}
              </Badge>
            ))}
          </dd>
        </div>
      ))}
    </Squircle>
  </Reveal>
);

export default Toolkit;
