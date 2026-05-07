"use client";

import { useEffect, useMemo, useState } from "react";
import { useGlobalModal } from "@/store/useGlobalModal";
import { useAccountStore } from "@/store/useAccountStore";
import { formatBRL } from "@/lib/accountFormat";

function AnimatedValue({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  const [startValue, setStartValue] = useState(0);
  useEffect(() => {
    let frame = 0;
    const totalFrames = 24;
    const start = startValue;
    const step = (value - start) / totalFrames;
    const id = setInterval(() => {
      frame += 1;
      if (frame >= totalFrames) {
        setDisplay(value);
        setStartValue(value);
        clearInterval(id);
      } else {
        setDisplay(start + step * frame);
      }
    }, 16);
    return () => clearInterval(id);
  }, [value, startValue]);
  return <span className="tabular-nums">{formatBRL(display)}</span>;
}

const activitySeed = [
  "Sweet Bonanza pagou R$ 412 agora",
  "Aviator encerrou em 4.32x",
  "Cashback semanal creditado",
  "Novo torneio de slots ativo",
];

export function AccountWalletView() {
  const wallet = useAccountStore((s) => s.wallet);
  const openModal = useGlobalModal((s) => s.open);
  const [pulseGain, setPulseGain] = useState(2340);

  useEffect(() => {
    const id = setInterval(() => setPulseGain((v) => v + Math.random() * 31), 2200);
    return () => clearInterval(id);
  }, []);

  const cards = useMemo(
    () => [
      { label: "Saldo total", value: wallet.totalBalance },
      { label: "Saldo bonus", value: wallet.bonusBalance },
      { label: "Saldo em jogo", value: wallet.inGameBalance },
      { label: "Ultimo deposito", value: wallet.lastDeposit },
      { label: "Ganho hoje", value: wallet.totalWonToday },
      { label: "Apostado hoje", value: wallet.totalBetToday },
    ],
    [wallet]
  );

  return (
    <div className="space-y-4 md:space-y-6">
      <section className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-card)] via-[var(--color-card)] to-[var(--color-background-secondary)] p-4 shadow-[var(--shadow-elevated)] md:p-6">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-[var(--color-text)] md:text-2xl">Carteira</h1>
            <p className="mt-1 text-xs text-[var(--color-text-muted)] md:text-sm">
              Gestao completa de saldo, bonus e movimentacoes em tempo real.
            </p>
          </div>
          <div className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold text-emerald-300">
            +{formatBRL(pulseGain)} ganhos nos ultimos minutos
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.label}
              className="rounded-xl border border-[var(--color-border)] bg-white/[0.03] p-3 backdrop-blur-sm transition hover:border-[var(--color-primary)]/50"
            >
              <p className="text-xs text-[var(--color-text-muted)]">{card.label}</p>
              <p className="mt-2 text-lg font-bold text-[var(--color-text)] md:text-xl">
                <AnimatedValue value={card.value} />
              </p>
            </article>
          ))}
        </div>

        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => openModal("deposit")}
            className="rounded-xl bg-[var(--color-primary)] px-4 py-3 text-sm font-bold text-black shadow-[var(--shadow-card-hover)] transition hover:brightness-110"
          >
            Depositar
          </button>
          <button
            type="button"
            onClick={() => openModal("withdraw")}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-background-secondary)] px-4 py-3 text-sm font-semibold text-[var(--color-text)] transition hover:border-[var(--color-primary)]/40"
          >
            Sacar
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] md:p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">Atividade ao vivo</h2>
        <div className="mt-3 space-y-2">
          {activitySeed.map((activity) => (
            <div
              key={activity}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-background-secondary)] px-3 py-2 text-sm text-[var(--color-text)]"
            >
              {activity}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
