"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { GameCard } from "@/components/GameCard";
import { CarouselContainer } from "@/components/CarouselContainer";
import { api } from "@/services/api";
import { useGlobalModal } from "@/store/useGlobalModal";
import { useHeaderAuthPreviewStore } from "@/store/useHeaderAuthPreviewStore";
import { RELATED_GAMES_SLIDER, relatedGameSlideClass } from "@/lib/rectangularGameSwiper";
import type { Game } from "@/types/game";
import "swiper/css";

const ProvidersBlock = dynamic(
  () => import("@/blocks/ProvidersBlock").then((m) => ({ default: m.ProvidersBlock })),
  { loading: () => <div className="mb-12 h-32 animate-pulse rounded-xl bg-[var(--color-card)]" /> }
);

function slideNextInfinite(s: SwiperType) {
  if (s.isEnd) s.slideTo(0);
  else s.slideNext();
}

function slidePrevInfinite(s: SwiperType) {
  if (s.isBeginning) s.slideTo(s.slides.length - 1);
  else s.slidePrev();
}

function slugHash(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i += 1) h = (h * 31 + slug.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function randInt(min: number, max: number): number {
  return Math.floor(min + Math.random() * (max - min + 1));
}

const FAKE_NAMES = ["joao123", "maria77", "playerX", "lucasbet"] as const;

type WinToast = { id: number; player: string; amount: number; gameLabel: string };

interface GamePlayerProps {
  game: Game;
}

/** Estilo comum aos CTAs — pulso suave + hover */
const ctaLiveBase =
  "game-cta-live w-full bg-[var(--color-primary)] font-bold text-black shadow-[0_0_18px_-4px_color-mix(in_srgb,var(--color-primary)_35%,transparent)] transition-all duration-300 hover:scale-105 hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]";

export function GamePlayer({ game }: GamePlayerProps) {
  const [relatedGames, setRelatedGames] = useState<Game[]>([]);
  const [showGameFrame, setShowGameFrame] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [favorite, setFavorite] = useState(game.isFavorite ?? false);
  const [livePlayers, setLivePlayers] = useState(() => randInt(80, 250));
  const initialLiveWins = useMemo(() => randInt(1000, 10000), [game.slug]);
  const targetLiveWinsRef = useRef(initialLiveWins);
  const [displayLiveWins, setDisplayLiveWins] = useState(initialLiveWins);
  const [toast, setToast] = useState<WinToast | null>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const iframeRef = useRef<HTMLDivElement | null>(null);
  const relatedSwiperRef = useRef<SwiperType | null>(null);

  const isGuestPreview = useHeaderAuthPreviewStore((s) => s.isGuestPreview);
  const openModal = useGlobalModal((s) => s.open);

  const isLogged = !isGuestPreview;

  useEffect(() => {
    setFavorite(game.isFavorite ?? false);
  }, [game.slug, game.isFavorite]);

  useEffect(() => {
    const v = randInt(1000, 10000);
    targetLiveWinsRef.current = v;
    setDisplayLiveWins(v);
    setLivePlayers(randInt(80, 250));
  }, [game.slug]);

  useEffect(() => {
    api.getRelatedGames(game.slug, 12).then(setRelatedGames);
  }, [game.slug]);

  useEffect(() => {
    const id = setInterval(() => {
      setLivePlayers((n) => Math.max(55, Math.min(320, n + randInt(-12, 18))));
    }, 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      targetLiveWinsRef.current += randInt(120, 2400);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setDisplayLiveWins((d) => {
        const t = targetLiveWinsRef.current;
        const step = (t - d) * 0.16;
        if (Math.abs(t - d) < 1.5) return t;
        return d + step;
      });
    }, 42);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let cancelled = false;
    let nextTimer: ReturnType<typeof setTimeout>;

    const schedule = () => {
      nextTimer = setTimeout(() => {
        if (cancelled) return;
        const name = FAKE_NAMES[randInt(0, FAKE_NAMES.length - 1)];
        const amount = randInt(20, 500);
        const pool =
          relatedGames.length > 0
            ? [game.name, ...relatedGames.slice(0, 10).map((g) => g.name)]
            : [game.name];
        const gameLabel = pool[randInt(0, pool.length - 1)] ?? game.name;
        setToast({ id: Date.now(), player: name, amount, gameLabel });
        setToastVisible(true);
        setTimeout(() => {
          if (!cancelled) setToastVisible(false);
        }, 3000);
        setTimeout(() => {
          if (!cancelled) setToast(null);
        }, 3300);
        schedule();
      }, randInt(4000, 8000));
    };

    schedule();
    return () => {
      cancelled = true;
      clearTimeout(nextTimer);
    };
  }, [game.name, relatedGames]);

  const stats = useMemo(() => {
    const h = slugHash(game.slug);
    const paid = ((h % 900_000) + 50_000) / 100;
    const recent = (h % 95) + 12;
    return {
      paidToday: paid.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }),
      recentPlays: recent,
    };
  }, [game.slug]);

  const iframeSrc = game.gameUrl ?? `https://example.com/demo?game=${encodeURIComponent(game.slug)}`;
  const imageSrc = game.thumbnail;
  const isRemote = imageSrc.startsWith("http");

  const handlePrimaryAction = useCallback(() => {
    if (!isLogged) {
      openModal("login");
      return;
    }
    setShowGameFrame(true);
    setTimeout(() => iframeRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  }, [isLogged, openModal]);

  const handleShare = useCallback(async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({ title: game.name, url });
      } else {
        await navigator.clipboard.writeText(url);
      }
    } catch {
      /* noop */
    }
  }, [game.name]);

  const winsFormatted = useMemo(
    () =>
      displayLiveWins.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        maximumFractionDigits: 0,
      }),
    [displayLiveWins]
  );

  return (
    <div className="w-full min-w-0 max-w-full overflow-x-clip [overscroll-behavior-x:none] touch-pan-y">
      {/* Breadcrumb */}
      <nav className="mb-4 flex flex-wrap items-center gap-4 text-sm text-[var(--color-text-muted)]" aria-label="Navegação">
        <Link href="/games/slots" className="transition-colors hover:text-[var(--color-primary)]">
          Slots
        </Link>
        <span aria-hidden className="text-[var(--color-border)]">
          /
        </span>
        <span className="font-medium text-[var(--color-text)]">{game.name}</span>
      </nav>

      {/* Toasts — vitórias fictícias (discretos) */}
      {toast && (
        <div
          className={`fixed bottom-20 left-3 z-[60] max-w-[min(100%,18rem)] rounded-lg border border-[var(--color-border)] bg-[var(--color-card)]/95 px-3 py-2 text-xs text-[var(--color-text)] shadow-lg backdrop-blur-sm transition-all duration-300 md:bottom-auto md:left-auto md:right-4 md:top-24 md:max-w-sm ${
            toastVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-1 opacity-0"
          }`}
          role="status"
        >
          <span aria-hidden className="mr-1">
            🤑
          </span>
          <span className="font-medium text-emerald-400">{toast.player}</span>
          <span className="text-[var(--color-text-muted)]"> ganhou </span>
          <span className="font-semibold text-[var(--color-primary)]">
            {toast.amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </span>
          <span className="text-[var(--color-text-muted)]"> em </span>
          <span className="line-clamp-1 font-medium">{toast.gameLabel}</span>
        </div>
      )}

      {/* Hero */}
      <section className="relative mb-6 w-full max-w-full overflow-hidden rounded-2xl md:mb-8" aria-label="Destaque do jogo">
        <div className="relative min-h-[280px] md:min-h-[360px]">
          <div
            className="absolute inset-0 scale-110 bg-cover bg-center blur-3xl"
            style={{ backgroundImage: `url(${imageSrc})` }}
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[var(--color-background)]/95 to-[var(--color-background)]" />

          <div className="relative z-[1] flex flex-col items-center px-4 pb-8 pt-10 md:px-8 md:pb-10 md:pt-12">
            <div className="relative w-full max-w-lg">
              <div className="absolute -right-1 -top-2 z-20 flex gap-2 md:right-0 md:top-0">
                <button
                  type="button"
                  onClick={() => setFavorite((f) => !f)}
                  className={`rounded-xl bg-black/40 p-2.5 backdrop-blur-sm transition-colors hover:bg-black/60 ${favorite ? "text-[var(--color-primary)]" : "text-white/85"}`}
                  aria-label={favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                  aria-pressed={favorite}
                >
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill={favorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={handleShare}
                  className="rounded-xl bg-black/40 p-2.5 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
                  aria-label="Partilhar"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                    />
                  </svg>
                </button>
              </div>

              <div className="relative overflow-hidden rounded-2xl bg-[var(--color-card)] p-4 shadow-lg transition-all duration-300 md:p-6">
                <div className="game-hero-live-shimmer" aria-hidden />
                <div className="relative z-[2]">
                  <div className="mb-3 flex items-center justify-center gap-2 text-xs text-green-400 md:text-sm">
                    <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-green-400" aria-hidden />
                    <span aria-live="polite">
                      <span className="font-semibold tabular-nums">{livePlayers}</span> jogando agora
                    </span>
                  </div>

                  <div className="relative mx-auto mb-4 aspect-[245/367] w-[min(100%,200px)] overflow-hidden rounded-xl transition-all duration-300 md:w-[220px]">
                    <Image
                      src={imageSrc}
                      alt={game.name}
                      fill
                      className="object-cover"
                      sizes="220px"
                      priority
                      unoptimized={isRemote}
                    />
                  </div>
                  <h1 className="text-balance text-center text-xl font-bold text-[var(--color-text)] md:text-2xl">{game.name}</h1>
                  <p className="mt-1 text-center text-sm text-[var(--color-text-muted)]">{game.providerName ?? game.provider}</p>

                  <p
                    className="mt-3 text-center text-xs text-green-400/95 md:text-sm"
                    aria-live="polite"
                  >
                    <span className="font-semibold tabular-nums">{winsFormatted}</span>
                    <span className="text-[var(--color-text-muted)]"> ganhos nos últimos minutos</span>
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-center text-xs transition-all duration-300 md:text-sm">
                    <div className="rounded-xl bg-[var(--color-background-secondary)] px-2 py-3 md:px-3">
                      <p className="text-[var(--color-text-muted)]">Pagos hoje</p>
                      <p className="mt-0.5 font-bold tabular-nums text-[var(--color-primary)]">{stats.paidToday}</p>
                    </div>
                    <div className="rounded-xl bg-[var(--color-background-secondary)] px-2 py-3 md:px-3">
                      <p className="text-[var(--color-text-muted)]">Nos últimos minutos</p>
                      <p className="mt-0.5 font-bold tabular-nums text-[var(--color-text)]">{stats.recentPlays} jogadas</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handlePrimaryAction}
                    className={`mt-6 ${ctaLiveBase} rounded-xl py-3.5 text-sm md:py-4 md:text-base`}
                  >
                    {isLogged ? "Jogar agora" : "Entrar para jogar"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Iframe após iniciar jogo (logado) */}
      {showGameFrame && (
        <div
          ref={iframeRef}
          className="mb-8 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-lg transition-all duration-300"
        >
          <div className="aspect-video w-full min-h-[240px] md:min-h-[420px]">
            <iframe
              src={iframeSrc}
              title={game.name}
              className="h-full w-full border-0"
              allow="fullscreen; autoplay"
            />
          </div>
        </div>
      )}

      {/* Info bar */}
      <section className="mb-6 text-left md:mb-8" aria-label="Informações do jogo">
        <h2 className="text-lg font-bold text-[var(--color-text)] md:text-xl">{game.name}</h2>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">{game.providerName ?? game.provider}</p>
        {game.tags && game.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {game.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--color-border)] bg-[var(--color-background-secondary)] px-3 py-1 text-xs font-medium text-[var(--color-text)]"
              >
                {tag.startsWith("#") ? tag : `#${tag}`}
              </span>
            ))}
          </div>
        )}
      </section>

      {/* Expandable */}
      <section className="mb-6 md:mb-8">
        <button
          type="button"
          onClick={() => setDetailsOpen((o) => !o)}
          className="flex w-full items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 text-left text-sm font-semibold text-[var(--color-text)] transition-all duration-300 hover:bg-[var(--color-background-secondary)] md:px-5"
          aria-expanded={detailsOpen}
        >
          Ver mais informações
          <svg
            className={`h-5 w-5 shrink-0 transition-transform ${detailsOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {detailsOpen && (
          <div className="mt-3 space-y-3 rounded-xl bg-[var(--color-card)] p-4 text-sm text-[var(--color-text-muted)] md:p-5">
            {game.description && <p className="leading-relaxed text-[var(--color-text)]">{game.description}</p>}
            <dl className="grid gap-2 sm:grid-cols-2">
              <div>
                <dt className="text-xs uppercase tracking-wide text-[var(--color-text-muted)]">RTP</dt>
                <dd className="font-semibold text-[var(--color-text)]">{game.rtp ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-[var(--color-text-muted)]">Margem da casa</dt>
                <dd className="font-semibold text-[var(--color-text)]">{game.houseEdge ?? "—"}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs uppercase tracking-wide text-[var(--color-text-muted)]">Tipo</dt>
                <dd className="font-semibold text-[var(--color-text)]">{game.gameType ?? "Slot"}</dd>
              </div>
            </dl>
          </div>
        )}
      </section>

      {/* CTA repetido (scroll) */}
      <div className="mb-10 md:mb-12">
        <button type="button" onClick={handlePrimaryAction} className={`${ctaLiveBase} rounded-2xl py-4 text-base`}>
          {isLogged ? "Jogar agora" : "Entrar para jogar"}
        </button>
      </div>

      {/* Jogos recomendados */}
      {relatedGames.length > 0 && (
        <section className="mb-12" aria-label="Jogos recomendados">
          <h2 className="mb-4 text-lg font-bold text-[var(--color-text)]">Jogos recomendados</h2>
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
                      <GameCard game={g} className="w-full shadow-lg transition-all duration-300 hover:scale-105" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </CarouselContainer>
            <button
              type="button"
              aria-label="Anterior"
              onClick={() => relatedSwiperRef.current && slidePrevInfinite(relatedSwiperRef.current)}
              className="absolute -left-1 top-1/2 z-40 hidden -translate-y-1/2 rounded-[12px] bg-[var(--color-card)] p-2.5 text-[var(--color-text)] shadow-[var(--shadow-card)] transition-all duration-300 hover:bg-[var(--color-primary)] hover:text-[var(--color-background)] md:-left-4 md:block"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Próximo"
              onClick={() => relatedSwiperRef.current && slideNextInfinite(relatedSwiperRef.current)}
              className="absolute -right-1 top-1/2 z-40 hidden -translate-y-1/2 rounded-[12px] bg-[var(--color-card)] p-2.5 text-[var(--color-text)] shadow-[var(--shadow-card)] transition-all duration-300 hover:bg-[var(--color-primary)] hover:text-[var(--color-background)] md:-right-4 md:block"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </section>
      )}

      <ProvidersBlock />
    </div>
  );
}
