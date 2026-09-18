# dracufolio

Personal site for Nevil Krishna K. Next.js 15 App Router, Tailwind v4, framer-motion,
content in `app/data/*.json`, served through the thin wrappers in `app/services/api.ts`.

## Golden rules

- **No em dashes.** Anywhere: copy, comments, commit messages, JSON content. Use a comma,
  a full stop, or parentheses. `pnpm check:dashes` enforces it and the pre-push hook blocks
  a push that would ship one.
- **No AI vibes.** No "not just X, but Y", no rule-of-three filler, no motivational eyebrow
  text, no adjective stacks ("fast, accessible, production-ready"). Write the plain sentence
  a person would say. Same for code comments: explain the why, never restate the line.
- **Flat surfaces, squircle corners.** Borders and `bg-card`, no gradients on surfaces,
  no drop shadows for depth. The corner is a clip-path from
  `app/components/ui/squircle.tsx` (`Squircle`, `SquircleButton`, `SquircleLink`,
  `useSquircle`), never the old `corner-shape` class: `corner-shape` is Chromium only, so
  the same class drew two different shapes depending on the browser. Sizes come from the
  `SQUIRCLE` map (`sm`, `control`, `card`, `panel`), which is already compensated, because
  a squircle at the same radius as an arc reads squarer.
  **A bordered surface is drawn in border mode.** A clip cuts a CSS border off at the
  corner, so the element carries the edge colour as its background, `borderWidth={1}` adds
  the inset fill layer, and `fillClassName` is the real surface. Hover moves both: the
  element for the edge, `[&>[data-fill]]:hover:` for the fill. An input is framed the same
  way, with the field itself borderless inside the frame. Anything at `rounded-full`
  (badges, location chips, avatars) stays a plain radius, since a circle has no corner to
  smooth.
- **Three faces, one job each.** Display and body are both **Geist Sans**, separated by
  weight and size rather than by a second family: `font-display` at 700 and tight tracking
  for headings, the hero name, project and post titles, and `font-sans` at 400 for
  paragraphs and prose. UI is **Geist Mono** (`font-mono`): nav, buttons, labels, dates,
  code, the caret, never a paragraph. Malayalam is **Anek Malayalam**, which every stack
  ends with, so a Malayalam code point falls through from any role. Geist ships through
  the `geist` package and Anek is self-hosted in `app/lib/fonts.ts`; do not add a fourth.
  Emphasis inside a heading is weight or italic of the same face. No serif anywhere, no
  Bricolage, no Fraunces, no Instrument Serif, no gradient text, no letter-spaced all-caps
  headlines.
- **One type scale.** 12, 14, 16, 18, 20, 24, 32, 40, 56, 72 px, which is what
  `text-xs` through `text-6xl` now resolve to (`--text-3xl` to `--text-6xl` are redefined
  in `globals.css`). Nothing in between, no arbitrary `text-[27px]`.
- **Icons come from `app/components/common/icons.tsx`, never from a vendor directly.**
  That module is the site's icon vocabulary: call sites import the name of the job
  (`MapPin`, `CaretDown`) and every export takes the same `{ className, size }` props,
  because some call sites hold a mixed list and render it through one component variable.
  Nothing outside that file passes a vendor prop like `weight` or `variant`.
  UI icons are **Iconsax** at the `Bulk` variant (a solid shape over a lighter second
  layer, which is depth without a gradient or a shadow). Brand marks are **Phosphor** at
  duotone, because Iconsax has no GitHub, LinkedIn or X, and its WhatsApp glyph is a
  stylised chat bubble rather than the mark people recognise on a button. That is the only
  sanctioned second family: a logo is dictated by the brand, not the icon set.
  Never hand-roll an SVG icon path. Never import `lucide-react` again.
- **Malayalam carries `lang="ml"`.** Every Malayalam string lives in `app/data/ml.ts`
  with an English gloss, and every element rendering one sets `lang="ml"` so the
  Malayalam face and the taller line height apply.
- **One accent, one meaning.** The palette is a warm near-black with a single signal
  green, `--accent`, plus `--accent-tint` (12 percent fill), `--accent-edge` (34 percent
  border) and `--accent-muted` (the hover fill). The accent means "act on this or this is
  live": the primary button, a link on hover, the focus ring, the availability dot, the
  active nav pill, an accent icon chip. It is never decoration and never a second hue.
  Text stays neutral so contrast holds, and `--accent-foreground` is the dark label that
  sits on a filled accent surface, because white on this green fails at body size.
  `--phosphor` is now an alias of `--accent`, kept so the hero caret and the OG card keep
  compiling.
- **Badges are a component, not a class.** Anything that looks like a label (a stack
  entry, a tag, a date, a status, a place) goes through `app/components/common/Badge.tsx`:
  one height, one full corner, mono type, `neutral`, `accent` or `ghost`. A `dot` is for
  real state only, never decoration. Bare text separated by gaps is not a badge.
- **Icon chips carry standalone icons.** An icon that stands on its own, rather than
  sitting inside a button or a line of text, goes in a chip: `<Icon3D chip size="sm | md |
  lg" tone="neutral | accent">`. Neutral describes, accent acts. The chip gradient in
  `globals.css` is the one sanctioned gradient on the site, and it is scoped to the chip.
