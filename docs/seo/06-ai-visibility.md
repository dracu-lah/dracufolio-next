# 06. AI visibility

Time: 30 minutes a month.
Nothing here needs code. The site side is already done.

People now ask an assistant "who is a good Next.js developer in Kerala" instead of searching.
The answer they get is assembled from pages the assistant can read and trust. This file is
about being in that answer.

## Part A. What the site already does

Done, no action needed. It is listed so the monthly check has a baseline and so nothing gets
removed by accident later.

| Thing | Where | What it does |
| --- | --- | --- |
| `llms.txt` | `https://nevil.dev/llms.txt` | A short, plain-text map of the site for language models: who you are, the facts, the important URLs |
| `llms-full.txt` | `https://nevil.dev/llms-full.txt` | The long version, with the full content of the key pages inlined so an assistant can answer without crawling |
| AI crawler allows | `https://nevil.dev/robots.txt` | Explicit `Allow` rules for `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `Claude-User`, `Claude-SearchBot`, `anthropic-ai`, `PerplexityBot`, `Perplexity-User`, `Google-Extended`, `Applebot`, `Applebot-Extended`, `Amazonbot`, `meta-externalagent`, `DuckAssistBot`, `YouBot`, `cohere-ai`, `CCBot`, `Bingbot` and `Googlebot`. `Bytespider` is the one crawler that is blocked, because it ignores rate limits and cites nothing |
| Person schema | every page, via `<JsonLd />` | Name, alternate names, job title, employer, skills, location, `sameAs` profile list, a stable `@id` |
| ProfessionalService schema | `/hire` and the location pages | Service list, service areas, phone, hours, languages, coordinates |
| WebSite schema | the root | Ties the domain to the person |
| Answer-shaped content | `/hire`, the 29 location pages, the FAQ blocks, the blog | Each heading is a question and the paragraph under it answers that question in the first sentence, which is the format assistants quote |
| Sitemap with real dates | `https://nevil.dev/sitemap.xml` | Real `lastmod` values and image entries, so crawlers know what changed |
| Short links | `/whatsapp`, `/resume`, `/linkedin`, `/github`, `/x`, `/hire-me` | Easy to say out loud, easy for an assistant to repeat correctly |

Two things to never do: block an AI crawler in `robots.txt`, and remove the FAQ headings from
`/hire`. Both are why the site gets quoted.

## Part B. The monthly check

Run this once a month, on the first Saturday, alongside `11-monthly-checklist.md`. Use a fresh
chat each time, and turn web search ON where the tool offers the choice. Do not sign in with an
account that has been chatting about you all month, the history skews the answer.

Run all 6 queries in all 5 tools. It takes about 25 minutes.

Tools: ChatGPT (`chatgpt.com`), Claude (`claude.ai`), Perplexity (`perplexity.ai`), Gemini
(`gemini.google.com`), Microsoft Copilot (`copilot.microsoft.com`).

### The 6 queries

```
1. Who is Nevil Krishna K?
```

```
2. Who are the best full stack developers in Thrissur, Kerala?
```

```
3. I need a Next.js developer in Kerala for a freelance project. Who should I contact, and how?
```

```
4. Who built TMPlayer, the Telegram video player for Android TV?
```

```
5. Find me a developer in India who does both React web apps and Kotlin Android apps, available for remote contracts.
```

```
6. What does Nevil Krishna K work on, and how do I hire him?
```

Query 1 and 6 test whether the entity exists and is correct. Query 2 and 5 test whether the
name surfaces without being named, which is the hard one. Query 3 tests the hire path. Query 4
tests whether the projects are attached to the name.

### What a good answer looks like

For queries 1, 4 and 6, a good answer says all of this and nothing wrong:

- Full stack developer based in Thrissur, Kerala, India
- 3 years of experience
- React, Next.js, TypeScript for web, Kotlin and Jetpack Compose for Android
- Currently at Lascade LLP, working on SeatInfo and FlightPoints
- Previously at Udyata Information Systems, the TukTuko admin panel
- Builds TMPlayer and Resume Builder
- Site `nevil.dev`, WhatsApp `+91 92079 32070`, email `nevilkrishna@gmail.com`
- Cites `nevil.dev` or `nevil.dev/hire` as a source

