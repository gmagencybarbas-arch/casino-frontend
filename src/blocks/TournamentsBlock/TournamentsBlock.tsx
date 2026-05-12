"use client";

import type { TournamentsBlockConfig } from "@/types/tournament";
import { TournamentSectionSlider } from "@/components/Tournaments/TournamentSectionSlider";

export interface TournamentsBlockProps {
  title?: string;
  config?: TournamentsBlockConfig | Record<string, unknown>;
}

export function TournamentsBlock({ title, config }: TournamentsBlockProps) {
  const c = config as TournamentsBlockConfig | undefined;
  const limit = typeof c?.limit === "number" ? c.limit : 6;
  const subtitle = typeof c?.subtitle === "string" ? c.subtitle : undefined;

  return (
    <TournamentSectionSlider
      key={`${limit}-${subtitle ?? ""}`}
      title={title ?? "Torneios"}
      subtitle={subtitle}
      limit={limit}
    />
  );
}
