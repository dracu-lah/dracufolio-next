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
- **Flat surfaces.** Borders and `bg-card`, `rounded-xl squircle` for cards and
  `rounded-lg squircle` for controls. No gradients on surfaces, no drop shadows for depth.
- **Four faces, one job each.** The old "one font" rule is gone, replaced by a system.
  Display is **Bricolage Grotesque** (`font-display`): headings, the hero name, project
  and post titles, nothing smaller than a heading. Body is **Geist Sans** (`font-sans`,
  the body default): paragraphs, FAQ answers, prose, never a heading. Mono and UI is
  **Google Sans Code** (`font-mono`): nav, buttons, labels, dates, code, the terminal
  caret, never a paragraph. Malayalam is **Anek Malayalam**, which every stack ends with,
  so a Malayalam code point falls through from any role. All four are self-hosted through
  `app/lib/fonts.ts`; do not add a fifth.
  Emphasis inside a heading is weight or italic of the same face. No serif anywhere, no
  Inter, no Fraunces, no Instrument Serif, no gradient text, no letter-spaced all-caps
  headlines.
- **One type scale.** 12, 14, 16, 18, 20, 24, 32, 40, 56, 72 px, which is what
  `text-xs` through `text-6xl` now resolve to (`--text-3xl` to `--text-6xl` are redefined
  in `globals.css`). Nothing in between, no arbitrary `text-[27px]`.
- **One icon family.** `@phosphor-icons/react`, duotone weight, imported from
  `app/components/common/icons.ts` (which re-exports `/dist/ssr` so server components
  work). Never hand-roll an SVG icon path, never add a second family, never import
  `lucide-react` again.
- **Malayalam carries `lang="ml"`.** Every Malayalam string lives in `app/data/ml.ts`
  with an English gloss, and every element rendering one sets `lang="ml"` so the
  Malayalam face and the taller line height apply.
- **Terminal accents stay subtle.** `text-phosphor` is defined in `globals.css` and is
  spent on exactly one element sitewide: the caret after the hero role. Everything else
  earns attention through weight, size or a border.
- **Mobile first.** Every new page and card is checked at 390px before it lands.
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

Study these for patterns and craft, never to copy assets: [21st.dev](https://21st.dev/),
[Kokonut UI](https://kokonutui.com/), [React Bits](https://reactbits.dev/),
[Bklit UI](https://bklit.com/), [Magic UI](https://magicui.design/),
[Design Spells](https://designspells.com/), [Mobbin](https://mobbin.com/),
[Dribbble](https://dribbble.com/), [Navbar Gallery](https://www.navbar.gallery/).
Anything borrowed still has to pass the golden rules above.

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
