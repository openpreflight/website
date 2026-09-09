import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const WIDTH = 1280;
const HEIGHT = 400;
const SCALE = 2;
const canonicalMark = readFileSync(
  join(root, 'public/favicon.svg'),
  'utf8',
).replace(
  '<svg ',
  '<svg x="72" y="60" width="72" height="72" aria-hidden="true" ',
);

const themes = {
  light: {
    ground: '#f7f8f5',
    raised: '#ffffff',
    edge: '#dfe3dc',
    ink: '#1a1d19',
    muted: '#5f665c',
    accent: '#2f6f4f',
    grid: '#e8ebe6',
  },
  dark: {
    ground: '#121412',
    raised: '#1a1d1a',
    edge: '#2a2f2a',
    ink: '#e8ebe6',
    muted: '#9aa39a',
    accent: '#7cc79c',
    grid: '#1f231f',
  },
};

function banner(theme) {
  const t = theme;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0 H0 V40" fill="none" stroke="${t.grid}" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${t.ground}"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#grid)"/>
  ${canonicalMark}

  <text x="72" y="194" fill="${t.ink}" font-family="Inter, Arial, sans-serif" font-size="50" font-weight="650" letter-spacing="-2">openpreflight</text>
  <text x="72" y="238" fill="${t.ink}" font-family="Inter, Arial, sans-serif" font-size="23">Self-hosted CI without the CI platform.</text>
  <text x="72" y="280" fill="${t.muted}" font-family="JetBrains Mono, Menlo, monospace" font-size="13">one Go binary · one SQLite file · one Check Run per commit</text>

  <rect x="650" y="56" width="558" height="208" rx="12" fill="${t.raised}" stroke="${t.edge}"/>
  <path d="M650 90 H1208" stroke="${t.edge}"/>
  <circle cx="674" cy="73" r="4" fill="${t.accent}"/>
  <text x="690" y="78" fill="${t.muted}" font-family="JetBrains Mono, Menlo, monospace" font-size="12">Check run</text>
  <text x="674" y="123" fill="${t.muted}" font-family="JetBrains Mono, Menlo, monospace" font-size="14">openpreflight</text>
  <path d="M674 136 H1184" stroke="${t.edge}"/>
  <text x="674" y="164" fill="${t.accent}" font-family="JetBrains Mono, Menlo, monospace" font-size="14">✓ install</text>
  <text x="790" y="164" fill="${t.muted}" font-family="JetBrains Mono, Menlo, monospace" font-size="14">8s</text>
  <text x="674" y="188" fill="${t.accent}" font-family="JetBrains Mono, Menlo, monospace" font-size="14">✓ test</text>
  <text x="790" y="188" fill="${t.muted}" font-family="JetBrains Mono, Menlo, monospace" font-size="14">21s</text>
  <text x="674" y="212" fill="${t.accent}" font-family="JetBrains Mono, Menlo, monospace" font-size="14">✓ build</text>
  <text x="790" y="212" fill="${t.muted}" font-family="JetBrains Mono, Menlo, monospace" font-size="14">13s</text>
  <text x="674" y="242" fill="${t.ink}" font-family="JetBrains Mono, Menlo, monospace" font-size="14" font-weight="600">Passed in 42s</text>
</svg>`;
}

for (const [name, theme] of Object.entries(themes)) {
  const out = join(root, 'public', `banner-${name}.png`);
  const { size } = await sharp(Buffer.from(banner(theme)))
    .resize(WIDTH * SCALE, HEIGHT * SCALE)
    .png({ palette: true, colours: 256, effort: 10, compressionLevel: 9 })
    .toFile(out);
  console.log(
    `public/banner-${name}.png  ${WIDTH * SCALE}x${HEIGHT * SCALE}  ${Math.round(size / 1024)}KB`,
  );
}
