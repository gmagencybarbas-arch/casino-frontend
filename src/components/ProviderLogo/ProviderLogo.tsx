"use client";

import Image from "next/image";
import type { Provider } from "@/types/game";

interface ProviderLogoProps {
  provider: Provider;
  size?: "sm" | "md" | "lg";
  showName?: boolean;
  className?: string;
}

export function ProviderLogo({ provider, size = "md", showName = false, className = "" }: ProviderLogoProps) {
  const sizeMap = { sm: { w: 80, h: 40 }, md: { w: 120, h: 60 }, lg: { w: 160, h: 80 } };
  const { w, h } = sizeMap[size];
  return (
    <div
      className={`flex flex-col items-center justify-center overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-4 transition-all duration-200 hover:scale-105 hover:border-[var(--color-accent)] ${className}`}
    >
      <Image
        src={provider.logo}
        alt={provider.name}
        width={w}
        height={h}
        className="object-contain"
        loading="lazy"
        unoptimized
      />
      {showName && (
        <span className="mt-2 text-xs font-medium text-[var(--color-text)]">{provider.name}</span>
      )}
    </div>
  );
}
