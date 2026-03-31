"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useLayoutStore } from "@/store/useLayoutStore";
import { SIDEBAR_SECTIONS } from "@/constants/sidebar";
import { SidebarIcon } from "@/components/Sidebar/SidebarIcon";
import { getSidebarIconWrapperClass } from "@/components/Sidebar/sidebarIconStyles";

export function MobileSidebarPanel() {
  const { mobileMenuOpen, setMobileMenuOpen } = useLayoutStore();

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${mobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`fixed left-0 top-0 z-50 flex h-full w-80 max-w-[85vw] flex-col border-r border-[var(--color-border)] bg-[var(--color-background)] shadow-xl transition-[transform] duration-300 ease-out md:hidden ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
        role="dialog"
        aria-label="Menu"
        aria-hidden={!mobileMenuOpen}
      >
        <div className="flex items-center justify-between border-b border-[var(--color-border)] p-4">
          <span className="text-lg font-bold text-[var(--color-primary)]">MENU</span>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-lg p-2 text-[var(--color-text)] transition-colors hover:bg-[var(--color-card)]"
            aria-label="Fechar menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-1 flex-col gap-6 overflow-y-auto p-4">
          {SIDEBAR_SECTIONS.map((section) => (
            <div key={section.sectionKey}>
              <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                {section.title}
              </h3>
              <ul className="space-y-0.5">
                {section.items.map((item) => (
                  <li key={item.href + item.label}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 rounded-[12px] px-3 py-3 text-sm font-medium text-[var(--color-text)] transition-colors hover:bg-[var(--color-card)] hover:text-[var(--color-accent)]"
                    >
                      <span className={getSidebarIconWrapperClass(section.sectionKey, item.icon)}>
                        <SidebarIcon name={item.icon} />
                      </span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
