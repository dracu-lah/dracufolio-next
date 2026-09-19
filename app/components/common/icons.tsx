import {
  Add,
  Award,
  ArrowDown2,
  ArrowLeft2,
  ArrowRight2,
  ArrowRight3,
  ArrowUp2,
  Briefcase,
  Calendar,
  Call,
  Category,
  Clock,
  CloseCircle,
  CloudConnection,
  Code1,
  Copy,
  DocumentDownload,
  DocumentText,
  Flash,
  Global,
  Link2,
  Location,
  HamburgerMenu as IconsaxHamburger,
  Message,
  Mobile,
  Monitor,
  Play,
  Refresh2,
  SearchNormal,
  Send2,
  Sms,
  Speedometer,
  StatusUp,
  Tag,
  TickCircle,
  Timer,
  Verify,
} from "iconsax-reactjs";
import {
  GithubLogo as PhGithub,
  LinkedinLogo as PhLinkedin,
  WhatsappLogo as PhWhatsapp,
  XLogo as PhX,
  YoutubeLogo as PhYoutube,
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
 * Brand marks stay on Phosphor, at duotone so they match the Bulk two-layer
 * look. Iconsax has no GitHub, LinkedIn or X at all, and its WhatsApp glyph is
 * a stylised chat bubble rather than the mark people recognise on a button. A
 * logo is dictated by the brand, not by the icon set, so this is the one place
 * where a second family is the right answer.
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
      weight="duotone"
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
export const CaretUp = bulk(ArrowUp2, "CaretUp");
/** Points out of the site, for a link to somebody else's page. */
export const ArrowUpRight = bulk(ArrowRight3, "ArrowUpRight");
export const CircleNotch = bulk(Refresh2, "CircleNotch");
export const CloseX = bulk(CloseCircle, "CloseX");
export const HamburgerMenu = bulk(IconsaxHamburger, "HamburgerMenu");

/* The four steps of how the work runs, and the proof line next to them */
export const ChatMessage = bulk(Message, "ChatMessage");
export const CallTimer = bulk(Timer, "CallTimer");
export const ScopeDocument = bulk(DocumentText, "ScopeDocument");
export const ShipFlash = bulk(Flash, "ShipFlash");

/* Cards, badges and metadata */
export const CalendarIcon = bulk(Calendar, "CalendarIcon");
export const ClockIcon = bulk(Clock, "ClockIcon");
export const TagIcon = bulk(Tag, "TagIcon");
export const CodeIcon = bulk(Code1, "CodeIcon");
export const BriefcaseIcon = bulk(Briefcase, "BriefcaseIcon");
export const AwardIcon = bulk(Award, "AwardIcon");
export const VerifiedIcon = bulk(Verify, "VerifiedIcon");
export const CheckCircle = bulk(TickCircle, "CheckCircle");
export const CopyIcon = bulk(Copy, "CopyIcon");
export const LinkIcon = bulk(Link2, "LinkIcon");
export const PlayIcon = bulk(Play, "PlayIcon");
export const SearchIcon = bulk(SearchNormal, "SearchIcon");
export const SendIcon = bulk(Send2, "SendIcon");
export const DownloadIcon = bulk(DocumentDownload, "DownloadIcon");
export const PlusIcon = bulk(Add, "PlusIcon");

/* Brand marks, see the note above. */
export const WhatsappLogo = duotone(PhWhatsapp, "WhatsappLogo");
export const GithubLogo = duotone(PhGithub, "GithubLogo");
export const LinkedinLogo = duotone(PhLinkedin, "LinkedinLogo");
export const XLogo = duotone(PhX, "XLogo");
export const YoutubeLogo = duotone(PhYoutube, "YoutubeLogo");
