import { memo } from "react";

export const HamburgerIcon = memo(function HamburgerIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
});

export const DepositDiamondIcon = memo(function DepositDiamondIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 4.5l2.2 3.3L12 11l-2.2-3.3L12 4.5zm6.2 5.3l2.2 3.2L18.2 16l-2.2-3.2 2.2-3zm-12.4 0l2.2 3.2L5.8 16l-2.2-3.2 2.2-3zM12 13l2.2 3.3L12 19.5l-2.2-3.3L12 13z" />
    </svg>
  );
});

export const RefreshIcon = memo(function RefreshIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  );
});
