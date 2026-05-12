"use client";

import { useEffect, useMemo, useState } from "react";

const ACTIVITY_TEMPLATES = [
  "{name} acabou de subir para o TOP 10",
  "{name} atingiu multiplicador {mult}",
  "{name} somou +{pts} pontos na última hora",
  "{name} entrou na zona de prémios",
  "{name} consolidou posição no ranking",
];

const NAMES = ["João", "Maria", "Carlos", "Ana", "Pedro", "Luísa", "Bruno", "Sofia"];
const MULTS = ["x500", "x250", "x120", "x88", "x64"];
const PTS = ["2.400", "12.500", "4.200", "8.900", "1.100"];

function pick<T>(arr: T[], seed: number, i: number) {
  return arr[(seed + i * 13) % arr.length];
}

export function TournamentActivityFeed({ tournamentTitle }: { tournamentTitle: string }) {
  const seed = useMemo(() => {
    let h = 0;
    for (let i = 0; i < tournamentTitle.length; i += 1) h = (h * 31 + tournamentTitle.charCodeAt(i)) | 0;
    return Math.abs(h);
  }, [tournamentTitle]);

  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 9000);
    return () => clearInterval(id);
  }, []);

  const line = useMemo(() => {
    const i = tick % 5;
    const template = pick(ACTIVITY_TEMPLATES, seed, i);
    const name = `${pick(NAMES, seed, i + 2)}***`;
    return template.replace("{name}", name).replace("{mult}", pick(MULTS, seed, i)).replace("{pts}", pick(PTS, seed, i));
  }, [seed, tick]);

  return (
    <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-card)]">
      <div className="border-b border-[var(--color-border)] p-4 md:p-5">
        <h2 className="text-lg font-bold text-[var(--color-text)]">Atividade ao vivo</h2>
        <p className="text-sm text-[var(--color-text-muted)]">Atualização mock discreta — sensação de plataforma ativa.</p>
      </div>
      <div className="p-4 md:p-5">
        <div
          key={tick}
          className="rounded-[12px] border border-[var(--color-primary-muted)] bg-[var(--color-primary-muted)]/35 px-4 py-3 text-sm text-[var(--color-text)] transition-opacity duration-500"
        >
          <span className="mr-2 inline-flex h-2 w-2 animate-pulse rounded-full bg-[var(--color-primary)] align-middle" />
          {line}
        </div>
      </div>
    </div>
  );
}
