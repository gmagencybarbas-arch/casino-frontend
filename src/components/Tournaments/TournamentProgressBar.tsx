"use client";

import { useEffect, useState } from "react";
import type { TournamentStatus } from "@/types/tournament";

function computePct(startsAt: string | undefined, endsAt: string, status: TournamentStatus) {
  if (status === "finished") return 100;
  const end = Date.parse(endsAt);
  const start = startsAt ? Date.parse(startsAt) : end - 7 * 86400000;
  const now = Date.now();
  if (!Number.isFinite(end) || !Number.isFinite(start)) return 0;
  if (now >= end) return 100;
  if (now <= start) return 0;
  return Math.min(100, ((now - start) / (end - start)) * 100);
}

export function TournamentProgressBar({
  startsAt,
  endsAt,
  status,
}: {
  startsAt?: string;
  endsAt: string;
  status: TournamentStatus;
}) {
  const [pct, setPct] = useState(() => computePct(startsAt, endsAt, status));

  useEffect(() => {
    const tick = () => {
      setPct(computePct(startsAt, endsAt, status));
    };
    const t0 = window.setTimeout(tick, 0);
    if (status === "finished") {
      return () => window.clearTimeout(t0);
    }
    const id = window.setInterval(tick, 30000);
    return () => {
      window.clearTimeout(t0);
      window.clearInterval(id);
    };
  }, [startsAt, endsAt, status]);

  return (
    <div>
      <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
        Progresso do período
      </p>
      <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--color-background-tertiary)] ring-1 ring-[var(--color-border)]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[var(--color-primary-muted)] via-[var(--color-primary)] to-[var(--color-secondary)] transition-[width] duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-1 text-[10px] text-[var(--color-text-muted)] tabular-nums">{pct.toFixed(0)}%</p>
    </div>
  );
}
