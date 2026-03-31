"use client";

import { memo, useCallback } from "react";
import { DepositDiamondIcon } from "./HeaderIcons";
import "./header-deposit.css";

type HeaderDepositButtonProps = {
  onClick: () => void;
};

export const HeaderDepositButton = memo(function HeaderDepositButton({ onClick }: HeaderDepositButtonProps) {
  const handle = useCallback(() => {
    onClick();
  }, [onClick]);

  return (
    <button
      type="button"
      onClick={handle}
      className="header-deposit-glow flex shrink-0 items-center gap-1 rounded-lg bg-[var(--color-primary)] text-xs font-bold text-black hover:brightness-110 sm:gap-2 sm:text-sm"
    >
      <DepositDiamondIcon className="h-3 w-3 shrink-0 text-black sm:h-4 sm:w-4" />
      Depositar
    </button>
  );
});
