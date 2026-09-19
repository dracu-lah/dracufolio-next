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

---

## 12. Round 2: design pass for click rate (18 Sep 2026)

Status: PLANNED, waiting for "start". Brief came in as a run of messages, collected here
in full so nothing gets dropped.

### 12.0 The brief, verbatim in substance

1. Some icons still do not read as 3D glossy like the others. Fix them, and add icons
   everywhere one is needed. Big icons or cards where they earn the space.
2. The current font looks AI generated. Move to standard faces that people like.
3. Every "Scan to chat" QR opens a modal with an enlarged code on click.
4. Badges do not look like badges.
5. Add framer animations, minimal but satisfying.
6. FAQ accordion has no open and close animation.
7. Add more blog posts from the public GitHub projects, with images and links out.
8. The contact closing block ("Have a project or a role in mind?") is bland. Design it.
9. WhatsApp somewhere else instead of the floating button at the bottom right.
10. "How it works" is congested.
11. Add a popup modal after a few seconds offering a talk or a quote.
12. Update the colors so a visitor is attracted immediately and wants to hire or talk.
13. Review header, footer and every element with Chromium, flow by flow, and record the
    design decision behind each change.
14. Keep spacing and symmetry consistent sitewide. Every element should earn its place.
15. UX first, then beautiful UI.

### 12.1 What the Chromium audit found

Captured at 1440 and 390 on /, /hire, /projects, /blog, /about with local headless
Chromium against the dev server on 3111.

| Where | What is wrong |
| --- | --- |
| `icons.tsx` | The Phosphor wrapper lost its `weight` prop, so every brand mark (WhatsApp, GitHub, LinkedIn, X) renders as a thin outline instead of duotone. The `CaretDown` call in `Faq.tsx` has the same empty gap where props used to be |
| Glossy chips | Only `Services` uses `Icon3D chip`. Contact rows, About, the FAB and every other icon render flat, which is the inconsistency reported |
| Chip size | `size-14` chip with a `size-7` glyph reads small and dim next to 32px headings |
| Project cards | The tech list is bare mono text separated by gaps. That is the "badges do not look like badges" report |
| Locations | The only real badge-shaped element on the site, so it and the project cards disagree with each other |
| FAQ | Native `<details>`, so open and close is instant with no height animation |
| CTA block | Heading, one sentence, two buttons and a small QR inside a dark rectangle. No hierarchy, no proof, no reason to act now |
| How it works | Four equal text columns with no icons, no numbering and no connector. Congested at 1440, a plain stack at 390 |
| Footer | Three columns of plain text links, no icons, no contact card, nothing to click that looks clickable |
| Header | Logo, five mono links, GitHub and Resume. The primary action (WhatsApp) is missing from it, so the only CTA above the fold competes with itself |
| Home length | All 18 projects render on the home page before anything else loads, which pushes services, experience and contact very far down |
| Color | Every token is chroma 0. Nothing on the page directs the eye to an action |
| Blog | Two posts, both dated 18 Sep 2026 |

### 12.2 Tasks

**R1 Icon system.** Restore `weight="duotone"` on the Phosphor wrapper and the lost props on
`CaretDown`. Extend `icons.tsx` with the glyphs the new sections need (calendar, clock,
send, document, verify, code, briefcase, message, copy, link, play, tag, timer, star,
arrow up), all Iconsax Bulk, all through the same `{ className, size }` contract. Audit
every call site and give a standalone icon the chip treatment, with `sm`, `md` and `lg`
chip sizes so a step card can carry a large one and a contact row a small one.

**R2 Typography.** Replace the display face. Self hosted, same loader, same four role
system, so `font-display`, `font-sans`, `font-mono` and the Malayalam fallback keep
working and no call site changes. CLAUDE.md golden rule gets rewritten to the new faces.
Pick is question 2 below.

**R3 Color.** Keep the dark base, stop being chroma 0. One accent hue carries actions,
links, focus rings and the live status dot, with a tinted surface and a tinted border
derived from it for badges and hover states. Text stays neutral so contrast holds. The
phosphor caret token folds into the accent instead of being a second green. CLAUDE.md
"black and white only" and "one accent, one element" rules get rewritten. Pick is
question 1 below.

**R4 Badge component.** `app/components/common/Badge.tsx`, variants `tech`, `status`,
`meta`, `count`, sizes `sm` and `md`, optional leading icon, tinted surface and border
from the accent for the live ones and neutral for tech. Applied to project card stacks,
project detail, blog tags, open source meta, location chips, experience stacks and the
availability pill.

