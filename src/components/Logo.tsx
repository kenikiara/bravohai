import Link from "next/link";

export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect x="1" y="1" width="30" height="30" rx="8" fill="#161306" stroke="#FACC15" strokeWidth="1.5" />
      {/* bull-horn B motif */}
      <path
        d="M8 25V7h9.5c3 0 5 1.8 5 4.3 0 1.9-1.1 3.2-2.6 3.8 2 .5 3.4 2 3.4 4.2 0 3.4-2.6 5.7-6 5.7H8Z"
        fill="#FACC15"
      />
      <path d="M8 25V7h9.5c3 0 5 1.8 5 4.3 0 1.9-1.1 3.2-2.6 3.8 2 .5 3.4 2 3.4 4.2 0 3.4-2.6 5.7-6 5.7H8Z" fill="url(#g)" />
      <path d="M12 11v3.5h4.6c1.4 0 2.2-.7 2.2-1.8 0-1-.8-1.7-2.2-1.7H12Zm0 6.6V21h5c1.5 0 2.4-.8 2.4-1.9 0-1-.9-1.5-2.4-1.5h-5Z" fill="#0B0B0B" />
      <defs>
        <linearGradient id="g" x1="8" y1="7" x2="24" y2="25" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDE68A" />
          <stop offset="1" stopColor="#EAB308" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Logo({ href = "/", size = 28 }: { href?: string; size?: number }) {
  return (
    <Link href={href} className="flex items-center gap-2.5 select-none">
      <LogoMark size={size} />
      <span className="font-semibold tracking-tight text-white text-lg">
        Bravoh<span className="text-gold">Ai</span>
      </span>
    </Link>
  );
}
