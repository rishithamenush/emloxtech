# EmloX Tech: free SEO launch and growth plan

## Implemented

- Canonical domain: https://www.emloxtech.com (confirmed by the owner).
- 16 indexable public pages prerendered as real HTML; browser hydration preserves navigation and interactions. Three older concept pages remain available with noindex and are excluded from the sitemap.
- Unique page titles, descriptions, canonical links, Open Graph and Twitter text metadata.
- Organization, WebSite, WebPage, Service, BlogPosting, ItemList, and breadcrumb JSON-LD where relevant.
- Service-specific project guidance, preparation notes, FAQs, and links to related articles.
- Visible article publisher attribution. Concepts remain explicitly identified as illustrative work.
- Sitemap and robots.txt generated from rendered pages on every production build.
- Static 404 page with noindex. Removed the catch-all homepage rewrite; existing legacy redirects are permanent in Vercel configuration.
- No paid SEO tools, tracking subscriptions, or request-time application server added.

## Required launch steps (not completed by this code change)

1. Deploy `npm run build` output from `dist/emlox/browser` to the existing hosting project. The changes are local until deployed. On Vercel use the included configuration. Other hosts must serve generated route directories and return `404.html` with status 404 for unknown URLs. Do not add an SPA catch-all rewrite.
2. Confirm HTTPS works and redirect the non-www hostname to https://www.emloxtech.com using the hosting domain settings. Canonical tags and a permanent apex-to-www redirect are implemented in vercel.json; both hostnames must be attached to the hosting project and the live redirect still needs verification.
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
| Home | AI solutions and custom software development | Workflow automation, websites and apps |
| Solutions | Practical AI solutions for businesses | AI assistants, document intelligence, business automation |
| Blog | AI, software and design guidance | Educational articles linked to relevant services |
| Product engineering | Web application and MVP development | Customer portals, internal tools, API integration |
| AI and data | AI automation services | Document processing, data engineering, bounded AI pilots |
| Experience design | UI/UX design and website redesign | Interface redesign, brand identity, design systems |
| Cloud and DevOps | Cloud and systems integration | Deployment pipelines, cloud migration, infrastructure assessment |

Avoid creating near-identical pages for many cities or stuffing every phrase into each heading. Add a dedicated offering page only when there is a distinct service and enough useful first-hand detail.

## Free Google Trends workflow

Open [Google Trends](https://trends.google.com/trends/). Compare a small group such as “web development”, “software development”, “UI UX design”, and “AI automation”. Examine your chosen international markets separately, using the same search type and category. Review 12 months for seasonality and five years for longer patterns. Inspect related queries before choosing an article topic.

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

## International client positioning update

Public pages and metadata now use location-neutral remote collaboration language. No overseas office, client history, or other location is implied. Service names focus on buyer needs: web applications and MVPs, AI automation, UI/UX design, and cloud integrations. Pricing uses a tailored project estimate; no public hourly rate has been set. Contact budget ranges are optional client planning preferences, not advertised service prices. Existing contact details remain available. The Solutions page describes capabilities and strategy. Older illustrative concept pages are not indexed. No client portfolio or customer outcomes are implied.

## September 16, 2026 implementation and validation

- Updated homepage, contact, and about metadata to match AI and custom software positioning.
- Added existing article cover images to Open Graph, Twitter, and BlogPosting markup; preserved the existing generic brand preview for other pages.
- Added article image descriptions, language, section, and word counts. No unverified publication dates, reviews, ratings, offices, or clients were invented.
- Added collection ItemList markup for the services and blog listings; updated breadcrumb terminology to Blog.
- Added related-article links and links back to Solutions.
- Added 768px image variants and responsive srcset/sizes. The three smaller covers total approximately 348 KB versus 1,182 KB for the originals (about 71% smaller); browsers select according to display size and device pixel ratio. This is not a measured Core Web Vitals improvement.
- Strengthened automated SEO checks for social images, schema, alt attributes, dimensions, local assets, canonical links, descriptions, and crawlable reachability.
- Production build passed. All 16 indexable pages passed checks; none are orphaned. Verified 22 local HTTP requests, including three invalid paths returning 404.
- Results: `docs/SEO-VERIFICATION.json`. Re-running the file checks regenerates the report; the HTTP results record this local verification run.
- Live site retrieval was unavailable through the research tool. No live deployment, Search Console verification, sitemap submission, live redirect validation, or field performance measurement is claimed.

### Account-dependent work remaining

Publish the tested build, verify the live redirects and page status codes, then complete the Search Console and Bing steps above. These require access to the real hosting and search accounts. Use real Search Console queries and enquiries to prioritize later content improvements. Rankings and indexing are controlled by search engines and cannot be guaranteed.

### Guidance reviewed for this update

- [Google developer SEO guide](https://developers.google.com/search/docs/fundamentals/get-started-developers)
- [Google article structured data](https://developers.google.com/search/docs/appearance/structured-data/article)
- [Vercel configuration](https://vercel.com/docs/project-configuration/vercel-json)
