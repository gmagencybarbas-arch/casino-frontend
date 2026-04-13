import { create } from "zustand";

export type GlobalModalType = "register" | "login" | "deposit" | null;

interface GlobalModalState {
  type: GlobalModalType;
  isOpen: boolean;
  open: (type: Exclude<GlobalModalType, null>) => void;
  close: () => void;
}

export const useGlobalModal = create<GlobalModalState>((set) => ({
  type: null,
  isOpen: false,
  open: (type) => set({ type, isOpen: true }),
  close: () => set({ type: null, isOpen: false }),
}));
