"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { GameCard } from "@/components/GameCard";
import { CarouselContainer } from "@/components/CarouselContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { api } from "@/services/api";
import type { Game } from "@/types/game";
import { RECTANGULAR_GAME_SLIDER, rectangularGameSlideClass } from "@/lib/rectangularGameSwiper";
import "swiper/css";

function slideNextInfinite(s: SwiperType) {
  if (s.isEnd) s.slideTo(0);
  else s.slideNext();
}

function slidePrevInfinite(s: SwiperType) {
  if (s.isBeginning) s.slideTo(s.slides.length - 1);
  else s.slidePrev();
}

interface Top10BlockProps {
  title: string;
  category?: string;
  icon?: string;
}

export function Top10Block({ title, category = "top10", icon = "trophy" }: Top10BlockProps) {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    api.getGames(category).then((data) => {
      setGames(data.slice(0, 10));
      setLoading(false);
    });
  }, [category]);

  return (
    <section className="mb-12" aria-label={title}>
      <SectionHeader title={title} href="/games/all" icon={icon} linkVariant="accent" />
      <div className="relative min-w-0 max-w-full w-full">
        <CarouselContainer>
          <div className="min-w-0 max-w-full w-full px-2 md:px-4">
            <Swiper
              onSwiper={(sw) => {
                swiperRef.current = sw;
              }}
              {...RECTANGULAR_GAME_SLIDER}
              grabCursor
              speed={400}
              className="swiper-clip"
            >
              {loading
                ? Array.from({ length: 10 }).map((_, i) => (
                    <SwiperSlide key={i} className={rectangularGameSlideClass}>
                      <div className="aspect-[245/367] w-full animate-pulse rounded-[12px] bg-[var(--color-card)] shadow-[var(--shadow-card)]" />
                    </SwiperSlide>
                  ))
                : games.map((game, index) => (
                    <SwiperSlide key={game.id} className={rectangularGameSlideClass}>
                      <GameCard game={game} rank={index + 1} className="w-full" />
                    </SwiperSlide>
                  ))}
            </Swiper>
          </div>
        </CarouselContainer>
        {!loading && games.length > 0 && (
          <>
            <button
              type="button"
              aria-label="Anterior"
              onClick={() => swiperRef.current && slidePrevInfinite(swiperRef.current)}
              className="absolute -left-2 top-1/2 z-40 hidden -translate-y-1/2 rounded-[12px] bg-[var(--color-card)] p-2.5 text-[var(--color-text)] shadow-[var(--shadow-card)] transition-colors hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-text)] md:-left-4 md:block"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Próximo"
              onClick={() => swiperRef.current && slideNextInfinite(swiperRef.current)}
              className="absolute -right-2 top-1/2 z-40 hidden -translate-y-1/2 rounded-[12px] bg-[var(--color-card)] p-2.5 text-[var(--color-text)] shadow-[var(--shadow-card)] transition-colors hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-text)] md:-right-4 md:block"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>
    </section>
  );
}
