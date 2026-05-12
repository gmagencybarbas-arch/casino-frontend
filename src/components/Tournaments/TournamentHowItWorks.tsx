import type { TournamentHowItWorksItem } from "@/types/tournament";

export function TournamentHowItWorks({ items }: { items: TournamentHowItWorksItem[] }) {
  return (
    <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] md:p-6">
      <h2 className="mb-4 text-lg font-bold text-[var(--color-text)]">Como funciona</h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li
            key={item.title}
            className="rounded-[12px] border border-[var(--color-border)] bg-[var(--color-background-secondary)] p-4 transition hover:border-[var(--color-border-hover)]"
          >
            <p className="mb-1 text-sm font-bold text-[var(--color-primary)]">{item.title}</p>
            <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