- **Mobile first.** Every new page and card is checked at 390px before it lands.
- **The primary action is docked, never floating.** WhatsApp is the solid button in the
  header from `md` up, and below `md` it is the docked bar in
  `app/components/cta/MobileActionBar.tsx`, which steps aside while the contact form is on
  screen. No floating bubble in a corner, and never two WhatsApp CTAs on screen at once.
  The timed quote prompt is desktop only: Google's intrusive interstitial rule is about
  mobile pages that cover the content, and a phone already has the docked bar.
- **Motion must be motivated.** Every animation has a one-line reason or it does not
  ship. Pointer and scroll values go through motion values (`useMotionValue`,
  `useScroll`, `useMotionValueEvent`), never `useState` and never a raw
  `window.addEventListener("scroll")`. Pointer-driven effects gate on
  `usePointerEffects()` so nothing hover-shaped reaches a touch screen. There is one
  perpetual animation on the site (the hero role cycle); adding a second needs a reason
  better than the first. Everything collapses to static under `prefers-reduced-motion`.
- **One label per intent.** Contact is always "WhatsApp". Portfolio is always
  "Projects". Hiring is always "Hire me". No "Get in touch" or "Let's talk" variants.
- **QR codes are for the desktop-to-phone hand-off only.** `QrPanel` is `hidden md:flex`
  because a QR code on the device you are already holding is decoration. Codes are
  generated at build time in `app/lib/qr.ts`, never in the browser, and always dark on a
  white tile because scanners cope badly with inverted codes.

## SEO contract

Every route ships all of these; if one is missing, it is a bug:

- `pageMetadata()` from `app/lib/seo.ts` for title, description, canonical, Open Graph and
  Twitter. Never hand-roll the metadata object.
- An `opengraph-image.tsx` next to the page, built from `ogImage()` in `app/lib/og.tsx`.
  Routes with a real screenshot (project detail) pass that image through metadata instead.
- JSON-LD via `<JsonLd />`: the page type plus a `BreadcrumbList` on anything below the root.
- An entry in `app/sitemap.ts`.
- Moved or renamed paths get a permanent redirect in `next.config.ts`, never a 404.
- Anything that should not be indexed says so with `robots: { index: false }` (or the meta
  tag in `app/not-found.tsx`).
- JSON-LD is one `@graph` per page, built with `pageGraph()` from `app/lib/schema.ts`.
  Person, ProfessionalService and WebSite carry stable `@id`s anchored to the site root,
  and page-level nodes reference those ids instead of repeating the objects. A second
  Person node with a different `@id` splits one entity into two, which is worse than no
  schema at all.
- Contact details, profile URLs and the resume path come from `app/data/contact.ts`. No
  phone number, email address or profile link is written literally anywhere else.
- `lastModified` in the sitemap comes from `app/data/updated.ts` or a post's own date,
  never `new Date()`: stamping every URL with the build time tells crawlers the whole
  site changed on every deploy and teaches them to ignore the field.
- New third-party profiles go in the `sameAs` array in `app/lib/schema.ts`, which
  `llms.txt` and the footer also read.

## Checks

```bash
node scripts/check-jsonld.mjs http://localhost:3111   # graph on every sitemap route
node scripts/check-seo.mjs    http://localhost:3111   # CTAs, canonicals, one h1,
                                                      # unique location copy, crawl files
```

Both run against a `pnpm start` server, not the dev server.

## Design references

Study these for patterns and craft, never to copy assets:

- [21st.dev](https://21st.dev/), community registry of shadcn-style React/Tailwind components.
- [Kokonut UI](https://kokonutui.com/), open-source Tailwind + shadcn/ui + Motion components.
- [React Bits](https://reactbits.dev/), animated, interactive React components (text effects,
  backgrounds, motion patterns).
- [Bklit UI](https://bklit.com/), composable shadcn-based charts and data visualizations.
- [Magic UI](https://magicui.design/), animated components and landing-page blocks
  (React, Tailwind, Framer Motion).
- [Design Spells](https://designspells.com/), catalog of micro-interactions and delightful
  design details.
- [Mobbin](https://mobbin.com/), searchable library of real mobile and web app screens and flows.
- [Dribbble](https://dribbble.com/), general visual design inspiration and exploration.
- [Navbar Gallery](https://www.navbar.gallery/), curated navigation and navbar design examples.

Take the idea, never the file. Anything borrowed arrives changed: different proportion,
different motion, different content shape, and it still has to pass the golden rules above.
A component that could be recognised as a specific registry demo has not been adapted enough.

## Commands

```bash
pnpm dev            # turbopack dev server
pnpm build          # production build, also the type check that matters
pnpm check:dashes   # em dash guard, same check the pre-push hook runs
```

`pnpm dev` and `pnpm build` fight over `.next`; do not run them at the same time.

## Images

Screenshots live in `public/appwrite/projects/`. Compress before committing: WebP files are
left alone, PNG and JPEG go through `magick <file> -strip -quality 82`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
