import {
  ArrowRight,
  Check,
  Database,
  FolderGit,
  KeyRound,
  LockKeyhole,
  Server,
  ShieldCheck,
  Terminal,
  Webhook,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CTA, INSTALL, RELEASE, REPO, VERSION } from "@/lib/site";

const checkSteps = [
  { name: "install", command: "npm ci", duration: "8s", width: "19%" },
  { name: "test", command: "go test ./...", duration: "21s", width: "50%" },
  { name: "build", command: "go build ./...", duration: "13s", width: "31%" },
];

const proofPoints = [
  { icon: Check, label: "Native Check Runs" },
  { icon: LockKeyhole, label: "Encrypted secrets" },
  { icon: Database, label: "SQLite state" },
  { icon: ShieldCheck, label: "Apache-2.0" },
];

const runSteps = [
  {
    icon: Webhook,
    title: "Webhook in",
    detail:
      "GitHub calls your endpoint. openpreflight verifies the HMAC, checks the binding, and answers quickly.",
  },
  {
    icon: FolderGit,
    title: "Exact commit out",
    detail:
      "The worker opens a Check Run, fetches the immutable commit, detaches the checkout, and removes remote credentials.",
  },
  {
    icon: Terminal,
    title: "Commands run locally",
    detail:
      "Shell or Docker steps run on your disk. GitHub receives the result; the complete log stays on your server.",
  },
];

const ownedSurfaces = [
  {
    icon: KeyRound,
    eyebrow: "Configure",
    title: "A GitHub App you own",
    detail:
      "Register the App in the web UI, bind the repositories that should receive checks, and rotate credentials without redeploying.",
    panel: (
      <div className="mt-6 rounded-xl border border-foreground/10 bg-muted/35 p-4">
        <p className="font-mono text-xs text-muted-foreground">GitHub App</p>
        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="text-sm font-medium">private-repos</span>
          <span className="rounded-full bg-primary/12 px-2.5 py-1 font-mono text-xs text-primary">
            connected
          </span>
        </div>
      </div>
    ),
  },
  {
    icon: Database,
    eyebrow: "Persist",
    title: "One file to back up",
    detail:
      "Jobs, bindings, and configuration live in SQLite. Secret columns use AES-256-GCM encryption at rest.",
    panel: (
      <div className="mt-6 rounded-xl border border-foreground/10 bg-muted/35 p-4 font-mono text-xs">
        <div className="flex justify-between gap-4 text-muted-foreground">
          <span>state/openpreflight.db</span>
          <span>SQLite</span>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-foreground/8">
          <div className="h-full w-2/3 rounded-full bg-primary" />
        </div>
      </div>
    ),
  },
  {
    icon: Server,
    eyebrow: "Operate",
    title: "One process on your box",
    detail:
      "The UI, JSON API, webhook receiver, and runner ship together. There is no broker or separate frontend to maintain.",
    panel: (
      <div className="mt-6 grid grid-cols-2 gap-2 font-mono text-xs text-muted-foreground">
        {["web UI", "JSON API", "webhook", "runner"].map((item) => (
          <span className="rounded-lg border border-foreground/10 bg-muted/35 px-3 py-2" key={item}>
            {item}
          </span>
        ))}
      </div>
    ),
  },
];

const actionsYaml = [
  "name: ci",
  "on:",
  "  pull_request:",
  "  push:",
  "    branches: [main]",
  "permissions:",
  "  contents: read",
  "  checks: write",
  "jobs:",
  "  check:",
  "    runs-on: ubuntu-latest",
  "    steps:",
  "      - uses: actions/checkout@v4",
  "      - uses: actions/setup-node@v4",
  "        with:",
  "          node-version: 24",
  "          cache: npm",
  "      - run: npm ci",
  "      - uses: actions/setup-go@v5",
  "        with:",
  "          go-version: \"1.24\"",
  "          cache: true",
  "      - run: go test ./...",
  "      - run: go build ./...",
].join("\n");

const ciYml = ["install: npm ci", "test: go test ./...", "build: go build ./..."].join("\n");


