# Contributing

This repo is the marketing site at [openpreflight.xyz](https://openpreflight.xyz):
one Astro page, a Tailwind theme, and a small set of generated brand assets.
Product docs live in [openpreflight/docs](https://github.com/openpreflight/docs);
the tool itself lives in
[openpreflight/openpreflight](https://github.com/openpreflight/openpreflight).

## Dev loop

```bash
pnpm install
pnpm run dev            # local preview
pnpm run build          # static output in dist/
pnpm run check-links    # required paths + internal hrefs + external allow-list
```

`check-links` runs against `dist/`, so build first. It fails on a missing
required asset or an external link outside the allow-list in
`scripts/check-links.mjs`. If you add an outbound domain, add it there too.

## Brand assets

`design.md` is the brand spec and is deliberately **not** served.
`public/favicon.svg` is the canonical mark; raster assets are generated:

```bash
pnpm run brand
pnpm run check-brand
```

Favicon, Open Graph, and README banner generation all use Sharp. Available
sibling docs and operator worktrees are synchronized; commit regenerated
assets with source changes.

## What we will take

- Copy fixes, accessibility fixes, and broken-link fixes.
- Content that matches what the tool actually does today.

## What we will not take

- New pages or sections without a reason to exist. The site is one page on purpose.
- Product claims that are not backed by the docs.

## Pull requests

- One concern per PR.
- `pnpm run build && pnpm run check-links` clean before you open it.
- Security-sensitive reports go through
  [openpreflight/openpreflight SECURITY.md](https://github.com/openpreflight/openpreflight/blob/main/SECURITY.md),
  not a public issue.
