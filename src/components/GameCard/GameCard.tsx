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
          className={`object-cover transition-all duration-300 group-hover:scale-[1.02] ${isLoaded ? "opacity-100" : "opacity-0"}`}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          unoptimized
        />
      </div>
      <div className="pointer-events-none absolute inset-0 z-[8] flex flex-col items-center justify-center p-3 text-center opacity-0 transition-opacity duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
        {/* Sem backdrop-blur — overlay sólido leve (muito mais barato na GPU) */}
        <div
          className="absolute inset-0 bg-[var(--color-background)]/55 transition-opacity"
          aria-hidden
        />
        <div className="relative z-[1] flex max-w-full flex-col items-center justify-center gap-1.5 md:gap-3">
          <span
            className={
              size === "small"
                ? "line-clamp-1 max-w-[95%] text-[9px] font-medium uppercase tracking-wide text-white/80"
                : "line-clamp-1 text-[10px] font-medium uppercase tracking-wide text-white/85 md:text-xs"
            }
          >
            {game.providerName ?? game.provider}
          </span>
          <p
            className={
              size === "small"
                ? "line-clamp-2 max-w-[95%] text-xs font-bold leading-tight text-white drop-shadow-md md:text-sm"
                : "line-clamp-2 max-w-[95%] text-sm font-bold leading-snug text-white drop-shadow-md md:text-base"
            }
          >
            {game.name}
          </p>
          <button
            type="button"
            onClick={handlePlay}
            className={`pointer-events-auto shrink-0 rounded-[10px] bg-[var(--color-accent)] font-bold text-[var(--color-accent-text)] shadow-lg transition-colors hover:bg-[var(--color-accent-secondary)] ${size === "small" ? "px-3 py-1.5 text-xs" : "px-5 py-2 text-sm"}`}
          >
            Jogar
          </button>
        </div>
      </div>
      {size !== "small" && (
        <div className="absolute right-2 top-2 z-[6] rounded-[8px] bg-black/60 px-2 py-0.5 text-xs text-white transition-opacity duration-300 group-hover:opacity-0">
          {game.providerName ?? game.provider}
        </div>
      )}
    </div>
  );
}
