"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogoMark } from "@/components/Logo";

export function MobileBar() {
  const router = useRouter();
  return (
    <div className="md:hidden sticky top-0 z-30 flex items-center justify-between border-b border-edge bg-panel/95 backdrop-blur px-4 py-3">
      <Link href="/" className="flex items-center gap-2">
        <LogoMark size={24} />
        <span className="font-semibold text-white text-sm">
          Bravoh<span className="text-gold">Ai</span>
        </span>
      </Link>
      <div className="flex items-center gap-2">
        <Link
          href="/dashboard/stats"
          className="rounded-lg border border-edge px-3 py-1.5 text-xs text-neutral-300 hover:text-white"
        >
          Performance
        </Link>
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="rounded-lg bg-gold px-3 py-1.5 text-xs font-semibold text-black"
        >
          + New
        </button>
      </div>
    </div>
  );
}
