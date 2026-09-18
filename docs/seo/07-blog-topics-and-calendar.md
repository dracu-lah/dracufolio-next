# 07. Blog topics and calendar

Two posts a month for five months. October 2026 to February 2027.

Every topic below comes from work already done, so none of it needs research. That is the only
reason a two-a-month cadence is realistic. Writing about something already built takes two to
three hours. Writing about something unfamiliar takes a weekend and usually does not get
finished.

Each post needs: the `pageMetadata()` call, an `opengraph-image.tsx`, `BlogPosting` plus
`BreadcrumbList` JSON-LD, a sitemap entry, a visible byline linking to `/about`, and a real
published date. That contract is in the project's `CLAUDE.md`, and a post missing any of it is
a bug.

## The 10 topics

### 1. Keeping translation files in sync without losing your mind

| Field | Value |
| --- | --- |
| Angle | You wrote a CLI because manually diffing `en.json` against seven other locales is how keys go missing in production. What the tool does, and what it taught you about how i18n files rot. |
| Target keyword | `keep i18n translation files in sync` |
| Source | LangSync repo |
| Cross-post | Dev.to, Hashnode, r/webdev, r/reactjs |

H2 questions:

1. Why do translation files drift apart in the first place?
2. What does LangSync actually check, key by key?
3. How do you wire it into CI so a missing key fails the build?
4. What should you do about keys that exist but are still in English?

### 2. Rendering a 2,000 seat map in the browser without dropping frames

| Field | Value |
| --- | --- |
| Angle | The real engineering story from SeatInfo. SVG versus canvas, why the first version stuttered, and the specific changes that fixed it. Include real before and after numbers. |
| Target keyword | `render large svg seat map react performance` |
| Source | SeatInfo work at Lascade (describe the technique, no client code) |
| Cross-post | Dev.to, Hashnode, r/reactjs, r/webdev, X thread |

H2 questions:

1. Why did the naive version of the seat map get slow?
2. SVG or canvas for thousands of interactive shapes?
3. How do you do hit testing and hover state without re-rendering everything?
4. How do zoom and pan work when every seat has to stay clickable?

### 3. Zoom and pan that feels right on a phone

| Field | Value |
| --- | --- |
| Angle | The follow-up to post 2, narrower and more practical. Pinch, double tap, momentum, clamping to bounds, and why the browser's own gesture handling gets in the way. |
| Target keyword | `pinch zoom pan react svg touch` |
| Source | SeatInfo work at Lascade |
| Cross-post | Dev.to, Hashnode, r/reactjs |

H2 questions:

1. What does a good pinch-to-zoom actually have to do?
2. Which browser defaults have to be turned off, and how?
3. How do you keep the content inside its bounds while it is being dragged?
4. How do you test this without a real device farm?

### 4. Running next-intl on Cloudflare Workers with OpenNext

| Field | Value |
| --- | --- |
| Angle | This combination is rare and barely documented, which makes it the highest-value post on the list. What OpenNext does to a Next.js build, what next-intl assumes, where the two disagree, and the fix. |
| Target keyword | `next-intl cloudflare workers opennext` |
| Source | SeatInfo deployment work |
| Cross-post | Dev.to, Hashnode, r/nextjs, r/CloudFlare, the Next.js and Cloudflare Discords |

H2 questions:

1. What does OpenNext change about how a Next.js app runs?
2. Why does middleware-based locale routing behave differently on Workers?
3. How do you load message files at the edge without bundling all of them?
4. What does this cost compared to running the same app on Vercel?

### 5. Cloudflare D1 migrations on a project that is already live

| Field | Value |
| --- | --- |
| Angle | D1 migrations are simple until there is real data behind them. The workflow that works, the commands, and how to not lock yourself out of production. |
| Target keyword | `cloudflare d1 migrations production` |
| Source | SeatInfo infrastructure work |
| Cross-post | Dev.to, Hashnode, r/CloudFlare, the Cloudflare Discord |

H2 questions:

