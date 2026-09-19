# 04. Profiles and cross-linking

Time: 2 hours for the three existing profiles, then 20 minutes per new account.
Do the three existing profiles first. They already rank for the name, so fixing them moves
things faster than any new account.

## Part A. LinkedIn

`https://www.linkedin.com/in/nevilkrishnak`

> The paste-ready blocks now live in `assets/linkedin-profile.md`, rebuilt from the real
> repo data. Use those. The versions below are kept for context and say "3 years" where the
> current ones say "3+", and list LangSync as TypeScript where it is actually Python.

LinkedIn ranks in Google for a person's name, usually in the top three. Recruiters search
inside LinkedIn, so the headline and the skills decide whether the profile ever appears.

### 1. Headline

**Profile > pencil icon next to the name > Headline.** 220 character limit. Paste:

```
Full Stack Developer at Lascade LLP | React, Next.js, TypeScript, Kotlin | Building SeatInfo and FlightPoints | Web and Android apps for Thrissur, Kerala and remote clients
```

That is 172 characters. The words in it are the words recruiters type: the role, the stack, the
products, the place.

### 2. About section

**Profile > About > pencil icon.** Paste this whole block. It is about 1,400 characters, well inside
LinkedIn's 2,600 limit, and the "see more" cut lands after the first real sentence.

```
Full stack developer in Thrissur, Kerala. React, Next.js and TypeScript for the web, Kotlin for
Android. 3 years shipping production apps.

Right now I am at Lascade LLP, building SeatInfo, a seat map product where people check what a
seat looks like before they book it. It runs on Next.js 16 on Cloudflare Workers
through OpenNext, with D1, R2 and Durable Objects behind it, and next-intl for the languages. I
also work on FlightPoints.

Before that I spent two years at Udyata Information Systems as a frontend developer. I built
the TukTuko admin panel and set up self-hosted OpenStreetMap services (Nominatim and OSRM) so
the product stopped paying per map request.

Outside work I ship my own things in the open. TMPlayer plays Telegram videos on an Android TV,
written in Kotlin with Jetpack Compose, TDLib and Media3. Resume Builder is a free resume tool
at resumebuilder.js.org, and LangSync is a CLI that keeps i18n files in sync.

What I am good at: taking a product from an empty repo to something running in front of real
users, and then making it fast.

I work with clients across Thrissur, Ernakulam, Kozhikode and the rest of Kerala, and remotely
with teams anywhere in India. Malayalam and English.

Open to full time roles, freelance projects and remote contracts.

Work: https://nevil.dev
Hire me: https://nevil.dev/hire
WhatsApp: +91 92079 32070
Email: nevilkrishna@gmail.com
```

### 3. Location

**Profile > pencil icon > Location.** Set **Country/Region** to `India`, and in the
**City** field type `Thrissur` and pick `Thrissur, Kerala, India` from the dropdown. Do not
leave it as a generic "Kerala, India". The city is what local recruiter searches filter on.

### 4. Custom URL

**Profile > top right "Edit public profile & URL" > Edit your custom URL (pencil icon).**
Change it to:

```
nevilkrishnak
```

The profile then lives at `https://www.linkedin.com/in/nevilkrishnak`.

If the name is taken, try in this order: `nevilkrishnak`, `nevilkrishna-k`,
`nevilkrishnakdev`. LinkedIn keeps the old URL working as a redirect, so nothing breaks, but
every place that currently links to the old URL should be updated. The old one is in the site's
`socials.json` and in `llms.txt`, so send the new URL back as a dev task.

On the same screen, make sure **Your profile's public visibility** is **On** and every section
under it is set to visible to everyone. A profile hidden from public view cannot rank.

### 5. Featured

**Profile > Add profile section > Recommended > Add featured > Add a link.** Add these four, in
this order. LinkedIn pulls the title and image automatically, and the title can be edited.

| # | Link | Title to set |
| --- | --- | --- |
| 1 | `https://nevil.dev` | Portfolio: nevil.dev |
| 2 | `https://nevil.dev/hire` | Hire me: services, availability, rates |
| 3 | `https://tmplayer.org` | TMPlayer: Telegram video player for Android TV |
| 4 | `https://resumebuilder.js.org` | Resume Builder: free resume tool |

