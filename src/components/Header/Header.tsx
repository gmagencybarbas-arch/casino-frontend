"use client";

import { useCallback } from "react";
import { useLayoutStore } from "@/store/useLayoutStore";
import { useThemeStore } from "@/store/useThemeStore";
import { useThemeCustomizerModalStore } from "@/store/useThemeCustomizerModalStore";
import { useHeaderAuthPreviewStore } from "@/store/useHeaderAuthPreviewStore";
import { HamburgerIcon } from "./HeaderIcons";
import { HeaderBrand } from "./HeaderBrand";
import { HeaderMainNav } from "./HeaderMainNav";
import { HeaderBalance } from "./HeaderBalance";
import { HeaderDepositButton } from "./HeaderDepositButton";
import { HeaderGuestActions } from "./HeaderGuestActions";
import { useHeaderBalance } from "./useHeaderBalance";

export function Header() {
  const { sidebarCollapsed, toggleSidebar } = useLayoutStore();
  const { logo, logoUrl } = useThemeStore();
  const brandLogo = logo ?? logoUrl;
  const setCustomizerOpen = useThemeCustomizerModalStore((s) => s.setOpen);
  const isGuestPreview = useHeaderAuthPreviewStore((s) => s.isGuestPreview);

  const { balanceDisplay, balanceRefreshing, refreshBalance } = useHeaderBalance();
  const openCustomizer = useCallback(() => setCustomizerOpen(true), [setCustomizerOpen]);

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
          {isGuestPreview ? (
            <HeaderGuestActions />
          ) : (
            <>
              <HeaderBalance
                balanceDisplay={balanceDisplay}
                balanceRefreshing={balanceRefreshing}
                onRefresh={refreshBalance}
              />
              <HeaderDepositButton onClick={openCustomizer} />
            </>
          )}
        </div>
      </div>
    </header>
  );
}
