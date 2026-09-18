# task.md: make nevil.dev the developer people find

Status: BUILT. T1 to T20 are implemented, committed and pushed. Written 18 Sep 2026, built
18 Sep 2026. Section 3 is kept as written so the plan and the result can be compared; section
11 records every place the build went a different way, and section 4 is the work that is
yours to do by hand.

Goal in one line: when a person or an AI assistant looks for a developer in Thrissur, any Kerala
district, the Thrissur towns you listed, Kerala, or India, nevil.dev should come up with your name,
your roles, your phone and WhatsApp, your photo, and a way to hire you in one tap. And when they
land, the page should hook them in the first two seconds.

You are the product. Section 7 is the marketing plan for that product. Section 3 is the build,
section 4 is the manual work, section 10 is the design read for the motion and Malayalam work.

---

## 0. Decisions locked in

| Item | Decision |
| --- | --- |
| Phone / WhatsApp | +91 92079 32070 (from the resume). Used for wa.me, tel:, JSON-LD, llms.txt |
| Primary domain | nevil.dev stays canonical. Nothing changes there |
| Extra domain | nevilkrishna.com. 301 everything to nevil.dev. Never a second copy of the site |
| Which domain is canonical | nevil.dev, confirmed after you asked. It is the indexed domain, and .dev is on the HSTS preload list so it can only be served over HTTPS. nevilkrishna.com matches your full name and .com is what a local client trusts, but exact match domains stopped being a ranking factor years ago and the name signal comes from Person schema, the title and the H1 instead. Moving canonical to a fresh domain would restart Google's evaluation and leak equity through the redirect for months. `SITE_URL` now reads `NEXT_PUBLIC_SITE_URL` with nevil.dev as the default, so flipping it later is one environment variable, not a rewrite |
| QR codes | Build time SVG, dark on a white tile, `hidden md:flex` so they only appear where the hand off makes sense: project pages (open the live thing on a phone), hire and location pages and contact (open WhatsApp), blog posts (carry the article), and the resume PDF (T19) |
| Easter eggs | Four, all of them things a developer would actually find and one of them useful enough to keep: vim style `g` navigation with `?` for the key list, a console signature, /humans.txt, and a shell flavoured 404 (T20) |
| Blog | Yes, scaffold now with 2 real posts (T7) |
| Social accounts that exist | GitHub (dracu-lah), LinkedIn, X (https://x.com/nevilkrishnak). All three go in `sameAs` |
| SeatInfo post | I may read `~/projects/company/lascade/project-seatinfo` for accuracy. The post describes approach and lessons only: no code, no secrets, no internal names, nothing copied |
| Pricing on hire pages | None. "Quote per project" |
| Icons | One family: `@phosphor-icons/react`, duotone weight for the 3D feel, wrapped in a tilt/float/draw-in component. lucide is migrated out. No hand drawn icon paths |
| Cursor | The system cursor is never hidden or replaced. "Cursor animation" = cursor aware effects: hero spotlight, spotlight borders on cards, magnetic primary CTA. Opt in later if you still want a replacement cursor |
| Type system | Four faces, each with one job: Bricolage Grotesque (display), Geist Sans (body), Google Sans Code (mono, UI labels, buttons, terminal caret), Anek Malayalam (Malayalam glyphs only). All self hosted. The "one font" golden rule in CLAUDE.md is rewritten to this system (T17) |
| Malayalam text | Bilingual accents, not a translated site: hero greeting, hire page subline, contact line, one FAQ, footer, keywords, llms.txt. Every Malayalam element carries `lang="ml"` |
| Languages stated | Malayalam and English |
| Hours in schema | Mon to Sat, 09:00 to 19:00 IST |
| Home page order | Hero, Projects, What I build, Experience, FAQ, Where I work, Contact |
| Hero buttons | Exactly two: WhatsApp (solid) and Projects. No small link under them |
| "Best developer" wording | Allowed, but only inside sentences a person would say (FAQ answers, hire page copy). Never repeated for its own sake |
| Wikipedia | No (section 8). Wikidata later, after third party coverage exists |
| Testimonials | Only real ones. I add the section and the data file; you send me quotes (section 4) |

Change any row and tell me before "start".

---

## 1. What the research found

### 1.1 What Sincy actually did (sincyvarghese.com)

- WordPress + Elementor + Rank Math. One long home page (about 11 minutes of reading).
- The exact phrase "SEO expert in Malappuram" appears 40+ times: `<title>`, H1, meta description,
  image alt text, testimonials, FAQ, footer, even inside the testimonial quotes.
- Title is keyword first, then location: `Best SEO Expert in Malappuram, Kerala| Digital Marketer| SMM`.
- Rank Math schema graph: Person + Organization, WebSite, WebPage, Service with serviceType and Offer.
- 10 question FAQ, 3 testimonials, 2 blog posts, one WhatsApp CTA repeated everywhere.
- Weak spots: no proper OG image size, no sitemap polish, thin blog, generic FAQ.
- The lesson: she owns one long tail phrase with zero competition by putting it in the title, the H1
  and natural sentences, then backs it with FAQ, schema and a WhatsApp button. We do the same for
  "full stack developer in Thrissur" and every district and town on the list, with a far stronger
  technical base underneath.

### 1.2 nevil.dev today

Good already:
- `pageMetadata()` on every route, canonical, OG images per route, Person + WebSite JSON-LD,
  breadcrumbs, redirects for old paths, sitemap, robots.
- www and the old dracufolio.vercel.app both redirect to nevil.dev.

Missing or weak:
- "Thrissur" appears once in the hero and once in the description. No districts, no towns.
- Only one role word ("Full Stack Developer"). No "software engineer", "React developer",
  "web developer", "frontend", "SDE", "freelance", "remote", "Next.js developer" anywhere.
- No services section, no FAQ, no phone or WhatsApp on the site (phone is only in the PDF).
- Sitemap stamps every URL with `new Date()` on each build, no image entries.
- robots.txt is silent about AI crawlers. No `llms.txt`.
- dracufolio.vercel.app redirects with a temporary 307. Should be a permanent 308.
- Google still shows the old title "Frontend Engineer & React Developer".
- GitHub display name is `dracu-lah`, not your name.
- Zero reviews, zero directory listings, zero Google Business Profile.
- Navbar tracks scroll with `window.addEventListener("scroll")` (re-renders on every frame).

### 1.3 Who ranks for "freelance web developer Thrissur" today

saifumak.com, thomasmathew.net, mywebworld.in, truelancer, twine. Pattern on every one of them:
"No.1 / Best ... in Thrissur, Kerala" title, about 1,300 words, WhatsApp + phone + email CTAs,
service list, FAQ, address with pincode. None has proper Person schema, none has a Next.js grade
technical setup, none targets the towns. That is the gap.

### 1.4 What the 2026 research adds (AI search and local)

- ChatGPT search reads Bing's index. Bing Webmaster Tools and IndexNow matter as much as Google.
- AI engines cite short, answer shaped paragraphs with a named author, a visible date and concrete
  numbers. They down weight generic AI written filler.
- AI engines lean on Reddit, Quora and "top N in {place}" lists when they answer "who is a good
  developer in X". Being in those lists is worth more than another backlink.
- A robots.txt that blocks GPTBot, Google-Extended or PerplexityBot is the most common own goal.
- Google Business Profile as a service area business (address hidden, service areas listed) is how
  freelancers rank in the local 3 pack in India. Weekly Google Posts and reviews that name the
  service and the place are the levers. Name, address and phone must match across JustDial, Sulekha,
  IndiaMART and the site.
- Consistency over six months beats one viral post. Pick a lane and repeat it.

---

## 2. Keyword map

### 2.1 Phrases we want to own (title / H1 level)

- Nevil Krishna K, Nevil Krishna, nevil dev
- full stack developer in Thrissur, Kerala
- React developer Thrissur, Next.js developer Kerala
- freelance web developer Thrissur / Kerala
- software developer Thrissur, software engineer Kerala
- hire developer in {district}, web developer in {town}
- Malayalam: തൃശ്ശൂർ വെബ് ഡെവലപ്പർ, കേരളം സോഫ്റ്റ്‌വെയർ ഡെവലപ്പർ, തൃശ്ശൂരിലെ ഫുൾ സ്റ്റാക്ക് ഡെവലപ്പർ

### 2.2 Role words (all must appear in real sentences somewhere on the site)

full stack developer, frontend developer, front end developer, backend, software developer, software
engineer, SDE, SWE, web developer, website developer, React developer, ReactJS developer, Next.js
developer, NextJS developer, TypeScript developer, JavaScript developer, UI developer, UI engineer,
MERN developer, mobile app developer, React Native developer, Android developer, Kotlin developer,
freelance developer, remote developer, contract developer, programmer, coder, dev, web dev, app dev,
full stack engineer, product engineer, Cloudflare developer, Tailwind developer.

### 2.3 Skills to keep repeating

React, Next.js, TypeScript, JavaScript, Tailwind CSS, shadcn/ui, Zustand, TanStack Query, React
Native, Kotlin, Jetpack Compose, Python, Django, Node.js, REST APIs, Cloudflare Workers, D1, R2,
Durable Objects, OpenNext, Docker, AWS, GCP, Vercel, next-intl, SEO, CI/CD, GitHub Actions, Linux.

### 2.4 Locations (each gets a page under /hire)

- State and country: Kerala, India (plus "remote, worldwide" on the /hire index).
- All 14 districts, with the names people actually type as alternates:
  Thiruvananthapuram (Trivandrum), Kollam, Pathanamthitta, Alappuzha (Alleppey), Kottayam, Idukki,
  Ernakulam (Kochi, Cochin), Thrissur (Trichur), Palakkad (Palghat), Malappuram, Kozhikode (Calicut),
  Wayanad, Kannur (Cannanore), Kasaragod.
- Thrissur towns and places: Poonkunnam (Punkunnam), Vazhakode (Vazhakkodu, Mullurkara panchayat,
  about 24 km from the city), Wadakkanchery, Cheruthuruthy, Kunnamkulam, Chalakudy, Irinjalakuda,
  Guruvayur, Kodungallur, Ollur, Mannuthy, Chavakkad.
- Shoranur (in Palakkad district, across the river from Cheruthuruthy; the page says so).

Total: 29 location pages plus the /hire index. Each location record also carries its Malayalam
name (തൃശ്ശൂർ, പൂങ്കുന്നം, വടക്കാഞ്ചേരി, ...) for the bilingual subline and the keywords.

---

## 3. Implementation tasks (in order)

Each task lists the files it touches. "Done when" is the check I run before moving on.

### T1. One source for contact details
- New `app/data/contact.ts`: `PHONE_E164`, `PHONE_DISPLAY`, `EMAIL`, `WHATSAPP_URL` (wa.me with a
  prefilled message), `whatsappUrl(message)` helper for per page messages, `LINKEDIN_URL`,
  `GITHUB_URL`, `X_URL`, `RESUME_PATH`, `LANGUAGES`, `HOURS`.
- Replace every hard coded email/LinkedIn/GitHub string in Contact, Footer, AboutSection, Navbar,
  seo.ts, socials.json consumers.
- Done when: `grep -rn "nevilkrishna@gmail.com\|linkedin.com/in" app/` only hits `contact.ts`.

### T2. Keyword, location and testimonial data
- New `app/data/keywords.ts`: role words, skills, primary phrases, Malayalam phrases (section 2).
- New `app/data/locations.ts`: typed list `{ slug, name, nameMl, altNames[], kind: "country" |
  "state" | "district" | "town", district?, blurb, nearby[] }`. Every `blurb` is 2 to 3 sentences
  specific to that place (distance from Thrissur, what kind of businesses are there, in person or
  remote), so no two hire pages read the same.
- New `app/data/testimonials.ts`: empty typed list with a comment on the shape (name, role, company,
  quote, link). The section renders only when the list is non empty. `Review` schema is added only
  when there are real entries.
- New `app/data/ml.ts`: every Malayalam string in one place with its English gloss in a comment, so
  you can correct spelling in one file.
- Done when: `locations.ts` has 29 entries and no two blurbs share a sentence.

### T3. Structured data upgrade (`app/lib/seo.ts`)
- Move to one `@graph` with stable `@id`s (`#person`, `#service`, `#website`, `#webpage`), the way
  Rank Math does it:
  - `Person`: name, alternateName, givenName/familyName, url, image as `ImageObject` (width, height,
    caption), `telephone`, `email`, `jobTitle` list, `hasOccupation` (Full Stack Developer, Frontend
    Developer, Software Engineer, React Developer, Mobile App Developer), `knowsAbout` (skills),
    `knowsLanguage` (ml, en), `homeLocation` and `address` (Thrissur, Kerala, IN), `geo`
    (10.5276, 76.2144), `nationality`, `worksFor`, `alumniOf`, `sameAs` (GitHub, LinkedIn, X,
    tmplayer.org, resumebuilder.js.org, plus every new profile as it gets created).
  - `ProfessionalService` (name "Nevil Krishna K, web and app development", founder = #person,
    `areaServed` = every location as `Place`/`AdministrativeArea`, `serviceType` list,
    `hasOfferCatalog` with the 6 services, `telephone`, `email`, `contactPoint` with WhatsApp,
    `openingHoursSpecification`, `priceRange` "quote per project", `address`, `geo`, `image`, `sameAs`).
  - `WebSite` (publisher #person, inLanguage en), `WebPage` per route with `about #person`,
    `BreadcrumbList`, `FAQPage` where there is a FAQ, `BlogPosting` for posts, `CreativeWork` for
    projects (already there, gets `author @id`).
- Geo meta tags in the root layout: `geo.region` IN-KL, `geo.placename` Thrissur, `geo.position`,
  `ICBM`.
- `SITE_NAME` becomes "Nevil Krishna K".
- Done when: every route's HTML contains exactly one `ld+json` graph that parses, and
  `scripts/check-jsonld.mjs` (T14) finds Person, ProfessionalService and WebSite on every page.

### T4. Titles, descriptions, keywords
- Root: default title `Nevil Krishna K | Full Stack Developer in Thrissur, Kerala`, template
  `%s | Nevil Krishna K`. Description names roles, React/Next.js, Thrissur, Kerala, India, 3 years,
  "jobs, freelance and remote", and the phone.
- `keywords` meta filled from `keywords.ts`, English and Malayalam (Google ignores it, Bing and some
  AI crawlers do not).
- Per page: Projects, About, Open Source get location and role words in title and description.
- OG images: eyebrow becomes "Full stack developer, Thrissur, Kerala" on the root card.
- Done when: `curl` of each route shows the new title/description and `og:` tags.

### T5. Home page sections (`app/page.tsx` and `app/components/sections/*`)
- Hero (max 4 text elements, fits the first screen at 390 px and 1280 px):
  1. a small Malayalam greeting line, `lang="ml"`: "നമസ്കാരം, ഞാൻ നെവിൽ." (Hello, I am Nevil.)
     This is the hero's one small label; it replaces any eyebrow.
  2. H1 "Nevil Krishna K" in Bricolage Grotesque, with the role line "Full Stack Developer,
     Thrissur, Kerala" in Google Sans Code where the role word cycles (T18) and the static full text
     stays in the DOM for crawlers and screen readers.
  3. one paragraph under 20 words naming React, Next.js, TypeScript, Android, and remote work
     across India.
  4. two buttons: WhatsApp (solid, magnetic) and Projects.
- New `Services` section ("What I build"): 6 items on a two column rhythm (not three equal cards),
  each with a duotone icon in the tilt wrapper and plain copy that carries the role words: web apps
  (React, Next.js), websites that rank (Next.js + SEO), mobile apps (React Native, Kotlin),
  dashboards and admin panels, Cloudflare and deployment, performance fixes and rescues.
- Toolkit gets a "Roles" row: "Full stack developer, frontend developer, software engineer (SDE/SWE),
  React and Next.js developer, web developer, React Native and Android developer".
- New `Faq` section: native `<details>` accordion, 10 questions, `FAQPage` schema. Includes the
  "Who is the best full stack developer in Thrissur?" style questions with honest answers, plus
  "Do you take freelance work?", "Are you open to full time jobs?", "Do you build mobile apps?",
  "Can you do SEO?", "Do you work with clients outside Kerala?", "What do you charge?", "How do I
  contact you?" (phone, WhatsApp, email), "Which languages do you speak?" (answered in English and
  Malayalam), "Where are you based?".
- New `Locations` section ("Where I work"): one sentence, then the 29 links as scroll snap pill rows
  grouped Thrissur towns / Kerala districts / Kerala, India, remote (no long bullet list).
- `Testimonials` section (renders only with real entries, see T2).
- Eyebrow budget: the home page has 7 sections, so at most 2 of the small uppercase labels remain
  besides the hero greeting. The rest of the section headings stand alone.
- Done when: 390 px screenshot looks right, no horizontal scroll, all links resolve.

### T6. Hire pages
- `app/hire/page.tsx` (+ `opengraph-image.tsx`): H1 "Hire a full stack developer in Thrissur,
  Kerala", Malayalam subline, intro, the 6 services, "how it works" (WhatsApp, short call, written
  quote, weekly demos; verbs as headings, no "Step 1"), 3 project cards, location pills, FAQ, CTA
  block, JSON-LD (Service + FAQ + Breadcrumb).
