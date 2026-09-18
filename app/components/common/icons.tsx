import {
  ArrowDown2,
  ArrowLeft2,
  ArrowRight2,
  ArrowRight3,
  Call,
  Category,
  CloseCircle,
  CloudConnection,
  Global,
  Location,
  Mobile,
  Monitor,
  Refresh2,
  Sms,
  Speedometer,
  StatusUp,
} from "iconsax-reactjs";
import {
  GithubLogo as PhGithub,
  LinkedinLogo as PhLinkedin,
  WhatsappLogo as PhWhatsapp,
  XLogo as PhX,
} from "@phosphor-icons/react/dist/ssr";

/**
 * The site's icon vocabulary. Call sites import the name that describes the
 * job (`MapPin`, `CaretDown`) rather than the vendor's name, so the set
 * underneath can change without touching twenty components.
 *
 * UI icons are Iconsax at the `Bulk` variant: a solid shape with a second,
 * lighter layer behind it, which reads as depth without a gradient or a
 * shadow. Iconsax is RSC safe (no hooks, no context) so server components can
 * render these directly.
 *
 * Brand marks stay on Phosphor, at duotone so they match. Iconsax has no
 * GitHub, LinkedIn or X at all, and its WhatsApp glyph is a stylised chat
 * bubble rather than the mark people recognise on a button. A logo is dictated
 * by the brand, not by the icon set, so this is the one place where a second
 * family is the right answer.
 *
 * Every export takes the same two props, which matters because some call sites
 * hold a mixed list of these in one array and render it through a single
 * component variable. Nothing passes a vendor prop like `weight` or `variant`.
 */
export type IconProps = {
  className?: string;
  size?: string | number;
};

type IconsaxGlyph = typeof Monitor;
type PhosphorGlyph = typeof PhGithub;

const bulk = (Glyph: IconsaxGlyph, displayName: string) => {
  const Wrapped = ({ className = "size-6", size }: IconProps) => (
    <Glyph
      variant="Bulk"
      color="currentColor"
      className={className}
      {...(size === undefined ? {} : { size: String(size) })}
     
    />
  );
  Wrapped.displayName = displayName;
  return Wrapped;
};

const duotone = (Glyph: PhosphorGlyph, displayName: string) => {
  const Wrapped = ({ className = "size-6", size }: IconProps) => (
    <Glyph
     
      className={className}
      {...(size === undefined ? {} : { size })}
     
    />
  );
  Wrapped.displayName = displayName;
  return Wrapped;
};

/* Services */
export const Browsers = bulk(Monitor, "Browsers");
/** A rising line, for "websites that rank". A magnifier says search, not results. */
export const Ranking = bulk(StatusUp, "Ranking");
export const DeviceMobile = bulk(Mobile, "DeviceMobile");
export const SquaresFour = bulk(Category, "SquaresFour");
export const CloudArrowUp = bulk(CloudConnection, "CloudArrowUp");
export const Gauge = bulk(Speedometer, "Gauge");

/* Contact and navigation */
export const EnvelopeSimple = bulk(Sms, "EnvelopeSimple");
export const Phone = bulk(Call, "Phone");
export const Globe = bulk(Global, "Globe");
/** Exported as MapPin so it cannot collide with the `Location` data type. */
export const MapPin = bulk(Location, "MapPin");
export const ArrowLeft = bulk(ArrowLeft2, "ArrowLeft");
export const ArrowRight = bulk(ArrowRight2, "ArrowRight");
export const CaretDown = bulk(ArrowDown2, "CaretDown");
/** Points out of the site, for a link to somebody else's page. */
export const ArrowUpRight = bulk(ArrowRight3, "ArrowUpRight");
export const CircleNotch = bulk(Refresh2, "CircleNotch");
export const CloseX = bulk(CloseCircle, "CloseX");

/* Brand marks, see the note above. */
export const WhatsappLogo = duotone(PhWhatsapp, "WhatsappLogo");
export const GithubLogo = duotone(PhGithub, "GithubLogo");
export const LinkedinLogo = duotone(PhLinkedin, "LinkedinLogo");
export const XLogo = duotone(PhX, "XLogo");
