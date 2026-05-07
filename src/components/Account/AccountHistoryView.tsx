"use client";

import { useMemo, useState } from "react";
import { useAccountStore } from "@/store/useAccountStore";
import { formatBRL, formatDateTime } from "@/lib/accountFormat";

const PAGE_SIZE = 4;

export function AccountHistoryView() {
  const transactions = useAccountStore((s) => s.transactions);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("todos");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return transactions.filter((item) => {
      const typeOk = type === "todos" || item.type === type;
      const text = `${item.description} ${item.type}`.toLowerCase();
      const textOk = text.includes(search.toLowerCase());
      return typeOk && textOk;
    });
  }, [transactions, search, type]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] md:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-lg font-bold text-[var(--color-text)] md:text-xl">Extrato da conta</h1>
          <p className="text-xs text-[var(--color-text-muted)] md:text-sm">
            Depositos, saques, apostas e movimentacoes internas.
          </p>
        </div>
        <button
          type="button"
          className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-xs font-semibold text-[var(--color-text)] transition hover:border-[var(--color-primary)]/40"
        >
          Exportar CSV
        </button>
      </div>

      <div className="mb-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="rounded-lg border border-[var(--color-border)] bg-[var(--color-background-secondary)] px-3 py-2 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-primary)]"
          placeholder="Pesquisar descricao"
        />
        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            setPage(1);
          }}
          className="rounded-lg border border-[var(--color-border)] bg-[var(--color-background-secondary)] px-3 py-2 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-primary)]"
        >
          <option value="todos">Todos os tipos</option>
          <option value="deposito">Deposito</option>
          <option value="saque">Saque</option>
          <option value="aposta">Aposta</option>
          <option value="ganho">Ganho</option>
          <option value="bonus">Bonus</option>
          <option value="cashback">Cashback</option>
        </select>
        <input
          type="date"
          className="rounded-lg border border-[var(--color-border)] bg-[var(--color-background-secondary)] px-3 py-2 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-primary)]"
        />
        <input
          type="date"
          className="rounded-lg border border-[var(--color-border)] bg-[var(--color-background-secondary)] px-3 py-2 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-primary)]"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-[var(--color-border)]">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-xs md:text-sm">
            <thead className="bg-[var(--color-background-secondary)] text-[var(--color-text-muted)]">
              <tr>
                <th className="px-3 py-2">Data</th>
                <th className="px-3 py-2">Tipo</th>
                <th className="px-3 py-2">Descricao</th>
                <th className="px-3 py-2">Valor</th>
                <th className="px-3 py-2">Saldo antes</th>
                <th className="px-3 py-2">Saldo depois</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id} className="border-t border-[var(--color-border)] bg-[var(--color-card)]">
                  <td className="px-3 py-2 text-[var(--color-text-muted)]">{formatDateTime(item.date)}</td>
                  <td className="px-3 py-2 capitalize text-[var(--color-text)]">{item.type.replace("_", " ")}</td>
                  <td className="px-3 py-2 text-[var(--color-text)]">{item.description}</td>
                  <td className={`px-3 py-2 font-semibold ${item.amount >= 0 ? "text-emerald-300" : "text-rose-300"}`}>
                    {formatBRL(item.amount)}
                  </td>
                  <td className="px-3 py-2 text-[var(--color-text-muted)]">{formatBRL(item.balanceBefore)}</td>
                  <td className="px-3 py-2 text-[var(--color-text-muted)]">{formatBRL(item.balanceAfter)}</td>
                  <td className="px-3 py-2">
                    <span className="rounded-full border border-[var(--color-border)] px-2 py-0.5 text-[11px] uppercase text-[var(--color-text-muted)]">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-[var(--color-text-muted)]">
        <span>
          Pagina {page} de {pageCount}
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((v) => Math.max(1, v - 1))}
            className="rounded-md border border-[var(--color-border)] px-3 py-1 disabled:opacity-50"
          >
            Anterior
          </button>
          <button
            type="button"
            disabled={page >= pageCount}
            onClick={() => setPage((v) => Math.min(pageCount, v + 1))}
            className="rounded-md border border-[var(--color-border)] px-3 py-1 disabled:opacity-50"
          >
            Proxima
          </button>
        </div>
      </div>
    </section>
  );
}
