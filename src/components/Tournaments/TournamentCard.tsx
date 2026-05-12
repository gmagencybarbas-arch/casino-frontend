"use client";

import Image from "next/image";
import Link from "next/link";
import { formatBRL } from "@/lib/accountFormat";
import { useAccountStore } from "@/store/useAccountStore";
import { useGlobalModal } from "@/store/useGlobalModal";
import { useTournamentEnrollmentStore } from "@/store/useTournamentEnrollmentStore";
import type { Tournament } from "@/types/tournament";
import { TournamentCountdown } from "./TournamentCountdown";
import { useTournamentCountdown } from "./useTournamentCountdown";

/** Selos mais escuros (contraste premium sobre o banner). */
function badgeStyle(badge: Tournament["badge"]) {
  switch (badge) {
    case "AO VIVO":
      return "bg-[var(--color-background)]/92 text-[var(--color-primary)] ring-1 ring-[var(--color-primary)]/28 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]";
    case "HOT":
      return "bg-[var(--color-background)]/88 text-[var(--color-secondary)] ring-1 ring-[var(--color-primary)]/22";
    case "MENSAL":
      return "bg-[var(--color-background)]/90 text-[var(--color-secondary)] ring-1 ring-[var(--color-accent)]/25";
    case "SEMANAL":
    default:
      return "bg-[var(--color-background)]/85 text-[var(--color-text-secondary)] ring-1 ring-[var(--color-border)]";
  }
}

function participantLabel(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1).replace(".", ",")}k inscritos` : `${n} inscritos`;
}

interface TournamentCardProps {
  tournament: Tournament;
}

export function TournamentCard({ tournament }: TournamentCardProps) {
  const t = tournament;
  const loggedIn = useAccountStore((s) => s.loggedIn);
  const openModal = useGlobalModal((s) => s.open);
  const enrolled = useTournamentEnrollmentStore((s) => !!s.enrolledSlugs[t.slug]);
  const enroll = useTournamentEnrollmentStore((s) => s.enroll);

  const { totalMs } = useTournamentCountdown(t.endsAt);
  const showUrgent =
    totalMs > 0 && totalMs <= 48 * 60 * 60 * 1000 && t.status !== "finished";

  let ctaLabel = "Inscrever-se";
  if (t.status === "finished") ctaLabel = "Ver Torneio";
  else if (enrolled) ctaLabel = "Inscrito";

  const handleCta = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (t.status === "finished") return;
    if (enrolled) return;
    if (!loggedIn) {
      openModal("login");
      return;
    }
    enroll(t.slug);
  };

  const thumb = t.thumbnail || t.banner;
  const isRemote = thumb.startsWith("http");

  return (
    <div
      className="group relative flex h-full flex-col overflow-hidden rounded-[12px] border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-card)] transition-all duration-300 hover:border-[var(--color-border-hover)] hover:shadow-[0_0_0_1px_var(--color-primary-muted),var(--shadow-card-hover)]"
    >
      <Link
        href={`/tournaments/${t.slug}`}
        className="absolute inset-0 z-0 rounded-[12px]"
        aria-label={`Abrir torneio ${t.title}`}
        prefetch={false}
      />

      <div className="relative z-10 pointer-events-none flex h-full flex-col">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--color-background-secondary)]">
          <Image
            src={thumb}
            alt=""
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 88vw, 300px"
            unoptimized={isRemote}
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-card)] via-transparent to-transparent opacity-95"
            aria-hidden
          />
          <div className="absolute left-2 top-2 flex flex-wrap gap-1">
            <span
              className={`rounded-[8px] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${badgeStyle(t.badge)}`}
            >
              {t.badge}
            </span>
            {showUrgent ? (
              <span className="rounded-[8px] bg-[var(--color-background)]/92 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[var(--color-primary)] ring-1 ring-[var(--color-primary)]/35">
                Poucas horas
              </span>
            ) : null}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2 p-3 pt-2">
          <p className="line-clamp-2 text-sm font-bold leading-snug text-[var(--color-text)]">{t.title}</p>
          <p className="line-clamp-2 text-xs leading-relaxed text-[var(--color-text-muted)]">{t.subtitle}</p>

          <div className="flex flex-wrap items-center gap-x-2 text-[11px] text-[var(--color-text-secondary)]">
            <span className="tabular-nums">{participantLabel(t.participants)}</span>
          </div>

          <div className="rounded-[11px] border border-[var(--color-border)] bg-[var(--color-background-secondary)]/80 p-2.5 ring-1 ring-[var(--color-primary)]/8">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
              Premiação total
            </p>
            <p className="mt-0.5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-lg font-black leading-none tabular-nums text-transparent sm:text-xl">
              {formatBRL(t.prizePool)}
            </p>
          </div>

          <div className="mt-auto border-t border-[var(--color-border)] pt-3">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[var(--color-text)]">
              Termina em
            </p>
            <TournamentCountdown endsAt={t.endsAt} variant="card" />
          </div>

          <button
            type="button"
            onClick={handleCta}
            disabled={enrolled && t.status !== "finished"}
            className={`pointer-events-auto relative z-20 mt-1 w-full rounded-[12px] px-3 py-2.5 text-center text-xs font-bold transition ${
              enrolled && t.status !== "finished"
                ? "cursor-default bg-[var(--color-background-tertiary)] text-[var(--color-text-muted)]"
                : "bg-[var(--color-accent)] text-[var(--color-accent-text)] shadow-[var(--shadow-card)] hover:brightness-110 active:scale-[0.99]"
            }`}
          >
            {ctaLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
