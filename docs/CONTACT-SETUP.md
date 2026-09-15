# Direct enquiry delivery

The recipient is fixed server-side as info@emloxtech.com. No API key belongs in Angular code or the repository.

## Activate on the existing Vercel project

1. Create or use a Resend account. Choose its free plan; review current limits at https://resend.com/pricing. No paid plan is required by this implementation.
2. Verify a sending domain in Resend using its exact DNS records in Vercel DNS. A sending subdomain can keep mail configuration separate. Preserve existing mailbox MX records.
3. Create a sending API key. In Vercel project Settings → Environment Variables set `RESEND_API_KEY` and `CONTACT_FROM` (a sender on the verified domain, such as `EmloX Website <website@send.emloxtech.com>` only if that sending domain is verified). Store credentials directly in Vercel, not chat.
4. Redeploy. `/api/contact` should return `{ "available": true }` on GET. The review screen then offers Send enquiry. Without the configuration, the reviewed email/download flow remains usable.
5. Submit a real test through the production form and confirm receipt at info@emloxtech.com, including reply-to behavior. Provider acceptance is not proof of inbox delivery; inspect delivery events and spam filtering if needed.

## Behavior and protections

The Vercel Node function accepts same-origin JSON, validates bounded fields, rejects header line breaks and a honeypot, fixes the recipient, sends plain text, and uses idempotency keys for retries. It does not log form bodies or store them in a database. Sender credentials remain server-side. Errors preserve the brief and offer email fallback.

A per-instance ten-minute throttle reduces repeated submissions, but is not durable across serverless instances. Configure a host-level rate limit for POST `/api/contact` if available on the current plan; do not assume the in-memory throttle is a global quota. Review provider quotas and abuse controls before enabling public sending. Preview domains deliberately cannot POST to the production endpoint.

## Privacy and hosting

The website privacy notice describes Vercel, Resend, business correspondence, and email fallback. Owner should confirm actual mailbox retention and operational practices before launch; this is not a claim of legal compliance in every jurisdiction. Money Maker has its separate app privacy notice on Google Play.

Static pages stay prerendered. The enquiry API runs as a Vercel function. A static-only host must provide an equivalent API or retain email fallback.

The CSP currently allows inline scripts/styles because Angular prerendering emits inline styles and a stylesheet onload handler. It restricts resource origins, embedding, objects, and form destinations. A future hash/nonce build can tighten inline execution. It is not presented as full XSS protection.

## Verification

`node --test scripts/contact.test.mjs` tests validation, fixed recipient/reply-to, provider rejection, network errors, idempotency, and per-instance throttling with a mocked provider. It sends no real email.