Featured links are followed by people and crawled by search engines, so this is the cheapest
set of links on the internet pointing at the site.

### 6. Providing services

This is what puts the profile into LinkedIn's own services marketplace and adds a "Services"
page to the profile, which is separately indexed.

1. **Profile > Open to > Providing services.**
2. Services to tick (pick the closest label LinkedIn offers):
   `Web Development`, `Web Design`, `Mobile Application Development`,
   `Software Testing`, `SEO`, `Custom Software Development`, `Cloud Management`,
   `UX Research` only if it applies. Tick the first six.
3. **Service area**: set `Thrissur, Kerala, India` and tick **I am willing to work remotely**.
4. Description field, paste:

```
Web apps in React and Next.js, Android apps in Kotlin, dashboards and admin panels, Cloudflare
and Vercel deployment, and website speed and SEO fixes. Based in Thrissur, working across
Kerala and remotely across India. WhatsApp +91 92079 32070.
```

5. Save. LinkedIn will offer to show a "Providing services" badge under the name. Turn it on.

### 7. Open to Work

**Profile > Open to > Finding a new job.**

| Field | Value |
| --- | --- |
| Job titles | `Full Stack Developer`, `Frontend Developer`, `Software Engineer`, `React Developer`, `Next.js Developer` |
| Job types | Full-time, Contract, Freelance |
| Locations | `Thrissur, Kerala`, `Kochi, Kerala`, `Bengaluru, Karnataka`, plus `Remote` |
| Start date | Immediately |
| Who sees it | All LinkedIn members |

"All LinkedIn members" puts the green `#OPENTOWORK` frame on the photo. It reaches more
recruiters. If the current employer is a reason not to show it, choose **Recruiters only**, and
keep **Providing services** on regardless, that one is not a job-hunting signal.

### 8. Skills to pin

**Profile > Skills > Add skill.** Add all of these, then use the pencil icon to pin the top
three, because only three show on the profile.

Pin: `React.js`, `Next.js`, `TypeScript`.

Then add: `JavaScript`, `Tailwind CSS`, `Kotlin`, `Jetpack Compose`, `React Native`, `Node.js`,
`Python`, `Django`, `Cloudflare Workers`, `Docker`, `AWS`, `Google Cloud Platform`,
`Zustand`, `TanStack Query`, `REST APIs`, `Git`, `SQL`, `Internationalization (i18n)`,
`Search Engine Optimization (SEO)`, `Web Performance`.

Then ask three colleagues to endorse `React.js`, `Next.js` and `TypeScript` specifically. A
skill with endorsements ranks ahead of one without in recruiter search.

### 9. Banner

Size 1584 x 396 px. Put four things on it, in plain type, left aligned so the profile photo
does not cover them:

1. `Full stack developer, Thrissur`
2. `React, Next.js, TypeScript, Kotlin`
3. `nevil.dev`
4. `WhatsApp +91 92079 32070`

Dark background, one accent colour, the same font as the site. Do not put a photo collage or a
stock image of code behind it, the text stops being readable on mobile.

## Part B. GitHub

`https://github.com/dracu-lah`

GitHub ranks high for a developer's name and feeds a lot of other sites. The display name is
currently `dracu-lah`, which means every commit, every star and every repo is credited to a
handle nobody is searching for.

### 1. Settings to change

**github.com > profile photo (top right) > Settings > Public profile.**

| Field | Set to |
| --- | --- |
| Name | `Nevil Krishna K` |
| Bio | `Full stack developer in Thrissur, Kerala. React, Next.js and TypeScript for the web, Kotlin for Android. 3 years shipping production apps.` |
| Pronouns | leave blank or set as preferred |
| URL | `https://nevil.dev` |
| Social accounts | `https://www.linkedin.com/in/nevilkrishnak`, `https://x.com/nevilkrishnak`, `https://tmplayer.org`, `https://nevil.dev/hire` |
| Company | `@lascade` if Lascade has a GitHub org, else `Lascade LLP` |
| Location | `Thrissur, Kerala, India` |
| Display current local time | on |

