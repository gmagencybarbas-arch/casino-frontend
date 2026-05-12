import { formatBRL } from "@/lib/accountFormat";
import type { TournamentPrizeTier } from "@/types/tournament";

export function TournamentPrizeTable({ prizes }: { prizes: TournamentPrizeTier[] }) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-card)]">
      <div className="border-b border-[var(--color-border)] p-4 md:p-5">
        <h2 className="text-lg font-bold text-[var(--color-text)]">Premiação</h2>
        <p className="text-sm text-[var(--color-text-muted)]">Distribuição por posição (valores mock).</p>
      </div>
      <ul className="divide-y divide-[var(--color-border)]">
        {prizes.map((p) => (
          <li
            key={p.position}
            className="flex items-center justify-between gap-3 px-4 py-3 transition hover:bg-[var(--color-card-hover)] md:px-5"
          >
            <span className="text-[var(--color-text)]">
              {p.label ?? `${p.position}º lugar`}
            </span>
            <span className="font-bold tabular-nums text-[var(--color-secondary)]">{formatBRL(p.amount)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
