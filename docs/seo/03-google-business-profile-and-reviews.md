# 03. Google Business Profile and reviews

Time: 90 minutes to create the profile, then 15 minutes a week.
This is the highest-value task in this folder. Read the whole file before starting.

A Business Profile is what puts a name into the Google Maps box at the top of searches like
"web developer Thrissur". It is also the single strongest local signal there is, and reviews on
it are the part competitors cannot copy. A site alone does not get into that box. A profile
does.

One risk line: Google suspends profiles for a fake street address, a fake business name or
reviews that were paid for. Everything below stays inside the rules.

## Before you start

- [ ] Signed in to Google as `nevilkrishna@gmail.com`
- [ ] Phone `+91 92079 32070` in hand, able to take a call and an SMS
- [ ] A phone that can record a short video (video verification is the usual route for a
      business with no public address)
- [ ] A square logo or a clean headshot, at least 720 x 720 px
- [ ] 8 to 10 photos ready (list further down)
- [ ] `https://nevil.dev/hire` live

## Part A. Create the profile

### 1. Start

1. Open `https://business.google.com/create`.
2. Business name, type exactly:

```
Nevil Krishna K, Full Stack Developer
```

3. Click **Next**.

The name has to be the name that is used everywhere else. Do not add "Best", "Thrissur" or
"Web Design Company" to it. Keyword stuffing the business name is the most commonly reported
violation and a competitor can get it edited or suspended.

### 2. Categories

Google asks for one primary category and allows up to nine more. The primary category decides
which searches the profile can show up in at all, so it matters most.

| Slot | Category to search for | If the exact name is missing |
| --- | --- | --- |
| Primary | `Website Designer` | Pick the closest match in the dropdown |
| Additional | `Software Company` | `Software Development Company` or `Computer Software Store` |
| Additional | `Web Developer` | `Website Designer` may be the only option, in which case leave it and add `Computer Consultant` |

The picker only accepts categories from Google's own list, and the list changes by country.
Type the first few letters and take the nearest option. Do not invent one.

Primary category can be changed later without penalty. Test it after three months: if the
profile shows up for "software company" searches and not "web designer" searches, swap them.

### 3. Address and service area

1. When asked "Do you want to add a location customers can visit?", answer **No**.
2. Google then asks where the business serves. This makes it a service-area business, so no
   street address is shown publicly.
3. Google may still ask for a mailing address for verification. Enter the real home address in
   Thrissur. It is used only to verify and is never displayed. Tick **Hide address** if the
   option appears.

Google allows a maximum of 20 service areas. The site has 29 location pages, so the 20 slots go
to the places with the most search demand, and the other 9 are covered by the location pages,
by Google Posts and by the listings in `04-profiles-and-cross-linking.md`.

Enter these 20, one at a time, taking the suggestion Google offers:

| # | Service area | # | Service area |
| --- | --- | --- | --- |
| 1 | Thrissur | 11 | Cheruthuruthy |
| 2 | Ollur | 12 | Vazhakode |
| 3 | Poonkunnam | 13 | Shoranur |
| 4 | Mannuthy | 14 | Ernakulam |
| 5 | Irinjalakuda | 15 | Palakkad |
| 6 | Chalakudy | 16 | Thiruvananthapuram |
| 7 | Kunnamkulam | 17 | Kozhikode |
| 8 | Guruvayur | 18 | Malappuram |
| 9 | Chavakkad | 19 | Kottayam |
| 10 | Kodungallur | 20 | Kerala |

Not entered, and why that is fine: Kollam, Pathanamthitta, Alappuzha, Idukki, Wayanad, Kannur,
Kasaragod, Wadakkanchery and India. Wadakkanchery sits inside the Thrissur radius. `Kerala`
as a service area already covers the remaining districts for most queries. India is too broad
for a service area and belongs on the site, not the profile.

If Google refuses `Kerala` as an area, replace it with `Thrissur district` and add `Wayanad`.

### 4. Contact details

| Field | Value |
| --- | --- |
| Phone | `+91 92079 32070` |
| Website | `https://nevil.dev/hire` |

