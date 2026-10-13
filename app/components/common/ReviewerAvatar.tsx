"use client";

import Image from "next/image";
import { useState } from "react";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

/**
 * The reviewer's Google profile photo, with their initials underneath as the
 * fallback. A client component for one reason: Google retires an avatar URL
 * when the person changes their photo, and only the browser finds that out,
 * so `onError` has to be able to swap in the initials instead of leaving a
 * broken image on the card.
 *
 * `unoptimized` because Google already serves the photo at the size asked
 * for in the URL (`=s96-c`, twice the 48px it is drawn at). Sending it through
 * the image optimiser as well would need a remote pattern for Google's host,
 * which is exactly the surface the September Next.js image advisories were
 * about, and spend optimiser quota on a 3 KB file. `no-referrer` because
 * Google's photo host refuses some cross-site requests that carry one.
 */
const ReviewerAvatar = ({ name, src }: { name: string; src?: string }) => {
  const [failed, setFailed] = useState(false);

  return (
    <span
      aria-hidden
      className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-secondary text-base font-medium text-muted-foreground"
    >
      {initials(name)}
      {src && !failed && (
        <Image
          src={`${src}=s96-c`}
          alt=""
          width={48}
          height={48}
          unoptimized
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setFailed(true)}
          className="absolute inset-0 size-full object-cover"
        />
      )}
    </span>
  );
};

export default ReviewerAvatar;
