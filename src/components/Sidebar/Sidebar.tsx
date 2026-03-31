"use client";

import { useState } from "react";
import Link from "next/link";
import { useLayoutStore } from "@/store/useLayoutStore";
import { SIDEBAR_SECTIONS } from "@/constants/sidebar";
import { SidebarIcon } from "./SidebarIcon";
import { getSidebarIconWrapperClass } from "./sidebarIconStyles";
import { SidebarBanner } from "@/components/SidebarBanner";

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 text-[var(--color-text-muted)] transition-transform duration-300 ${
        open ? "rotate-180" : "rotate-0"
      }`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export function Sidebar() {
  const { sidebarCollapsed } = useLayoutStore();

  return (
    <aside
      className={`hidden shrink-0 flex flex-col border-r border-[var(--color-border)] bg-[var(--color-background)] transition-all duration-300 md:flex ${
        sidebarCollapsed ? "w-[72px]" : "w-[280px]"
      }`}
    >
      {!sidebarCollapsed && (
        <div className="shrink-0 p-3">
          <SidebarBanner />
        </div>
      )}
      <nav className="flex flex-1 flex-col gap-2 overflow-y-auto p-3">
        {sidebarCollapsed ? (
          <ul className="space-y-0.5">
            {SIDEBAR_SECTIONS.flatMap((section) =>
              section.items.map((item) => (
                <li key={`${section.sectionKey}-${item.href}-${item.label}`}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-[var(--color-text)] transition-colors hover:bg-[var(--color-card)] hover:text-[var(--color-primary)]"
                    title={item.label}
                  >
                    <span className={getSidebarIconWrapperClass(section.sectionKey, item.icon)}>
                      <SidebarIcon name={item.icon} />
                    </span>
                  </Link>
                </li>
              ))
            )}
          </ul>
        ) : (
          SIDEBAR_SECTIONS.map((section) => (
            <SidebarCollapsibleSection key={section.sectionKey} section={section} />
          ))
        )}
      </nav>
    </aside>
  );
}

function SidebarCollapsibleSection({
  section,
}: {
  section: (typeof SIDEBAR_SECTIONS)[number];
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="min-w-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-2 text-left transition-all duration-300 hover:bg-white/5 ${
          open ? "opacity-100" : "opacity-80"
        }`}
        aria-expanded={open}
      >
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
          {section.title}
        </h3>
        <ChevronIcon open={open} />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-80"
        }`}
      >
        <ul className="space-y-0.5 pt-1">
          {section.items.map((item) => (
            <li key={item.href + item.label}>
              <Link
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-[var(--color-text)] transition-colors hover:bg-[var(--color-card)] hover:text-[var(--color-primary)]"
              >
                <span className={getSidebarIconWrapperClass(section.sectionKey, item.icon)}>
                  <SidebarIcon name={item.icon} />
                </span>
                <span className="truncate">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
