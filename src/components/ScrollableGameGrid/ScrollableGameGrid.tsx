"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { GameCard } from "@/components/GameCard";
import { CarouselContainer } from "@/components/CarouselContainer";
import type { Game } from "@/types/game";
import "swiper/css";

interface ScrollableGameGridProps {
  games: Game[];
  loading?: boolean;
  cardSize?: "default" | "small";
  columnsVisible?: number;
  rows?: number;
}

function slideNextInfinite(s: SwiperType) {
  if (s.isEnd) s.slideTo(0);
  else s.slideNext();
}

function slidePrevInfinite(s: SwiperType) {
  if (s.isBeginning) s.slideTo(s.slides.length - 1);
  else s.slidePrev();
}

export function ScrollableGameGrid({
  games,
  loading = false,
  cardSize = "small",
  columnsVisible = 5,
  rows = 2,
}: ScrollableGameGridProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  const columns: Game[][] = [];
  if (!loading && games.length > 0) {
    for (let i = 0; i < games.length; i += rows) {
      columns.push(games.slice(i, i + rows));
    }
  }

  const showNav = !loading && games.length > 8;

  const navBtnBase =
    "absolute top-1/2 z-40 -translate-y-1/2 rounded-[12px] bg-[var(--color-card)] p-2 text-[var(--color-text)] shadow-[var(--shadow-card)] transition-colors hover:bg-[var(--color-primary)] hover:text-[var(--color-background)] md:p-2.5";

  return (
    <div className="relative min-w-0 max-w-full w-full">
      <CarouselContainer>
        <div className="min-w-0 max-w-full w-full px-2 md:px-4">
          <Swiper
            onSwiper={(sw) => {
              swiperRef.current = sw;
            }}
            spaceBetween={12}
            slidesPerView={3.6}
            slidesPerGroup={2}
            grabCursor
            speed={600}
            breakpoints={{
              768: {
                slidesPerView: 8.15,
                slidesPerGroup: 3,
                spaceBetween: 12,
              },
            }}
            className="swiper-clip !pb-2"
          >
            {loading
              ? Array.from({ length: columnsVisible }).map((_, colIdx) => (
                  <SwiperSlide key={colIdx} className="!w-auto">
                    <div className="flex shrink-0 snap-center flex-col gap-3">
                      {Array.from({ length: rows }).map((_, rowIdx) => (
                        <div
                          key={rowIdx}
                          className="h-[130px] w-[130px] shrink-0 rounded-[12px] bg-[var(--color-card)] shadow-[var(--shadow-card)] animate-pulse md:h-[175px] md:w-[175px]"
                        />
                      ))}
                    </div>
                  </SwiperSlide>
                ))
              : columns.map((columnGames, colIdx) => (
                  <SwiperSlide key={colIdx} className="!w-auto">
                    <div className="flex shrink-0 snap-center flex-col gap-3">
                      {columnGames.map((game) => (
                        <div key={game.id} className="h-[130px] w-[130px] shrink-0 md:h-[175px] md:w-[175px]">
                          <GameCard game={game} size={cardSize} />
                        </div>
                      ))}
                      {columnGames.length < rows &&
                        Array.from({ length: rows - columnGames.length }).map((_, i) => (
                          <div key={`empty-${i}`} className="h-[130px] w-[130px] shrink-0 md:h-[175px] md:w-[175px]" />
                        ))}
                    </div>
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>
      </CarouselContainer>
      {showNav && (
        <>
          <button
            type="button"
            aria-label="Anterior"
            onClick={() => swiperRef.current && slidePrevInfinite(swiperRef.current)}
            className={`${navBtnBase} -left-1 md:-left-4`}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Próximo"
            onClick={() => swiperRef.current && slideNextInfinite(swiperRef.current)}
            className={`${navBtnBase} -right-1 md:-right-4`}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
