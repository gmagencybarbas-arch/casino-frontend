"use client";

import Link from "next/link";
import { memo, useCallback } from "react";
import { HEADER_NAV_LINKS } from "./constants";
import { useHeaderAuthPreviewStore } from "@/store/useHeaderAuthPreviewStore";

/** Navegação desktop. prefetch={false} reduz trabalho em mobile ao rolar a página. */
export const HeaderMainNav = memo(function HeaderMainNav() {
  const setGuestPreview = useHeaderAuthPreviewStore((s) => s.setGuestPreview);

  const onPromotionsClick = useCallback(() => {
    setGuestPreview(true);
  }, [setGuestPreview]);

  return (
    <nav className="hidden min-w-0 items-center gap-6 lg:flex" aria-label="Navegação principal">
      {HEADER_NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          prefetch={false}
          onClick={link.href === "/promotions" ? onPromotionsClick : undefined}
          className="whitespace-nowrap text-sm font-medium uppercase tracking-wide text-[var(--color-text)] transition-colors hover:text-[var(--color-primary)]"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
});
