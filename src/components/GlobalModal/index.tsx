"use client";

import { useCallback, useEffect, useState } from "react";
import { useGlobalModal } from "@/store/useGlobalModal";
import { useHeaderAuthPreviewStore } from "@/store/useHeaderAuthPreviewStore";
import { useThemeCustomizerModalStore } from "@/store/useThemeCustomizerModalStore";
import { useAccountStore } from "@/store/useAccountStore";
import { SITE_NAME } from "@/constants/site";
import desktopBannerDefault from "@/services/img_banner_register/registredesktop.png";
import mobileBannerDefault from "@/services/img_banner_register/registremobile.png";
import { formatBRL } from "@/lib/accountFormat";

const inputClassName =
  "w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:border-[var(--color-primary)]";

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

export function GlobalModal() {
  const { isOpen, type, close, open: openModal } = useGlobalModal();
  const setGuestPreview = useHeaderAuthPreviewStore((s) => s.setGuestPreview);
  const setCustomizerOpen = useThemeCustomizerModalStore((s) => s.setOpen);
  const loginMock = useAccountStore((s) => s.loginMock);
  const requestWithdraw = useAccountStore((s) => s.requestWithdraw);
  const walletBalance = useAccountStore((s) => s.wallet.totalBalance);

  const [loginId, setLoginId] = useState("");
  const [loginSenha, setLoginSenha] = useState("");
  const [loginAceitoTermos, setLoginAceitoTermos] = useState(false);

  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [aceitoTermos, setAceitoTermos] = useState(false);
  const [codigoIndicacao, setCodigoIndicacao] = useState("");

  const [valorDeposito, setValorDeposito] = useState("");
  const [valorSaque, setValorSaque] = useState("");
  const [tipoPix, setTipoPix] = useState("cpf");
  const [chavePix, setChavePix] = useState("130.589.359-29");

  const resetForms = useCallback(() => {
    setLoginId("");
    setLoginSenha("");
    setLoginAceitoTermos(false);
    setCpf("");
    setEmail("");
    setTelefone("");
    setSenha("");
    setAceitoTermos(false);
    setCodigoIndicacao("");
    setValorDeposito("");
    setValorSaque("");
    setTipoPix("cpf");
    setChavePix("130.589.359-29");
  }, []);

  useEffect(() => {
    if (!isOpen) {
      resetForms();
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, resetForms]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginAceitoTermos) return;
    loginMock();
    close();
    setGuestPreview(false);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    close();
  };

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    close();
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = Number(valorSaque.replace(/[^\d,.-]/g, "").replace(",", "."));
    if (!Number.isFinite(parsed) || parsed <= 0) return;
    requestWithdraw(parsed);
    close();
  };

  const openThemeFromDeposit = () => {
    close();
    setCustomizerOpen(true);
  };

  if (!isOpen || !type) return null;

  const desktopSrc = desktopBannerDefault.src;
  const mobileSrc = mobileBannerDefault.src;
  const withdrawValue = Number(valorSaque.replace(/[^\d,.-]/g, "").replace(",", "."));
  const afterWithdraw = Number.isFinite(withdrawValue) ? Math.max(0, walletBalance - withdrawValue) : walletBalance;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="global-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        aria-label="Fechar"
        onClick={close}
      />
      <div
        className="register-modal-shell relative z-[101] flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-elevated)] md:flex-row md:items-stretch"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="aspect-[16/9] w-full shrink-0 overflow-hidden md:hidden">
          <img src={mobileSrc} alt="" className="h-full w-full object-cover" />
        </div>

        <div className="relative hidden min-h-0 w-full shrink-0 md:flex md:w-1/2 md:max-h-full md:items-stretch">
          <div className="relative aspect-[9/16] max-h-full min-h-0 w-full">
            <img src={desktopSrc} alt="" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </div>

        <div className="relative flex min-h-0 flex-1 flex-col md:w-1/2 md:max-h-full md:overflow-hidden">
          <button
            type="button"
            onClick={close}
            className="absolute right-3 top-3 z-10 rounded-lg p-2 text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-background-secondary)] hover:text-[var(--color-text)] md:right-4 md:top-4"
            aria-label="Fechar"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="scrollbar-hide-mobile flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto px-5 pb-6 pt-12 text-center sm:px-8 md:px-10 md:pb-8 md:pt-10">
            {type === "login" && (
              <>
                <div className="mb-6 w-full max-w-md md:mb-8">
                  <h2
                    id="global-modal-title"
                    className="text-balance text-xl font-bold tracking-tight text-[var(--color-text)] md:text-2xl md:font-bold md:text-[var(--color-primary)]"
                  >
                    Entrar
                  </h2>
                  <p className="mt-3 text-balance text-sm leading-relaxed text-[var(--color-text-muted)] md:mt-4">
                    Acesse sua conta para continuar jogando com segurança.
                  </p>
                </div>
                <form
                  onSubmit={handleLoginSubmit}
                  className="flex w-full max-w-md flex-col items-stretch gap-4 md:mx-auto"
                >
                  <input
                    type="text"
                    autoComplete="username"
                    aria-label="E-mail ou CPF"
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                    className={inputClassName}
                    placeholder="E-mail ou CPF"
                  />
                  <input
                    type="password"
                    autoComplete="current-password"
                    aria-label="Senha"
                    value={loginSenha}
                    onChange={(e) => setLoginSenha(e.target.value)}
                    className={inputClassName}
                    placeholder="Senha"
                  />

                  <div className="flex w-full cursor-pointer items-start gap-2.5 text-left">
                    <input
                      type="checkbox"
                      id="login-terms"
                      checked={loginAceitoTermos}
                      onChange={(e) => setLoginAceitoTermos(e.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                    />
                    <label htmlFor="login-terms" className="text-sm leading-snug text-[var(--color-text)]">
                      Li e aceito os{" "}
                      <a
                        href="/terms"
                        className="font-medium text-[var(--color-primary)] underline underline-offset-2 hover:brightness-110"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        termos e condições
                      </a>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={!loginAceitoTermos}
                    className="w-full rounded-xl bg-[var(--color-primary)] py-3.5 text-sm font-bold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Entrar
                  </button>

                  <button
                    type="button"
                    className="flex w-full items-center justify-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-background-secondary)] py-3.5 text-sm font-semibold text-[var(--color-text)] transition hover:bg-[var(--color-card-hover)]"
                    onClick={() => {
                      /* OAuth Google — integrar quando houver backend */
                    }}
                  >
                    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" aria-hidden>
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Entrar com Google
                  </button>
                </form>

                <div className="mt-5 w-full max-w-md space-y-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-background-secondary)] p-4 text-left text-xs leading-relaxed text-[var(--color-text-muted)]">
                  <p>
                    Ao fazer login, estou de acordo com os novos{" "}
                    <a
                      href="/terms"
                      className="font-medium text-[var(--color-accent)] underline underline-offset-2 hover:brightness-110"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Termos e Condições
                    </a>
                    .
                  </p>
                  <p>
                    Esteja atento aos riscos de dependência. Em caso de dúvidas, acesse a nossa{" "}
                    <a
                      href="/responsible-gaming"
                      className="font-medium text-[var(--color-accent)] underline underline-offset-2 hover:brightness-110"
                    >
                      Central de jogo responsável
                    </a>
                    .
                  </p>
                </div>

                <p className="mt-6 text-sm text-[var(--color-text)]">
                  Não tem conta?{" "}
                  <button
                    type="button"
                    onClick={() => openModal("register")}
                    className="font-bold text-[var(--color-primary)] underline underline-offset-2 hover:brightness-110"
                  >
                    Criar conta agora!
                  </button>
                </p>
              </>
            )}

            {type === "register" && (
              <>
                <div className="mb-6 w-full max-w-md md:mb-8">
                  <h2
                    id="global-modal-title"
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
                  onSubmit={handleRegisterSubmit}
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
                      id="global-register-terms"
                      checked={aceitoTermos}
                      onChange={(e) => setAceitoTermos(e.target.checked)}
                      className="mt-1 h-4 w-4 shrink-0 rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                    />
                    <label htmlFor="global-register-terms" className="text-sm text-[var(--color-text-muted)]">
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
              </>
            )}

            {type === "deposit" && (
              <>
                <div className="mb-6 w-full max-w-md md:mb-8">
                  <h2
                    id="global-modal-title"
                    className="text-balance text-xl font-bold tracking-tight text-[var(--color-text)] md:text-2xl md:font-bold md:text-[var(--color-primary)]"
                  >
                    Depositar
                  </h2>
                  <p className="mt-3 text-balance text-sm leading-relaxed text-[var(--color-text-muted)] md:mt-4">
                    Escolha o valor e confirme para adicionar saldo à sua conta.
                  </p>
                </div>
                <form
                  onSubmit={handleDepositSubmit}
                  className="flex w-full max-w-md flex-col items-center gap-4 md:mx-auto"
                >
                  <div className="w-full text-left">
                    <label className="mb-1 block text-xs font-medium text-[var(--color-text-muted)]">
                      Valor (R$)
                    </label>
                    <input
                      type="text"
                      inputMode="decimal"
                      aria-label="Valor"
                      value={valorDeposito}
                      onChange={(e) => setValorDeposito(e.target.value)}
                      className={inputClassName}
                      placeholder="0,00"
                    />
                  </div>
                  <p className="w-full rounded-lg bg-[var(--color-background-secondary)] px-3 py-2 text-left text-xs text-[var(--color-text-muted)]">
                    PIX instantâneo — confirmação em segundos.
                  </p>
                  <button
                    type="submit"
                    className="w-full max-w-md rounded-lg bg-[var(--color-primary)] py-3 text-sm font-bold text-black transition hover:brightness-110"
                  >
                    Continuar
                  </button>
                  <button
                    type="button"
                    onClick={openThemeFromDeposit}
                    className="text-sm text-[var(--color-text-muted)] underline transition hover:text-[var(--color-primary)]"
                  >
                    Personalizar cores do tema
                  </button>
                </form>
              </>
            )}

            {type === "withdraw" && (
              <>
                <div className="mb-6 w-full max-w-md md:mb-8">
                  <h2
                    id="global-modal-title"
                    className="text-balance text-xl font-bold tracking-tight text-[var(--color-text)] md:text-2xl md:font-bold md:text-[var(--color-primary)]"
                  >
                    Solicitar saque
                  </h2>
                  <p className="mt-3 text-balance text-sm leading-relaxed text-[var(--color-text-muted)] md:mt-4">
                    O saque deve ser realizado exclusivamente para contas ou chaves vinculadas ao CPF do titular.
                  </p>
                </div>
                <form onSubmit={handleWithdrawSubmit} className="flex w-full max-w-md flex-col items-center gap-3 md:mx-auto">
                  <div className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background-secondary)] px-3 py-2 text-left text-xs text-[var(--color-text-muted)]">
                    Nome: <span className="text-[var(--color-text)]">Joassir de Santos Nogueira</span>
                    <br />
                    CPF: <span className="text-[var(--color-text)]">130.589.359-29</span>
                  </div>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={valorSaque}
                    onChange={(e) => setValorSaque(e.target.value)}
                    className={inputClassName}
                    placeholder="Valor do saque (R$)"
                  />
                  <select
                    value={tipoPix}
                    onChange={(e) => setTipoPix(e.target.value)}
                    className={inputClassName}
                  >
                    <option value="cpf">CPF</option>
                    <option value="telefone">Telefone</option>
                    <option value="email">Email</option>
                    <option value="aleatoria">Aleatoria</option>
                    <option value="conta_bancaria">Conta bancaria</option>
                  </select>
                  <input
                    type="text"
                    value={chavePix}
                    onChange={(e) => setChavePix(e.target.value)}
                    className={inputClassName}
                    placeholder="Chave Pix"
                  />
                  <div className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background-secondary)] px-3 py-2 text-left text-xs">
                    <p className="text-[var(--color-text-muted)]">Saldo atual: <span className="font-semibold text-[var(--color-text)]">{formatBRL(walletBalance)}</span></p>
                    <p className="mt-1 text-[var(--color-text-muted)]">
                      Saldo apos saque:{" "}
                      <span className="font-semibold text-rose-300 transition-all">{formatBRL(afterWithdraw)}</span>
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-[var(--color-primary)] py-3 text-sm font-bold text-black transition hover:brightness-110"
                  >
                    Confirmar saque
                  </button>
                </form>
              </>
            )}

            {type === "support" && (
              <>
                <div className="mb-6 w-full max-w-md md:mb-8">
                  <h2
                    id="global-modal-title"
                    className="text-balance text-xl font-bold tracking-tight text-[var(--color-text)] md:text-2xl md:font-bold md:text-[var(--color-primary)]"
                  >
                    Suporte ao vivo
                  </h2>
                  <p className="mt-3 text-balance text-sm leading-relaxed text-[var(--color-text-muted)] md:mt-4">
                    Atendimento 24h. Em ambiente real, este botao abre o live chat do provedor.
                  </p>
                </div>
                <div className="w-full max-w-md space-y-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-background-secondary)] p-4 text-left">
                  <p className="text-sm text-[var(--color-text)]">Tempo medio de resposta: 2 minutos</p>
                  <p className="text-xs text-[var(--color-text-muted)]">Fale com financeiro, bonus, limite de conta ou verificacao KYC.</p>
                  <button
                    type="button"
                    onClick={close}
                    className="w-full rounded-lg bg-[var(--color-primary)] py-3 text-sm font-bold text-black transition hover:brightness-110"
                  >
                    Iniciar atendimento
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
