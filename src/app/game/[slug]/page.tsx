import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { api } from "@/services/api";
import { GamePlayer } from "./GamePlayer";

interface GamePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = await api.getGameBySlug(slug);
  if (!game) return { title: "Jogo não encontrado" };
  return {
    title: `${game.name} - ${game.providerName ?? game.provider} | Casino`,
    description: `Jogue ${game.name} - ${game.providerName ?? game.provider}`,
  };
}

export default async function GamePage({ params }: GamePageProps) {
  const { slug } = await params;
  const game = await api.getGameBySlug(slug);

  if (!game) notFound();

  return <GamePlayer game={game} />;
}
