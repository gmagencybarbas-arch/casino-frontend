import Link from "next/link";
import type { Promotion } from "@/data/promotions";

interface PromotionCardProps {
  promo: Promotion;
}

const cardClassName =
  "block outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)] rounded-xl";

export function PromotionCard({ promo }: PromotionCardProps) {
  const inner = (
    <div className="cursor-pointer overflow-hidden rounded-xl bg-[var(--color-card)] transition hover:scale-[1.02] hover:shadow-[var(--shadow-card-hover)]">
      <img
        src={promo.image}
        alt=""
        className="h-auto w-full object-cover"
        loading="lazy"
        referrerPolicy="no-referrer"
      />

      <div className="p-4">
        <h3 className="font-bold text-[var(--color-text)]">{promo.title}</h3>

        <span className="mt-3 hidden rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-black md:inline-block">
          Saiba mais
        </span>
      </div>
    </div>
  );

  if (promo.externalUrl) {
    return (
      <a
        href={promo.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClassName}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={`/promotions/${promo.slug}`} className={cardClassName}>
      {inner}
    </Link>
  );
}
