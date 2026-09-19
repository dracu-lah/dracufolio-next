import Link from "next/link";
import { ArrowLeft } from "./icons";

const BackLink = ({
  href = "/",
  label = "Home",
}: {
  href?: string;
  label?: string;
}) => (
  <Link
    href={href}
    className="inline-flex items-center gap-2 text-base text-muted-foreground transition-colors duration-300 hover:text-accent"
  >
    <ArrowLeft className="size-5" />
    {label}
  </Link>
);

export default BackLink;
