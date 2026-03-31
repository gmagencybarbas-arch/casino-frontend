"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { GameCard } from "@/components/GameCard";
import { CarouselContainer } from "@/components/CarouselContainer";
import { api } from "@/services/api";
import { RELATED_GAMES_SLIDER, relatedGameSlideClass } from "@/lib/rectangularGameSwiper";
import type { Game } from "@/types/game";
import "swiper/css";

function slideNextInfinite(s: SwiperType) {
  if (s.isEnd) s.slideTo(0);
  else s.slideNext();
}

function slidePrevInfinite(s: SwiperType) {
  if (s.isBeginning) s.slideTo(s.slides.length - 1);
  else s.slidePrev();
}

interface GamePlayerProps {
  game: Game;
}

export function GamePlayer({ game }: GamePlayerProps) {
  const [relatedGames, setRelatedGames] = useState<Game[]>([]);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const relatedSwiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    api.getRelatedGames(game.slug, 8).then(setRelatedGames);
  }, [game.slug]);

  const iframeSrc = game.gameUrl ?? `https://example.com/demo?game=${game.slug}`;

  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-[var(--color-background)]">
      <div className="mx-auto w-full min-w-0 max-w-7xl px-4 py-6 md:px-6">
        {/* Header: back + title + provider */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[var(--color-text)] transition-colors hover:text-[var(--color-primary)]"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar ao catálogo
          </Link>
          <div>
            <h1 className="text-xl font-bold text-[var(--color-text)]">{game.name}</h1>
            <p className="text-sm text-[var(--color-text-muted)]">{game.providerName ?? game.provider}</p>
          </div>
        </div>

        {/* Game iframe container - loads when page opens */}
        <div className="relative mb-8 overflow-hidden rounded-[12px] bg-[var(--color-card)] shadow-[var(--shadow-card)]">
          <div className="aspect-video w-full min-h-[400px] md:min-h-[500px]">
            <iframe
              src={iframeSrc}
              title={game.name}
              className="h-full w-full border-0"
              allow="fullscreen; autoplay"
              loading="eager"
              onLoad={() => setIframeLoaded(true)}
            />
          </div>
        </div>

        {/* Related games slider */}
        {relatedGames.length > 0 && (
          <section className="mb-10" aria-label="Jogos relacionados">
            <h2 className="mb-4 text-lg font-bold text-[var(--color-text)]">Jogos relacionados</h2>
            <div className="relative min-w-0 max-w-full w-full">
              <CarouselContainer>
                <div className="min-w-0 max-w-full w-full px-2 md:px-4">
                  <Swiper
                    onSwiper={(sw) => {
                      relatedSwiperRef.current = sw;
                    }}
                    {...RELATED_GAMES_SLIDER}
                    grabCursor
                    className="swiper-clip"
                  >
                    {relatedGames.map((g) => (
                      <SwiperSlide key={g.id} className={relatedGameSlideClass}>
                        <GameCard game={g} className="w-full" />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </CarouselContainer>
              <button
                type="button"
                aria-label="Anterior"
                onClick={() => relatedSwiperRef.current && slidePrevInfinite(relatedSwiperRef.current)}
                className="absolute -left-1 top-1/2 z-40 hidden -translate-y-1/2 rounded-[12px] bg-[var(--color-card)] p-2.5 text-[var(--color-text)] shadow-[var(--shadow-card)] transition-colors hover:bg-[var(--color-primary)] hover:text-[var(--color-background)] md:-left-4 md:block"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Próximo"
                onClick={() => relatedSwiperRef.current && slideNextInfinite(relatedSwiperRef.current)}
                className="absolute -right-1 top-1/2 z-40 hidden -translate-y-1/2 rounded-[12px] bg-[var(--color-card)] p-2.5 text-[var(--color-text)] shadow-[var(--shadow-card)] transition-colors hover:bg-[var(--color-primary)] hover:text-[var(--color-background)] md:-right-4 md:block"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
