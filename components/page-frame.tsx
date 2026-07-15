import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  /** Wider rail for browsing (recipes); narrower for focused tasks (calculator/detail). */
  width?: "content" | "wide";
  className?: string;
  showFooter?: boolean;
};

export function PageFrame({
  children,
  width = "content",
  className,
  showFooter = true,
}: Props) {
  return (
    <div className="page-wash relative min-h-dvh">
      <main
        className={cn(
          "relative mx-auto w-full px-5 pb-8 sm:px-8 lg:px-10",
          width === "wide" ? "max-w-6xl" : "max-w-3xl lg:max-w-5xl",
          className,
        )}
      >
        <SiteHeader />
        {children}
        {showFooter ? <SiteFooter className="mt-12 lg:mt-16" /> : null}
      </main>
    </div>
  );
}