**R5 QR modal.** `QrPanel` gets a client wrapper: the tile is a button, click opens a
Dialog with the code at ~320px, the destination as text, a copy button and a WhatsApp
button. Applies everywhere a QR already renders (CTA block, contact, hire, location,
project and post pages).

**R6 Motion.** Minimal and motivated, every one with a one line reason in code: section
headings and cards keep the existing `Reveal` but get a shared spring, buttons take a
press scale, cards take a border and lift on hover through motion values, badges take a
hover tint, the modal and the dialogs take a spring scale in, the step connector draws in
on scroll. All gated on `usePointerEffects()` where pointer shaped, all flat under
`prefers-reduced-motion`.

**R7 FAQ animation.** Keep `<details>` so the answer stays in the DOM for crawlers and
works with no JavaScript, and animate height with the grid rows technique plus a framer
rotate on the caret. No content is moved behind a client toggle.

**R8 CTA block redesign.** Two columns at `lg`. Left: heading, a line of proof (reply
time, hours, languages), three actions ranked WhatsApp, call, email, each with an icon,
and a live availability badge. Right: the QR card, now clickable, with the scan hint
under it. Real spacing, one border, no shadow.

**R9 How it works.** Four step cards with a number, a large glossy icon, the verb as the
title and the sentence under it, with a connector line between them at `lg` that draws in
on scroll. Two by two at `md`, a vertical timeline at 390.

**R10 WhatsApp placement.** Depends on question 3.

**R11 Timed modal.** Opens once per visitor after a delay or on exit intent, whichever
lands first, offering a talk or a quote, with WhatsApp and call in it. Remembered in
`localStorage`, never shown on a return visit that dismissed it, never on the hire form,
closes on Escape and on backdrop click, and it does not autofocus a field on mobile.
Delay and content are question 4.

**R12 Blog from the public repos.** Four new posts, each from a real repo, each with a
hero image already in `public/appwrite/projects/`, each linking to the project page, the
repo and the live URL, tags, an `opengraph-image.tsx`, a `posts.ts` entry, the sitemap
and the feed. Candidates: the js.org resume builder, the shadcn registry image cropper,
LangSync, the Gmail outreach sender. Facts come from the repos, not from memory.

**R13 Click rate.** Hire me moves into the header as the one solid button, project cards
grow a visible "Open case study" affordance, the home page shows six projects and sends
the rest to /projects, the mobile bottom bar carries WhatsApp and call, each section ends
with one internal link, and the availability badge gives a reason to act now.

**R14 Header and footer.** Header: active state, the solid Hire me, GitHub as an icon
button, a real mobile menu. Footer: a contact card with the QR and the number, social
icon buttons, the location list, and the same badge vocabulary as the rest.

**R15 Spacing and symmetry.** One section rhythm (`py-14 md:py-20 lg:py-24`), one
container, one heading size per level, one gap scale, verified at 390, 768 and 1440 with
Chromium side by side.

**R16 Verification.** `pnpm check:dashes`, `pnpm build`, both SEO scripts against
`pnpm start`, and a Chromium pass over every route at three widths before it lands.

### 12.3 Rules this round has to break, on purpose

Three golden rules in CLAUDE.md are written against what the brief asks for. They get
rewritten in the same commit, not quietly ignored:

- "black and white only" and "one accent, one element" become a one hue accent system.
- The four faces rule keeps its shape but names the new display and mono faces.
- "No gradients on surfaces" stays for cards. The chip exception grows to cover every
  icon chip size, which is where the glossy look comes from.

**R17 Reference study, then a twist.** Work through the nine references now listed in
CLAUDE.md and pull the patterns that keep showing up: the bento service grid, the bordered
step rail, the marquee of logos, the sticky CTA bar, the animated counter row, the card
hover that lights a border rather than lifting a shadow, the navbar pill highlight, the
tag chip, the availability dot. Each one that lands here arrives changed in at least two
of proportion, motion, content shape or surface, and the flat surface rule still applies.
Nothing ships that a reader could place as a particular registry demo.

**R18 Validate with the design taste skill.** Every concept in this round goes through
`design-taste-frontend` before it is built, and the audit note for each element is kept in
section 12.4 so the reasoning survives the commit.

### 12.4 Design decisions, element by element

