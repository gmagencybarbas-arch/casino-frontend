"use client";

import { useEffect, useState } from "react";
import { GameCard } from "@/components/GameCard";
import { ScrollableGameGrid } from "@/components/ScrollableGameGrid";
import { SectionHeader } from "@/components/SectionHeader";
import { api } from "@/services/api";
import type { Game } from "@/types/game";

interface FeaturedGamesBlockProps {
  title: string;
  category?: string;
  icon?: string;
}

export function FeaturedGamesBlock({ title, category = "hot", icon = "slot" }: FeaturedGamesBlockProps) {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getGames(category, { limit: 19 }).then((data) => {
      setGames(data);
      setLoading(false);
    });
  }, [category]);

  return (
    <section className="mb-12" aria-label={title}>
      <SectionHeader title={title} href="/games/slots" icon={icon} linkVariant="accent" />
      <div className="flex flex-col md:grid md:grid-cols-[245px_1fr] gap-6">
        {/* Card destaque grande 245×367 - left (only desktop) */}
        <div className="hidden md:block mx-auto w-full max-w-[245px] shrink-0 lg:mx-0">
          {loading ? (
            <div className="aspect-[245/367] w-full max-w-[245px] animate-pulse rounded-[12px] bg-[var(--color-card)] shadow-[var(--shadow-card)]" />
          ) : games[0] ? (
            <GameCard game={games[0]} size="featured" />
          ) : null}
        </div>
        {/* Right / Mobile: 2 rows, 9 cols desktop (esteira) / 4 cols mobile, horizontal scroll estilo Netflix */}
        <div className="min-w-0 px-2 md:px-0">
          <ScrollableGameGrid games={games.slice(1)} loading={loading} cardSize="small" columnsVisible={9} rows={2} />
        </div>
      </div>
    </section>
  );
}
