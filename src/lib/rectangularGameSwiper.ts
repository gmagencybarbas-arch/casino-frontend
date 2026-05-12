/**
 * Sliders retangulares (exceto FeaturedGamesBlock). Desktop: capas menores que 245px.
 */
export const RECTANGULAR_GAME_SLIDER = {
  spaceBetween: 12,
  slidesPerView: 2.6,
  breakpoints: {
    768: { slidesPerView: 3.2, spaceBetween: 12 },
    1024: { slidesPerView: "auto" as const, spaceBetween: 10 },
  },
} as const;

/** Desktop lg+: ~190px de largura (FeaturedGamesBlock usa grid próprio, não isto) */
export const rectangularGameSlideClass =
  "!box-border !h-auto lg:!w-[190px] lg:min-w-[190px]";

/** Jogos relacionados: mesmo mobile/tablet; desktop mantém várias cartas por linha (como antes). */
export const RELATED_GAMES_SLIDER = {
  spaceBetween: 12,
  slidesPerView: 2.6,
  breakpoints: {
    768: { slidesPerView: 3.2, spaceBetween: 12 },
    1024: { slidesPerView: 6.8, spaceBetween: 14 },
  },
} as const;

export const relatedGameSlideClass = "!box-border !h-auto";

/** Slider de cards de torneio na home (largura fixa tipo carrossel de jogos). */
export const TOURNAMENT_CARD_SLIDER = {
  spaceBetween: 12,
  slidesPerView: 1.35,
  breakpoints: {
    480: { slidesPerView: 1.65, spaceBetween: 12 },
    640: { slidesPerView: 2.15, spaceBetween: 12 },
    1024: { slidesPerView: "auto" as const, spaceBetween: 14 },
  },
} as const;

export const tournamentCardSlideClass =
  "!box-border !h-auto !w-[min(88vw,300px)] min-w-[min(88vw,300px)] sm:!w-[280px] sm:min-w-[280px] lg:!w-[300px] lg:min-w-[300px]";
