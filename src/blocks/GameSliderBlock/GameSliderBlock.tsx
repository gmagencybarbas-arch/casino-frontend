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

interface GameSliderBlockProps {
  title: string;
  category?: string;
  icon?: string;
}

const SLIDER_NAV_BTN =
  "absolute top-1/2 z-40 hidden -translate-y-1/2 rounded-[12px] bg-[var(--color-card)] p-2.5 text-[var(--color-text)] shadow-[var(--shadow-card)] transition-colors hover:bg-[var(--color-primary)] hover:text-[var(--color-background)] md:block";

function slideNextInfinite(s: SwiperType) {
  if (s.isEnd) s.slideTo(0);
  else s.slideNext();
}

function slidePrevInfinite(s: SwiperType) {
  if (s.isBeginning) s.slideTo(s.slides.length - 1);
  else s.slidePrev();
}

export function GameSliderBlock({ title, category, icon = "fire" }: GameSliderBlockProps) {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    setLoading(true);
    api.getGames(category, { limit: 20 }).then((data) => {
      setGames(data);
      setLoading(false);
    });
  }, [category]);

  return (
    <section className="mb-12" aria-label={title}>
      <SectionHeader title={title} href={`/games/${category ?? "all"}`} icon={icon} linkVariant="primary" />
      <div className="relative min-w-0 max-w-full w-full">
        <CarouselContainer>
          <div className="min-w-0 max-w-full w-full px-2 md:px-4">
            <Swiper
              onSwiper={(sw) => {
                swiperRef.current = sw;
              }}
              {...RECTANGULAR_GAME_SLIDER}
              grabCursor
              className="swiper-clip"
            >
              {loading
                ? Array.from({ length: 8 }).map((_, i) => (
                    <SwiperSlide key={i} className={rectangularGameSlideClass}>
                      <div className="aspect-[245/367] w-full animate-pulse rounded-[12px] bg-[var(--color-card)] shadow-[var(--shadow-card)]" />
                    </SwiperSlide>
                  ))
                : games.map((game) => (
                    <SwiperSlide key={game.id} className={rectangularGameSlideClass}>
                      <GameCard game={game} className="w-full" />
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
              className={`${SLIDER_NAV_BTN} -left-1 md:-left-4`}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Próximo"
              onClick={() => swiperRef.current && slideNextInfinite(swiperRef.current)}
              className={`${SLIDER_NAV_BTN} -right-1 md:-right-4`}
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
