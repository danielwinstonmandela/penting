import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { strings } from "@/lib/strings";
import { cn } from "@/lib/utils";

export default function OfflinePage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col justify-center gap-4 px-5">
      <h1 className="font-display text-3xl font-semibold">Offline</h1>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Halaman ini belum tersimpan di perangkat. Buka aplikasi sekali saat online
        agar kalkulator dan panduan MPASI bisa dipakai tanpa sinyal.
      </p>
      <Link
        href="/"
        className={cn(buttonVariants({ size: "lg" }), "h-12 w-full")}
      >
        Kembali ke {strings.appName}
      </Link>
    </main>
  );
}
