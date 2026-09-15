# EmloX Tech — Angular rebrand

A complete redesigned company website using Angular 22 standalone components.

## Run

```sh
npm ci
npm start
```

Open http://localhost:4200. The current local preview uses http://127.0.0.1:4200.

## Production build

```sh
npm run build
```

Output: `dist/emlox/browser`. Every public route is prerendered to HTML at build time, then hydrated for browser interactions. Host the generated directories as static pages and serve `404.html` with HTTP 404 for unknown URLs. Do not configure a catch-all homepage rewrite. Vercel routing is included in `vercel.json`. No application server is required.

The build also generates `sitemap.xml` and `robots.txt` from the rendered canonical URLs. Run `npm run test:seo` after building. For a local production preview run `node scripts/preview.mjs` and open http://127.0.0.1:4300.

SEO configuration: `src/app/seo.ts`. Canonical origin: `https://www.emloxtech.com`. See `docs/SEO-LAUNCH.md` for free launch and measurement steps.

Use a Node version supported by Angular 22. This project was built and checked with Node 26.8.1 and npm 11.19.0. See the official compatibility table: https://angular.dev/reference/versions.

## Main files

- `src/app/content.ts`: service, concept, article, and FAQ content.
- `src/app/home.*`: homepage.
- `src/app/pages.*`: service, work, about, and editorial pages.
- `src/app/contact.*`: validated project enquiry and email brief review.
- `src/app/app.routes.ts`: routes, redirects, and page titles.
- `src/app/hero-art.ts`, `src/app/project-art.ts`: original SVG/CSS artwork.
- `src/styles.css`: responsive visual system and motion preferences.
- `docs/PROJECT-REVIEW.md`: review of the previous site, migration decisions, launch needs.
- `docs/VERIFICATION.md`: build and browser checks.

## Contact behavior

The visitor reviews a brief before sending. With `RESEND_API_KEY` and `CONTACT_FROM` configured in Vercel, `api/contact.js` sends it to info@emloxtech.com through Resend. Without that configuration, the email-app/download flow remains available. See `docs/CONTACT-SETUP.md` for activation, provider limits, and verification. Never commit credentials. Run `node --test scripts/contact.test.mjs` for mocked API tests.

## Portfolio content

Money Maker: Budget & Expense is featured as a published EmloX Android product, linked to its verified Google Play listing. Orbit, Forma, and Signal remain explicitly labeled illustrative concepts. No testimonials or client results are invented.

## Sharing and privacy

The site includes a 1200×630 social image, page-specific share metadata, a website privacy notice, and Vercel security headers. A contact API is the only request-time backend; page HTML is static. Confirm operational privacy practices and test real inbox delivery after setup.

## Fonts

DM Sans and Manrope are bundled through Fontsource under their open font licenses. Serif accents use the system Georgia font. There are no runtime requests to Google Fonts.
