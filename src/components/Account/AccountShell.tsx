"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGlobalModal } from "@/store/useGlobalModal";
import { SidebarIcon } from "@/components/Sidebar/SidebarIcon";

const ACCOUNT_NAV_ITEMS = [
  { href: "/account/wallet", label: "Carteira", icon: "slot" },
  { href: "/account/bets", label: "Historico de apostas", icon: "chart" },
  { href: "/account/history", label: "Extrato", icon: "menu" },
  { href: "/account/bonuses", label: "Meus bonus", icon: "gift" },
  { href: "/account/profile", label: "Minha conta", icon: "home" },
  { href: "/account/security", label: "Seguranca", icon: "shield" },
] as const;

export function AccountShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const openModal = useGlobalModal((s) => s.open);

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)]/80 p-3 shadow-[var(--shadow-card)] backdrop-blur-sm md:hidden">
        <div className="scrollbar-hide -mx-1 flex gap-2 overflow-x-auto px-1">
          {ACCOUNT_NAV_ITEMS.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold whitespace-nowrap transition-all duration-300 ease-out ${
                  active
                    ? "border-[var(--color-primary)] bg-[var(--color-primary)]/15 text-[var(--color-primary)] shadow-[0_0_0_1px_rgba(0,0,0,0.05)]"
                    : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-primary)]/35 hover:bg-[var(--color-background-secondary)]/70 hover:text-[var(--color-text)]"
                }`}
              >
                <SidebarIcon name={item.icon} className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={() => openModal("support")}
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border)] px-3 py-2 text-xs font-semibold whitespace-nowrap text-[var(--color-text-muted)] transition-all duration-300 ease-out hover:border-[var(--color-primary)]/35 hover:bg-[var(--color-background-secondary)]/70 hover:text-[var(--color-text)]"
          >
            <SidebarIcon name="chat" className="h-4 w-4" />
            Suporte
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[240px_minmax(0,1fr)] md:gap-6">
        <aside className="hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)]/70 p-3 shadow-[var(--shadow-card)] backdrop-blur-sm md:block">
          <nav className="space-y-1.5">
            {ACCOUNT_NAV_ITEMS.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300 ease-out ${
                    active
                      ? "bg-[var(--color-primary)]/12 text-[var(--color-primary)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]"
                      : "text-[var(--color-text-muted)] hover:bg-[var(--color-background-secondary)] hover:text-[var(--color-text)]"
                  }`}
                >
                  <SidebarIcon name={item.icon} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <button
              type="button"
              onClick={() => openModal("support")}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--color-text-muted)] transition-all duration-300 ease-out hover:bg-[var(--color-background-secondary)] hover:text-[var(--color-text)]"
            >
              <SidebarIcon name="chat" />
              <span>Suporte</span>
            </button>
          </nav>
        </aside>

        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
