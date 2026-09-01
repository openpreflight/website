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

`design.md` is the brand spec and is deliberately **not** served. The favicons
and the README banner are generated, not hand-edited:

```bash
node scripts/gen-icons.mjs    # favicon set + og.png
node scripts/gen-banner.mjs   # banner-light.png + banner-dark.png
```

Both render through headless Chrome, so the output depends on locally installed
fonts. Commit the regenerated PNGs. The banner pair is embedded by the READMEs
of all three repos, so do not rename or remove those files.

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
