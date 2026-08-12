import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const BackLink = ({
  href = "/",
  label = "home",
}: {
  href?: string;
  label?: string;
}) => (
  <Link
    href={href}
    className="inline-flex items-center gap-2 font-mono text-base uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
  >
    <ArrowLeft className="size-4" aria-hidden />
    {label}
  </Link>
);

export default BackLink;