The website field points at `/hire`, not the home page, because `/hire` is the page written to
answer "can this person build my thing and how do I reach them".

### 5. Verification

1. Google offers video verification, a phone call, an SMS or a postcard. Take video if it is
   offered, it is usually approved within a few days.
2. The video has to be one continuous recording with no cuts, and has to show three things:
   the area or neighbourhood, proof of the tools of the trade, and proof that you are the one
   running it.
3. A recording that works: start outside showing the street or the building, walk to the desk,
   show the laptop with the site `https://nevil.dev` open, show a phone running one of the
   apps, show a notebook or an invoice with the business name on it, then turn the camera to
   your own face and say your name and what you do.
4. Keep it under 2 minutes. Do not stop the recording partway.
5. If verification is rejected, the appeal link in the rejection email works. Re-record with
   more proof of the address area.

Nothing below is public until verification passes, so fill in the rest while waiting.

### 6. Hours

| Day | Hours |
| --- | --- |
| Monday to Saturday | 09:00 to 19:00 |
| Sunday | Closed |

Also open **Edit profile > Hours > More hours** and, if an "Online service hours" option
appears, leave it matching the above. Do not set 24 hours. An always-open service business gets
flagged.

### 7. Services

Open **Edit profile > Services > Add service > Add custom service** and add these six. Name
first, then the description in the box under it. Keep the names short, Google truncates them in
the list.

**1. Web application development**

```
Custom web apps built with React, Next.js and TypeScript. Dashboards, booking flows, internal
tools and customer portals. Includes the API work, the database and the deployment. Built
mobile first and tested on real phones before handover.
```

**2. Business website that ranks on Google**

```
A fast website for a shop, clinic, hotel or agency, with the on-page SEO, schema markup,
sitemap and Google Business Profile setup done as part of the build. Malayalam and English
content supported. Loads in under two seconds on a 4G phone.
```

**3. Mobile app development**

```
Android apps in Kotlin and Jetpack Compose, and cross-platform apps in React Native. Play
Store release handled, including the listing, the signing keys and the staged rollout.
Experience with Android TV as well as phones.
```

**4. Dashboards and admin panels**

```
Admin panels for teams that run a business on spreadsheets today. Roles and permissions,
reports, bulk edits, exports and audit trails. Built with React and Tailwind CSS, connected to
whatever backend is already in place.
```

**5. Cloudflare and deployment setup**

```
Deployment on Cloudflare Workers, D1, R2 and Durable Objects, or on Vercel. Custom domains,
DNS, SSL, redirects, preview environments and CI. Migration of an existing site onto a cheaper
and faster setup.
```

**6. Website speed and SEO fixes**

```
A slow or badly ranking site diagnosed and fixed. Core Web Vitals, image and font loading,
render blocking scripts, broken redirects, missing metadata and schema. You get the before and
after PageSpeed scores.
```

### 8. Description

Open **Edit profile > Business description** and paste this. It is under Google's 750 character
limit (it is 741 characters). Do not add a phone number, and do not add links, Google strips
them.

```
Nevil Krishna K is a full stack developer based in Thrissur, Kerala, with 3 years of experience
building production web and mobile apps. The web work is React, Next.js and TypeScript. The
Android work is Kotlin and Jetpack Compose. Recent products include SeatInfo, a seat map
platform running on Cloudflare Workers, FlightPoints, and the TukTuko admin panel. Services
cover web applications, business websites that rank on Google, Android and React Native apps,
dashboards and admin panels, Cloudflare deployment, and website speed fixes. Available for
project work, retainers and remote contracts across Thrissur, Ernakulam, Kozhikode and the
rest of Kerala. Malayalam and English. Free 20 minute first call for Thrissur district
projects.
```

### 9. Attributes and the rest

| Setting | Where | Value |
| --- | --- | --- |
| Online appointments | Edit profile > More > Accessibility and amenities | Yes |
| Onsite services | same screen | Yes |
| Languages | same screen, if offered | Malayalam, English |
| Appointment link | Edit profile > Contact > Appointment links | `https://wa.me/919207932070` |
| Opening date | Edit profile > More > Opening date | June 2023 |
| Products | skip | Services cover it |

