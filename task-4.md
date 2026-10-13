# task-4.md: the second October pass

Written 13 Oct 2026. Status: BUILT the same day. `task-3.md` was the company work cleanup,
this one finishes the SEO audit from the same day and brings in more of the work on GitHub.
Sections 1 to 3 are kept as planned; section 5 records what shipped and section 6 where the
build went differently.

## 1. What I found while planning

- **nevil.dev/sway.sh is out of date.** The swaydots README tells people to run
  `curl -fsSL https://nevil.dev/sway.sh | bash`, and the copy served by the site still installs
  `tlp`. The repo dropped it on purpose (commit 520d0f3) because `tlp` and `auto-cpufreq` fight
  over the CPU governor, so anyone who runs the one-liner gets the setup the repo says not to use.
  The two files differ by about 100 lines.
- **The IndexNow key is already live.** `public/75a8f554...txt` has been there since September,
  and `docs/seo/02` explains how to ping by hand. What's missing is a step that pings without
  you having to remember.
- **The open source page says "163 public repos".** The real number is 178.
- **The blog calendar in `docs/seo/07` plans six posts from company work.** Topics 2 to 7 list
  Lascade and Udyata as their source. That was written before the rule in `CLAUDE.md` that company
  work is never named. The repo is public, so the plan itself discloses where each technique came
  from.
- **Your Dell runs swaydots on Fedora 43** (`~/.config/sway` is a stow link into the `dell`
  branch), but `setup.sh` and the README are for Arch only (`pacman`, `yay`). `docs/seo/07`
  topic 10 is about a "Fedora and Sway setup".
- **Project pages describe every project as a `CreativeWork`.** TMPlayer, TapTL and LangSync
  are software you install, which is what `SoftwareApplication` is for.
- Repos worth adding to the open source page, each one your own, finished, and useful to a
  stranger:
  - `email_cleaner`, a Gmail IMAP cleanup CLI with a dry run. It uses only the Python standard
    library.
  - `nuxt-learning-lab`, a Nuxt starter written for Next.js developers that maps each file to
    the Next.js equivalent.
  - `refurbished-laptops-buying-guide`, a checklist for inspecting a used laptop.
  - `opennext-cloudflare-implementation`, a guide to moving a Next.js app from Vercel to
    Cloudflare Workers with OpenNext.
  - `IKEv2-VPN-Setup-Guide`, which sets up an IKEv2 VPN on Linux with NetworkManager and
    strongSwan.

  Left out: the course exercises (todo, counter, clones), the forks, empty starters
  (`back-to-business`, `domain-computers` are still the template README), and every private repo.

## 2. Decisions (answered 13 Oct)

Answers: (1) trim to the Thrissur area, (2) the dotfiles post, any distro, (3) and (4) list
both guides and write the OpenNext post.

1. **The `/hire/<place>` pages.** There are 31 of them. Google's doorway page rule targets pages
   made to rank for many places that lead people to the same thing. Each page has a real
   two-to-three sentence blurb, but the rest of the template is shared. The options:
   - **(a) Keep the Thrissur towns plus Thrissur, Kerala and India.** The 13 other districts
     redirect to `/hire/kerala`, which lists them. Those are the places you actually meet
     clients in person.
   - (b) Keep all 31 and give each one more content of its own.
   - (c) Leave them as they are.

   I recommend (a).
2. **The Sway post.** Do you want it framed as "on Fedora", which is what you run, or framed
   around the dotfiles, noting that the installer targets Arch? Or should a Fedora section be
   added to the swaydots README first? That last option changes another repo.
3. **The Cloudflare and OpenNext guide.** The repo is generic (`my-next-app`, `example.com`), but
   `docs/seo/07` says the experience came from work. Is it fine to list it and write a post from
   it, or does it stay off the site?
4. **The IKEv2 guide** was written for a "corporate IKEv2 VPN". Same question: list it or leave it.

## 3. The build

