import * as React from "react";

import { askAiLinks } from "@/lib/ask-ai";
import { cn } from "@/lib/utils";

const icons: Record<string, string> = {
  ChatGPT: "/assets/openai.svg",
  Claude: "/assets/claude.svg",
  Perplexity: "/assets/perplexity.svg",
  Grok: "/assets/x.svg",
};

function Icon({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <img
      alt=""
      className={cn(
        "size-3.5 opacity-80 [@media(prefers-color-scheme:dark)]:invert",
        className,
      )}
      height={14}
      src={icons[label]}
      width={14}
    />
  );
}

function AskAiLink({
  href,
  label,
  className,
  children,
}: {
  href: string;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      className={className}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <span className="sr-only">Ask about openpreflight on {label} (opens in a new tab)</span>
      {children}
    </a>
  );
}

const tile =
  "grid size-8 place-items-center rounded-lg border border-foreground/12 bg-background/80 text-foreground/70 transition-colors hover:border-primary/40 hover:text-foreground";

function AskAiRow({
  variant = "hero",
  className,
}: {
  variant?: "hero" | "footer";
  className?: string;
}) {
  if (variant === "footer") {
    return (
      <nav
        aria-labelledby="ask-ai-heading"
        className={cn("mt-14 border-t border-foreground/8 pt-6", className)}
      >
        <h3
          className="text-xs font-semibold uppercase tracking-[.1em] text-muted-foreground"
          id="ask-ai-heading"
        >
          Ask AI about us
        </h3>
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          {askAiLinks.map((service) => (
            <li key={service.label}>
              <AskAiLink
                className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary"
                href={service.href}
                label={service.label}
              >
                <Icon className="size-3.5" label={service.label} />
                <span aria-hidden="true">{service.label}</span>
              </AskAiLink>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <nav
      aria-label="Ask AI about us"
      className={cn(
        "hero-kicker flex items-center justify-center gap-3",
        className,
      )}
    >
      <span className="text-[0.7rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        Ask AI about us
      </span>
      <ul className="flex items-center gap-1.5">
        {askAiLinks.map((service) => (
          <li key={service.label}>
            <AskAiLink className={tile} href={service.href} label={service.label}>
              <Icon className="size-3.5" label={service.label} />
            </AskAiLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export { AskAiRow };
