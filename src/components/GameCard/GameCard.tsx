"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import type { Game } from "@/types/game";

const CARD_RATIO = 245 / 367;

interface GameCardProps {
  game: Game;
  size?: "default" | "large" | "featured" | "small";
  rank?: number;
  className?: string;
}

export function GameCard({ game, size = "default", rank, className = "" }: GameCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handlePlay = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      console.log("Play game:", game.slug);
    },
    [game.slug]
  );

  // featured = 245×367 (card destaque), large = 280px width, small = 175×175
  const width =
    size === "featured" ? 245 : size === "large" ? 280 : size === "small" ? 175 : 200;
  const aspectRatio = size === "small" ? 1 : size === "featured" ? CARD_RATIO : CARD_RATIO;

  return (
    <div
      className={`group relative overflow-hidden rounded-[12px] bg-[var(--color-card)] shadow-[var(--shadow-card)] transition-all duration-300 hover:scale-[1.04] hover:shadow-[var(--shadow-card-hover)] ${className}`}
      style={{ aspectRatio: String(aspectRatio) }}
    >
      {rank !== undefined && (
        <div
          className="absolute left-2 top-2 z-10 text-5xl font-black text-white/90 drop-shadow-lg"
          style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
        >
          {rank}
        </div>
      )}
      <div className="relative w-full overflow-hidden" style={{ paddingBottom: `${100 / aspectRatio}%` }}>
        <Image
          src={size === "small" && game.thumbnailSmall ? game.thumbnailSmall : game.thumbnail}
          alt={game.name}
          fill
          sizes={
            size === "small"
              ? `(max-width: 768px) 130px, ${width}px`
              : size === "featured"
                ? `(max-width: 1023px) 34vw, 245px`
                : `(max-width: 1023px) 34vw, 190px`
          }
          className={`object-cover transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          unoptimized
        />
      </div>
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-0 transition-all duration-300 group-hover:opacity-100">
        <div className={size === "small" ? "p-2" : "p-3"}>
          {size !== "small" && (
            <span className="mb-1 block text-xs font-medium text-white/80">{game.providerName ?? game.provider}</span>
          )}
          <p className={size === "small" ? "mb-1 line-clamp-2 text-xs font-semibold text-white" : "mb-2 line-clamp-2 text-sm font-semibold text-white"}>{game.name}</p>
          <button
            onClick={handlePlay}
            className={`flex w-full items-center justify-center rounded-[10px] bg-[var(--color-accent)] font-bold text-[var(--color-accent-text)] transition-colors hover:bg-[var(--color-accent-secondary)] ${size === "small" ? "px-2 py-1.5 text-xs" : "px-4 py-2 text-sm"}`}
          >
            Jogar
          </button>
        </div>
      </div>
      {size !== "small" && (
      <div className="absolute right-2 top-2 rounded-[8px] bg-black/60 px-2 py-0.5 text-xs text-white">
        {game.providerName ?? game.provider}
      </div>
      )}
    </div>
  );
}
