# task-6.md: why the site is not ranking, and what changed

Written and built 15 Oct 2026. Status: BUILT, not committed or pushed.

## 1. What the data says

- **Search Console, last 3 months:** 98 impressions, 4 clicks, 8 pages with any impressions,
  2 queries visible ("nevil", "neal krishna"). 88 of the 98 impressions are the home page.
- **Bing Webmaster:** 8 impressions, 0 clicks, data from 9 Oct only.
- **Search Console Insights is empty because there is too little data.** Insights only
  draws its cards once a site has a steady flow of clicks. Nothing in the code turns it on;
  clicks do.
- **Live searches, 15 Oct** (DuckDuckGo, which is served from Bing's index; Google blocked
  the headless browser for most queries):

  | Query | nevil.dev |
  | --- | --- |
  | nevil krishna, nevil krishna k, nevil krishna thrissur, nevil dev | #1 |
  | freelance web developer thrissur / kerala | not in the top 10 |
  | website developer thrissur, website designer thrissur | not in the top 10 |
  | full stack developer thrissur / kerala | not in the top 10, and the top 10 is all job boards |
  | freelance react developer kerala, hire next.js developer india | not in the top 10 |
  | the blog topics (OpenNext, Telegram on Android TV, PDF to JSON) | not in the top 10 |

## 2. What was wrong

1. **Wrong words for clients.** Every title and h1 said "full stack developer". The results
   for that phrase in Thrissur and Kerala are all job listings, so the people searching it
   are job hunters. The personal sites that do rank (nikhilsoman.in, arulmjoseph.com,
   salmanmp.me, mansugirish.com, syamsuresh.in) all put "Freelance Web Developer in
   Kerala/Thrissur" in the title and the h1.
2. **31 of 44 pages ran past what Google shows.** Descriptions of 180 to 290 characters
   lost the WhatsApp number to the cut, and hire titles ran to 72 characters.
3. **Guessed URLs 404'd:** /home, /index.html, /blogs, /posts, /tags, /about-me, /skills,
   /contact-me, /works, /project, /feed, /atom.xml, /sitemap, /resume.pdf, /hire/kochi,
   /hire/cochin, /hire/trivandrum, /hire/calicut, /hire/trichur.
4. **The Person and ProfessionalService schema nodes had no description.**
5. **Off the code:** `www.nevil.dev` answers with a 307 (temporary) instead of a permanent
   redirect. Very few sites link to nevil.dev, which is the main reason it is outranked by sites that have been up for years.

## 3. Rule for the keywords

Who Nevil is leads; what clients type comes second.

- **Identity pages** (home, about, blog, footer, Person schema, portrait alt text, OG card,
  manifest, llms.txt) say **Full Stack Developer in Thrissur**, with React, Next.js and
  Android. That is the job title on the resume and on LinkedIn.
- **Client pages** use the phrases clients search for: `/hire` is "Freelance React and Next.js
  Developer", and every `/hire/<place>` page is "Freelance web developer in <place>". The
  ProfessionalService node carries "Freelance web developer in Thrissur".

## 4. What shipped

| # | Change |
| --- | --- |
| 1 | `/hire` title and h1 are now "Freelance React and Next.js Developer" ("Hire a freelance React and Next.js developer in Kerala" for the h1). Description fits in 160. |
| 2 | Hire location pages: the h1 is "Freelance web developer in <town>, <district>". A new `metaTitle()` in `app/hire/copy.ts` keeps the `<title>` short ("Freelance web developer in <town>"), and `metaDescription()` is rewritten to 140 to 150 characters with the WhatsApp number intact. |
| 3 | Home description rewritten to 147 characters. The title is unchanged. |
| 4 | About, blog, open source and nine post descriptions are each under 160 characters. |
| 5 | `pageMetadata()` drops the "\| Nevil Krishna K" suffix when it would push a title past 60 (`TITLE_MAX`), so long post titles keep their words rather than a cut-off name. |
| 6 | `check-seo.mjs` fails on a description over 160 or a title over 70. |
| 7 | Person and ProfessionalService nodes get a `description`. `occupations` lists "Freelance Web Developer" second, after "Full Stack Developer". |
| 8 | Keyword lists: `primaryPhrases` and `locationKeywords` add the freelance and website developer phrases, and the FAQ now asks "Who is the best freelance web developer in Thrissur?". |
| 9 | 22 new 308 redirects in `next.config.ts` for the guessed paths in section 2. All are one hop. |
| 10 | Content dates for home, hire and locations moved to 15 Oct. |

