"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { CarouselContainer } from "@/components/CarouselContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { TOURNAMENT_CARD_SLIDER, tournamentCardSlideClass } from "@/lib/rectangularGameSwiper";
import { api } from "@/services/api";
import type { Tournament } from "@/types/tournament";
import { TournamentCard } from "./TournamentCard";
import "swiper/css";

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

export interface TournamentsBlockProps {
  title: string;
  subtitle?: string;
  limit?: number;
}

export function TournamentSectionSlider({ title, subtitle, limit = 6 }: TournamentsBlockProps) {
  const [items, setItems] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    let cancelled = false;
    api.getTournaments({ featured: true, limit }).then((data) => {
      if (cancelled) return;
      setItems(data);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [limit]);

  return (
    <section className="mb-12" aria-label={title}>
      <SectionHeader title={title} href="/tournaments" icon="trophy" linkVariant="primary" />
      {subtitle ? (
        <p className="-mt-2 mb-4 max-w-3xl text-sm text-[var(--color-text-muted)] sm:-mt-1 sm:mb-5 md:text-base">
          {subtitle}
        </p>
      ) : null}

      <div className="relative min-w-0 max-w-full w-full">
        <CarouselContainer>
          <div className="min-w-0 max-w-full w-full px-2 md:px-4">
            <Swiper
              onSwiper={(sw) => {
                swiperRef.current = sw;
              }}
              {...TOURNAMENT_CARD_SLIDER}
              grabCursor
              className="swiper-clip"
            >
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <SwiperSlide key={i} className={tournamentCardSlideClass}>
                      <div className="h-[420px] w-full animate-pulse rounded-[12px] border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-card)]">
                        <div className="h-[45%] animate-pulse bg-[var(--color-background-tertiary)]" />
                        <div className="space-y-3 p-3">
                          <div className="h-4 w-[85%] max-w-full rounded bg-[var(--color-background-tertiary)]" />
                          <div className="h-3 w-full rounded bg-[var(--color-background-secondary)]" />
                          <div className="h-8 w-full rounded-[12px] bg-[var(--color-background-tertiary)]" />
                        </div>
                      </div>
                    </SwiperSlide>
                  ))
                : items.map((t) => (
                    <SwiperSlide key={t.id} className={tournamentCardSlideClass}>
                      <TournamentCard tournament={t} />
                    </SwiperSlide>
                  ))}
            </Swiper>
          </div>
        </CarouselContainer>
        {!loading && items.length > 0 ? (
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
        ) : null}
      </div>
    </section>
  );
}
