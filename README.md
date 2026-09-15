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

The form validates and prepares a project brief locally. Visitors review it, open their email app to send it, or download the text file. No request is sent to a backend and no form content is persisted. Configure a real server-side mail integration if direct submission is needed.

## Portfolio content

Orbit, Forma, and Signal are explicitly labeled illustrative concepts, not verified client work. Replace or extend them with approved case studies when available.

## Fonts

DM Sans and Manrope are bundled through Fontsource under their open font licenses. Serif accents use the system Georgia font. There are no runtime requests to Google Fonts.
