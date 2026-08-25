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

const DOCS = "https://docs.openpreflight.xyz";
const REPO = "https://github.com/openpreflight/openpreflight";

const checkLines = [
  { text: "openpreflight", tone: "brand" as const },
  { text: "────────────────────", tone: "sep" as const },
  { text: "✓ install    8s", tone: "pass" as const },
  { text: "✓ test      21s", tone: "pass" as const },
  { text: "✓ build     13s", tone: "pass" as const },
  { text: "", tone: "muted" as const },
  { text: "Passed in 42s", tone: "brand" as const },
  { text: "", tone: "muted" as const },
  { text: "View full logs →", tone: "link" as const },
];

const pillars = [
  {
    icon: Box,
    title: "One process",
    description:
      "UI, JSON API, webhook receiver, and job runner in a single Go binary. No broker, no separate frontend.",
  },
  {
    icon: Database,
    title: "One file of state",
    description:
      "SQLite, with every secret column AES-256-GCM encrypted at rest. Apps and bindings live in the database.",
  },
  {
    icon: ShieldCheck,
    title: "Configured in a UI",
    description:
      "Register GitHub Apps, bind repos, mint tokens — without a pile of env vars for every installation.",
  },
];

const runSteps = [
  {
    title: "Webhook validates and enqueues",
    detail:
      "GitHub POSTs /webhook/{slug}. HMAC is verified; an enabled binding and allowed branch are required. Returns 202 within ten seconds.",
  },
  {
    title: "Worker opens a Check Run",
    detail:
      "An installation token is minted. The Check Run is created, then the exact commit is fetched, detached, and the remote is stripped before any step runs.",
  },
  {
    title: "Pipeline runs under a timeout",
    detail:
      "Steps run in-process or via docker run when runtime: is set. The Check Run gets a truncated log tail; the full log stays on the details page.",
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
        links={[
          { label: "Product", href: "#product" },
          { label: "How it runs", href: "#how" },
          { label: "Pipeline", href: "#pipeline" },
          { label: "Docs", href: DOCS },
        ]}
        ctaLabel="Quickstart"
        ctaHref={`${DOCS}/start/quickstart/`}
        showProfile={false}
      />
      <main id="content">
        <section
          className="relative overflow-hidden px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24"
          id="top"
        >
          <div className="absolute inset-x-0 top-0 -z-10 h-[720px] [background-image:radial-gradient(circle_at_50%_0%,color-mix(in_oklch,var(--primary)_28%,transparent),transparent_48%),linear-gradient(to_right,color-mix(in_oklch,var(--foreground)_5%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklch,var(--foreground)_5%,transparent)_1px,transparent_1px)] [background-size:auto,52px_52px,52px_52px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-4xl text-center">
              <Badge className="font-mono tracking-wide" variant="secondary">
                <Terminal className="size-3.5" /> openpreflight
              </Badge>
              <h1 className="mt-7 text-balance text-5xl font-semibold leading-[.97] tracking-[-.065em] sm:text-7xl lg:text-[5.2rem]">
                A small CI provider for{" "}
                <span className="text-primary">private repos.</span>
              </h1>
              <p className="mx-auto mt-7 max-w-2xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
                One Go binary that is both a configurator — add GitHub Apps and
                repo bindings in a web UI — and a worker that receives webhooks,
                runs install/test/build on the exact commit, and reports one
                Check Run with full logs.
              </p>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
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
              <p className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Check className="size-3.5 text-primary" /> Apache-2.0 · Self-hosted
                · One SQLite file
              </p>
            </div>

            <div className="relative mx-auto mt-16 max-w-3xl rounded-[1.75rem] border border-foreground/10 bg-background/80 p-2 shadow-[0_50px_140px_-80px_var(--primary)] backdrop-blur-xl sm:p-3">
              <figure className="overflow-hidden rounded-[1.25rem] border border-foreground/10 bg-[#121412] text-left font-mono text-sm leading-relaxed text-[#e8ebe6]">
                <div className="flex h-11 items-center gap-2 border-b border-white/8 bg-white/[.04] px-4">
                  <span className="size-2.5 rounded-full bg-rose-400/90" />
                  <span className="size-2.5 rounded-full bg-amber-400/90" />
                  <span className="size-2.5 rounded-full bg-emerald-400/90" />
                  <span className="ml-3 text-xs text-white/45">
                    Check Run · pull request
                  </span>
                </div>
                <figcaption className="sr-only">
                  Example Check Run output for a passing openpreflight job
                </figcaption>
                <pre className="space-y-0.5 overflow-x-auto p-5 sm:p-7">
                  {checkLines.map((line, i) => (
                    <div
                      aria-hidden={line.tone === "sep" ? true : undefined}
                      className={cn(
                        line.tone === "brand" && "font-medium text-[#7cc79c]",
                        line.tone === "pass" && "text-[#9ad4b4]",
                        line.tone === "sep" && "text-white/25",
                        line.tone === "link" && "text-[#7cc79c]",
                        line.tone === "muted" && "text-white/40",
                      )}
                      key={`${line.text}-${i}`}
                    >
                      {line.text || "\u00a0"}
                    </div>
                  ))}
                </pre>
              </figure>
              <p className="mt-4 px-2 text-center text-sm text-muted-foreground">
                That is the whole output surface: one check, per commit, in the
                pull request.
              </p>
            </div>
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
                  GitHub-native CI without the platform.
                </h2>
              </div>
              <div className="lg:pb-2">
                <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Full platforms, hosted control planes, and Kubernetes-oriented
                  runners already fill this slot. This one is a binary and a
                  SQLite file on a box you already pay for — CI on your server,
                  without Actions and without learning a pipeline DSL.
                </p>
                <Button asChild className="mt-6" variant="outline">
                  <a href={`${DOCS}/understanding/security-model/`}>
                    Security model <ArrowRight />
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
                Gated on the commit, not on the push.
              </h2>
              <p className="max-w-sm text-sm leading-relaxed text-background/60">
                The webhook has ten seconds to answer, so it validates and
                enqueues; the worker does the slow part. One live run per
                commit.
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
                  A <code className="font-mono text-[0.85em]">.ci.yml</code>, or
                  nothing at all.
                </h2>
                <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                  Set <code className="font-mono text-sm">runtime</code> to run
                  steps in a container, or omit it to run them in the worker
                  process. With no file, commands fall back to binding overrides,
                  then Node defaults from{" "}
                  <code className="font-mono text-sm">package.json</code> — and if
                  there is genuinely nothing to run, the check reports{" "}
                  <strong className="text-foreground">skipped</strong> rather than
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

        <section className="px-5 pb-8 sm:px-8" id="run">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-foreground/10 bg-background px-6 py-16 sm:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline">
                <Terminal className="size-3.5" /> Run it
              </Badge>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-.05em] sm:text-5xl">
                One secret key. One public URL.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Then open the UI, complete the first-boot wizard, register your
                GitHub App, and enable the repos you want checks for.
              </p>
            </div>
            <pre className="mx-auto mt-10 max-w-3xl overflow-x-auto rounded-2xl border border-foreground/10 bg-muted/40 p-5 font-mono text-sm leading-relaxed sm:p-6">
              <code>{`export CI_SECRET_KEY="$(openssl rand -base64 48)"
export CI_PUBLIC_BASE_URL="https://ci.example.com"
docker compose up --build`}</code>
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

        <section className="px-5 py-24 sm:px-8 sm:py-32" id="scope">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-balance text-4xl font-semibold tracking-[-.05em] sm:text-5xl">
              What it isn’t
            </h2>
            <p className="mt-5 max-w-2xl text-muted-foreground">
              Published so you can rule it out in a minute rather than an
              afternoon. None of this is in v1:
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
                  Tests that need no network.
                </h2>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-primary-foreground/75">
                  <code className="font-mono">go test ./...</code> needs no
                  credentials — Coolify and GitHub are faked. Bug fixes with a
                  failing test, small v1 gaps, and docs that match the code are
                  welcome.
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
        description="Self-hosted GitHub Check Runs CI for private repos. Your server, your logs, your repos."
        groups={[
          {
            title: "Product",
            links: [
              { label: "Quickstart", href: `${DOCS}/start/quickstart/` },
              { label: "Pipelines", href: `${DOCS}/using/pipelines/` },
              { label: "API", href: `${DOCS}/using/api/` },
              { label: "FAQ", href: `${DOCS}/start/faq/` },
            ],
          },
          {
            title: "Project",
            links: [
              { label: "GitHub", href: REPO },
              { label: "Releases", href: `${REPO}/releases` },
              { label: "Security", href: `${REPO}/blob/main/SECURITY.md` },
              { label: "License", href: `${REPO}/blob/main/LICENSE` },
            ],
          },
          {
            title: "Docs",
            links: [
              { label: "Documentation", href: DOCS },
              {
                label: "Configuration",
                href: `${DOCS}/start/configuration/`,
              },
              {
                label: "Troubleshooting",
                href: `${DOCS}/using/troubleshooting/`,
              },
              { label: "ADRs", href: `${DOCS}/adr/003-github-app/` },
            ],
          },
        ]}
        showNewsletter={false}
      />
    </div>
  );
}

export { SaasLanding01 };
