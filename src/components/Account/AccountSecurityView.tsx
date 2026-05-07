"use client";

import { useAccountStore } from "@/store/useAccountStore";
import { formatDateTime } from "@/lib/accountFormat";

export function AccountSecurityView() {
  const sessions = useAccountStore((s) => s.sessions);
  const closeSession = useAccountStore((s) => s.closeSession);

  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] md:p-5">
      <h1 className="text-lg font-bold text-[var(--color-text)] md:text-xl">Seguranca e sessoes</h1>
      <p className="mt-1 text-xs text-[var(--color-text-muted)] md:text-sm">
        Controle de sessoes ativas e historico de login.
      </p>

      <div className="mt-4 space-y-2">
        {sessions.map((session) => (
          <article
            key={session.id}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-background-secondary)] p-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-[var(--color-text)]">{session.deviceName}</h2>
              {session.current ? (
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-300">
                  Sessao atual
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => closeSession(session.id)}
                  className="rounded-md border border-[var(--color-border)] px-2 py-1 text-[11px] text-[var(--color-text-muted)] transition hover:text-[var(--color-text)]"
                >
                  Encerrar sessao
                </button>
              )}
            </div>
            <p className="mt-1 text-xs text-[var(--color-text-muted)]">
              {session.platform} · {session.browser} · {session.ip}
            </p>
            <p className="text-xs text-[var(--color-text-muted)]">
              {session.location} · ultimo login {formatDateTime(session.lastLoginAt)}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
