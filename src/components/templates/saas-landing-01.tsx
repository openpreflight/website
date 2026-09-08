import {
  Activity,
  ArrowRight,
  Box,
  Check,
  Database,
  FolderGit,
  KeyRound,
  LayoutDashboard,
  PanelLeft,
  Server,
  Settings,
  ShieldCheck,
  Sun,
  Terminal,
  Workflow,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DOCS, RELEASE, VERSION } from "@/lib/site";
const checkSteps = [
  { name: "install", command: "npm ci", duration: "8s", width: "19%" },
  { name: "test", command: "go test ./...", duration: "21s", width: "50%" },
  { name: "build", command: "go build ./...", duration: "13s", width: "31%" },
];

const pillars = [
  {
    icon: Box,
    title: "One process",
    description:
      "UI, JSON API, webhook receiver, and job runner in a single Go binary. There is no message broker to operate and no separate frontend to deploy.",
  },
  {
    icon: Database,
    title: "One file of state",
    description:
      "State lives in one SQLite file, and every secret column is AES-256-GCM encrypted at rest. Apps and bindings are rows in that database.",
  },
  {
    icon: ShieldCheck,
    title: "Configured in a UI",
    description:
      "Register GitHub Apps, bind repos, and mint tokens from the web UI. You do not need a fresh block of env vars for every installation.",
  },
];

const runSteps = [
  {
    title: "Webhook validates and enqueues",
    detail:
      "GitHub POSTs /webhook/{slug}. openpreflight verifies the HMAC, checks that the binding is enabled and the branch is allowed, then answers 202 within ten seconds.",
  },
  {
    title: "Worker opens a Check Run",
    detail:
      "The worker mints an installation token and creates the Check Run. It then fetches the exact commit, detaches the checkout, and strips the remote before any step runs.",
  },
  {
    title: "Pipeline runs under a timeout",
    detail:
      "Steps run in-process, or via docker run when runtime: is set. The Check Run carries a truncated log tail, and the full log stays on the details page.",
  },
];

const outOfScope = [
  "GitHub Actions YAML",
  "actions/runner",
  "Matrices",
  "Caches",
  "Artifacts",
];

const jobsPreview = [
  ["running", "acme/api", "refs/heads/main · 3e004c8b", "138m46s", "23h ago"],
  ["passed", "acme/api", "refs/heads/release/2.2 · 7f55a534", "5m24s", "23h ago"],
  ["failed", "acme/web", "refs/heads/main · 2e02ad12", "4m02s", "23h ago"],
  ["passed", "acme/worker", "refs/heads/main · 2a44cc5d", "1m23s", "23h ago"],
  ["passed", "acme/api", "refs/heads/main · 917e9213", "2m36s", "1d ago"],
  ["skipped", "acme/web", "refs/heads/release/2.2 · 5e1d058f", "5m51s", "1d ago"],
  ["error", "acme/worker", "refs/heads/main · b0c8c08c", "4m25s", "1d ago"],
  ["cancelled", "acme/api", "refs/heads/main · 4621cbaf", "6m01s", "1d ago"],
  ["passed", "acme/web", "refs/heads/main · b3a1473e", "6m13s", "1d ago"],
  ["failed", "acme/worker", "refs/heads/release/2.2 · a9195c61", "4m18s", "1d ago"],
] as const;

const statusClass: Record<string, string> = {
  passed: "bg-[#7cc79c] text-[#102018]",
  failed: "border border-[#e0857b]/25 bg-[#e0857b]/10 text-[#e0857b]",
  error: "border border-[#e0857b]/25 bg-[#e0857b]/10 text-[#e0857b]",
  running: "bg-white/[.07] text-[#e8ebe6]",
  skipped: "text-white/55",
  cancelled: "text-white/55",
};

