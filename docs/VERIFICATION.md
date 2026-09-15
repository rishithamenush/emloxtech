# Verification

## Build

- Angular production compilation passed with strict TypeScript/template checking.
- Final compilation produced 296.90 kB of initial JavaScript/CSS (81.29 kB estimated transfer), plus locally bundled font files.
- Production output: `dist/emlox/browser`.

## Browser checks

Tested using the Codex in-app browser against the running Angular development server.

- Visually inspected desktop and 390px mobile homepage, including the original SVG hero.
- Visually inspected mobile service listing and navigation.
- Tested mobile menu expansion, navigation, and automatic close on route changes.
- Tested work filtering: selecting Design shows only Forma.
- Tested empty enquiry submission: required name, email, service, and message errors render.
- Tested valid enquiry: review contains entered name, email, selected service, and message; email link contains the encoded brief.
- Confirmed no email was sent during testing.
- Tested FAQ expansion with the answer visibly displayed.
- Visited all four service details, work listing and three concept details, about, insights and three articles, contact, and the unknown-page view at 390px. All rendered an expected heading without horizontal document overflow.
- Checked home, contact, and work at 320px, 768px, and 1440px: no horizontal document overflow.
- Browser error logs were empty during route smoke checks.

## Limits

These checks are targeted build, responsive, and interaction checks. They do not constitute a full accessibility certification, cross-browser/device lab, load test, or mail-delivery test. Email-client behavior depends on the visitor's configured application. The original project was reviewed from source; its old demos were not all executed.

## SEO update — 2026-09-15

- Production build passed: 20 prerendered routes (16 public pages, three legacy redirects, one 404 route).
- Initial browser bundle: 349.45 kB raw / 96.40 kB estimated transfer, within configured budget.
- `npm run test:seo` passed for all 16 indexable pages: one H1, unique title and description, canonical, social metadata, JSON-LD, internal links, sitemap, robots.txt, and noindex 404 output.
- Production browser preview: homepage and direct service page render; client navigation updates title/canonical and retains exactly one structured-data script.
- Service FAQ opens; service enquiry link preselects the requested service. Contact canonical excludes the query string.
- Invalid service URL renders a missing-page message with noindex and no business structured-data script after hydration.
- No browser console errors observed in the checked flows. Service-page appearance inspected at the default browser viewport.
- `git diff --check` passed.
- Live deployment, real HTTP status/redirect behavior on Vercel, DNS, Search Console ownership, actual index coverage, Google Trends demand, and live Core Web Vitals were not verified. See SEO-LAUNCH.md.

## Live deployment check — 2026-09-15

Verified https://www.emloxtech.com after the owner deployed. All 16 sitemap pages return HTTP 200 with unique titles/descriptions, matching www canonical URLs, index/follow directives, one H1, and parseable JSON-LD in the initial HTML. robots.txt returns 200 and permits crawling with the correct sitemap URL. Two nonexistent paths return real HTTP 404 and noindex. All three legacy redirects return 308 to their intended pages. Both HTTP and the non-www HTTPS homepage redirect with 308 to https://www.emloxtech.com/. Details: `LIVE-SEO-AUDIT.json`. Search Console index coverage, ranking, rich-result eligibility, and live performance scores remain unverified.
