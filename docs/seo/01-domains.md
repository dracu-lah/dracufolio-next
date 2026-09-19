# 01. Domains and redirects

Time: about 45 minutes of clicking, then a wait for DNS.
Do this first. Everything else points at `https://nevil.dev`, so the address has to be settled.

## Why a redirect and not a second copy of the site

If both `nevil.dev` and `nevilkrishna.com` served the same pages, the two domains would
compete for the same searches and Google would pick one of them on its own. A permanent
redirect avoids that. Every link, every share and every bit of trust that ever lands on
`nevilkrishna.com` is passed to `nevil.dev`, and `nevil.dev` stays the only address that
grows. The second domain is bought so nobody else takes the name, and so a person who types
the full name still reaches the site.

## 0. Renew nevil.dev first, before anything else in this folder

`nevil.dev` expires **1 October 2026**. It is registered at **Namecheap**, and only its
nameservers point at Cloudflare. Cloudflare does not renew anything and will not warn you:
the billing lives at Namecheap, and a domain on Cloudflare nameservers still lapses on the
registrar's schedule.

Everything in this repo is anchored to that hostname. The canonical tags, the sitemap, the
Search Console property, the `@id` values in the JSON-LD graph, the QR codes baked in at
build time, the resume PDF, the Google Business Profile link and every backlink asked for in
`05`. If it lapses, none of that degrades gracefully. It all points at nothing at once, and
the indexed pages drop out rather than move.

A lapsed `.dev` does not come back cheaply either. It goes to a grace period, then to
redemption, and the redemption fee is several times the renewal. A name this short and this
on-brand is also worth dropcatching, so the grace period is not a plan.

1. Log in to Namecheap, open Domain List, find `nevil.dev`.
2. Renew it **now**, and renew for more than one year. Three to five years costs the same per
   year and removes the whole failure mode. Registrars allow up to ten.
3. Turn **Auto-Renew** on, then check the card on file has not expired. Auto-renew with a dead
   card is the usual way a domain is lost.
4. Confirm the new expiry date reads 2029 or later before closing the tab.
5. Leave the nameservers on Cloudflare. Nothing about renewing touches DNS.

Do not transfer the domain to Cloudflare Registrar this month. A transfer adds a year and
Cloudflare charges at cost, so it is worth doing eventually, but a transfer started inside
the last two weeks before expiry can fail and leave the domain lapsed mid-move. Renew first,
transfer in a quiet month.

## 1. Buy nevilkrishna.com

Rough yearly prices for a `.com`. Indian registrars add 18% GST, so the number at checkout is
higher than the number on the product page. Check prices on the day, they move.

| Registrar | First year (INR) | Renewal (INR) | Notes |
| --- | --- | --- | --- |
| Cloudflare Registrar | about 1,050 | about 1,050 | Sold at cost, no upsells, no first-year discount. Billed in USD. The domain has to use Cloudflare DNS, which is what we want anyway. |
| Namecheap | about 1,000 | about 1,500 | Free WHOIS privacy. Billed in USD. |
| Hostinger | about 700 | about 1,400 | INR billing, GST invoice. |
| BigRock | about 800 | about 1,600 | INR billing, GST invoice, Indian support. |
| GoDaddy India | about 500 to 900 | about 1,800 | Cheapest first year, most expensive renewal. Uncheck every add-on at checkout. |

Pick Cloudflare Registrar if paying in USD by card is fine. Otherwise Namecheap.

1. Search for `nevilkrishna.com` at the registrar.
2. Buy 1 year (2 years if the renewal price is the same).
3. Turn on **Auto-renew**.
4. Turn on **WHOIS privacy** or **Domain privacy** if it is free. Do not pay for it.
5. Decline hosting, email, SSL and website-builder add-ons. The domain is only going to redirect.

## 2. Point nevilkrishna.com at Cloudflare

Skip this section if the domain was bought at Cloudflare Registrar. It is already there.

1. Sign in at `https://dash.cloudflare.com`.
2. Click **Add a domain** (older dashboards say **Add site**).
3. Type `nevilkrishna.com` and continue.
4. Choose the **Free** plan.
5. Cloudflare shows two nameservers, something like `xyz.ns.cloudflare.com` and
   `abc.ns.cloudflare.com`. Copy both.
6. Go back to the registrar, open the domain, find **Nameservers** (Namecheap calls it
   "Domain > Nameservers > Custom DNS", GoDaddy calls it "DNS > Nameservers > Change").
7. Replace the registrar's nameservers with the two Cloudflare ones and save.
8. Back in Cloudflare, click **Check nameservers now**. The status goes from "Pending" to
   **Active**, usually inside an hour, sometimes up to 24 hours.
9. In Cloudflare, open **SSL/TLS > Overview** and set the encryption mode to **Full (strict)**.

## 3. DNS records for nevilkrishna.com

A Cloudflare Redirect Rule only runs if the hostname has a proxied DNS record, so the domain
needs a record even though no server sits behind it. `192.0.2.1` is an address reserved for
documentation that answers nothing. No request ever reaches it, because Cloudflare answers
with the redirect at its own edge.

Open **DNS > Records > Add record** and add these.

| Type | Name | Content | Proxy status | TTL |
| --- | --- | --- | --- | --- |
| A | `@` | `192.0.2.1` | Proxied (orange cloud) | Auto |
| A | `www` | `192.0.2.1` | Proxied (orange cloud) | Auto |
| TXT | `@` | `v=spf1 -all` | n/a | Auto |
| TXT | `_dmarc` | `v=DMARC1; p=reject; rua=mailto:nevilkrishna@gmail.com` | n/a | Auto |

