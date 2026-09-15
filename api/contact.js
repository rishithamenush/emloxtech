import { createHash } from 'node:crypto';

// Best-effort per-instance throttle. Configure a host-level rate limit for durable protection.
const attempts = new Map();
const allowedOrigins = new Set(['https://www.emloxtech.com', 'https://emloxtech.com']);
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const reply = (status, data) => res.status(status).json(data);
  const configured = Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FROM);
  if (req.method === 'GET') return reply(200, { available: configured });
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return reply(405, { error: 'Method not allowed.' });
  }
  if (!allowedOrigins.has(req.headers.origin))
    return reply(403, { error: 'Please submit from our website.' });
  if (!req.headers['content-type']?.startsWith('application/json'))
    return reply(415, { error: 'Expected JSON.' });
  if (Number(req.headers['content-length']) > 12000)
    return reply(413, { error: 'Message is too large.' });
  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return reply(400, { error: 'Invalid message.' });
  }
  if (!body || Array.isArray(body) || typeof body !== 'object')
    return reply(400, { error: 'Invalid message.' });
  if (JSON.stringify(body).length > 12000) return reply(413, { error: 'Message is too large.' });
  if (body.website) return reply(400, { error: 'Unable to accept this message.' });
  const rules = {
    name: [2, 100],
    email: [3, 160],
    company: [0, 160],
    service: [1, 120],
    budget: [0, 80],
    message: [20, 2000],
  };
  const fields = {};
  for (const [key, [min, max]] of Object.entries(rules)) {
    if (typeof body[key] !== 'string') return reply(400, { error: `Please check ${key}.` });
    fields[key] = body[key].trim();
    if (
      fields[key].length < min ||
      fields[key].length > max ||
      (key !== 'message' && /[\r\n\x00]/.test(fields[key]))
    )
      return reply(400, { error: `Please check ${key}.` });
  }
  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email) ||
    !/^[a-f0-9-]{36}$/i.test(body.requestId || '')
  )
    return reply(400, { error: 'Please check your email and try again.' });
  if (!configured)
    return reply(503, {
      error: 'Direct delivery is unavailable. Please use the email option below.',
    });
  const now = Date.now();
  for (const [key, value] of attempts) if (now - value.start > 600000) attempts.delete(key);
  const ip = createHash('sha256')
    .update(String(req.headers['x-forwarded-for'] || 'unknown'))
    .digest('hex');
  const limit = attempts.get(ip) || { start: now, count: 0 };
  if (limit.count >= 5 || attempts.size > 10000) {
    res.setHeader('Retry-After', '600');
    return reply(429, { error: 'Too many attempts. Please try later or email us directly.' });
  }
  limit.count++;
  attempts.set(ip, limit);
  const text = Object.entries(fields)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n\n');
  try {
    const upstream = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      signal: AbortSignal.timeout(12000),
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': body.requestId,
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM,
        to: ['info@emloxtech.com'],
        reply_to: fields.email,
        subject: `Project enquiry: ${fields.service}`,
        text,
      }),
    });
    if (!upstream.ok)
      return reply(502, {
        error: 'Delivery could not be confirmed. Retry or use the email option below.',
      });
    const result = await upstream.json();
    if (!result.id) return reply(502, { error: 'Delivery could not be confirmed. Please retry.' });
    return reply(200, { ok: true });
  } catch {
    return reply(502, {
      error: 'Delivery could not be confirmed. Retry or use the email option below.',
    });
  }
}
