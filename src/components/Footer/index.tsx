"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, type ReactNode } from "react";
import { SITE_NAME } from "@/constants/site";
import { SidebarIcon } from "@/components/Sidebar/SidebarIcon";
import { useThemeStore } from "@/store/useThemeStore";

const linkClass =
  "text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-primary)]";

const headingClass =
  "mb-4 text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]";

function SocialLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--color-primary)] transition-opacity hover:opacity-80"
    >
      {children}
    </a>
  );
}

export function Footer() {
  const brandLogo = useThemeStore((s) => s.logo ?? s.logoUrl);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto hidden w-full min-w-0 max-w-[100vw] overflow-x-hidden border-t border-[var(--color-border)] bg-[var(--color-background)] md:block">
      <div className="mx-auto max-w-[1400px] px-6 py-10 lg:py-14">
        {/* Bloco principal: esquerda (marca + pagamentos + textos) | direita (4 colunas) */}
        <div className="flex flex-col gap-12 xl:flex-row xl:gap-16 2xl:gap-20">
          <div className="min-w-0 shrink-0 space-y-8 xl:max-w-md xl:flex-1">
            <div>
              <Link href="/" className="mb-5 inline-flex items-center" prefetch>
                {brandLogo ? (
                  <Image
                    src={brandLogo}
                    alt={SITE_NAME}
                    width={160}
                    height={48}
                    className="h-10 w-auto max-w-[180px] object-contain object-left lg:h-11"
                    unoptimized
                  />
                ) : (
                  <span className="text-xl font-bold tracking-tight text-[var(--color-text)] lg:text-2xl">
                    {SITE_NAME}
                  </span>
                )}
              </Link>

              <div className="mb-5 flex flex-wrap items-center gap-1">
                <SocialLink href="#" label="Instagram">
                  <SidebarIcon name="instagram" className="h-5 w-5" />
                </SocialLink>
                <SocialLink href="#" label="Facebook">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </SocialLink>
                <SocialLink href="#" label="WhatsApp">
                  <SidebarIcon name="whatsapp" className="h-5 w-5" />
                </SocialLink>
                <SocialLink href="#" label="Telegram">
                  <SidebarIcon name="telegram" className="h-5 w-5" />
                </SocialLink>
                <SocialLink href="#" label="X">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </SocialLink>
                <SocialLink href="#" label="YouTube">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </SocialLink>
              </div>

              <p className="mb-3 text-sm font-medium text-[var(--color-text)]">
                Feito com <span className="text-[var(--color-primary)]">♥</span> para brasileiros!
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--color-primary)]">
                © {SITE_NAME} — {year} todos os direitos reservados
              </p>
            </div>

            <div className="space-y-5 border-t border-[var(--color-border)] pt-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wide text-[var(--color-text)]">
                  Pague com:
                </span>
                <span className="rounded-md bg-[var(--color-text)] px-3 py-1.5 text-xs font-bold text-[var(--color-background)]">
                  PIX
                </span>
                <span className="rounded-md bg-[var(--color-card)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] ring-1 ring-[var(--color-border)]">
                  Visa
                </span>
                <span className="rounded-md bg-[var(--color-card)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] ring-1 ring-[var(--color-border)]">
                  Mastercard
                </span>
              </div>

              <p className="text-[11px] leading-relaxed text-[var(--color-text-secondary)]">
                Slots, cassino ao vivo, apostas esportivas e promoções com foco em segurança e
                experiência mobile. Cashback, torneios e ofertas sujeitas a regulamento.
              </p>
              <p className="text-[11px] leading-relaxed text-[var(--color-text-muted)]">
                {SITE_NAME} é uma marca de entretenimento digital voltada ao público brasileiro,
                com suporte em português e práticas alinhadas à transparência e ao jogo responsável.
              </p>
            </div>
          </div>

          <div className="grid min-w-0 flex-1 grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-6">
            <div>
              <h4 className={headingClass}>Aposte</h4>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/games/sports" className={linkClass}>
                    Apostas esportivas
                  </Link>
                </li>
                <li>
                  <Link href="/games/sports" className={linkClass}>
                    Esportes ao vivo
                  </Link>
                </li>
                <li>
                  <Link href="/games/slots" className={linkClass}>
                    Jogos slots
                  </Link>
                </li>
                <li>
                  <Link href="/games/live" className={linkClass}>
                    Jogos ao vivo
                  </Link>
                </li>
                <li>
                  <Link href="/games/videobingo" className={linkClass}>
                    Videobingo
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className={headingClass}>Comunidade</h4>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/promotions" className={linkClass}>
                    Promoções
                  </Link>
                </li>
                <li>
                  <a href="#" className={linkClass}>
                    Blog
                  </a>
                </li>
                <li>
                  <Link href="/help" className={linkClass}>
                    Central de ajuda
                  </Link>
                </li>
                <li>
                  <a href="#" className={linkClass}>
                    Canais de atendimento
                  </a>
                </li>
                <li>
                  <a href="#" className={linkClass}>
                    Aplicativo móvel
                  </a>
                </li>
                <li>
                  <a href="#" className={linkClass}>
                    Telegram
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className={headingClass}>Regras</h4>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/terms" className={linkClass}>
                    Termos e condições
                  </Link>
                </li>
                <li>
                  <Link href="/pld-ftp" className={linkClass}>
                    Política PLD/FTP
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className={linkClass}>
                    Política de privacidade
                  </Link>
                </li>
                <li>
                  <Link href="/kyc" className={linkClass}>
                    Política KYC
                  </Link>
                </li>
                <li>
                  <Link href="/promotions/clube-vip-verabet" className={linkClass}>
                    Clube VIP
                  </Link>
                </li>
                <li>
                  <Link href="/responsible-gaming" className={linkClass}>
                    Jogo responsável
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className={headingClass}>Links úteis</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-2 rounded-lg bg-[var(--color-card)] px-3 py-2.5 text-xs font-bold uppercase tracking-wide text-[var(--color-text)] ring-1 ring-[var(--color-border)] transition-colors hover:bg-[var(--color-card-hover)]"
                  >
                    <SidebarIcon name="whatsapp" className="h-4 w-4 text-[var(--color-primary)]" />
                    Suporte ao vivo
                  </a>
                </li>
                <li>
                  <Link href="/help" className={`${linkClass} text-sm font-medium`}>
                    Contate-nos
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Legal / compliance — textos centralizados */}
        <div className="mt-12 space-y-6 border-t border-[var(--color-border)] pt-10 text-center">
          <p className="mx-auto max-w-3xl text-[11px] leading-relaxed text-[var(--color-text-secondary)]">
            Informações societárias e licenciamento devem ser preenchidas conforme o operador real.
            Substitua este texto pelos dados da sua empresa (razão social, CNPJ, endereço e
            referências legais aplicáveis à sua jurisdição).
          </p>
          <p className="mx-auto max-w-3xl text-[11px] leading-relaxed text-[var(--color-text-muted)]">
            Utilizamos cookies e tecnologias semelhantes para melhorar a navegação, personalizar
            conteúdo e analisar tráfego. Ao continuar, você concorda com a nossa política de cookies e
            privacidade.
          </p>
          <p className="mx-auto max-w-3xl text-[11px] font-medium leading-relaxed text-[var(--color-primary)]">
            Atenção: o uso indevido de benefícios públicos (ex.: Bolsa Família, BPC) para apostas é
            ilegal e pode acarretar sanções. Jogue com responsabilidade. Proibido para menores de 18
            anos.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
            <div className="inline-flex overflow-hidden rounded-full bg-[var(--color-card)] p-1 ring-1 ring-[var(--color-border)]">
              <Link
                href="/ombudsman"
                className="px-4 py-2 text-[10px] font-bold uppercase tracking-wide text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-primary)]"
              >
                Ouvidoria
              </Link>
              <span className="w-px self-stretch bg-[var(--color-border)]" aria-hidden />
              <Link
                href="/reports"
                className="px-4 py-2 text-[10px] font-bold uppercase tracking-wide text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-primary)]"
              >
                Denúncias
              </Link>
              <span className="w-px self-stretch bg-[var(--color-border)]" aria-hidden />
              <Link
                href="/privacy"
                className="px-4 py-2 text-[10px] font-bold uppercase tracking-wide text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-primary)]"
              >
                Privacidade
              </Link>
            </div>

            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-[var(--color-primary)] text-center text-[9px] font-bold leading-tight text-[var(--color-primary)]"
              aria-hidden
            >
              18+
            </div>
          </div>
          <p className="mx-auto max-w-2xl text-[10px] leading-relaxed text-[var(--color-text-muted)]">
            Operado em conformidade com as normas aplicáveis ao seu mercado. Selo e licença oficiais
            podem ser exibidos aqui.
          </p>
        </div>

        {/* Faixa parceiros / confiança (placeholders) */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 border-t border-[var(--color-border)] pt-8 opacity-80">
          <span className="rounded-md bg-[var(--color-card)] px-3 py-2 text-[10px] font-semibold uppercase text-[var(--color-text-muted)] ring-1 ring-[var(--color-border)]">
            Google Play
          </span>
          <span className="text-[10px] font-medium text-[var(--color-text-muted)]">18+</span>
          <span className="text-[10px] font-medium text-[var(--color-text-muted)]">Jogo responsável</span>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={scrollToTop}
            className="rounded-full bg-[var(--color-card)] px-5 py-2.5 text-xs font-semibold text-[var(--color-text-secondary)] ring-1 ring-[var(--color-border)] transition-colors hover:bg-[var(--color-card-hover)] hover:text-[var(--color-text)]"
          >
            ↑ De volta ao topo
          </button>
        </div>
      </div>
    </footer>
  );
}
