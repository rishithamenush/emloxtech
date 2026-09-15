# EmloX Tech: free SEO launch and growth plan

## Implemented

- Canonical domain: https://www.emloxtech.com (confirmed by the owner).
- 16 public pages prerendered as real HTML; browser hydration preserves navigation and interactions.
- Unique page titles, descriptions, canonical links, Open Graph and Twitter text metadata.
- Organization, WebSite, WebPage, Service, Article, and breadcrumb JSON-LD where relevant.
- Service-specific project guidance, preparation notes, FAQs, and links to related articles.
- Visible article publisher attribution. Concepts remain explicitly identified as illustrative work.
- Sitemap and robots.txt generated from rendered pages on every production build.
- Static 404 page with noindex. Removed the catch-all homepage rewrite; existing legacy redirects are permanent in Vercel configuration.
- No paid SEO tools, tracking subscriptions, or request-time application server added.

## Required launch steps (not completed by this code change)

1. Deploy `npm run build` output from `dist/emlox/browser` to the existing hosting project. The changes are local until deployed. On Vercel use the included configuration. Other hosts must serve generated route directories and return `404.html` with status 404 for unknown URLs. Do not add an SPA catch-all rewrite.
2. Confirm HTTPS works and redirect the non-www hostname to https://www.emloxtech.com using the hosting domain settings. Canonical tags are implemented; hostname redirects still need verification on the live host.
3. In [Google Search Console](https://search.google.com/search-console), verify the domain property `emloxtech.com` using Google's issued DNS TXT record. Alternatively verify the exact www URL-prefix property using Google's supplied HTML verification file in `public/` and rebuild. Do not invent a verification token.
4. Submit https://www.emloxtech.com/sitemap.xml. Use URL Inspection for the homepage and important service pages, run the live test, and request indexing when eligible.
5. Verify the site in [Bing Webmaster Tools](https://www.bing.com/webmasters/) and submit the same sitemap. Import from Search Console if offered for the account.
6. Check a direct service URL returns 200 with its own title and content. Check an invented URL and an invalid service slug return 404, not a homepage with status 200. Check `/news` redirects permanently to `/insights`.
7. Test representative URLs in [Rich Results Test](https://search.google.com/test/rich-results) and [PageSpeed Insights](https://pagespeed.web.dev/). Valid Schema.org markup does not necessarily qualify for a Google rich result. No live performance score or indexing status has been verified here.
8. Keep preview/staging deployments behind hosting deployment protection or host-level noindex headers. Do not block public production pages or their JavaScript/CSS assets.
9. Confirm the published contact email and phone work. The current form prepares an email draft; the visitor still needs to send it in their email application.

## Search intent map

These are editorial targets based on the actual services, not measured Google Trends volumes or proven ranking opportunities.

| Page | Main intent | Supporting language |
| --- | --- | --- |
| Home | Software development in Sri Lanka | Custom software, remote development studio |
| Product engineering | Web application and MVP development | Customer portals, internal tools, API integration |
| AI and data | AI automation services | Document processing, data engineering, bounded AI pilots |
| Experience design | UI/UX design in Sri Lanka | Interface redesign, brand identity, design systems |
| Cloud and DevOps | Cloud and systems integration | Deployment pipelines, cloud migration, infrastructure assessment |

Avoid creating near-identical pages for many cities or stuffing every phrase into each heading. Add a dedicated offering page only when there is a distinct service and enough useful first-hand detail.

## Free Google Trends workflow

Open [Google Trends](https://trends.google.com/trends/). Compare a small group such as “web development”, “software development”, “UI UX design”, and “AI automation”. Examine Sri Lanka and your chosen international market separately, using the same search type and category. Review 12 months for seasonality and five years for longer patterns. Inspect related queries before choosing an article topic.

Trends is sampled and normalized (0–100); it is not monthly search volume. A zero can mean insufficient data. No live Trends comparison was retrieved during this implementation, so no trend or demand claims are made. Use Search Console impressions and actual enquiries to refine this initial intent map after launch.

## Sustainable work without buying SEO

- Publish one substantial, original project explanation at a time: the problem, constraints, your implementation, screenshots, and what you learned. Label demos as demos. Use real outcomes only when measured and approved for publication.
- Expand articles with concrete examples from your own work. Useful starting topics: how to scope a customer portal, what changes an MVP estimate, or how to evaluate document automation. Do not fabricate experience, testimonials, clients, or dates.
- Add a real founder bio and professional profile links when the owner supplies approved details. Keep business identity and contact information consistent.
- Review Search Console weekly for crawl issues and relevant impressions. Improve pages that receive impressions but fail to explain the service clearly. Record genuine project enquiries alongside search clicks.
- Build relationships through relevant professional communities and useful work. Avoid paid links, bulk directory submissions, fake reviews, and mass-produced AI articles.

## AI search visibility

Readable HTML, clear answers, coherent business identity, useful original content, and crawlable internal links are the foundation. Robots.txt permits crawlers; it does not guarantee that any engine will index, cite, or recommend the site. No special llms.txt file or FAQ rich-result promise is used. Search visibility can support lead generation but cannot guarantee clients or income.

## Maintenance and validation

```sh
npm run build
npm run test:seo
node scripts/preview.mjs
```

When adding pages, update the route/content and the expected public-page count in `scripts/verify-seo.mjs`. Update `src/app/seo.ts` for new static-page metadata. The sitemap is derived from prerendered canonical links; do not maintain a second manual URL list. Only change `SITE_URL` when intentionally changing the production domain, then rebuild and verify redirects.

## Primary guidance consulted

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Google generative AI optimization guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Google Trends data FAQ](https://support.google.com/trends/answer/4365533)
- [Angular rendering and static output](https://angular.dev/guide/ssr)
- [Vercel project configuration](https://vercel.com/docs/project-configuration)
