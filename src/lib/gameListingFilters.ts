import type { Game } from "@/types/game";

/** Mesma lógica de “live” usada na API mock. */
export const LIVE_GAME_SLUGS = new Set([
  "lightning-roulette",
  "crazy-time",
  "blackjack-live",
  "baccarat-live",
  "roulette-live",
  "dream-catcher-live",
  "monopoly-live",
  "mega-ball-live",
]);

export const CRASH_GAME_SLUGS = new Set(["aviator", "spaceman", "mines", "plinko"]);

/** Mock videobingo — slugs alinhados a entradas em `MOCK_GAMES` (api). */
export const VIDEOBINGO_GAME_SLUGS = new Set([
  "video-bingo-aurora",
  "mega-bingo-live",
  "bingo-brasil-show",
  "pachinko-bingo-gold",
  "salao-bingo-royal",
  "bingo-relampago",
  "showball-bingo-plus",
  "video-bingo-estrela",
]);

/** Mock: lista vazia até haver jogos de desporto no backend. */
export const SPORTS_GAME_SLUGS = new Set<string>([]);

export function filterGamesByListingCategory(games: Game[], categorySlug: string): Game[] {
  if (categorySlug === "all") return games;
  if (categorySlug === "favorites") return games.filter((g) => g.isFavorite);
  if (categorySlug === "live") return games.filter((g) => LIVE_GAME_SLUGS.has(g.slug));
  if (categorySlug === "videobingo") return games.filter((g) => VIDEOBINGO_GAME_SLUGS.has(g.slug));
  if (categorySlug === "crash") return games.filter((g) => CRASH_GAME_SLUGS.has(g.slug));
  if (categorySlug === "slots") {
    return games.filter(
      (g) =>
        !LIVE_GAME_SLUGS.has(g.slug) &&
        !CRASH_GAME_SLUGS.has(g.slug) &&
        !VIDEOBINGO_GAME_SLUGS.has(g.slug)
    );
  }
  if (categorySlug === "sports") return games.filter((g) => SPORTS_GAME_SLUGS.has(g.slug));
  return games;
}

/** Mapeia `category` dos blocos do layout para a rota `/games/[category]`. */
export function layoutBlockCategoryToGamesHref(blockCategory: string | undefined): string {
  const c = blockCategory ?? "all";
  if (c === "hot") return "/games/slots";
  if (c === "live") return "/games/live";
  if (c === "popular") return "/games/all";
  if (c === "top10") return "/games/all";
  return "/games/all";
}
