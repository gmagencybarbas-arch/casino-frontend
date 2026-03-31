import type { Metadata } from "next";
import { CasinoLayout } from "@/components/CasinoLayout";
import { BlocksArea } from "@/components/BlocksArea";
import { BannerSlider } from "@/components/BannerSlider";
import { SearchBar } from "@/components/SearchBar";
import { WinnersStrip } from "@/components/WinnersStrip";
import { api } from "@/services/api";

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

  return (
    <CasinoLayout>
      <WinnersStrip />
      <BannerSlider />
      <SearchBar />
      <BlocksArea blocks={layout.blocks} />
    </CasinoLayout>
  );
}