function SaasLandingContent() {
  return (
    <>
      <section className="hero relative overflow-hidden px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-20" id="top">
        <div aria-hidden="true" className="hero-atmosphere pointer-events-none absolute inset-0 -z-10" />
        <div className="mx-auto w-full max-w-7xl">
          <div className="hero-copy mx-auto max-w-4xl text-center">
            <p className="hero-kicker font-mono text-sm font-medium tracking-wide text-primary">
              Open source · Apache-2.0
            </p>
            <h1 className="mt-5 text-balance text-[2.75rem] font-semibold leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-[4.75rem]">
              GitHub Checks, run on{" "}
              <span className="text-primary">your own server.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Gate private pull requests with one Go binary and one SQLite file.
              No Actions minutes, runner fleet, or hosted CI control plane.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              For teams that need straightforward test and build gates—not matrices,
              hosted runners, or a workflow platform.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" variant="signature">
                <a href={CTA.quickstart}>
                  Install with Docker Compose <ArrowRight />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={REPO}>View on GitHub</a>
              </Button>
            </div>
            <p className="mt-5 font-mono text-xs text-muted-foreground">
              Linux · Docker or a release binary · GitHub App
            </p>
          </div>

          <figure className="hero-panel relative mx-auto mt-14 w-full max-w-5xl sm:mt-16">
            <div aria-hidden="true" className="hero-panel-glow pointer-events-none absolute -inset-10 -z-10" />
            <div className="overflow-hidden rounded-2xl border border-[#2a2f2a] bg-[#121412] text-left text-[#e8ebe6] shadow-[0_40px_100px_-60px_color-mix(in_srgb,var(--primary)_55%,transparent)]">
              <div className="flex h-11 items-center gap-2.5 border-b border-white/10 bg-white/[0.03] px-4 sm:px-6 lg:px-8">
                <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-[#7cc79c]" />
                <span className="truncate font-mono text-xs text-white/50">
                  Check Run · pull request
                </span>
              </div>

              <figcaption className="sr-only">
                Example Check Run: three steps passed on a private pull request in 42 seconds
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
                    <span className="font-mono text-sm font-medium text-[#7cc79c]">Passed</span>
                  </div>
                  <span className="font-mono text-xs text-[#9ad4b4]">42s</span>
                </div>
              </div>

              <ul className="divide-y divide-white/[0.06] px-2 py-1 sm:px-3 lg:grid lg:grid-cols-3 lg:divide-x lg:divide-y-0 lg:px-0 lg:py-0">
                {checkSteps.map((step, index) => (
                  <li
                    className="hero-line flex items-center gap-3 px-2 py-3 sm:gap-4 sm:px-2.5 lg:px-8 lg:py-5"
                    key={step.name}
                    style={{ animationDelay: 220 + index * 90 + "ms" }}
                  >
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#7cc79c]/15 text-[#7cc79c]">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="font-mono text-sm text-[#e8ebe6]">{step.name}</span>
                        <span className="shrink-0 font-mono text-xs text-white/40">{step.duration}</span>
                      </div>
                      <div className="mt-1 flex items-center gap-3">
                        <code className="min-w-0 truncate font-mono text-xs text-white/35">{step.command}</code>
                        <span aria-hidden="true" className="ml-auto hidden h-1 w-16 overflow-hidden rounded-full bg-white/10 sm:block sm:w-24 lg:w-full lg:max-w-28">
                          <span className="block h-full rounded-full bg-[#7cc79c]/70" style={{ width: step.width }} />
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <a
                className="flex items-center justify-between border-t border-white/10 px-4 py-3 font-mono text-xs text-[#7cc79c] transition-colors hover:bg-white/[.035] sm:px-6 lg:px-8"
                href="/product/"
              >
                See run details and full logs
                <ArrowRight className="size-3.5" />
              </a>
            </div>
          </figure>

          <ul className="mx-auto mt-8 grid max-w-5xl grid-cols-2 overflow-hidden rounded-2xl border border-foreground/10 bg-background/70 backdrop-blur md:grid-cols-4">
            {proofPoints.map(({ icon: Icon, label }) => (
              <li className="flex items-center gap-2.5 border-foreground/10 px-4 py-4 text-sm font-medium even:border-l md:border-l md:first:border-l-0" key={label}>
                <Icon className="size-4 shrink-0 text-primary" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-muted/25 px-5 py-24 sm:px-8 sm:py-32" id="comparison">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[1fr_.7fr] lg:items-end">
            <div>
              <Badge variant="secondary">Less workflow, same native check</Badge>
              <h2 className="mt-6 text-4xl font-semibold tracking-[-.05em] sm:text-5xl">
                Write the commands you already run locally
              </h2>
            </div>
            <p className="text-base leading-relaxed text-muted-foreground">
              Put install, test, and build in <code className="font-mono text-sm">.ci.yml</code>.
              No checkout action, setup steps, cache keys, or hosted runner image.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <article className="overflow-hidden rounded-[1.75rem] border border-foreground/10 bg-background">
              <div className="flex items-center justify-between gap-3 border-b border-foreground/10 px-5 py-3">
                <p className="font-mono text-xs text-muted-foreground">.github/workflows/ci.yml</p>
                <span className="font-mono text-xs uppercase tracking-[0.06em] text-muted-foreground">GitHub Actions</span>
              </div>
              <pre className="max-h-[24rem] overflow-auto p-5 font-mono text-xs leading-relaxed text-muted-foreground sm:p-6">
                <code>{actionsYaml}</code>
              </pre>
            </article>
            <article className="overflow-hidden rounded-[1.75rem] border border-primary/35 bg-background">
              <div className="flex items-center justify-between gap-3 border-b border-primary/20 bg-primary/5 px-5 py-3">
                <p className="font-mono text-xs text-foreground">.ci.yml</p>
                <span className="font-mono text-xs uppercase tracking-[0.06em] text-primary">openpreflight</span>
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-sm leading-relaxed text-foreground sm:p-6">
                <code>{ciYml}</code>
              </pre>
            </article>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <article className="rounded-[1.5rem] border border-foreground/10 p-6">
              <h3 className="text-lg font-semibold tracking-[-.03em]">Keep GitHub Actions if</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                You need matrices, cross-repository artifacts, multi-platform runners, or a broad action marketplace.
              </p>
            </article>
            <article className="rounded-[1.5rem] border border-primary/25 bg-primary/[.035] p-6">
              <h3 className="text-lg font-semibold tracking-[-.03em]">Use openpreflight if</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                A private repository needs a reliable pull-request gate and you want the runner, source, and logs on your own server.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-foreground px-5 py-24 text-background sm:px-8 sm:py-32" id="how">
        <div className="mx-auto w-full max-w-7xl">
          <Badge className="border-background/15 bg-background/10 text-background" variant="outline">
            <Terminal className="size-3.5" /> One commit, one check
          </Badge>
          <div className="mt-7 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <h2 className="max-w-3xl text-4xl font-semibold tracking-[-.05em] sm:text-5xl">
              From webhook to required Check Run
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-background/60">
              The webhook stays fast. The worker handles the checkout, commands, logs, and conclusion.
            </p>
          </div>
          <ol className="mt-14 grid gap-4 lg:grid-cols-3">
            {runSteps.map(({ icon: Icon, title, detail }, index) => (
              <li className="flex min-h-64 flex-col rounded-[1.75rem] border border-background/12 bg-background/[.055] p-6 sm:p-8" key={title}>
                <div className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded-xl bg-primary/15 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <span className="font-mono text-xs text-background/40">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-8 text-xl font-semibold tracking-[-.03em]">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-background/60">{detail}</p>
              </li>
            ))}
          </ol>
          <Button asChild className="mt-10 border-background/20 bg-transparent text-background hover:bg-background/10" variant="outline">
            <a href="/product/">
              See the complete run model <ArrowRight />
            </a>
          </Button>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 sm:py-32" id="product">
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-3xl">
            <Badge variant="secondary">Small enough to understand</Badge>
            <h2 className="mt-6 text-4xl font-semibold tracking-[-.05em] sm:text-5xl">
              You can account for every moving part
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              No decorative control plane and no hidden runner service. The product is the App, the process, and the state you operate.
            </p>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {ownedSurfaces.map(({ icon: Icon, eyebrow, title, detail, panel }) => (
              <article className="flex flex-col rounded-[1.5rem] border border-foreground/10 bg-background p-6 sm:p-7" key={title}>
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <span className="font-mono text-xs uppercase tracking-[.08em] text-primary">{eyebrow}</span>
                </div>
                <h3 className="mt-6 text-xl font-semibold tracking-[-.03em]">{title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{detail}</p>
                {panel}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 sm:py-32" id="run">
        <div className="mx-auto w-full max-w-7xl overflow-hidden rounded-[2rem] border border-foreground/10 bg-[linear-gradient(145deg,color-mix(in_srgb,var(--primary)_8%,var(--background)),var(--background)_55%)] px-6 py-16 sm:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline">
              <Terminal className="size-3.5" /> Install openpreflight
            </Badge>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-.05em] sm:text-5xl">Start with Docker Compose</h2>
            <p className="mt-4 text-muted-foreground">
              Pull the published image, open the first-boot wizard, register your GitHub App, and enable the repositories that should get checks.
            </p>
          </div>
          <pre className="mx-auto mt-10 max-w-3xl overflow-x-auto rounded-2xl border border-foreground/10 bg-background/75 p-5 font-mono text-sm leading-relaxed shadow-[inset_0_1px_0_color-mix(in_srgb,var(--foreground)_5%,transparent)] sm:p-6">
            <code>{INSTALL}</code>
          </pre>
          <p className="mx-auto mt-5 max-w-3xl text-center font-mono text-xs text-muted-foreground">
            Prefer a binary?{" "}
            <a className="underline underline-offset-4 hover:text-foreground" href={RELEASE}>
              Download v{VERSION} for Linux
            </a>
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" variant="signature">
              <a href={CTA.quickstart}>
                Open the install guide <ArrowRight />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={REPO}>Read the source</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

export { SaasLandingContent };