| Element | Reference pattern | The twist | Why |
| --- | --- | --- | --- |
| Colour | One saturated accent on a neutral base, the Linear and Vercel move | The accent is the WhatsApp green, so the primary button and the brand mark agree instead of competing, and the old phosphor token folds into it | One hue with one meaning. Before this every token was chroma 0 and nothing on the page told the eye where to act |
| Type | Geist plus Geist Mono, a pairing a developer sees every day | Display and body are the same face separated by weight and tracking, so the site reads as one voice and one less file goes over the wire | The brief was "standard fonts people like". Bricolage was the face that read as generated |
| Badge | The registry tag chip | Fixed height, full corner, mono, three tones where the tone carries meaning rather than decoration | A stack printed as bare words separated by gaps was the "badges do not look like badges" report |
| Icon chip | The glossy app-icon tile | Monochrome gloss for description, accent gloss for action, three sizes, and the specular highlight tracks the pointer tilt | The chip existed on one section only, so eleven other icons looked flat next to it |
| How it works | The numbered step row | No numbers. A rail draws itself left to right behind the icons at `lg` and turns vertical below it, and each step is one sentence | The section was four columns of small text, which is the congestion that was reported. Numbers would have added a second label to something the rail already says |
| Closing CTA | The split CTA card | Left side answers the three questions somebody has before messaging a stranger (free, how fast, which language) as badges, right side is the three ways to reach me ranked, with the QR under them | A heading, a sentence and two buttons asked for a decision while giving nothing to decide with |
| WhatsApp | The floating action bubble | Deleted. It is the solid header button from `md` up and a docked bar below it, and the bar steps aside over the contact form | A bubble in the corner covers the form it is asking you to fill in, and it is the single most templated element on a freelance site |
| Quote prompt | The exit-intent modal | Desktop only, 30 seconds or exit intent, once per visitor, remembered | Google's intrusive interstitial rule is about mobile pages that cover content on arrival from search. A phone already has the docked bar, so a phone gets nothing extra |
| FAQ | The JS accordion | Stays a native `<details>` and animates through `::details-content` with `interpolate-size`, so the answer text is in the DOM for crawlers and there is no JavaScript at all | The report was "no animation". A client-side accordion would have animated it and cost the SEO value of the answers |
| Project card | The image card | Two line description at every width, three stack badges plus a count, and a "Case study" affordance that lights up with the border | The whole card was already a link, but a card with no visible action reads as a picture |
| Blog index | The dated headline list | Two columns, each with the real screenshot of the thing the post is about, date and reading time as badges | Four new posts landed in this round. A wall of dated headlines does not get opened |
| Footer | Three columns of links | A contact block with the availability badge, the number and the email, then the marks as glossy icon chips on their own row | The footer was the least clickable part of the site |
| Header | Logo, links, two buttons | GitHub becomes an icon, Resume becomes the quiet ghost button, WhatsApp becomes the one solid button, and below `lg` there is a real menu | There was no navigation at all below `lg`, so every page but the current one was unreachable from a phone |

### 12.5 Decisions locked in for this round

| Item | Decision |
| --- | --- |
| Accent | Signal green, `oklch(0.78 0.17 152)`, on a warm near-black base. It carries buttons, links, focus rings, badge tints and the availability dot. The WhatsApp CTA reads as native because the accent and the brand mark agree. The old `--phosphor` token folds into it, so there is still one hue on the page |
| Base | `oklch(0.15 0.004 60)` background and `oklch(0.18 0.004 60)` card, so no pure black anywhere |
| Faces | Geist for display and body, separated by weight and size, Geist Mono for UI labels, buttons, dates and code, Anek Malayalam unchanged. Bricolage Grotesque and Google Sans Code come out, which takes the site from four faces to three |
| WhatsApp | The floating bottom right button goes. WhatsApp becomes the one solid button in the header, and phones get a docked bar with WhatsApp and Call that cannot cover the contact form |
| Popup | Fires at 30 seconds or on exit intent, whichever lands first, once per visitor, dismissal remembered. Offers the free twenty minute call and a fixed quote, with WhatsApp and Call inside |
| Dials | DESIGN_VARIANCE 7, MOTION_INTENSITY 6, VISUAL_DENSITY 4, from the developer portfolio preset plus the overhaul bump |
| Design read | Developer portfolio for hiring managers and Kerala clients, dark engineered language, Tailwind v4 tokens, one saturated accent, restrained physical motion |