### 10. Photos

Open **Edit profile > Photos**. Upload the logo and cover first, they are the two Google shows
in the panel.

| Slot | What the image shows | Size | Note |
| --- | --- | --- | --- |
| Logo | The monogram or a clean headshot on a plain background | 720 x 720 | Square, no text crammed in |
| Cover | The site's home page on a laptop screen, desk visible | 1024 x 576 | This is the first impression |
| Photo 1 | SeatInfo seat map on a laptop | 1200 x 900 | Real screen, not a mockup frame |
| Photo 2 | TukTuko admin panel dashboard | 1200 x 900 | Blur any real customer data |
| Photo 3 | TMPlayer running on a TV | 1200 x 900 | Shows the Android side of the work |
| Photo 4 | Resume Builder in a browser | 1200 x 900 | Shows a shipped public product |
| Photo 5 | PageSpeed report with green scores | 1200 x 900 | Proof for the speed service |
| Photo 6 | Working at the desk, face visible | 1200 x 900 | A person, not a stock photo |
| Photo 7 | Phone showing a site built for a client | 1200 x 900 | Mobile first, visibly |
| Photo 8 | A talk, meetup or workspace shot | 1200 x 900 | Optional, add when there is one |

Rules that matter: photos must be taken by you, no stock images, no images with a phone number
or a price written across them (Google removes those), JPEG or PNG, under 5 MB, no heavy
filters. Add one new photo a month, activity counts.

### 11. First Google Post

Open **Add update > Add update**, paste this, and attach the cover photo.

```
Full stack developer in Thrissur, available for project work.

I build web apps with React and Next.js, Android apps with Kotlin, and admin panels for teams
still running on spreadsheets. 3 years of production work, most recently a seat map platform
and a flight rewards product.

Serving Thrissur, Ollur, Irinjalakuda, Chalakudy, Kunnamkulam, Guruvayur, Ernakulam and the
rest of Kerala. Remote work anywhere in India.

Tell me what you need on WhatsApp and I will tell you straight away whether I am the right
person for it.
```

Add a button: choose **Learn more** and set the link to `https://nevil.dev/hire`.

## Part B. Reviews

Reviews are the difference between being in the Maps box and being under it. Five reviews that
name a real service and a real place beat fifty vague ones.

### 1. Get the short review link

1. Open the Business Profile (search the business name while signed in, or open
   `https://business.google.com`).
2. Click **Ask for reviews**. Older layouts have **Get more reviews** or
   **Share review form**.
3. Google shows a short link that looks like `https://g.page/r/XXXXXXXXXXXX/review`.
4. Click **Copy** and save it in a note titled "review link". It never changes.
5. Test it in a private browser window. It should open the star picker directly, not the
   profile page.

The link only exists after verification. Do not ask anyone for a review before it works.

### 2. Who to ask, in order

Ask people who genuinely worked with you or genuinely received something. That is the whole
qualification.

| Who | Why they qualify | How many to ask | What to ask them to mention |
| --- | --- | --- | --- |
| Lascade LLP colleagues and leads | Worked with you daily on SeatInfo and FlightPoints | 4 | The product, the stack, how you work in a team |
| Udyata Information Systems colleagues | Two years on the TukTuko admin panel and the OSM services | 4 | The admin panel, the map services, reliability |
| TukTuko stakeholders | Used what you built | 2 | The dashboard and what it replaced |
| Parazyakampany client contact | Paid for work and received it | 1 | The site or app, and the place |
| College friends who got a site built | Real work delivered, even if unpaid | 4 | What the site was for, their town |
| FOSS friends, FOSS United and TinkerHub contacts | Used TMPlayer, Resume Builder, LangSync or the dotfiles | 4 | The tool by name, and that they are in Kerala |
| Anyone you helped debug for free | It was still real help | 2 | What the problem was |

