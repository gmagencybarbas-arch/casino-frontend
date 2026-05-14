"use client";

import Image from "next/image";

/**
 * Arte local de torneios: <img> nativo (URLs /tournaments/torneio*.jpg fazem rewrite
 * para /images/tournaments/…; pasta /torneios legada ainda suportada).
 */
export function TournamentAssetMedia({
  src,
  alt,
  className,
  sizes,
  priority = false,
  fill,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
}) {
  const isTorneiosPublic = src.startsWith("/torneios/");
  const isTournamentPageJpeg = /^\/tournaments\/torneio\d+\.jpe?g$/i.test(src);
  const isRemote = src.startsWith("http");

  if (isTorneiosPublic || isTournamentPageJpeg) {
    const imgClass = fill
      ? `${className ?? ""} absolute inset-0 h-full w-full`.trim()
      : (className ?? "").trim();
    return (
      <img
        src={src}
        alt={alt}
        className={imgClass}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      className={className}
      sizes={sizes}
      priority={priority}
      unoptimized={isRemote}
    />
  );
}
