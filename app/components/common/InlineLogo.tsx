import Image from "next/image";
import { PropsWithChildren } from "react";

/**
 * Small logo shown inline with a company or project name. The image stays in
 * the normal text flow (inline, nudged onto the baseline) so it lines up with
 * the surrounding sentence, and the pair never breaks across two lines.
 */
const InlineLogo = ({ src, children }: PropsWithChildren<{ src: string }>) => (
  <span className="whitespace-nowrap">
    <Image
      src={src}
      alt=""
      aria-hidden
      width={64}
      height={64}
      className="mr-[0.3em] inline-block size-[0.9em] rounded-[0.2em] object-contain align-[-0.1em]"
    />
    {children}
  </span>
);

export default InlineLogo;
