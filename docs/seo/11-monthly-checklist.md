# 11. Monthly checklist

First Saturday of every month. Two hours, timeboxed. Copy this page into a note each month and
tick as you go.

Month: `__________`   Started: `______`   Finished: `______`

## Publish (45 minutes)

- [ ] Blog post for the first half of the month is live (`07-blog-topics-and-calendar.md`)
- [ ] Post has a byline linking to `/about`, a real date, `BlogPosting` and `BreadcrumbList`
      JSON-LD, an `opengraph-image.tsx` and a sitemap entry
- [ ] Cross-posted to Dev.to and Hashnode with the canonical URL back to `nevil.dev`
- [ ] Shared on X (thread), LinkedIn (link in the first comment) and the relevant subreddit
- [ ] IndexNow ping sent for the post, Request Indexing done for the post and `/blog`

## Google Business Profile (20 minutes)

- [ ] Four Google Posts written for the coming four weeks, or at least this week's published
      (`03`, Part C has the 8 ideas)
- [ ] Post backlog count: `____` of 4 weeks covered
- [ ] One new photo uploaded
- [ ] Every review from last month has a reply
- [ ] Two new review asks sent, one at a time, never as a broadcast
- [ ] Review count now: `____`  (target: 5 by month 1, 15 by month 6)
- [ ] Profile has no "incomplete" or "suggested edit" warnings on it

## Profiles (15 minutes)

- [ ] Anything that changed at work is reflected on LinkedIn, GitHub and X
- [ ] Any new project has been added to the GitHub profile README and the pinned repos
- [ ] Every new profile created this month has been checked against the NAP strings in `04`,
      Part E
- [ ] New profile URLs collected and sent back for the site's `sameAs` list and `llms.txt`
- [ ] One new account from the `04` Part D list created: `________________`
- [ ] Searched `Nevil Krishna K` in Google, checked for a knowledge panel. Present? `yes / no`
      (if yes, go to `09` and claim it today)

## Outreach (20 minutes)

- [ ] Three list-post authors contacted or followed up (`05`, priority 2)
- [ ] One talk pitched, or the status of an existing pitch chased (`05`, priority 4)
- [ ] Two or three helpful Reddit comments made this month, no link-dropping
- [ ] One Quora answer published
- [ ] Follow-ups sent for anything from last month that went quiet (`10`, template 5)

## Measure (30 minutes)

Write the numbers down even when they are boring. A single month's number means nothing, the
comparison is the whole value.

| Metric | Last month | This month |
| --- | --- | --- |
| Search Console impressions (28 days) | | |
| Search Console clicks (28 days) | | |
| Position for `nevil krishna k` | | |
| Number of queries containing a place name | | |
| Indexed pages | | |
| GBP: searches that showed the profile | | |
| GBP: calls | | |
| GBP: website clicks | | |
| GBP: review count | | |
| Site visitors (Vercel Analytics) | | |
| Is `/hire` in the top 5 pages? | | |
| Enquiries logged | | |
| Enquiries that became conversations | | |
| Projects won | | |

- [ ] Search Console: Performance, Pages and Links reports all opened, numbers written above
- [ ] New queries with place names noted, and the good ones added to the blog topic list
- [ ] GBP Performance: top 5 search terms copied into the notes. They are the real keyword list
- [ ] Vercel Analytics: top pages and top referrers checked
- [ ] Leads sheet updated, every open row has a next action and a date (`08`, Part F)

## The AI check (25 minutes)

Run all 6 queries from `06-ai-visibility.md` in ChatGPT, Claude, Perplexity, Gemini and
Copilot. Fresh chat, web search on. Grade each `Good`, `Partial`, `Wrong` or `Absent`.

| Query | ChatGPT | Claude | Perplexity | Gemini | Copilot |
| --- | --- | --- | --- | --- | --- |
| 1. Who is Nevil Krishna K | | | | | |
| 2. Best full stack devs in Thrissur | | | | | |
| 3. Next.js dev in Kerala, who to contact | | | | | |
| 4. Who built TMPlayer | | | | | |
| 5. React plus Kotlin dev in India, remote | | | | | |
| 6. What does he work on, how to hire | | | | | |

- [ ] Every wrong fact traced back to the page it came from
- [ ] That page fixed, or logged as a dev task if it is the site's own content
- [ ] Wrong answers reported in each tool (thumbs down plus the correction and the URL)

## Fix (15 minutes)

- [ ] Search Console > Pages: any new "Not indexed" reason read and acted on
- [ ] Search Console > Core Web Vitals: anything outside **Good** on mobile logged as a dev task
- [ ] Redirects still working:

```bash
curl -sI https://nevilkrishna.com/hire | head -n 5
curl -sI https://dracufolio.vercel.app/projects | head -n 5
curl -sI https://www.nevil.dev/ | head -n 5
```

- [ ] All three answer a permanent redirect with the path preserved
- [ ] IndexNow key still reachable:

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://nevil.dev/$INDEXNOW_KEY.txt
```

- [ ] Opened `https://nevil.dev` on a phone and checked the pages that changed this month
- [ ] Phone number, email and the review link all still correct on the site and the profiles

## Things that should have happened but did not

Fill this in honestly. It is the only part of this page that changes what next month looks like.

1. What was on last month's list and did not get done?

```
```

2. Why not? (No time / did not know how / waiting on someone / avoided it)

```
```

3. Is it still worth doing? If no, delete it from the plan and say so here rather than carrying
   it for six months.

```
```

4. What worked better than expected this month, and can it be done twice as much?

```
```

5. What is the single highest-value thing to do next month?

```
```

## Once a quarter, add these

- [ ] Re-read the whole of `08-marketing-playbook.md` and check the positioning still matches
      the work
- [ ] Refresh `/hire`, the project pages and the top 5 location pages with anything new
- [ ] Update the resume and the PDF at `/resume`
- [ ] One talk given (not just pitched)
- [ ] Ask three people for a LinkedIn recommendation
- [ ] Review which channel in the leads sheet actually produced paid work, and drop the worst
      one
