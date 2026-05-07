export type TransactionType =
  | "deposito"
  | "saque"
  | "aposta"
  | "ganho"
  | "transferencia_jogo"
  | "transferencia_carteira"
  | "bonus"
  | "cashback";

export type TransactionStatus = "concluido" | "pendente" | "cancelado";

export interface AccountTransaction {
  id: string;
  date: string;
  type: TransactionType;
  description: string;
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  status: TransactionStatus;
}

export interface BetHistoryItem {
  id: string;
  gameSlug: string;
  gameName: string;
  thumbnail: string;
  provider: string;
  amount: number;
  multiplier: number;
  resultAmount: number;
  status: "win" | "loss" | "cashout";
  createdAt: string;
}

export interface AccountBonus {
  id: string;
  name: string;
  status: "ativo" | "liberado" | "expirando";
  completionPercent: number;
  rolloverRemaining: number;
  valueRemaining: number;
  validUntil: string;
  eligibleGames: { slug: string; name: string; thumbnail: string }[];
}

export interface LoginSession {
  id: string;
  deviceName: string;
  platform: string;
  browser: string;
  ip: string;
  location: string;
  lastLoginAt: string;
  current: boolean;
}

export interface AccountProfile {
  fullName: string;
  cpf: string;
  email: string;
  phone: string;
  vipLevel: string;
  createdAt: string;
  lastLoginAt: string;
  kycStatus: "verificado" | "analise";
  documentsStatus: "aprovado" | "pendente";
  accountProgress: number;
}
