# SEO and indexing review — September 21, 2026

## Verified findings

The public HTTP audit checked 28 URLs with zero failures before these changes were deployed. All 16 sitemap URLs returned HTTP 200, had self-referencing canonical URLs, and had no noindex directive in the HTML robots tag or X-Robots-Tag header. The sitemap and robots.txt were accessible. This verifies crawl prerequisites, not Google's decision to index a page.

The supplied Search Console screenshot reports 13 indexed pages and 13 not indexed: three redirects, two noindex URLs, one 404, and seven discovered but not indexed. The screenshot does not identify those URLs. The live results cannot be mapped to those rows until the report examples are supplied or account access is available.

| Reason | Confirmed live behavior | Correct action |
| --- | --- | --- |
| Page with redirect | `/news` → `/insights`, `/about-2` → `/about`, `/contact-2` → `/contact` are permanent redirects. The apex hostname redirects to www. | Keep intentional migrations. Google should index the final destination, not the redirect source. Match report URLs before changing anything. |
| Excluded by noindex | `/work/orbit`, `/work/forma`, `/work/signal` are illustrative concepts intentionally excluded from the sitemap and indexing. | Keep their exclusions. If the report names a service or article instead, inspect its current response and Google's last crawl. |
| Not found (404) | Unknown URLs and invalid service/article slugs return genuine 404 responses. | Restore accidentally deleted content or redirect to a genuinely equivalent replacement. Keep 404 for nonexistent content. Do not redirect every unknown URL to the homepage. |
| Discovered — currently not indexed | All current sitemap pages are accessible and linked in local production output. | Inspect the seven actual URLs, request a live test for important pages, and improve useful content and discovery. A 200 response does not guarantee indexing. |

## Implemented in this update

- Connected page, organization, service, article, application, and breadcrumb nodes with stable identifiers and relevant mainEntity relationships.
- Added article-specific about and mentions values and service-specific page topics. These describe visible content, not a promise of Knowledge Graph inclusion.
- Connected Money Maker to its existing Google Play listing with sameAs. No business social accounts, personal author credentials, Wikipedia identities, client results, or dates were invented.
- Expanded three articles with direct answers, practical examples clearly labeled as illustrative, evaluation guidance, checklists, and links to the related service.
- Added a visible publisher explanation to About. Existing organizational authorship is retained; a real personal author can be added when approved bio details and profile URLs are supplied.
- Removed canonical tags from error pages while retaining noindex and real HTTP 404 handling.
- Added reusable live HTTP checks with `npm run audit:seo:live` and stronger entity/content checks in `npm run test:seo`.

## Verification and release

Production build passed: 23 prerendered routes, 16 indexable sitemap pages. All local SEO checks passed. The restricted build process aborted; the same production build succeeded outside the restriction. The public live audit describes the previous deployed version, not this new local build.

The existing GitHub-to-Vercel Production deployment was identified. The currently authenticated GitHub account has read-only access to `rishithamenush/emloxtech` (`push: false`). No changes have been pushed or deployed. Publish through an account with repository write permission or the existing Vercel project.

After deployment:

1. Run `npm run audit:seo:live`. Confirm the updated article answers and JSON-LD are present on production as well as checking HTTP status codes.
2. In the Search Console domain property, open each exclusion report and export its affected URLs. Compare each example with the policy above; do not try to make every exclusion disappear.
3. Confirm the submitted sitemap is `https://www.emloxtech.com/sitemap.xml` and is successfully read. Resubmit it if missing or failed.
4. Use URL Inspection → Test live URL for the homepage and priority service/article pages. Request indexing for eligible updated pages. Google controls processing time and inclusion.
5. Use Validate fix only for accidental exclusions that have actually been corrected. Intentional redirects, noindex concepts, and valid 404s can remain reported.
6. Track relevant search queries, clicks, landing pages, and genuine enquiries. Compare results over time; do not promise a ranking, traffic level, or AI citation.

## Primary references

- [Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google: HTTP status codes and crawling](https://developers.google.com/crawling/docs/troubleshooting/http-status-codes)
- [Google: helpful, reliable content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Schema.org: sameAs identity](https://schema.org/sameAs)
