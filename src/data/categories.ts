export interface GameCategoryConfig {
  slug: string;
  label: string;
  icon: string;
}

export const categories: GameCategoryConfig[] = [
  { slug: "all", label: "Todos", icon: "🎮" },
  { slug: "slots", label: "Jogos de Slots", icon: "🎰" },
  { slug: "live", label: "Cassino ao Vivo", icon: "🎥" },
  { slug: "videobingo", label: "Videobingo", icon: "🎯" },
  { slug: "crash", label: "Jogos Crash", icon: "🚀" },
  { slug: "favorites", label: "Favoritos", icon: "⭐" },
  { slug: "sports", label: "Apostas ao vivo", icon: "⚽" },
];

export function getCategoryBySlug(slug: string): GameCategoryConfig | undefined {
  return categories.find((c) => c.slug === slug);
}
