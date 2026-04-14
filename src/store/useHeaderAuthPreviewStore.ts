import { create } from "zustand";

/**
 * Preview do header: por defeito mostra convidado (Entre + Cadastre-se).
 * Após “login” no modal, fica logado (saldo + depositar) até nova sessão/recarga
 * se não fizer persistência (demo).
 */
interface HeaderAuthPreviewState {
  /** true = cabeçalho deslogado (convidado); false = logado (saldo + depositar) */
  isGuestPreview: boolean;
  setGuestPreview: (guest: boolean) => void;
}

export const useHeaderAuthPreviewStore = create<HeaderAuthPreviewState>((set) => ({
  isGuestPreview: true,
  setGuestPreview: (guest) => set({ isGuestPreview: guest }),
}));
