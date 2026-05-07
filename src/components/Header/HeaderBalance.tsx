"use client";

import { memo } from "react";
import { RefreshIcon } from "./HeaderIcons";

type HeaderBalanceProps = {
  balanceDisplay: string;
  balanceRefreshing: boolean;
  onRefresh: () => void;
  onOpenWallet: () => void;
};

export const HeaderBalance = memo(function HeaderBalance({
  balanceDisplay,
  balanceRefreshing,
  onRefresh,
  onOpenWallet,
}: HeaderBalanceProps) {
  return (
    <div className="relative flex min-w-0 items-center pl-1 sm:pl-2">
      <button
        type="button"
        onClick={onRefresh}
        disabled={balanceRefreshing}
        className="absolute -left-0.5 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-primary)] text-black shadow ring-1 ring-[var(--color-background)] transition hover:brightness-110 active:scale-95 disabled:opacity-60 sm:h-7 sm:w-7 sm:ring-2 md:-left-1 md:h-8 md:w-8"
        aria-label="Atualizar saldo"
      >
        <RefreshIcon
          className={`h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 ${balanceRefreshing ? "animate-spin" : ""}`}
        />
      </button>
      <button
        type="button"
        onClick={onOpenWallet}
        className="flex items-center gap-1 rounded-md border border-[var(--color-primary)] bg-[var(--color-background)] py-1 pl-4 pr-1.5 text-xs transition hover:border-[var(--color-accent)] sm:gap-1.5 sm:rounded-lg sm:border-2 sm:py-1.5 sm:pl-5 sm:pr-2 sm:text-sm md:gap-2 md:py-2 md:pl-7 md:pr-4"
      >
        <span className="text-[10px] leading-none text-[var(--color-text-muted)] sm:text-xs md:text-sm">Saldo</span>
        <span className="text-[11px] font-bold tabular-nums text-[var(--color-text)] sm:text-sm md:text-base">
          R${balanceDisplay}
        </span>
      </button>
    </div>
  );
});
