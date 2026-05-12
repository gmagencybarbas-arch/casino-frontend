import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CasinoLayout } from "@/components/CasinoLayout";
import {
  TournamentActivityFeed,
  TournamentGamesCarousel,
  TournamentHero,
  TournamentHowItWorks,
  TournamentPrizeTable,
  TournamentRanking,
  TournamentRules,
} from "@/components/Tournaments";
import { getTournamentSlugsMock } from "@/data/tournamentsMock";
import { api } from "@/services/api";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getTournamentSlugsMock().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tournament = await api.getTournamentBySlug(slug);
  if (!tournament) {
    return { title: "Torneio não encontrado | Casino" };
  }
  const title = `${tournament.title} | Torneios`;
  const description = `${tournament.subtitle} Pool ${tournament.prizePool.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} — ${tournament.provider}.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: tournament.banner.startsWith("http")
        ? [{ url: tournament.banner, alt: tournament.title }]
        : undefined,
    },
  };
}

export default async function TournamentDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const tournament = await api.getTournamentBySlug(slug);

  if (!tournament) {
    notFound();
  }

  return (
    <CasinoLayout>
      <div className="mx-auto max-w-6xl px-4 py-6 md:py-10">
        <Link
          href="/tournaments"
          className="mb-6 inline-flex text-sm font-medium text-[var(--color-text-muted)] transition hover:text-[var(--color-primary)]"
        >
          ← Torneios
        </Link>

        <TournamentHero tournament={tournament} />

        <div className="mt-10 space-y-10">
          <TournamentHowItWorks items={tournament.howItWorks} />

          <div className="grid gap-6 lg:grid-cols-2">
            <TournamentRanking rows={tournament.ranking} />
            <TournamentPrizeTable prizes={tournament.prizes} />
          </div>

          <TournamentGamesCarousel games={tournament.games} />

          <div className="grid gap-6 lg:grid-cols-2">
            <TournamentRules rules={tournament.rules} />
            <TournamentActivityFeed tournamentTitle={tournament.title} />
          </div>
        </div>
      </div>
    </CasinoLayout>
  );
}
