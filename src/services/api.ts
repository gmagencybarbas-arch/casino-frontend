/**
 * Mock API layer - Replace with real API calls when backend is available
 * All endpoints are designed for future white-label backend integration
 */

import type { Game, Provider } from "@/types/game";
import type { LayoutConfig } from "@/types/layout";
import slide1 from "@/components/BannerSlider/slides/slide1.jpg";
import slide2 from "@/components/BannerSlider/slides/slide2.jpg";
import slide3 from "@/components/BannerSlider/slides/slide3.jpg";

// Imagens locais dos jogos (175x175 e 245x367) em /public/gamecard_img/
const IMG_245 = ["gatesof.jpg", "bonanza.jpg", "aviator.jpg", "frabbit.jpg", "futebollfiver.jpg", "span.jpg", "bigbass.jpg", "ftiger.jpg"];
const IMG_175 = ["quadrado01.avif", "quadrado02.avif", "quadrado03.avif", "quadrado04.avif", "quadrado05.avif", "quadrado06.avif", "quadrado07.avif", "quadrado08.avif", "quadrado09.avif", "quadrado10.avif", "quadrado11.avif", "quadrado12.avif"];
const baseUrl = ""; // Next.js serve public em /

function thumb(index: number) {
  return `/gamecard_img/245x367/${IMG_245[index % IMG_245.length]}`;
}
function thumbSmall(index: number) {
  return `/gamecard_img/175x175/${IMG_175[index % IMG_175.length]}`;
}

// Simulated network delay (0 em dev — menos espera; mantém delay em produção para mocks)
const delay = (ms: number) =>
  process.env.NODE_ENV === "development"
    ? Promise.resolve()
    : new Promise<void>((resolve) => setTimeout(resolve, ms));

