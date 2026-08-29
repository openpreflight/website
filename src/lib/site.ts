/** Shared marketing chrome. Keep claims v1-true: GitHub Check Runs CI only. */

export const DOCS = "https://docs.openpreflight.xyz";
export const REPO = "https://github.com/openpreflight/openpreflight";
export const WEBSITE_REPO = "https://github.com/openpreflight/website";
export const DOCS_REPO = "https://github.com/openpreflight/docs";
export const DEMO_REPO = "https://github.com/openpreflight/demo";

export const CTA = {
  quickstart: `${DOCS}/start/quickstart/`,
  github: REPO,
  demo: "/#demo",
} as const;

export const tagline =
  "A small CI provider for private repos. One Go binary, one SQLite file: register a GitHub App, enable your repos, and get one Check Run per commit.";

export const navLinks = [
  { label: "Product", href: "/product/" },
  { label: "Why", href: "/why/" },
  { label: "Docs", href: DOCS },
  { label: "GitHub", href: REPO },
];

export const footerGroups = [
  {
    title: "Product",
    links: [
      { label: "Product", href: "/product/" },
      { label: "Why", href: "/why/" },
      { label: "Pipeline", href: "/pipeline/" },
      { label: "Integrations", href: "/integrations/" },
      { label: "vs GitHub Actions", href: "/compare/github-actions/" },
    ],
  },
  {
    title: "Trust",
    links: [
      { label: "Self-hosted", href: "/self-hosted/" },
      { label: "Security", href: "/security/" },
      { label: "Open source", href: "/open-source/" },
    ],
  },
  {
    title: "Use",
    links: [
      { label: "Use cases", href: "/use-cases/" },
      { label: "Concepts", href: "/concepts/" },
      { label: "Live demo", href: "/#demo" },
      { label: "Quickstart", href: CTA.quickstart },
      { label: "Documentation", href: DOCS },
    ],
  },
];
