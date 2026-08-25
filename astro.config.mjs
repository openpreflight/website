import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Static marketing site for openpreflight. The reference documentation is a
// separate site (openpreflight/docs) at docs.openpreflight.xyz — keep the copy
// here to positioning, and link out for anything a reader would need to follow.
export default defineConfig({
  site: 'https://openpreflight.xyz',
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
});