const MOCK_GAMES: Game[] = [
  { id: "1", name: "Gates of Olympus", slug: "gates-of-olympus", thumbnail: thumb(0), thumbnailSmall: thumbSmall(0), provider: "pragmatic-play", providerName: "Pragmatic Play", isFavorite: false, isHot: true },
  { id: "2", name: "Sweet Bonanza", slug: "sweet-bonanza", thumbnail: thumb(1), thumbnailSmall: thumbSmall(1), provider: "pragmatic-play", providerName: "Pragmatic Play", isFavorite: true, isHot: true },
  { id: "3", name: "Aviator", slug: "aviator", thumbnail: thumb(2), thumbnailSmall: thumbSmall(2), provider: "spribe", providerName: "Spribe", isFavorite: false, isHot: true },
  { id: "4", name: "Lightning Roulette", slug: "lightning-roulette", thumbnail: thumb(3), thumbnailSmall: thumbSmall(3), provider: "evolution", providerName: "Evolution", isFavorite: false, isHot: true },
  { id: "5", name: "Crazy Time", slug: "crazy-time", thumbnail: thumb(4), thumbnailSmall: thumbSmall(4), provider: "evolution", providerName: "Evolution", isFavorite: true, isHot: true },
  { id: "6", name: "Wanted Dead or Wild", slug: "wanted-dead-or-wild", thumbnail: thumb(5), thumbnailSmall: thumbSmall(5), provider: "hacksaw", providerName: "Hacksaw", isFavorite: false, isHot: true },
  { id: "7", name: "Big Bass Bonanza", slug: "big-bass-bonanza", thumbnail: thumb(6), thumbnailSmall: thumbSmall(6), provider: "pragmatic-play", providerName: "Pragmatic Play", isFavorite: false, isHot: true },
  { id: "8", name: "Mines", slug: "mines", thumbnail: thumb(7), thumbnailSmall: thumbSmall(7), provider: "spribe", providerName: "Spribe", isFavorite: false, isHot: true },
  { id: "9", name: "Blackjack Live", slug: "blackjack-live", thumbnail: thumb(0), thumbnailSmall: thumbSmall(8), provider: "evolution", providerName: "Evolution", isFavorite: true, isHot: true },
  { id: "10", name: "Spaceman", slug: "spaceman", thumbnail: thumb(1), thumbnailSmall: thumbSmall(9), provider: "pragmatic-play", providerName: "Pragmatic Play", isFavorite: false, isHot: true },
  { id: "11", name: "Sugar Rush", slug: "sugar-rush", thumbnail: thumb(2), thumbnailSmall: thumbSmall(10), provider: "pragmatic-play", providerName: "Pragmatic Play", isFavorite: false, isHot: true },
  { id: "12", name: "Plinko", slug: "plinko", thumbnail: thumb(3), thumbnailSmall: thumbSmall(11), provider: "spribe", providerName: "Spribe", isFavorite: false, isHot: true },
  { id: "13", name: "Starlight Princess", slug: "starlight-princess", thumbnail: thumb(4), thumbnailSmall: thumbSmall(0), provider: "pragmatic-play", providerName: "Pragmatic Play", isFavorite: false, isHot: true },
  { id: "14", name: "Dragon's Fire", slug: "dragons-fire", thumbnail: thumb(5), thumbnailSmall: thumbSmall(1), provider: "pragmatic-play", providerName: "Pragmatic Play", isFavorite: false, isHot: true },
  { id: "15", name: "Fortune Tiger", slug: "fortune-tiger", thumbnail: thumb(6), thumbnailSmall: thumbSmall(2), provider: "pragmatic-play", providerName: "Pragmatic Play", isFavorite: false, isHot: true },
  { id: "16", name: "Wild Bandito", slug: "wild-bandito", thumbnail: thumb(7), thumbnailSmall: thumbSmall(3), provider: "pragmatic-play", providerName: "Pragmatic Play", isFavorite: false, isHot: true },
  { id: "17", name: "Sugar Rush 1000", slug: "sugar-rush-1000", thumbnail: thumb(0), thumbnailSmall: thumbSmall(4), provider: "pragmatic-play", providerName: "Pragmatic Play", isFavorite: false, isHot: true },
  { id: "18", name: "Gates of Olympus 1000", slug: "gates-olympus-1000", thumbnail: thumb(1), thumbnailSmall: thumbSmall(5), provider: "pragmatic-play", providerName: "Pragmatic Play", isFavorite: false, isHot: true },
  { id: "19", name: "The Dog House", slug: "the-dog-house", thumbnail: thumb(2), thumbnailSmall: thumbSmall(6), provider: "pragmatic-play", providerName: "Pragmatic Play", isFavorite: false, isHot: true },
  { id: "20", name: "Baccarat Live", slug: "baccarat-live", thumbnail: thumb(3), thumbnailSmall: thumbSmall(7), provider: "evolution", providerName: "Evolution", isFavorite: false, isHot: false },
  { id: "21", name: "Roulette Ao Vivo", slug: "roulette-live", thumbnail: thumb(4), thumbnailSmall: thumbSmall(8), provider: "evolution", providerName: "Evolution", isFavorite: false, isHot: false },
  { id: "22", name: "Dream Catcher Live", slug: "dream-catcher-live", thumbnail: thumb(5), thumbnailSmall: thumbSmall(9), provider: "evolution", providerName: "Evolution", isFavorite: false, isHot: false },
  { id: "23", name: "Monopoly Live", slug: "monopoly-live", thumbnail: thumb(6), thumbnailSmall: thumbSmall(10), provider: "evolution", providerName: "Evolution", isFavorite: false, isHot: false },
  { id: "24", name: "Mega Ball Live", slug: "mega-ball-live", thumbnail: thumb(7), thumbnailSmall: thumbSmall(11), provider: "evolution", providerName: "Evolution", isFavorite: false, isHot: false },
  { id: "25", name: "Video Bingo Aurora", slug: "video-bingo-aurora", thumbnail: thumb(0), thumbnailSmall: thumbSmall(0), provider: "videobingo", providerName: "Videobingo", isFavorite: false, isHot: false },
  { id: "26", name: "Mega Bingo Live", slug: "mega-bingo-live", thumbnail: thumb(1), thumbnailSmall: thumbSmall(1), provider: "videobingo", providerName: "Videobingo", isFavorite: false, isHot: false },
  { id: "27", name: "Bingo Brasil Show", slug: "bingo-brasil-show", thumbnail: thumb(2), thumbnailSmall: thumbSmall(2), provider: "videobingo", providerName: "Videobingo", isFavorite: true, isHot: false },
  { id: "28", name: "Pachinko Bingo Gold", slug: "pachinko-bingo-gold", thumbnail: thumb(3), thumbnailSmall: thumbSmall(3), provider: "videobingo", providerName: "Videobingo", isFavorite: false, isHot: false },
  { id: "29", name: "Salão Bingo Royal", slug: "salao-bingo-royal", thumbnail: thumb(4), thumbnailSmall: thumbSmall(4), provider: "videobingo", providerName: "Videobingo", isFavorite: false, isHot: false },
  { id: "30", name: "Bingo Relâmpago", slug: "bingo-relampago", thumbnail: thumb(5), thumbnailSmall: thumbSmall(5), provider: "videobingo", providerName: "Videobingo", isFavorite: false, isHot: false },
  { id: "31", name: "Showball Bingo Plus", slug: "showball-bingo-plus", thumbnail: thumb(6), thumbnailSmall: thumbSmall(6), provider: "videobingo", providerName: "Videobingo", isFavorite: false, isHot: false },
  { id: "32", name: "Video Bingo Estrela", slug: "video-bingo-estrela", thumbnail: thumb(7), thumbnailSmall: thumbSmall(7), provider: "videobingo", providerName: "Videobingo", isFavorite: false, isHot: false },
];

