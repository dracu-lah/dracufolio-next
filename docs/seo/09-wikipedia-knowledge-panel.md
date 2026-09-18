# 09. Wikipedia, Wikidata and the knowledge panel

Read this once. There is one task at the bottom, and it is a monthly search.

## Wikipedia: no, and here is why

Do not create a Wikipedia article. Do not pay anyone to create one.

Three reasons, all of them practical.

**1. The notability bar is not about being good at your job.** Wikipedia requires significant
coverage in multiple independent, reliable sources that are not connected to you. A LinkedIn
profile, a GitHub account, a personal site, a Product Hunt launch, a meetup listing and a
company bio are all either self-published or connected to you, so none of them count. What
counts is something like a feature article about you in a newspaper with an editorial staff, or
a chapter in a published book. Three years into a career, that coverage does not exist yet, and
no amount of profile work creates it.

**2. Writing about yourself is a declared conflict of interest.** Wikipedia's rules require the
conflict to be declared on the talk page, and undeclared paid editing is a blockable offence.
Declared or not, an autobiography gets far harsher scrutiny than an ordinary article, and
volunteer editors specifically patrol for new articles about people who are not yet notable.

**3. A failed page leaves a permanent public record.** This is the part most people do not know.
When an article is deleted, the deletion discussion stays online forever at a URL containing
your name, and it is indexed. A page titled "Articles for deletion: Nevil Krishna K" that says
the subject is not notable is a negative result sitting in Google for the exact query the whole
of this folder is trying to win. The downside of trying and failing is worse than never trying.

Revisit this when there are two or three independent published articles that are genuinely
about you and were written by someone else. Not before.

## Wikidata: not yet

Wikidata is the structured database behind a lot of knowledge panels, so the temptation is to
create an item and skip Wikipedia entirely. It does not work that way.

- Wikidata's notability policy needs the subject to be either the topic of a Wikipedia article,
  or a clearly identifiable entity described in at least one serious, publicly available
  reference. A personal site is not a serious independent reference for this purpose.
- Items created by their own subject about a private individual get deleted routinely, through
  "requests for deletion", and that discussion is also public and indexed.
- Google does not build a person's knowledge panel from a self-created Wikidata item. It builds
  it from its own confidence in an entity, and Wikidata is one signal out of many.

When it becomes reasonable: once two or three independent write-ups exist (a newspaper feature,
a magazine interview, a conference speaker page from a notable conference), a Wikidata item
referencing them is defensible and worth creating. That is a month-twelve conversation, not a
month-one one.

## What actually works: one consistent entity

Google does not need Wikipedia to give a person a knowledge panel. It needs to be confident
that a specific, real, distinct person exists, and that it knows the facts about them. That
confidence is built out of repetition and agreement, which is entirely within your control.

The five parts, in order of how much they matter.

### 1. The same facts everywhere

Name, photo, location, phone, employer, website. Identical strings, the same image file, on
every profile. This is `04-profiles-and-cross-linking.md`, Part E, and it is the foundation.
Disagreement between sources is the single biggest reason Google stays unconfident.

### 2. Person schema with a stable `@id` and a full `sameAs`

Already on the site. Two details worth protecting:

- The `@id` must never change. It is the permanent identifier that lets Google tie the schema
  on one page to the schema on another. A changed `@id` reads as a different person.
- The `sameAs` array must list every profile, and every one of those profiles must link back to
  `nevil.dev`. A one-way claim is weak. A claim confirmed from both ends is what gets believed.

Every new profile URL from `04` is a dev task for this reason, not just housekeeping.

### 3. Profiles that link back

LinkedIn, GitHub, X, Gravatar, Dev.to, Hashnode, Peerlist, Stack Overflow, the Business
Profile. Each one carries the site URL in its website field. That is the confirming half of the
`sameAs` claim.

### 4. Third-party pages that repeat the same facts

A page you do not control, saying the same things, is worth more than ten pages you do control.
The ordered path to these is the next section.

### 5. Time

Panels for individuals typically appear 6 to 18 months after the entity has been consistent,
and for many people never appear at all. There is no submission form and no way to speed it up
beyond the four items above. Treat the panel as a side effect of doing `03`, `04` and `05`
properly, not as a goal with a deadline.