- `app/hire/[location]/page.tsx` (+ `opengraph-image.tsx`) via `generateStaticParams` from
  `locations.ts`: H1 "Full Stack Developer in {name}, Kerala" (or "in Kerala" / "in India"),
  Malayalam subline with the Malayalam place name ("{nameMl}-ൽ വെബ്‌സൈറ്റോ ആപ്പോ വേണോ?
  വാട്ട്‌സ്ആപ്പിൽ മെസേജ് അയക്കൂ."), the location blurb, services, 3 real reasons to pick me,
  3 projects, 3 location FAQs ("Do you meet clients in {name}?", "Who is the best web developer in
  {name}?", "How much does a website cost in {name}?"), CTA with a WhatsApp message prefilled with
  the place, links to nearby locations. JSON-LD: Service with `areaServed` = that place, FAQPage,
  Breadcrumb.
- Unique copy per page comes from `blurb` + `nearby` + `kind`. No hidden text, no keyword lists.
- Done when: `/hire/poonkunnam`, `/hire/ernakulam`, `/hire/kerala`, `/hire/india` build, each has its
  own OG image, and no two pages have the same first paragraph.

### T7. Blog
- Install `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`, `@types/mdx`. `mdx-components.tsx` at the
  root maps headings, code, links to the site's styles. `next.config.ts` gets `withMDX` and
  `pageExtensions`.
- Posts live in `app/blog/(posts)/<slug>/page.mdx` with `metadata` from a `blogMetadata()` helper;
  a registry `app/data/posts.ts` (slug, title, description, date, tags, readingTime) drives `/blog`,
  the sitemap, the RSS feed and "more posts" links.
- Routes: `/blog` index (CollectionPage schema), each post (BlogPosting schema with author #person,
  datePublished, dateModified, image), `/feed.xml` RSS, OG images for the index and each post.
- Post 1: "Play a Telegram video before it finishes downloading: Media3 and TDLib in TMPlayer".
  Source: the local public TMPlayer repo (`~/projects/personal/TMPlayer`). Covers the custom
  DataSource, offset based partial downloads, seeking, the pure window class and its tests.
- Post 2: "Next.js 16 on Cloudflare Workers with OpenNext: what shipping SeatInfo taught me".
  Source: the local SeatInfo repo for accuracy (approach only), your resume points, public docs.
  Covers OpenNext build, D1, R2, Durable Objects, cron, next-intl on Workers, the SEO baseline.
- Each post: byline with photo and link to /about, visible published date, concrete numbers, short
  answer shaped paragraphs under each H2 (this is what AI engines lift), and the shared CTA block.
- Done when: both posts render, RSS validates, `/blog` is in the sitemap, `pnpm check:dashes` is clean.

### T8. Sitemap rebuild (`app/sitemap.ts`)
- Real `lastModified` per URL: a `CONTENT_DATES` map in `app/data/updated.ts` (home, hire, about,
  open source), `date` for posts, optional `updatedAt` on projects (falls back to the global date).
  No more `new Date()`.
- Entries for /hire, every /hire/{location}, /blog, every post.
- `images` on the home page (portrait), project pages (screenshot) and posts.
- Priorities: home 1.0, hire 0.9, hire/thrissur 0.9, districts 0.8, towns 0.7, projects 0.8,
  posts 0.7, about/open-source 0.6.
- One sitemap file (about 70 URLs; splitting only matters past several thousand).
- Done when: `curl /sitemap.xml` lists every route and dates differ per route.

### T9. AI visibility and crawl files
- `app/robots.ts`: keep the disallow list, add explicit allow rules for GPTBot, OAI-SearchBot,
  ChatGPT-User, ClaudeBot, Claude-User, Claude-SearchBot, anthropic-ai, PerplexityBot,
  Perplexity-User, Google-Extended, Applebot-Extended, Amazonbot, meta-externalagent, DuckAssistBot,
  YouBot, cohere-ai, CCBot. Bytespider and similar scrapers stay out.
- `app/llms.txt/route.ts` and `app/llms-full.txt/route.ts`: markdown profile generated from the same
  data files: name (English and Malayalam), roles, location and every area served, phone, WhatsApp
  link, email, LinkedIn, GitHub, X, portrait URL, project list with screenshot URLs and links,
  experience, skills, languages, FAQ, blog posts, hire pages. This is what ChatGPT, Claude,
  Perplexity and friends read.
- `app/manifest.ts`: name, short_name, icons, theme colour (brand entity signal, installable).
- Name bearing portrait: copy the hero image to `public/nevil-krishna-k.jpg` and use that URL in
  JSON-LD, OG and llms.txt (image file names count for image search).
- IndexNow: generate a key, write `public/<key>.txt`, note the key in the docs for Bing.
- `alternates.types` in the layout points at `/feed.xml`.
- Done when: `curl /llms.txt` contains the phone, the WhatsApp link, every location, and every
  project; `curl /robots.txt` lists the AI agents.

### T10. Short redirects (`next.config.ts`)
- `/whatsapp`, `/wa` to the wa.me URL (308). `/call` goes to `/#contact` (a redirect cannot target
  `tel:`).
- `/resume`, `/cv` to the PDF. `/linkedin`, `/github`, `/x`, `/twitter` to the profiles. `/hire-me`,
  `/services`, `/freelance` to `/hire`. `/blog/feed` to `/feed.xml`.
- Done when: each returns 308 with the right `location`.

### T11. CTAs and WhatsApp
- One label per intent across the whole site: contact intent is always "WhatsApp", portfolio intent
  is always "Projects", hire intent is always "Hire me". No "Get in touch" / "Let's talk" variants.
- `WhatsAppFab` (client): fixed bottom right pill "WhatsApp" with the duotone icon, floats gently,
  hides while the contact form is on screen, `aria-label`, respects reduced motion. Rendered in the
  layout.
- Navbar: on mobile (where the GitHub button is hidden) show a WhatsApp icon button next to Resume.
- Contact section: rows become WhatsApp, Phone (tel:), Email, LinkedIn, GitHub, X, each with a duotone
  icon in the tilt wrapper, plus the Malayalam line "മലയാളത്തിലും സംസാരിക്കാം." (We can talk in
  Malayalam too.)
- New shared `CtaBlock` ("Have a project or a role in mind?") with WhatsApp (solid) and "Hire me".
  Placed at the end of: project detail, projects index, about, open source, every hire page, every
  blog post.
- Footer: adds phone, WhatsApp, X, "Hire me", "Blog", the Malayalam line "തൃശ്ശൂർ, കേരളം" next to
  the English address line, and links to the main hire pages.
- Done when: every page has at least one WhatsApp link and the FAB never covers the form submit
  button at 390 px.

### T12. Icon set with a 3D feel
- Install `@phosphor-icons/react`. Use the `duotone` weight (a solid front layer plus a lighter
  second layer, real depth without gradients or shadows). Set: `WhatsappLogo`, `EnvelopeSimple`,
  `Phone`, `LinkedinLogo`, `GithubLogo`, `XLogo`, `Globe`, `DeviceMobile`, `RocketLaunch`, `Layout`,
  `Gauge`, `MagnifyingGlass`, `MapPin`, `ArrowLeft`, `ArrowRight`, `CircleNotch` (spinner).
- `Icon3D` wrapper (client, motion values only): perspective container, pointer following tilt
  (rotateX/rotateY within about 12 degrees), an idle float loop only on the FAB, stroke draw in on
  first reveal for the services grid, all disabled under `prefers-reduced-motion`.
- Migrate every lucide import (Mail, Linkedin, Github, Globe, ArrowLeft, ArrowRight, Loader2) to
  Phosphor and remove `lucide-react` from `package.json`. One family in the tree.
- The navbar logo keeps its rotate on hover and gets the same tilt.
- Done when: icons render crisp at 24 px and 48 px, hover tilt works with a mouse, nothing animates
  with reduced motion on, `grep lucide app/` is empty.

### T13. Content touch ups and small assets
- `about.json`: description mentions Thrissur, Kerala, India and the role words.
- About page profile list gets "Roles", "Languages" and "Serves" rows.
- Image alt text everywhere includes name + role + location where it is a photo of you.
- Project detail: `author` becomes the `#person` reference. Project pages get a short
  "Problem / What I did / Result" block generated from existing fields, so they read as case studies.
- `public/qr-nevil-dev.svg`: a QR code for https://nevil.dev/whatsapp (for the resume footer,
  business card, WhatsApp status). Generated once with the `qrcode` package as a dev dependency.
- `scripts/resume.html`: add the WhatsApp line and the QR code, regenerate the PDF.

### T14. QA
- `pnpm build` (the type check that matters), `pnpm lint`, `pnpm check:dashes`.
- `scripts/check-jsonld.mjs`: fetches every route from a local `pnpm start`, parses every ld+json
  block, fails on invalid JSON or a route without Person + WebSite.
- Headless Chromium screenshots at 390 and 1280 for: home, /hire, /hire/thrissur, /hire/poonkunnam,
  /blog, one post, a project page. Checked by eye for overflow, FAB overlap, Malayalam glyph
  rendering (no tofu boxes, correct conjuncts).
- Reduced motion pass: the same pages with `--force-prefers-reduced-motion`, nothing moves.
- Lighthouse on home and one hire page: LCP under 2.5 s, CLS under 0.1. None of the four fonts may
  cause layout shift (metric matched fallbacks through `next/font`, `font-display: swap`, display
  and body preloaded, Malayalam lazy).
- `curl` checks for robots, sitemap, llms.txt, feed.xml, the redirects.
- `pnpm dev` and `pnpm build` fight over `.next`, so dev is stopped before build.

### T15. Manual task docs (`docs/seo/*.md`, plain words, copy paste ready)
- `README.md`: order of operations, 30 minute / 1 day / 1 week split, the checklist.
- `01-domains.md`: buy nevilkrishna.com, Cloudflare redirect rule (301, path preserving) to nevil.dev,
  flip the vercel.app redirect to 308 in Vercel project settings, confirm www.
- `02-search-console-bing-indexnow.md`: verify nevil.dev, submit sitemap, request indexing for the
  main URLs, Bing Webmaster import, IndexNow ping command with the key from T9.
- `03-google-business-profile-and-reviews.md`: create GBP as a service area business
  ("Nevil Krishna K, Full Stack Developer", categories Website Designer + Software Company, Thrissur,
  service areas = the 29 places, phone, hours, services, photos, first post), get the review link,
  who to ask (Lascade and Udyata colleagues, TukTuko and Parazyakampany clients, FOSS friends),
  message template that asks for the service and the place to be named, how to reply, weekly post
  routine.
- `04-profiles-and-cross-linking.md`: fix LinkedIn (headline, about, location, custom URL, featured
  links, "Providing services", Open to work for both jobs and freelance), GitHub (display name,
  profile README, pinned repos, website), X (bio, link, pinned post), then create Dev.to, Hashnode,
  Peerlist, Wellfound, Upwork, Truelancer, Twine, Gravatar, Product Hunt (TMPlayer, Resume Builder),
  Quickerala, JustDial, Sulekha, IndiaMART (optional), FOSS United, TinkerHub, Kerala Startup
  Mission. Same name, same photo (`/nevil-krishna-k.jpg`), same bio, same phone, every one links to
  https://nevil.dev, and the site's `sameAs` list gets each URL back (I add them when you send the
  links). Exact bio text for each length limit, English and a Malayalam line where the platform is
  local.