Target: 5 reviews in the first month, 15 by month six. Two or three a week, never twenty in one
day. A burst of reviews from a brand new profile is the pattern Google's spam filter looks for,
and those reviews disappear.

### 3. The ask, English

Send this on WhatsApp, one person at a time, never in a group and never as a broadcast.

```
Hi [name], hope you are doing well.

I have just set up a Google Business Profile for my development work and reviews are the only
thing that gets it seen locally.

If you can spare two minutes, could you leave an honest review here?
[REVIEW LINK]

If it helps, mention what I actually built for you (the website, the app, the dashboard) and
which place you are in. That specific detail is what makes the review useful in local search.

Two lines is plenty. Thanks either way.
```

### 4. The ask, Malayalam

```
നമസ്കാരം [പേര്], സുഖമാണോ?

ഞാൻ എന്റെ ഡെവലപ്പ്മെന്റ് ജോലിക്കായി ഗൂഗിൾ ബിസിനസ് പ്രൊഫൈൽ തുടങ്ങിയിട്ടുണ്ട്. ലോക്കൽ സെർച്ചിൽ
കാണാൻ റിവ്യൂകൾ മാത്രമാണ് സഹായിക്കുന്നത്.

രണ്ട് മിനിറ്റ് സമയമുണ്ടെങ്കിൽ ഇവിടെ ഒരു സത്യസന്ധമായ റിവ്യൂ എഴുതാമോ?
[REVIEW LINK]

ഞാൻ ചെയ്ത ജോലി ഏതാണെന്നും (വെബ്‌സൈറ്റ്, ആപ്പ്, ഡാഷ്‌ബോർഡ്) നിങ്ങൾ ഏത് സ്ഥലത്താണ് എന്നും നിങ്ങളുടെ
സ്വന്തം വാക്കുകളിൽ എഴുതിയാൽ വളരെ ഉപകാരമാകും.

രണ്ട് വരി മതി. എന്തായാലും നന്ദി.
```

### 5. Two lines that are not optional

- Never write the review for them, never send a draft to paste, never suggest the wording
  beyond "mention the service and the place". Identical or near-identical reviews get filtered
  out and the profile gets flagged.
- Never offer money, a discount, free work or anything else in exchange for a review. It
  violates Google's policy, the reviews get removed, and it is grounds for suspension.

### 6. Follow up once

If there is no answer after five days, send one message and then stop.

```
Hi [name], just floating this back up in case it got buried. No pressure at all if you would
rather not. [REVIEW LINK]
```

### 7. Reply to every review

Reply within 48 hours. Replies are public, indexed, and they show the profile is live. Use the
reply to say the service and the place once, in a normal sentence.

**A 5 star review**

```
Thanks [name]. Glad the [admin panel] is working out for the team in [place]. Ping me any time
something needs a change.
```

**A 4 star or 3 star review**

```
Thanks for writing this, [name], and for being straight about the part that fell short. The
[slow load on the gallery page] was on me. It is fixed now, and I would rather know than not.
```

**A 1 star or 2 star review, fair**

```
I am sorry this went the way it did, [name]. You are right that the timeline slipped. I would
like to make it right, my number is +91 92079 32070 and I will pick up.
```

**A 1 star review from someone who was never a client**

Do not argue in the reply, a fight is what future readers will read.

```
I do not have a record of working with you, so I think this may be meant for someone else. If I
am wrong, please call me on +91 92079 32070 and I will sort it out.
```

Then click the three dots on the review and choose **Report review**. Under **Support** in the
profile dashboard there is also **Contact us**, which is faster for a clearly fake review.

## Part C. The weekly Google Post routine

Posts expire from prominence after about a week, so one post a week keeps the profile active.
Fifteen minutes on Saturday morning is enough.

1. Open the profile, click **Add update**.
2. Paste the post, attach one image (a screenshot, a photo, a chart).
3. Add a button. Use **Learn more** to `https://nevil.dev/hire` for service posts, or the
   project page URL for project posts.
4. Name one place and one service in the text. That is the whole trick.

### 8 post ideas to cycle through

