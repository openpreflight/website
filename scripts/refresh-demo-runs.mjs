#!/usr/bin/env node
/**
 * Rewrite src/data/demo-runs.json from public GitHub Checks on openpreflight/demo.
 *
 * Never calls the demo instance. UI uses prUrl always; runUrl is optional.
 * If a Check Run cannot be resolved, prUrl stays and runUrl is cleared — never
 * invent a /runs/ URL that would 404.
 *
 * Usage (from website/):
 *   npm run refresh-demo-runs
 *
 * Optional: GITHUB_TOKEN for a higher API rate limit. Unauthenticated works
 * on a public repo.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = join(root, "src", "data", "demo-runs.json");
const OWNER = "openpreflight";
const REPO = "demo";
const CHECK_NAME = /openpreflight/i;
const RUN_PATH = /\/runs\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "";

/** @param {string} path */
async function gh(path) {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "openpreflight-refresh-demo-runs",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`https://api.github.com${path}`, { headers });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub ${res.status} ${path}: ${body.slice(0, 400)}`);
  }
  return res.json();
}

/** @param {unknown} url */
function shareableRunUrl(url) {
  if (typeof url !== "string" || !url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return null;
    if (!RUN_PATH.test(parsed.pathname)) return null;
    return parsed.href;
  } catch {
    return null;
  }
}

/**
 * @param {Array<{ name?: string, details_url?: string, completed_at?: string | null, started_at?: string | null }>} checks
 */
function pickCheck(checks) {
  const named = checks.filter((c) => CHECK_NAME.test(c.name ?? ""));
  const pool = named.length ? named : checks;
  return [...pool].sort((a, b) => {
    const ta = Date.parse(a.completed_at || a.started_at || 0);
    const tb = Date.parse(b.completed_at || b.started_at || 0);
    return tb - ta;
  })[0];
}

const data = JSON.parse(readFileSync(dataPath, "utf8"));
if (!data?.runs?.length) {
  console.error("demo-runs.json has no runs[]");
  process.exit(1);
}

let pulls;
try {
  pulls = await gh(`/repos/${OWNER}/${REPO}/pulls?state=open&per_page=100`);
} catch (err) {
  console.error(
    "Could not list PRs; leaving demo-runs.json unchanged.\n",
    err instanceof Error ? err.message : err,
  );
  process.exit(1);
}

if (!Array.isArray(pulls)) {
  console.error("Unexpected pulls payload; leaving demo-runs.json unchanged.");
  process.exit(1);
}

/** @type {Map<string, { html_url: string, sha: string }>} */
const byBranch = new Map();
for (const pr of pulls) {
  const ref = pr.head?.ref;
  const sha = pr.head?.sha;
  if (typeof ref === "string" && typeof sha === "string" && pr.html_url) {
    byBranch.set(ref, { html_url: pr.html_url, sha });
  }
}

let resolved = 0;
let missingRun = 0;

for (const run of data.runs) {
  const pr = byBranch.get(run.branch);
  if (pr) {
    run.prUrl = pr.html_url;
  }
  // Always keep a GitHub link even if the PR is gone.
  if (!run.prUrl) {
    run.prUrl = `https://github.com/${OWNER}/${REPO}`;
  }

  if (!pr) {
    run.runUrl = null;
    missingRun += 1;
    continue;
  }

  try {
    const payload = await gh(
      `/repos/${OWNER}/${REPO}/commits/${pr.sha}/check-runs`,
    );
    const check = pickCheck(payload.check_runs ?? []);
    const url = shareableRunUrl(check?.details_url);
    run.runUrl = url;
    if (url) resolved += 1;
    else missingRun += 1;
  } catch (err) {
    console.error(
      `check-runs failed for ${run.branch}; clearing runUrl.\n`,
      err instanceof Error ? err.message : err,
    );
    run.runUrl = null;
    missingRun += 1;
  }
}

data.updatedAt = new Date().toISOString();
writeFileSync(dataPath, `${JSON.stringify(data, null, 2)}\n`);
console.log(
  `wrote ${dataPath}: ${resolved} runUrl(s), ${missingRun} without a shareable log (prUrl kept).`,
);
