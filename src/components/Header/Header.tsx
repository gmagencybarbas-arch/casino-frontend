"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useLayoutStore } from "@/store/useLayoutStore";
import { useThemeStore } from "@/store/useThemeStore";
import { useGlobalModal } from "@/store/useGlobalModal";
import { useHeaderAuthPreviewStore } from "@/store/useHeaderAuthPreviewStore";
import { useAccountStore } from "@/store/useAccountStore";
import { HamburgerIcon } from "./HeaderIcons";
import { HeaderBrand } from "./HeaderBrand";
import { HeaderMainNav } from "./HeaderMainNav";
import { HeaderBalance } from "./HeaderBalance";
import { HeaderDepositButton } from "./HeaderDepositButton";
import { HeaderGuestActions } from "./HeaderGuestActions";
import { useHeaderBalance } from "./useHeaderBalance";

export function Header() {
  const router = useRouter();
  const { sidebarCollapsed, toggleSidebar } = useLayoutStore();
  const { logo, logoUrl } = useThemeStore();
  const brandLogo = logo ?? logoUrl;
  const isGuestPreview = useHeaderAuthPreviewStore((s) => s.isGuestPreview);
  const setGuestPreview = useHeaderAuthPreviewStore((s) => s.setGuestPreview);
  const loggedIn = useAccountStore((s) => s.loggedIn);
  const profile = useAccountStore((s) => s.profile);
  const logoutMock = useAccountStore((s) => s.logoutMock);
  const openModal = useGlobalModal((s) => s.open);

  const { balanceDisplay, balanceRefreshing, refreshBalance } = useHeaderBalance();
  const openDepositModal = useCallback(() => openModal("deposit"), [openModal]);
  const openWallet = useCallback(() => router.push("/account/wallet"), [router]);
  const handleLogout = useCallback(() => {
    logoutMock();
    setGuestPreview(true);
    router.push("/");
  }, [logoutMock, router, setGuestPreview]);

  return (
    <header className="sticky top-0 z-40 w-full max-w-[100vw] min-w-0 shrink-0 overflow-x-hidden border-b border-[var(--color-border)] bg-[var(--color-background)] shadow-[var(--shadow-card)]">
      <div className="flex h-16 w-full min-w-0 items-center justify-between px-4 md:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3 md:gap-6">
          <button
            type="button"
            onClick={toggleSidebar}
            className="hidden rounded-[12px] p-2 text-[var(--color-text)] transition-colors hover:bg-[var(--color-card)] md:flex"
            aria-label={sidebarCollapsed ? "Expandir menu lateral" : "Recolher menu lateral"}
          >
            <HamburgerIcon />
          </button>

          <HeaderBrand brandLogo={brandLogo} />
          <HeaderMainNav />
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3 md:gap-4">
          {isGuestPreview || !loggedIn ? (
            <HeaderGuestActions />
          ) : (
            <>
              <HeaderBalance
                balanceDisplay={balanceDisplay}
                balanceRefreshing={balanceRefreshing}
                onRefresh={refreshBalance}
                onOpenWallet={openWallet}
              />
              <HeaderDepositButton onClick={openDepositModal} />
              <button
                type="button"
                onClick={openWallet}
                className="hidden h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-background-secondary)] text-xs font-semibold text-[var(--color-text)] sm:inline-flex"
                aria-label="Abrir conta"
                title={profile.fullName}
              >
                {profile.fullName.slice(0, 1)}
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg border border-[var(--color-border)] px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--color-text-muted)] transition hover:text-[var(--color-text)] sm:text-xs"
              >
                Sair
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
