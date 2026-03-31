"use client";

import { useEffect, useState } from "react";
import type { StaticImageData } from "next/image";
import { useModalStore } from "@/store/modalStore";
import { SITE_NAME } from "@/constants/site";
import desktopBannerDefault from "@/services/img_banner_register/registredesktop.png";
import mobileBannerDefault from "@/services/img_banner_register/registremobile.png";

export interface RegisterModalProps {
  /** Imagem vertical (story) — desktop (md+). Por defeito: `registredesktop.png` em `src/services/img_banner_register`. */
  desktopPromoImage?: string;
  /** Imagem horizontal — mobile (acima do formulário). Por defeito: `registremobile.png` em `src/services/img_banner_register`. */
  mobilePromoImage?: string;
}

function resolvePromoSrc(url: string | undefined, fallback: StaticImageData): string {
  return url?.trim() || fallback.src;
}

function formatCPF(value: string) {
  return value
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (!digits) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

const inputClassName =
  "w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:border-[var(--color-primary)]";

export default function RegisterModal({
  desktopPromoImage,
  mobilePromoImage,
}: RegisterModalProps) {
  const desktopSrc = resolvePromoSrc(desktopPromoImage, desktopBannerDefault);
  const mobileSrc = resolvePromoSrc(mobilePromoImage, mobileBannerDefault);

  const isRegisterOpen = useModalStore((s) => s.isRegisterOpen);
  const closeRegister = useModalStore((s) => s.closeRegister);

  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [aceitoTermos, setAceitoTermos] = useState(false);
  const [codigoIndicacao, setCodigoIndicacao] = useState("");

  useEffect(() => {
    if (!isRegisterOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isRegisterOpen]);

  if (!isRegisterOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrar API de cadastro
    closeRegister();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="register-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        aria-label="Fechar"
        onClick={closeRegister}
      />
      <div
        className="register-modal-shell relative z-[101] flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-elevated)] md:flex-row md:items-stretch"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile: banner acima do formulário */}
        <div className="aspect-[16/9] w-full shrink-0 overflow-hidden md:hidden">
          <img src={mobileSrc} alt="" className="h-full w-full object-cover" />
        </div>

        {/* Desktop: metade da largura + 9:16 — altura limitada pelo .register-modal-shell */}
        <div className="relative hidden min-h-0 w-full shrink-0 md:flex md:w-1/2 md:max-h-full md:items-stretch">
          <div className="relative aspect-[9/16] max-h-full min-h-0 w-full">
            <img src={desktopSrc} alt="" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </div>

        {/* Coluna: conteúdo centrado; botão fechar absoluto */}
        <div className="relative flex min-h-0 flex-1 flex-col md:w-1/2 md:max-h-full md:overflow-hidden">
          <button
            type="button"
            onClick={closeRegister}
            className="absolute right-3 top-3 z-10 rounded-lg p-2 text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-background-secondary)] hover:text-[var(--color-text)] md:right-4 md:top-4"
            aria-label="Fechar cadastro"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto px-5 pb-6 pt-12 text-center sm:px-8 md:px-10 md:pb-8 md:pt-10">
            <div className="mb-6 w-full max-w-md md:mb-8">
              <h2
                id="register-modal-title"
                className="text-balance text-xl font-bold tracking-tight text-[var(--color-text)] md:text-2xl md:font-bold md:text-[var(--color-primary)]"
              >
                <span className="md:hidden">Criar conta</span>
                <span className="hidden md:inline">Bem-Vindos a {SITE_NAME}</span>
              </h2>
              <p className="mt-3 hidden text-balance text-sm leading-relaxed text-[var(--color-text)] md:block">
                Registre-se e aproveite o melhor
                <br />
                da aposta e diversão com a gente!
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex w-full max-w-md flex-col items-center gap-4 md:mx-auto"
            >
              <input
                type="text"
                inputMode="numeric"
                autoComplete="off"
                aria-label="CPF"
                value={cpf}
                onChange={(e) => setCpf(formatCPF(e.target.value))}
                className={inputClassName}
                placeholder="CPF"
              />
              <input
                type="email"
                autoComplete="email"
                aria-label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClassName}
                placeholder="Email"
              />
              <input
                type="tel"
                autoComplete="tel"
                aria-label="Telefone"
                value={telefone}
                onChange={(e) => setTelefone(formatPhone(e.target.value))}
                className={inputClassName}
                placeholder="Telefone"
              />
              <input
                type="password"
                autoComplete="new-password"
                aria-label="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className={inputClassName}
                placeholder="Senha"
              />

              <div className="flex w-full cursor-pointer items-start gap-2 text-left">
                <input
                  type="checkbox"
                  id="register-terms"
                  checked={aceitoTermos}
                  onChange={(e) => setAceitoTermos(e.target.checked)}
                  className="mt-1 h-4 w-4 shrink-0 rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                />
                <label htmlFor="register-terms" className="text-sm text-[var(--color-text-muted)]">
                  Li e aceito os{" "}
                  <a href="/terms" className="text-[var(--color-primary)] underline hover:brightness-110">
                    termos e condições
                  </a>
                </label>
              </div>

              <input
                type="text"
                aria-label="Código de indicação"
                value={codigoIndicacao}
                onChange={(e) => setCodigoIndicacao(e.target.value)}
                className={inputClassName}
                placeholder="Código de indicação (opcional)"
              />

              <button
                type="submit"
                disabled={!aceitoTermos}
                className="mt-1 w-full max-w-md rounded-lg bg-[var(--color-primary)] py-3 text-sm font-bold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Finalizar Cadastro
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
