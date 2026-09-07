import { existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const pagesDir = fileURLToPath(new URL('./src/pages', import.meta.url));

function pageSource(pathname) {
  const trimmed = pathname.replace(/\/$/, '');
  const rel = trimmed === '' ? 'index' : trimmed.replace(/^\//, '');
  return [
    join(pagesDir, `${rel}.astro`),
    join(pagesDir, rel, 'index.astro'),
  ].find((candidate) => existsSync(candidate));
}

// Static marketing site for openpreflight. The reference documentation is a
// separate site (openpreflight/docs) at docs.openpreflight.xyz. Keep the copy
// here to positioning, and link out for anything a reader would need to follow.
export default defineConfig({
  site: 'https://openpreflight.xyz',
  integrations: [
    react(),
    sitemap({
      serialize(item) {
        const file = pageSource(new URL(item.url).pathname);
        if (file) item.lastmod = statSync(file).mtime.toISOString();
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
});
