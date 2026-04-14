import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { CasinoLayout } from "@/components/CasinoLayout";
import { BlocksArea } from "@/components/BlocksArea";
import { SearchBar } from "@/components/SearchBar";
import { api } from "@/services/api";

const BannerSlider = dynamic(
  () =>
    import("@/components/BannerSlider").then((m) => ({
      default: m.BannerSlider,
    })),
  {
    loading: () => (
      <div className="mb-6 aspect-[21/9] max-h-[280px] w-full animate-pulse rounded-xl bg-[var(--color-card)] sm:mb-8" />
    ),
  }
);

const WinnersStrip = dynamic(
  () =>
    import("@/components/WinnersStrip").then((m) => ({
      default: m.WinnersStrip,
    })),
  {
    loading: () => (
      <div className="mb-4 h-12 w-full max-w-full animate-pulse rounded-lg bg-[var(--color-card)]" />
    ),
  }
);

export const metadata: Metadata = {
  title: "Casino Online - Jogos de Caça-Níqueis, Live Casino e Apostas",
  description:
    "Plataforma de casino online com jogos de caça-níqueis, casino ao vivo, videobingo e apostas esportivas. Jogue com segurança e diversão.",
  openGraph: {
    title: "Casino Online - Jogos e Apostas",
    description: "Plataforma de casino online com os melhores jogos.",
  },
};

export default async function HomePage() {
  const layout = await api.getLayout();
  const allGames = await api.getAllGames();

  return (
    <CasinoLayout>
      <WinnersStrip />
      <BannerSlider />
      <SearchBar games={allGames} />
      <BlocksArea blocks={layout.blocks} />
    </CasinoLayout>
  );
}
