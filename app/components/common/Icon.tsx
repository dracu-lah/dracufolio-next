import type { ComponentProps } from "react";
import type { PhosphorIcon } from "./icons";

/**
 * Every icon on the site goes through here so the weight is set once. Duotone
 * is the whole reason: the second, lighter layer reads as a front face over a
 * back face, which is the 3D feel without a gradient or a drop shadow.
 */
const Icon = ({
  as: Glyph,
  className = "size-6",
  ...props
}: { as: PhosphorIcon } & ComponentProps<PhosphorIcon>) => (
  <Glyph weight="duotone" className={className} aria-hidden {...props} />
);

export default Icon;
