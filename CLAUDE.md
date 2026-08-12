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
- **One font.** Google Sans Code covers sans, display and mono via the `--font-google-sans`
  variable. Do not add another family.
- **Terminal accents stay subtle.** `text-phosphor` is a highlight, not a theme.
- **Mobile first.** Every new page and card is checked at 390px before it lands.

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
