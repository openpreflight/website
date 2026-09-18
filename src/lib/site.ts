/**
 * Shared marketing chrome. Keep claims 2.0-true: GitHub Check Runs CI only.
 *
 * VERSION is the single source of truth for the released version. Bump it here
 * on a release; do not hardcode a tag in a page, or it goes stale silently.
 */

import brand from "./brand.json";

export const SITE = "https://openpreflight.xyz";
export const DOCS = "https://docs.openpreflight.xyz";
export const REPO = "https://github.com/openpreflight/openpreflight";
export const WEBSITE_REPO = "https://github.com/openpreflight/website";
export const DOCS_REPO = "https://github.com/openpreflight/docs";
export const VERSION = "2.1.3";
export const RELEASE = `${REPO}/releases/tag/v${VERSION}`;
export const CHANGELOG = `${REPO}/blob/v${VERSION}/CHANGELOG.md`;

export const CTA = {
  quickstart: `${DOCS}/getting-started/quickstart/`,
  github: REPO,
} as const;

/**
 * Opening claim, once. `src/lib/brand.json` is the only copy: the OG and banner
 * generators (plain .mjs) and this module both import it, and check-links
 * asserts `public/llms.txt` and `public/index.md` still quote it.
 */
export const headline = brand.headline;
export const tagline = brand.tagline;
export const subline = brand.subline;

/** The quickstart three-liner. Rendered on the homepage and on /self-hosted/. */
export const INSTALL = brand.install;

/**
 * The whole site, once. The footer renders every group and sits on every page,
 * so a page cannot exist without being reachable from every other page. The
 * header carries a short top-level subset; `src/lib/og.ts` derives the OG cards.
 */
export const siteSections = [
  {
    title: "Product",
    description: "The binary, the pipeline, and how you wire GitHub.",
    links: [
      {
        label: "Overview",
        href: "/product/",
        description: "Webhook to Check Run, and what you configure",
      },
      {
        label: "Pipeline",
        href: "/pipeline/",
        description: "The .ci.yml, and where commands resolve from",
      },
      {
        label: "Concepts",
        href: "/concepts/",
        description: "Every noun the binary uses",
      },
      {
        label: "Integrations",
        href: "/integrations/",
        description: "GitHub App, Docker, Coolify",
      },
      {
        label: "GitHub App",
        href: "/integrations/github-app/",
        description: "Register, bind, first Check Run",
      },
    ],
  },
  {
    title: "Why",
    description: "The gap it fits, and who it is for.",
    links: [
      {
        label: "Why this shape",
        href: "/why/",
        description: "The gap it fits, and where the ceiling is",
      },
      {
        label: "vs GitHub Actions",
        href: "/compare/github-actions/",
        description: "Which layer is which, and the neighbours",
      },
      {
        label: "Use cases",
        href: "/use-cases/",
        description: "Who this is for",
      },
      {
        label: "Private repos",
        href: "/use-cases/private-repos/",
        description: "Checks on private code, without Actions",
      },
      {
        label: "Self-hosted teams",
        href: "/use-cases/self-hosted-teams/",
        description: "Runner and logs on your own box",
      },
      {
        label: "Open-source contributors",
        href: "/use-cases/open-source/",
        description: "Public pull requests you can inspect",
      },
    ],
  },
  {
    title: "Trust",
    description: "What you operate, and what the worker is allowed to do.",
    links: [
      {
        label: "Self-hosted",
        href: "/self-hosted/",
        description: "What you operate, and what must persist",
      },
      {
        label: "Security",
        href: "/security/",
        description: "What the worker is allowed to do",
      },
      {
        label: "Open source",
        href: "/open-source/",
        description: "Repositories, licences, contributing",
      },
    ],
  },
  {
    title: "Reference",
    description: "How-to lives on the docs site.",
    links: [
      {
        label: "Documentation",
        href: DOCS,
        description: "The reference site. How-to lives there",
      },
      { label: "Quickstart", href: CTA.quickstart, description: "Zero to a first check" },
      {
        // Deliberately the docs FAQ and not a page here. One copy: a second one
        // on the website drifts, which is what the last pass was spent fixing.
        label: "FAQ",
        href: `${DOCS}/getting-started/faq/`,
        description: "What it does not do, answered once",
      },
      { label: "GitHub", href: REPO, description: "The Go binary" },
      { label: "Releases", href: `${REPO}/releases`, description: "Tagged images and binaries" },
    ],
  },
] as const;

export const footerGroups = siteSections.map((section) => ({
  title: section.title,
  links: section.links.map((link) => ({ label: link.label, href: link.href })),
}));