const MOCK_PROVIDERS: Provider[] = [
  { id: "pragmatic-play", name: "Pragmatic Play", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/120px-Google_2015_logo.svg.png" },
  { id: "evolution", name: "Evolution", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/120px-BMW.svg.png" },
  { id: "spribe", name: "Spribe", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282019%29.svg/120px-Microsoft_logo_%282019%29.svg.png" },
  { id: "hacksaw", name: "Hacksaw", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Unity_Technologies_logo.svg/120px-Unity_Technologies_logo.svg.png" },
];

const MOCK_LAYOUT: LayoutConfig = {
  blocks: [
    { type: "featured_games", title: "Jogos de Cassino Recomendados", category: "hot", position: 1 },
    { type: "live_casino", title: "Cassino ao Vivo", category: "live", position: 2 },
    { type: "popular_games", title: "Jogos Populares", category: "popular", position: 3 },
    { type: "top10", title: "Top 10 Brasil", category: "top10", position: 4 },
    { type: "providers", title: "Provedores", position: 5 },
  ],
};

function slugHash(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i += 1) h = (h * 31 + slug.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function slugToTitle(slug: string): string {
  const parts = slug.split("-").filter(Boolean);
  if (parts.length === 0) return "Jogo";
  return parts.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

function buildFallbackGame(slug: string): Game {
  const h = slugHash(slug);
  const i = h % IMG_245.length;
  const j = h % IMG_175.length;
  return {
    id: `gen-${slug}`,
    name: slugToTitle(slug),
    slug,
    thumbnail: thumb(i),
    thumbnailSmall: thumbSmall(j),
    provider: "demo",
    providerName: "Demo",
    isFavorite: false,
    isHot: false,
  };
}

function inferGameType(g: Game): "Slot" | "Live" | "Crash" {
  const s = g.slug.toLowerCase();
  if (["aviator", "spaceman", "mines", "plinko"].some((x) => s.includes(x))) return "Crash";
  if (s.includes("live") || g.provider === "evolution") return "Live";
  return "Slot";
}

const TAG_POOL = ["#Recomendado", "#Rodadas grátis", "#Cashback", "#Popular"];

function enrichGameDetail(g: Game): Game {
  const h = slugHash(g.slug);
  const gameType = g.gameType ?? inferGameType(g);
  const rtp = g.rtp ?? `96.${(h % 8) + 1}%`;
  const houseEdge = g.houseEdge ?? `${Math.min(5, 2 + (h % 3))}.${(h >> 3) % 10}%`;

  const description =
    g.description ??
    `Experimente ${g.name} na nossa plataforma. Título ${gameType === "Live" ? "ao vivo com crupiê profissional" : gameType === "Crash" ? "estilo crash com multiplicadores dinâmicos" : "de slot com mecânica certificada e entretenimento imersivo"}, desenvolvido por ${g.providerName ?? g.provider}.`;

  const tags =
    g.tags && g.tags.length > 0
      ? g.tags
      : [TAG_POOL[h % TAG_POOL.length], TAG_POOL[(h + 2) % TAG_POOL.length]];

  return {
    ...g,
    rtp,
    houseEdge,
    description,
    gameType,
    tags,
  };
}

function getGamesByCategory(category: string): Game[] {
  switch (category) {
    case "hot":
      return MOCK_GAMES.filter((g) => g.isHot);
    case "live":
      return MOCK_GAMES.filter((g) =>
        ["lightning-roulette", "crazy-time", "blackjack-live", "baccarat-live", "roulette-live", "dream-catcher-live", "monopoly-live", "mega-ball-live"].includes(g.slug)
      );
    case "popular":
      return MOCK_GAMES;
    case "top10":
      return MOCK_GAMES.slice(0, 10);
    default:
      return MOCK_GAMES;
  }
}

const GAMES_PER_PAGE = 20;

export const api = {
  async getLayout(): Promise<LayoutConfig> {
    await delay(100);
    return MOCK_LAYOUT;
  },

  async getAllGames(): Promise<Game[]> {
    await delay(50);
    return [...MOCK_GAMES];
  },

  async getGames(category?: string, options?: { limit?: number; offset?: number }): Promise<Game[]> {
    await delay(150);
    let list = category ? getGamesByCategory(category) : MOCK_GAMES;
    const limit = options?.limit ?? GAMES_PER_PAGE;
    const offset = options?.offset ?? 0;
    return list.slice(offset, offset + limit);
  },

  async getGamesPaginated(category?: string, offset = 0): Promise<{ games: Game[]; hasMore: boolean }> {
    const list = category ? getGamesByCategory(category) : MOCK_GAMES;
    const games = list.slice(offset, offset + GAMES_PER_PAGE);
    return { games, hasMore: offset + games.length < list.length };
  },

  async getGameBySlug(slug: string): Promise<Game | null> {
    await delay(80);
    const trimmed = slug?.trim();
    if (!trimmed) return null;
    const base = MOCK_GAMES.find((g) => g.slug === trimmed) ?? buildFallbackGame(trimmed);
    return enrichGameDetail(base);
  },

  async getRelatedGames(slug: string, limit = 8): Promise<Game[]> {
    await delay(80);
    const game = MOCK_GAMES.find((g) => g.slug === slug);
    const others = MOCK_GAMES.filter((g) => g.slug !== slug);
    if (!game) return others.slice(0, limit);
    const sameProv = others.filter((g) => g.provider === game.provider);
    if (sameProv.length >= limit) return sameProv.slice(0, limit);
    const rest = others.filter((g) => g.provider !== game.provider);
    return [...sameProv, ...rest].slice(0, limit);
  },

  async getProviders(): Promise<Provider[]> {
    await delay(100);
    return MOCK_PROVIDERS;
  },

  async getBanners(): Promise<{ id: string; image: string; link: string; title: string }[]> {
    await delay(100);
    return [
      {
        id: "1",
        image: slide1.src,
        link: "/promo/1",
        title: "Welcome Bonus",
      },
      {
        id: "2",
        image: slide2.src,
        link: "/promo/2",
        title: "Free Spins",
      },
      {
        id: "3",
        image: slide3.src,
        link: "/promo/3",
        title: "Cashback",
      },
      {
        id: "4",
        image: slide1.src,
        link: "/promo/4",
        title: "Reload Bonus",
      },
      {
        id: "5",
        image: slide2.src,
        link: "/promo/5",
        title: "Weekend Special",
      },
    ];
  },

  async getSidebarBanner(): Promise<{ id: string; image: string; link: string; title: string } | null> {
    await delay(80);
    return {
      id: "sb1",
      image: "/promo/sidebar-tigre-da-sorte.png",
      link: "/promo/sidebar",
      title: "Tigre da Sorte",
    };
  },
};
