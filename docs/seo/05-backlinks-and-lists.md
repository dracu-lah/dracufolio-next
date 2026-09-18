# 05. Backlinks and list posts

Time: one week of sending messages, 20 to 30 minutes a day. Then a few replies to handle.
Do this after `04-profiles-and-cross-linking.md`, because half of these messages point at the
profiles fixed there.

A backlink is another site linking to `nevil.dev`. Google uses them to decide whether the site
is worth ranking, and AI assistants quote from pages that other pages point at. Ten links from
real people who know you beat a thousand bought ones, and the bought ones can get the site
penalised.

Every message below is short on purpose. Send it, then move on. A 30% reply rate is good.

## Priority 1. The two employers

Worth the time because a company site linking to an employee is the most believable kind of
link there is, and both are already true statements about you.

### Lascade LLP

Ask the person who manages the site or the HR contact, on Slack or in person.

```
Hi [name], quick favour. I have put my portfolio together at nevil.dev with the SeatInfo and
FlightPoints work on it.

If the Lascade team page ever lists developers, could my name link out to nevil.dev? Happy to
send a photo and a two line bio in whatever format you need.

If a team page is not a thing, no problem at all.
```

If the answer is yes, send this, ready to paste:

```
Nevil Krishna K, Full Stack Developer
React, Next.js, TypeScript, Kotlin. Works on SeatInfo and FlightPoints.
https://nevil.dev
```

### Udyata Information Systems

Ask the former manager or the person who still runs the site.

```
Hi [name], hope things are good at Udyata.

I have put my portfolio up at nevil.dev, and the TukTuko admin panel and the self-hosted map
work are on it (nothing internal, only what is already public).

If the site has a team or alumni section, could you link my name to nevil.dev? And if you are
ever asked for a frontend recommendation, I am taking freelance work now.
```

## Priority 2. The "top developers" list posts

Worth the time because these pages already rank for exactly the searches that matter, and
being added to one is the single fastest way to appear for "web developer in Thrissur". They
also feed AI assistants, which read these lists when someone asks for a recommendation.

### Find them

Run these in Google, one at a time. Open every result that is a blog post or a listicle and not
a directory.

```
"top web developers in Thrissur"
"best web developers in Kerala"
"freelance web developers in Kerala"
intitle:"top" "web developers" Kerala
intitle:"best" "developers in Thrissur"
"top freelance developers" Kerala -justdial -sulekha
site:medium.com "web developers in Kerala"
site:*.in "freelance web developer" Thrissur
```

Note down, for each: the page URL, the author's name, and an email or a contact form. Aim for a
list of 10 to 15 pages. Most are agency blogs, a few are personal blogs, and a few are
directory-style posts that accept submissions.

### What to offer the author

Do not offer money. Offer something that makes their page better, which is what they actually
want:

1. A short, factual entry they can paste in (below).
2. A free speed and SEO check of their own site, with three specific fixes. It costs 20 minutes
   and it is the reason most of them reply.
3. A link back from a relevant blog post on `nevil.dev`, only if their page is genuinely useful.

### The message

```
Subject: Addition for your "top web developers in Thrissur" post

Hi [name],

I found your post on [top web developers in Thrissur] while looking for other developers in the
district. Useful list.

I am a full stack developer in Thrissur with 3 years of production experience (React, Next.js,
TypeScript, and Kotlin for Android). Most recently a seat map product on Cloudflare Workers and
an admin panel used daily by an operations team.

If the list is still open, here is an entry ready to paste:

Nevil Krishna K, Thrissur. Full stack developer. React, Next.js, TypeScript, Kotlin. Web apps,
business websites, Android apps, dashboards. https://nevil.dev

And in return, if it is useful: I ran your site through PageSpeed and there are three things
slowing it down. Happy to send the details, no strings.

Thanks either way,
Nevil
+91 92079 32070
```

Follow up once after seven days, then stop. `10-outreach-templates.md` has the follow-up.

One risk line: if an author asks for payment to be listed, decline. A paid placement in a
listicle is a paid link, and Google's guidelines treat it as a link scheme.

## Priority 3. Footers on the projects you already own

Worth the time because it takes ten minutes, needs nobody's permission, and puts a link on two
sites that already have real visitors.

Add this to the footer of `tmplayer.org` and `resumebuilder.js.org`:

```html
<p>Built by <a href="https://nevil.dev" rel="author">Nevil Krishna K</a></p>
```

Then add the same credit to the README of `LangSync`, `swaydots`, `hyprdots`, the image cropper
registry component and `Email Sender`:

```markdown
---

Built by [Nevil Krishna K](https://nevil.dev), a full stack developer in Thrissur, Kerala.
Available for freelance work: [nevil.dev/hire](https://nevil.dev/hire)
```

