/**
 * One icon family for the whole tree: Phosphor, duotone weight. Duotone gives
 * a solid front shape over a lighter second layer, which reads as depth
 * without a gradient or a shadow, so it passes the flat-surface rule.
 *
 * Imported from `/dist/ssr` so server components can render icons without a
 * "use client" boundary. Every call site passes `weight="duotone"` through the
 * `<Icon>` wrapper rather than repeating it.
 */
export {
  WhatsappLogo,
  EnvelopeSimple,
  Phone,
  LinkedinLogo,
  GithubLogo,
  XLogo,
  Globe,
  DeviceMobile,
  Browsers,
  SquaresFour,
  CloudArrowUp,
  Gauge,
  MagnifyingGlass,
  MapPin,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CircleNotch,
  QrCode,
  CaretDown,
  Translate,
  FileText,
  Terminal,
  X as CloseX,
} from "@phosphor-icons/react/dist/ssr";

export type { Icon as PhosphorIcon } from "@phosphor-icons/react";
