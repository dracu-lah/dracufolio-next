import { qrSvg } from "@/lib/qr";
import QrTile from "./QrTile";

/**
 * Hand-off from a desktop to a phone. Somebody reading a project page on a
 * laptop cannot install an Android app or open a WhatsApp chat from there, so
 * the page offers the code instead of asking them to type a URL on a phone.
 *
 * Hidden below `md` on purpose: a QR code on the device you are already
 * holding is decoration, and decoration is not what this is for.
 *
 * The code is generated here, on the server, at build time. The tile that
 * renders it is a client component only because clicking it opens the code at
 * a size a phone can actually read across a desk.
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
    <QrTile
      svg={svg}
      url={url}
      label={label}
      hint={hint}
      className={className}
    />
  );
};

export default QrPanel;
