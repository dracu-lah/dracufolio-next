import { WhatsappLogo } from "@/components/common/icons";
import Magnetic from "@/components/motion/Magnetic";
import { Button } from "@/components/ui/button";
import { whatsappUrl } from "@/data/contact";

/**
 * The primary action, everywhere. One label for one intent: this button always
 * says "WhatsApp", never "Get in touch" or "Let's talk", so a returning
 * visitor recognises it without reading it.
 *
 * `message` prefills the chat so the first line says which page it came from.
 */
const WhatsAppButton = ({
  message,
  size,
  className = "",
  magnetic = true,
}: {
  message?: string;
  size?: "default" | "lg";
  className?: string;
  magnetic?: boolean;
}) => {
  const link = (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={className || "w-full sm:w-auto"}
    >
      <Button variant="solid" size={size} className="w-full sm:w-auto">
        <WhatsappLogo weight="duotone" className="size-5" aria-hidden />
        WhatsApp
      </Button>
    </a>
  );

  return magnetic ? <Magnetic className="w-full sm:w-auto">{link}</Magnetic> : link;
};

export default WhatsAppButton;
