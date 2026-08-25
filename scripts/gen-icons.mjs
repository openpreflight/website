import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const svgPath = join(root, 'public/favicon.svg');
const svg = readFileSync(svgPath);

async function png(size, out) {
  await sharp(svg).resize(size, size).png().toFile(out);
}

const websitePublic = join(root, 'public');
const docsPublic = join(root, '../docs/public');

await png(32, join(websitePublic, 'favicon-32.png'));
await png(180, join(websitePublic, 'apple-touch-icon.png'));
await png(32, join(docsPublic, 'favicon-32.png'));
await png(180, join(docsPublic, 'apple-touch-icon.png'));

// Multi-size ICO: 16 + 32 + 48 as PNG frames (browsers accept PNG-in-ICO).
const sizes = [16, 32, 48];
const pngBuffers = await Promise.all(
  sizes.map((s) => sharp(svg).resize(s, s).png().toBuffer()),
);

function buildIco(buffers, dims) {
  const count = buffers.length;
  const headerSize = 6 + count * 16;
  let offset = headerSize;
  const entries = [];
  for (let i = 0; i < count; i++) {
    const w = dims[i] >= 256 ? 0 : dims[i];
    const h = w;
    const size = buffers[i].length;
    const entry = Buffer.alloc(16);
    entry.writeUInt8(w, 0);
    entry.writeUInt8(h, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(size, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += size;
  }
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);
  return Buffer.concat([header, ...entries, ...buffers]);
}

const ico = buildIco(pngBuffers, sizes);
writeFileSync(join(websitePublic, 'favicon.ico'), ico);
writeFileSync(join(docsPublic, 'favicon.ico'), ico);

// Docs SVG + logos (mark only)
writeFileSync(join(docsPublic, 'favicon.svg'), svg);
writeFileSync(join(root, '../docs/src/assets/logo-light.svg'), svg);
writeFileSync(join(root, '../docs/src/assets/logo-dark.svg'), svg);

console.log('Icons written for website/ and docs/');
