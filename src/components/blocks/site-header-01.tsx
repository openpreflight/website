"use client";

import * as React from "react";
import {
  ArrowRight,
  BookOpen,
  Boxes,
  ChevronDown,
  Code2,
  Compass,
  CreditCard,
  GitBranch,
  HeartHandshake,
  KeyRound,
  Lock,
  LogOut,
  Menu,
  Puzzle,
  Scale,
  Server,
  Settings,
  Shield,
  User,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type SiteHeaderLink = { label: string; href: string; description?: string };

type SiteHeaderGroup = {
  title: string;
  description?: string;
  links: readonly SiteHeaderLink[];
};

type SiteHeader01Props = React.ComponentProps<"header"> & {
  brand?: string;
  groups?: readonly SiteHeaderGroup[];
  links?: SiteHeaderLink[];
  ctaLabel?: string;
  ctaHref?: string;
  profileName?: string;
  profileEmail?: string;
  showProfile?: boolean;
};

type NavIcon = React.ComponentType<{ className?: string; strokeWidth?: number }>;

const ICON_LINKS = new Set(["Docs", "GitHub"]);

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58 0-.28-.01-1.04-.02-2.04-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.89-.01 3.29 0 .32.22.7.82.58C20.56 21.8 24 16.3 24 12 24 5.37 18.63 0 12 0z" />
    </svg>
  );
}

const MEGA_ICONS: Record<string, NavIcon> = {
  "/product/": Boxes,
  "/pipeline/": GitBranch,
  "/concepts/": BookOpen,
  "/integrations/": Puzzle,
  "/integrations/github-app/": KeyRound,
  "/why/": Compass,
  "/compare/github-actions/": Scale,
  "/use-cases/": Users,
  "/use-cases/private-repos/": Lock,
  "/use-cases/self-hosted-teams/": Server,
  "/use-cases/open-source/": HeartHandshake,
  "/self-hosted/": Server,
  "/security/": Shield,
  "/open-source/": Code2,
};

const defaultLinks: SiteHeaderLink[] = [
  { label: "Docs", href: "https://docs.openpreflight.xyz" },
  { label: "GitHub", href: "https://github.com/openpreflight/openpreflight" },
];

function BrandMark() {
  return (
    <span className="grid size-9 place-items-center overflow-hidden rounded-xl bg-primary text-primary-foreground shadow-[0_10px_30px_-16px_var(--primary)]">
      <img alt="" className="size-9" height={36} src="/favicon.svg" width={36} />
    </span>
  );
}

function IconNavLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: NavIcon;
}) {
  return (
    <a
      aria-label={label}
      className="grid size-9 place-items-center rounded-xl text-muted-foreground outline-none transition-colors hover:bg-foreground/[.055] hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/55"
      href={href}
    >
      <Icon className="size-4" strokeWidth={1.75} />
    </a>
  );
}

