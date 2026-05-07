"use client";

import { useAccountStore } from "@/store/useAccountStore";
import { formatDateTime } from "@/lib/accountFormat";

export function AccountProfileView() {
  const profile = useAccountStore((s) => s.profile);

  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] md:p-5">
      <h1 className="text-lg font-bold text-[var(--color-text)] md:text-xl">Minha conta</h1>
      <p className="mt-1 text-xs text-[var(--color-text-muted)] md:text-sm">Dados pessoais, KYC e progresso da conta.</p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Field label="Nome" value={profile.fullName} />
        <Field label="CPF" value={profile.cpf} />
        <Field label="Email" value={profile.email} />
        <Field label="Telefone" value={profile.phone} />
        <Field label="Nivel VIP" value={profile.vipLevel} />
        <Field label="Cadastro" value={formatDateTime(profile.createdAt)} />
        <Field label="Ultimo login" value={formatDateTime(profile.lastLoginAt)} />
        <Field label="KYC" value={profile.kycStatus} />
      </div>

      <div className="mt-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-background-secondary)] p-3">
        <div className="mb-1 flex items-center justify-between text-xs text-[var(--color-text-muted)]">
          <span>Progresso da conta</span>
          <span>{profile.accountProgress}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-black/25">
          <div className="h-full rounded-full bg-[var(--color-primary)]" style={{ width: `${profile.accountProgress}%` }} />
        </div>
        <p className="mt-2 text-xs text-[var(--color-text-muted)]">Documentos: {profile.documentsStatus}</p>
      </div>
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-background-secondary)] p-3">
      <p className="text-[11px] uppercase tracking-wide text-[var(--color-text-muted)]">{label}</p>
      <p className="mt-1 text-sm font-medium text-[var(--color-text)]">{value}</p>
    </div>
  );
}
