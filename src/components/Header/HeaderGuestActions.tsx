"use client";

import { memo, useCallback } from "react";
import { useGlobalModal } from "@/store/useGlobalModal";

export const HeaderGuestActions = memo(function HeaderGuestActions() {
  const openModal = useGlobalModal((s) => s.open);

  const openLogin = useCallback(() => {
    openModal("login");
  }, [openModal]);

  const openRegister = useCallback(() => {
    openModal("register");
  }, [openModal]);

  return (
    <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 md:gap-3">
      <button
        type="button"
        onClick={openLogin}
        className="rounded-lg bg-[var(--color-primary)] px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wide text-black shadow-sm transition hover:brightness-110 sm:px-3 sm:py-2 sm:text-xs md:px-4 md:text-sm"
      >
        Entre
      </button>
      <button
        type="button"
        onClick={openRegister}
        className="rounded-lg border-2 border-[var(--color-primary)] bg-transparent px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wide text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary)]/10 sm:px-3 sm:py-2 sm:text-xs md:px-4 md:text-sm"
      >
        Cadastre-se
      </button>
    </div>
  );
});
