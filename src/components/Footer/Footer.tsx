"use client";

import Link from "next/link";
import { ProviderLogo } from "@/components/ProviderLogo";
import { useThemeCustomizerModalStore } from "@/store/useThemeCustomizerModalStore";
import { api } from "@/services/api";
import type { Provider } from "@/types/game";
import { useEffect, useState } from "react";

export function Footer() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const setCustomizerOpen = useThemeCustomizerModalStore((s) => s.setOpen);

  useEffect(() => {
    api.getProviders().then(setProviders);
  }, []);

  const footerLinks = {
    apoio: [
      { label: "Termos de Uso", href: "/terms" },
      { label: "Política de Privacidade", href: "/privacy" },
    ],
    comunidade: [
      { label: "Instagram", href: "#" },
      { label: "Telegram", href: "#" },
      { label: "WhatsApp", href: "#" },
    ],
    regras: [
      { label: "Regras dos Jogos", href: "/rules" },
      { label: "Jogo Responsável", href: "/responsible-gaming" },
    ],
    uteis: [
      { label: "Central de Ajuda", href: "/help" },
      { label: "Depositar", href: "/deposit" },
      { label: "Sacar", href: "/withdraw" },
    ],
  };

  return (
    <footer className="mt-auto w-full max-w-[100vw] overflow-x-hidden border-t border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-card)]">
      <div className="mx-auto w-full min-w-0 max-w-7xl px-4 py-10 md:px-6">
        <section className="mb-10">
          <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
            Provedores
          </h3>
          <div className="flex flex-wrap justify-center gap-6 md:justify-start">
            {providers.map((provider) => (
              <ProviderLogo
                key={provider.id}
                provider={provider}
                size="sm"
                showName
              />
            ))}
          </div>
        </section>

        <div className="grid grid-cols-2 gap-8 border-t border-[var(--color-border)] pt-8 md:grid-cols-4 lg:gap-12">
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              Apoio
            </h4>
            <ul className="space-y-2">
              {footerLinks.apoio.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              Comunidade
            </h4>
            <ul className="space-y-2">
              {footerLinks.comunidade.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              Regras
            </h4>
            <ul className="space-y-2">
              {footerLinks.regras.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              Links Úteis
            </h4>
            <ul className="space-y-2">
              {footerLinks.uteis.map((link) => (
                <li key={link.href}>
                  {link.href === "/deposit" ? (
                    <button
                      type="button"
                      onClick={() => setCustomizerOpen(true)}
                      className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-[var(--color-border)] pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-[var(--color-text-muted)]">
            © {new Date().getFullYear()} ProjetoX. +18. Apenas para uso em jurisdições permitidas.
          </p>
          <p className="text-xs text-[var(--color-text-muted)]">
            Jogue com responsabilidade.
          </p>
        </div>
      </div>
    </footer>
  );
}