1. How do D1 migrations work, and what do they not do?
2. How do you test a migration before it touches production data?
3. What is the safe order for a rename or a column drop?
4. How do you take and restore a backup when something goes wrong?

### 6. Zustand stores that survive a growing app

| Field | Value |
| --- | --- |
| Angle | Not a tutorial. The patterns that held up across three production apps and the two that had to be undone: slicing, selectors, when persistence causes more problems than it solves, and where TanStack Query takes over. |
| Target keyword | `zustand patterns large react app` |
| Source | Patterns from SeatInfo, TukTuko admin panel and the resume builder |
| Cross-post | Dev.to, Hashnode, r/reactjs, X thread |

H2 questions:

1. What belongs in Zustand and what belongs in TanStack Query?
2. How do you split one store into slices without a circular import mess?
3. Why do selectors matter more than the store shape?
4. When does `persist` hurt, and what do you do instead?

### 7. Self-hosting Nominatim and OSRM so you stop paying per map request

| Field | Value |
| --- | --- |
| Angle | A real cost story from Udyata. Geocoding and routing bills against a Docker setup on your own box: what it takes to import a region, what RAM and disk it needs, and what breaks. |
| Target keyword | `self host nominatim osrm docker` |
| Source | Udyata OpenStreetMap work |
| Cross-post | Dev.to, Hashnode, r/gis, r/selfhosted, r/openstreetmap |

H2 questions:

1. What do Nominatim and OSRM each do, and when do you need both?
2. What does it take to import an India or Kerala extract?
3. How do you keep the data updated without re-importing everything?
4. What does this actually save compared to a paid geocoding API?

### 8. Streaming video from Telegram with a custom Media3 DataSource

| Field | Value |
| --- | --- |
| Angle | The hardest part of TMPlayer. How a Media3 `DataSource` works, how to hand it bytes that arrive from TDLib instead of from a URL, and how seeking works when the file is still downloading. |
| Target keyword | `media3 custom datasource android` |
| Source | TMPlayer repo |
| Cross-post | Dev.to, Hashnode, r/androiddev, r/androidtv, XDA |

H2 questions:

1. What is a Media3 DataSource responsible for?
2. How do you feed it a file that TDLib is still downloading?
3. How do you make seeking work on a partially downloaded file?
4. What does the Android TV D-pad add to all of this?

### 9. Building a resume builder that never sends your data anywhere

| Field | Value |
| --- | --- |
| Angle | Resume Builder runs entirely in the browser. Why that decision shaped everything, how the PDF gets generated client-side, and how a static app gets hosted for free on `js.org`. |
| Target keyword | `generate pdf in browser react resume builder` |
| Source | Resume Builder repo and `resumebuilder.js.org` |
| Cross-post | Dev.to, Hashnode, r/webdev, r/reactjs, r/developersIndia |

H2 questions:

1. Why keep a resume tool entirely client-side?
2. What are the real options for making a PDF in the browser, and what do they cost in bundle size?
3. How do you get print and PDF output to match what is on screen?
4. How do you get a free `js.org` subdomain and host it?

### 10. My Fedora and Sway setup, and why I left the desktop environments

| Field | Value |
| --- | --- |
| Angle | A working developer's setup, not a ricing showcase. What Sway fixed, what it broke, the actual config, and the parts that still need a workaround. Links the dotfiles repos. |
| Target keyword | `fedora sway setup developer` |
| Source | swaydots and hyprdots repos |
| Cross-post | Dev.to, Hashnode, r/swaywm, r/Fedora, r/unixporn |

H2 questions:

1. What made a tiling compositor worth the switch on a work machine?
2. What does a Fedora and Sway setup need on day one?
3. What still does not work properly, and what is the workaround?
4. Sway or Hyprland, and does it matter?

### Bonus, when the moment arrives

**Next.js 16 upgrade notes.** Write this the week after any real upgrade, while the pain is
fresh. Target keyword `next.js 16 upgrade notes`. Source: the SeatInfo and dracufolio upgrades.
H2 questions: what actually broke, which codemods helped and which did not, what changed about
caching and `use cache`, and whether it was worth doing early. Upgrade posts rank hard for a
few months and then fade, so publish it within two weeks of the upgrade or not at all.