1. **A service, plainly stated.** What a business website build includes, what it costs to run
   per year, and how long it takes. Link `/hire`.
2. **A before and after speed fix.** Two PageSpeed screenshots side by side, the three things
   that were wrong. Link `/hire`.
3. **One project, one screenshot.** SeatInfo's seat map, what problem it solves, one number
   (seats rendered, load time). Link the project page.
4. **A local angle.** "Built a booking site for a homestay near Cheruthuruthy" style post,
   naming the place, describing the work in two lines. Link `/hire/cheruthuruthy`.
5. **A question people actually ask.** "Does my shop need an app or a website?" answered
   honestly in four lines. Link the matching blog post.
6. **A new blog post.** One line on what it covers and who it is for. Link the post.
7. **An open source release.** A TMPlayer or LangSync release, what changed, who it is for.
   Link the repo or `tmplayer.org`.
8. **Availability.** "Two project slots open for [month], Thrissur and remote." Link
   `/hire`. Use this one at most once a month.

Never post a discount code or a price in a post. Price questions belong in a conversation, and
`10-outreach-templates.md` has the reply for them.

## Part D. Week 1 to week 8

| Week | What to do | Time |
| --- | --- | --- |
| 1 | Create the profile, all categories, service areas, hours, contact, description. Start verification. Upload logo and cover. | 90 min |
| 2 | Verification cleared. Add all 6 services. Upload photos 1 to 5. Publish the first Google Post. Copy the review link and test it. | 60 min |
| 3 | Ask the 4 Lascade colleagues and the 4 Udyata colleagues, one message each, spaced across the week. Reply to every review that lands. Post 2 (speed fix). | 40 min |
| 4 | Ask the TukTuko and Parazyakampany contacts. Upload photos 6 to 8. Post 3 (one project). Check Insights for the first search terms. | 40 min |
| 5 | Ask the 4 college friends who got a site built. Post 4 (local angle, name a town). Follow up once with anyone from week 3 who did not reply. | 40 min |
| 6 | Ask the FOSS and TinkerHub contacts. Post 5 (a question answered). Add the profile link to the site's `sameAs` list, see `04`. | 40 min |
| 7 | Post 6 (new blog post). Reply to all reviews. Fill in anything the profile still flags as incomplete. | 30 min |
| 8 | Count the reviews. If under 5, ask the next 5 people on the list. Post 7 (open source release). Compare Insights against week 4. | 40 min |

From week 9 onwards it is one post a week, one new photo a month, two review asks a month, and
replies within 48 hours. That routine lives in `11-monthly-checklist.md`.

## What to watch in Insights

Open **Performance** in the profile, set the range to the last 30 days, and note four numbers
each month.

| Number | Where | What it means |
| --- | --- | --- |
| Searches that showed the profile | Performance > overview | Total local visibility |
| Search terms people used | Performance > Search terms | The real keyword list. Turn the top ones into blog posts and location page copy |
| Calls | Performance > Calls | The only number that pays. Count how many became a conversation |
| Website clicks | Performance > Website clicks | Whether the `/hire` link is doing its job |

If "Direction requests" is high and calls are zero, the profile is being found by people
looking for a shop to walk into. Tighten the description so it reads as a service business.

## Done when

- [ ] Profile created with the exact business name
- [ ] Primary category Website Designer, two additional categories added
- [ ] Service-area business, no public address, address hidden
- [ ] All 20 service areas entered
- [ ] Phone and `https://nevil.dev/hire` set
- [ ] Hours Monday to Saturday 09:00 to 19:00, Sunday closed
- [ ] Verification passed
- [ ] All 6 services added with descriptions
- [ ] Description pasted
- [ ] Logo, cover and at least 5 photos uploaded
- [ ] First Google Post live with a Learn more button
- [ ] Review link copied, tested, saved
- [ ] 15 people asked for a review, one at a time
- [ ] 5 reviews live by end of month 1
- [ ] Every review replied to within 48 hours
- [ ] Weekly post routine running
- [ ] Insights numbers logged for month 1