- `05-backlinks-and-lists.md`: who to ask and the exact message: Lascade and Udyata team pages,
  saifumak's "top 10 freelance developers in Thrissur" list and the other "top developers in Kerala"
  lists, FOSSMeet / FOSS United Thrissur, MTI alumni, tmplayer.org and resumebuilder.js.org footers
  ("Built by Nevil Krishna K" linking to nevil.dev), langsync README, Show HN and Reddit posts for
  TMPlayer, Android TV communities, Quora answers on "developer in Thrissur" questions.
- `06-ai-visibility.md`: what is now on the site (llms.txt, robots, schema), the monthly check
  (ask ChatGPT, Claude, Perplexity, Gemini "who is a full stack developer in Thrissur" and "who is
  Nevil Krishna K", note what they cite), Bing Places, Google knowledge panel claim once it
  appears, keep every profile consistent, publish answer shaped content.
- `07-blog-topics-and-calendar.md`: next 10 posts drawn from real work (langsync, seat map SVG
  rendering, next-intl on Workers, Zustand patterns, Fedora + Sway setup, resume builder, OSM self
  hosting), 2 per month, each cross posted to Dev.to and Hashnode with canonical back to nevil.dev.
- `08-marketing-playbook.md`: section 7 of this file expanded with scripts and templates.
- `09-wikipedia-knowledge-panel.md`: section 8 of this file, with the steps that lead to a panel.
- `10-outreach-templates.md`: cold messages for local businesses (English and Malayalam), recruiters,
  agencies, and the follow up cadence.
- `11-monthly-checklist.md`.

### T16. Commit and push
- Commits by area, in this order: data + schema + metadata; hire pages; blog; icons + CTAs +
  WhatsApp; type system + Malayalam + motion layer; sitemap + robots + llms + redirects; resume + QR;
  docs + task.md. Plain messages in the repo's existing style (`feat:`, `content:`, `docs:`,
  `style:`). No Co-Authored-By trailer (house rule).
