"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogoMark } from "@/components/Logo";

export function MobileBar() {
  const router = useRouter();
  return (
    <div className="md:hidden sticky top-0 z-30 flex items-center justify-between border-b border-edge bg-bg/95 backdrop-blur px-4 py-3">
      <Link href="/" className="flex items-center gap-2">
        <LogoMark size={24} />
        <span className="font-display font-bold text-ink text-sm">
          Bravoh<span className="text-royal">Ai</span>
        </span>
      </Link>
      <div className="flex items-center gap-2">
        <Link
          href="/dashboard/stats"
          className="rounded-lg border border-edge bg-surface px-3 py-1.5 text-xs font-medium text-muted hover:text-ink"
        >
          Performance
        </Link>
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="rounded-lg bg-royal px-3 py-1.5 text-xs font-semibold text-white hover:bg-royal-deep transition-colors"
        >
          + New
        </button>
      </div>
    </div>
  );
}
