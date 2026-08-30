/** Shared marketing chrome. Keep claims v1-true: GitHub Check Runs CI only. v1.0.0 is released. */

export const DOCS = "https://docs.openpreflight.xyz";
export const REPO = "https://github.com/openpreflight/openpreflight";
export const WEBSITE_REPO = "https://github.com/openpreflight/website";
export const DOCS_REPO = "https://github.com/openpreflight/docs";
export const RELEASE = `${REPO}/releases/tag/v1.0.0`;

export const CTA = {
  quickstart: `${DOCS}/start/quickstart/`,
  github: REPO,
} as const;

export const tagline =
  "A small CI provider for private repos. One Go binary, one SQLite file: register a GitHub App, enable your repos, and get one Check Run per commit.";

/**
 * The whole site, once. The header nav and the footer both render this, so a
 * page cannot exist without being reachable from every other page.
 */
export const siteSections = [
  {
    title: "Product",
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
        description: "Who this is actually for",
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
    links: [
      {
        label: "Documentation",
        href: DOCS,
        description: "The reference site — how-to lives there",
      },
      { label: "Quickstart", href: CTA.quickstart, description: "Zero to a first check" },
      { label: "GitHub", href: REPO, description: "The Go binary" },
      { label: "Releases", href: `${REPO}/releases`, description: "Tagged images and binaries" },
    ],
  },
] as const;

/** Groups the header opens as menus; the rest render as direct links. */
export const navGroups = siteSections.filter(
  (section) => section.title !== "Reference",
);

export const navLinks = [
  { label: "Docs", href: DOCS },
  { label: "GitHub", href: REPO },
];

export const footerGroups = siteSections.map((section) => ({
  title: section.title,
  links: section.links.map((link) => ({ label: link.label, href: link.href })),
}));