## The ordered path to third-party coverage

Each step makes the next one easier, so do them in order. The outreach messages are in `05` and
`10`.

### Step 1. Speaker pages at FOSS United, TinkerHub and GDG

The cheapest real third-party page there is. These communities publish a page per event with
the speaker's name, photo, bio and links, and those pages are indexed and permanent. They also
give you the phrase "spoke at" for every future bio.

What to do: pitch the two talks in `05`, priority 4. Accept any slot, including a 10 minute
lightning talk. After the talk, ask the organiser for the recording link and the event page URL
and send both back for the site's `sameAs` list and `/about`.

Realistic timeline: one to three months.

### Step 2. A Product Hunt launch and a Show HN for TMPlayer

Both produce a permanent, third-party page about something you made, with your name on it. A
launch that goes reasonably well also produces the thing steps 3 and 4 need, which is a reason
for someone else to write about you.

What to do: `05`, priority 5. Launch once, properly, rather than three times badly.

Realistic timeline: one month to prepare, one day to launch.

### Step 3. A Malayalam tech YouTube interview

There is a real Malayalam-language tech channel ecosystem covering developers, careers and open
source. An interview is a third-party page, a video that ranks for the name, and something a
local newspaper will take seriously later.

What to do: make a list of Malayalam tech channels that have interviewed developers. Send the
pitch after step 2, because "I built an open source Android TV app that launched on Product
Hunt" is a story and "I am a developer" is not. Offer a specific topic, not yourself: how a
Kerala developer ships an open source Android app solo, or what the work is actually like at a
product company in Kochi.

Realistic timeline: three to six months.

### Step 4. A local newspaper tech feature

Malayala Manorama, Mathrubhumi and the local English papers all run technology and startup
pages, and a Thrissur-based developer with a free tool people use is a local story. This is the
first source on this list that would count towards Wikipedia notability.

What to do: pitch the tool and the local angle, never yourself. "A free Android TV app made in
Thrissur that has [N] users" is a story. Include a photo, the numbers and one line about
yourself. Send it to the technology desk, and to any reporter who has written about a Kerala
developer before.

Realistic timeline: six to twelve months, and it depends on step 2 and step 3 having happened.

### Step 5. A college alumni page

Easy, permanent, and from a domain that is old and trusted. It is last on the list only because
it carries less weight than the others, not because it is hard. Ask anyway, the message is in
`05`, priority 4.

Realistic timeline: one email.

## When a knowledge panel appears, claim it

Search `Nevil Krishna K` in Google once a month, signed in to `nevilkrishna@gmail.com`, and
look for a box on the right of the results (or above the results on a phone) with the name and
a photo in it.

The moment it appears:

1. Scroll to the bottom of the panel.
2. Click **Claim this knowledge panel**.
3. Google asks you to prove you are the person or an authorised representative. It checks the
   official website and the linked profiles, so sign in to one of the linked accounts when
   prompted. Having the site verified in Search Console under the same Google account makes
   this straightforward.
4. Once verified, a **Suggest an edit** control appears on the panel for you specifically.
5. Fix the things that are wrong, one at a time: the photo, the one-line description, the
   featured links, the social profile list.
6. Each suggestion goes into review. Expect days to weeks, and expect some to be rejected
   without a reason. Re-submit with the `nevil.dev` URL as the supporting evidence.

Two warnings. Do not buy a "knowledge panel service", there is no such product, and what gets
delivered is an unwanted Wikidata item or a Wikipedia draft that will be deleted. Do not create
a second Google account to "manage" the entity, one account owning the site, the Business
Profile and the panel claim is what makes verification simple.

## Done when

- [ ] Understood: no Wikipedia article, no Wikidata item, for now
- [ ] Step 1 in motion: talks pitched to FOSS United, TinkerHub and GDG Kochi
- [ ] Step 2 in motion: TMPlayer launch prepared
- [ ] Step 3 list started: Malayalam tech channels that interview developers
- [ ] Step 4 pitch drafted, held until step 2 and 3 have happened
- [ ] Step 5 done: college asked about an alumni page
- [ ] `Nevil Krishna K` searched once a month, looking for a panel
- [ ] Every third-party page that appears is sent back for `sameAs`, `/about` and `llms.txt`
