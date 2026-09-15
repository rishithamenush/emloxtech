# EmloX Tech: original project review and Angular rebuild

## Review scope

Source: `/Users/rishithamenusha/Downloads/emloxtec-main`.

The repository-wide inventory scanned 150 JavaScript, CSS, and SCSS files (27,938 lines), including 55 files with Lorem ipsum content and 11 form elements. `legacy-audit.json` records file sizes, placeholder matches, static links, and forms. Manual review focused on route composition, the active homepage components, shared navigation/footer, contact UI/API, authentication/newsletter forms, global styles, and build configuration. This is a source and UX review, not a penetration test or an exhaustive runtime test of every old demo page.

## Findings

| Priority | Finding | Source evidence | Effect |
| --- | --- | --- | --- |
| High | Contact delivery is not configured | `pages/api/contact.js` uses a placeholder SendGrid key and example recipient | Contact submissions cannot provide a reliable enquiry channel |
| High | Contact API has no method guard or server-side schema validation and interpolates submitted text into HTML | `pages/api/contact.js` | An eventual backend needs bounded inputs, escaping, abuse controls, and a verified sender with reply-to |
| High | Service dropdown generates routes that do not exist | `components/Layouts/ServicesDropdown.js`; `pages/services/` | Users can follow service links to a 404 |
| Medium | Navbar registers a new scroll listener after every render and never removes it | `components/Layouts/Navbar.js` effect has no dependency array or cleanup | Duplicated handlers and stale DOM references across navigation |
| Medium | Contact errors are only logged | `components/Contact/ContactForm.js`, catch branch | Users receive no visible recovery guidance when submission fails |
| Medium | Login and newsletter forms have no application submit handler | `components/Auth/LoginForm.js`, `components/Common/Newsletter.js` | Demo controls do not implement authentication or subscriptions |
| Medium | Legal and detail pages contain template copy | `components/PrivacyPolicy/PrivacyPolicyContent.js`, `components/TermsAndConditions/TermsAndConditionsContent.js`, `components/ServiceDetails/ServiceDetailsContent.js` | Content does not establish meaningful company-specific terms or product information |
| Medium | Branding is inconsistent | `package.json` names AzureRift; UI uses EmloX Tec; theme author metadata remains | Weak identity and confusing maintenance history |
| Medium | Contact links are malformed or inconsistent | Footer email lacks `mailto:`; displayed Sri Lankan phone links to a different international number | Clicking contact details does not match the visible destination |
| Medium | Several service and project cards share a generic detail destination | Active `HomeFour/Services.js` and `HomeFour/CaseStudies.js` | No specific story or useful next step for the selected item |
| Medium | Mobile navigation reports `aria-expanded="false"` regardless of state | `components/Layouts/Navbar.js` | Assistive technology gets the wrong state |
| Low | Five home variants, multiple service styles, and duplicate CSS/SCSS remain | Pages and components inventory | A broad template surface makes a small company website harder to maintain |
| Low | Production lint errors are ignored, image optimization is disabled | `next.config.js` | Build checks are weaker and media optimization requires deliberate handling |
| Low | Generic social destinations and unrelated template phone copy remain | Footer and newsletter | Users are directed away from company-specific contact channels |

## New implementation

- Angular 22 with standalone components, signals, typed content, and lazy-loaded interior pages.
- New EmloX wordmark, custom SVG ribbon artwork, ivory/charcoal/lime palette, locally bundled typefaces, editorial typography, and original CSS product illustrations.
- Responsive home, services, four service detail pages, work library, three concept details, about, insights, three complete articles, contact, and not-found handling.
- Work category filtering, accessible native FAQ disclosures, mobile navigation state, visible focus styles, skip navigation, reduced-motion support, and page titles.
- Project enquiry validation and a reviewable email brief with download and edit options. Email delivery occurs only when the visitor sends the draft in their email application.
- News, alternate about, and alternate contact paths redirect to their new equivalents.

## Content decisions

Applied the user-confirmed EmloX Tech name and retained the source contact information, with the telephone link corrected to match its displayed number. Business contact details should be confirmed by the owner before launch.

Replaced template stock case studies with three clearly labeled original concepts (Orbit, Forma, Signal). These are visual explorations, not customer deployments or measured business results. No unverified client logos, invented testimonials, staff identities, or performance statistics were published.

Consolidated offerings into product engineering, AI/data, brand/experience design, and cloud/connected systems. Demo login, pricing, newsletter, legal, and alternate home pages are not part of the rebuilt site. A live authentication system or mailing list was not present in the original implementation.

## Before public launch

- Confirm business details and service positioning.
- Supply approved client case studies, imagery, testimonials, and legal text if those pages are required.
- If direct form submission is desired, connect a server-side email provider with environment-based credentials, validated inputs, a verified sender, error handling, and abuse controls. Do not place mail credentials in Angular client code.
- Configure the hosting server to return `index.html` for application routes. For production search optimization, add prerendering/SSR and canonical/social metadata using the final domain.

The original Downloads project was not changed. The replacement lives in the EmloxTech workspace.