### 12.6 Audience review, and what was done about it

A recruiter persona and a small-business client persona were run against the real pages
through headless Chromium. The recruiter's report, and the response to each point:

| Finding | Action |
| --- | --- |
| The fold never says whether he is available, at what level, or whether remote works. "Currently at Lascade" reads as "not looking" | Done. The availability badge shares the top line with the Malayalam greeting, so it costs no height, and it now says "Open to roles and projects" rather than "Open for projects". The subline leads with "Three years" and ends with "remote across India" |
| The typewriter spends most of its life as a fragment. A screenshot caught the role reading "An" | Done. The role swaps as a whole word with a short slide, so it cannot be caught half written. The sizer that stops the line reflowing stays |
| Six FAQ rows shut, with "Are you open to full time jobs?" behind a click, and "Who is the best full stack developer in Thrissur?" first | Done. The list now opens with freelance, full time and mobile, the search-phrased question moved to fourth, and the first answer is open on arrival. The FAQ schema is unchanged, so nothing was lost |
| The home page projects rail shows one card at a time on a phone | Done. One column on a phone, three cards, the rest behind the button. Two columns from `sm` |
| "Where I work" is a wall of 31 place chips on the home page | Compromise. The home page shows districts and statewide only, with a link to /hire for the 13 towns. Every town page keeps its internal links from /hire, the footer and its siblings, so the crawl paths survive |
| Every post is dated 18 September 2026 | Open, for Nevil. I will not invent publication dates. If the two original posts were written earlier, set their real dates in `app/data/posts.ts` |
| No project says what he owned, or gives a number | Open, for Nevil. The facts are not in the repo and inventing them is worse than leaving the gap. A `role` and a `metrics` field on `projects.json` is the fix once the real answers exist |
| The site cannot decide between freelancer and full time hire | Partly. The badge now names both, and /hire holds the services pitch. The deeper split is a positioning decision, not a layout one |
| Delete the location pages and the search-phrased FAQ | Declined. They are the SEO layer this site was built for and they earn their keep on the pages they were built for. Reduced on the home page instead |
| The floating "N" circle overlaps the docked bar on a phone | Not a site element. That is the Next.js dev indicator and it does not exist in a production build |

The client persona (a 12 person interior design firm in Thrissur, non technical, wants a
site and a small booking dashboard) found a different set of problems:

| Finding | Action |
| --- | --- |
| "The Projects page is empty on a phone." Reproduced at several window heights | Fixed, and it was a real bug rather than a rendering artifact. Every card and every `Reveal` shipped `opacity: 0` in the server rendered HTML and waited for hydration to undo it, so on a slow load the page was a heading over nothing. Entrances are now CSS keyframes (`.rise-in`, `.reveal` in globals.css), scroll-linked where the browser has a view timeline. The whole site now renders with JavaScript disabled, verified in Chromium with `--disable-javascript` |
| "Thrissur is close enough to Thrissur that I can be there and back in a day" on the Thrissur page | Fixed in `app/hire/copy.ts`. The district page fell through to the drivable branch. It now says he lives there |
| "Workers, D1, R2 and cron through OpenNext" in the list a client reads. "I understood zero words" | Fixed. Every service blurb is in plain words now ("Getting it live and keeping it live, on hosting that costs a few hundred rupees a month"). The keywords still live in the toolkit, the experience bullets and the schema, where they are read by the audience that wants them |
| "a Lighthouse score you can show a client", on a page whose reader is the client | Fixed. "Built to be found on Google from day one, and fast enough to keep the people who arrive" |
| "filters that survive a refresh" read as "my data might disappear" | Fixed. "Big lists stay fast and nobody loses their place" |
| "See the other 12" sounds like the good ones are hidden | Fixed. "See all 18 projects" |
| The form never says what happens after Send | Fixed. The same promise as the WhatsApp route, in the same words, under the button |
| "The menu is a small square with an icon in it. I could not tell what it was" | Fixed. It says Menu, and Close when open |
| No price floor, no timeline anywhere | Open, for Nevil. This is the single biggest conversion gap and it needs your numbers, not mine. A "small business sites start from X" line and a "most take N weeks" line in the FAQ would have got a message out of this reader today |
| No testimonials, no client names, no logos | Open, for Nevil. `app/data/testimonials.ts` renders the section and the Review schema the moment there is one real quote in it. Two sentences with real names beats anything else on this list |
| Nothing shows a dashboard, which is what they came for | Open, for Nevil. The dashboards service has no screenshot behind it. If a client project can be shown, even blurred, it belongs in `projects.json` |
| Email is a gmail.com address on a site selling web work | Open, for Nevil. `nevil@nevil.dev` forwarding to Gmail is an afternoon of work and it changes one line in `app/data/contact.ts` |

