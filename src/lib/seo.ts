/**
 * Head tags and JSON-LD shared by every marketing page.
 *
 * Copy still lives in `site.ts`. This module only names the stable `@id`s and
 * the graphs that point at them, so Organization / WebSite / breadcrumbs cannot
 * drift from the chrome the header already renders.
 */
import { REPO, SITE, tagline } from "./site";

export const ORG_ID = `${SITE}/#organization`;
export const WEBSITE_ID = `${SITE}/#website`;
export const SOFTWARE_ID = `${SITE}/#software`;

export function organizationJsonLd() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: "openpreflight",
    url: SITE,
    logo: {
      "@type": "ImageObject",
      url: `${SITE}/apple-touch-icon.png`,
      width: 180,
      height: 180,
    },
    sameAs: ["https://github.com/openpreflight", REPO],
    description: tagline,
  };
}

export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE,
    name: "openpreflight",
    inLanguage: "en",
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbJsonLd(
  crumbs: readonly { label: string; href?: string }[],
  pageUrl: string,
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.label,
      item: crumb.href ? new URL(crumb.href, SITE).href : pageUrl,
    })),
  };
}

export function faqJsonLd(
  items: readonly { question: string; answer: string }[],
) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer.replace(/<[^>]+>/g, ""),
      },
    })),
  };
}

export function jsonLdScript(graph: unknown[]) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph,
  });
}

/** Homepage keeps the designed `og.png`; inner pages get `/og/{slug}.png`. */
export function ogImagePath(pathname: string): string {
  const path = pathname.replace(/\/$/, "") || "/";
  if (path === "/" || path === "/404") return "/og.png";
  return `/og${path}.png`;
}
