import type { Metadata } from "next";
import Link from "next/link";
import { CasinoLayout } from "@/components/CasinoLayout";
import { PromotionContent } from "@/components/PromotionContent";
import { getPromotionBySlug, promotions } from "@/data/promotions";

interface PromotionDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return promotions.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PromotionDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const promo = getPromotionBySlug(slug);
  if (!promo) {
    return { title: "Promoção não encontrada | Casino" };
  }
  return {
    title: `${promo.title} | Promoções`,
    description: promo.description,
  };
}

export default async function PromotionDetailPage({ params }: PromotionDetailPageProps) {
  const { slug } = await params;
  const promo = getPromotionBySlug(slug);

  if (!promo) {
    return (
      <CasinoLayout>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-10 text-[var(--color-text)]">
          <p className="text-lg">Promoção não encontrada</p>
          <Link
            href="/promotions"
            className="mt-4 inline-block text-[var(--color-primary)] underline hover:brightness-110"
          >
            Voltar às promoções
          </Link>
        </div>
      </CasinoLayout>
    );
  }

  const ctaExternal = Boolean(promo.externalUrl);

  return (
    <CasinoLayout>
      <div className="mx-auto max-w-5xl px-4 py-8 text-[var(--color-text)] md:py-10">
        <Link
          href="/promotions"
          className="mb-6 inline-flex text-sm font-medium text-[var(--color-text-muted)] transition hover:text-[var(--color-primary)]"
        >
          ← Promoções
        </Link>

        <div className="overflow-hidden rounded-xl bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] md:p-6">
          <img
            src={promo.image}
            alt=""
            className="mb-6 w-full rounded-xl object-cover"
            loading="eager"
            referrerPolicy="no-referrer"
          />

          <PromotionContent
            title={promo.title}
            description={promo.description}
            sections={promo.sections}
            tips={promo.tips}
            ctaHref={promo.externalUrl}
            ctaLabel={ctaExternal ? "Abrir na Vera.bet" : undefined}
            ctaExternal={ctaExternal}
          />
        </div>
      </div>
    </CasinoLayout>
  );
}
