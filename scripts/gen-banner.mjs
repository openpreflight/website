import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

// README banner — brand atoms from design.md: forest accent, olive ground,
// Inter display, JetBrains Mono for the Check Run panel (the hero artifact).
// Rendered through headless Chrome so the webfonts match the sites exactly;
// sharp/librsvg cannot load the woff2 files @fontsource ships.

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const WIDTH = 1280;
const HEIGHT = 400;
const SCALE = 2;

const CHROME =
  process.env.CHROME_PATH ??
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

function font(rel) {
  return readFileSync(join(root, 'node_modules', rel)).toString('base64');
}

const inter = font('@fontsource-variable/inter/files/inter-latin-wght-normal.woff2');
const mono400 = font('@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2');
const mono600 = font('@fontsource/jetbrains-mono/files/jetbrains-mono-latin-600-normal.woff2');

const THEMES = {
  light: {
    ground: '#f7f8f5',
    raised: '#ffffff',
    edge: '#dfe3dc',
    ink: '#1a1d19',
    inkMuted: '#5f665c',
    accent: '#2f6f4f',
    pass: '#2f6f4f',
    bloom: 'rgba(47, 111, 79, 0.13)',
    grid: 'rgba(95, 102, 92, 0.055)',
    panelShadow: '0 1px 0 rgba(26, 29, 25, 0.04), 0 18px 40px -28px rgba(26, 29, 25, 0.45)',
  },
  dark: {
    ground: '#121412',
    raised: '#1a1d1a',
    edge: '#2a2f2a',
    ink: '#e8ebe6',
    inkMuted: '#9aa39a',
    accent: '#7cc79c',
    pass: '#7cc79c',
    bloom: 'rgba(124, 199, 156, 0.11)',
    grid: 'rgba(154, 163, 154, 0.05)',
    panelShadow: '0 1px 0 rgba(0, 0, 0, 0.4), 0 18px 40px -28px #000000',
  },
};

// The mark: rounded square, runway-check, caret at the apex. Always on forest
// green with a white stroke — the mark does not invert between themes.
const MARK = `
<svg width="72" height="72" viewBox="0 0 32 32" fill="none" aria-hidden="true">
  <rect width="32" height="32" rx="7" fill="#2f6f4f"/>
  <path d="M8 16.5 L13.5 22 L21.5 12.5 H25.5" stroke="#ffffff" stroke-width="2.75"
        stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M20.25 9.25 L21.5 11.75 L22.75 9.25" stroke="#ffffff" stroke-width="2.25"
        stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const STEPS = [
  ['install', '8s'],
  ['test', '21s'],
  ['build', '13s'],
];

function html(t) {
  return `<!doctype html>
<meta charset="utf-8">
<style>
  @font-face {
    font-family: "Inter Variable";
    font-weight: 100 900;
    font-display: block;
    src: url(data:font/woff2;base64,${inter}) format("woff2");
  }
  @font-face {
    font-family: "JetBrains Mono";
    font-weight: 400;
    font-display: block;
    src: url(data:font/woff2;base64,${mono400}) format("woff2");
  }
  @font-face {
    font-family: "JetBrains Mono";
    font-weight: 600;
    font-display: block;
    src: url(data:font/woff2;base64,${mono600}) format("woff2");
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  html, body { width: ${WIDTH}px; height: ${HEIGHT}px; }

  body {
    display: flex;
    align-items: center;
    gap: 56px;
    padding: 0 72px;
    overflow: hidden;
    background:
      radial-gradient(120% 150% at 22% 8%, ${t.bloom} 0%, transparent 62%),
      linear-gradient(${t.grid} 1px, transparent 1px) 0 0 / 100% 40px,
      linear-gradient(90deg, ${t.grid} 1px, transparent 1px) 0 0 / 40px 100%,
      ${t.ground};
    color: ${t.ink};
    font-family: "Inter Variable", system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  .lede { width: 520px; flex: none; }

  .mark { line-height: 0; margin-bottom: 26px; }

  h1 {
    font-size: 62px;
    font-weight: 600;
    letter-spacing: -0.04em;
    line-height: 1;
  }

  .tagline {
    margin-top: 18px;
    font-size: 23px;
    font-weight: 400;
    line-height: 1.4;
    color: ${t.ink};
  }

  .meta {
    margin-top: 22px;
    font-family: "JetBrains Mono", ui-monospace, monospace;
    font-size: 13.5px;
    font-weight: 500;
    letter-spacing: -0.01em;
    color: ${t.inkMuted};
  }

  .panel {
    flex: 1;
    border: 1px solid ${t.edge};
    border-radius: 10px;
    background: ${t.raised};
    box-shadow: ${t.panelShadow};
    overflow: hidden;
  }

  .panel-head {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 11px 18px;
    border-bottom: 1px solid ${t.edge};
    font-family: "JetBrains Mono", ui-monospace, monospace;
    font-size: 12.5px;
    color: ${t.inkMuted};
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: ${t.pass};
  }

  .panel-body {
    padding: 22px 24px 24px;
    font-family: "JetBrains Mono", ui-monospace, monospace;
    font-size: 15px;
    line-height: 1.85;
  }

  .repo { color: ${t.inkMuted}; }

  .rule {
    margin: 6px 0 10px;
    border-top: 1px solid ${t.edge};
  }

  .step { display: flex; color: ${t.pass}; }
  .step .name { width: 106px; }
  .step .dur { color: ${t.inkMuted}; }

  .result {
    margin-top: 16px;
    font-weight: 600;
    color: ${t.ink};
  }
</style>

<div class="lede">
  <div class="mark">${MARK}</div>
  <h1>openpreflight</h1>
  <p class="tagline">A small CI provider for private repos.</p>
  <p class="meta">one Go binary · one SQLite file · one Check Run per commit</p>
</div>

<div class="panel">
  <div class="panel-head"><span class="dot"></span>Check run</div>
  <div class="panel-body">
    <div class="repo">openpreflight</div>
    <div class="rule"></div>
    ${STEPS.map(
      ([name, dur]) =>
        `<div class="step"><span>✓</span><span class="name">&nbsp;${name}</span><span class="dur">${dur}</span></div>`,
    ).join('\n    ')}
    <div class="result">Passed in 42s</div>
  </div>
</div>
`;
}

const work = mkdtempSync(join(tmpdir(), 'openpreflight-banner-'));
try {
  for (const [name, theme] of Object.entries(THEMES)) {
    const page = join(work, `${name}.html`);
    const shot = join(work, `${name}.png`);
    const out = join(root, 'public', `banner-${name}.png`);
    writeFileSync(page, html(theme));
    execFileSync(
      CHROME,
      [
        '--headless=new',
        '--disable-gpu',
        '--hide-scrollbars',
        '--default-background-color=00000000',
        `--force-device-scale-factor=${SCALE}`,
        `--window-size=${WIDTH},${HEIGHT}`,
        `--screenshot=${shot}`,
        `file://${page}`,
      ],
      { stdio: 'ignore' },
    );

    // Palette-quantise: the art is flat greens and hairlines, so 256 colours
    // hold it without visible banding at roughly a quarter of the bytes.
    const { size } = await sharp(shot)
      .png({ palette: true, colours: 256, effort: 10, compressionLevel: 9 })
      .toFile(out);
    console.log(
      `public/banner-${name}.png  ${WIDTH * SCALE}x${HEIGHT * SCALE}  ${Math.round(size / 1024)}KB`,
    );
  }
} finally {
  rmSync(work, { recursive: true, force: true });
}
