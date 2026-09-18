import { qrSvg } from "@/lib/qr";

/**
 * Hand-off from a desktop to a phone. Somebody reading a project page on a
 * laptop cannot install an Android app or open a WhatsApp chat from there, so
 * the page offers the code instead of asking them to type a URL on a phone.
 *
 * Hidden below `md` on purpose: a QR code on the device you are already
 * holding is decoration, and decoration is not what this is for.
 */
const QrPanel = async ({
  url,
  label,
  hint,
  className = "",
}: {
  url: string;
  label: string;
  hint?: string;
  className?: string;
}) => {
  const svg = await qrSvg(url);

  return (
    <figure
      className={`hidden items-center gap-4 rounded-xl squircle border border-border bg-card p-4 md:flex ${className}`}
    >
      <div
        className="size-24 shrink-0 rounded-md squircle bg-white p-2"
        // Generated from `url` at build time, never from user input.
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      <figcaption className="flex flex-col gap-1">
        <span className="font-mono text-sm uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </span>
        {hint && (
          <span className="max-w-50 text-sm leading-relaxed text-muted-foreground">
            {hint}
          </span>
        )}
      </figcaption>
    </figure>
  );
};

export default QrPanel;
