"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calculator, UtensilsCrossed } from "lucide-react";

import { SargaLogo, UgmLogo } from "@/components/brand-logos";
import { strings } from "@/lib/strings";
import { cn } from "@/lib/utils";

const navItems = [
  {
    href: "/kalkulator",
    label: strings.navCalculator,
    icon: Calculator,
    match: (path: string) => path.startsWith("/kalkulator"),
  },
  {
    href: "/panduan-mpasi",
    label: strings.navRecipes,
    icon: UtensilsCrossed,
    match: (path: string) => path.startsWith("/panduan-mpasi"),
  },
] as const;

export function SiteHeader({ tone = "light" }: { tone?: "light" | "dark" }) {
  const isDark = tone === "dark";
  const pathname = usePathname();
  const showDesktopNav = pathname !== "/";

  return (
    <header className="flex items-center justify-between gap-4 py-4 lg:py-6">
      <Link
        href="/"
        className="group flex min-h-11 min-w-0 items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <SargaLogo size={44} priority className="shrink-0 lg:size-12" />
        <span className="min-w-0">
          <span
            className={cn(
              "block font-display text-xl font-semibold tracking-tight lg:text-2xl",
              isDark ? "text-white" : "text-foreground",
            )}
          >
            {strings.appName}
          </span>
          <span
            className={cn(
              "mt-0.5 block max-w-[14rem] text-[0.7rem] leading-snug sm:max-w-none sm:text-xs lg:text-sm",
              isDark ? "text-white/70" : "text-muted-foreground",
            )}
          >
            {strings.appFullName}
          </span>
        </span>
      </Link>

      <div className="flex shrink-0 items-center gap-3 lg:gap-5">
        {showDesktopNav ? (
          <nav
            aria-label="Navigasi utama"
            className="hidden items-center gap-1 md:flex"
          >
            {navItems.map((item) => {
              const active = item.match(pathname);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "inline-flex min-h-11 items-center gap-2 rounded-xl px-3.5 text-sm font-semibold transition-colors",
                    active
                      ? isDark
                        ? "bg-white/15 text-white"
                        : "bg-primary/10 text-primary"
                      : isDark
                        ? "text-white/75 hover:bg-white/10 hover:text-white"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Icon className="size-4" aria-hidden />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        ) : null}

        <UgmLogo
          tone={isDark ? "dark" : "light"}
          size={40}
          priority
          className="shrink-0 opacity-90 lg:h-12 lg:w-12"
        />
      </div>
    </header>
  );
}
