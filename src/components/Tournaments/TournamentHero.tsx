"use client";

import Image from "next/image";
import { formatBRL } from "@/lib/accountFormat";
import { useAccountStore } from "@/store/useAccountStore";
import { useGlobalModal } from "@/store/useGlobalModal";
import { useTournamentEnrollmentStore } from "@/store/useTournamentEnrollmentStore";
import type { TournamentWithGames } from "@/types/tournament";
import { TournamentCountdown } from "./TournamentCountdown";
import { TournamentProgressBar } from "./TournamentProgressBar";

function statusLabel(status: TournamentWithGames["status"]) {
  switch (status) {
    case "live":
      return "AO VIVO";
    case "upcoming":
      return "EM BREVE";
    case "finished":
      return "FINALIZADO";
  }
}

function statusPillClass(status: TournamentWithGames["status"]) {
  switch (status) {
    case "live":
      return "bg-[var(--color-primary-muted)] text-[var(--color-primary)] ring-1 ring-[var(--color-primary)]/40";
    case "upcoming":
      return "bg-[var(--color-background-tertiary)] text-[var(--color-text-secondary)] ring-1 ring-[var(--color-border-hover)]";
    case "finished":
      return "bg-[var(--color-background-secondary)] text-[var(--color-text-muted)] ring-1 ring-[var(--color-border)]";
  }
}

interface TournamentHeroProps {
  tournament: TournamentWithGames;
}

export function TournamentHero({ tournament: t }: TournamentHeroProps) {
  const loggedIn = useAccountStore((s) => s.loggedIn);
  const openModal = useGlobalModal((s) => s.open);
  const enrolled = useTournamentEnrollmentStore((s) => !!s.enrolledSlugs[t.slug]);
  const enroll = useTournamentEnrollmentStore((s) => s.enroll);

  const showCountdown = t.status !== "finished";
  const ctaDisabled = (enrolled && t.status !== "finished") || t.status === "finished";
  let ctaText = "Participar";
  if (t.status === "finished") ctaText = "Encerrado";
  else if (enrolled) ctaText = "Inscrito";

  const handleParticipar = () => {
    if (t.status === "finished") return;
    if (enrolled) return;
    if (!loggedIn) {
      openModal("login");
      return;
    }
    enroll(t.slug);
  };

  const banner = t.banner;
  const isRemote = banner.startsWith("http");

  return (
    <div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-elevated)]">
      <div className="relative min-h-[220px] md:min-h-[320px]">
        <Image
          src={banner}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
          unoptimized={isRemote}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-[var(--color-background)]/80 to-[var(--color-background)]/20" />

        <div className="relative z-10 flex flex-col gap-6 p-5 md:flex-row md:items-end md:justify-between md:p-8">
          <div className="max-w-2xl space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-[10px] px-3 py-1 text-xs font-bold uppercase tracking-wide ${statusPillClass(t.status)}`}
              >
                {statusLabel(t.status)}
              </span>
              <span className="rounded-[10px] bg-[var(--color-primary-muted)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--color-primary)] ring-1 ring-[var(--color-primary)]/30">
                {t.badge}
              </span>
            </div>
            <h1 className="text-2xl font-black leading-tight text-[var(--color-text)] drop-shadow-md md:text-4xl">
              {t.title}
            </h1>
            <p className="max-w-xl text-sm text-[var(--color-text-secondary)] md:text-base">{t.subtitle}</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                  Provedor
                </p>
                <p className="font-semibold text-[var(--color-text)]">{t.provider}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                  Inscritos
                </p>
                <p className="font-semibold tabular-nums text-[var(--color-text)]">
                  {t.participants.toLocaleString("pt-BR")}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                  Premiação
                </p>
                <p className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text font-black tabular-nums text-transparent">
                  {formatBRL(t.prizePool)}
                </p>
                <p className="text-[10px] text-[var(--color-text-muted)]">Pool total (mock)</p>
              </div>
            </div>
          </div>

          <div className="w-full shrink-0 space-y-4 md:max-w-sm">
            {showCountdown ? (
              <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-card)]/90 p-4 backdrop-blur-sm">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                  Contagem regressiva
                </p>
                <TournamentCountdown endsAt={t.endsAt} />
              </div>
            ) : null}
            <TournamentProgressBar startsAt={t.startsAt} endsAt={t.endsAt} status={t.status} />
            <button
              type="button"
              onClick={handleParticipar}
              disabled={ctaDisabled}
              className={`w-full rounded-[12px] py-3.5 text-center text-sm font-bold transition ${
                ctaDisabled
                  ? "cursor-default bg-[var(--color-background-tertiary)] text-[var(--color-text-muted)]"
                  : "bg-[var(--color-accent)] text-[var(--color-accent-text)] shadow-[var(--shadow-card-hover)] hover:brightness-110"
              }`}
            >
              {ctaText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