Do not change the username `dracu-lah`. Changing a username breaks every existing link, every
clone URL and the `js.org` and `github.io` paths. The display name is what people and search
engines read, and that is the thing being fixed.

While in Settings, open **Emails** and untick **Keep my email addresses private** only if
public commit attribution matters. Otherwise leave it as it is, this is not an SEO issue.

### 2. Profile README

A file called `README.md` inside a repo named exactly after the username renders at the top of
the profile page.

1. Go to `https://github.com/new`.
2. Repository name: `dracu-lah` (GitHub will show a note saying this is a special repository).
3. Set it to **Public**, tick **Add a README file**, click **Create repository**.
4. Open `README.md`, click the pencil icon, delete what is there, and paste the block below.
5. Commit to `main`.

````markdown
# Nevil Krishna K

Full stack developer in Thrissur, Kerala. React, Next.js and TypeScript for the web, Kotlin for
Android. 3 years shipping production apps (SeatInfo, FlightPoints, TukTuko). Available for full
time roles, freelance projects and remote contracts across India.

- Portfolio: [nevil.dev](https://nevil.dev)
- Hire me: [nevil.dev/hire](https://nevil.dev/hire)
- LinkedIn: [nevilkrishnak](https://www.linkedin.com/in/nevilkrishnak)
- X: [@nevilkrishnak](https://x.com/nevilkrishnak)
- WhatsApp: [+91 92079 32070](https://wa.me/919207932070)
- Email: nevilkrishna@gmail.com

## What I do at work

**Lascade LLP, Full Stack Developer, Nov 2025 to now.** Building SeatInfo, a seat map product
that shows what a seat actually looks like before you book it. Next.js 16 on Cloudflare Workers
through OpenNext, with D1, R2, Durable Objects and next-intl. Also working on FlightPoints.

**Udyata Information Systems, Frontend Developer, Jun 2023 to Aug 2025.** Built the TukTuko
admin panel and self-hosted the OpenStreetMap stack (Nominatim and OSRM) so the product stopped
paying per map request.

## My own projects

| Project | What it is | Built with |
| --- | --- | --- |
| [TMPlayer](https://tmplayer.org) | Plays Telegram videos on Android TV and on your phone | Kotlin, Jetpack Compose, TDLib, Media3, GPL-3.0 |
| [Resume Builder](https://resumebuilder.js.org) | Free resume builder that runs in the browser | React, TypeScript |
| LangSync | CLI that keeps i18n translation files in sync across locales | TypeScript, Node.js |
| Image Cropper | Image cropper component for the shadcn/ui registry | React, TypeScript, shadcn/ui |
| Email Sender | Small tool for sending templated email | Node.js |
| swaydots, hyprdots | My Fedora dotfiles for Sway and Hyprland | Shell, Nix-free, Fedora |

## Stack

React, Next.js, TypeScript, JavaScript, Tailwind CSS, shadcn/ui, Zustand, TanStack Query,
React Native, Kotlin, Jetpack Compose, Python, Django, Node.js, Cloudflare Workers, D1, R2,
Durable Objects, OpenNext, Docker, AWS, GCP, Vercel, next-intl.

## Talk to me about

Rendering big SVG seat maps without dropping frames, running Next.js on Cloudflare Workers,
i18n that does not rot, self-hosting maps, and Android TV apps.

Malayalam and English.
````

### 3. Repos to pin

**Profile page > Customize your pins.** GitHub allows six. Pick these, in this order:

1. `TMPlayer` (the flagship, GPL-3.0, has a real site)
2. `resume-builder` (a public product at `resumebuilder.js.org`)
3. `LangSync` (a tool other developers install)
4. the shadcn/ui image cropper registry component
5. `dracufolio-next` (this site, proof of the frontend work)
6. `swaydots` (dotfiles get stars and traffic from the Linux crowd)

For each pinned repo, check three things: the **About** description is one clear sentence, the
**Website** field is set (`tmplayer.org`, `resumebuilder.js.org`, `nevil.dev`), and the
**Topics** are filled in (`android-tv`, `kotlin`, `jetpack-compose`, `telegram`, `nextjs`,
`react`, `typescript`, `i18n`, `cli`, `shadcn-ui`). The About and Topics fields are what GitHub
search and Google use.

Also add a "Built by Nevil Krishna K" line with a link to `https://nevil.dev` at the bottom of
each of those README files. `05-backlinks-and-lists.md` covers that.

## Part C. X

`https://x.com/nevilkrishnak`

### 1. Bio

**Profile > Edit profile > Bio.** 160 character limit. Paste:

```
Full stack developer in Thrissur, Kerala. React, Next.js, TypeScript for the web, Kotlin for Android. I build SeatInfo by day, TMPlayer by night.
```

That is 145 characters.

### 2. Location and website

| Field | Value |
| --- | --- |
| Name | `Nevil Krishna K` |
| Location | `Thrissur, Kerala` |
| Website | `https://nevil.dev` |

### 3. Pinned post

Write this as a new post, then use the three dots on the post and choose **Pin to profile**.

```
I build web apps in React and Next.js, and Android apps in Kotlin.

Day job: SeatInfo, a seat map product on Cloudflare Workers. Before that, two years of frontend
and self-hosted maps at Udyata.

Nights: TMPlayer, which plays Telegram videos on an Android TV. Kotlin, Compose, TDLib, Media3.

Everything I have shipped: nevil.dev
Work with me: nevil.dev/hire
Thrissur, Kerala. Remote anywhere.
```

Update the pinned post whenever a project ships something worth showing. A pinned post is the
first thing a recruiter or client reads after landing from a search.

## Part D. New accounts to create, in priority order

Work down this list. One a day is a fine pace. For the bio field, "bio 80", "bio 160" and
"bio 500" refer to the ready-to-paste versions in Part F.

| # | Platform | Why it matters | Bio field | Link to add |
| --- | --- | --- | --- | --- |
| 1 | Gravatar (`gravatar.com`) | One profile that dozens of dev tools read. WordPress comments, Stack Overflow, GitHub-adjacent tools, many CMS dashboards and a lot of forums pull the avatar and name from Gravatar using the email hash. Setting it once fixes the name and photo in places that cannot otherwise be edited. It also publishes an indexable profile page. | bio 500, plus the full link list | `https://nevil.dev` as the primary link, then LinkedIn, GitHub, X, `https://nevil.dev/hire` |
| 2 | Dev.to (`dev.to`) | High domain authority, indexes fast, and a canonical link back to `nevil.dev` means the original post keeps the ranking. Cross-post every blog post here. | bio 160 | Website `https://nevil.dev`, plus GitHub and X in the profile fields |
| 3 | Hashnode (`hashnode.com`) | Second cross-post destination, strong in the Indian developer audience, supports canonical links. | bio 160 | `https://nevil.dev` |
| 4 | Peerlist (`peerlist.io`) | India-first developer profile network. Profiles rank well for Indian names and recruiters here actually reach out. | bio 160 | `https://nevil.dev`, plus all project links |
| 5 | Stack Overflow (`stackoverflow.com`) | An old, trusted profile that ranks for the name. Even two useful answers make it credible. The "About me" field allows links. | bio 500 | `https://nevil.dev` in the website field, links in About me |
| 6 | Wellfound (`wellfound.com`) | Startup hiring, remote roles, foreign clients. Free, and the profile doubles as a resume. | bio 500 | `https://nevil.dev/hire` |
| 7 | FOSS United (`fossunited.org`) | Kerala's real FOSS community. A member profile plus a talk proposal is the fastest route to a genuine third-party page about you. | bio 160 | `https://nevil.dev` |
| 8 | TinkerHub (`tinkerhub.org`) | Kerala student and early-career tech community. Local credibility and speaking slots. | bio 160 | `https://nevil.dev` |
| 9 | Upwork (`upwork.com`) | Remote clients outside India who pay in USD. Takes a real portfolio and a 2 hour setup. | bio 500 | `https://nevil.dev/hire` |
| 10 | Instahyre (`instahyre.com`) | Indian product companies use it heavily, and outreach comes to you. | bio 160 | `https://nevil.dev` |
| 11 | Naukri (`naukri.com`) | The default for Indian recruiters. Worth having even if the roles are mostly service companies. Expect calls. | bio 160 | `https://nevil.dev` |
| 12 | Product Hunt (`producthunt.com`) | Needed before launching TMPlayer. A maker profile links to the site and the launch itself brings traffic and links. | bio 160 | `https://nevil.dev` |
| 13 | Quickerala (`quickerala.com`) | Kerala's own local business directory. Malayalam audience, local relevance, and it ranks for "web designer Thrissur" style queries. | bio 160 plus the Malayalam line | `https://nevil.dev/hire` |
| 14 | JustDial (`justdial.com`) | Where a lot of small business owners in Kerala still search first. Expect sales calls after signing up, that is the cost. | bio 160 plus the Malayalam line | `https://nevil.dev/hire` |
| 15 | Sulekha (`sulekha.com`) | Same audience as JustDial, leads for small website jobs. | bio 160 | `https://nevil.dev/hire` |
| 16 | IndiaMART (`indiamart.com`) | B2B buyers looking for software and web services. Enquiries are mostly price shoppers, so it is a low-effort listing, not a channel to invest in. | bio 160 | `https://nevil.dev/hire` |
| 17 | Kerala Startup Mission (`startupmission.kerala.gov.in`) | Directory and event listings. The value is the founder network in Kochi and Thiruvananthapuram, not the SEO. | bio 160 | `https://nevil.dev` |
| 18 | Truelancer (`truelancer.com`) | Indian freelance marketplace, small jobs, easy first reviews. | bio 160 | `https://nevil.dev/hire` |
| 19 | Twine (`twine.net`) | Freelance marketplace weighted towards design and creative work, occasional dev projects. Low effort, low return, do it last. | bio 160 | `https://nevil.dev/hire` |
| 20 | Behance or Dribbble | Only if there is real visual work to show (UI screens, a design system, app screens that were designed as well as built). An empty or screenshot-only profile is worse than none. | bio 160 | `https://nevil.dev/projects` |

Rules for every one of these:

1. Same profile photo everywhere. The same file, not a different crop.
2. Same name spelling: `Nevil Krishna K`.
3. Same phone and location string (Part E).
4. Fill in every optional field the platform offers. A complete profile ranks over an
   incomplete one on every one of these sites.
5. Turn off email notifications immediately, or the directory sites will bury the inbox.

## Part E. NAP consistency

NAP means name, address and phone. Google decides whether two listings are about the same
person by matching these strings. A mismatch splits the entity in two and both halves rank
worse, which is the single most common reason a local profile stalls.

These are the canonical strings. Copy from here every time, do not retype from memory.

```
Nevil Krishna K
Nevil Krishna K, Full Stack Developer
+91 92079 32070
+919207932070
Thrissur, Kerala, India
https://nevil.dev
nevilkrishna@gmail.com
```

| Field | Use | Never use |
| --- | --- | --- |
| Personal name | `Nevil Krishna K` | `Nevil Krishna`, `Nevil K`, `dracu-lah`, `Nevil Krishna.K` |
| Business name | `Nevil Krishna K, Full Stack Developer` | anything with "Best", "Thrissur" or "Solutions" added |
| Phone, displayed | `+91 92079 32070` | `9207932070`, `+91-9207932070`, `092079 32070` |
| Phone, in a link or schema | `+919207932070` | any spaced or hyphenated version |
| Location | `Thrissur, Kerala, India` | `Trichur`, `Thrissur, India`, `Kerala, India` |
| Website | `https://nevil.dev` | `http://`, `www.`, a trailing slash on a listing, `nevilkrishna.com` |
| Email | `nevilkrishna@gmail.com` | any alias or a second address |

Two allowed variations, because they are facts and not inconsistencies: `Nevil Krishna` as an
alternate name, and `നെവിൽ കൃഷ്ണ കെ` in Malayalam. Both are already declared in the site's
Person schema as `alternateName`, which is what tells Google they are the same person. Do not
introduce a third variation.

`Trichur` is worth a special note. It is the old spelling and some directories will
auto-correct to it. Change it back to `Thrissur` every time.

## Part F. Ready-to-paste bios

### 80 characters

```
Full stack developer in Thrissur, Kerala. React, Next.js, TypeScript, Kotlin.
```

(77 characters. For fields with a hard 80 limit: X-style taglines, directory short
descriptions, GitHub repo About lines.)

### 160 characters

```
Nevil Krishna K, full stack developer in Thrissur, Kerala. React, Next.js and TypeScript for the web, Kotlin for Android. 3 years shipping production apps.
```

(155 characters. For most bio fields, which cap at 160.)

### 500 characters

```
Nevil Krishna K, full stack developer in Thrissur, Kerala. React, Next.js and TypeScript for the web, Kotlin for Android. 3 years shipping production apps (SeatInfo, FlightPoints, TukTuko). Currently at Lascade LLP building SeatInfo on Cloudflare Workers. I also maintain TMPlayer, a Telegram video player for Android TV, and Resume Builder. Available for full time roles, freelance projects and remote contracts across India. Malayalam and English. nevil.dev, WhatsApp +91 92079 32070.
```

(486 characters. For About sections, directory long descriptions, marketplace profiles.)

### Malayalam line for the local directories

Add this under the English description on Quickerala, JustDial, Sulekha and IndiaMART. Local
directories serve Malayalam searches, and most listings there are English-only.

```
തൃശ്ശൂരിലെ ഫുൾ സ്റ്റാക്ക് ഡെവലപ്പർ. വെബ്‌സൈറ്റ്, ആപ്പ്, ഡാഷ്‌ബോർഡ്. വാട്ട്‌സ്ആപ്പ്: +91 92079 32070
```

## Part G. Send every new URL back

Every profile created or renamed in this file is a dev task, not just a marketing task. The
site keeps a `sameAs` list in the Person JSON-LD and a links section in `llms.txt`, and both
have to be updated with the exact URL.

Keep a running list as you go and hand it over in one batch:

```
LinkedIn (new custom URL): https://www.linkedin.com/in/nevilkrishnak
Google Business Profile:   <the profile's Maps URL>
Gravatar:                  https://gravatar.com/<handle>
Dev.to:                    https://dev.to/<handle>
Hashnode:                  https://<handle>.hashnode.dev
Peerlist:                  https://peerlist.io/<handle>
Stack Overflow:            https://stackoverflow.com/users/<id>/<handle>
Wellfound:                 https://wellfound.com/u/<handle>
Product Hunt:              https://producthunt.com/@<handle>
FOSS United:               https://fossunited.org/u/<handle>
Quickerala:                <listing URL>
JustDial:                  <listing URL>
```

What cross-linking does, in two sentences: when a set of profiles all carry the same name,
photo, phone and website, and each one links to `nevil.dev` while `nevil.dev` lists all of them
back in its `sameAs` list, search engines stop treating them as separate scraps of data and
start treating them as one known person. That single recognised entity is what earns a
knowledge panel, what AI assistants quote from, and what makes the name rank above everyone
else who shares it.

## Done when

- [ ] LinkedIn headline, About, location and custom URL updated
- [ ] LinkedIn Featured has the four links
- [ ] LinkedIn Providing services set up with the service area
- [ ] LinkedIn Open to Work set for jobs and freelance
- [ ] LinkedIn skills added, top three pinned, three endorsements requested
- [ ] LinkedIn banner uploaded
- [ ] GitHub display name changed to `Nevil Krishna K`
- [ ] GitHub bio, website, location and social links set
- [ ] GitHub profile README repo created and filled
- [ ] Six repos pinned, each with an About line, a website and topics
- [ ] X bio, name, location, website set and a post pinned
- [ ] Gravatar, Dev.to, Hashnode, Peerlist created (top 4)
- [ ] Remaining accounts from Part D created
- [ ] Every listing checked against the NAP strings in Part E
- [ ] Every new URL collected and sent back for `sameAs` and `llms.txt`
