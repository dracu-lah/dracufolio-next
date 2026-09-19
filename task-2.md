# task-2.md: the September 2026 pass

Written 19 Sep 2026. `task.md` is the original build and stays as it is. This file records the
round of changes asked for on 19 Sep. Everything in section 1 is in the working tree, type
checks, and passes `pnpm check:dashes`. Dev server: `http://localhost:3000`.

---

## 1. Shipped

### Copy removed

| Change | Where |
| --- | --- |
| "Monday to Saturday, 9am to 7pm IST" gone from every place it rendered | quote modal, CTA card, `/hire`, contact form, contact section, `llms.txt`, FAQ answer |
| `HOURS.display` deleted from the data file; `HOURS` now feeds JSON-LD only | `app/data/contact.ts` |
| CTA card badges gone ("Open to roles and projects", "Free 20 minute call", "Malayalam and English") | `CtaBlock.tsx` |
| "Open to roles and projects" badge gone everywhere else | `/hire`, mobile menu, quote modal, footer |
| "Answers the same day. WhatsApp is faster." gone | contact form |
| "മലയാളത്തിലും സംസാരിക്കാം." gone from the contact section | `Contact/index.tsx` |
| Hero availability badge and the Malayalam greeting gone | `Hero/index.tsx` |
| "Case study" gone from project cards; the arrow carries the affordance | `ProjectCard.tsx` |
| "See all N projects" button gone; the link beside the heading is the only route | `Portfolio/index.tsx` |

### Palette

Accent moved off the mint/spring green that reads as AI-generated, onto the leaf green from
the colorhunt palette you sent (`2A7C13 / 76C457 / FFF8CF / FBE6C2`).

- `--accent` is now `oklch(0.746 0.164 138)` = `#76C457`. Measured 8.8:1 on the background.
- `--accent-deep` is `#2A7C13`, for pressed states. It is **not** a label colour: `#2A7C13` on
  `#76C457` is 2.46:1 and fails. The dark near-black label stays, at 8.36:1. White on this
  green is 2.14:1, so that was never an option either.
- The two creams cannot be surfaces on a dark theme, so they went into the text instead:
  `--foreground` is now `oklch(0.97 0.013 95)`, a warm off-white taken from `#FFF8CF` at a
  fraction of its chroma. `--sand` holds `#FBE6C2` for a warm highlight.

Staying in the green family keeps the WhatsApp colour association on the primary button, which
was the one real thing the old accent was doing.

### Type

"Google Sans" could not be done literally. Google Sans and Google Sans Text are Google's
proprietary brand faces: not on Google Fonts (the API returns 400 for both) and not licensed
for a third-party site. Google Sans **Code** is public and OFL-1.1.

- **UI / mono: Google Sans Code**, self-hosted from the variable weight-axis file, copied into
  `app/fonts/` with its licence beside it.
- **Display and body: DM Sans**, via `next/font/google`. Closest open drawing to Google Sans's
  geometric humanist shape.
- `geist` removed from `package.json`.

### The mono-uppercase-wide-tracking tell

Wide-tracked uppercase labels were the other half of the AI look. Buttons sit at `0.14em` and
labels sat at `0.16em` to `0.22em`, which made the split mechanical: everything in the label
tier lost both `uppercase` and the tracking across 17 files. Nav, buttons and badges keep
uppercase. Form labels were lowercase strings relying on CSS, so they are now written properly
("Name", "Phone", "Email", "Message").

### Mobile menu

- Closes on a tap outside (a fading scrim), on Escape, and on a route change. Before this the
  Close button was the only way out.
- Header WhatsApp moved `sm` to `md`. It and the docked bar were both on screen from 640 to
  767px, which is the two-WhatsApp-CTAs case the docked bar exists to prevent.
- Capped height with scroll for landscape phones, 48px minimum rows, GitHub added (it had no
  route at all below `md`).

### Hero

- Two CTAs, neither of them WhatsApp: **Hire me** to `/hire`, **Projects** to `/projects`.
  WhatsApp is already in the header and in the docked bar, so it stays the one accent-filled
  button in view.
