"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calculator, UtensilsCrossed } from "lucide-react";

import { strings } from "@/lib/strings";
import { cn } from "@/lib/utils";

const tabs = [
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

export function BottomNav() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <nav
      aria-label="Navigasi utama"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
    >
      <ul className="mx-auto flex max-w-lg items-stretch">
        {tabs.map((tab) => {
          const active = tab.match(pathname);
          const Icon = tab.icon;
          return (
            <li key={tab.href} className="flex-1">
              <Link
                href={tab.href}
                className={cn(
                  "flex min-h-14 flex-col items-center justify-center gap-1 px-2 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon
                  className={cn(
                    "size-6",
                    active ? "text-primary" : "text-muted-foreground",
                  )}
                  strokeWidth={active ? 2.25 : 1.75}
                  aria-hidden
                />
                <span>{tab.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
