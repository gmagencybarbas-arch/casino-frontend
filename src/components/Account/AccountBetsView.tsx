"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useAccountStore } from "@/store/useAccountStore";
import { formatBRL, formatDateTime } from "@/lib/accountFormat";

export function AccountBetsView() {
  const bets = useAccountStore((s) => s.bets);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("todos");

  const filtered = useMemo(
    () =>
      bets.filter((bet) => {
        const query = `${bet.gameName} ${bet.provider}`.toLowerCase();
        const searchOk = query.includes(search.toLowerCase());
        const statusOk = status === "todos" || bet.status === status;
        return searchOk && statusOk;
      }),
    [bets, search, status]
  );

  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] md:p-5">
      <h1 className="text-lg font-bold text-[var(--color-text)] md:text-xl">Historico de apostas</h1>
      <p className="mt-1 text-xs text-[var(--color-text-muted)] md:text-sm">Acompanhe entradas, multiplicadores e resultado final.</p>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border border-[var(--color-border)] bg-[var(--color-background-secondary)] px-3 py-2 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-primary)]"
          placeholder="Buscar por jogo ou provedor"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border border-[var(--color-border)] bg-[var(--color-background-secondary)] px-3 py-2 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-primary)]"
        >
          <option value="todos">Todos os status</option>
          <option value="win">Ganho</option>
          <option value="loss">Perda</option>
          <option value="cashout">Cashout</option>
        </select>
      </div>

      <div className="mt-3 space-y-2">
        {filtered.map((bet) => (
          <Link
            href={`/game/${bet.gameSlug}`}
            key={bet.id}
            className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-background-secondary)] p-3 transition hover:border-[var(--color-primary)]/50"
          >
            <img src={bet.thumbnail} alt="" className="h-12 w-12 rounded-lg object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-[var(--color-text)]">{bet.gameName}</p>
              <p className="truncate text-xs text-[var(--color-text-muted)]">{bet.provider}</p>
              <p className="mt-1 text-[11px] text-[var(--color-text-muted)]">{formatDateTime(bet.createdAt)}</p>
            </div>
            <div className="text-right text-xs">
              <p className="text-[var(--color-text-muted)]">Aposta: {formatBRL(bet.amount)}</p>
              <p className="text-[var(--color-text-muted)]">Multip.: {bet.multiplier.toFixed(2)}x</p>
              <p className={`font-semibold ${bet.resultAmount >= 0 ? "text-emerald-300" : "text-rose-300"}`}>
                {formatBRL(bet.resultAmount)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