A README link is `nofollow` on GitHub, so it passes no ranking signal directly. It is still
worth it: people click it, npm and `js.org` mirrors sometimes render it as a normal link, and AI
crawlers read GitHub heavily.

## Priority 4. Community profiles and speaker pages

Worth the time because a community page about you is a third-party page about you, which is
exactly what a knowledge panel and an AI answer need. See `09-wikipedia-knowledge-panel.md`.

### FOSS United (Kochi and Thrissur chapters) and FOSSMeet

FOSSMeet happens at NIT Calicut, usually early in the year. FOSS United runs monthly city
meetups with a public page per event and per speaker.

```
Hi [name],

I am Nevil, a full stack developer in Thrissur. I maintain TMPlayer, a GPL-3.0 Telegram video
player for Android TV (Kotlin, Compose, TDLib, Media3), and LangSync, a CLI for keeping i18n
files in sync.

I would like to give a talk at the next [Kochi] meetup. Two options:

1. "Running Next.js on Cloudflare Workers": what OpenNext actually does, what breaks, and what
   it costs compared to Vercel. 20 minutes.
2. "Writing an Android TV app in Compose": the remote-control focus model, Media3, and
   streaming from a custom DataSource. 20 minutes.

Slides and a demo ready either way. Repos: github.com/dracu-lah

Nevil Krishna K
https://nevil.dev
```

### TinkerHub

TinkerHub runs campus chapters across Kerala and is always short of people who will do a
hands-on session.

```
Hi [name],

I am Nevil, a full stack developer in Thrissur, 3 years in (currently at Lascade, before that
Udyata).

If any TinkerHub chapter needs a session, I can run a hands-on one: "ship a Next.js site to a
real domain in 90 minutes", ending with every student holding a live URL. I have run the same
thing informally for friends.

No fee. I am in Thrissur, so anywhere between Palakkad and Ernakulam is easy for me.

https://nevil.dev
```

### GDG Kochi

Google Developer Group Kochi runs DevFest and smaller meetups, and speaker pages are indexed.

```
Hi [name],

Nevil here, full stack developer in Thrissur. I would like to submit a talk for the next GDG
Kochi event.

"Rendering a 2,000 seat map in the browser without dropping frames": SVG versus canvas, hit
testing, zoom and pan, and what finally worked in a production booking flow.

25 minutes with a live demo. Happy to do a shorter lightning version.

https://nevil.dev
```

### College alumni pages

Worth the time because college domains are old and trusted, and an alumni page is a factual,
permanent mention.

```
Hi [name],

I am Nevil Krishna K, [department], batch of [year].

If the department keeps an alumni page or a placement page, could my entry link to nevil.dev? I
am a full stack developer, three years in, currently at Lascade LLP working on a seat map
product.

Also happy to take a session for the current batch on getting a first developer job, or a
hands-on workshop, whenever it suits the department.
```

## Priority 5. Launches

Worth the time because both bring a burst of real traffic, a permanent link, and the kind of
third-party coverage that makes everything else easier.

### Product Hunt, for TMPlayer

1. Create the maker profile first (see `04`, item 12) and fill it in fully.
2. Prepare: a 240 character tagline, 5 screenshots or a 30 second video, the first comment.
3. Schedule for a Tuesday or Wednesday, 12:01 AM Pacific, which is about 12:30 PM IST.
4. Post the first comment yourself, explaining why you built it.

First comment draft:

```
I built TMPlayer because my own TV could not play the videos sitting in my Telegram saved
messages. Everything on the Play Store wanted a re-upload to some other service.

TMPlayer logs in with TDLib, streams the file straight from Telegram through a custom Media3
DataSource, and works with a TV remote. Kotlin and Jetpack Compose, GPL-3.0, no account and no
server of mine in the middle.

Code: github.com/dracu-lah  Site: tmplayer.org

I am the only person working on it, so tell me what breaks.
```

### Show HN, for TMPlayer

Title format matters. Hacker News rejects anything that reads like marketing.

```
Title: Show HN: TMPlayer, a Telegram video player for Android TV (Kotlin, TDLib, Media3)

Body:
I could not play videos from my Telegram saved messages on my TV, so I wrote a player for it.

It streams directly from Telegram using TDLib and a custom Media3 DataSource, so nothing is
re-uploaded and nothing passes through a server I run. UI is Jetpack Compose with the D-pad
focus model, which was the hardest part by a distance.

GPL-3.0: github.com/dracu-lah
Site: tmplayer.org

The rough edges: [list two or three real ones]. Happy to answer anything.
```

Post it between 7:30 PM and 9:30 PM IST on a weekday, then stay at the keyboard for two hours
and answer every comment. Naming the rough edges yourself is what keeps the thread friendly.

## Priority 6. Reddit

Worth the time because Reddit threads rank in Google and are heavily quoted by AI assistants.
It is also the fastest place to get banned.

