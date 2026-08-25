# openpreflight

A small CI provider for private GitHub repos.

Self-hosted. One Go binary, one SQLite file. Register a GitHub App you own, enable your repos, and get **one Check Run per commit** with full logs on your server.

- Site: https://openpreflight.xyz
- Docs: https://docs.openpreflight.xyz
- Source: https://github.com/openpreflight/openpreflight
- License: Apache-2.0

## What it is

- **One process** — UI, JSON API, webhook receiver, and job runner in a single Go binary. No broker, no separate frontend.
- **One file of state** — SQLite, with secret columns AES-256-GCM encrypted at rest.
- **Configured in a UI** — register GitHub Apps, bind repos, mint tokens without a pile of env vars for every installation.

## How a run works

1. GitHub POSTs `/webhook/{slug}`. HMAC is verified; an enabled binding and allowed branch are required. Returns 202 within ten seconds.
2. The worker mints an installation token, opens a Check Run, fetches the exact commit, detaches it, and strips the remote before any step runs.
3. Pipeline steps run in-process or via `docker run` when `runtime:` is set. The Check Run gets a truncated log tail; the full log stays on the details page.

## Not in v1

- GitHub Actions YAML
- `actions/runner`
- Creating GitHub Apps for you
- Matrices, caches, or artifacts

## Start here

- [Quickstart](https://docs.openpreflight.xyz/start/quickstart/)
- [Configuration](https://docs.openpreflight.xyz/start/configuration/)
- [Register a GitHub App](https://docs.openpreflight.xyz/setup/github-app/)
- [llms.txt](https://openpreflight.xyz/llms.txt) — curated index for agents
