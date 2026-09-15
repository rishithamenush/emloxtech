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
