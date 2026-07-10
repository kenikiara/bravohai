import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <header className="p-5">
        <Logo />
      </header>
      <div className="flex-1 flex flex-col items-center justify-center px-5 pb-24 text-center">
        <div className="font-display text-7xl font-bold text-royal/20">404</div>
        <h1 className="font-display mt-4 text-2xl font-bold text-ink">This chart doesn&apos;t exist</h1>
        <p className="mt-2 max-w-sm text-sm text-muted">
          The page you&apos;re looking for was moved, deleted, or never traded here.
        </p>
        <Link
          href="/dashboard"
          className="mt-8 rounded-lg bg-royal px-6 py-3 text-sm font-semibold text-white hover:bg-royal-deep transition-colors"
        >
          Back to the dashboard
        </Link>
      </div>
    </div>
  );
}
