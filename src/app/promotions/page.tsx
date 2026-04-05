import type { Metadata } from "next";
import { CasinoLayout } from "@/components/CasinoLayout";
import { PromotionCard } from "@/components/PromotionCard";
import { promotions } from "@/data/promotions";

export const metadata: Metadata = {
  title: "Promoções | Casino",
  description: "Ofertas e promoções exclusivas.",
};

export default function PromotionsPage() {
  return (
    <CasinoLayout>
      <div className="mx-auto max-w-5xl px-4 py-6 md:py-8">
        <h1 className="mb-2 text-2xl font-bold text-[var(--color-text)] md:text-3xl">Promoções</h1>
        <p className="mb-8 text-[var(--color-text-muted)]">
          Escolha uma oferta para ver detalhes. No telemóvel, toque no cartão inteiro.
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          {promotions.map((promo) => (
            <PromotionCard key={promo.slug} promo={promo} />
          ))}
        </div>
      </div>
    </CasinoLayout>
  );
}
