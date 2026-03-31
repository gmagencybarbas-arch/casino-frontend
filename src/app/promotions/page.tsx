import type { Metadata } from "next";
import { CasinoLayout } from "@/components/CasinoLayout";

export const metadata: Metadata = {
  title: "Promoções | Casino",
  description: "Ofertas e promoções exclusivas.",
};

export default function PromotionsPage() {
  return (
    <CasinoLayout>
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-8 text-center">
        <h1 className="text-2xl font-bold text-[var(--color-text)]">Promoções</h1>
        <p className="mt-2 text-[var(--color-text-muted)]">
          Página de exemplo — o header pode estar em modo visitante (Entre / Cadastre-se) ao abrir pelo menu ou pelo rodapé.
        </p>
      </div>
    </CasinoLayout>
  );
}