function MegaMenu({
  groups,
  openTitle,
  onOpen,
  onClose,
}: {
  groups: readonly SiteHeaderGroup[];
  openTitle: string | null;
  onOpen: (title: string) => void;
  onClose: () => void;
}) {
  return (
    <>
      {groups.map((group) => {
        const open = openTitle === group.title;
        const panelId = `mega-${group.title.toLowerCase()}`;

        return (
          <div
            className="flex self-stretch items-center"
            key={group.title}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                onClose();
              }
            }}
            onMouseEnter={() => onOpen(group.title)}
            onMouseLeave={onClose}
          >
            <button
              aria-controls={panelId}
              aria-expanded={open}
              aria-haspopup="true"
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground outline-none transition-colors hover:bg-foreground/[.045] hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/55 data-[open]:bg-foreground/[.045] data-[open]:text-foreground"
              data-open={open ? "" : undefined}
              onClick={(event) => {
                const hoverNav =
                  event.detail > 0 &&
                  window.matchMedia("(hover: hover) and (pointer: fine)").matches;
                if (hoverNav) return;
                if (open) onClose();
                else onOpen(group.title);
              }}
              type="button"
            >
              {group.title}
              <ChevronDown
                className={cn(
                  "size-3.5 transition-transform duration-200 motion-reduce:transition-none",
                  open && "rotate-180",
                )}
              />
            </button>
            <div
              aria-hidden={!open}
              className={cn(
                "absolute inset-x-5 top-full z-50 pt-2 transition-[opacity,transform] duration-150 ease-[cubic-bezier(.16,1,.3,1)] motion-reduce:transition-none sm:inset-x-8",
                open
                  ? "visible translate-y-0 opacity-100"
                  : "invisible pointer-events-none -translate-y-1 opacity-0",
              )}
              id={panelId}
              inert={!open ? true : undefined}
            >
              <div
                className="w-full overflow-hidden rounded-2xl border border-foreground/12 bg-popover/96 p-2 text-popover-foreground shadow-[0_24px_70px_-24px_color-mix(in_oklch,var(--foreground)_28%,transparent),inset_0_1px_0_color-mix(in_oklch,var(--background)_65%,transparent)] backdrop-blur-xl"
                role="menu"
              >
                <div className="grid gap-1 sm:grid-cols-[14rem_1fr] lg:grid-cols-[17rem_1fr]">
                  <div className="rounded-xl bg-primary/[.06] px-3.5 py-3.5">
                    <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-primary">
                      {group.title}
                    </p>
                    {group.description ? (
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {group.description}
                      </p>
                    ) : null}
                  </div>
                  <div className="grid gap-0.5 sm:grid-cols-2 lg:grid-cols-3">
                    {group.links.map((link) => {
                      const Icon = MEGA_ICONS[link.href];
                      return (
                        <a
                          className="group/item flex items-start gap-2.5 rounded-xl px-3 py-2.5 outline-none transition-colors hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-ring/55"
                          href={link.href}
                          key={link.label}
                          role="menuitem"
                        >
                          {Icon ? (
                            <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                              <Icon className="size-4" strokeWidth={1.75} />
                            </span>
                          ) : null}
                          <span className="min-w-0">
                            <span className="flex items-center gap-1 text-sm font-semibold">
                              {link.label}
                              <ArrowRight className="size-3 opacity-0 transition-all duration-200 group-hover/item:translate-x-0.5 group-hover/item:opacity-60" />
                            </span>
                            {link.description ? (
                              <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
                                {link.description}
                              </span>
                            ) : null}
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

function SiteHeader01({
  brand = "openpreflight",
  groups = [],
  links = defaultLinks,
  ctaLabel = "Quickstart",
  ctaHref = "https://docs.openpreflight.xyz/getting-started/quickstart/",
  profileName,
  profileEmail,
  showProfile = false,
  className,
  ...props
}: SiteHeader01Props) {
  const headerRef = React.useRef<HTMLElement>(null);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout>>(undefined);
  const [openTitle, setOpenTitle] = React.useState<string | null>(null);

  const iconLinks = links.filter((link) => ICON_LINKS.has(link.label));
  const textLinks = links.filter((link) => !ICON_LINKS.has(link.label));
  const docsHref = iconLinks.find((link) => link.label === "Docs")?.href;
  const githubHref = iconLinks.find((link) => link.label === "GitHub")?.href;

  const openGroup = React.useCallback((title: string) => {
    clearTimeout(closeTimer.current);
    setOpenTitle(title);
  }, []);

  const scheduleClose = React.useCallback(() => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenTitle(null), 120);
  }, []);

  const closeNow = React.useCallback(() => {
    clearTimeout(closeTimer.current);
    setOpenTitle(null);
  }, []);

  React.useEffect(() => {
    if (!openTitle) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeNow();
    };
    const onPointer = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) closeNow();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [openTitle, closeNow]);

  React.useEffect(() => () => clearTimeout(closeTimer.current), []);

  const initials = (profileName ?? "")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-foreground/8 bg-background/82 backdrop-blur-xl",
        className,
      )}
      data-slot="site-header"
      ref={headerRef}
      {...props}
    >
      <div className="relative mx-auto flex h-16 w-full max-w-7xl items-center gap-6 px-5 sm:px-8">
        <a
          className="flex shrink-0 items-center gap-2.5 font-semibold tracking-tight"
          href="/"
        >
          <BrandMark />
          {brand}
        </a>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          <MegaMenu
            groups={groups}
            onClose={scheduleClose}
            onOpen={openGroup}
            openTitle={openTitle}
          />
          {textLinks.map((link) => (
            <a
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-foreground/[.045] hover:text-foreground"
              href={link.href}
              key={link.label}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1 sm:gap-1.5">
          {docsHref ? (
            <IconNavLink href={docsHref} icon={BookOpen} label="Documentation" />
          ) : null}
          {githubHref ? (
            <IconNavLink href={githubHref} icon={GitHubIcon} label="GitHub" />
          ) : null}
          <Button className="hidden sm:inline-flex" asChild size="sm" variant="signature">
            <a href={ctaHref}>
              {ctaLabel} <ArrowRight />
            </a>
          </Button>
          {showProfile && profileName ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-label="Open profile menu"
                  className="gap-2 px-1.5 sm:pr-2.5"
                  size="sm"
                  variant="ghost"
                >
                  <Avatar className="size-7">
                    <AvatarFallback className="text-[.65rem]">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden max-w-28 truncate text-xs sm:inline">
                    {profileName}
                  </span>
                  <ChevronDown className="hidden size-3.5 text-muted-foreground sm:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60">
                <DropdownMenuLabel>
                  <span className="block text-xs font-semibold">
                    {profileName}
                  </span>
                  <span className="mt-0.5 block text-[.68rem] font-normal text-muted-foreground">
                    {profileEmail}
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings /> Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard /> Billing
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <LogOut /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                aria-label="Open navigation"
                className="lg:hidden"
                size="icon-sm"
                variant="outline"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[min(88vw,360px)]" side="right">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <BrandMark />
                  {brand}
                </SheetTitle>
                <SheetDescription>
                  Self-hosted CI without the CI platform.
                </SheetDescription>
              </SheetHeader>
              <nav className="mt-8 grid gap-6 overflow-y-auto pb-4" aria-label="Mobile">
                {groups.map((group) => (
                  <div key={group.title}>
                    <p className="px-3 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.06em] text-primary">
                      {group.title}
                    </p>
                    <div className="mt-1.5 grid gap-0.5">
                      {group.links.map((link) => (
                        <a
                          className="rounded-xl px-3 py-2.5 hover:bg-muted"
                          href={link.href}
                          key={link.label}
                        >
                          <span className="block text-sm font-semibold">{link.label}</span>
                          {link.description ? (
                            <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
                              {link.description}
                            </span>
                          ) : null}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="grid gap-0.5 border-t border-foreground/10 pt-4">
                  {links.map((link) => (
                    <a
                      className="rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-muted"
                      href={link.href}
                      key={link.label}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </nav>
              <Button asChild className="mt-6 w-full" variant="signature">
                <a href={ctaHref}>
                  {ctaLabel} <ArrowRight />
                </a>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export { SiteHeader01 };
export type { SiteHeader01Props, SiteHeaderGroup, SiteHeaderLink };
