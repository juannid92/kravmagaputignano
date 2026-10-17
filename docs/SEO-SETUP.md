# SEO Setup & Operations

Last updated: 17 ottobre 2026

This document covers the operational SEO steps for `kravmagaputignano.it`.
The site is built with Next.js 15 (`output: "export"`) and deployed to a
Cloudflare Worker (`wrangler.jsonc` → `kravmagaputignano`). The static
export does NOT regenerate the sitemap at build time, so the operator
must remember a few manual steps after each deploy.

## Contents

- [Google Search Console verification](#google-search-console-verification)
- [Bing Webmaster Tools verification](#bing-webmaster-tools-verification)
- [Sitemap](#sitemap)
- [hreflang](#hreflang)
- [Structured data overview](#structured-data-overview)
- [Per-deploy checklist](#per-deploy-checklist)

---

## Google Search Console verification

URL: <https://search.google.com/search-console/>

1. **Property type:** URL prefix → `https://kravmagaputignano.it`
   (the "Domain" property requires DNS records; the URL prefix is faster
   to set up and uses an HTML meta tag).
2. **Verification method:** HTML tag.
   - GSC will return a meta tag like
     `<meta name="google-site-verification" content="XXXXXXX" />`.
   - Open `src/app/layout.tsx` and add the value to `metadata.verification.google`:
     ```ts
     export const metadata: Metadata = {
       // ... existing fields
       verification: {
         google: "google-site-verification=XXXXXXX",
         // (do not include the meta attribute name; pass only the content)
       },
     };
     ```
   - Commit, push, wait for the deploy to propagate (~1 minute on
     Cloudflare), then click "Verify" in GSC.
3. **Sitemap submission:** under "Sitemaps" submit
   `https://kravmagaputignano.it/sitemap.xml`. Google will surface
   crawl/coverage issues here.
4. **Index the 8 routes:** under "URL Inspection" submit each route for
   re-crawling:
   - `/`
   - `/corsi/adulti`
   - `/corsi/kids`
   - `/sedi/putignano`
   - `/sedi/conversano`
   - `/privacy-policy`
   - `/cookie-policy`
   - `/termini`

## Bing Webmaster Tools verification

URL: <https://www.bing.com/webmasters>

1. Add the site `https://kravmagaputignano.it`.
2. Verification method: HTML meta tag. Bing returns
   `<meta name="msvalidate.01" content="XXXXXXX" />`.
3. Add the value to `metadata.verification.bing` in the same
   `verification` block used for Google:
   ```ts
   verification: {
     google: "google-site-verification=XXXXXXX",
     bing: "msvalidate.01=XXXXXXX",
   },
   ```
4. Submit `https://kravmagaputignano.it/sitemap.xml` under
   "Sitemaps". Bing also accepts the same sitemap.

## Sitemap

`public/sitemap.xml` is **hand-maintained** — the static build does not
regenerate it. After any change to a route's content (notably the date
that matters for SEO freshness), update the `<lastmod>` field for that
URL to the deploy date.

When adding a new route:

1. Create the page under `src/app/.../page.tsx`.
2. Add a `<url>` entry to `public/sitemap.xml` with the absolute URL,
   the deploy date as `<lastmod>`, and a sensible `<changefreq>` /
   `<priority>`.
3. Add the same URL to `public/robots.txt`'s `Allow` if it should be
   indexed (the default is "allow all", so this is rarely needed).
4. Submit the URL via GSC "URL Inspection".

The current sitemap has 8 URLs; the count should match the number of
`page.tsx` files in `src/app/`.

## hreflang

The site is Italian-only (`<html lang="it">`). `src/app/layout.tsx`
sets:

```ts
alternates: {
  canonical: "https://kravmagaputignano.it",
  languages: {
    "it-IT": "https://kravmagaputignano.it",
    "x-default": "https://kravmagaputignano.it",
  },
},
```

This is a self-referential declaration — every page points to itself
for `it-IT` and `x-default`. It is intentionally not a real i18n matrix
because the site is not translated. If a translation is added later,
see <https://developers.google.com/search/docs/specialty/international/localized-versions>
and add per-language entries in each page's `generateMetadata`.

## Structured data overview

JSON-LD blocks emitted by the site (all hand-authored, no helper lib):

| Page | Schema | Source |
| --- | --- | --- |
| All pages (root layout) | `SportsActivityLocation` | `src/lib/legal.ts` → `legalJsonLd()` |
| `/` | `FAQPage` (6 Q&A) | `src/app/page.tsx` |
| `/sedi/[slug]` | `LocalBusiness` + `BreadcrumbList` | `src/app/sedi/[slug]/page.tsx` |
| `/corsi/adulti` | `BreadcrumbList` | `src/app/corsi/adulti/page.tsx` |
| `/corsi/kids` | `BreadcrumbList` | `src/app/corsi/kids/page.tsx` |

Validate any new JSON-LD via Google's
[Rich Results Test](https://search.google.com/test/rich-results) before
deploying.

## Per-deploy checklist

- [ ] `npm run build` exits 0.
- [ ] `npx tsc --noEmit` exits 0.
- [ ] Any page that changed has its `<lastmod>` in `public/sitemap.xml`
      updated to today.
- [ ] Any new route is in `public/sitemap.xml`.
- [ ] The commit SHA in `out/_build-info.json` matches the deploy
      commit (Cloudflare Worker emits this; see `DEPLOY.md`).
- [ ] After deploy, verify with
      `curl -I https://kravmagaputignano.it/sitemap.xml` and
      `curl -I https://kravmagaputignano.it/robots.txt` — both should
      return 200 with `Cache-Control: no-cache` on HTML and the
      appropriate `Content-Type`.
- [ ] Resubmit the changed URLs to GSC "URL Inspection" if the page
      title or main content changed.
