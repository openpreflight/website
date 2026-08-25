# openpreflight website

The marketing site, published at **https://openpreflight.xyz**. Astro +
Tailwind v4, static output, one page.

Reference documentation is a separate site —
[openpreflight/docs](https://github.com/openpreflight/docs), at
docs.openpreflight.xyz. Keep the copy here to positioning and link out for
anything a reader would need to follow; instructions duplicated here would go
stale first.

## Local development

```bash
npm ci
npm run dev
```

## Structure

- `src/pages/index.astro` — the whole site. Sections in order: hero, what it is,
  how a run happens, gating, pipelines, where Coolify fits, quickstart, what it
  isn't, footer.
- `src/layouts/Layout.astro` — head, meta, OG tags.
- `src/styles/global.css` — one palette, light-first, dark values swapped under
  `prefers-color-scheme`. No client-side JavaScript.

## Editing the copy

The positioning text is lifted near-verbatim from the code repo's
[README](https://github.com/openpreflight/openpreflight/blob/main/README.md).
When that changes, change it here too — and prefer its phrasing over rewriting
it into marketing voice.

## Deployment

Cloudflare Pages. Root directory is the repository root, build command
`npm run build`, output `dist`.

MIT licensed.