function SaasLandingContent() {
  return (
    <>
        <section
          className="hero relative overflow-hidden px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-20"
          id="top"
        >
          <div aria-hidden="true" className="hero-atmosphere pointer-events-none absolute inset-0 -z-10" />
          <div className="mx-auto w-full max-w-7xl">
            <div className="hero-copy mx-auto max-w-4xl text-center">
              <p className="hero-kicker font-mono text-sm font-medium tracking-wide text-primary">
                v{VERSION} is out
              </p>
              <h1 className="mt-5 text-balance text-[2.75rem] font-semibold leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-[4.75rem]">
                Self-hosted CI without the{" "}
                <span className="text-primary">CI platform.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                Every commit gets a native GitHub Check Run, written by a
                GitHub App you own. There is no workflow engine and no runner
                fleet to operate: one Go binary and one SQLite file on a
                server you already run.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild size="lg" variant="signature">
                  <a href={`${DOCS}/getting-started/quickstart/`}>
                    Quickstart <ArrowRight />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="#how">
                    See how it works <ArrowRight />
                  </a>
                </Button>
              </div>
              <p className="mt-5 font-mono text-xs text-muted-foreground">
                <a
                  className="underline underline-offset-4 hover:text-foreground"
                  href={RELEASE}
                >
                  Download v{VERSION} Linux binaries
                </a>
              </p>
            </div>

            <figure className="hero-panel relative mx-auto mt-14 w-full max-w-5xl sm:mt-16">
              <div aria-hidden="true" className="hero-panel-glow pointer-events-none absolute -inset-10 -z-10" />
              <div className="overflow-hidden rounded-2xl border border-[#2a2f2a] bg-[#121412] text-left text-[#e8ebe6] shadow-[0_40px_100px_-60px_color-mix(in_srgb,var(--primary)_55%,transparent)]">
                <div className="flex h-11 items-center gap-2.5 border-b border-white/10 bg-white/[0.03] px-4 sm:px-6 lg:px-8">
                  <span
                    aria-hidden="true"
                    className="size-2 shrink-0 rounded-full bg-[#7cc79c]"
                  />
                  <span className="truncate font-mono text-xs text-white/50">
                    Check Run · pull request
                  </span>
                </div>

                <figcaption className="sr-only">
                  Example Check Run: three steps passed on a private pull request
                  in 42 seconds
                </figcaption>

                <div className="border-b border-white/10 px-4 py-4 sm:px-6 lg:px-8">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-white/55">
                    <span className="text-[#e8ebe6]">private/api</span>
                    <span className="text-white/25">·</span>
                    <span>#142</span>
                    <span className="text-white/25">·</span>
                    <span>c7e4a91</span>
                    <span className="text-white/25">·</span>
                    <span className="truncate">main ← fix/hmac-skew</span>
                  </div>
                  <div className="hero-line mt-3 flex items-center justify-between gap-3 rounded-xl border border-[#7cc79c]/22 bg-[#7cc79c]/10 px-3.5 py-2.5">
                    <div className="flex items-center gap-2.5">
                      <span className="grid size-5 place-items-center rounded-full bg-[#7cc79c] text-[#102018]">
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                      <span className="font-mono text-sm font-medium text-[#7cc79c]">
                        Passed
                      </span>
                    </div>
                    <span className="font-mono text-xs text-[#9ad4b4]">42s</span>
                  </div>
                </div>

                <ul className="divide-y divide-white/[0.06] px-2 py-1 sm:px-3 lg:grid lg:grid-cols-3 lg:divide-x lg:divide-y-0 lg:px-0 lg:py-0">
                  {checkSteps.map((step, i) => (
                    <li
                      className="hero-line flex items-center gap-3 px-2 py-3 sm:gap-4 sm:px-2.5 lg:px-8 lg:py-5"
                      key={step.name}
                      style={{ animationDelay: `${220 + i * 90}ms` }}
                    >
                      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#7cc79c]/15 text-[#7cc79c]">
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-3">
                          <span className="font-mono text-sm text-[#e8ebe6]">
                            {step.name}
                          </span>
                          <span className="shrink-0 font-mono text-xs text-white/40">
                            {step.duration}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center gap-3">
                          <code className="min-w-0 truncate font-mono text-[0.7rem] text-white/35">
                            {step.command}
                          </code>
                          <span
                            aria-hidden="true"
                            className="ml-auto hidden h-1 w-16 overflow-hidden rounded-full bg-white/10 sm:block sm:w-24 lg:w-full lg:max-w-28"
                          >
                            <span
                              className="block h-full rounded-full bg-[#7cc79c]/70"
                              style={{ width: step.width }}
                            />
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-white/10 px-4 py-3 sm:px-6 lg:px-8">
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[#7cc79c]">
                    View full logs
                    <ArrowRight className="size-3.5" />
                  </span>
                </div>
              </div>
            </figure>
          </div>
        </section>

        <section className="bg-muted/25 px-5 py-24 sm:px-8 sm:py-32" id="comparison">
          <div className="mx-auto w-full max-w-7xl">
            <h2 className="text-balance text-4xl font-semibold tracking-[-.05em] sm:text-5xl">
              Which CI layer do you need?
            </h2>
            <p className="mt-5 max-w-2xl text-muted-foreground">
              Both approaches put a Check Run on the same private repository.
              The difference is how much orchestration you need.
            </p>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <article className="rounded-[1.75rem] border border-foreground/10 p-6 sm:p-8">
                <p className="font-mono text-xs text-muted-foreground">Orchestration</p>
                <h3 className="mt-3 text-xl font-semibold tracking-[-.03em]">
                  Actions-only private CI
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Workflow YAML, hosted or self-hosted <code className="font-mono text-xs">actions/runner</code>,
                  matrices and caches if you need them. This is the right answer
                  when you want that orchestration layer.
                </p>
              </article>
              <article className="rounded-[1.75rem] border border-foreground/10 p-6 sm:p-8">
                <p className="font-mono text-xs text-muted-foreground">Just the check</p>
                <h3 className="mt-3 text-xl font-semibold tracking-[-.03em]">
                  Worker you host + Check Run
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  One binary, SQLite, a GitHub App you register, and{" "}
                  <code className="font-mono text-xs">.ci.yml</code>. Logs stay
                  on your disk. It does not try to be one config that spans
                  GitLab and Jenkins.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section
          className="bg-foreground px-5 py-24 text-background sm:px-8 sm:py-32"
          id="how"
        >
          <div className="mx-auto w-full max-w-7xl">
            <Badge
              className="border-background/15 bg-background/10 text-background"
              variant="outline"
            >
              <Terminal className="size-3.5" /> How a run happens
            </Badge>
            <div className="mt-7 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <h2 className="max-w-3xl text-balance text-4xl font-semibold tracking-[-.05em] sm:text-5xl">
                From webhook to Check Run
              </h2>
              <p className="max-w-sm text-sm leading-relaxed text-background/60">
                The webhook has ten seconds to answer, so it validates and
                enqueues while the worker does the slow part. Only one run is
                ever live for a given commit.
              </p>
            </div>
            <ol className="mt-14 grid gap-4 lg:grid-cols-3">
              {runSteps.map((step, index) => (
                <li
                  className="flex min-h-56 flex-col rounded-[1.75rem] border border-background/12 bg-background/[.055] p-6 sm:p-8"
                  key={step.title}
                >
                  <span className="font-mono text-xs text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-6 text-xl font-semibold tracking-[-.03em]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-background/60">
                    {step.detail}
                  </p>
                </li>
              ))}
            </ol>
            <Button
              asChild
              className="mt-10 border-background/20 bg-transparent text-background hover:bg-background/10"
              variant="outline"
            >
              <a href="/product/">
                Gating and run details <ArrowRight />
              </a>
            </Button>
          </div>
        </section>

        <section
          className="px-5 py-24 sm:px-8 sm:py-32"
          data-slot="feature-section"
          id="product"
        >
          <div className="mx-auto w-full max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
              <div>
                <Badge variant="secondary">
                  <Box className="size-3.5" /> The smallest useful version
                </Badge>
                <h2 className="mt-6 text-balance text-4xl font-semibold tracking-[-.05em] sm:text-5xl">
                  Where it fits, and where it doesn&apos;t
                </h2>
              </div>
              <div className="lg:pt-14">
                <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Full platforms, hosted control planes, and Kubernetes-oriented
                  runners already exist for teams that need them. openpreflight
                  is for the case where you just want a private repo checked: a
                  binary and a SQLite file on a box you already pay for. You
                  write the same commands you run locally, and skip the workflow
                  language entirely.
                </p>
                <Button asChild className="mt-6" variant="outline">
                  <a href="/product/">
                    How it works <ArrowRight />
                  </a>
                </Button>
              </div>
            </div>
            <figure className="mt-14">
              <div className="flex min-h-[32rem] overflow-hidden rounded-[1.25rem] border border-[#2a2f2a] bg-[#121412] text-[#e8ebe6] shadow-[0_40px_100px_-70px_color-mix(in_srgb,var(--primary)_45%,transparent)] md:aspect-video md:min-h-0">
                <aside className="hidden w-[14.2%] min-w-36 shrink-0 flex-col border-r border-white/10 bg-[#161916] md:flex">
                  <div className="flex h-10 items-center gap-2 border-b border-white/10 px-2.5">
                    <img alt="" className="size-5 rounded-md" height={20} src="/favicon.svg" width={20} />
                    <span className="truncate text-[0.65rem] font-semibold">openpreflight</span>
                  </div>
                  <div className="flex-1 p-1.5">
                    <p className="px-1.5 py-1 font-mono text-[0.45rem] text-white/35">Workspace</p>
                    {[
                      { icon: LayoutDashboard, label: "Overview" },
                      { icon: Workflow, label: "Jobs" },
                      { icon: FolderGit, label: "Repos" },
                      { icon: Activity, label: "Status" },
                    ].map(({ icon: Icon, label }) => (
                      <span
                        className={`mt-0.5 flex items-center gap-2 rounded px-1.5 py-1 text-[0.55rem] ${label === "Jobs" ? "bg-[#243028] text-white" : "text-white/60"}`}
                        key={label}
                      >
                        <Icon className="size-2.5" />
                        {label}
                        {label === "Jobs" && (
                          <span className="ml-auto rounded bg-white/[.06] px-1.5 py-0.5">1</span>
                        )}
                      </span>
                    ))}
                    <p className="mt-3 px-1.5 py-1 font-mono text-[0.45rem] text-white/35">Setup</p>
                    {[
                      { icon: KeyRound, label: "GitHub Apps" },
                      { icon: Server, label: "Coolify" },
                    ].map(({ icon: Icon, label }) => (
                      <span className="mt-0.5 flex items-center gap-2 rounded px-1.5 py-1 text-[0.55rem] text-white/60" key={label}>
                        <Icon className="size-2.5" />
                        {label}
                      </span>
                    ))}
                  </div>
                  <div className="space-y-0.5 p-1.5">
                    <span className="flex items-center gap-2 px-1.5 py-1 text-[0.55rem] text-white/60">
                      <Settings className="size-2.5" /> Settings
                    </span>
                    <span className="flex items-center gap-2 px-1.5 py-1 text-[0.55rem] text-white/60">
                      <Sun className="size-2.5" /> System
                    </span>
                    <div className="rounded border border-white/10 px-2 py-1.5 font-mono text-[0.45rem] text-white/40">
                      Docker reachable<br />admin
                    </div>
                  </div>
                </aside>
                <div className="min-w-0 flex-1">
                  <div className="flex h-10 items-center gap-3 border-b border-white/10 px-3">
                    <PanelLeft className="size-2.5 text-white/45" />
                    <span className="text-[0.55rem] text-white/65">Jobs</span>
                  </div>
                  <div className="p-4 sm:p-5">
                    <h3 className="text-base font-semibold tracking-[-.03em]">Jobs</h3>
                    <p className="mt-1 text-[0.55rem] text-white/40">
                      Every run this worker has taken, newest first. Retention is 14 days.
                    </p>
                    <div className="mt-5 overflow-hidden rounded-lg border border-white/10 bg-white/[.025]">
                      <div className="flex items-center gap-2 border-b border-white/10 px-2.5 py-2">
                        <span className="text-[0.45rem] text-white/40">Status</span>
                        <span className="w-24 rounded border border-white/10 bg-white/[.025] px-2 py-1 text-[0.45rem] text-white/45">
                          All statuses
                        </span>
                        <span className="hidden text-[0.45rem] text-white/40 sm:inline">Repo</span>
                        <span className="hidden w-28 rounded border border-white/10 bg-white/[.025] px-2 py-1 font-mono text-[0.45rem] text-white/35 sm:inline">
                          owner/name
                        </span>
                        <span className="ml-auto rounded bg-[#7cc79c] px-2 py-1 text-[0.45rem] font-semibold text-[#102018]">
                          Filter
                        </span>
                      </div>
                      <div className="grid grid-cols-[4.5rem_minmax(0,1fr)_3.5rem] gap-2 border-b border-white/10 px-2.5 py-2 font-mono text-[0.42rem] text-white/35 lg:grid-cols-[4.5rem_minmax(0,1fr)_5rem_3.5rem_3.5rem_5rem]">
                        <span>Status</span><span>Repo</span>
                        <span className="hidden lg:block">Event</span>
                        <span className="hidden lg:block">Took</span>
                        <span>When</span><span className="hidden lg:block" />
                      </div>
                      <div className="divide-y divide-white/10">
                        {jobsPreview.map(([status, repo, ref, took, when], index) => (
                          <div
                            className={`grid grid-cols-[4.5rem_minmax(0,1fr)_3.5rem] items-center gap-2 px-2.5 py-2 lg:grid-cols-[4.5rem_minmax(0,1fr)_5rem_3.5rem_3.5rem_5rem] ${index > 4 ? "hidden xl:grid" : ""}`}
                            key={`${repo}-${ref}`}
                          >
                            <span className={`w-fit rounded px-1.5 py-0.5 font-mono text-[0.42rem] ${statusClass[status]}`}>
                              {status}
                            </span>
                            <div className="min-w-0">
                              <p className="truncate font-mono text-[0.52rem]">{repo}</p>
                              <p className="truncate font-mono text-[0.42rem] text-white/35">{ref}</p>
                              {(status === "failed" || status === "error") && (
                                <p className="truncate text-[0.4rem] text-[#e0857b]/65">
                                  {status === "failed" ? "Step test: exited 1" : "clone failed: authentication required"}
                                </p>
                              )}
                            </div>
                            <span className="hidden font-mono text-[0.45rem] text-white/40 lg:block">check_suite</span>
                            <span className="hidden font-mono text-[0.45rem] text-white/55 lg:block">{took}</span>
                            <span className="text-[0.45rem] text-white/40">{when}</span>
                            <span className="hidden items-center justify-end gap-2 text-[0.42rem] text-white/55 lg:flex">
                              <span className="rounded border border-white/10 px-1.5 py-1">Logs</span>
                              <span>Re-run</span>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <figcaption className="mt-3 font-mono text-[0.65rem] text-muted-foreground">
                Sanitized interface preview. Repository names and run data are illustrative.
              </figcaption>
            </figure>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {pillars.map(({ icon: Icon, title, description }) => (
                <article
                  className="rounded-[1.5rem] border border-foreground/10 bg-background p-5"
                  key={title}
                >
                  <span className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-4" />
                  </span>
                  <h3 className="mt-5 text-base font-semibold tracking-[-.02em]">{title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{description}</p>
                </article>
              ))}
            </div>
            <div className="mt-16 border-t border-foreground/10 pt-10">
              <div className="grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
                <h3 className="text-2xl font-semibold tracking-[-.04em]">
                  What it isn&apos;t
                </h3>
                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  This is a small Check Runs worker, not an orchestration
                  platform. If any of these are requirements, use a fuller CI
                  system instead.
                </p>
              </div>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {outOfScope.map((item) => (
                  <li
                    className="flex items-center gap-3 rounded-2xl border border-foreground/10 px-4 py-3 text-sm text-muted-foreground"
                    key={item}
                  >
                    <span className="font-mono text-muted-foreground/70">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="outline">
                  <a href="/why/">
                    Full scope and trade-offs <ArrowRight />
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href="/pipeline/">
                    Pipeline model <ArrowRight />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-24 sm:px-8 sm:py-32" id="run">
          <div className="mx-auto w-full max-w-7xl overflow-hidden rounded-[2rem] border border-foreground/10 bg-background px-6 py-16 sm:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline">
                <Terminal className="size-3.5" /> Run it
              </Badge>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-.05em] sm:text-5xl">
                One variable and a compose file
              </h2>
              <p className="mt-4 text-muted-foreground">
                You do not clone anything: the file pulls the published image.
                Then open the UI, run the first-boot wizard, register your GitHub
                App, and enable the repos you want checks on.
              </p>
            </div>
            <pre className="mx-auto mt-10 max-w-3xl overflow-x-auto rounded-2xl border border-foreground/10 bg-muted/40 p-5 font-mono text-sm leading-relaxed sm:p-6">
              <code>{`curl -O https://raw.githubusercontent.com/openpreflight/openpreflight/main/compose.prod.yaml
export CI_SECRET_KEY="$(openssl rand -base64 48)"
docker compose -f compose.prod.yaml up -d`}</code>
            </pre>
            <div className="mt-8 flex justify-center">
              <Button asChild size="lg" variant="signature">
                <a href={`${DOCS}/getting-started/quickstart/`}>
                  Full quickstart <ArrowRight />
                </a>
              </Button>
            </div>
          </div>
        </section>
    </>
  );
}

export { SaasLandingContent };
