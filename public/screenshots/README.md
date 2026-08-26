# Screenshots

Four images, referenced by `src/components/templates/saas-landing-01.tsx` in the
`#screens` section. The alt text and captions on the site describe what each one
is meant to show; if a capture does not match its caption, change the caption
rather than shipping a mismatch.

The `.png` files in this directory are placeholders. Replace them in place —
the filenames are what the markup references.

## Capture settings

Same for all four, so the set reads as one sequence:

- **Viewport:** 1440 × 900, device pixel ratio 2 (export at 2880 × 1800).
- **Theme:** light. The site renders them inside a bordered frame that works in
  both themes; a light capture keeps the set consistent.
- **Browser chrome:** none. Capture the page, not the window — no URL bar, no
  tabs, no OS title bar.
- **Crop:** full viewport width. Trim vertically to the content, but keep the
  app's own top nav in frame so the four shots are recognisably the same app.
- **Format:** PNG. Run each through an optimiser before committing; the whole
  set should stay under about 1.5 MB.

## Redaction

These go on a public page. Before capturing:

- Use a throwaway GitHub App and a repo you do not mind naming.
- No real App ID, no real installation ID, no PEM, no webhook secret, no
  Coolify token, no session cookie in view.
- Redact by using fake data, not by drawing black boxes over real data.

## What each shot must show

### `wizard.png` — first-boot wizard

Route: `/setup` on a fresh instance with no admin user.

Must show: the admin password field and the public base URL field, both
visible, with the public base URL filled in with something plausible
(`https://ci.example.com`). This is the first screen a new user sees and the
point is that setup is two fields, not a config file.

Must not show: a filled-in password, even a fake one.

### `github-app.png` — GitHub App registration

Route: `/github-apps`, with the add or edit form open.

Must show: the slug, App ID, API URL, and check-name fields, and the generated
webhook URL (`{public base URL}/webhook/{slug}`) that the user pastes into
GitHub. The webhook URL is the whole reason this screen exists — make sure it
is legible and not cut off.

Must not show: PEM contents or a webhook secret. Both are redacted in the UI on
read, so an edit view of an already-saved App is the safe capture.

### `bindings.png` — bindings table

Route: `/repos`, with at least four repositories listed.

Must show: a mix of enabled and disabled bindings so the checkbox column reads
as an allow-list rather than a repo list. At least one row with a per-binding
override visible (a branch list or a custom check name) so the overrides are
discoverable.

Must not show: real private repository names.

### `run.png` — run detail with logs

Route: `/runs/{job-id}` for a finished job.

Must show: the step list with per-step outcomes and durations, and enough of
the log body that it is obviously a real build log and not a screenshot of a
summary. Prefer a **failed** run — a failing step with its error in the log is
more informative than a green one, and the site already shows a passing Check
Run panel elsewhere.

Must not show: tokens or secrets in log output.
