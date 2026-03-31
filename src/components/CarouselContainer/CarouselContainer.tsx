"use client";

/**
 * Netflix-style carousel container.
 * - Outer overflow hidden to clip content
 * - Gradient fade overlays on edges (z-index above content)
 * - Content scrolls inside viewport only
 */
interface CarouselContainerProps {
  children: React.ReactNode;
  className?: string;
  /** Show fade overlays - default true */
  showFade?: boolean;
}

export function CarouselContainer({
  children,
  className = "",
  showFade = true,
}: CarouselContainerProps) {
  return (
    <div
      className={`relative w-full max-w-full min-w-0 overflow-hidden ${showFade ? "game-carousel-fade" : ""} ${className}`}
    >
      <div
        className={`relative min-w-0 max-w-full w-full ${showFade ? "game-carousel-fade-inner" : ""}`}
      >
        {children}
      </div>
    </div>
  );
}
