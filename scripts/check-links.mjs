#!/usr/bin/env node
/**
 * Fail CI if expected website routes/assets are missing from dist/, if built
 * HTML links to an internal path that was not emitted, or if an off-site href
 * is outside the known-good origin allow-list.
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

const required = [
  'index.html',
  '404.html',
  'product/index.html',
  'why/index.html',
  'self-hosted/index.html',
  'security/index.html',
  'open-source/index.html',
  'use-cases/index.html',
  'use-cases/private-repos/index.html',
  'use-cases/self-hosted-teams/index.html',
  'use-cases/open-source/index.html',
  'concepts/index.html',
  'integrations/index.html',
  'integrations/github-app/index.html',
  'pipeline/index.html',
  'compare/github-actions/index.html',
  'favicon.svg',
  'favicon.ico',
  'favicon-32.png',
  'apple-touch-icon.png',
  'og.png',
  // Embedded by the READMEs in openpreflight/, docs/, and this repo.
  'banner-light.png',
  'banner-dark.png',
  'robots.txt',
  'llms.txt',
  'index.md',
  'sitemap-index.xml',
  'site.webmanifest',
  'og/product.png',
  'og/use-cases/private-repos.png',
];

const allowedExternalOrigins = [
  'https://openpreflight.xyz',
  'https://github.com/openpreflight/',
  'https://docs.openpreflight.xyz',
  'https://www.apache.org/licenses/LICENSE-2.0',
  'https://www.producthunt.com/',
  'https://api.producthunt.com/',
];

const missing = required.filter((p) => !existsSync(join(dist, p)));
if (missing.length) {
  console.error('Missing required dist paths:');
  for (const p of missing) console.error(`  - ${p}`);
  process.exit(1);
}

/** @param {string} dir */
function* walkHtml(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) yield* walkHtml(full);
    else if (name.endsWith('.html')) yield full;
  }
}

const broken = [];
const disallowedExternal = [];

for (const file of walkHtml(dist)) {
  const html = readFileSync(file, 'utf8');
  const rel = file.replace(dist + '/', '');

  const hrefs = [...html.matchAll(/\bhref="([^"]+)"/g)].map((m) => m[1]);
  for (const href of hrefs) {
    if (
      href.startsWith('data:') ||
      href.startsWith('mailto:') ||
      href.startsWith('#')
    ) {
      continue;
    }

    if (href.startsWith('http://') || href.startsWith('https://')) {
      if (!allowedExternalOrigins.some((o) => href === o || href.startsWith(o))) {
        disallowedExternal.push(`${rel} → ${href}`);
      }
      continue;
    }

    if (!href.startsWith('/')) continue;
    if (href.startsWith('//')) continue;

    const pathOnly = href.split('#')[0] || '/';
    if (
      pathOnly.startsWith('/_') ||
      pathOnly === '/' ||
      pathOnly === '' ||
      pathOnly.endsWith('.svg') ||
      href.endsWith('.png') ||
      href.endsWith('.ico') ||
      href.endsWith('.xml') ||
      href.endsWith('.txt') ||
      href.endsWith('.css') ||
      href.endsWith('.js') ||
      href.endsWith('.woff2') ||
      href.endsWith('.woff')
    ) {
      continue;
    }

    const normalized = pathOnly.replace(/\/$/, '') || '';
    const candidates = [
      join(dist, pathOnly.replace(/^\//, ''), 'index.html'),
      join(dist, `${normalized.replace(/^\//, '')}.html`),
      join(dist, pathOnly.replace(/^\//, '')),
    ];
    if (!candidates.some((c) => existsSync(c))) {
      broken.push(`${rel} → ${href}`);
    }
  }
}

if (disallowedExternal.length) {
  console.error('External hrefs outside the allow-list:');
  for (const b of [...new Set(disallowedExternal)].slice(0, 50)) console.error(`  - ${b}`);
  process.exit(1);
}

if (broken.length) {
  console.error('Broken internal links:');
  for (const b of [...new Set(broken)].slice(0, 50)) console.error(`  - ${b}`);
  if (broken.length > 50) console.error(`  … and ${broken.length - 50} more`);
  process.exit(1);
}

const home = readFileSync(join(dist, 'index.html'), 'utf8');
if (!home.includes('https://www.producthunt.com/products/openpreflight')) {
  console.error('Home is missing the Product Hunt badge link.');
  process.exit(1);
}
if (!home.includes('"@type":"Organization"')) {
  console.error('Home is missing Organization JSON-LD.');
  process.exit(1);
}
if (!home.includes('rel="manifest"')) {
  console.error('Home is missing the web app manifest link.');
  process.exit(1);
}

const notFound = readFileSync(join(dist, '404.html'), 'utf8');
if (!notFound.includes('noindex, follow')) {
  console.error('404.html is missing noindex, follow.');
  process.exit(1);
}

const sitemap = readFileSync(join(dist, 'sitemap-0.xml'), 'utf8');
if (!sitemap.includes('<lastmod>')) {
  console.error('sitemap-0.xml is missing lastmod dates.');
  process.exit(1);
}

const robots = readFileSync(join(dist, 'robots.txt'), 'utf8');
if (!robots.includes('User-agent: ChatGPT-User') || !robots.includes('User-agent: GPTBot')) {
  console.error('robots.txt is missing ChatGPT-User allow / GPTBot disallow.');
  process.exit(1);
}

const product = readFileSync(join(dist, 'product/index.html'), 'utf8');
if (!product.includes('"@type":"BreadcrumbList"')) {
  console.error('Product page is missing BreadcrumbList JSON-LD.');
  process.exit(1);
}
if (!product.includes('/og/product.png')) {
  console.error('Product page is missing its unique og:image.');
  process.exit(1);
}

console.log(
  `OK: ${required.length} required paths present; no broken internal hrefs; external allow-list clean.`,
);
