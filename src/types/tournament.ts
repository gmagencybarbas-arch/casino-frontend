import type { Game } from "@/types/game";

export type TournamentBadge = "MENSAL" | "SEMANAL" | "AO VIVO" | "HOT";

export type TournamentStatus = "live" | "upcoming" | "finished";

export interface TournamentPrizeTier {
  position: number;
  label?: string;
  amount: number;
}

export interface TournamentRankingRow {
  position: number;
  nickname: string;
  score: number;
  multiplier: string;
  prizeAmount: number;
}

export interface TournamentRuleSection {
  id: string;
  title: string;
  body: string;
}

export interface TournamentHowItWorksItem {
  title: string;
  description: string;
}

/** Dados serializáveis do torneio (mock / API futura). */
export interface Tournament {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  banner: string;
  thumbnail: string;
  provider: string;
  badge: TournamentBadge;
  prizePool: number;
  participants: number;
  endsAt: string;
  startsAt?: string;
  gameSlugs: string[];
  ranking: TournamentRankingRow[];
  prizes: TournamentPrizeTier[];
  rules: TournamentRuleSection[];
  howItWorks: TournamentHowItWorksItem[];
  minimumBet: number;
  status: TournamentStatus;
  featured: boolean;
}

/** Config opcional do bloco dinâmico `tournaments` (home). */
export interface TournamentsBlockConfig {
  enabled?: boolean;
  subtitle?: string;
  limit?: number;
}

/** Torneio com jogos já resolvidos (UI / detalhe). */
export type TournamentWithGames = Tournament & { games: Game[] };
