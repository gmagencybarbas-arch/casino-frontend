import { create } from "zustand";

interface ModalStore {
  isRegisterOpen: boolean;
  openRegister: () => void;
  closeRegister: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isRegisterOpen: false,
  openRegister: () => set({ isRegisterOpen: true }),
  closeRegister: () => set({ isRegisterOpen: false }),
}));
