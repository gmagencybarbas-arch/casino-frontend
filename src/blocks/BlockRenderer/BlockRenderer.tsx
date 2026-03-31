"use client";

import { FeaturedGamesBlock } from "@/blocks/FeaturedGamesBlock";
import { GameSliderBlock } from "@/blocks/GameSliderBlock";
import { Top10Block } from "@/blocks/Top10Block";
import { ProvidersBlock } from "@/blocks/ProvidersBlock";
import type { LayoutBlock } from "@/types/layout";

interface BlockRendererProps {
  block: LayoutBlock;
}

export function BlockRenderer({ block }: BlockRendererProps) {
  switch (block.type) {
    case "featured":
    case "featured_games":
    case "recommended_games":
      return (
        <FeaturedGamesBlock
          title={block.title ?? "Jogos Recomendados"}
          category={block.category ?? "hot"}
          icon="slot"
        />
      );
    case "slider":
    case "live_casino":
    case "popular_games":
      const isLive = block.type === "live_casino";
      return (
        <GameSliderBlock
          title={block.title ?? "Jogos"}
          category={block.category}
          icon={isLive ? "live" : "fire"}
        />
      );
    case "top10":
      return (
        <Top10Block
          title={block.title ?? "Top 10"}
          category={block.category ?? "top10"}
          icon="trophy"
        />
      );
    case "providers":
      return <ProvidersBlock />;
    default:
      return null;
  }
}
