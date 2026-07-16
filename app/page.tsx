import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calculator, UtensilsCrossed } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buttonVariants } from "@/components/ui/button";
import { strings } from "@/lib/strings";
import { cn } from "@/lib/utils";

const ctaMotion =
  "transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.99] motion-reduce:transition-none motion-reduce:hover:scale-100";

export default function HomePage() {
  return (
    <main className="landing-hero relative isolate overflow-x-hidden text-white">
      <div className="hero-grain absolute inset-0 -z-20 min-h-full" aria-hidden />
      <div className="hero-ambient absolute inset-0 -z-10 min-h-full" aria-hidden />

      <div className="mx-auto flex min-h-dvh w-full max-w-6xl flex-col px-5 pb-10 pt-2 sm:px-8 lg:px-10">
        <SiteHeader tone="dark" />

        <div className="flex flex-1 flex-col justify-center gap-10 py-10 lg:gap-12 lg:py-14">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Left: value proposition */}
            <div className="flex flex-col gap-6 lg:gap-8">
              <div className="flex flex-col gap-2">
                <p className="landing-eyebrow">{strings.appName}</p>
                <p className="max-w-xl text-sm leading-snug text-[color:var(--landing-mint)] sm:text-base">
                  {strings.appFullName}
                </p>
              </div>

              <h1 className="font-display max-w-2xl text-[2.35rem] leading-[1.08] font-semibold tracking-tight sm:text-5xl lg:text-[3.25rem] lg:leading-[1.04]">
                {strings.landingHeadline}
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-white/85 sm:text-lg lg:text-xl lg:leading-relaxed">
                {strings.landingSupport}
              </p>

              <section
                className="flex max-w-xl flex-col gap-3 border-l-2 border-[color:var(--landing-mint)]/35 pl-4"
                aria-labelledby="stunting-heading"
              >
                <p className="landing-eyebrow">{strings.stuntingQuickTitle}</p>
                <h2
                  id="stunting-heading"
                  className="font-display text-lg font-semibold leading-snug text-white sm:text-xl"
                >
                  {strings.landingStuntingFocus}
                </h2>
                <p className="text-sm leading-relaxed text-white/75 sm:text-base">
                  {strings.stuntingQuickBody}
                </p>
              </section>
            </div>

            {/* Right: action rail */}
            <div className="relative lg:pl-2">
              <div className="landing-action-panel relative rounded-2xl p-6 sm:p-7">

                <div className="relative mb-6 flex items-center justify-center">
                  <div className="relative flex size-28 items-center justify-center rounded-full border border-white/15 bg-white/6 shadow-lg sm:size-32">
                    <Image
                      src="/visuals/logo_sarga_dharma.PNG"
                      alt=""
                      width={88}
                      height={88}
                      priority
                      className="size-[4.5rem] object-contain opacity-95 sm:size-20"
                      aria-hidden
                    />
                    <span className="absolute -right-1 -bottom-1 flex size-10 items-center justify-center rounded-full border border-white/20 bg-[color:var(--landing-cta)] shadow-md">
                      <Calculator className="size-4 text-white" aria-hidden />
                    </span>
                    <span className="absolute -bottom-1 -left-1 flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/12 shadow-md backdrop-blur-sm">
                      <UtensilsCrossed className="size-4 text-white" aria-hidden />
                    </span>
                  </div>
                </div>

                <div className="relative flex flex-col gap-6">
                  <div className="flex flex-col gap-4">
                    <p className="landing-eyebrow">{strings.landingFeatureGuideTitle}</p>
                    <ul className="flex flex-col gap-3 text-sm leading-relaxed text-white/82 sm:text-base">
                      <li className="flex gap-3">
                        <Calculator
                          className="mt-0.5 size-4 shrink-0 text-[color:var(--landing-mint)]"
                          aria-hidden
                        />
                        <span>{strings.landingFeatureGuideCalculator}</span>
                      </li>
                      <li className="flex gap-3">
                        <UtensilsCrossed
                          className="mt-0.5 size-4 shrink-0 text-[color:var(--landing-mint)]"
                          aria-hidden
                        />
                        <span>{strings.landingFeatureGuideRecipes}</span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Link
                      href="/kalkulator"
                      className={cn(
                        buttonVariants({ size: "lg" }),
                        ctaMotion,
                        "landing-cta-primary h-14 w-full justify-between rounded-2xl px-5 text-base font-semibold shadow-xl lg:h-16 lg:text-lg",
                      )}
                    >
                      {strings.ctaCalculator}
                      <ArrowRight className="size-5" aria-hidden />
                    </Link>
                    <Link
                      href="/panduan-mpasi"
                      className={cn(
                        buttonVariants({ size: "lg", variant: "outline" }),
                        ctaMotion,
                        "landing-cta-secondary h-14 w-full justify-between rounded-2xl px-5 text-base font-semibold shadow-lg lg:h-16 lg:text-lg",
                      )}
                    >
                      {strings.ctaRecipes}
                      <ArrowRight className="size-5" aria-hidden />
                    </Link>
                  </div>

                  <p className="text-center text-sm text-white/60 lg:text-left">
                    {strings.offlineHint}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <SiteFooter
            tone="dark"
            logoSize={48}
            className="border-white/10 pt-2 lg:pt-0"
          />
        </div>
      </div>
    </main>
  );
}
