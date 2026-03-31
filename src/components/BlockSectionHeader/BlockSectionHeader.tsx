"use client";

import Link from "next/link";

const BLOCK_ICONS: Record<string, React.ReactNode> = {
  featured: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  ),
  live: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18 10.48V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-.48l4 3.98v-11l-4 3.98z" />
    </svg>
  ),
  popular: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
    </svg>
  ),
  top10: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2z" />
    </svg>
  ),
  providers: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z" />
    </svg>
  ),
};

interface BlockSectionHeaderProps {
  title: string;
  href?: string;
  iconKey?: keyof typeof BLOCK_ICONS;
}

export function BlockSectionHeader({ title, href = "#", iconKey }: BlockSectionHeaderProps) {
  const icon = iconKey ? BLOCK_ICONS[iconKey] : null;

  return (
    <div className="mb-4 flex items-center justify-between gap-2 md:mb-5">
      <h2 className="flex items-center gap-2 text-base font-bold text-[var(--color-text)] md:text-xl">
        {icon && (
          <span className="flex shrink-0 items-center justify-center rounded-lg bg-[var(--color-card)] p-1.5 text-[var(--color-primary)] md:p-2">
            {icon}
          </span>
        )}
        <span className="line-clamp-1">{title}</span>
      </h2>
      <Link
        href={href}
        className="shrink-0 rounded-lg px-3 py-2 text-xs font-semibold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-card)] active:opacity-80 md:rounded-[12px] md:px-4 md:text-sm"
      >
        VER MAIS
      </Link>
    </div>
  );
}