## The cross-posting routine

Do this the day after the post goes live on `nevil.dev`, not the same day. The canonical
version needs to be crawled first.

### 1. Dev.to

1. Open `https://dev.to/new`.
2. Paste the post body as Markdown.
3. Click the gear icon, then **Canonical URL**, and paste the `nevil.dev` URL. In the front
   matter view it is:

```
---
title: Running next-intl on Cloudflare Workers with OpenNext
published: true
canonical_url: https://nevil.dev/blog/next-intl-cloudflare-workers
tags: nextjs, cloudflare, i18n, webdev
cover_image: https://nevil.dev/blog/next-intl-cloudflare-workers/opengraph-image
---
```

4. Four tags maximum. Use tags that exist and have followers: `nextjs`, `react`, `webdev`,
   `typescript`, `cloudflare`, `android`, `kotlin`, `performance`, `linux`, `beginners`.
5. Publish.

The canonical URL is the whole point. It tells Google that `nevil.dev` is the original, so the
Dev.to copy does not outrank it (Dev.to has far more authority and it would, otherwise).

### 2. Hashnode

1. Open the Hashnode dashboard, **Write**.
2. Paste the same Markdown.
3. Open the article settings sidebar, find **Original article URL / Canonical URL**, and paste
   the `nevil.dev` URL. Hashnode will show a "republished" note, which is correct.
4. Add up to five tags.
5. Publish.

### 3. What to change in the intro

Do not paste the identical first paragraph in three places. Change the opening two or three
sentences for each destination, keep everything after the first H2 identical.

| Destination | How the intro changes |
| --- | --- |
| `nevil.dev` | The canonical version. Opens with the problem as it appeared in your own work, and names the project. |
| Dev.to | Opens with the problem as the reader has it. "If you are running Next.js on Cloudflare Workers and your locale routing stopped working, this is why." One line of context about who you are, at the end, not the start. |
| Hashnode | Same as Dev.to, plus a first line saying it was originally published on `nevil.dev` with the link. |

Add this line at the bottom of both cross-posts:

```
Originally published at [nevil.dev](https://nevil.dev/blog/<slug>). I am a full stack developer
in Thrissur, Kerala. Available for freelance and remote work: [nevil.dev/hire](https://nevil.dev/hire)
```

### 4. Where to post it after

Same day as the cross-posts, in this order. Spread over the day, not all at once.

| Where | Format | Note |
| --- | --- | --- |
| X | A thread. First post is the single most surprising finding, last post is the link. | Never lead with the link, reach drops. There are templates in `08-marketing-playbook.md`. |
| LinkedIn | One post, 5 to 8 short lines, the lesson stated plainly, link in the first comment. | Same reason. Templates in `08`. |
| The relevant subreddit | The post's own content as a text post with the real detail, link at the bottom. Read the subreddit's self-promotion rule first. | r/nextjs and r/androiddev tolerate a good technical writeup. r/webdev wants it in the Saturday thread. |
| A relevant Discord | The Next.js, Cloudflare, Android or TinkerHub servers, in the channel meant for sharing. | One message, then answer questions. |
| Google Business Profile | A short post with the link. | See `03`, post idea 6. |
| IndexNow plus Search Console | Ping and request indexing for the post and `/blog`. | See `02`. |

### 5. Then leave it alone

Do not repost the same link every week. Revisit a post when there is a real reason: a version
bump made it wrong, someone asked a question worth adding, or a number changed. Update the post,
change the visible "updated on" date, and share it once more with what changed.

## The calendar

Publish day is Saturday morning, cross-post Sunday. The first Saturday of each month is also
the monthly checklist day (`11-monthly-checklist.md`), so that day is the busy one.

