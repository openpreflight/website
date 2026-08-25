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
  'design.md',
  'sitemap-index.xml',
];

const allowedExternalOrigins = [
  'https://openpreflight.xyz',
  'https://github.com/openpreflight/',
  'https://docs.openpreflight.xyz',
  'https://www.apache.org/licenses/LICENSE-2.0',
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

    if (
      href.startsWith('/_') ||
      href === '/' ||
      href.endsWith('.svg') ||
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

    const normalized = href.replace(/\/$/, '') || '';
    const candidates = [
      join(dist, href.replace(/^\//, ''), 'index.html'),
      join(dist, `${normalized.replace(/^\//, '')}.html`),
      join(dist, href.replace(/^\//, '')),
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

console.log(
  `OK: ${required.length} required paths present; no broken internal hrefs; external allow-list clean.`,
);
