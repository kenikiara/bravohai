import Link from "next/link";

export function LogoMark({ size = 28, onDark = false }: { size?: number; onDark?: boolean }) {
  const boxFill = onDark ? "oklch(0.993 0.002 262)" : "#2b4a9b";
  const bFill = onDark ? "#2b4a9b" : "oklch(0.993 0.002 262)";
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect x="1" y="1" width="30" height="30" rx="8" fill={boxFill} />
      <path
        d="M9 24V8h8.6c2.8 0 4.7 1.6 4.7 4 0 1.7-1 2.9-2.4 3.4 1.9.5 3.1 1.9 3.1 3.9 0 3-2.4 4.7-5.5 4.7H9Z"
        fill={bFill}
      />
      <path
        d="M12.6 11v3.3h4.2c1.3 0 2-.6 2-1.7 0-1-.7-1.6-2-1.6h-4.2Zm0 6.1v3.7h4.6c1.4 0 2.2-.7 2.2-1.9 0-1.1-.8-1.8-2.2-1.8h-4.6Z"
        fill={boxFill}
      />
      <circle cx="24.5" cy="7.5" r="3" fill="#ef9a1e" />
    </svg>
  );
}

export function Logo({
  href = "/",
  size = 28,
  onDark = false,
}: {
  href?: string;
  size?: number;
  onDark?: boolean;
}) {
  return (
    <Link href={href} className="flex items-center gap-2.5 select-none">
      <LogoMark size={size} onDark={onDark} />
      <span className={`font-display font-bold tracking-tight text-lg ${onDark ? "text-white" : "text-ink"}`}>
        Bravoh<span className={onDark ? "text-flame" : "text-royal"}>Ai</span>
      </span>
    </Link>
  );
}
