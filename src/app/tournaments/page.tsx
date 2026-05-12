import type { Metadata } from "next";
import Link from "next/link";
import { CasinoLayout } from "@/components/CasinoLayout";
import { TournamentCard } from "@/components/Tournaments/TournamentCard";
import { api } from "@/services/api";

const title = "Torneios | Casino";
const description =
  "Competições com premiação ao vivo. Inscreva-se, suba no ranking e dispute prémios em BRL — integração whitelabel pronta para backend.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
  },
};

export default async function TournamentsPage() {
  const list = await api.getTournaments();

  return (
    <CasinoLayout>
      <div className="mx-auto max-w-6xl px-4 py-6 md:py-10">
        <Link
          href="/"
          className="mb-4 inline-flex text-sm font-medium text-[var(--color-text-muted)] transition hover:text-[var(--color-primary)]"
        >
          ← Início
        </Link>
        <h1 className="mb-2 text-2xl font-black text-[var(--color-text)] md:text-3xl">Torneios</h1>
        <p className="mb-8 max-w-2xl text-[var(--color-text-muted)]">
          Competições abertas e encerradas listadas a partir do mesmo mock da API; ligue o backend substituindo as chamadas em{" "}
          <span className="font-mono text-xs text-[var(--color-text-secondary)]">src/services/api.ts</span>.
        </p>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((t) => (
            <TournamentCard key={t.id} tournament={t} />
          ))}
        </div>
      </div>
    </CasinoLayout>
  );
}
