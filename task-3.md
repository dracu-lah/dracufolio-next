# task-3.md: the October 2026 cleanup

Written 12 Oct 2026. Company work comes off the site and out of the public repo, and the
design studies are labelled as concepts. The standing rule is in `CLAUDE.md` under
"Company work is never named".

## Decisions

1. The blog post about the day job product is deleted and its URL redirects to `/blog`.
2. Employers (Lascade LLP, Udyata) stay with role and dates. The work is described by its
   stack and its kind, never by product name.
3. Git history is rewritten so the names are gone from old commits too.
4. The GitHub profile README is updated and pushed through `gh`.

## Shipped

- LangSync links to https://langsync.pages.dev and uses a screenshot of that page.
- Four employer and client products are deleted from `projects.json`, with their
  screenshots and logos. Old project URLs land on `/projects` through one rule in
  `next.config.ts` built from the published slugs, so no removed slug is written there.
- `concept: true` on a project puts a "Concept" badge on its card and a note, a badge and
  "View concept" on its page. Adora Homes (adora.nevil.dev) and Parazya Kampany
  (para.nevil.dev) are back as concept redesigns. No Secrets and Oroex are flagged too.
- About, experience, hire, FAQ, the projects description, the resume and its PDF describe
  the work without product names.
- `docs/seo/*`, `task.md` and `task-2.md` are scrubbed the same way.
- `/projects` says "N projects", and its intro names the concepts.

## By hand (Nevil)

- Search Console > Removals: request removal of the old project URLs, the retired post and
  the old screenshot and logo image URLs, so Google drops the cached copies sooner.
- LinkedIn, the Google Business Profile and any other profile: paste the scrubbed copy
  from `docs/seo/assets/`.
- GitHub keeps orphaned commits reachable by hash for a while after a force push. If that
  matters, ask GitHub Support to run garbage collection on the repo.
