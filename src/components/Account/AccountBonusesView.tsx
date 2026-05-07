"use client";

import { useAccountStore } from "@/store/useAccountStore";
import { formatBRL, formatDate } from "@/lib/accountFormat";

export function AccountBonusesView() {
  const bonuses = useAccountStore((s) => s.bonuses);

  return (
    <section className="space-y-3">
      <div>
        <h1 className="text-lg font-bold text-[var(--color-text)] md:text-xl">Meus bonus</h1>
        <p className="text-xs text-[var(--color-text-muted)] md:text-sm">
          Acompanhe rollover, validade e progresso de liberacao.
        </p>
      </div>
      {bonuses.map((bonus) => (
        <article
          key={bonus.id}
          className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)]"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-[var(--color-text)] md:text-base">{bonus.name}</h2>
            <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-background-secondary)] px-2.5 py-1 text-[11px] uppercase text-[var(--color-primary)]">
              {bonus.status}
            </span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--color-background-secondary)]">
            <div className="h-full rounded-full bg-[var(--color-primary)] transition-all" style={{ width: `${bonus.completionPercent}%` }} />
          </div>
          <div className="mt-2 grid gap-2 text-xs text-[var(--color-text-muted)] sm:grid-cols-2 lg:grid-cols-4">
            <p>Cumprido: {bonus.completionPercent}%</p>
            <p>Rollover restante: {formatBRL(bonus.rolloverRemaining)}</p>
            <p>Valor restante: {formatBRL(bonus.valueRemaining)}</p>
            <p>Valido ate: {formatDate(bonus.validUntil)}</p>
          </div>
          <div className="mt-3 flex items-center gap-2">
            {bonus.eligibleGames.map((game) => (
              <img key={game.slug} src={game.thumbnail} title={game.name} alt={game.name} className="h-9 w-9 rounded-lg object-cover" />
            ))}
          </div>
        </article>
      ))}
    </section>
  );
}
