# 07. Blog topics and calendar

Two posts a month. Nine are out as of October 2026; five more run to January 2027.

Every topic below comes from work already done, so none of it needs research. That is the only
reason a two-a-month cadence is realistic. Writing about something already built takes two to
three hours. Writing about something unfamiliar takes a weekend and usually does not get
finished.

Each post needs: the `pageMetadata()` call, an `opengraph-image.tsx`, `BlogPosting` plus
`BreadcrumbList` JSON-LD, a sitemap entry, a visible byline linking to `/about`, and a real
published date. That contract is in the project's `CLAUDE.md`, and a post missing any of it is
a bug.

## The topics

Rewritten 13 Oct 2026. The first version planned six posts from company work, with the
employer named as the source. Company work is never named on this site (see `CLAUDE.md`), so
every topic now comes from a public repo of my own, and a post links the repo it came from.

### Published

| Post | Source |
| --- | --- |
| [Translation sync without breaking ICU](https://nevil.dev/blog/translation-sync-without-breaking-icu) | LangSync |
| [Telegram video before it finishes downloading](https://nevil.dev/blog/telegram-video-before-it-finishes-downloading) | TMPlayer |
| [Publishing a React component through the shadcn registry](https://nevil.dev/blog/shadcn-registry-image-cropper) | Image Cropper |
| [A PDF resume back into editable JSON](https://nevil.dev/blog/pdf-resume-back-into-editable-json) | Resume Builder |
| [Job outreach from your own Gmail](https://nevil.dev/blog/job-outreach-from-your-own-gmail) | Email Sender |
| [Translating game menus on Android without root](https://nevil.dev/blog/translating-game-menus-on-android-without-root) | TapTL |
| [TMPlayer on Windows and Linux](https://nevil.dev/blog/tmplayer-on-windows-and-linux) | TMPlayer |
| [Next.js on Cloudflare Workers with OpenNext](https://nevil.dev/blog/nextjs-on-cloudflare-workers-with-opennext) | opennext-cloudflare-implementation |
| [The Sway setup I work in](https://nevil.dev/blog/sway-setup-i-work-in) | swaydots |

### Still to write

#### 1. Cleaning out a Gmail account with nothing but Python's standard library

| Field | Value |
| --- | --- |
| Angle | IMAP is old and awkward, and it is still the one way to bulk delete from Gmail without an OAuth app. How Gmail maps labels to IMAP folders, why a delete is a move to Trash, and why the tool shows its plan and waits for a typed yes. |
| Target keyword | `delete old emails gmail imap python` |
| Source | `email_cleaner` |
| Cross-post | Dev.to, Hashnode, r/Python, r/selfhosted |

#### 2. Nuxt for people who already know Next.js

| Field | Value |
| --- | --- |
| Angle | The file by file map from one framework to the other: routing, layouts, `useFetch` against server components, Nitro routes against route handlers, middleware, Pinia against Zustand. Where Nuxt is nicer, and where it is not. |
| Target keyword | `nuxt for next.js developers` |
| Source | `nuxt-learning-lab`, live at nuxt.nevil.dev |
| Cross-post | Dev.to, Hashnode, r/Nuxt, r/vuejs |

#### 3. Connecting to an IKEv2 VPN from Linux

| Field | Value |
| --- | --- |
| Angle | Windows connects in two clicks and Linux gives you a blank NetworkManager dialog. Pulling the certificates out of a `.p12`, the cipher proposals Windows uses by default, split tunnelling, and the DNS fix when it connects but nothing resolves. |
| Target keyword | `ikev2 vpn linux networkmanager strongswan p12` |
| Source | `IKEv2-VPN-Setup-Guide` (generic hosts only, never a real gateway) |
| Cross-post | Dev.to, r/linux, r/Fedora, r/archlinux |

#### 4. Building a resume builder that never sends your data anywhere

| Field | Value |
| --- | --- |
| Angle | Resume Builder runs entirely in the browser. Why that decision shaped everything, how the PDF gets generated client side, and how a static app gets hosted for free on `js.org`. |
| Target keyword | `generate pdf in browser react resume builder` |
| Source | Resume Builder repo and `resumebuilder.js.org` |
| Cross-post | Dev.to, Hashnode, r/webdev, r/reactjs, r/developersIndia |

#### 5. What to check before paying for a refurbished laptop

| Field | Value |
| --- | --- |
| Angle | Not a tech post, and the one most likely to be found by someone who is not a developer. The checklist, the `powercfg /batteryreport` numbers that matter, and the BIOS and MDM locks that make a cheap laptop worthless. |
| Target keyword | `refurbished laptop checklist india` |
| Source | `refurbished-laptops-buying-guide` |
| Cross-post | r/IndianGaming, r/developersIndia, LinkedIn |

### Bonus, when the moment arrives

**Next.js 16 upgrade notes.** Write this the week after a real upgrade, while the pain is
fresh. Target keyword `next.js 16 upgrade notes`. Source: this site's own upgrade, which is in
its public git history. H2 questions: what actually broke, which codemods helped and which did
not, what changed about caching and `use cache`, and whether it was worth doing early. Upgrade
posts rank hard for a few months and then fade, so publish it within two weeks of the upgrade
or not at all.

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

| Date | Topic | Cross-post day |
| --- | --- | --- |
| Sat 7 Nov 2026 | 1. Cleaning out a Gmail account | Sun 8 Nov |
| Sat 21 Nov 2026 | 2. Nuxt for people who already know Next.js | Sun 22 Nov |
| Sat 5 Dec 2026 | 3. Connecting to an IKEv2 VPN from Linux | Sun 6 Dec |
| Sat 19 Dec 2026 | 4. A resume builder that never sends your data anywhere | Sun 20 Dec |
| Sat 9 Jan 2027 | 5. What to check before paying for a refurbished laptop | Sun 10 Jan |

Nine posts went out between September and October, so the rest of October is for
cross-posting those rather than writing more. After that, one post every two weeks.

If a post slips, move it to the next slot. Do not publish two thin posts to stay on schedule,
one good post a month is worth more.

## Done when

- [ ] The nine published posts cross-posted with canonical links
- [ ] Topics 1 to 5 shipped on their dates
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
