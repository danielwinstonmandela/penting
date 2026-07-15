"use client";

import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hasBottomNav = pathname !== "/";

  return (
    <div className={cn("min-h-dvh", hasBottomNav && "pb-20 md:pb-0")}>
      {children}
    </div>
  );
}