- `git push origin master`. The pre-push hook runs the em dash check; it must pass, no `--no-verify`.
- After the push: run the `curl` checks against the live site once Vercel finishes, and report.

### T17. Type system: four faces, one voice, plus Malayalam
The golden rule today is "one font". Your ask overrides it, so the rule is rewritten, not broken.

- Roles (each face has exactly one job, that is what keeps it from looking generated):
  - Display: Bricolage Grotesque (Google Fonts, OFL, variable weight 200 to 800 with an optical size
    axis). Used only for the H1, section headings, project and post titles, hire page H1s. Tight
    tracking, weight 600 to 700, `font-optical-sizing: auto`.
  - Body: Geist Sans (OFL, `geist` npm package). Paragraphs, FAQ answers, blog prose, lists, table
    cells. Weight 400 and 500 only.
  - Mono and UI: Google Sans Code (already in the repo). Nav, buttons, small labels, the terminal
    caret and role cycle, stack lines, code blocks, dates. This is where the terminal identity lives.
  - Malayalam: Anek Malayalam (Google Fonts, OFL, variable), served only for U+0D00 to U+0D7F through
    `unicode-range`, so it downloads only on pages that show Malayalam. Alternative if you prefer a
    more classic Kerala look: Manjari by SMC. Default is Anek Malayalam.
