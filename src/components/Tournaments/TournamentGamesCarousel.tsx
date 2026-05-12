"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { GameCard } from "@/components/GameCard";
import { CarouselContainer } from "@/components/CarouselContainer";
import { RELATED_GAMES_SLIDER, relatedGameSlideClass } from "@/lib/rectangularGameSwiper";
import type { Game } from "@/types/game";
import "swiper/css";

const BTN =
  "absolute top-1/2 z-40 hidden -translate-y-1/2 rounded-[12px] bg-[var(--color-card)] p-2.5 text-[var(--color-text)] shadow-[var(--shadow-card)] transition-colors hover:bg-[var(--color-primary)] hover:text-[var(--color-background)] md:block";

function slideNextInfinite(s: SwiperType) {
  if (s.isEnd) s.slideTo(0);
  else s.slideNext();
}

function slidePrevInfinite(s: SwiperType) {
  if (s.isBeginning) s.slideTo(s.slides.length - 1);
  else s.slidePrev();
}

export function TournamentGamesCarousel({ games }: { games: Game[] }) {
  const swiperRef = useRef<SwiperType | null>(null);

  if (games.length === 0) return null;

  return (
    <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] md:p-5">
      <h2 className="mb-4 text-lg font-bold text-[var(--color-text)]">Jogos participantes</h2>
      <div className="relative min-w-0">
        <CarouselContainer>
          <div className="min-w-0 max-w-full w-full px-1">
            <Swiper
              onSwiper={(sw) => {
                swiperRef.current = sw;
              }}
              {...RELATED_GAMES_SLIDER}
              grabCursor
              className="swiper-clip"
            >
              {games.map((game, i) => (
                <SwiperSlide key={game.id} className={relatedGameSlideClass}>
                  <GameCard game={game} className="w-full max-w-[200px]" priority={i < 3} listingThumbnail />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </CarouselContainer>
        {games.length > 1 ? (
          <>
            <button
              type="button"
              aria-label="Anterior"
              onClick={() => swiperRef.current && slidePrevInfinite(swiperRef.current)}
              className={`${BTN} -left-1 md:-left-3`}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Próximo"
              onClick={() => swiperRef.current && slideNextInfinite(swiperRef.current)}
              className={`${BTN} -right-1 md:-right-3`}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
