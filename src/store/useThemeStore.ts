import { create } from "zustand";

export interface ThemeColors {
  primary: string;
  background: string;
  card: string;
  text: string;
  accent: string;
  accentSecondary?: string;
  secondary?: string;
}

interface ThemeState {
  colors: ThemeColors;
  logo?: string;
  logoUrl?: string; // Alias for white-label - backend can inject logo URL
  setTheme: (colors: Partial<ThemeColors>) => void;
  setLogo: (logoUrl: string | undefined) => void;
  applyTheme: () => void;
}

const defaultColors: ThemeColors = {
  primary: "#8b5cf6",
  background: "#0f0f12",
  card: "#1a1a20",
  text: "#ffffff",
  accent: "#22c55e",
  accentSecondary: "#22c55e",
  secondary: "#27272a",
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  colors: defaultColors,
  logo: undefined,
  logoUrl: undefined,

  setTheme: (colors) =>
    set((state) => ({
      colors: { ...state.colors, ...colors },
    })),

  setLogo: (logoUrl) => set({ logo: logoUrl, logoUrl }),

  applyTheme: () => {
    const { colors } = get();
    const root = typeof document !== "undefined" ? document.documentElement : null;
    if (root) {
      root.style.setProperty("--color-primary", colors.primary);
      root.style.setProperty("--color-background", colors.background);
      root.style.setProperty("--color-card", colors.card);
      root.style.setProperty("--color-text", colors.text);
      root.style.setProperty("--color-accent", colors.accent);
      root.style.setProperty(
        "--color-accent-secondary",
        colors.accentSecondary ?? colors.accent
      );
      if (colors.secondary) {
        root.style.setProperty("--color-secondary", colors.secondary);
      }
    }
  },
}));
