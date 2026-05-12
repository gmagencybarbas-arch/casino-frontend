"use client";

import { useState } from "react";
import type { TournamentRuleSection } from "@/types/tournament";

export function TournamentRules({ rules }: { rules: TournamentRuleSection[] }) {
  const [openId, setOpenId] = useState<string | null>(rules[0]?.id ?? null);

  return (
    <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-card)]">
      <div className="border-b border-[var(--color-border)] p-4 md:p-5">
        <h2 className="text-lg font-bold text-[var(--color-text)]">Regras e termos</h2>
        <p className="text-sm text-[var(--color-text-muted)]">Expandir cada secção para ler o detalhe.</p>
      </div>
      <ul className="divide-y divide-[var(--color-border)]">
        {rules.map((rule) => {
          const open = openId === rule.id;
          return (
            <li key={rule.id}>
              <button
                type="button"
                onClick={() => setOpenId(open ? null : rule.id)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition hover:bg-[var(--color-card-hover)] md:px-5 md:py-4"
              >
                <span className="font-semibold text-[var(--color-text)]">{rule.title}</span>
                <span
                  className={`shrink-0 text-[var(--color-primary)] transition-transform ${open ? "rotate-180" : ""}`}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              {open ? (
                <div className="border-t border-[var(--color-border)] bg-[var(--color-background-secondary)]/50 px-4 py-3 text-sm leading-relaxed text-[var(--color-text-secondary)] md:px-5 md:py-4">
                  {rule.body}
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
