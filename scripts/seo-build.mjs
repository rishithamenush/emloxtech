import { readdir, readFile, writeFile, copyFile } from 'node:fs/promises';
import { join } from 'node:path';
const root = 'dist/emlox/browser';
const urls = [];
async function walk(directory) {
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const file = join(directory, item.name);
    if (item.isDirectory()) await walk(file);
    else if (item.name === 'index.html') {
      const html = await readFile(file, 'utf8');
      if (/name="robots" content="noindex/.test(html) || /http-equiv="refresh"/i.test(html))
        continue;
      const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
      if (!canonical) throw new Error(`Missing canonical: ${file}`);
      urls.push(canonical[1]);
    }
  }
}
await walk(root);
if (!urls.length) throw new Error('No indexable prerendered pages found');
const origins = new Set(urls.map((url) => new URL(url).origin));
if (origins.size !== 1) throw new Error('Mixed canonical domains');
const origin = [...origins][0];
await writeFile(
  join(root, 'sitemap.xml'),
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    [...new Set(urls)]
      .sort()
      .map((url) => `  <url><loc>${url.replaceAll('&', '&amp;')}</loc></url>`)
      .join('\n') +
    '\n</urlset>\n',
);
await writeFile(
  join(root, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`,
);
await copyFile(join(root, '404/index.html'), join(root, '404.html'));
console.log(`Generated sitemap for ${urls.length} pages, robots.txt, and static 404.html.`);
