"use client";

import { useEffect, useRef, useState } from "react";
import { useThemeStore } from "@/store/useThemeStore";
import { useThemeCustomizerModalStore } from "@/store/useThemeCustomizerModalStore";

function cssColorToHex(prop: string): string {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(prop).trim();
  if (!raw) return "#000000";
  if (raw.startsWith("#")) {
    const h = raw.slice(0, 7);
    return /^#[0-9a-fA-F]{6}$/.test(h) ? h : "#000000";
  }
  const rgb = raw.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (rgb) {
    const toHex = (n: string) => Math.min(255, parseInt(n, 10)).toString(16).padStart(2, "0");
    return `#${toHex(rgb[1])}${toHex(rgb[2])}${toHex(rgb[3])}`;
  }
  return "#000000";
}

type Snapshot = {
  primary: string;
  background: string;
  card: string;
  text: string;
  accent: string;
  accentSecondary: string;
  logo: string | undefined;
};

function applyRootColors(
  p: string,
  bg: string,
  c: string,
  t: string,
  accent: string,
  accentSec: string
) {
  const root = document.documentElement;
  root.style.setProperty("--color-primary", p);
  root.style.setProperty("--color-background", bg);
  root.style.setProperty("--color-card", c);
  root.style.setProperty("--color-text", t);
  root.style.setProperty("--color-accent", accent);
  root.style.setProperty("--color-accent-secondary", accentSec);
}

export function ThemeCustomizerModal() {
  const open = useThemeCustomizerModalStore((s) => s.open);
  const setOpen = useThemeCustomizerModalStore((s) => s.setOpen);
  const setTheme = useThemeStore((s) => s.setTheme);
  const setLogo = useThemeStore((s) => s.setLogo);
  const applyTheme = useThemeStore((s) => s.applyTheme);

  const snapshotRef = useRef<Snapshot | null>(null);
  const sessionBlobRef = useRef<string | null>(null);

  const [primary, setPrimary] = useState("#e5b318");
  const [background, setBackground] = useState("#0a0a0d");
  const [card, setCard] = useState("#141419");
  const [text, setText] = useState("#f5f5f7");

  useEffect(() => {
    if (!open) return;
    const snap: Snapshot = {
      primary: cssColorToHex("--color-primary"),
      background: cssColorToHex("--color-background"),
      card: cssColorToHex("--color-card"),
      text: cssColorToHex("--color-text"),
      accent: cssColorToHex("--color-accent"),
      accentSecondary: cssColorToHex("--color-accent-secondary"),
      logo: useThemeStore.getState().logo ?? useThemeStore.getState().logoUrl,
    };
    snapshotRef.current = snap;
    setPrimary(snap.primary);
    setBackground(snap.background);
    setCard(snap.card);
    setText(snap.text);
    sessionBlobRef.current = null;
  }, [open]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const pushLive = (p: string, bg: string, c: string, t: string) => {
    applyRootColors(p, bg, c, t, p, p);
    setTheme({ primary: p, background: bg, card: c, text: t, accent: p, accentSecondary: p });
  };

  const onPrimary = (v: string) => {
    setPrimary(v);
    pushLive(v, background, card, text);
  };

  const onBackground = (v: string) => {
    setBackground(v);
    pushLive(primary, v, card, text);
  };

  const onCard = (v: string) => {
    setCard(v);
    pushLive(primary, background, v, text);
  };

  const onText = (v: string) => {
    setText(v);
    pushLive(primary, background, card, v);
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !/^image\/(png|webp)$/i.test(file.type)) return;
    if (sessionBlobRef.current) {
      URL.revokeObjectURL(sessionBlobRef.current);
      sessionBlobRef.current = null;
    }
    const url = URL.createObjectURL(file);
    sessionBlobRef.current = url;
    setLogo(url);
  };

  const handleCancel = () => {
    const snap = snapshotRef.current;
    if (snap) {
      applyRootColors(
        snap.primary,
        snap.background,
        snap.card,
        snap.text,
        snap.accent,
        snap.accentSecondary
      );
      setTheme({
        primary: snap.primary,
        background: snap.background,
        card: snap.card,
        text: snap.text,
        accent: snap.accent,
        accentSecondary: snap.accentSecondary,
      });
      setLogo(snap.logo);
      applyTheme();
    }
    if (sessionBlobRef.current) {
      URL.revokeObjectURL(sessionBlobRef.current);
      sessionBlobRef.current = null;
    }
    setOpen(false);
  };

  const handleApply = () => {
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="theme-customizer-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        aria-label="Fechar"
        onClick={handleCancel}
      />
      <div
        className="relative z-[101] w-full max-w-[420px] rounded-xl p-6 shadow-xl"
        style={{
          backgroundColor: "var(--color-card)",
          boxShadow: "var(--shadow-elevated)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="theme-customizer-title"
          className="mb-6 text-xl font-bold tracking-tight text-[var(--color-text)]"
        >
          Personalizar Tema
        </h2>

        <div className="flex flex-col gap-4">
          <section
            className="rounded-lg border p-4 shadow-[var(--shadow-card)]"
            style={{
              borderColor: "var(--color-border)",
              backgroundColor: "var(--color-background-secondary)",
            }}
          >
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              Cores do tema
            </h3>
            <div className="flex flex-col gap-4">
              <ColorRow label="Cor primária" value={primary} onChange={onPrimary} id="tc-primary" />
              <ColorRow
                label="Fundo (background)"
                value={background}
                onChange={onBackground}
                id="tc-bg"
              />
              <ColorRow label="Cartões (card)" value={card} onChange={onCard} id="tc-card" />
              <ColorRow label="Texto" value={text} onChange={onText} id="tc-text" />
            </div>
          </section>

          <section
            className="rounded-lg border p-4 shadow-[var(--shadow-card)]"
            style={{
              borderColor: "var(--color-border)",
              backgroundColor: "var(--color-background-secondary)",
            }}
          >
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              Logo
            </h3>
            <label className="block text-sm font-medium text-[var(--color-text-secondary)]">
              Enviar logo (PNG ou WebP)
            </label>
            <input
              type="file"
              accept="image/png,image/webp"
              onChange={handleLogoChange}
              className="mt-2 block w-full cursor-pointer rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm text-[var(--color-text)] file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-[var(--color-primary)] file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-[var(--color-accent-text)]"
            />
            <p className="mt-2 text-xs text-[var(--color-text-muted)]">
              O logo aparece no header (máx. 40px de altura, proporção mantida).
            </p>
          </section>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-lg border px-5 py-2.5 text-sm font-semibold shadow-sm transition-colors"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-background)",
                color: "var(--color-text)",
              }}
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="rounded-lg px-5 py-2.5 text-sm font-bold shadow-[var(--shadow-card)] transition-all hover:shadow-[var(--shadow-card-hover)]"
              style={{
                backgroundColor: "var(--color-accent)",
                color: "var(--color-accent-text)",
              }}
            >
              Aplicar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ColorRow({
  label,
  value,
  onChange,
  id,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  id: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <label htmlFor={id} className="min-w-0 flex-1 text-sm font-medium text-[var(--color-text)]">
        {label}
      </label>
      <div className="flex shrink-0 items-center gap-2">
        <input
          id={id}
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-14 cursor-pointer overflow-hidden rounded-lg border shadow-sm"
          style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-background)" }}
          aria-label={label}
        />
        <span className="hidden w-20 font-mono text-xs text-[var(--color-text-muted)] sm:block">
          {value}
        </span>
      </div>
    </div>
  );
}
