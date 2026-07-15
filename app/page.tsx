import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buttonVariants } from "@/components/ui/button";
import { strings } from "@/lib/strings";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <main className="relative isolate min-h-dvh overflow-hidden">
      <div className="hero-grain absolute inset-0 -z-10" aria-hidden />
      <div className="mx-auto flex min-h-dvh w-full max-w-6xl flex-col px-5 pb-8 pt-2 text-white sm:px-8 lg:px-10">
        <SiteHeader tone="dark" />

        <div className="flex flex-1 flex-col justify-end gap-8 pb-4 pt-10 lg:justify-center lg:gap-12 lg:pb-10 lg:pt-6">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
            <div className="grid gap-4 lg:gap-5">
              <div className="grid gap-1.5">
                <p className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
                  {strings.appName}
                </p>
                <p className="max-w-xl text-sm leading-snug text-[#9fd4a8] sm:text-base lg:text-lg">
                  {strings.appFullName}
                </p>
              </div>
              <h1 className="font-display max-w-2xl text-[2.15rem] leading-[1.1] font-semibold tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.05]">
                {strings.landingHeadline}
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-white/82 sm:text-lg lg:text-xl">
                {strings.landingSupport}
              </p>
            </div>

            <div className="grid gap-3 lg:gap-4">
              <Link
                href="/kalkulator"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-14 w-full justify-between rounded-2xl bg-[#3d9a52] px-5 text-base font-semibold text-white hover:bg-[#348746] lg:h-16 lg:text-lg",
                )}
              >
                {strings.ctaCalculator}
                <ArrowRight className="size-5" aria-hidden />
              </Link>
              <Link
                href="/panduan-mpasi"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "h-14 w-full justify-between rounded-2xl border-white/35 bg-white/8 px-5 text-base font-semibold text-white hover:bg-white/14 hover:text-white lg:h-16 lg:text-lg",
                )}
              >
                {strings.ctaRecipes}
                <ArrowRight className="size-5" aria-hidden />
              </Link>
              <p className="text-center text-sm text-white/55 lg:text-left">
                {strings.offlineHint}
              </p>
            </div>
          </div>

          <SiteFooter
            tone="dark"
            logoSize={48}
            className="border-white/10 pt-4 lg:pt-2"
          />
        </div>
      </div>
    </main>
  );
}
