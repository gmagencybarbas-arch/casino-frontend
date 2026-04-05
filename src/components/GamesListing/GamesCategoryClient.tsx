"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { categories } from "@/data/categories";
import { filterGamesByListingCategory } from "@/lib/gameListingFilters";
import type { Game } from "@/types/game";
import { GameCard } from "@/components/GameCard";

const INITIAL_VISIBLE = 18;
/** 3 linhas × 7 colunas no desktop (xl). */
const INITIAL_VISIBLE_LIVE = 21;
const LOAD_MORE_DESKTOP = 18;
const LOAD_MORE_MOBILE = 12;
const LOAD_MORE_LIVE_DESKTOP = 7;
const LOAD_MORE_LIVE_MOBILE = 6;

interface GamesCategoryClientProps {
  categorySlug: string;
  categoryLabel: string;
  categoryIcon: string;
  initialGames: Game[];
}

export function GamesCategoryClient({
  categorySlug,
  categoryLabel,
  categoryIcon,
  initialGames,
}: GamesCategoryClientProps) {
  const [search, setSearch] = useState("");
  const isLiveListing = categorySlug === "live";

  const [visibleCount, setVisibleCount] = useState(
    categorySlug === "live" ? INITIAL_VISIBLE_LIVE : INITIAL_VISIBLE
  );
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    setSearch("");
    setVisibleCount(categorySlug === "live" ? INITIAL_VISIBLE_LIVE : INITIAL_VISIBLE);
  }, [categorySlug]);

  useEffect(() => {
    setVisibleCount(isLiveListing ? INITIAL_VISIBLE_LIVE : INITIAL_VISIBLE);
  }, [search, isLiveListing]);

  const filteredGames = useMemo(() => {
    let list = filterGamesByListingCategory(initialGames, categorySlug);
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter((g) => g.name.toLowerCase().includes(q));
    }
    return list;
  }, [initialGames, categorySlug, search]);

  const visibleGames = useMemo(
    () => filteredGames.slice(0, visibleCount),
    [filteredGames, visibleCount]
  );

  const loadIncrement = isLiveListing
    ? isDesktop
      ? LOAD_MORE_LIVE_DESKTOP
      : LOAD_MORE_LIVE_MOBILE
    : isDesktop
      ? LOAD_MORE_DESKTOP
      : LOAD_MORE_MOBILE;

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => prev + loadIncrement);
  }, [loadIncrement]);

  return (
    <div className="space-y-6 px-4 py-6 md:px-6">
      <h1 className="flex flex-wrap items-center gap-2 text-xl font-bold text-[var(--color-text)] md:text-2xl">
        <span aria-hidden>{categoryIcon}</span>
        <span>{categoryLabel}</span>
        <span className="text-sm font-normal text-[var(--color-text-muted)]">
          ({filteredGames.length} jogos)
        </span>
      </h1>

      <div className="flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categories.map((cat) => {
          const active = cat.slug === categorySlug;
          return (
            <Link key={cat.slug} href={`/games/${cat.slug}`} scroll={false}>
              <span
                className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-[var(--color-primary)] text-black"
                    : "bg-[var(--color-card)] text-[var(--color-text)] hover:bg-[var(--color-primary)] hover:text-black"
                }`}
              >
                <span aria-hidden>{cat.icon}</span>
                {cat.label}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-3 rounded-lg bg-[var(--color-card)] px-4 py-2.5 ring-1 ring-[var(--color-border)]">
        <svg
          className="h-5 w-5 shrink-0 text-[var(--color-text-muted)]"
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
          placeholder="Pesquise seu jogo aqui..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-muted)]"
          autoComplete="off"
        />
      </div>

      {filteredGames.length === 0 ? (
        <p className="rounded-xl bg-[var(--color-card)] px-4 py-10 text-center text-[var(--color-text-muted)]">
          Nenhum jogo encontrado nesta categoria ou na sua pesquisa.
        </p>
      ) : (
        <>
          <div
            className={
              isLiveListing
                ? "grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 md:gap-3 lg:grid-cols-6 lg:gap-3 xl:grid-cols-7 xl:gap-3"
                : "grid grid-cols-3 gap-3 md:grid-cols-6 md:gap-4"
            }
          >
            {visibleGames.map((game) => (
              <div
                key={game.id}
                className={
                  isLiveListing
                    ? "min-w-0"
                    : "min-w-0 transition-transform duration-300 hover:scale-105"
                }
              >
                <GameCard
                  game={game}
                  size={isLiveListing ? "default" : "small"}
                  className="w-full max-w-none"
                />
              </div>
            ))}
          </div>

          {visibleCount < filteredGames.length ? (
            <div className="flex justify-center pt-4">
              <button
                type="button"
                onClick={handleLoadMore}
                className="rounded-xl bg-[var(--color-primary)] px-6 py-3 text-sm font-bold text-black transition hover:opacity-90"
              >
                Carregar mais
              </button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
