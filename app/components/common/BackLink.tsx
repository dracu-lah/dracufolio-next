import Link from "next/link";
import { ArrowLeft } from "./icons";

const BackLink = ({
  href = "/",
  label = "home",
}: {
  href?: string;
  label?: string;
}) => (
  <Link
    href={href}
    className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
  >
    <ArrowLeft weight="duotone" className="size-4" aria-hidden />
    {label}
  </Link>
);

export default BackLink;
