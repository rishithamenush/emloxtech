import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';

// Read-only production checks. Does not submit URLs to any search engine.
const origin = 'https://www.emloxtech.com';
const results = [];
async function inspect(url) {
  const response = await fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(20000) });
  const body = await response.text();
  const result = {
    url,
    status: response.status,
    location: response.headers.get('location'),
    xRobotsTag: response.headers.get('x-robots-tag'),
    canonical: body.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1],
    robots: body.match(/<meta[^>]*name="robots"[^>]*content="([^"]+)"/)?.[1],
    title: body.match(/<title>(.*?)<\/title>/)?.[1],
  };
  results.push(result);
  return { result, body };
}
const failures = [];
async function check(label, run) {
  try {
    await run();
  } catch (error) {
    failures.push({ label, message: error.message });
  }
}
await check('Live sitemap and public pages', async () => {
  const { result, body } = await inspect(origin + '/sitemap.xml');
  assert.equal(result.status, 200);
  const urls = [...body.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  assert.ok(urls.length > 0, 'Sitemap must contain URLs');
  assert.equal(new Set(urls).size, urls.length, 'Duplicate sitemap URLs');
  for (const url of urls)
    await check(url, async () => {
      assert.equal(new URL(url).origin, origin, 'Unexpected canonical origin');
      const { result: page, body: html } = await inspect(url);
      assert.equal(page.status, 200, 'Sitemap URL must return 200 without a redirect');
      assert.equal(page.canonical, url, 'Self-referencing canonical');
      assert.ok(
        !/noindex|\bnone\b/i.test([page.robots, page.xRobotsTag].join(' ')),
        'Unexpected noindex',
      );
      assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, 'Prerendered main heading');
      assert.ok(page.title, 'Missing title');
    });
});
await check('robots.txt', async () => {
  const { result, body } = await inspect(origin + '/robots.txt');
  assert.equal(result.status, 200);
  assert.ok(body.includes(`Sitemap: ${origin}/sitemap.xml`));
  assert.ok(!/^Disallow:\s*\/\s*$/im.test(body), 'Site-wide crawl block');
});
for (const [source, target] of [
  ['/news', '/insights'],
  ['/contact-2', '/contact'],
  ['/about-2', '/about'],
]) {
  await check(source, async () => {
    const { result } = await inspect(origin + source);
    assert.ok([301, 308].includes(result.status), 'Permanent legacy redirect');
    assert.equal(new URL(result.location, origin).href, origin + target);
  });
}
await check('Canonical host redirect', async () => {
  const { result } = await inspect('https://emloxtech.com/');
  assert.ok([301, 308].includes(result.status));
  assert.equal(result.location, origin + '/');
});
for (const path of [
  '/seo-audit-missing-page',
  '/services/not-a-service',
  '/insights/not-an-article',
]) {
  await check(path, async () => {
    const { result } = await inspect(origin + path);
    assert.equal(result.status, 404, 'Unknown URLs must return a real 404');
  });
}
for (const slug of ['orbit', 'forma', 'signal']) {
  await check(`/work/${slug}`, async () => {
    const { result } = await inspect(`${origin}/work/${slug}`);
    assert.equal(result.status, 200);
    assert.ok(/noindex/.test(result.robots), 'Illustrative concepts intentionally excluded');
  });
}
await writeFile(
  'docs/LIVE-SEO-AUDIT.json',
  JSON.stringify(
    {
      checkedAt: new Date().toISOString(),
      scope:
        'Public HTTP responses only; not Google indexing status or a Search Console URL export',
      results,
      failures,
    },
    null,
    2,
  ) + '\n',
);
console.log(`${results.length} live URLs checked; ${failures.length} failures.`);
if (failures.length) {
  console.error(failures);
  process.exitCode = 1;
}