- The role typewriter is gone. All four roles sit on one static line, separated by slashes that
  trail their role so a wrap never starts a line with a stray separator. There is now no
  perpetual animation on the site.
- Top padding `pt-24` to `pt-20` on phones, stack gaps tightened.

### Projects section

- Horizontal scroll rail, four projects instead of six.
- **No scroll hijack.** The pinned vertical-to-horizontal pan was built and then removed: it
  takes the scrollbar away on the second section of the page. The browser scrolls the rail.
- **No parallax on the screenshot.** Making the image shift inside its frame means scaling it
  up first, which cropped about a tenth off every side. The screenshot is the evidence.
- Alignment: the rail uses spacer elements, not padding. A scroll container drops inline
  padding on its content box, so the first card sat at x=80 while the heading sat at x=138.
  Measured after the fix: heading 138, card 136.

### Spacing and rules

- Section padding `py-12 md:py-16 lg:py-20` to `py-8 md:py-12`, applied to all 14 sections.
- Heading-to-content gaps `gap-7 md:gap-10` to `gap-5 md:gap-7`; two-column bodies
  `gap-12 lg:gap-16` to `gap-10 lg:gap-12`.
- `TerminalRule` deleted and removed from the home page. The gap separates the sections now.

### Cards

- CTA card is a **container query** (`@container` / `@4xl`), not a viewport one. On a blog post
  it sits in a 768px column, and `lg:` was splitting that into two 330px halves.
- CTA card no longer lists WhatsApp twice (big button plus contact row). The rows are Call and
  Email.
- Left column centres against the taller right column, so losing the badges does not leave dead
  card under the buttons.
- Quote modal rebuilt: chip above the title instead of beside it, one button height, the row
  never wraps, both full width below `sm`.
- QR panel in the contact section now matches the width of the list above it.

### Correctness

- The LangSync post was using the **SeatInfo seat map screenshot**. LangSync is a Python CLI
  with no interface. The image is removed rather than replaced, because a borrowed screenshot
  tells the reader the post is about something it is not.

---

## 2. Anti-slop checks, run mechanically

| Check | Result |
| --- | --- |
| Em dashes | clean (`pnpm check:dashes`) |
| `addEventListener("scroll")` | clean |
| `h-screen` | clean |
| Scroll cues ("Scroll to explore") | clean |
| Section-number eyebrows (`01 / INDEX`) | clean |
| `lucide-react` | clean |
| Hand-rolled SVG icons | none outside the icon module |

---

## 3. Still open

### Blog images (blocked on you)

Every post is MDX with no images. `mdx-components.tsx` has no `img` mapping, so a markdown
image would render unstyled and full-bleed. A `Figure` component is needed regardless: squircle
frame, `next/image` with real dimensions, caption in mono.

You chose "pull from your GitHub repos". **I need the repo name for each post**, or a go-ahead
to search your GitHub for them:

| Post | Repo? |
| --- | --- |
| `telegram-video-before-it-finishes-downloading` | TMPlayer? |
| `nextjs-16-cloudflare-workers-opennext` | ? |
| `shadcn-registry-image-cropper` | ? |
| `pdf-resume-back-into-editable-json` | ? |
| `job-outreach-from-your-own-gmail` | ? |
| `translation-sync-without-breaking-icu` | LangSync? |

For posts with no honest screenshot (the CLI ones), the plan is a typographic fallback card
built from the post's own title and tags, so no two look alike and nothing is borrowed.

### Not done

- Heading-to-description gaps *inside* components were not individually audited; only the
  section-level rhythm was changed.
- `app/components/common/GithubButton.tsx` is dead code with a broken class (`flex-`). Left
  alone, out of scope.
- JSON-LD still carries `openingHoursSpecification`. It is not shown to anybody and it is a
  local-business signal. Say the word and it goes.
- `/hire`'s hero WhatsApp button is still there alongside the header one. That page's whole job
  is converting to a message, so the repeat may be deliberate. Your call.
