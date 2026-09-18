# 02. Search Console, Bing and IndexNow

Time: about 40 minutes today, then two short check-ins (day 7 and day 30).
Do this after `01-domains.md`.

Search Console is the only place that shows what Google actually does with the site. Bing
matters because ChatGPT search and Microsoft Copilot read Bing's index, not Google's.

## Part A. Google Search Console

### 1. Add nevil.dev as a Domain property

A Domain property covers `nevil.dev`, `www.nevil.dev`, every subdomain, and both `http` and
`https` in one place. A URL-prefix property covers only the exact prefix. Use Domain.

1. Open `https://search.google.com/search-console` and sign in with `nevilkrishna@gmail.com`.
2. Click the property dropdown at the top left, then **Add property**.
3. Choose the left box, **Domain**.
4. Type `nevil.dev` (no `https://`, no `www`, no trailing slash) and click **Continue**.
5. Google shows a TXT record. It looks like
   `google-site-verification=abc123...`. Click **Copy**.

### 2. Verify with a DNS TXT record

1. Open `https://dash.cloudflare.com` and select the `nevil.dev` zone.
2. Go to **DNS > Records > Add record**.
3. Fill in:

| Field | Value |
| --- | --- |
| Type | `TXT` |
| Name | `@` |
| Content | the `google-site-verification=...` string, pasted whole |
| TTL | Auto |

4. Click **Save**.
5. Confirm from the terminal:

```bash
dig +short TXT nevil.dev
```

The `google-site-verification=...` line should appear in the output.

6. Back in Search Console, click **Verify**. If it fails, wait five minutes and click again.
7. Leave the TXT record in place forever. Deleting it un-verifies the property.

### 3. Submit the sitemap

1. In Search Console, open **Sitemaps** in the left sidebar.
2. In the **Add a new sitemap** box, type `sitemap.xml` (the `https://nevil.dev/` part is
   already filled in) and click **Submit**.
3. Refresh after a minute. Status should read **Success** and **Discovered pages** should be
   in the fifties or higher (home, about, projects, open source, hire, 29 location pages, blog
   posts).

If the status is **Couldn't fetch**, open `https://nevil.dev/sitemap.xml` in the browser first.
If it loads there, click **Submit** again the next day. This error is usually temporary.

### 4. Request indexing for the 8 most important URLs

URL Inspection puts a single URL at the front of Google's queue. There is a daily quota of
roughly 10 to 12 requests, so these 8 fit in one sitting.

For each URL below:

1. Paste the URL into the search box at the very top of Search Console (the one that says
   "Inspect any URL in nevil.dev") and press Enter.
2. Wait for the result.
3. Click **Request Indexing**.
4. Wait for the "Indexing requested" confirmation, then do the next one.

| # | URL | Why it is in the top 8 |
| --- | --- | --- |
| 1 | `https://nevil.dev/` | The page that has to rank for the name |
| 2 | `https://nevil.dev/hire` | The page every profile, listing and ad points at |
| 3 | `https://nevil.dev/about` | Carries the Person schema and the work history |
| 4 | `https://nevil.dev/projects` | Proof of work, feeds the project pages |
| 5 | `https://nevil.dev/hire/thrissur` | The main local search target |
| 6 | `https://nevil.dev/hire/kerala` | The state-level target |
| 7 | `https://nevil.dev/hire/ernakulam` | Where the paying client work is |
| 8 | `https://nevil.dev/blog` | The hub Google recrawls to find new posts |

Repeat the same routine for any new blog post on the day it goes live.

### 5. Fix the stale title Google still shows

Google is showing an old title in the results because it has an older copy of the page cached,
or because it decided the title on the page did not match the page.

Work through this in order.

1. Check what the site actually serves:

```bash
curl -s https://nevil.dev/ | grep -o '<title>[^<]*</title>'
```

   The output is the real title. If it is already the new one, the page is fine and Google is
   behind.

2. Check that nothing contradicts it. Google rewrites titles when the `<title>`, the `<h1>` and
   the Open Graph title disagree. They should all say the same thing about the same page:

```bash
curl -s https://nevil.dev/ | grep -o -E '<(title|h1)[^>]*>[^<]*|og:title" content="[^"]*'
```

