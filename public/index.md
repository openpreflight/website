# openpreflight

Self-hosted CI without the CI platform.

Every commit gets a native GitHub Check Run, written by a GitHub App you own. There is no workflow engine and no runner fleet to operate: one Go binary and one SQLite file on a server you already run, with the full logs served from your own host.

- Site: https://openpreflight.xyz
- Docs: https://docs.openpreflight.xyz
- Source: https://github.com/openpreflight/openpreflight
- License: Apache-2.0
- Release: https://github.com/openpreflight/openpreflight/releases/tag/v2.1.0 (v2.1.0, 5 September 2026)

## What it is

The UI, JSON API, webhook receiver, and job runner all live in a single Go binary, so there is no message broker and no separate frontend to deploy. State is one SQLite file, with secret columns AES-256-GCM encrypted at rest.

Configuration happens in the web UI: register GitHub Apps, bind repos, and mint tokens without a fresh block of env vars for every installation.

## The gating model

A GitHub event names an immutable SHA, that SHA gets one logical run, and that run gets one Check Run. One repository plus one commit plus one pipeline is always one logical check.

Two things follow, and they are why a system this small can be trusted with a required check:

- **Force-push correctness is free.** A run binds to a commit, never to a branch, so nothing is ever attached to a moving reference. The old commit keeps its own check, where it is now irrelevant, and there is nothing to cancel.
- **A required check never hangs.** When a path filter matches nothing, the check still completes, with a `skipped` conclusion. Branch protection always gets an answer.

## Privacy boundary

GitHub has to reach the webhook, so the worker needs a public HTTPS URL. That part is not private. What stays yours is everything the run touches: builds, source, secrets and logs never leave infrastructure you control.

## How a run works

1. GitHub POSTs `/webhook/{slug}`. openpreflight verifies the HMAC, checks that the binding is enabled and the branch is allowed, then answers 202 within ten seconds.
2. The worker mints an installation token, opens a Check Run, fetches the exact commit, detaches the checkout, and strips the remote before any step runs.
3. Pipeline steps run in-process, or via `docker run` when `runtime:` is set. The Check Run carries a truncated log tail, and the full log stays on the details page.

## Out of scope

None of these exists, and none of them is planned:

- GitHub Actions YAML
- `actions/runner`
- Matrices, caches, or artifacts

## Start here

- [Product](https://openpreflight.xyz/product/)
- [Quickstart](https://docs.openpreflight.xyz/getting-started/quickstart/)
- [Configuration](https://docs.openpreflight.xyz/configure/configuration/)
- [Register a GitHub App](https://docs.openpreflight.xyz/configure/github-app/)
- [llms.txt](https://openpreflight.xyz/llms.txt): curated index for agents
