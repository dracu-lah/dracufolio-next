import Image from "next/image";

/**
 * Small logo shown inline with a company or project name. Sized in `em` so it
 * tracks whatever text it sits in.
 */
const InlineLogo = ({ src, alt }: { src: string; alt: string }) => (
  <Image
    src={src}
    alt={alt}
    width={64}
    height={64}
    className="mr-[0.35em] inline-block size-[1.1em] shrink-0 translate-y-[0.12em] rounded-[0.25em] object-contain align-baseline"
  />
);

export default InlineLogo;