3. Keep the title under about 60 characters, with the name first. A long title gets truncated
   and sometimes replaced. `Nevil Krishna K, Full Stack Developer in Thrissur` is 49
   characters and safe.
4. In Search Console, inspect `https://nevil.dev/`, click **Test Live URL**, then open
   **View crawled page > HTML** and search for `<title>`. That is exactly what Google sees
   right now. If the live test shows the new title and the search result shows the old one, it
   is a cache lag.
5. Click **Request Indexing** on that URL.
6. Make sure the old domain is not feeding Google the old title. `dracufolio.vercel.app` must
   answer `308` (see `01-domains.md`). While it answered `307`, Google kept the old page and the
   old title alive.
7. Wait. A title refresh usually lands within 3 to 14 days of a successful re-crawl. There is
   no button that forces it sooner.

Do not delete and re-add the property, and do not use the "Removals" tool to force a refresh.
Removals hides the URL from Google for six months.

## Part B. Bing Webmaster Tools

ChatGPT search, Microsoft Copilot and DuckDuckGo all read Bing's index. Being missing from Bing
means being missing from those answers even when Google ranks the site well.

1. Open `https://www.bing.com/webmasters` and sign in. Use the **Sign in with Google** option
   with `nevilkrishna@gmail.com` so the import works without extra steps.
2. On the landing screen choose **Import your sites from Google Search Console**.
3. Click **Continue**, pick the Google account, and grant access when Google asks.
4. Bing lists `nevil.dev`. Tick it and click **Import**. Verification and the sitemap come
   across automatically.
5. Open **Sitemaps** in the left sidebar and confirm `https://nevil.dev/sitemap.xml` is listed.
   If it is not, click **Submit sitemap** and paste that URL.
6. Open **Settings > API access > API key** and copy the API key into a password manager. It is
   not needed for the curl pings below, but it is needed if the IndexNow key ever has to be
   re-issued.

Bing usually takes 2 to 4 weeks to show meaningful data. That is normal.

## Part C. IndexNow

IndexNow is a "this URL changed, come look" ping. It is instant, free, and Bing, Yandex, Seznam
and Naver all accept it. Google does not participate, which is what Search Console's
**Request Indexing** is for.

The key file is already published in `public/`, so it is live at
`https://nevil.dev/<key>.txt` and its filename is the key itself. Right now that is:

```
75a8f5544719e8d9f23a01eb8ccfca56
```

### 1. Confirm the key

If the key above was ever rotated, find the current one:

```bash
ls /home/dracu/projects/personal/dracufolio-next/public/*.txt
```

The filename without `.txt` is the key. Confirm it is reachable and that the file's contents
match the filename:

```bash
curl -s https://nevil.dev/75a8f5544719e8d9f23a01eb8ccfca56.txt
```

Export it once per terminal session so the commands below can be pasted as they are:

```bash
export INDEXNOW_KEY=75a8f5544719e8d9f23a01eb8ccfca56
```

### 2. Ping a single changed URL

```bash
curl -s -o /dev/null -w "indexnow %{http_code}\n" \
  "https://api.indexnow.org/indexnow?url=https://nevil.dev/blog/my-new-post&key=$INDEXNOW_KEY"

curl -s -o /dev/null -w "bing %{http_code}\n" \
  "https://www.bing.com/indexnow?url=https://nevil.dev/blog/my-new-post&key=$INDEXNOW_KEY"

curl -s -o /dev/null -w "yandex %{http_code}\n" \
  "https://yandex.com/indexnow?url=https://nevil.dev/blog/my-new-post&key=$INDEXNOW_KEY"
```

`200` or `202` means accepted. `403` means the key file is not reachable at the URL above.
`422` means the URL does not belong to the same host as the key file.

`api.indexnow.org` fans the ping out to every participating engine, so it is the one that
matters. The Bing and Yandex endpoints are there because they sometimes act on a direct ping
faster.

### 3. Ping several URLs at once

Use this after a batch change (a content refresh across the location pages, a new project
page, a sitemap rebuild).