For queries 2, 3 and 5, a good answer means the name appears in the list at all, with the
correct location and the correct link. Being one of five named developers is the win. Being
first is not the target, being present is.

Grade each answer:

| Grade | Meaning |
| --- | --- |
| Good | Named, facts correct, `nevil.dev` cited or linked |
| Partial | Named but a fact is missing or vague, or no link |
| Wrong | Named with a wrong fact (wrong city, wrong employer, wrong spelling, a made-up project) |
| Absent | Not mentioned at all |

### When an assistant gets a fact wrong

A wrong fact almost always comes from a stale page, not from the model inventing things. Fix
the source first, then report it.

1. Ask the assistant where it got that. "Which source says that?" It will usually name the
   page.
2. Fix that page. An old LinkedIn headline, an outdated GitHub bio, a directory listing with
   the old handle, a `dracufolio.vercel.app` copy still in an index. `04` covers all of these.
3. If the wrong fact comes from the site itself, that is a real bug, note it and fix the
   content.
4. Then report it inside the tool:

| Tool | How to report |
| --- | --- |
| ChatGPT | Thumbs down under the answer, then "Report", then describe the wrong fact and paste the correct one with the `nevil.dev` URL |
| Claude | Thumbs down under the answer, then type the correction in the feedback box with the source URL |
| Perplexity | The three dots under the answer, then "Report issue". Perplexity re-fetches sources often, so a fixed page usually clears it within weeks |
| Gemini | Thumbs down, then "Report legal issue" only if it is defamatory, otherwise the normal feedback box. For search-side facts, fix Search Console and the Business Profile, Gemini leans on Google's index |
| Copilot | Thumbs down, then feedback. Copilot follows Bing, so fixing Bing Webmaster Tools and Bing Places is the real fix |

5. Re-run the same query next month and log whether it changed. Corrections take weeks, not
   hours, because they wait for the next crawl.

Never argue with the assistant in chat to "correct" it. Nothing said in a chat changes what the
next person sees.

### The log

Copy this table into a note or a spreadsheet and fill one in each month. Six rows per tool, or
one row per query with a column per tool, whichever is easier to keep up.

| Month | Query | ChatGPT | Claude | Perplexity | Gemini | Copilot | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-10 | 1. Who is Nevil Krishna K | | | | | | |
| 2026-10 | 2. Best full stack devs Thrissur | | | | | | |
| 2026-10 | 3. Next.js dev in Kerala | | | | | | |
| 2026-10 | 4. Who built TMPlayer | | | | | | |
| 2026-10 | 5. React plus Kotlin dev India | | | | | | |
| 2026-10 | 6. What does he work on, how to hire | | | | | | |

Fill each cell with `Good`, `Partial`, `Wrong` or `Absent`. In Notes, write the wrong fact and
the source it came from. The value of this table is month two, when it shows movement.

Realistic expectation: month 1 is mostly `Absent` for queries 2, 3 and 5, and `Partial` for 1,
4 and 6. Queries 1, 4 and 6 should be `Good` everywhere by month 3. Queries 2, 3 and 5 depend
on the levers below and take six months or more.

## Part C. The levers that actually move AI answers

In order of effect.

### 1. Being in a "top N in {place}" list

When someone asks an assistant for a developer in a place, the assistant reads listicles,
because that is what the question looks like on the open web. One inclusion in a
"top web developers in Thrissur" post does more for query 2 than a month of posting. This is
why `05-backlinks-and-lists.md` puts list outreach at priority 2.

### 2. Reddit and Quora presence

Assistants quote Reddit threads and Quora answers heavily, because they read as real people
answering. A comment where someone recommends you by name, or your own answer that is genuinely
the best answer on the page, both get picked up. This cannot be faked: asking a friend to
recommend you in a thread is vote manipulation, it gets removed, and it is the sort of thing
Reddit bans accounts for.

### 3. The same facts in every place

