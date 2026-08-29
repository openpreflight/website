# openpreflight

A small CI provider for private repos.

Self-hosted. One Go binary and one SQLite file. Register a GitHub App you own, enable your repos, and every commit gets a Check Run with full logs on your server.

- Site: https://openpreflight.xyz
- Docs: https://docs.openpreflight.xyz
- Source: https://github.com/openpreflight/openpreflight
- License: Apache-2.0

## What it is

The UI, JSON API, webhook receiver, and job runner all live in a single Go binary, so there is no message broker and no separate frontend to deploy. State is one SQLite file, with secret columns AES-256-GCM encrypted at rest.

Configuration happens in the web UI: register GitHub Apps, bind repos, and mint tokens without a fresh block of env vars for every installation.

## How a run works

1. GitHub POSTs `/webhook/{slug}`. openpreflight verifies the HMAC, checks that the binding is enabled and the branch is allowed, then answers 202 within ten seconds.
2. The worker mints an installation token, opens a Check Run, fetches the exact commit, detaches the checkout, and strips the remote before any step runs.
3. Pipeline steps run in-process, or via `docker run` when `runtime:` is set. The Check Run carries a truncated log tail, and the full log stays on the details page.

## Live demo

Six pull requests on [openpreflight/demo](https://github.com/openpreflight/demo) produce real Check Runs on a self-hosted instance (not GitHub Actions). The log pages are the same `/runs/{id}` pages you get behind auth; shareable logs are on for that binding only.

Outcomes: passing, failing test, failing build, timeout, skipped, container runtime. Links to individual run pages can 404 after log retention prunes a job — the site falls back to the pull request.

See https://openpreflight.xyz/#demo

## Not in v1

- GitHub Actions YAML
- `actions/runner`
- Creating GitHub Apps for you
- Matrices, caches, or artifacts

## Start here

- [Product](https://openpreflight.xyz/product/)
- [Quickstart](https://docs.openpreflight.xyz/start/quickstart/)
- [Configuration](https://docs.openpreflight.xyz/start/configuration/)
- [Register a GitHub App](https://docs.openpreflight.xyz/setup/github-app/)
- [llms.txt](https://openpreflight.xyz/llms.txt): curated index for agents