```bash
curl -s -o /dev/null -w "batch %{http_code}\n" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d '{
    "host": "nevil.dev",
    "key": "'"$INDEXNOW_KEY"'",
    "keyLocation": "https://nevil.dev/'"$INDEXNOW_KEY"'.txt",
    "urlList": [
      "https://nevil.dev/",
      "https://nevil.dev/hire",
      "https://nevil.dev/hire/thrissur",
      "https://nevil.dev/blog/my-new-post"
    ]
  }' \
  https://api.indexnow.org/indexnow
```

Limit: 10,000 URLs per request. Do not ping the same unchanged URL every day, it is ignored and
repeated pointless pings can get the key rate limited.

### 4. Also register with Yandex

Yandex is a small share of traffic, but it is cheap to add and it is one of the engines some AI
answer tools read.

1. Open `https://webmaster.yandex.com`.
2. Click **Add site**, enter `https://nevil.dev`.
3. Choose **DNS record** verification and add the TXT record Yandex gives you in Cloudflare,
   the same way as the Google one in Part A.
4. After verification, open **Indexing > Sitemap files** and add
   `https://nevil.dev/sitemap.xml`.

### 5. When to ping

| Event | Action |
| --- | --- |
| New blog post | IndexNow ping for the post, plus Request Indexing for the post and `/blog` |
| New project page | IndexNow ping for the page, plus Request Indexing |
| Location page copy rewritten | Batch IndexNow ping for the changed pages only |
| `/hire` or home page rewritten | IndexNow ping plus Request Indexing |
| Typo fix, style change | Nothing |

## What to check after 7 days

| Where | What to look for | What is wrong if it is missing |
| --- | --- | --- |
| Search Console > Sitemaps | Status **Success**, discovered page count matches the sitemap | Sitemap not reachable or returning an error |
| Search Console > Pages | Most pages under **Indexed**, few under **Not indexed** | Check the reason column, usually "Crawled, currently not indexed" which just needs time |
| Search Console > Performance | Impressions above zero for `nevil krishna` | Property verified but the site is brand new to Google, wait |
| Google, search `site:nevil.dev` | The 8 priority URLs appear | Request Indexing again for the missing ones |
| Google, search `site:dracufolio.vercel.app` | Falling towards zero results | The 308 is not in place |
| Bing Webmaster > Site Explorer | `nevil.dev` URLs listed | Re-submit the sitemap |
| Terminal | IndexNow pings returning 200 | Key file not reachable |

## What to check after 30 days

| Where | What to look for | Action if it looks wrong |
| --- | --- | --- |
| Performance > Queries | `nevil krishna`, `nevil krishna k`, `nevil.dev` in position 1 to 3 | If not position 1 for the exact name, work through `04-profiles-and-cross-linking.md`, the name needs more consistent mentions |
| Performance > Queries | Any query with `thrissur`, `kerala`, `developer` in it | If there are none, the location pages are indexed but not competitive yet. Reviews (`03`) and list posts (`05`) are the fix |
| Performance > Pages | `/hire` and at least 5 location pages getting impressions | Request Indexing for the ones with zero |
| Pages report | Indexed count stable or rising | A drop means a crawl problem, read the reason column |
| Search Console > Links | Any external linking site at all | If empty, `05-backlinks-and-lists.md` is the next job |
| Experience > Core Web Vitals | Mobile URLs in **Good** | Anything in "Needs improvement" becomes a dev task |
| Search a stale title query | The new title showing | If the old title is still there after 30 days and the live test is correct, shorten the title and request indexing once more |
| Bing > Performance | Any impressions | Bing is slow, 30 days with a handful of impressions is fine |

Log the numbers for the name query, total impressions and indexed pages in the leads and
metrics sheet from `08-marketing-playbook.md`. A number is only useful next to last month's.

## Done when

- [ ] `nevil.dev` verified in Search Console as a Domain property
- [ ] Verification TXT record left in place in Cloudflare
- [ ] `sitemap.xml` submitted, status Success
- [ ] Indexing requested for all 8 priority URLs
- [ ] Live test confirms the correct `<title>`, re-index requested
- [ ] Bing Webmaster Tools imported from Search Console, sitemap listed
- [ ] IndexNow key confirmed reachable, single-URL ping returns 200
- [ ] Yandex Webmaster verified, sitemap added
- [ ] Day 7 check done
- [ ] Day 30 check done, numbers written into the metrics sheet