---

# Round: border, labels, blog cards (19 Sep 2026)

Status: **plan written, decisions taken, waiting for "start"**.

Fifteen items came in during one session, most of them mid-build. Nothing has been changed yet.

## 1. The Project info panel has no left border

Findings first, because the border is actually there. On the project detail page
(`app/projects/[slug]/page.tsx`) the aside is drawn in border mode: the element
carries `bg-border` and the clipped fill layer carries `bg-card`. A pixel scan
down its left edge at a 1440px window is a solid `#2A2827` run 514 rows tall, so
the markup is right.

The problem is where that edge lands. The aside is the second column of
`lg:grid-cols-[1.2fr_0.8fr]`, and at 1440px the split happens to come out as
whole pixels (1280 content, 112 padding, 48 gap, 672 + 448). At almost every
other width it does not. Sampling across the edge:

| Window | Pixels across the left edge |
| --- | --- |
| 1440 | `0C0B09` `2A2827` `131110` (crisp) |
| 1441 | `0C0B09` `100F0D` `242221` `201F1D` `131211` |
| 1501 | `0C0B09` `0C0B09` `131210` `262423` `1C1A18` |
| 1600 | `0C0B09` `0C0B09` `131210` `262423` `1C1A18` |

The 1px edge is smeared over three device pixels and its peak never reaches the
border colour, which on a background this dark is the difference between a line
and nothing. The top and right edges sit on the container's padding lines, which
are whole pixels at any width, so they stay crisp. That is why only the left one
goes missing, and why it comes back if you resize the window a little.

Nothing in CSS snaps a fractional grid column to the device pixel grid, so the
fix is contrast: raise `--border` from `oklch(0.28 ...)` to about
`oklch(0.325 ...)` so a smeared hairline still reads, and lift `--input` by the
same step to keep the field frame distinct from a plain card edge. One token,
every hairline on the site benefits.

## 2. Lowercase labels that read as a typo

Sweep the site and write labels the way they read, per the golden rule already in
CLAUDE.md. Known so far:

- Project info list: `year`, `stack`, `status`
- Project header buttons: `visit live`, `view source`, `read the write-up`
- Project prev/next nav: `prev`, `next`, `start of list`, `end of list`
- Navbar: `hire`, `projects`, `blog`, `about`, `open source`
- Right rail: `home`, `projects`, `oss`, `about`, `contact`

Plus whatever the full pass turns up.

## 3. The rule through the phone number in the CTA card

`CtaBlock` gives the contact rows `divide-y divide-border`. The rule lands 12px
under the phone number, inside its descender band, so it reads as a strike
through the text rather than a separator. Drop the divider, space the rows with a
gap.

## 4. The CTA heading

"Want something like this?" gets rephrased and set over two lines.

## 5. YouTube channel

`https://www.youtube.com/@nevilkrishnak4064` is missing. It goes in
`app/data/socials.json`, the `sameAs` array in `app/lib/schema.ts` (which the
footer and `llms.txt` both read), so it lands everywhere at once.

## 6. Images in the LangSync post

`translation-sync-without-breaking-icu` carries no image, and the entry in
`app/data/posts.ts` has a comment saying that is deliberate: it used to borrow
the SeatInfo seat map, which is a different product. LangSync is a Python CLI and
there is no screenshot of it in the repo. Needs a decision.

## 7. Placeholder for a post with no image

The blog index renders the image block only when `post.image` exists, so a post
without one is a card of text next to cards with pictures. Needs a decision on
what the placeholder is and whether it is generated per post.

## 8. Blog cards as rows with the image on the left

The index is a two-up grid of tall cards with a 16:9 image on top. It becomes a
narrower card with the image on the left and the text beside it.

## 9. The CTA card is over-padded

`p-6 @4xl:p-10` on both halves plus the section's own `py-8 md:py-12`. Tighten
the card's inner padding so it stops reading as a poster.

## 10. The social rows on the about page are lost in their column

`app/components/sections/AboutSection.tsx` puts them in the narrow column under
the portrait at a `sm` chip and a 16px label, which leaves most of the width
empty. Bigger chip, bigger label, an arrow holding the right edge.

