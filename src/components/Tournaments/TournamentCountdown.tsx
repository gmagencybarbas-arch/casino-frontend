"use client";

import { useTournamentCountdown } from "./useTournamentCountdown";

const cellClass =
  "flex min-w-[2.5rem] flex-col items-center rounded-[10px] border border-[var(--color-border)] bg-[var(--color-background-secondary)] px-2 py-1.5 text-[var(--color-text)] shadow-[var(--shadow-card)] sm:min-w-[2.75rem] sm:px-2.5";

/** Faixa horizontal tipo card premium (referência UI). */
const cardStripClass =
  "flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 px-1 py-2 sm:px-1.5";

export type TournamentCountdownVariant = "default" | "compact" | "card";

export function TournamentCountdown({
  endsAt,
  compact = false,
  variant = "default",
}: {
  endsAt: string;
  compact?: boolean;
  /** `card` = faixa horizontal grande para cards de torneio. */
  variant?: TournamentCountdownVariant;
}) {
  const { days, hours, minutes, seconds, totalMs } = useTournamentCountdown(endsAt);

  if (totalMs <= 0) {
    return (
      <p className="text-xs font-semibold text-[var(--color-text-muted)] sm:text-sm">Encerrado</p>
    );
  }

  const sep = <span className="px-0.5 text-[var(--color-primary)] opacity-90">:</span>;

  if (variant === "card") {
    const cells = [
      { v: days, l: "dias" },
      { v: hours, l: "hrs." },
      { v: minutes, l: "min." },
      { v: seconds, l: "seg." },
    ] as const;
    return (
      <div
        className="flex w-full items-stretch overflow-hidden rounded-[11px] border border-[var(--color-border)] bg-[var(--color-background-secondary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
        role="timer"
        aria-live="polite"
        aria-label="Tempo restante até o fim do torneio"
      >
        {cells.map((c, i) => (
          <div
            key={c.l}
            className={`${cardStripClass} ${i > 0 ? "border-l border-[var(--color-border)]" : ""}`}
          >
            <span className="text-base font-bold tabular-nums leading-none text-[var(--color-text)] sm:text-lg">
              {c.v}
            </span>
            <span className="text-[10px] font-medium lowercase text-[var(--color-text-muted)] sm:text-[11px]">
              {c.l}
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (compact) {
    return (
      <div className="flex flex-wrap items-center gap-1 text-[10px] sm:text-xs">
        <span className={cellClass}>
          <span className="font-bold tabular-nums">{days}</span>
          <span className="text-[9px] uppercase text-[var(--color-text-muted)]">d</span>
        </span>
        {sep}
        <span className={cellClass}>
          <span className="font-bold tabular-nums">{hours}</span>
          <span className="text-[9px] uppercase text-[var(--color-text-muted)]">h</span>
        </span>
        {sep}
        <span className={cellClass}>
          <span className="font-bold tabular-nums">{minutes}</span>
          <span className="text-[9px] uppercase text-[var(--color-text-muted)]">m</span>
        </span>
        {sep}
        <span className={cellClass}>
          <span className="font-bold tabular-nums">{seconds}</span>
          <span className="text-[9px] uppercase text-[var(--color-text-muted)]">s</span>
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {[
        { v: days, l: "Dias" },
        { v: hours, l: "Horas" },
        { v: minutes, l: "Min" },
        { v: seconds, l: "Seg" },
      ].map((x) => (
        <div key={x.l} className={cellClass}>
          <span className="text-lg font-black tabular-nums text-[var(--color-primary)] sm:text-xl">{x.v}</span>
          <span className="text-[10px] font-medium uppercase tracking-wide text-[var(--color-text-muted)]">
            {x.l}
          </span>
        </div>
      ))}
    </div>
  );
}
