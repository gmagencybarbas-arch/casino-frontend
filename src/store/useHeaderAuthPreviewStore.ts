import { create } from "zustand";

/**
 * Demo / apresentação: alternar header entre “logado” (saldo + depositar)
 * e “deslogado” (Entre + Cadastre-se). Ativado ao ir em Promoções.
 */
interface HeaderAuthPreviewState {
  isGuestPreview: boolean;
  setGuestPreview: (guest: boolean) => void;
}

export const useHeaderAuthPreviewStore = create<HeaderAuthPreviewState>((set) => ({
  isGuestPreview: false,
  setGuestPreview: (guest) => set({ isGuestPreview: guest }),
}));
