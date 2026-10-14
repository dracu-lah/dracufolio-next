# AGENTS.md

Rules for any coding agent working in this repo (Claude Code, Codex, Cursor and the rest).
`CLAUDE.md` holds the design, content and SEO contract. This file is the order of priorities
and the checks every change goes through before it is pushed. Added 13 Oct 2026 at Nevil's
request.

## The order of priorities

1. **People can find the site.** Google, Bing, and AI assistants all have to be able to crawl,
   understand and quote every public page.
2. **People can use it.** It has to be readable at 390px and at 67% zoom, fast on a mid range
   phone on 4G, and one tap from WhatsApp.
3. **Everything else.** Looks, motion, and tidy code.

A change that improves 3 at the cost of 1 or 2 does not ship. If a request would trade search
visibility or speed for looks, say so before building it and let Nevil decide.

## SEO first, on every change

- **No regressions.** Before touching metadata, layout or routing, save the rendered `<head>` of
  the affected pages, then diff it after the change. A changed title, description, canonical,
  `og:*` tag or robots tag must be intended and mentioned in the commit.
- **Crawlers see what people see.** Content and links are in the server-rendered HTML. No text
  that only appears after client JavaScript runs, no navigation that is a `button` with an
  `onClick` instead of an `a href`, and no content hidden behind a tab or accordion that is not
  in the DOM.
- **Every route keeps the SEO contract** in `CLAUDE.md`: `pageMetadata()`, an OG image, one
  `@graph` from `pageGraph()`, a sitemap entry, one `h1`, and a canonical.
- **URLs are permanent.** A moved or removed page gets a 308 to the closest real page, never a
  404 and never a chain of redirects. Its share image needs to redirect too.
- **robots.txt blocks only `/api/`.** Never block `/_next/` or `public/` assets. Google renders
  pages, and it can't do that without the scripts, styles and images.
- **Dates are honest.** When content changes, bump its entry in `app/data/updated.ts`. Never
  stamp the build time.
- **New content gets linked.** A new post goes in `app/data/posts.ts` with its folder and OG
  image, and links from its project page if it has one. A page with no internal links to it
  does not get crawled.
- **After a deploy,** the IndexNow workflow pings the URLs that changed. If it didn't run, use
  `pnpm indexnow`. Tell Nevil which URLs to put through Request Indexing in Search Console.

## Performance and UX, on every change

- **The targets are Google's "good" thresholds on mobile:** LCP under 2.5 s, INP under 200 ms,
  CLS under 0.1. A change that moves any of them the wrong way needs a reason.
- **Server components by default.** `"use client"` only where the component needs state, effects
  or the browser, with the reason in a comment. No new client JavaScript for something that can
  render on the server.
- **Images go through `next/image`** with real `width` and `height` (or `fill` with `sizes`) so
  nothing shifts while loading. Above-the-fold images get `priority`. Images are not
  re-compressed (see `CLAUDE.md`). A wrong size is fixed with `sizes`, not with quality.
- **No new third-party script, font or tracking pixel** without asking. Each one costs speed and
  privacy on every page.
- **Check every new or changed page at 390px** in Chromium before it lands, and look at the
  screenshot.

## Security, after every change

Search the web for vulnerabilities after every change, and always before a push:

1. **Search the web** for current advisories on what the change touched: the Next.js version
   in `package.json`, any package added or upgraded, and any Next.js API the change uses (for
   example `next/og`, `next/image`, middleware, server actions, `use cache`). Read the official
   source: the [Next.js security blog](https://nextjs.org/blog/tag/security) and the GitHub
   advisory for the package.
2. **Run the audits:**

   ```bash
   pnpm audit --prod
   pnpm audit                    # dev tooling too, reported separately
   gh api "repos/dracu-lah/dracufolio-next/dependabot/alerts?state=open" \
     --jq '.[] | [.security_advisory.severity, .dependency.package.name, .security_vulnerability.first_patched_version.identifier] | @tsv'
   # Next.js publishes its advisories here first, before pnpm audit picks them up
   gh api repos/vercel/next.js/security-advisories \
     --jq '.[:10][] | [.published_at[:10], .severity, .summary, ([.vulnerabilities[].patched_versions] | join(" "))] | @tsv'
   # the GitHub advisory database, for each direct dependency and for sharp
   for p in next react react-dom sharp; do
     gh api "advisories?ecosystem=npm&affects=$p&per_page=5&sort=published" \
       --jq '.[] | [.published_at[:10], .severity, .summary] | @tsv'
   done
   npm view next dist-tags.latest  # a newer patch on our minor usually means a security fix
   ```

   On 15 Oct 2026, `pnpm audit --prod` said "no known vulnerabilities" and the Dependabot API
   came back empty while 16.3.8 had two critical RCE advisories published the day before.
   The audit database lags and the Dependabot API can return nothing for this token, so a
   clean audit is not a clean bill. The Next.js advisory list and the advisory database are
   the checks that caught it.

3. **Fix critical and high before pushing.** A patch or minor upgrade inside the current major
   version goes in without asking, as long as `pnpm build` and both checks pass on it. A major
   version upgrade, or anything that changes behaviour, is asked first. `next` and
   `eslint-config-next` move together, on the same version. A transitive package
   that can't be lifted gets a scoped override in `pnpm-workspace.yaml`, still inside its
   major, and only once `npm view <pkg> versions` shows the patched version is published
   (an advisory can name a fix that is not on npm yet, and the install then fails).
   A Dependabot email that names a package already patched in the lockfile is stale: check
   the lockfile before touching anything.
4. **Report what was found,** with links, in the reply. That includes "nothing new".

## Before every push

```bash
pnpm build                                            # also the type check
PORT=3111 pnpm start &                                # in another terminal
node scripts/check-jsonld.mjs http://localhost:3111
node scripts/check-seo.mjs    http://localhost:3111
pnpm check:dashes
pnpm audit --prod
```

Then stop the server by its port (`ss -ltnp 'sport = :3111'`), not with `pkill -f` or
`pgrep -f`. Those match the shell running the command, and they kill it.
