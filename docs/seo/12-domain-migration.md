# 12. Moving from nevil.dev to nevilkrishna.com

A site move is one of the few SEO jobs with a right order. Done in the right order Google
transfers the rankings and the dip is a few weeks. Done in the wrong order the old URLs drop
out before the new ones are known and the site starts from nothing.

Read this whole page before starting. Nothing here is hard, but step 3 cannot be undone by
step 5.

## The two rules

**Move early.** Every week spent promoting `nevil.dev` is another profile, another backlink
and another printed QR code to chase later. The site is young and thinly indexed right now,
which is the cheapest this move will ever be. It gets more expensive every month.

**Keep the old domain alive.** A 301 only works while `nevil.dev` still resolves. Google needs
at least 180 days of redirects for a Change of Address, and the honest answer is to keep the
redirect running for years. Do not plan to let `nevil.dev` lapse on 1 October. Renew it for
two or three years as a redirect host, then decide later.

## Phase 1: before you touch anything

- [ ] Renew `nevil.dev` at Namecheap for at least 2 years. It is now the redirect host, not
      the disposable domain (`01-domains.md`, section 0)
- [ ] Buy `nevilkrishna.com`, auto-renew on, WHOIS privacy on
- [ ] Add `nevilkrishna.com` to Cloudflare, SSL mode Full (strict)
- [ ] Add `nevilkrishna.com` in Vercel, on the same project

## Phase 2: the code

`SITE_URL` in `app/lib/seo.ts` already reads `NEXT_PUBLIC_SITE_URL`, so canonicals, the
sitemap, Open Graph, the JSON-LD graph, `llms.txt`, the feed and the build-time QR codes all
follow one environment variable. These are the literals that do not.

- [ ] `NEXT_PUBLIC_SITE_URL=https://nevilkrishna.com` in the Vercel production environment
- [ ] `app/lib/og.tsx`, the footer text on every OG card
- [ ] `app/lib/schema.ts`, `alternateName`
- [ ] `app/lib/llms.ts`, the "Also known as" line
- [ ] `app/lib/post-card.tsx`, the visible byline
- [ ] `app/data/keywords.ts`, the keyword entry
- [ ] `scripts/resume.html`, which still says `http://nevil.dev` over plain http
- [ ] `public/qr-nevil-dev.svg`, and the filename with it
- [ ] Rebuild the resume PDF with `pnpm resume` so the printed link and QR change
- [ ] Generate a new IndexNow key for the new host and serve it from `public/`

Do not change `sameAs` in `app/lib/schema.ts`. Those point outward at LinkedIn, GitHub and X,
and none of them move.

## Phase 3: the redirect

Everything on `nevil.dev` answers **301**, to the **same path** on `nevilkrishna.com`, with the
query string preserved. Redirecting every old URL to the new homepage is the single most common
way a site move loses its rankings, because Google reads a redirect to an unrelated page as a
soft 404 and transfers nothing.

In Cloudflare, on the `nevil.dev` zone, Rules then Redirect Rules:

- Expression: `(http.host eq "nevil.dev" or http.host eq "www.nevil.dev")`
- Target: dynamic, `concat("https://nevilkrishna.com", http.request.uri.path)`
- Status: 301, preserve query string on

Then confirm with curl before going further:

```bash
curl -sI https://nevil.dev/hire/thrissur | grep -i "^HTTP\|^location"
curl -sI https://www.nevil.dev/projects/seatinfo | grep -i "^HTTP\|^location"
curl -sI "https://nevil.dev/blog?utm_source=x" | grep -i "^HTTP\|^location"
```

Each one must answer 301 and a Location on `nevilkrishna.com` with the path intact.

- [ ] `dracufolio.vercel.app` now redirects to `nevilkrishna.com`, 308, path preserved
- [ ] No page on the site links to `nevil.dev` any more. A redirect is a fallback, not a link

## Phase 4: Search Console

The order matters here.

1. [ ] Add `nevilkrishna.com` as a **Domain** property and verify it with the TXT record
2. [ ] Submit `https://nevilkrishna.com/sitemap.xml` in the new property
3. [ ] In the **old** `nevil.dev` property, open Settings then **Change of address**, and
       select `nevilkrishna.com`. It checks the redirect itself and refuses if step 3 is wrong
4. [ ] Leave the old sitemap in place in the old property. Google needs to recrawl the old
       URLs to discover the redirects, and it cannot recrawl what it has been told to forget
5. [ ] Keep both properties for at least a year. Watch impressions fall in one and rise in the
       other. That crossover is the migration working
6. [ ] Bing Webmaster Tools has its own **Site Move** tool. Same thing, run it too

Change of address is the tool that makes this fast. Without it a move takes months. With it,
most of the transfer happens in a few weeks.

## Phase 5: the links you control

A 301 passes the ranking value, so none of this is strictly required. It matters because a
redirect is one more hop that can break, and because a profile is a trust signal read by
humans as well as crawlers.

- [ ] LinkedIn website field, and any link in the About section
- [ ] GitHub profile website, the profile README, and the website field on every pinned repo
- [ ] X bio and website
- [ ] Google Business Profile website field. This one matters most, it is a live business listing
- [ ] Dev.to, Hashnode, Peerlist, Gravatar
- [ ] The canonical tag on every cross-posted article on Dev.to and Hashnode
- [ ] Email signature
- [ ] The "Built by Nevil Krishna K" footer links on `tmplayer.org` and the other client site
- [ ] The 10 to 15 list-post authors from `05`, emailed once, politely, with the new URL

What you cannot change is anybody else's link. That is what the 301 is for, and why it stays
up for years rather than months.

## Phase 6: adora.nevil.dev

`app/data/projects.json` lists `https://adora.nevil.dev` as a live project URL. It is a real
deployment on a subdomain of the domain you are moving away from, and a Redirect Rule written
for the apex and `www` will not touch it.

Decide which of these it is:

- Move it to the client's own domain. Best outcome, and the conversation is easier now than
  after the subdomain dies
- Move it to `adora.nevilkrishna.com` and update `projects.json`
- Keep it on `adora.nevil.dev` for as long as `nevil.dev` is renewed, and accept that it dies
  the day you stop renewing

It currently serves `x-robots-tag: noindex, nofollow`, so there is no search equity to lose.
The risk is a dead link in your own portfolio, which is worse than a dead page nobody indexed.

Check for others before you start:

```bash
grep -rhoE "[a-z0-9-]+\.nevil\.dev" --include="*.json" --include="*.ts" --include="*.tsx" . \
  --exclude-dir=node_modules --exclude-dir=.next | sort -u
```

## What to expect

Rankings wobble for two to six weeks. Impressions dip, then recover on the new domain. That is
normal and it is not a reason to change anything mid-move. The things that actually cause a
permanent loss are all avoidable: a redirect to the homepage instead of the matching page, a
302 instead of a 301, letting the old domain expire, or skipping the change of address tool.

## Done when

- [ ] Every old URL answers 301 to its match on the new domain
- [ ] Change of address submitted in Search Console and Site Move in Bing
- [ ] New sitemap submitted and reporting Success
- [ ] Every profile you own points at `nevilkrishna.com`
- [ ] Google Business Profile updated
- [ ] `adora.nevil.dev` resolved one way or the other
- [ ] `nevil.dev` renewed far enough out that the redirect outlives the transfer
