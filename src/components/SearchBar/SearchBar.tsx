"use client";

import { useState } from "react";

export function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <div className="mb-6 flex w-full min-w-0 items-stretch gap-2 sm:mb-8 sm:gap-3">
      <div className="relative min-w-0 flex-1">
        <svg
          className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-text-muted)] sm:left-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="search"
          placeholder="Pesquise seu jogo aqui."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          enterKeyHint="search"
          className="box-border h-11 min-h-[44px] w-full min-w-0 max-w-full rounded-[12px] border border-[var(--color-border)] bg-[var(--color-card)] py-2 pl-11 pr-3 text-[15px] leading-normal text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] transition-colors focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20 sm:h-12 sm:min-h-[48px] sm:pl-12 sm:pr-4 sm:text-base"
        />
      </div>
      <button
        type="button"
        className="flex h-11 min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-[12px] border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-text)] transition-colors hover:bg-[var(--color-card-hover)] active:opacity-90 sm:h-12 sm:min-h-[48px] sm:w-12"
        aria-label="Filtros"
      >
        <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  );
}
