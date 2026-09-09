import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const mark = readFileSync(join(root, 'public/favicon.svg'), 'utf8').replace(
  '<svg ',
  '<svg x="64" y="72" width="56" height="56" ',
);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f7f8f5"/>
  <rect width="12" height="630" fill="#2f6f4f"/>
  ${mark}
  <text x="140" y="112" fill="#1a1d19" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="40" font-weight="600">openpreflight</text>
  <text x="64" y="220" fill="#1a1d19" font-family="ui-sans-serif, system-ui, sans-serif" font-size="52" font-weight="600">A small CI provider for private repos.</text>
  <rect x="64" y="280" width="520" height="260" rx="12" fill="#ffffff" stroke="#dfe3dc" stroke-width="2"/>
  <text x="96" y="334" fill="#2f6f4f" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="24">openpreflight</text>
  <path d="M96 362 H312" stroke="#8a8a84" stroke-width="2"/>
  <text x="96" y="405" fill="#2f6f4f" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="22">✓ install 8s</text>
  <text x="96" y="440" fill="#2f6f4f" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="22">✓ test 21s</text>
  <text x="96" y="475" fill="#2f6f4f" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="22">✓ build 13s</text>
  <text x="96" y="515" fill="#1a1d19" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="22">Passed in 42s</text>
</svg>`;

const png = await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9 })
  .toBuffer();

writeFileSync(join(root, 'public/og.png'), png);

const docsPublic = join(root, '../docs/public');
if (existsSync(docsPublic)) {
  writeFileSync(join(docsPublic, 'og.png'), png);
}

console.log('Static Open Graph image generated.');
