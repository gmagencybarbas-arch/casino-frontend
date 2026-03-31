export type BlockType =
  | "featured_games"
  | "recommended_games"
  | "live_casino"
  | "popular_games"
  | "top10"
  | "providers"
  | "featured"
  | "slider";

export interface LayoutBlock {
  type: BlockType;
  position?: number;
  title?: string;
  category?: string;
  categoryId?: string;
  config?: Record<string, unknown>;
}

export interface LayoutConfig {
  blocks: LayoutBlock[];
}