- Loading: all four through `next/font` (local woff2 for Bricolage, Anek and Google Sans Code,
  `geist/font/sans` for Geist), each on its own CSS variable (`--font-display`, `--font-body`,
  `--font-mono`, `--font-malayalam`), latin subsets only, display and body preloaded, metric
  matched fallbacks so text does not jump when the files land.
- `globals.css`: `--font-display`, `--font-sans` and `--font-mono` point at their own faces, and
  every stack ends with `var(--font-malayalam)` so Malayalam code points fall through to Anek from
  any role. Malayalam lines get `leading-[1.6]` for the taller conjuncts.
- Rules that keep it from looking AI made (also written into CLAUDE.md):
  - Display is never used below heading size; body is never used for headings; mono is never used
    for paragraphs.
  - Emphasis inside a headline is weight or italic of the same face. No serif word dropped into a
    sans line, no second display face, ever.
  - No Inter, no Fraunces, no Instrument Serif, no gradient text, no letter spaced all caps
    headlines. Hierarchy comes from size and weight.
  - Sizes come from one scale: 12, 14, 16, 18, 20, 24, 32, 40, 56, 72 px. Nothing in between.
- `CLAUDE.md` golden rule "One font" becomes "Four faces, one job each" with the list above and the
  rules above, so future work keeps the system.
- Where each face shows up first: the hero name in Bricolage at 56 px (72 on desktop) over the role
  cycle in Google Sans Code is the pairing that sets the tone in the first second.
- Every Malayalam element: `lang="ml"`, sourced from `app/data/ml.ts`. Placements: hero greeting,
  hire page sublines, contact line, the languages FAQ answer, footer, the /hire/thrissur OG image
  (Malayalam place name under the English title, same font file passed to `ImageResponse`),
  llms.txt, keywords meta.
- Done when: a 390 px screenshot of the hero and of /hire/thrissur shows the four faces in their
  roles and correct Malayalam shaping (ചില്ലക്ഷരങ്ങൾ and conjuncts render, no tofu); the Malayalam
  file is absent from the network log on a page without Malayalam text; CLS on home stays under 0.1.

### T18. Motion layer: the two second hook
Design read and dials are in section 10. Every item below has a one line reason; anything without a
reason was cut. All of it is motion values and CSS, no `useState` for pointer or scroll, no
`window.addEventListener("scroll")`, every piece collapses to static under reduced motion.

1. Hero role cycling with a terminal caret. Reason: shows the range of roles (the keywords) in the
   first two seconds and carries the terminal identity. The role after the name types out, holds,
   deletes, and moves to the next: Full Stack Developer, React Developer, Next.js Developer,
   Android Developer, ഫുൾ സ്റ്റാക്ക് ഡെവലപ്പർ. A single blinking block caret in `text-phosphor`
   (the one accent, used once). The complete static line stays in the DOM in an `sr-only` span;
   the animated span is `aria-hidden`. The only perpetual animation on the page.
2. Pointer spotlight over the hero. Reason: the page answers the visitor's hand right away, the way
   a terminal answers a keystroke. A soft phosphor light about 600 px wide at 6 to 8 percent
   opacity following the pointer with spring lag, rendered as a fixed `pointer-events-none` layer
   only while the hero is in view, only on `(pointer: fine)`. On touch it is a slow drift for the
   first three seconds, then still. This layer is a light, not a surface, so it does not touch the
   flat surface rule; flagging it anyway because it is a radial gradient in the CSS.
3. Spotlight borders on project and service cards. Reason: hierarchy, the card under the pointer
   is the one you are about to open. The 1 px border brightens toward `foreground` near the pointer
   and fades back, monochrome, no fill change, no shadow.
