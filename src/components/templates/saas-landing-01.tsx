"use client";

import * as React from "react";
import {
  ArrowRight,
  Box,
  Check,
  Code2,
  Database,
  FileCode2,
  ShieldCheck,
  Terminal,
} from "lucide-react";

import { Footer01 } from "@/components/blocks/footer-01";
import { SiteHeader01 } from "@/components/blocks/site-header-01";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CTA, DOCS, REPO, DEMO_REPO, footerGroups, navLinks, tagline } from "@/lib/site";
import demoRuns from "@/data/demo-runs.json";

function outcomeLabel(conclusion: string) {
  switch (conclusion) {
    case "success":
      return "passed";
    case "failure":
      return "failed";
    case "timed_out":
      return "timed out";
    case "skipped":
      return "skipped";
    default:
      return conclusion;
  }
}

function outcomeClass(conclusion: string) {
  switch (conclusion) {
    case "success":
      return "text-[var(--pass,#2f6f4f)]";
    case "failure":
    case "timed_out":
      return "text-red-700 dark:text-red-400";
    case "skipped":
      return "text-muted-foreground";
    default:
      return "text-muted-foreground";
  }
}
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

const notInV1 = [
  "GitHub Actions YAML",
  "actions/runner",
  "Creating GitHub Apps for you",
  "Matrices",
  "Caches",
  "Artifacts",
];

