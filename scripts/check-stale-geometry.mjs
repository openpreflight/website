#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const websiteRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const workspaceRoot = join(websiteRoot, '..');
const patterns = ['M8 16\\.5', 'M20\\.25 9\\.25', 'runway-check'];
const paths = [
  join(websiteRoot, 'src'),
  join(websiteRoot, 'scripts'),
  join(websiteRoot, 'public/favicon.svg'),
  join(workspaceRoot, 'docs/src'),
  join(workspaceRoot, 'docs/public/favicon.svg'),
  join(workspaceRoot, 'openpreflight/internal'),
].filter(existsSync);

const hits = [];
for (const pattern of patterns) {
  try {
    const out = execFileSync(
      'rg',
      ['-n', '--glob', '!**/CHANGELOG.md', '--glob', '!**/check-stale-geometry.mjs', pattern, ...paths],
      { encoding: 'utf8' },
    );
    if (out.trim()) hits.push(`${pattern}\n${out.trim()}`);
  } catch (err) {
    if (err.status !== 1) throw err;
  }
}

if (hits.length) {
  console.error('Stale logo geometry still present:\n');
  console.error(hits.join('\n\n'));
  process.exit(1);
}

console.log('OK: no stale runway-check geometry in active sources.');
