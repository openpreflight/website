import * as React from "react";
import { ArrowUpRight, Code2 } from "lucide-react";

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

const composeSnippet = `curl -O https://raw.githubusercontent.com/openpreflight/openpreflight/main/compose.prod.yaml
export CI_SECRET_KEY="$(openssl rand -base64 48)"
docker compose -f compose.prod.yaml up -d`;

function Footer01({
  brand = "openpreflight",
  description = "Self-hosted. Your server, your logs, your repos.",
  groups = defaultGroups,
  newsletterPlaceholder = "Email for product notes",
  showNewsletter = false,
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
              className="mt-6 inline-block"
              href={PRODUCT_HUNT}
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                alt="openpreflight - Self-hosted CI without the CI platform. | Product Hunt"
                height={54}
                src={PRODUCT_HUNT_BADGE}
                width={250}
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
        <div className="mt-14 border-t border-foreground/8 pt-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                className="inline-flex"
                href={REPO}
                rel="noopener noreferrer"
                target="_blank"
              >
                <img
                  alt="GitHub stars"
                  height={20}
                  src="https://img.shields.io/github/stars/openpreflight/openpreflight?style=flat&label=GitHub&color=24292f"
                  width={110}
                />
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
            <pre className="max-w-xl overflow-x-auto rounded-xl border border-foreground/10 bg-muted/40 px-4 py-3 font-mono text-[0.7rem] leading-relaxed text-muted-foreground">
              <code>{composeSnippet}</code>
            </pre>
          </div>
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