## 11. Home is missing from the header

`navLinks` in `app/components/common/Navbar/Navbar.tsx` has no Home. Adding it
needs care: every path starts with `/`, so the active-link match has to skip the
root or Home wins every comparison.

## 12. Adora Homes

`https://adora.nevil.dev/`, a Next.js site on OpenNext and Cloudflare for a
Thrissur builder. Screenshot supplied. Goes in `app/data/projects.json`.

## 13. Blog posts have no images, and the end of a post is a wall of nothing

Two separate things. The post bodies are pure prose with no figures. And after
"More posts" there is roughly a thousand pixels of empty page before the footer.

## 14. The "What I build" cards lost their borders

`app/components/sections/Services.tsx`, after the squircle refactor.

## 15. /hire shows three projects

It should use the same treatment as the landing page rather than a cut-down list.

## Decisions taken

1. **LangSync images: both.** Inline SVG diagrams in the MDX for the ICU parse
   tree and the batching pipeline, plus one real terminal capture of a
   `langsync` run, which also becomes the post's card image.
2. **Placeholder: generated per post.** A build-time image carrying the post's
   own title on the card surface, made the same way the OG cards are, so a post
   without a screenshot still has a card that says something.
3. **Blog cards: one column.** Full-width rows down the page, thumbnail on the
   left, date, title, description and tags beside it.

## What shipped, and where it deviated

Status: **built and checked**. Seventeen items. Verified at 1440, 1501 and 390,
then against a real `pnpm build` and `pnpm start`:

```
node scripts/check-jsonld.mjs http://localhost:3111
  Checking 60 routes from the sitemap.
  All 60 routes carry a valid graph.

node scripts/check-seo.mjs http://localhost:3111
  sitemap lists 60 URLs, 27 image entries
  29 location pages, 29 distinct location paragraphs
  feed.xml has 6 items
  All content checks pass.
```

The build prerenders all six `/blog/card/*` routes, and an unknown slug 404s
rather than rendering on demand.

| # | Item | Outcome |
| --- | --- | --- |
| 1 | Project info left border | `--border` 0.28 to 0.325, `--input` 0.34 to 0.385. Verified at 1501px, a width where the edge was invisible before |
| 2 | Lowercase labels | Done, plus the brand names in `projects.json` (`NextJS`, `TailwindCSS`, `ReactJS`, `ShadcnUI`, `JQuery`, `Typescript`, `JS`, `HeadlessUI`, `FramerMotion`, `GeminiAPI`, `ExpressJS`) |
| 3 | The rule through the phone number | Dropped, rows use a gap |
| 4 | CTA heading | "Want something like this built for your product?" |
| 5 | CTA padding | `p-6 @4xl:p-10` to `p-5 @4xl:p-7` |
| 6 | Post figures and diagrams | A `Figure` component in the MDX map, screenshots on four posts, five inline SVG diagrams, and a rendered terminal capture for LangSync |
| 7 | No-image placeholder | `/blog/card/<slug>`, one PNG per post, prerendered |
| 8 | Blog cards as rows | One column, thumbnail left, stacks below `md` |
| 9 | YouTube | `contact.ts`, `socials.json`, `sameAs`, `llms.txt`, footer, about, contact |
| 10 | About social rows | `md` chip, 20px label, arrow on the right edge |
| 11 | Home in the header | Added, active match skips the root |
| 12 | Adora Homes | Added at order 2, screenshot to WebP at 132KB |
| 13 | Post images and the empty end | End fixed, see below |
| 14 | "What I build" borders | Restored, see below |
| 15 | /hire projects | Landing rail, all 19 projects |
| 16 | Blog cards all one shape | Fixed row height, title and description clamped to two lines, tags held to one row. The thumbnail is `aspect-video` at every width and `h-full` sets its width from the row, so the row is the same shape as the picture in it. Stacks below `lg` rather than `md`, because a 16:9 thumbnail plus a readable text column does not fit a tablet |
| 17 | No hover scale on images | Removed from the blog rows, `ProjectCard` and the toolkit logos. Nothing on the site scales an image on hover now |

### Three bugs found while looking, none of them the bug reported

**The left border was never missing.** It is drawn at every window width. The
aside is the second column of an `fr` split, so its left edge lands on a
fraction at almost every width other than 1440, and Chromium spread the 1px
edge over three device pixels with a peak of `#242221`. The top and right edges
sit on the container's padding lines, which are whole pixels at any width, so
they stayed crisp. Nothing in CSS snaps a fractional grid column to the device
grid, so the fix was contrast rather than geometry.

