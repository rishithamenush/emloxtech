import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
const root = 'dist/emlox/browser';
const sitemap = await readFile(`${root}/sitemap.xml`, 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
assert.equal(
  urls.length,
  16,
  'All 16 public pages must be in the sitemap; update this count when adding content',
);
assert.equal(new Set(urls).size, urls.length);
const titles = new Set();
const descriptions = new Set();
for (const url of urls) {
  const path = new URL(url).pathname;
  const html = await readFile(`${root}${path === '/' ? '' : path}/index.html`, 'utf8');
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `One visible main heading: ${path}`);
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1, `Single canonical: ${path}`);
  assert.ok(html.includes(`rel="canonical" href="${url}"`), path);
  assert.ok(!html.includes('noindex'), path);
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  assert.ok(title && !titles.has(title), `Unique title: ${path}`);
  titles.add(title);
  const description = html.match(/name="description" content="([^"]+)"/)?.[1];
  assert.ok(description && !descriptions.has(description), `Unique description: ${path}`);
  descriptions.add(description);
  assert.ok(html.includes('property="og:url"'), path);
  assert.ok(html.includes('name="twitter:card"'), path);
  const json = html.match(/<script[^>]*id="site-structured-data"[^>]*>([\s\S]*?)<\/script>/)?.[1];
  const data = JSON.parse(json);
  assert.ok(
    data['@graph'].some((item) => item['@type'] === 'Organization'),
    path,
  );
  if (path.startsWith('/services/'))
    assert.ok(
      data['@graph'].some((item) => item['@type'] === 'Service'),
      path,
    );
  if (path.startsWith('/insights/'))
    assert.ok(
      data['@graph'].some((item) => item['@type'] === 'Article'),
      path,
    );
  for (const match of html.matchAll(/href="(\/[^"?#]*)(?:[?#][^"]*)?"/g)) {
    const href = match[1];
    if (href === '/' || href.includes('.')) continue;
    await access(`${root}${href}/index.html`);
  }
}
const missing = await readFile(`${root}/404.html`, 'utf8');
assert.ok(missing.includes('noindex, follow'));
assert.ok(missing.includes('PAGE NOT FOUND'));
assert.ok(!urls.some((url) => url.endsWith('/404')));
const robots = await readFile(`${root}/robots.txt`, 'utf8');
assert.ok(robots.includes('Sitemap: https://www.emloxtech.com/sitemap.xml'));
const hosting = JSON.parse(await readFile('vercel.json', 'utf8'));
assert.ok(!hosting.rewrites, 'Do not rewrite unknown URLs to a 200 homepage');
assert.equal(hosting.redirects.length, 3);
console.log(
  `PASS: ${urls.length} prerendered pages, unique metadata, JSON-LD, internal links, sitemap, robots, and 404 output.`,
);
