import { create } from "zustand";

interface ThemeCustomizerModalState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useThemeCustomizerModalStore = create<ThemeCustomizerModalState>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));