Checks: `pnpm build` clean, check-jsonld passes on 44 routes, check-seo passes, no em dashes,
`pnpm audit --prod` clean. Next.js 16.4.1 is the patched release for the 14 Oct critical
advisories. 390px screenshots of /, /hire and /hire/thrissur were checked.

The two post headlines over 60 characters got a `seoTitle` in `posts.ts` ("TMPlayer on Windows
and Linux, from Android TV" and "Job outreach from your own Gmail, one email at a time"). The
h1 on the page is unchanged. Every route now fits in 60 and 160.

## 4b. Second pass, same day

- **Hindi and Tamil.** `LANGUAGES` and `LANGUAGE_CODES` in `contact.ts` list Malayalam,
  English, Hindi and Tamil, which feeds the Person `knowsLanguage`, the contactPoint
  `availableLanguage`, the About facts and llms.txt. The FAQ, the first-call step in How it
  works, the India intro and `about.json` say the same. humans.txt still says the site is in
  English and Malayalam, which is about the site, not the person.
- **Coverage report, 15 Oct.** Only 5 URLs are not indexed, all expected: the three http and
  www forms of the home page (redirects), the retired OpenNext post URL (now a 308), and
  `para.nevil.dev`, which blocks crawlers on purpose. Indexing is not the problem; the
  wording and the lack of links were.
- **Vercel:** `www.nevil.dev` now answers 308 with the path kept. Done.
- **Google Business Profile:** description rewritten (724 of 750 characters), without naming
  any company or client product, and with all four languages.

## 5. Yours, by hand


**Search Console, after the deploy**
- URL Inspection, then Request indexing for `/`, `/hire`, `/hire/thrissur`, `/hire/kerala`.
- Bing Webmaster: run `pnpm indexnow` if the workflow did not ping.

**Google Business Profile** (it is the strongest local signal there is, stronger than anything
on the site, for "web developer thrissur")
- Primary category **Website designer**, plus Software company and Internet marketing service
  (`docs/seo/03` Part A step 2).
- Services: list each one by the words people search, "Website development", "Next.js
  development", "React development", "Mobile app development", "Website redesign", "SEO setup".
- Description: open with "Freelance web developer in Thrissur", and link `https://nevil.dev/hire`.
- One Google Post a week: a finished project, or a blog post with a link. Add photos of real
  work, not stock images.
- Keep asking for reviews with the short link. Reviews that mention "website" and "Thrissur" in
  their own words help the most. Reply to every one.

**Profiles that link back** (`docs/seo/04` Part D and `docs/seo/05` have the full list)
- LinkedIn headline: "Full Stack Developer | React, Next.js | Freelance web developer in
  Thrissur", website set to nevil.dev, and the Providing services section filled in.
- GitHub profile: website set to nevil.dev, profile README linking `/hire`.
- Dev.to and Hashnode: cross-post each blog post with the canonical URL set to nevil.dev.
  Those sites get indexed in hours, and the canonical sends the credit back to nevil.dev.
- JustDial, Sulekha, Quickerala: one listing each, same name, phone and address as the
  Business Profile.
- Upwork or Contra, linking `/hire`.
- A footer link ("Built by Nevil Krishna K", linking nevil.dev) on every site you build for a
  client, where the client agrees.