| # | Task | Notes |
| --- | --- | --- |
| T1 | Latest posts block on the home page | The three newest posts from `publishedPosts`, placed after Projects. Title, date and a one-line description, using the existing card and Badge components. Checked at 390px. This gives each post a link from the strongest page on the site. |
| T2 | IndexNow on deploy | `scripts/indexnow.mjs` reads the live sitemap and pings `api.indexnow.org` with the URLs whose `lastmod` is today, or with URLs given as arguments. Adds `pnpm indexnow`, plus a GitHub Action on a successful production `deployment_status` from Vercel. Because `lastmod` comes from content dates, a deploy that changes nothing pings nothing. |
| T3 | Home page on `pageMetadata()` | First capture the rendered `<head>` (title, description, canonical, OG, Twitter) as it is now. Then switch over and diff, so the title stays exactly the same. |
| T4 | Hire pages | Whatever you pick in decision 1. For (a): redirects in `next.config.ts`, the list on `/hire/kerala`, and updates to the sitemap, `llms.txt`, `LocationsSection` and the check script. |
| T5 | Sync `public/sway.sh` with swaydots | Copy `setup.sh` from the branch the README lives on, and add a line to `check-seo.mjs` that fails if the file still mentions `tlp`. |
| T6 | Post: your Sway setup | Sourced from swaydots `dell`: the power stack (auto-cpufreq, thermald, powertop, why not tlp, the 50/80 charge limits), the lid and idle scripts, clipboard history, recording, `stow` with one branch per laptop. Real config excerpts and a screenshot from the repo's `og-image.png`. Framed per decision 2. |
| T7 | Post: Vercel to Cloudflare Workers with OpenNext | Only if decision 3 is yes. Sourced from the guide repo: R2 and D1 bindings, wrangler and OpenNext config, image rules, and the deploy pipeline. |
| T8 | Open source page | Add the repos from section 1 (minus any you say no to in decisions 3 and 4). The repo count is fetched from the GitHub API at build time, falling back to no number at all, so it can't go stale again. |
| T9 | `SoftwareApplication` schema | TMPlayer, TapTL and LangSync get a `SoftwareApplication` node: `operatingSystem`, `applicationCategory`, a free `offers` entry, `downloadUrl`, `license`, and the author as `ref(ID.person)`. Everything else stays `CreativeWork`. There's no rating, so Google won't show stars, but it does read the node. |
| T10 | Rewrite the blog calendar | Replace topics 2 to 7 in `docs/seo/07` with posts from your own repos. Mark 1, 8 and 10 as done or in progress, and remove the company names. |
| T11 | `CLAUDE.md` | Change Next.js 15 to 16. Make the Images section match your global rule (don't re-encode screenshots that are already compressed). |
| T12 | Checks and ship | `pnpm build`, both check scripts on :3111, `pnpm check:dashes`, a 390px screenshot of the home page and both new posts in Chromium, then one commit per task group and a push. After that I'll update this file with what shipped and where the build deviated. |

## 4. Yours, after the deploy

- In Search Console, resubmit `sitemap.xml` and request indexing for the new posts.
- In Bing Webmaster Tools, confirm the IndexNow pings show up under IndexNow insights.

## 5. What shipped

| # | Result |
| --- | --- |
| T1 | "Writing" section on the home page after Projects, the three newest posts, checked at 390 and 1440. |
| T2 | `scripts/indexnow.mjs`, `pnpm indexnow`, and `.github/workflows/indexnow.yml` on Vercel's production `deployment_status`. A dry run against the live sitemap picked 17 URLs for the last 3 days. |
| T3 | Home on `pageMetadata()` with a new `absoluteTitle` option. The rendered head is identical to production apart from the OG image hash. The JSON-LD description now matches the meta description (they used to differ). |
| T4 | 16 hire pages (13 towns, Thrissur, Kerala, India). The other 13 districts redirect with a 308, including their share images, to `/hire/kerala`, which lists each one with its Malayalam name and its blurb. `areaServed` and `llms.txt` still name every district. |
| T5 | `public/sway.sh` is the swaydots `dell` branch's `setup.sh`. `check-seo.mjs` fails if it installs tlp again. |
| T6 | `/blog/sway-setup-i-work-in`, using the repo's own screenshot, copied without re-encoding. |
| T7 | `/blog/nextjs-on-cloudflare-workers-with-opennext`. The old retired post's URL now redirects here rather than to `/blog`. |
| T8 | Six entries added or rewritten on `/open-source`. The repo count is fetched from GitHub daily, and showed 178. |
| T9 | TMPlayer, TapTL and LangSync are `SoftwareApplication` nodes, with no version number. |
| T10 | `docs/seo/07` rewritten: the 9 published posts and 5 new topics, all from your own repos. No employer is named as a source. |
| T11 | `CLAUDE.md` says Next.js 16, and the Images section matches the no-compression rule. |
| T12 | Build OK. check-jsonld passes on 43 routes, check-seo passes, no em dashes, tsc clean. |

Also pushed separately, to swaydots `dell`: the two uncommitted live tweaks (laptop screen back to
scale 1, larger waylogout icons), committed as `d5d5622`.

## 6. Deviations and corrections

- **The OpenNext post corrects your own guide.** Checked against opennext.js.org on 13 Oct, the
  guide had these wrong or missing:
  - It says `/_next/image` runs a WebAssembly sharp in the Worker. The docs describe the
    Cloudflare Images binding instead.
  - Its `upload` script has no build step.
  - It never mentions `public/_headers` for `/_next/static`.
  - It doesn't say which caches an app can skip.

  The post says all of this openly. The guide repo itself is unchanged and is worth an update.
- **Wrong facts on the open source page, fixed.** It said LangSync was "Node.js" (it is Python)
  and that Email Sender used the "Gmail API" (it uses Nodemailer over SMTP with an app password).
- **The `sway.sh` copy came from `dell`, not `main`.** `main` still installs tlp, and `dell` is
  the branch on this machine.
- **Two things only you can fix in swaydots, left alone:**
  - The README on `main` and `dell` still prints your personal email in the Git setup step.
  - The served script no longer prints it.
- **The Sway post's screenshot is old.** It's from the January Asus on Arch, and the caption says
  so. A fresh one from the Dell would be better.
- **Footer places dropped from five to three** (Thrissur, Kerala, India), since Ernakulam and
  Palakkad no longer have pages.
- **The IndexNow action needs Vercel's GitHub deployments,** which are on by default. Check the
  Actions tab after the first deploy. If the job never runs, run `pnpm indexnow` by hand.