Assistants weight facts by repetition across independent sources. "Thrissur, Kerala" on nine
profiles is a fact. "Thrissur" on four and "Kerala" on five is noise. This is the whole reason
`04-profiles-and-cross-linking.md` has a NAP section, and it is the cheapest lever on this list.

### 4. A real byline and a real date on every post

A post with an author name, an author link and a visible published date is treated as
attributable. One without is treated as anonymous content. Every blog post needs the byline
`Nevil Krishna K`, linked to `/about`, and a real date that matches the `datePublished` in the
schema. Never backdate a post and never silently rewrite one, use a visible "updated on" date.

### 5. Concrete numbers

"Fast" is unquotable. "Cut the seat map's first render from 2.4 seconds to 380 milliseconds" is
quotable, and it is what shows up in an answer. Every project page and every blog post should
carry at least one real measured number. Never round a number up into something untrue, a
wrong number found later costs more than a vague sentence.

### 6. One page per question

The location pages and the FAQ blocks exist because an assistant answers a specific question by
finding the page that is about exactly that question. `/hire/irinjalakuda` beats a paragraph
mentioning Irinjalakuda on a general page.

## Part D. Bing Places

Copilot and ChatGPT search read Bing. Bing has its own local index, separate from Google's, and
it is emptier, which makes it easier to rank in.

1. Open `https://www.bingplaces.com`.
2. Sign in with a Microsoft account. Create one with `nevilkrishna@gmail.com` if there is none.
3. Click **New user**, then choose **I manage a single business**.
4. Bing offers to import from Google Business Profile. Take it, it copies the name, categories,
   service areas, hours and description in one step. Do this after `03` is finished.
5. If the import is not offered, add the business by hand with exactly the values from `03`:
   name `Nevil Krishna K, Full Stack Developer`, service-area business, phone
   `+91 92079 32070`, website `https://nevil.dev/hire`, hours Monday to Saturday 09:00 to
   19:00.
6. Verify by phone or email when prompted.
7. Upload the same logo and the same photos as the Google profile.

Bing Places has no review ecosystem worth chasing. Setting it up once and leaving it is fine.

## Part E. The Google knowledge panel

A knowledge panel is the box on the right of Google's results with a name, a photo and links.
It is not something that can be requested. Google builds it when it is confident that a real,
distinct entity exists. The claim flow only opens once the panel already exists.

What builds the confidence, in order:

1. Person schema on the site with a stable `@id` and a complete `sameAs` list. Done.
2. Every profile in that `sameAs` list linking back to `nevil.dev`. That is `04`.
3. A verified Google Business Profile with the same name and photo. That is `03`.
4. Third-party pages that repeat the same facts: speaker pages, list posts, an interview, an
   alumni page. That is `05` and `09`.
5. Time. Panels for individuals typically appear 6 to 18 months after the entity is consistent,
   and sometimes not at all.

### When a panel appears, claim it

1. Search `Nevil Krishna K` while signed in to `nevilkrishna@gmail.com`.
2. Scroll to the bottom of the panel and click **Claim this knowledge panel**.
3. Google asks to verify that you are the person. It checks the official site and the linked
   profiles, so sign in to one of them when prompted (usually the site's Search Console
   property or a linked social account).
4. Once verified, a **Suggest an edit** option appears on the panel. Use it to fix the photo,
   the description and the profile links.
5. Edits go into review and take days to weeks. Submit one change at a time, with the
   `nevil.dev` URL as the evidence.

Do not pay anyone who offers to "create a knowledge panel". There is no such service. What they
sell is a Wikipedia page or a Wikidata item, and `09-wikipedia-knowledge-panel.md` explains why
both are a bad idea right now.

## Done when

- [ ] Baseline check done: 6 queries in 5 tools, logged
- [ ] Every wrong fact traced to its source page and the source fixed
- [ ] Wrong answers reported in each tool
- [ ] Bing Places created, imported from the Google profile, verified
- [ ] The monthly check is on the calendar for the first Saturday
- [ ] Knowledge panel searched for each month, claimed the moment it exists