4. Magnetic primary CTA. Reason: feedback on the one action the page wants. The WhatsApp button
   in the hero and the FAB pull toward the pointer by at most 6 px and spring back. Spring
   `stiffness 300, damping 20`. Fine pointers only.
5. Scroll progress hairline. Reason: reading position on long pages (hire, blog). A 1 px
   `foreground` line at the top driven by `useScroll`, no phosphor, no glow.
6. Navbar scroll state moves from `window.addEventListener("scroll")` to `useScroll` +
   `useMotionValueEvent`, same behaviour, no per frame re-render.
7. Existing `Reveal` stays as the entry motion; the hero gets a short stagger (greeting, name, role,
   paragraph, buttons at 60 ms steps) so the first paint reads top to bottom.

Deliberately not done: no replacement cursor, no dot grid or crosshair lines, no marquee, no
particles, no grain, no parallax, no scroll hijack. Each one either breaks a golden rule, an
accessibility rule, or has no reason.

- Files: `app/components/motion/RoleCycle.tsx`, `Spotlight.tsx`, `SpotlightBorder.tsx`,
  `Magnetic.tsx`, `ScrollProgress.tsx`, `app/hooks/usePointer.ts`, edits to Hero, Projects,
  Services, Navbar, layout.
- Done when: the 390 px and 1280 px screenshots show the hero fully in the first screen, the
  reduced motion pass shows nothing moving, and Lighthouse INP on home stays under 200 ms.

### T19. QR codes for the desktop to phone hand off
Asked for mid build: somebody reading on a laptop cannot install an Android app, open a
WhatsApp chat or carry an article to the sofa.

- `app/lib/qr.ts` generates the SVG at build time with an in memory cache, dark modules on
  white (scanners cope badly with inverted codes, and this site is black).
- `app/components/common/QrPanel.tsx` is `hidden md:flex`. A QR code on the phone you are
  already holding is decoration, and decoration is not what this is for.
- Placed on: every project page with a live URL (scan to open it on a phone), /hire and all
  29 location pages and the contact block (scan to open WhatsApp with the message already
  written), the end of every blog post (scan to keep reading), and the resume PDF header.
- The resume QR points at nevil.dev/whatsapp, which is the one place a link cannot be
  clicked. Verified by printing the PDF at 200 dpi and decoding it with zbarimg.
- Done when: every rendered QR decodes to the URL it claims, and the resume is still one page.

### T20. Easter eggs and the detail pass
- Vim style go to navigation: `g` then `h p i b a o c r w` jumps to home, projects, hire,
  blog, about, open source, contact, resume, WhatsApp. `?` opens the key list, escape closes
  it. Built as a real dialog with a focus move and a backdrop, ignored while you are typing
  in a field. It starts as something to find and ends up being the fastest way around the
  site, which is the only kind of easter egg worth shipping.
- Console signature: an ASCII wordmark, the positioning line, the WhatsApp link and a
  pointer to `?`. Most of the audience worth having opens devtools on a portfolio.
- `/humans.txt`: the humanstxt.org convention, crediting the person and naming the four
  typefaces and the tooling. Nobody is forced to find it, which is the point.
- 404: `$ cat this-page` then "No such file or directory", and three ways back instead of a
  dead end.
- Detail fixes found while building: the type scale now snaps to ten sizes because Tailwind's
  own ramp skips 32 and 40; `text-phosphor` was named in CLAUDE.md but had never been
  defined after the monochrome redesign, so it now exists and is spent on exactly one
  element; fonts are content hashed so they get an immutable cache header; the latin-ext and
  Malayalam faces are separate families at the end of each stack so the browser only fetches
  them when a glyph needs one.

---

## 4. What you do by hand (summary, details land in docs/seo)

1. Buy nevilkrishna.com and set the 301 to nevil.dev (10 minutes).
2. Google Search Console + Bing Webmaster: verify, submit the sitemap, IndexNow (15 minutes).
3. Google Business Profile: create, verify, add photos and services, collect the first 5 reviews
   (1 hour to set up, then a week of asking people).
4. Fix LinkedIn, GitHub and X with the text I give you (20 minutes).
5. Create the new profiles with the same name, photo, bio and link (about 2 hours total).
6. Send the backlink and list messages (30 minutes, replies trickle in over weeks).
7. Send me every new profile URL so I add it to `sameAs` and llms.txt.
8. Send me 3 to 5 real testimonial quotes (name, role, company) for the testimonials section.
9. Switch the number to WhatsApp Business (free): business name, category, hours, catalogue with the
   6 services, an away message that links to nevil.dev/hire.
10. Read `app/data/ml.ts` once and correct any Malayalam spelling you would write differently.
11. Monthly: the checklist.

Yes, you need more accounts. Search engines and AI assistants trust a name that shows up
consistently in many places, all pointing at one site. Cross linking (profiles point to nevil.dev,
nevil.dev points back through `sameAs`) is how they decide those are all the same person.

---

## 5. Risks and how they are handled

- Doorway pages: 29 location pages that only swap the town name would be a policy problem. Each page
  gets its own blurb, its own nearby links, its own FAQ answers, real projects, and interlinks.
  I keep the count at 29, not hundreds.
- "Best developer" claims: Google does not penalise the word, but stuffed pages read badly and
  convert worse. It lives in FAQ questions and one or two natural sentences per page.
- Ranking timelines: towns and most districts should show within weeks of indexing. Kochi, Kerala
  wide and India wide "best developer" queries depend on reviews and backlinks (section 4) and take
  months. The code sets the structure; the docs and section 7 cover the rest.
- Golden rules: no em dashes (guard runs), no AI phrasing, flat surfaces, the four face type system
  with one job per face, subtle phosphor, 390 px check. The icons use duotone layers, not gradients or shadows. The spotlight is
  a light layer and is the only radial gradient in the CSS.
- Blog post 2 describes approach only; nothing from company code is reproduced.
- Fake reviews or fake testimonials are never added. Empty sections stay hidden until real ones exist.
- Malayalam copy is written by me and checked by you (section 4, item 10). Until then it is short
  and simple on purpose.
- Motion budget: one perpetual animation (the caret and role cycle), everything else is pointer or
  scroll driven and stops when the pointer stops.

---

## 6. Acceptance checklist (I tick these before the push)

- [x] `pnpm build`, `pnpm lint`, `pnpm check:dashes` clean
- [x] Every route: title, description, canonical, OG image, one JSON-LD graph, breadcrumb below root
- [x] Every page has a WhatsApp link; the FAB hides over the contact form
- [x] /hire and 29 location pages build with unique first paragraphs and Malayalam sublines
- [x] /blog, 2 posts, /feed.xml
- [x] sitemap.xml with real dates and images; robots.txt with AI agents; llms.txt with phone,
      WhatsApp, every location, every project, portrait and screenshot URLs
- [x] Short redirects return 308
- [x] 390 px screenshots of home, hire, a town page, blog, a post, a project: no overflow, Malayalam
      shapes correctly
- [x] Reduced motion pass: nothing moves; Lighthouse LCP under 2.5 s, INP under 200 ms, CLS under 0.1
- [x] `grep lucide app/` empty; one icon family
- [x] Hero fits the first screen at 390 px and 1280 px, two buttons, no tagline under them
- [x] Type roles hold everywhere: display only on headings, body only on prose, mono only on UI and
      code; CLAUDE.md updated to the four face rule