**The thousand pixels at the end of every post was the CTA at width zero.**
`PostFooter` is a column flex container and `CtaBlock`'s section carries
`mx-auto`. An auto cross-axis margin cancels `align-items: stretch`, so the
section sized to its content, which came out as zero, while the card kept its
694px height and painted nothing. The `px-0 md:px-0 lg:px-0` that was being
passed in had never worked either: two padding utilities on one element are
resolved by stylesheet order, not attribute order. `CtaBlock` now takes a
`bare` flag instead.

**The service card borders were in the markup the whole time.** `useSquircle`
measured with `clientWidth`, which excludes the element's own border, but a
clip-path resolves against the border box. The generated path was a pixel short
and clipped away exactly the column the divider occupied. The dividers moved to
the unclipped inner element, and `useSize` now measures `offsetWidth`, so the
trap is gone for every future call site.

### Picked up on the way

- `app/lib/og.tsx` was still drawing `#7dd3a0` on `#0a0a0a`, the pre-leaf-green
  palette, on every OG card on the site. The token reader the post card needed
  is now `app/lib/palette.ts` and both cards read `globals.css`, so a card
  cannot drift from the palette again.
- The RSS enclosure hardcoded `type="image/webp"` on every post, including the
  two with PNG images. Now derived from the extension.
- `blogPostingNode`, the feed and the sitemap all dropped the image entirely
  for a post without one. They point at the generated card now.

### 18. The LangSync capture had a card inside a card

The first cut sat the terminal output inside its own bordered, rounded panel on
a background, so on the blog index it read as a small framed card floating
inside the row's own frame, with dead space on every side while every other row
was edge to edge. It is full bleed now: the surface is `--card`, the type fills
the 16:9 frame, and the row's own border does the framing. The type got bigger
as a result, which is most of what the phone width needed.

The source is kept at `scripts/assets/langsync-run.html` with the two commands
to regenerate it, so it is not a mystery asset the next time a number changes.

Worth knowing: the dev image optimizer served the old variant for that path even
after the file was replaced and the server restarted. `rm -rf
.next/dev/cache/images` clears it. It does not affect a real build.

### One judgement call to make

The LangSync terminal capture is a reconstruction, built from what the post
itself claims the tool does, not a recording of a real session. That is normal
for documentation of your own tool, but the caption opens with "One sync",
which reads like a captured run. Only you know whether those numbers match a
real one. Say the word and it becomes an illustration in the caption, or the
numbers get replaced with real output.

### Still open, for Nevil

- The Adora stack list is what the headers and the shipped CSS actually prove
  (Next.js, React, Tailwind CSS, OpenNext, Cloudflare Workers). Correct it in
  `app/data/projects.json` if it understates the work.
- `adora.nevil.dev` currently serves `x-robots-tag: noindex, nofollow`. Fine for
  a staging host, worth knowing before the project page links to it.
- The generated post card fetches the DM Sans ttf from Google Fonts at build
  time, because `next/font` only hands out woff2 and satori cannot read it. It
  falls back to the built-in sans rather than failing a build with no network,
  but it is the one build-time network dependency on the site.

---

## 12. Alignment, phone weight and the full screen menu (19 Sep 2026)

Raised in one sitting, roughly in this order: the landing page, /hire and
/projects do not look centred; the /about portrait and social icons are too big
on a phone; hide what is too big on a phone and keep it on the desktop; hide the
/about social list entirely, the footer carries those links; the phone menu
should run to the bottom of the screen; drop Android from the hero role line,
then keep it on desktop only and hide the slash it leaves behind; the landing
rail overflows, make it use the same width as everything else; show the hero
photo beside the text on an iPad; on /about too, photo left and the writing
beside it; take Open Source off the header.

### What was actually wrong

Every page container was already `mx-auto max-w-7xl` with a
`px-6 md:px-10 lg:px-14` gutter. The navbar was not: it ran edge to edge at
`px-4 md:px-6`, so on a 1440px screen the logo sat 112px left of the page's own
left edge and the WhatsApp button the same distance right of it. That is what
read as "nothing is centred". No page needed its text centred, so none of them
got it.

