export interface PromotionContentProps {
  title: string;
  description: string;
  sections: {
    title: string;
    content: string[];
  }[];
  /** Dicas em destaque (bloco visual separado). */
  tips?: string[];
  /** Texto do botão principal. */
  ctaLabel?: string;
  /** Se definido, o CTA é um link (interno ou externo). */
  ctaHref?: string;
  /** Abre `ctaHref` em nova aba (ex.: site parceiro). */
  ctaExternal?: boolean;
}

export function PromotionContent({
  title,
  description,
  sections,
  tips,
  ctaLabel = "Participar da Promoção",
  ctaHref,
  ctaExternal,
}: PromotionContentProps) {
  const ctaClassName =
    "flex w-full items-center justify-center rounded-xl bg-[var(--color-primary)] py-3 text-center text-base font-bold text-black transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-card)]";

  return (
    <div className="promotion-content-enter mx-auto max-w-3xl space-y-8 text-[var(--color-text)]">
      <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>

      <p className="text-[var(--color-text-muted)] leading-relaxed">{description}</p>

      {sections.map((section) => (
        <div key={section.title} className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wide text-[var(--color-primary)] md:text-sm">
            {section.title}
          </h2>
          <ul className="list-none space-y-2 pl-0 text-[var(--color-text-muted)]">
            {section.content.map((item, i) => (
              <li key={i} className="flex gap-2 leading-relaxed">
                <span className="shrink-0 text-[var(--color-primary)]" aria-hidden>
                  •
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {tips && tips.length > 0 ? (
        <div className="space-y-3 rounded-xl border border-[var(--color-primary)]/25 bg-[var(--color-primary)]/[0.08] p-4 md:p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-[var(--color-primary)]">
            Dicas em destaque
          </p>
          <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
            {tips.map((tip, i) => (
              <li key={i} className="flex gap-2 leading-relaxed">
                <span aria-hidden>✨</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {ctaHref ? (
        <a
          href={ctaHref}
          {...(ctaExternal
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className={ctaClassName}
        >
          {ctaLabel}
        </a>
      ) : (
        <button type="button" className={ctaClassName}>
          {ctaLabel}
        </button>
      )}

      <div className="space-y-1 border-t border-[var(--color-border)] pt-6 text-xs text-[var(--color-text-muted)]">
        <p>⚠️ Jogo responsável — defina limites e jogue por diversão.</p>
        <p>🔞 Proibido para menores de 18 anos.</p>
        <p className="text-[var(--color-text-muted)]/80">
          Sujeito a termos, condições e regulamento da promoção.
        </p>
      </div>
    </div>
  );
}