- [x] Resume PDF regenerated with WhatsApp and QR, still one page
- [x] docs/seo/ written, README first
- [x] Commits pushed, live checks pass

---

## 7. Marketing plan: you are the product

### 7.1 Positioning (one sentence, used everywhere)

"Nevil Krishna K, full stack developer in Thrissur, Kerala. React, Next.js and TypeScript for the
web, Kotlin for Android. 3 years shipping production apps (SeatInfo, FlightPoints, TukTuko).
Available for full time roles, freelance projects and remote contracts across India."

Shorter forms for bios: "Full stack developer, Thrissur, Kerala. React, Next.js, TypeScript, Android.
Open to jobs and freelance. nevil.dev". The 160 character and 80 character versions go in the docs,
with a Malayalam line for local platforms: "തൃശ്ശൂരിലെ ഫുൾ സ്റ്റാക്ക് ഡെവലപ്പർ. വെബ്‌സൈറ്റ്,
ആപ്പ്, ഡാഷ്‌ബോർഡ്. വാട്ട്‌സ്ആപ്പ്: +91 92079 32070".

### 7.2 Who buys, and what each one needs to hear

| Audience | What they search | What convinces them | Where they are |
| --- | --- | --- | --- |
| Hiring managers and recruiters (Kochi, Bangalore, remote) | "React developer Kerala", "Next.js developer", your name | Production products with numbers, clean GitHub, a one page resume, fast replies | LinkedIn, Wellfound, Naukri, Peerlist, Google |
| Small businesses in Thrissur and the towns (shops, clinics, colleges, hotels, agencies) | "web developer in Thrissur", "website designer near me", "app developer Thrissur", Malayalam queries | A WhatsApp number, a person they can meet, a site that loads fast on their phone, Malayalam | Google Maps, JustDial, WhatsApp, word of mouth |
| Startup founders in Kerala | "freelance full stack developer Kerala", "MVP developer Kochi" | Cloudflare and Next.js speed, SeatInfo and FlightPoints as proof, weekly demos | Kerala Startup Mission, LinkedIn, X, meetups |
| Remote clients outside India | "hire Next.js developer India", "React developer remote" | English writing, timezone overlap, GitHub, blog posts, Upwork history | Upwork, Twine, GitHub, Google, AI assistants |
| Other developers and the FOSS crowd | your projects by name | TMPlayer, Resume Builder, langsync, dotfiles | GitHub, X, Reddit, Hacker News, FOSS United |

### 7.3 Channels and cadence (the six month plan)

- nevil.dev: the hub. Every profile links here, every post ends here. Blog 2 posts a month.
- LinkedIn: 3 posts a week (one build log with a screenshot, one lesson from work, one repost of a
  blog post). Comment on 5 Kerala tech posts a day for the first month. Headline carries the roles
  and the location. Custom URL. Open to work set for both jobs and freelance.
- X: daily short build notes, pin the hire page, reply to Kerala and React accounts. Same photo.
- GitHub: display name, profile README with the positioning line, photo, phone, and the hire link;
  pin TMPlayer, Resume Builder, langsync, dracufolio-next, image cropper, email sender.
- Google Business Profile: one post a week (a project, a tip, an offer), one new photo a fortnight,
  reply to every review within a day.
- WhatsApp Business: catalogue with the 6 services, status updates with project screenshots weekly.
- Dev.to and Hashnode: cross post every blog post with canonical to nevil.dev.
- Reddit: r/Kerala, r/Kochi, r/Thrissur, r/webdev, r/nextjs, r/androidtv. Help first, link second.
  Show HN and Product Hunt for TMPlayer (Android TV Telegram player has a real audience).
- Meetups and talks: FOSS United Thrissur, TinkerHub, GDG Kochi, React Kerala meetups, MTI and
  GEC Thrissur student talks. One talk a quarter. Each talk becomes a blog post and a speaker page
  that links to nevil.dev (third party mention, see section 8).
- Email signature: name, role, location, phone, WhatsApp link, nevil.dev/hire.
- Paid (optional, small): a Google Ads search campaign for "web developer Thrissur" and "app
  developer Thrissur" at a few hundred rupees a day for one month to seed calls and reviews while
  organic catches up. Not started without your go.

### 7.4 Offers that make people message

- Free 20 minute call on WhatsApp for any project in Thrissur district (stated on every hire page).
- Free speed and SEO check of an existing site (a screenshot of PageSpeed with three fixes).
- "Website in 14 days" for small businesses: Next.js, fast on phones, Google Business Profile set up,
  WhatsApp button. No price on the page; quote per project.
- Referral: anyone who sends a client that signs gets a named thank you on the site (with permission)
  and a discount on their own work.

### 7.5 Proof to collect

- 5 Google reviews in the first month, 15 in six months, each naming the service and the place.
- 3 testimonials for the site (colleagues and clients).
- Numbers on the project pages: users, load time, tests, uptime. Real ones only.
- Screenshots of live products with your name in the caption.
- Speaker pages, community listings, "top developers in Thrissur" lists.

### 7.6 Measurement (monthly, 30 minutes)

- Search Console: clicks and impressions for the hire pages, the towns, and your name.
- GBP: calls, WhatsApp taps, direction requests, profile views.
- Vercel Analytics: visits to /hire and /whatsapp, referrers.
- AI check: the 6 queries in docs/seo/06 across ChatGPT, Claude, Perplexity, Gemini, Copilot.
- Leads: a simple sheet with source, date, place, outcome.

---

## 8. Wikipedia, Wikidata and the knowledge panel

- Wikipedia: no. A page needs significant coverage in several independent reliable sources, writing
  about yourself is a declared conflict of interest, and pages that fail this get deleted with a
  public log entry. That is a negative signal, not a neutral one.
- Wikidata: not yet. It also has a notability rule (a serious public reference or a structural need)
  and self made items about private individuals get removed. It becomes safe once two or three
  independent write ups exist (a news feature, a conference speaker page, a podcast episode, a
  published interview).
- What builds the knowledge panel without either: one consistent entity everywhere (same name,
  photo, bio, phone), `Person` schema with a stable `@id` and a full `sameAs` list, profiles that link
  back, third party pages that mention you by name with the same facts, and time. Once a panel
  appears for "Nevil Krishna K", claim it through Google's "Claim this knowledge panel" flow.
- The path to third party coverage, in order: speaker pages at FOSS United / TinkerHub / GDG,
  Product Hunt and Show HN for TMPlayer, a Malayalam tech YouTube channel interview about TMPlayer or
  Resume Builder, a local newspaper tech feature, an alumni page at MTI. Each one is a citation an AI
  assistant can use.

---

## 9. Extra tactics from the 2026 research (folded into the tasks above)

