"use client";

import { useState, type ReactNode } from "react";

export function Accordion({
  title,
  icon,
  children,
  defaultOpen = false,
}: {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-edge bg-surface overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-well/60 transition-colors duration-150"
      >
        <span className="flex items-center gap-3 text-sm font-semibold text-ink">
          {icon && <span className="text-royal">{icon}</span>}
          {title}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          className={`text-faint transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && <div className="px-5 pb-5 pt-1 text-sm leading-relaxed text-muted">{children}</div>}
    </div>
  );
}