The rule: help first, link second. Ten useful comments before one link. If a comment would be
pointless without the link, do not post it.

| Subreddit | What to do there |
| --- | --- |
| r/Kerala | Answer questions about local business, internet, tech jobs. Never pitch. One helpful comment a week. |
| r/Thrissur | Small and local. Answer anything at all. A known local name here is worth more than a link. |
| r/androidtv | Home crowd for TMPlayer. Answer sideloading and player questions, then post a release thread when a version ships. |
| r/webdev | Answer Next.js, Cloudflare and performance questions. Post a writeup only when it stands on its own. |
| r/nextjs | The most valuable one technically. The OpenNext on Cloudflare experience is genuinely rare, and answers there get remembered. |

Read each subreddit's rules page before the first post. r/webdev has a self-promotion Saturday
thread, and posting outside it is the usual way people get removed.

A release post that is allowed in r/androidtv:

```
Title: TMPlayer 1.x: play your Telegram videos on Android TV (open source)

I maintain TMPlayer, a Telegram video player built for the TV D-pad. It streams from Telegram
directly with TDLib and Media3, so nothing gets re-uploaded.

New in this release: [two or three real changes]

Free, GPL-3.0, no account of mine involved: tmplayer.org

Known issues: [be specific]. Tell me what breaks on your device and I will fix it.
```

## Priority 7. Quora

Worth the time because Quora answers rank for long, specific questions and AI assistants read
them. One good answer keeps working for years.

Find questions with:

```
site:quora.com "web developer" Thrissur
site:quora.com "web development company" Kerala
site:quora.com freelance developer Kerala cost
site:quora.com "how much does a website cost" India
```

Answer format that works:

1. Answer the question in the first two lines, completely.
2. Then the detail: real numbers, real timelines, what changes the price.
3. One line at the end saying who you are, with one link.

Example ending:

```
I am a full stack developer in Thrissur and I build these for a living, so treat the numbers
above as what I actually charge and see charged, not a survey. Details and past work:
https://nevil.dev/hire
```

Two links in one answer, or the same answer pasted under five questions, gets it collapsed.

## Priority 8. Android TV and Telegram communities

Worth the time because these are TMPlayer's users, and a tool with users is what makes the rest
of this credible.

Places: the Android TV subreddit (above), XDA Forums (Android TV section), the Telegram groups
around TDLib and third-party Telegram clients, the `awesome-android-tv` and
`awesome-telegram` lists on GitHub (open a pull request adding TMPlayer, following the list's
own format), and F-Droid if TMPlayer can meet its build requirements.

For the awesome-list pull requests, keep the entry in the list's exact style:

```markdown
- [TMPlayer](https://tmplayer.org) - Plays Telegram videos on Android TV. Kotlin, Compose, TDLib, Media3. GPL-3.0.
```

An F-Droid inclusion is the highest-value item in this section. It is a trusted, old domain, it
links the source and the site, and it brings real installs.

## Do not bother

| Tactic | Why not |
| --- | --- |
| Paid link sellers ("50 DA backlinks for 2,000 rupees") | These are link schemes under Google's spam policies, and the links come from sites built only to sell links. It can get the site demoted. |
| Private blog networks | Same thing with more steps, and when the network is caught every site linked from it is caught with it. |
| Blog comment and forum signature links | Universally `nofollow` and universally ignored, and it reads as spam to the humans who see it. |
| Mass directory submission services | They generate hundreds of listings with wrong names and wrong phone numbers, which is the exact NAP inconsistency that hurts local ranking. The 20 listings in `04` are picked deliberately. |
| Guest post farms and "write for us" networks | Sites that publish anything for anyone carry no trust, and Google discounts the whole domain. |
| Reciprocal link exchanges with unrelated sites | Detectable, worthless, and it puts an irrelevant link on your own site. |
| Buying followers or engagement | Buys nothing that converts and damages the real reach of every future post. |
| Fake reviews or fake testimonials | Against Google's terms, removable, and the only sanction that can take out the whole Business Profile. |

## Done when

- [ ] Lascade asked about a team page link
- [ ] Udyata asked about a team or alumni link
- [ ] 10 to 15 list posts found and logged with the author's contact
- [ ] Outreach sent to every one of them, one follow-up after 7 days
- [ ] Footer credit live on `tmplayer.org` and `resumebuilder.js.org`
- [ ] Credit line added to the LangSync, dotfiles, cropper and Email Sender READMEs
- [ ] Talk pitched to FOSS United, TinkerHub and GDG Kochi
- [ ] College department asked about an alumni page link
- [ ] Product Hunt maker profile ready, TMPlayer launch scheduled
- [ ] Show HN posted and answered
- [ ] Active in the five subreddits, helping before linking
- [ ] 5 Quora answers published
- [ ] Awesome-list pull requests opened, F-Droid checked