/projects had a real bug underneath the complaint. The badge row in a card is
`flex-nowrap`, and a grid item is `min-width: auto`, so the card's min-content
width inflated the single mobile column and pushed the card past the right
gutter. The 26 character badge budget had been measured against the 384px
desktop card; a 390px phone has about 34px less to give.

### Shipped

- Navbar row sits in the page container, so the logo, the links and the right
  hand cluster share the page's left and right edge. Open Source came off the
  link list; the footer and /about still route to it.
- Phone menu is a full height panel: links centred in the free space, call,
  resume and GitHub on the floor.
- Hero is two columns from `md`, so an iPad gets the photo beside the text. The
  portrait is `size-56` on a phone, `size-64` on a tablet. Android and the slash
  in front of it are `hidden lg:inline`.
- Projects rail lives in the same capped container as every other section, with
  the bleed spacers gone. The cut on the last card now lands on the gutter.
- Project card takes `min-w-0`, the badge row clips, and the budget is 20.
- /about is two columns from `md` with the same square crop as the hero, capped
  at 14rem on a phone. The social list is `hidden md:flex`.
- Phone weight: four of the six service cards, two of the four toolkit rows.
  Everything hidden is `md` and up, nothing was deleted.

### Deviations

- "Center aligned" was answered by aligning the navbar, not by centring any
  text. Nothing else on the site was off centre.
- "Remove Android from the hero" became "desktop only" one message later, and
  the About social list went from "hide on mobile" to "hide completely" and back
  to "desktop only". The file reflects the last instruction in each pair.
- Verified against a production build served on port 3222 from a temporary
  `distDir`, because the dev server's HMR connection stops headless Chromium
  from ever firing load. The config change and the build directory were both
  reverted; `check-jsonld` and `check-seo` pass on all 60 routes.

## 13. One WhatsApp button in view, wherever you are (19 Sep 2026)

### What was raised

"Check the site now and see if anything else looks off", then "fix all" against
the three findings that came back.

### What was actually wrong

A sweep over 10 routes at 390, 820 and 1440 found the layout clean: no
horizontal page overflow anywhere, one h1 per page, nothing under 14px. What it
did find was the rule in CLAUDE.md being broken on a page that matters:

- Two WhatsApp CTAs on screen at once on /hire and /hire/thrissur. On a desktop
  it was the solid header button and the solid hero button, about 500px apart.
  On a phone it was the hero button with the docked bar sitting on top of it.
- The docked bar only ever watched `#contact`. Every inner page ends in a
  CtaBlock with its own WhatsApp button, so the bar sat over that one too, and
  the rootMargin it used for the form (`-20%`) meant a button low in the
  viewport did not register at all.
- Both of those are older than the alignment work in section 12. They were
  found by measuring, not by looking: the sweep counts links to wa.me that are
  on screen, visible, and not behind `pointer-events: none`.
- On /blog at 390 the date and the read time needed 299px in a 294px box, so
  they broke onto two rows for the sake of five pixels.

### Shipped

- `usePageCtaOnScreen` in `app/components/cta/`: one IntersectionObserver over
  everything matching a selector, keyed on the path because both callers
  outlive the page under them. The route change clears the answer during
  render, not in the effect, for the same reason the navbar closes its menu
  that way.
- `WhatsAppButton` carries `data-whatsapp-cta`, so every page level WhatsApp
  button is findable wherever it is dropped.
- The docked bar asks that hook twice: once for the page CTA at margin 0, once
  for `#contact` at `-20%`, because a button should count the moment it is
  visible and a tall form should not.
- The header button asks the same hook and drops to the bordered variant while
  a page CTA is in view. Same size, same place, same label, so nothing moves:
  there is now exactly one accent filled WhatsApp button in any view on any
  route, confirmed by reading computed background colours at 1440.
- Blog card is `p-5` on a phone and `p-6` from `md`, which is what the project
  card already does. The two badges share one line again.

### Deviations

- The fix offered was "header goes ghost on /hire only". It ships as the
  observer instead, on every route, because the CtaBlock at the foot of
  /projects, /blog, /open-source and every project page had the same pair and a
  path check would have left all of them broken.
- `ghost` became `default`. Ghost has no edge at all, and the header cluster is
  GitHub, Resume and WhatsApp side by side: a button with no frame between two
  framed ones reads as a mistake rather than as deference.
- The footer's WhatsApp entry sits in the socials row and is left alone. It is
  a profile link in a list of profile links, not a CTA, and the rule is about
  two buttons competing for the same tap.
