import { formatBRL } from "@/lib/accountFormat";
import type { TournamentRankingRow } from "@/types/tournament";

function medalClass(position: number) {
  if (position === 1)
    return "border-[var(--color-primary)]/50 bg-[var(--color-primary-muted)]/40 shadow-[0_0_20px_var(--color-primary-muted)]";
  if (position === 2)
    return "border-[var(--color-border-hover)] bg-[var(--color-background-tertiary)] shadow-[var(--shadow-card)]";
  if (position === 3)
    return "border-[var(--color-primary-muted)] bg-[var(--color-background-secondary)] shadow-[var(--shadow-card)]";
  return "border-[var(--color-border)] bg-[var(--color-card)]";
}

export function TournamentRanking({ rows }: { rows: TournamentRankingRow[] }) {
  if (rows.length === 0) {
    return (
      <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-card)] p-6 text-center text-[var(--color-text-muted)] shadow-[var(--shadow-card)]">
        O ranking será divulgado na abertura oficial.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-card)]">
      <div className="border-b border-[var(--color-border)] p-4 md:p-5">
        <h2 className="text-lg font-bold text-[var(--color-text)]">Ranking ao vivo</h2>
        <p className="text-sm text-[var(--color-text-muted)]">Top jogadores — dados mock para demonstração.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border)] bg-[var(--color-background-secondary)] text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
              <th className="px-4 py-3">Pos.</th>
              <th className="px-4 py-3">Nickname</th>
              <th className="px-4 py-3 text-right">Pontos</th>
              <th className="px-4 py-3 text-right">Multiplicador</th>
              <th className="px-4 py-3 text-right">Prêmio</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.position}
                className={`border-b border-[var(--color-border)] transition hover:bg-[var(--color-card-hover)] ${medalClass(r.position)}`}
              >
                <td className="px-4 py-3 font-bold tabular-nums text-[var(--color-text)]">
                  {r.position <= 3 ? `${r.position}º` : r.position}
                </td>
                <td className="px-4 py-3 font-medium text-[var(--color-text)]">{r.nickname}</td>
                <td className="px-4 py-3 text-right tabular-nums text-[var(--color-text-secondary)]">
                  {r.score.toLocaleString("pt-BR")}
                </td>
                <td className="px-4 py-3 text-right font-semibold text-[var(--color-primary)]">{r.multiplier}</td>
                <td className="px-4 py-3 text-right font-semibold text-[var(--color-text)]">
                  {r.prizeAmount > 0 ? formatBRL(r.prizeAmount) : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
