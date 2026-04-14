"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { PROVIDER_SHOWCASE_SLIDES, type ProviderShowcaseSlide } from "@/data/providerShowcase";
import type { Game } from "@/types/game";

interface ProviderShowcaseBannerProps {
  games: Game[];
}

/**
 * Prioriza jogos do provedor do slide; depois o resto.
 * Janela de 5 jogos desloca por slide para não repetir os mesmos cartões ao trocar de provedor.
 */
function pickGamesForSlide(
  slideIndex: number,
  slide: ProviderShowcaseSlide,
  pool: Game[],
  max: number,
  slideCount: number
): Game[] {
  if (pool.length === 0) return [];

  const same = pool.filter((g) => g.provider === slide.providerId);
  const other = pool.filter((g) => g.provider !== slide.providerId);
  const seen = new Set<string>();
  const ordered: Game[] = [];
  for (const g of [...same, ...other]) {
    if (!seen.has(g.id)) {
      seen.add(g.id);
      ordered.push(g);
    }
  }

  const n = ordered.length;
  if (n <= max) return ordered;

  const step = Math.max(max + 1, Math.ceil(n / Math.max(slideCount, 1)));
  const start = (slideIndex * step) % n;
  return Array.from({ length: max }, (_, i) => ordered[(start + i) % n]!);
}

function ShowcaseGameThumb({ game }: { game: Game }) {
  const src = game.thumbnailSmall ?? game.thumbnail;
  const remote = src.startsWith("http");
  return (
    <Link
      href={`/game/${game.slug}`}
      className="group relative block aspect-square w-full min-w-0 overflow-hidden rounded-xl bg-[var(--color-card)] shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
      aria-label={game.name}
    >
      <Image
        src={src}
        alt=""
        fill
        className="object-cover"
        sizes="(max-width: 768px) 28vw, 120px"
        unoptimized={remote}
      />
      <span
        className="absolute bottom-1.5 right-1.5 z-[2] flex h-7 w-7 items-center justify-center rounded-full bg-black/65 text-xs font-bold text-white backdrop-blur-sm ring-1 ring-white/15"
        aria-hidden
      >
        i
      </span>
    </Link>
  );
}

export function ProviderShowcaseBanner({ games }: ProviderShowcaseBannerProps) {
  const slides = PROVIDER_SHOWCASE_SLIDES;
  const [activeIndex, setActiveIndex] = useState(0);

  const active = slides[activeIndex] ?? slides[0];

  const rowGames = useMemo(() => {
    if (!active) return [];
    return pickGamesForSlide(activeIndex, active, games, 5, slides.length);
  }, [active, activeIndex, games, slides.length]);

  const goTo = useCallback((i: number) => {
    setActiveIndex(((i % slides.length) + slides.length) % slides.length);
  }, [slides.length]);

  const slidePrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const slideNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % slides.length);
  }, [slides.length]);

  if (slides.length === 0) return null;

  const navBtnClass =
    "flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white text-neutral-900 shadow-md ring-1 ring-black/10 transition hover:bg-white/90 md:h-10 md:w-10";

  return (
    <section
      className="relative mt-10 max-w-full overflow-x-clip overflow-hidden rounded-[12px] bg-[var(--color-card)] shadow-[var(--shadow-card)] ring-1 ring-[var(--color-border)]"
      aria-label="Destaques por provedor"
    >
      <div className="relative min-h-[300px] md:min-h-[380px] lg:min-h-[400px]">
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-500 ease-out ${
              i === activeIndex ? "z-0 opacity-100" : "pointer-events-none z-0 opacity-0"
            }`}
            aria-hidden={i !== activeIndex}
          >
            <Image
              src={s.background}
              alt=""
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority={i === 0}
              placeholder="blur"
            />
            <div className="pointer-events-none absolute inset-0 hidden md:block">
              <div
                className={`absolute bottom-0 right-0 flex h-[min(92%,480px)] w-[min(52%,min(480px,55vw))] min-h-[260px] min-w-[220px] items-end justify-end ${
                  i === activeIndex ? "provider-showcase-char" : ""
                }`}
              >
                <div className="relative h-full w-full translate-x-1 translate-y-1 scale-[1.06] [@media(min-width:1024px)]:scale-[1.12]">
                  <Image
                    src={s.character}
                    alt=""
                    fill
                    className="object-contain object-bottom object-right drop-shadow-[0_8px_32px_rgba(0,0,0,0.45)]"
                    sizes="(min-width: 1024px) 480px, 400px"
                    placeholder="blur"
                    priority={i === 0}
                  />
                </div>
              </div>
              <div
                className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 via-black/15 to-transparent lg:h-28"
                aria-hidden
              />
            </div>
          </div>
        ))}

        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/78 via-black/48 to-black/25" aria-hidden />

        <div className="relative z-[2] flex flex-col gap-5 p-4 pb-6 md:gap-6 md:p-6 md:pb-8">
          {/* Provedores: estado local (sem Swiper) — setas sempre funcionam */}
          <div className="relative isolate flex items-center justify-center gap-2 md:gap-3">
            <button type="button" onClick={slidePrev} className={navBtnClass} aria-label="Provedor anterior">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex min-w-0 flex-1 items-stretch justify-center gap-2 sm:gap-3 md:max-w-2xl md:gap-4">
              {slides.map((slide, i) => {
                const isActive = i === activeIndex;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => goTo(i)}
                    className={`provider-showcase-provider-card flex min-w-0 flex-1 flex-col items-center justify-center gap-1.5 rounded-xl border px-2 py-2.5 sm:gap-2 sm:px-3 sm:py-3 md:max-w-[200px] md:px-4 md:py-4 ${
                      isActive
                        ? "scale-100 border-white/35 bg-black/65 shadow-lg ring-1 ring-white/30"
                        : "scale-[0.96] border-transparent bg-black/38 opacity-[0.75] hover:opacity-95"
                    }`}
                  >
                    <span className="text-center text-[10px] font-bold uppercase leading-tight tracking-wide text-white sm:text-xs md:text-sm">
                      {slide.providerName}
                    </span>
                    <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-neutral-900 sm:px-3 sm:py-1 sm:text-[11px] md:text-xs">
                      {slide.displayGameCount} Jogos
                    </span>
                  </button>
                );
              })}
            </div>

            <button type="button" onClick={slideNext} className={navBtnClass} aria-label="Próximo provedor">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Jogos: ~80–82% largura em tablet/desktop — ~18–20% livre à direita para a personagem */}
          <div
            key={`${active.id}-${activeIndex}`}
            className="provider-showcase-games-in relative z-[2] w-full min-w-0 md:w-[82%] md:max-w-[82%] lg:w-[80%] lg:max-w-[80%]"
          >
            <div className="grid min-w-0 grid-cols-3 gap-2 md:grid-cols-5 md:gap-3">
              {rowGames.map((g, idx) => (
                <div key={`${active.id}-${g.id}`} className={idx >= 3 ? "hidden min-w-0 md:block" : "min-w-0"}>
                  <ShowcaseGameThumb game={g} />
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-[2] w-full text-center md:w-[82%] lg:w-[80%]">
            <Link
              href={active.allGamesHref}
              className="inline-flex items-center gap-1 text-sm font-semibold text-white/95 underline-offset-4 transition hover:text-[var(--color-primary)] hover:underline"
            >
              Todos os jogos de {active.providerName}
              <span aria-hidden>›</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
