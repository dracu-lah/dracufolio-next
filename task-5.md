# task-5.md: a blog post for TMPlayer 1.26.0

Status: BUILT, not committed or pushed. Written and built 15 Oct 2026. Section 6 records how the build differs from this plan.

TMPlayer 1.26.0 went out on 14 Oct 2026, five days after 1.25.0: 238 commits, 888 files.
The last post ("Taking a Telegram video player from Android TV to Windows and Linux", 13 Oct)
covered 1.17.0 to 1.25.0 and ended on "I would ship fewer releases". 1.26.0 is the first
release after that line, and it is one batched release, so the new post can open there.

Like the last one, it is not a changelog. It picks the three or four changes that taught me
something, with real code from the repo, and links back to the earlier two TMPlayer posts.

## 1. Working title and slug

- Title: "Streaming a video bigger than the free space on a TV stick"
- Slug: `tmplayer-low-storage-mode`
- Tags: Kotlin, Android TV, TDLib, Compose Desktop, macOS
- `project: "tmplayer"`, so the TMPlayer project page links to it

The title leads with the one change with a search-shaped question behind it. The other
sections ride under it. (Open question A.)

## 2. Sections (each one checked against the TMPlayer source before it is written)

1. **Intro.** 1.26.0 in one paragraph, what is in it, and the "one release, not five" note.
2. **Low storage mode.** A stick with 3 GB free and a 6 GB film. The player keeps a rolling
   window of the stream on disk instead of the whole file, never asks TDLib for "no limit",
   keeps the bytes a seek lands inside, and only lets go once the player is gone. The room
   check measures the window, not the file. Sources: `333d8f5`, `538b7d0`, `722d167`,
   `66244fc`, and `TdByteWindow` from the last post.
3. **Save mobile data.** Same window code, the other way round: on a metered connection,
   fetch about 100 MB ahead of the playhead and extend it as reading nears the end, with
   nothing deleted. Source: `1f9626a`.
4. **TMPlayer rows on the Android TV home screen.** Channels built from Home's rows, and why
   turning the row off or signing out empties the channel instead of deleting it (deleting it
   means the launcher never shows it again without the user re-adding it). Also the card that
   opened a show before the window had focus, so Play was not focused. Sources: `80a3344`,
   `75cbf0f`, `17e7c1e`, `40fb955`.
5. **A macOS build without a Mac.** The DMG preview built, ad hoc signed and self-tested on a
   `macos-26` CI runner, the arm64 mpv runtime, Cmd shortcuts, and the GPL/LGPL source archive
   for the mpv runtime. Source: `128b285`, `3ee6aac`.
6. **Asking before a crash report.** With the switch off, a crash is written to the device
   and the next start asks to send it, once or always; release builds upload the R8 mapping
   so the trace reads as source. Short section. Sources: `c48a447`, `5a5c13a`.
7. **What I would do differently.** Honest, from the history (to be found while writing, not
   invented).

Target about 7 to 8 minutes, the same length as the last post. Sections 5 and 6 are the first
to cut if it runs long.

## 3. Files touched in this repo

- `app/blog/(posts)/tmplayer-low-storage-mode/page.mdx` (new)
- `app/blog/(posts)/tmplayer-low-storage-mode/opengraph-image.tsx` (new, same as the last post's)
- `app/data/posts.ts`: new entry at the top, date `2026-10-15`
- `app/data/updated.ts`: bump the blog and TMPlayer entries if they are tracked there
- `public/appwrite/projects/tmplayer-tv-home-screen.webp`: copied at source quality from
  `TMPlayer/site/screenshots/tv-home-screen.webp`, used as the post image and the hero figure
- `app/data/projects.json`: only if the TMPlayer copy names a version or a platform list that
  1.26.0 changed (macOS now exists). (Open question C.)
- Sitemap and RSS read `posts.ts`, so they need nothing.

## 4. Checks before it lands

- `pnpm build`, then `check-jsonld.mjs` and `check-seo.mjs` against `pnpm start` on 3111
- `pnpm check:dashes`
- Screenshot of the post at 390px and desktop in headless Chromium, looked at
- Security pass from `AGENTS.md` (no new packages, so mostly the Next.js advisory check)
- No push until you say so

## 5. Open questions

A. **Angle.** Lead with Low storage mode (above), or a broader "what went into 1.26.0" post
   with a release-shaped title?
B. **macOS section.** It is a preview. Do you want it in the post, or kept quiet until it is
   out of preview?
C. **Project page.** Update the TMPlayer project copy for macOS and 1.26.0 in the same change,
   or leave the project page alone?
D. **Publish date.** 15 Oct (today), or a date of your choosing?

## 6. What was built, and where it differs from the plan

Your answer to "start" was "show screenshots, add all new features from latest", which settled
A (a broad post covering everything in 1.26.0), B (macOS is in) and C (the project page is updated).
D defaulted to today.

- **Title and slug changed.** "TMPlayer 1.26.0: streaming a film bigger than the free space",
  at `/blog/tmplayer-1-26-low-storage-mode`. Low storage mode leads; every other feature follows.
- **Sections added:** the new Home and poster choice (the Arabic search bug), the setup and
  device check (`DeviceFit`), a player list (skip intro, speed per series, preferred languages,
  watch later, bookmarks, A-B repeat, season downloads, skip silence), locks and backups, crash
  report consent, and the desktop's own window buttons.
- **"What I would do differently"** says that Low storage mode, Save mobile data and the Mac
  build were tested on emulators, harnesses and CI, not yet on a stick, a mobile network or a
  real Mac. That comes from TMPlayer's PLAN.md.
- **Length:** about 2,600 words, 12 minutes, longer than the 7 to 8 planned, because it covers
  every feature.
- **Screenshots, copied at source quality** into `public/appwrite/projects/`:
  `tmplayer-tv-home.webp` (post image), `tmplayer-tv-home-screen.webp`,
  `tmplayer-phone-show.webp`, `tmplayer-tour-player-tv.webp`, `tmplayer-desktop-grid.webp`.
- **Project page:** macOS in the description, platform list and JSON-LD `operatingSystem`, a
  Low storage mode sentence, three new feature lines, the test count updated from about 1,100 to about 1,400, and
  three new gallery images.
- `updated.ts`: `projects` and `blog` set to 2026-10-15.
- Every number and code excerpt was checked against the `v1.26.0` tag in the TMPlayer repo.
- Checks: `pnpm build`, both SEO scripts (44 routes), `check:dashes`, `pnpm audit --prod` all
  pass. Next 16.4.1 is the latest and already patches the 14 Oct advisories.
