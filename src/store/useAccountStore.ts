import { create } from "zustand";
import {
  accountBonusesMock,
  accountBetsMock,
  accountProfileMock,
  accountSessionsMock,
  accountTransactionsMock,
  accountWalletSummaryMock,
} from "@/data/accountMock";

interface AccountStoreState {
  loggedIn: boolean;
  profile: typeof accountProfileMock;
  wallet: typeof accountWalletSummaryMock;
  transactions: typeof accountTransactionsMock;
  bets: typeof accountBetsMock;
  bonuses: typeof accountBonusesMock;
  sessions: typeof accountSessionsMock;
  loginMock: () => void;
  logoutMock: () => void;
  requestWithdraw: (value: number) => void;
  closeSession: (sessionId: string) => void;
}

export const useAccountStore = create<AccountStoreState>((set) => ({
  loggedIn: false,
  profile: accountProfileMock,
  wallet: accountWalletSummaryMock,
  transactions: accountTransactionsMock,
  bets: accountBetsMock,
  bonuses: accountBonusesMock,
  sessions: accountSessionsMock,
  loginMock: () => set({ loggedIn: true }),
  logoutMock: () => set({ loggedIn: false }),
  requestWithdraw: (value) =>
    set((state) => {
      const clamped = Number.isFinite(value) ? Math.max(0, value) : 0;
      if (clamped === 0) return state;
      const before = state.wallet.totalBalance;
      const after = Math.max(0, before - clamped);
      return {
        wallet: {
          ...state.wallet,
          totalBalance: after,
        },
        transactions: [
          {
            id: `tx-withdraw-${Date.now()}`,
            date: new Date().toISOString(),
            type: "saque",
            description: "Saque Pix solicitado",
            amount: -clamped,
            balanceBefore: before,
            balanceAfter: after,
            status: "pendente",
          },
          ...state.transactions,
        ],
      };
    }),
  closeSession: (sessionId) =>
    set((state) => ({
      sessions: state.sessions.filter((session) => session.current || session.id !== sessionId),
    })),
}));
