"use client";

import Link from "next/link";
import { SidebarIcon } from "@/components/Sidebar/SidebarIcon";

interface SectionHeaderProps {
  title: string;
  href: string;
  icon?: string;
  linkLabel?: string;
  /** Usar cor primária no texto do botão (ex.: Top10) */
  linkVariant?: "accent" | "primary";
}

export function SectionHeader({
  title,
  href,
  icon,
  linkLabel = "VER MAIS",
  linkVariant = "accent",
}: SectionHeaderProps) {
  const linkClass =
    linkVariant === "primary"
      ? "text-[var(--color-primary)] hover:bg-[var(--color-hover)]"
      : "text-[var(--color-accent)] hover:bg-[var(--color-card-hover)]";

  return (
    <div className="mb-4 flex w-full min-w-0 flex-col gap-2 sm:mb-5 md:mb-6 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
      <div className="flex min-w-0 items-start gap-2 sm:min-h-[2.5rem] sm:items-center sm:pr-2">
        {icon && (
          <span className="mt-0.5 shrink-0 text-[var(--color-primary)] sm:mt-0">
            <SidebarIcon name={icon} />
          </span>
        )}
        <h2 className="min-w-0 flex-1 text-sm font-bold leading-snug text-[var(--color-text)] sm:text-base md:text-xl">
          {title}
        </h2>
      </div>
      <Link
        href={href}
        className={`shrink-0 self-end rounded-[12px] bg-[var(--color-card)] px-3 py-2 text-xs font-semibold transition-colors sm:self-center sm:px-4 sm:py-2 sm:text-sm ${linkClass}`}
      >
        {linkLabel}
      </Link>
    </div>
  );
}
