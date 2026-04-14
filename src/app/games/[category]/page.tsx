import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CasinoLayout } from "@/components/CasinoLayout";
import { GamesCategoryClient } from "@/components/GamesListing";
import { categories, getCategoryBySlug } from "@/data/categories";
import { api } from "@/services/api";

interface GamesCategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: GamesCategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const cfg = getCategoryBySlug(category);
  if (!cfg) {
    return { title: "Jogos | Casino" };
  }
  return {
    title: `${cfg.label} | Jogos`,
    description: `Explore ${cfg.label.toLowerCase()} na nossa plataforma.`,
  };
}

export default async function GamesCategoryPage({ params }: GamesCategoryPageProps) {
  const { category } = await params;
  const cfg = getCategoryBySlug(category);
  if (!cfg) {
    notFound();
  }

  const initialGames = await api.getAllGames();

  return (
    <CasinoLayout>
      <Suspense
        fallback={
          <div className="min-h-[50vh] animate-pulse rounded-xl bg-[var(--color-card)] px-4 py-10 md:px-6" />
        }
      >
        <GamesCategoryClient
          categorySlug={cfg.slug}
          categoryLabel={cfg.label}
          categoryIcon={cfg.icon}
          initialGames={initialGames}
        />
      </Suspense>
    </CasinoLayout>
  );
}
