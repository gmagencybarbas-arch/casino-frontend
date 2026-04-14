"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { GameCard } from "@/components/GameCard";
import { filterGamesByNameSearch } from "@/lib/gameListingFilters";
import type { Game } from "@/types/game";

const MAX_HOME_RESULTS = 24;

interface SearchBarProps {
  games: Game[];
}

export function SearchBar({ games }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => filterGamesByNameSearch(games, query), [games, query]);

  const qTrim = query.trim();
  const showResults = qTrim.length > 0;
  const preview = results.slice(0, MAX_HOME_RESULTS);
  const encodedQ = encodeURIComponent(qTrim);

  return (
    <div className="mb-6 w-full min-w-0 sm:mb-8">
      <div className="flex w-full min-w-0 items-stretch gap-2 sm:gap-3">
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
            autoComplete="off"
            aria-label="Pesquisar jogos"
            className="box-border h-11 min-h-[44px] w-full min-w-0 max-w-full rounded-[12px] border border-[var(--color-border)] bg-[var(--color-card)] py-2 pl-11 pr-3 text-[15px] leading-normal text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] transition-colors focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20 sm:h-12 sm:min-h-[48px] sm:pl-12 sm:pr-4 sm:text-base"
          />
        </div>
        <Link
          href={qTrim ? `/games/all?q=${encodedQ}` : "/games/all"}
          className="flex h-11 min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-[12px] border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-text)] transition-colors hover:bg-[var(--color-card-hover)] active:opacity-90 sm:h-12 sm:min-h-[48px] sm:w-12"
          aria-label={qTrim ? "Ver todos os resultados no catálogo" : "Abrir catálogo de jogos"}
          title={qTrim ? "Ver todos os jogos com esta pesquisa" : "Catálogo"}
        >
          <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </Link>
      </div>

      {showResults && (
        <div
          className="mt-4 rounded-[12px] border border-[var(--color-border)] bg-[var(--color-background-secondary)]/80 p-4 ring-1 ring-[var(--color-border)]/60 sm:p-5"
          role="region"
          aria-live="polite"
          aria-label="Resultados da pesquisa"
        >
          <p className="mb-3 text-sm text-[var(--color-text-muted)]">
            {results.length === 0 ? (
              <>Nenhum jogo encontrado para &quot;{qTrim}&quot;.</>
            ) : (
              <>
                {results.length} {results.length === 1 ? "jogo encontrado" : "jogos encontrados"}
                {results.length > MAX_HOME_RESULTS ? ` (mostrando ${MAX_HOME_RESULTS})` : ""}
              </>
            )}
          </p>

          {preview.length > 0 ? (
            <>
              <div className="grid grid-cols-3 gap-3 md:grid-cols-6 md:gap-4">
                {preview.map((game, index) => (
                  <div
                    key={game.id}
                    className="min-w-0 [content-visibility:auto] [contain-intrinsic-size:90px_90px]"
                  >
                    <GameCard game={game} size="small" className="w-full max-w-none" priority={index < 12} />
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                <Link
                  href={`/games/all?q=${encodedQ}`}
                  className="inline-flex items-center rounded-xl bg-[var(--color-primary)] px-5 py-2.5 text-sm font-bold text-black transition hover:brightness-110"
                >
                  Ver todos no catálogo
                </Link>
              </div>
            </>
          ) : null}
        </div>
      )}
    </div>
  );
}
