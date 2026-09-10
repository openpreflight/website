import * as React from "react";
import { ArrowUpRight, Code2, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CTA, DOCS, PRODUCT_HUNT, PRODUCT_HUNT_BADGE, REPO } from "@/lib/site";
import { cn } from "@/lib/utils";

type Footer01Props = React.ComponentProps<"footer"> & {
  brand?: string;
  description?: string;
  groups?: FooterLinkGroup[];
  newsletterPlaceholder?: string;
  showNewsletter?: boolean;
  /** Live stargazer count from build-time GitHub fetch; omit when unavailable. */
  githubStars?: number | null;
};

type FooterLinkGroup = {
  title: string;
  links: Array<{ label: string; href?: string } | string>;
};

const defaultGroups: FooterLinkGroup[] = [
  {
    title: "Product",
    links: [
      {
        label: "Quickstart",
        href: CTA.quickstart,
      },
      { label: "Documentation", href: DOCS },
      {
        label: "GitHub",
        href: REPO,
      },
    ],
  },
];

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58 0-.28-.01-1.04-.02-2.04-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.89-.01 3.29 0 .32.22.7.82.58C20.56 21.8 24 16.3 24 12 24 5.37 18.63 0 12 0z" />
    </svg>
  );
}

function Footer01({
  brand = "openpreflight",
  description = "Self-hosted. The runner and the logs stay on your server.",
  groups = defaultGroups,
  newsletterPlaceholder = "Email for product notes",
  showNewsletter = false,
  githubStars = null,
  className,
  ...props
}: Footer01Props) {
  return (
    <footer
      className={cn(
        "border-t border-foreground/10 bg-background px-5 py-12 sm:px-8 sm:py-16",
        className,
      )}
      data-slot="site-footer"
      {...props}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[.85fr_2fr]">
          <div>
            <a
              className="inline-flex items-center gap-2.5 font-semibold tracking-tight"
              href="/"
            >
              <span className="grid size-9 place-items-center">
                <img
                  alt=""
                  className="size-9"
                  height={36}
                  src="/favicon.svg"
                  width={36}
                />
              </span>
              {brand}
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
            <a
              className="mt-5 inline-block"
              href={PRODUCT_HUNT}
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                alt="openpreflight - Self-hosted CI without the CI platform. | Product Hunt"
                className="h-8 w-auto"
                height={32}
                src={PRODUCT_HUNT_BADGE}
                width={148}
              />
            </a>
            {showNewsletter ? (
              <form className="mt-7 flex max-w-sm gap-2">
                <Input
                  aria-label="Email address"
                  placeholder={newsletterPlaceholder}
                  type="email"
                />
                <Button aria-label="Subscribe" size="icon">
                  <ArrowUpRight />
                </Button>
              </form>
            ) : null}
          </div>
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4"
          >
            {groups.map((group) => (
              <div key={group.title}>
                <h3 className="text-xs font-semibold uppercase tracking-[.1em] text-muted-foreground">
                  {group.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => {
                    const item =
                      typeof link === "string" ? { label: link } : link;
                    return (
                      <li key={item.label}>
                        <a
                          className="text-sm font-medium hover:text-primary"
                          href={item.href ?? "#"}
                        >
                          {item.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="mt-14 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-foreground/8 pt-6">
          <a
            className="inline-flex h-7 items-center overflow-hidden rounded-full border border-foreground/12 text-xs font-medium transition-colors hover:border-primary/35 hover:text-primary"
            href={REPO}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="inline-flex items-center gap-1.5 bg-muted/40 px-2.5 py-1.5">
              <GitHubIcon className="size-3.5" />
              Star
            </span>
            <span className="inline-flex items-center gap-1 border-l border-foreground/12 bg-background px-2.5 py-1.5 font-mono tabular-nums text-muted-foreground">
              <Star aria-hidden="true" className="size-3 fill-current text-primary" />
              {githubStars != null ? githubStars.toLocaleString("en-US") : "GitHub"}
            </span>
          </a>
          <a className="text-sm font-medium hover:text-primary" href={DOCS}>
            Docs
          </a>
          <a
            className="text-sm font-medium hover:text-primary"
            href={`${REPO}/blob/main/LICENSE`}
          >
            Apache-2.0
          </a>
          <a
            className="text-sm font-medium hover:text-primary"
            href={CTA.quickstart}
          >
            Quickstart
          </a>
        </div>
        <div className="mt-8 flex flex-col gap-4 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>
            openpreflight is Apache-2.0. This site is MIT.
          </p>
          <div className="flex gap-5 sm:ml-auto">
            <a href="https://github.com/openpreflight/openpreflight/blob/main/LICENSE">
              Apache-2.0
            </a>
            <a href="https://github.com/openpreflight/website/blob/main/LICENSE">
              MIT
            </a>
            <a href="https://github.com/openpreflight/openpreflight/blob/main/SECURITY.md">
              Security
            </a>
            <a
              aria-label="GitHub"
              href="https://github.com/openpreflight/openpreflight"
            >
              <Code2 className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer01 };
export type { Footer01Props, FooterLinkGroup };