function SaasLanding01({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("min-h-screen bg-background text-foreground", className)}
      data-slot="saas-landing-template"
      {...props}
    >
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <SiteHeader01
        brand="openpreflight"
        links={navLinks}
        ctaLabel="Quickstart"
        ctaHref={CTA.quickstart}
        showProfile={false}
      />
      <main id="content">
        <section
          className="hero relative overflow-hidden px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-20"
          id="top"
        >
          <div aria-hidden="true" className="hero-atmosphere pointer-events-none absolute inset-0 -z-10" />
          <div className="mx-auto max-w-7xl">
            <div className="hero-copy mx-auto max-w-3xl text-center">
              <p className="hero-kicker font-mono text-sm font-medium tracking-wide text-primary">
                openpreflight
              </p>
              <h1 className="mt-5 text-balance text-[2.75rem] font-semibold leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-[4.75rem]">
                A small CI provider for{" "}
                <span className="text-primary">private repos.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                One Go binary and one SQLite file, on a server you already
                run. Every commit gets a Check Run with full logs.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild size="lg" variant="signature">
                  <a href={`${DOCS}/start/quickstart/`}>
                    Quickstart <ArrowRight />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href={REPO}>
                    <Code2 /> View source
                  </a>
                </Button>
              </div>
            </div>

            <figure className="hero-panel relative mx-auto mt-14 w-full max-w-2xl sm:mt-16">
              <div aria-hidden="true" className="hero-panel-glow pointer-events-none absolute -inset-10 -z-10" />
              <div className="overflow-hidden rounded-2xl border border-[#2a2f2a] bg-[#121412] text-left text-[#e8ebe6] shadow-[0_40px_100px_-60px_color-mix(in_srgb,var(--primary)_55%,transparent)]">
                <div className="flex h-11 items-center gap-2.5 border-b border-white/10 bg-white/[0.03] px-4 sm:px-5">
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

                <div className="border-b border-white/10 px-4 py-4 sm:px-5">
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

                <ul className="divide-y divide-white/[0.06] px-2 py-1 sm:px-3">
                  {checkSteps.map((step, i) => (
                    <li
                      className="hero-line flex items-center gap-3 px-2 py-3 sm:gap-4 sm:px-2.5"
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
                            className="ml-auto hidden h-1 w-16 overflow-hidden rounded-full bg-white/10 sm:block sm:w-24"
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

                <div className="border-t border-white/10 px-4 py-3 sm:px-5">
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[#7cc79c]">
                    View full logs
                    <ArrowRight className="size-3.5" />
                  </span>
                </div>
              </div>
            </figure>
          </div>
        </section>

        <section
          className="px-5 py-24 sm:px-8 sm:py-32"
          data-slot="feature-section"
          id="product"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
              <div>
                <Badge variant="secondary">
                  <Box className="size-3.5" /> The smallest useful version
                </Badge>
                <h2 className="mt-6 text-balance text-4xl font-semibold tracking-[-.05em] sm:text-5xl">
                  Where it fits
                </h2>
              </div>
              <div className="lg:pb-2">
                <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Full platforms, hosted control planes, and Kubernetes-oriented
                  runners already exist for teams that need them. openpreflight
                  is for the case where you just want a private repo checked: a
                  binary and a SQLite file on a box you already pay for, with no
                  Actions workflow to write and no pipeline DSL to learn.
                </p>
                <Button asChild className="mt-6" variant="outline">
                  <a href="/product/">
                    How it works <ArrowRight />
                  </a>
                </Button>
              </div>
            </div>
            <div className="mt-14 grid gap-4 md:grid-cols-3">
              {pillars.map(({ icon: Icon, title, description }, index) => (
                <article
                  className="rounded-[1.75rem] border border-foreground/10 bg-background p-6 sm:p-8"
                  key={title}
                >
                  <div className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-12 text-xl font-semibold tracking-[-.03em]">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="bg-foreground px-5 py-24 text-background sm:px-8 sm:py-32"
          id="how"
        >
          <div className="mx-auto max-w-7xl">
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
              <a href={`${DOCS}/adr/005-check-suite-gating/`}>
                Read ADR 005 <ArrowRight />
              </a>
            </Button>
          </div>
        </section>

        <section className="px-5 py-24 sm:px-8 sm:py-32" id="pipeline">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <Badge variant="secondary">
                  <FileCode2 className="size-3.5" /> Pipeline
                </Badge>
                <h2 className="mt-6 text-balance text-4xl font-semibold tracking-[-.05em] sm:text-5xl">
                  A <code className="font-mono text-[0.85em]">.ci.yml</code>, if
                  you want one
                </h2>
                <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                  Set <code className="font-mono text-sm">runtime</code> to run
                  steps in a container, or omit it to run them in the worker
                  process. If the repo has no file, commands come from the
                  binding overrides first, then from Node defaults in{" "}
                  <code className="font-mono text-sm">package.json</code>. When
                  there is nothing to run at all, the check reports{" "}
                  <strong className="text-foreground">skipped</strong> instead of
                  failed.
                </p>
                <Button asChild className="mt-8" variant="outline">
                  <a href={`${DOCS}/using/pipelines/`}>
                    Pipeline reference <ArrowRight />
                  </a>
                </Button>
              </div>
              <pre className="overflow-x-auto rounded-[1.5rem] border border-foreground/10 bg-[#121412] p-6 font-mono text-sm leading-relaxed text-[#e8ebe6] sm:p-8">
                <code>{`runtime: node:24
install: npm ci
test: npm test
build: npm run build
timeout: 15m`}</code>
              </pre>
            </div>
          </div>
        </section>

        <section className="px-5 py-24 sm:px-8 sm:py-32" id="demo">
          <div className="mx-auto max-w-7xl">
            <Badge variant="secondary">
              <Check className="size-3.5" /> Live demo
            </Badge>
            <h2 className="mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-[-.05em] sm:text-5xl">
              Real Check Runs, public log pages
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
              These are real Check Runs on{" "}
              <a
                className="font-mono text-sm text-foreground underline-offset-4 hover:underline"
                href={DEMO_REPO}
              >
                openpreflight/demo
              </a>
              , produced by a self-hosted instance — not GitHub Actions. The
              log pages are the same pages you get behind auth; shareable logs
              are on for that one binding. A run URL can 404 after retention
              prunes the job — the pull request stays.
            </p>
            <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {demoRuns.runs.map((entry) => (
                <li key={entry.branch}>
                  <p
                    className={cn(
                      "font-mono text-xs font-medium uppercase tracking-wide",
                      outcomeClass(entry.conclusion),
                    )}
                  >
                    {outcomeLabel(entry.conclusion)}
                  </p>
                  <h3 className="mt-2 font-mono text-lg font-semibold tracking-tight">
                    {entry.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {entry.outcome}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                    {entry.runUrl ? (
                      <a
                        className="text-foreground underline-offset-4 hover:underline"
                        href={entry.runUrl}
                      >
                        run log
                      </a>
                    ) : null}
                    <a
                      className="text-muted-foreground underline-offset-4 hover:underline"
                      href={entry.prUrl}
                    >
                      pull request
                    </a>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-10 max-w-2xl text-sm text-muted-foreground">
              The demo instance is a live box and may occasionally be down. If a
              run link is missing, use the pull request — the Check Run on
              GitHub still points at the details URL when the instance is up.
            </p>
          </div>
        </section>

        <section className="px-5 pb-8 sm:px-8" id="run">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-foreground/10 bg-background px-6 py-16 sm:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline">
                <Terminal className="size-3.5" /> Run it
              </Badge>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-.05em] sm:text-5xl">
                One variable and a compose file
              </h2>
              <p className="mt-4 text-muted-foreground">
                Nothing to clone: the file pulls the published image. Then open
                the UI, run the first-boot wizard, register your GitHub App, and
                enable the repos you want checks on.
              </p>
            </div>
            <pre className="mx-auto mt-10 max-w-3xl overflow-x-auto rounded-2xl border border-foreground/10 bg-muted/40 p-5 font-mono text-sm leading-relaxed sm:p-6">
              <code>{`curl -O https://raw.githubusercontent.com/openpreflight/openpreflight/main/compose.prod.yaml
export CI_SECRET_KEY="$(openssl rand -base64 48)"
docker compose -f compose.prod.yaml up -d`}</code>
            </pre>
            <div className="mt-8 flex justify-center">
              <Button asChild size="lg" variant="signature">
                <a href={`${DOCS}/start/quickstart/`}>
                  Full quickstart <ArrowRight />
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section className="px-5 py-24 sm:px-8 sm:py-32" id="before-after">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-balance text-4xl font-semibold tracking-[-.05em] sm:text-5xl">
              Before and after
            </h2>
            <p className="mt-5 max-w-2xl text-muted-foreground">
              Same private GitHub repo. Different place the Check Run comes from.
            </p>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <article className="rounded-[1.75rem] border border-foreground/10 p-6 sm:p-8">
                <p className="font-mono text-xs text-muted-foreground">Without</p>
                <h3 className="mt-3 text-xl font-semibold tracking-[-.03em]">
                  Actions-only private CI
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Workflow YAML, hosted or self-hosted <code className="font-mono text-xs">actions/runner</code>,
                  matrices and caches if you need them. Fine when you want that
                  orchestration layer.
                </p>
              </article>
              <article className="rounded-[1.75rem] border border-foreground/10 p-6 sm:p-8">
                <p className="font-mono text-xs text-muted-foreground">With</p>
                <h3 className="mt-3 text-xl font-semibold tracking-[-.03em]">
                  Worker you host + Check Run
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  One binary, SQLite, a GitHub App you register, and{" "}
                  <code className="font-mono text-xs">.ci.yml</code>. Logs stay
                  on your disk. Not a unification of GitLab and Jenkins.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="px-5 py-24 sm:px-8 sm:py-32" id="scope">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-balance text-4xl font-semibold tracking-[-.05em] sm:text-5xl">
              What it isn't
            </h2>
            <p className="mt-5 max-w-2xl text-muted-foreground">
              This is not another CI provider and not a replacement for GitHub
              Actions. Actions orchestrates. openpreflight is a small Check Runs
              runner you host. They can coexist. See{" "}
              <a
                className="underline underline-offset-4 hover:text-foreground"
                href="/compare/github-actions/"
              >
                openpreflight and GitHub Actions
              </a>
              . If any of these are requirements for you, this is the wrong
              tool. None of them are in v1:
            </p>
            <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {notInV1.map((item) => (
                <li
                  className="flex items-center gap-3 rounded-2xl border border-foreground/10 px-4 py-3 text-sm text-muted-foreground"
                  key={item}
                >
                  <span className="font-mono text-muted-foreground/70">✕</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-2xl text-muted-foreground">
              Woodpecker, Drone, a self-hosted{" "}
              <code className="font-mono text-sm">actions/runner</code>, and
              Jenkins all do more than this. The{" "}
              <a className="underline underline-offset-4 hover:text-foreground" href={`${DOCS}/start/comparison/`}>
                comparison
              </a>{" "}
              says when to pick one of them instead, and what running this
              costs you day to day is in{" "}
              <a className="underline underline-offset-4 hover:text-foreground" href={`${DOCS}/understanding/operations/`}>
                operations
              </a>{" "}
              — backups, upgrades, and what a restart does to a running job.
            </p>
          </div>
        </section>

        <section
          className="px-5 pb-24 sm:px-8 sm:pb-32"
          id="contribute"
        >
          <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[2.25rem] border border-foreground/10 bg-background lg:grid-cols-[.9fr_1.1fr]">
            <div className="relative overflow-hidden bg-primary p-7 text-primary-foreground sm:p-10 lg:p-12">
              <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_15%_15%,white,transparent_32%),linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:auto,44px_44px,44px_44px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
              <div className="relative">
                <Badge
                  className="border-white/20 bg-white/10 text-white"
                  variant="outline"
                >
                  Contributing
                </Badge>
                <h2 className="mt-7 text-balance text-4xl font-semibold tracking-[-.05em] sm:text-5xl">
                  The test suite runs offline
                </h2>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-primary-foreground/75">
                  <code className="font-mono">go test ./...</code> runs without
                  credentials because Coolify and GitHub are faked. The most
                  useful contributions are bug fixes that come with a failing
                  test, small gaps in v1, and docs corrected to match the code.
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-4 p-7 sm:p-10 lg:p-12">
              <Button asChild className="justify-between" size="lg" variant="outline">
                <a href={`${REPO}/blob/main/CONTRIBUTING.md`}>
                  CONTRIBUTING.md <ArrowRight />
                </a>
              </Button>
              <Button asChild className="justify-between" size="lg" variant="outline">
                <a href={`${REPO}/issues/new/choose`}>
                  Issue templates <ArrowRight />
                </a>
              </Button>
              <Button asChild className="justify-between" size="lg" variant="outline">
                <a href={`${DOCS}/contributing/development/`}>
                  Development guide <ArrowRight />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer01
        brand="openpreflight"
        description={tagline}
        groups={footerGroups}
        showNewsletter={false}
      />
    </div>
  );
}

export { SaasLanding01 };
