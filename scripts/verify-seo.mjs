import assert from 'node:assert/strict';
import { readFile, access, writeFile } from 'node:fs/promises';
const root = 'dist/emlox/browser';
const sitemap = await readFile(`${root}/sitemap.xml`, 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
assert.equal(
  urls.length,
  16,
  'All 16 indexable pages must be in the sitemap; update this count when adding content',
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
  const image = html.match(/property="og:image" content="([^"]+)"/)?.[1];
  assert.ok(image?.startsWith('https://www.emloxtech.com/'), `Absolute social image: ${path}`);
  await access(root + new URL(image).pathname);
  assert.ok(
    html.includes(`name="twitter:image" content="${image}"`),
    `Matching sharing image: ${path}`,
  );
  assert.equal((html.match(/name="description"/g) || []).length, 1, path);
  assert.equal((html.match(/id="site-structured-data"/g) || []).length, 1, path);
  assert.ok(html.includes('<html lang="en"'), path);
  assert.ok(
    description.length >= 50 && description.length <= 200,
    `Useful description length: ${path}`,
  );
  assert.ok(title.length <= 85, `Concise title: ${path}`);
  for (const tag of html.matchAll(/<img\b[^>]*>/g)) {
    assert.ok(/\balt(?:=|\s|>)/.test(tag[0]), `Image alt attribute: ${path}`);
    assert.ok(/\bwidth="/.test(tag[0]) && /\bheight="/.test(tag[0]), `Image dimensions: ${path}`);
    const src = tag[0].match(/\bsrc="([^"]+)"/)?.[1];
    if (src && !/^(https?:|data:)/.test(src)) await access(`${root}/${src.replace(/^\//, '')}`);
    const srcset = tag[0].match(/\bsrcset="([^"]+)"/)?.[1];
    if (srcset)
      for (const candidate of srcset.split(',')) {
        await access(root + candidate.trim().split(/\s+/)[0]);
      }
  }
  const json = html.match(/<script[^>]*id="site-structured-data"[^>]*>([\s\S]*?)<\/script>/)?.[1];
  const data = JSON.parse(json);
  const graph = data['@graph'];
  const webpage = graph.find((item) => item['@id'] === url + '#webpage');
  assert.ok(webpage, `Stable page identity: ${path}`);
  const ids = graph.filter((item) => item['@id']).map((item) => item['@id']);
  assert.equal(ids.length, new Set(ids).size, `Unique entity identifiers: ${path}`);
  if (webpage.mainEntity) {
    assert.ok(ids.includes(webpage.mainEntity['@id']), `Main entity exists: ${path}`);
  }
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
      data['@graph'].some((item) => item['@type'] === 'BlogPosting'),
      path,
    );
  if (path.startsWith('/insights/')) {
    const post = data['@graph'].find((item) => item['@type'] === 'BlogPosting');
    assert.equal(post.image, image, `Article image matches social preview: ${path}`);
    assert.ok(post.author.name && post.author.url && post.articleBody, path);
    assert.ok(image.includes('/blog/'), `Article-specific image: ${path}`);
    assert.equal(webpage.mainEntity['@id'], post['@id']);
    assert.ok(post.about?.[0]?.name, `Article has a descriptive topic: ${path}`);
    assert.notEqual(post.about[0].name, 'EmloX Tech', `Article is about its topic: ${path}`);
    assert.ok(post.mentions.length > 0, `Supporting article concepts: ${path}`);
    const visibleText = html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '')
      .replace(/<[^>]+>/g, ' ');
    assert.ok(
      visibleText.includes(post.about[0].name) ||
        post.articleBody.toLowerCase().includes(post.about[0].name.toLowerCase()),
      `Topic is supported by content: ${path}`,
    );
    assert.ok(post.wordCount > 250, `Substantive article guidance: ${path}`);
    assert.ok(
      post.articleBody.includes('Example:') || post.articleBody.includes('example:'),
      `Practical example: ${path}`,
    );
  }
  if (path !== '/') {
    const crumbs = data['@graph'].find((item) => item['@type'] === 'BreadcrumbList');
    assert.ok(crumbs, `Breadcrumbs: ${path}`);
    assert.equal(crumbs.itemListElement.at(-1).item, url);
    assert.equal(webpage.breadcrumb['@id'], crumbs['@id']);
  }
  for (const match of html.matchAll(/href="(\/[^"?#]*)(?:[?#][^"]*)?"/g)) {
    const href = match[1];
    if (href === '/' || href.includes('.')) continue;
    await access(`${root}${href}/index.html`);
  }
}
const missing = await readFile(`${root}/404.html`, 'utf8');
assert.ok(missing.includes('noindex, follow'));
assert.ok(missing.includes('PAGE NOT FOUND'));
assert.ok(
  !missing.includes('rel="canonical"'),
  'Error pages do not canonicalize to an indexable page',
);
assert.ok(!urls.some((url) => url.endsWith('/404')));
const robots = await readFile(`${root}/robots.txt`, 'utf8');
assert.ok(robots.includes('Sitemap: https://www.emloxtech.com/sitemap.xml'));
const hosting = JSON.parse(await readFile('vercel.json', 'utf8'));
assert.ok(!hosting.rewrites, 'Do not rewrite unknown URLs to a 200 homepage');
for (const [source, destination] of [
  ['/news', '/insights'],
  ['/contact-2', '/contact'],
  ['/about-2', '/about'],
]) {
  assert.ok(
    hosting.redirects.some(
      (rule) => rule.source === source && rule.destination === destination && rule.permanent,
    ),
  );
}
assert.ok(
  hosting.redirects.some(
    (rule) =>
      rule.has?.some(
        (condition) => condition.type === 'host' && condition.value === 'emloxtech.com',
      ) && rule.destination === 'https://www.emloxtech.com/:path*',
  ),
);
for (const slug of ['orbit', 'forma', 'signal']) {
  const html = await readFile(`${root}/work/${slug}/index.html`, 'utf8');
  assert.ok(html.includes('noindex, follow'));
  assert.ok(!urls.some((url) => url.endsWith('/work/' + slug)));
}
// Every indexable page must be reachable through crawlable links, starting at home.
const visited = new Set();
const queue = ['https://www.emloxtech.com/'];
while (queue.length) {
  const current = queue.shift();
  if (visited.has(current)) continue;
  visited.add(current);
  const pathname = new URL(current).pathname;
  const html = await readFile(`${root}${pathname === '/' ? '' : pathname}/index.html`, 'utf8');
  for (const match of html.matchAll(/href="([^"#]+)"/g)) {
    const target = new URL(match[1].replaceAll('&amp;', '&'), current);
    target.hash = '';
    target.search = '';
    if (urls.includes(target.href) && !visited.has(target.href)) queue.push(target.href);
  }
}
assert.equal(visited.size, urls.length, 'No orphaned indexable pages');
await writeFile(
  'docs/SEO-VERIFICATION.json',
  JSON.stringify(
    {
      checkedAt: new Date().toISOString(),
      scope: 'Local production output; not a live ranking or Core Web Vitals measurement',
      indexablePages: urls.length,
      excludedConcepts: 3,
      checks: [
        'prerendered headings',
        'unique metadata',
        'canonical URLs',
        'social previews',
        'JSON-LD',
        'image assets and dimensions',
        'responsive image variants',
        'crawlable reachability',
        'sitemap',
        'robots',
        '404 output',
        'redirect configuration',
      ],
      urls,
    },
    null,
    2,
  ) + '\n',
);
console.log(
  `PASS: ${urls.length} prerendered pages, unique metadata, JSON-LD, internal links, sitemap, robots, and 404 output.`,
);