The two TXT records say the domain sends no email, so nobody can spoof
`something@nevilkrishna.com`. Add no MX record at all. If Cloudflare warns that the domain has
no mail records, that warning is correct and intended.

The orange cloud matters. If either A record is grey (DNS only), the redirect will not fire and
the browser will hang.

## 4. The Redirect Rule

1. In Cloudflare, make sure `nevilkrishna.com` is the selected domain, not `nevil.dev`.
2. Open **Rules** in the left sidebar, then **Redirect Rules**.
3. Click **Create rule**.
4. Rule name: `nevilkrishna.com to nevil.dev`
5. Under **If incoming requests match**, choose **Custom filter expression**, then click
   **Edit expression** and paste:

```
(http.host eq "nevilkrishna.com") or (http.host eq "www.nevilkrishna.com")
```

6. Under **Then**, set **Type** to **Dynamic**.
7. In **Expression**, paste:

```
concat("https://nevil.dev", http.request.uri.path)
```

8. Set **Status code** to `301`.
9. Turn **Preserve query string** ON.
10. Click **Deploy**.

`Dynamic` plus that expression is what makes the redirect path preserving. A `Static` redirect
to `https://nevil.dev` would send every visitor to the home page and throw away the path, so
`nevilkrishna.com/hire/thrissur` would lose the `/hire/thrissur` part.

## 5. Verify with curl

Run these from the terminal. Wait five minutes after deploying, Cloudflare needs a moment.

```bash
curl -sI https://nevilkrishna.com/ | head -n 5
curl -sI https://www.nevilkrishna.com/hire | head -n 5
curl -sI "https://nevilkrishna.com/hire/thrissur?utm_source=card" | head -n 5
```

Each one should show a `301` and a `location` header that keeps the path and the query:

```
HTTP/2 301
location: https://nevil.dev/hire/thrissur?utm_source=card
```

Then follow the whole chain and confirm it ends in a `200` on the right URL:

```bash
curl -sL -o /dev/null -w "%{url_effective} %{http_code}\n" https://nevilkrishna.com/hire
```

Expected output:

```
https://nevil.dev/hire 200
```

If the status is `302` or `307`, the rule's status code was left at the default. Edit the rule
and set `301`.

## 6. Flip dracufolio.vercel.app from 307 to 308

First confirm the current state:

```bash
curl -sI https://dracufolio.vercel.app/ | head -n 5
```

It currently answers `307`. A `307` tells Google the move is temporary, so Google keeps the old
URL in its index and keeps crediting the old domain. `308` is the permanent version of the same
redirect.

1. Open `https://vercel.com` and sign in.
2. Open the project that owns the domain (the dracufolio project).
3. Go to **Settings > Domains**.
4. Find `dracufolio.vercel.app` in the list and click **Edit**.
5. Make sure **Redirect to** is set to `nevil.dev`.
6. Change the status code selector from **307 Temporary Redirect** to
   **308 Permanent Redirect**.
7. Click **Save**.

If the selector only offers `301` and `302`, pick `301`. It is also permanent and Google treats
it the same way.

Verify:

```bash
curl -sI https://dracufolio.vercel.app/projects | head -n 5
```

Expect `HTTP/2 308` and `location: https://nevil.dev/projects`. The path must survive. If it
redirects to the bare home page, the domain is set to a plain redirect without path
preservation, and the fix is to remove and re-add the redirect in the same screen.

## 7. Confirm www.nevil.dev resolves

```bash
dig +short www.nevil.dev
curl -sI https://www.nevil.dev/ | head -n 5
```

`dig` must print something (a CNAME or an IP). `curl` must print `308` with
`location: https://nevil.dev/`.

If `dig` prints nothing:

1. In Vercel, open the dracufolio project, **Settings > Domains**.
2. Click **Add Domain**, type `www.nevil.dev`, add it.
3. Vercel will offer **Redirect to nevil.dev**. Choose it and set `308`.
4. Vercel then shows a `CNAME` record. Add it in Cloudflare under the `nevil.dev` zone:
   type `CNAME`, name `www`, content the value Vercel shows, proxy status **DNS only**
   (grey cloud, Vercel handles the certificate).
5. Wait for Vercel to show a green **Valid Configuration**, then run the two commands again.

## 8. What not to do with the new domain

- Do not put a copy of the site on `nevilkrishna.com`.
- Do not submit a sitemap for `nevilkrishna.com` in Search Console.
- Do not use `nevilkrishna.com` in any profile, business listing, resume or signature. Every
  public link says `https://nevil.dev`.
- Do not use Cloudflare's **Change of Address** or Search Console's **Change of Address** tool.
  Nothing is moving, `nevil.dev` was always the home.

## Done when

- [ ] `nevil.dev` renewed to 2029 or later, auto-renew on, card on file valid
- [ ] `nevilkrishna.com` bought, auto-renew on
- [ ] Domain active on Cloudflare, SSL mode Full (strict)
- [ ] Two proxied A records plus the SPF and DMARC TXT records added
- [ ] Redirect Rule deployed, dynamic, 301, query string preserved
- [ ] `curl` shows a path-preserving 301 for apex, www and a deep URL with a query
- [ ] `dracufolio.vercel.app` answers 308, path preserved
- [ ] `www.nevil.dev` resolves and answers 308 to the apex
