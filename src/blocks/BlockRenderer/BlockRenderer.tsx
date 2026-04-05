"use client";

import dynamic from "next/dynamic";
import type { LayoutBlock } from "@/types/layout";

const blockLoading = (
  <div className="mb-10 h-[300px] animate-pulse rounded-xl bg-[var(--color-card)]" />
);

const FeaturedGamesBlock = dynamic(
  () =>
    import("@/blocks/FeaturedGamesBlock").then((m) => ({
      default: m.FeaturedGamesBlock,
    })),
  { loading: () => blockLoading }
);

const GameSliderBlock = dynamic(
  () =>
    import("@/blocks/GameSliderBlock").then((m) => ({
      default: m.GameSliderBlock,
    })),
  { loading: () => blockLoading }
);

const Top10Block = dynamic(
  () =>
    import("@/blocks/Top10Block").then((m) => ({
      default: m.Top10Block,
    })),
  { loading: () => blockLoading }
);

const ProvidersBlock = dynamic(
  () =>
    import("@/blocks/ProvidersBlock").then((m) => ({
      default: m.ProvidersBlock,
    })),
  { loading: () => blockLoading }
);

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
    case "popular_games": {
      const isLive = block.type === "live_casino";
      return (
        <GameSliderBlock
          title={block.title ?? "Jogos"}
          category={block.category}
          icon={isLive ? "live" : "fire"}
        />
      );
    }
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