- Bing first for ChatGPT: T9 IndexNow, docs 02 Bing Webmaster.
- Answer shaped content with a byline, a date and numbers: T7 post structure, T5 FAQ wording.
- Reddit, Quora and "top N" lists feed AI answers: docs 05.
- Service area GBP with weekly posts and place named reviews: docs 03.
- NAP consistency across JustDial, Sulekha, IndiaMART: docs 04.
- Six month consistency on one lane (React/Next.js full stack, Thrissur): section 7.3.
- Never block AI crawlers by accident: T9 robots with explicit allows.
- A WhatsApp Business profile is itself a searchable listing: section 4, item 9.
- Malayalam text on the page catches Malayalam language queries that no competitor targets: T17.

---

## 10. Design read for T17 and T18 (from the design-taste-frontend skill)

Reading this as: a developer portfolio for hiring managers and local clients, redesign in preserve
mode, with a black and white terminal language, leaning toward Tailwind v4 + Motion + a four face type
system (Bricolage Grotesque display, Geist Sans body, Google Sans Code mono, Anek Malayalam).

Dials: DESIGN_VARIANCE 5 (the current site is a calm split layout, kept), MOTION_INTENSITY 5 (the
current site is at 4 with Reveal only; preserve mode allows +1), VISUAL_DENSITY 4 (unchanged).

Rules from the skill that shaped the plan:
- No replacement cursor. Cursor aware effects instead (T18 items 2 to 4).
- Icons from one library, no hand drawn paths. Phosphor duotone (T12).
- Motion must be motivated; one perpetual animation; no marquee, no scroll cues, no decorative dots,
  no grain, no parallax (T18).
- Hero: max 4 text elements, fits the first screen, two buttons, nothing under them (T5).
- One label per intent: "WhatsApp", "Projects", "Hire me" (T11).
- Eyebrow budget: at most one small uppercase label per three sections (T5).
- Pointer and scroll state through motion values, never `useState`, never a raw scroll listener
  (T18 item 6 fixes the navbar).
- Reduced motion honoured everywhere, tested (T14).
- Both themes: the site is locked to dark by design (`html.dark`), which the skill accepts when the
  brand insists. Unchanged.
- Typography: no Inter, no Fraunces or Instrument Serif, no serif for a developer portfolio, sans
  display with same family emphasis, pairings that sit well together (T17). Multiple faces are
  fine when each has one job and the roles never blur; that is the difference between a designed
  page and a generated one.
- No em dashes anywhere (already a house rule with a guard).

---

## 11. Where the build went a different way from the plan

Recorded honestly, because a plan that quietly rewrites itself is not a plan.

1. **Malayalam is not on the OG cards.** T17 asked for the Malayalam place name on the
   /hire/thrissur card. `ImageResponse` cannot read woff2, and the only Malayalam file
   available as TTF is a 668 KB variable font whose default instance is a condensed thin
   weight, so it would have rendered wrong and cost more than it returned. OG cards are
   social previews, not indexed text, so the Malayalam went where it earns something: the
   page HTML with `lang="ml"`, llms.txt and the keywords meta.
2. **No `unicode-range` on the Malayalam face.** `next/font/local` has no per-source
   `unicode-range`, and hand writing the `@font-face` would have given up the preload and
   the metric matched fallback. Instead the Malayalam and latin-ext faces are separate
   families sitting at the end of every stack. The browser only downloads a face it needs
   a glyph from, so the effect is the same and the tooling still manages the files.
3. **The pointer spotlight does not drift on touch.** The plan had a three second drift on
   touch screens. Every pointer effect gates on `usePointerEffects()`, which is false
   without a fine pointer, and adding a timed drift would have meant a second perpetual
   animation for a device that cannot use the effect anyway.
4. **Project pages did not get a "Problem / What I did / Result" block.** The project data
   has `longDescription` and `features`, not those three fields. Generating that structure
   would have meant writing a problem statement and a result that nobody had claimed. The
   existing structure stayed and got the QR panel and the CTA block instead.
5. **`/whatsapp` and `/wa` carry no prefilled message.** Next decodes percent escapes in a
   redirect destination, which put raw spaces in the `Location` header. That is invalid per
   RFC 7230 and some proxies mangle it. Those two are the hand typed links; every in-page
   button still builds its own wa.me URL with the message properly encoded.
6. **The centre nav appears at `lg`, not `md`.** Five links plus the wordmark plus two
   buttons do not fit at 768 px.
7. **`usePointerEffects` reads the media query through `useSyncExternalStore`.** The first
   version set state inside an effect, which lint correctly called a cascading render.
8. **Four titles were shortened.** They read as "About Nevil Krishna K, Full Stack
   Developer in Thrissur | Nevil Krishna K" once the template appended the name.
9. **Google Business Profile caps service areas at 20, not 29.** `docs/seo/03` enters the
   20 highest demand places and lists the 9 it leaves out with the reason each is safe to
   omit.
10. **`scripts/check-seo.mjs` was added on top of the planned `check-jsonld.mjs`.** The
    graph checker cannot see a page that renders but forgot the WhatsApp link, or two
    location pages that ended up with the same paragraph.

### Facts corrected against the source repos while building

- **TMPlayer has 256 tests, not 209.** The README badge says 209 and `projects.json` had
  copied it. Counted 256 `@Test` methods across 25 files, and both the project page and the
  new blog post now say 256.
- **The SeatInfo seat maps are not SVG.** The schema carries a to-scale raster image plus
  per-seat coordinates rendered as hotspots over it. `app/data/experience.ts` said "to-scale
  SVG rendering" and now says "to-scale map rendering".
- **The Resend and Django transactional email work is not in the SeatInfo repo**, so the
  blog post leaves it out rather than asserting it. It stays on the resume, where it came
  from; if it lives in another repo, say so and it can go back in.
- **Kasaragod is about 300 km from Thrissur by road, not 400.** Every distance on the 29
  location pages was computed from real coordinates rather than memory.
- **Ollur in Malayalam is** ഒല്ലൂർ. **Shoranur is in Palakkad district**, and its page says so.

### T21. Notes from LinkedIn (asked for mid build)

LinkedIn cannot be scraped, and that is not a tooling limit: a request to the
profile or the activity feed without a session answers 301 to a sign-in wall
with zero bytes, and LinkedIn's robots.txt states in plain words that automated
access without their written permission is prohibited. Verified both, rather
than assumed.

The supported route is LinkedIn's own data export, which is your content:
- `scripts/import-linkedin.mjs` reads `Shares.csv` from the export, parses it
  properly (post text is full of commas, quotes and newlines, so splitting on
  commas would shred it), pulls the trailing hashtag block out into tags,
  drops anything under 25 words, normalises the dates and strips em dashes on
  the way in so the push hook does not block you.
- It writes `app/data/notes.ts`, which starts empty. `/notes` 404s and stays
  out of the sitemap and the blog copy until there is something in it, the same
  way the testimonials section works.
- Tested end to end against a synthetic export: three rows in, the one liner
  skipped, two notes rendered at 390 px with dates, tags and a link to the
  original.
- Steps for you are at the end of `docs/seo/07`.

They land on one page rather than one post each, on purpose. A LinkedIn post is
a few sentences, and fifty pages of two hundred words is thin content that
competes with the real posts for the same keywords. If a note has a real idea
in it, that is a blog post waiting to be written properly.

### The IndexNow key

`public/75a8f5544719e8d9f23a01eb8ccfca56.txt`. The key is the file name and the file
contents, which is what Bing checks. `docs/seo/02` has the ping command.
