"use client";

import * as React from "react";
import {
  ArrowRight,
  ChevronDown,
  CreditCard,
  LogOut,
  Menu,
  Settings,
  User,
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

type SiteHeaderGroup = { title: string; links: readonly SiteHeaderLink[] };

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

const defaultLinks: SiteHeaderLink[] = [
  { label: "Product", href: "/product/" },
  { label: "Why", href: "/why/" },
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

function SiteHeader01({
  brand = "openpreflight",
  groups = [],
  links = defaultLinks,
  ctaLabel = "Quickstart",
  ctaHref = "https://docs.openpreflight.xyz/start/quickstart/",
  profileName,
  profileEmail,
  showProfile = false,
  className,
  ...props
}: SiteHeader01Props) {
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
      {...props}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-6 px-5 sm:px-8">
        <a
          className="flex shrink-0 items-center gap-2.5 font-semibold tracking-tight"
          href="/"
        >
          <BrandMark />
          {brand}
        </a>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {groups.map((group) => (
            <DropdownMenu key={group.title}>
              <DropdownMenuTrigger asChild>
                <button
                  className="group inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground outline-none transition-colors hover:bg-foreground/[.045] hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/55 data-[state=open]:bg-foreground/[.045] data-[state=open]:text-foreground"
                  type="button"
                >
                  {group.title}
                  <ChevronDown className="size-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-80 p-1.5">
                {group.links.map((link) => (
                  <DropdownMenuItem asChild key={link.label}>
                    <a className="flex-col items-start gap-0.5 py-2.5" href={link.href}>
                      <span className="text-sm font-semibold">{link.label}</span>
                      {link.description ? (
                        <span className="text-xs leading-snug text-muted-foreground">
                          {link.description}
                        </span>
                      ) : null}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
          {links.map((link) => (
            <a
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-foreground/[.045] hover:text-foreground"
              href={link.href}
              key={link.label}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
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
                  A small CI provider for private repos.
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
                          className="rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-muted"
                          href={link.href}
                          key={link.label}
                        >
                          {link.label}
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
