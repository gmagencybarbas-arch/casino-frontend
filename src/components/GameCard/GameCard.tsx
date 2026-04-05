"use client";

import Image from "next/image";
import { useCallback, useMemo } from "react";
import type { Game } from "@/types/game";

const CARD_RATIO = 245 / 367;

interface GameCardProps {
  game: Game;
  size?: "default" | "large" | "featured" | "small";
  rank?: number;
  className?: string;
  /** Primeiras imagens da grelha: carregamento prioritário (mais rápido acima da dobra). */
  priority?: boolean;
  /** Listagens densas (ex.: cassino ao vivo): usa thumbnail 175px quando existir — menos bytes, mesma proporção com object-cover. */
  listingThumbnail?: boolean;
}

export function GameCard({
  game,
  size = "default",
  rank,
  className = "",
  priority = false,
  listingThumbnail = false,
}: GameCardProps) {
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

  const imageSrc = useMemo(() => {
    if (size === "small" && game.thumbnailSmall) return game.thumbnailSmall;
    if (listingThumbnail && game.thumbnailSmall) return game.thumbnailSmall;
    return game.thumbnail;
  }, [game.thumbnail, game.thumbnailSmall, listingThumbnail, size]);

  const isRemote = imageSrc.startsWith("http");

  const sizesAttr = useMemo(() => {
    if (size === "small") {
      return `(max-width: 640px) 34vw, (max-width: 768px) 130px, ${width}px`;
    }
    if (size === "featured") {
      return `(max-width: 1023px) 34vw, 245px`;
    }
    if (listingThumbnail) {
      return `(max-width: 640px) 34vw, (max-width: 1024px) 24vw, 200px`;
    }
    return `(max-width: 640px) 34vw, (max-width: 1023px) 28vw, 190px`;
  }, [size, listingThumbnail, width]);

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
      <div
        className="relative w-full overflow-hidden bg-[var(--color-card)]"
        style={{ paddingBottom: `${100 / aspectRatio}%` }}
      >
        <Image
          src={imageSrc}
          alt={game.name}
          fill
          sizes={sizesAttr}
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          loading={priority ? "eager" : "lazy"}
          priority={priority}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          unoptimized={isRemote}
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