| Date | Post | Topic | Cross-post day |
| --- | --- | --- | --- |
| Sat 3 Oct 2026 | 1 | 4. next-intl on Cloudflare Workers with OpenNext | Sun 4 Oct |
| Sat 17 Oct 2026 | 2 | 2. Rendering a 2,000 seat map without dropping frames | Sun 18 Oct |
| Sat 7 Nov 2026 | 3 | 8. Streaming video from Telegram with a custom Media3 DataSource | Sun 8 Nov |
| Sat 21 Nov 2026 | 4 | 1. Keeping translation files in sync | Sun 22 Nov |
| Sat 5 Dec 2026 | 5 | 5. Cloudflare D1 migrations on a live project | Sun 6 Dec |
| Sat 19 Dec 2026 | 6 | 6. Zustand stores that survive a growing app | Sun 20 Dec |
| Sat 9 Jan 2027 | 7 | 7. Self-hosting Nominatim and OSRM | Sun 10 Jan |
| Sat 23 Jan 2027 | 8 | 9. Building a resume builder that never sends your data anywhere | Sun 24 Jan |
| Sat 6 Feb 2027 | 9 | 3. Zoom and pan that feels right on a phone | Sun 7 Feb |
| Sat 20 Feb 2027 | 10 | 10. My Fedora and Sway setup | Sun 21 Feb |

Why that order: post 1 is the rarest topic, so it goes first while the search results for it are
still thin. Post 2 is the most impressive piece of engineering, so it lands while the blog is
getting its first readers. Posts 3 and 4 open two new audiences (Android and i18n). The
personal setup post is last, because it brings traffic but not clients.

If a post slips, move it to the next slot and drop the last one. Ten posts published late beats
six posts and a guilty conscience. Do not publish two thin posts to stay on schedule, one good
post a month is worth more.

## Done when

- [ ] All 10 topics on the calendar, in the site's own drafts
- [ ] Post 1 live, cross-posted with canonical links, shared in all 6 places
- [ ] Posts 2 to 10 shipped on their dates
- [ ] Every post has a byline, a real date, the schema and a sitemap entry
- [ ] Every cross-post carries the canonical URL back to `nevil.dev`
- [ ] Every post pinged through IndexNow and submitted in Search Console

---

## Bringing your LinkedIn posts onto the site

Your LinkedIn posts cannot be scraped, and this is not a tooling limit. A
request to your profile or your activity feed without a logged-in session
answers with a redirect to a sign-in wall and no content, and LinkedIn's
robots.txt says in plain words that automated access without their written
permission is prohibited. Anything that claims to do it is either using your
session cookie or breaking their terms on your behalf.

LinkedIn's own export is the supported way, it is your content, and it takes
about ten minutes.

1. LinkedIn, top right menu, **Settings and privacy**
2. **Data privacy**, then **Get a copy of your data**
3. Choose **Download larger data archive** or tick **Posts** (it may be listed
   as **Shares**), then **Request archive**
4. LinkedIn emails a link, usually within ten minutes. Download and unzip it.
5. Find `Shares.csv` in the unzipped folder and run:

   ```bash
   node scripts/import-linkedin.mjs ~/Downloads/Basic_LinkedInDataExport/Shares.csv
   ```

6. Open `app/data/notes.ts`, read what came in, and delete anything not worth
   keeping. The import already drops anything under 25 words, strips the
   trailing hashtag block into tags, and replaces em dashes so the push hook
   does not block you.
7. `pnpm check:dashes && pnpm build`, then commit and push.

They appear at **nevil.dev/notes**, which stays hidden and out of the sitemap
while the file is empty.

### Why they land on one page instead of becoming blog posts

A LinkedIn post is a few sentences. Turning each one into its own page gives
you fifty pages of two hundred words, which is thin content: those pages
compete with your real posts for the same keywords and drag the whole domain
down. One dated page of notes is original writing by you and reads as exactly
what it is, and each note links back to the LinkedIn original.

If one of them has a real idea in it, that is a blog post waiting to happen.
Expand it to 1,200 words with the code and the numbers, publish it on the
blog, and leave the note pointing at it.
