import type {
  AccountBonus,
  AccountProfile,
  AccountTransaction,
  BetHistoryItem,
  LoginSession,
} from "@/types/account";

export const accountProfileMock: AccountProfile = {
  fullName: "Joassir de Santos Nogueira",
  cpf: "130.589.359-29",
  email: "joassir.nogueira@email.com",
  phone: "(11) 99123-4455",
  vipLevel: "VIP Gold",
  createdAt: "2025-07-11T14:20:00.000Z",
  lastLoginAt: "2026-05-06T22:40:00.000Z",
  kycStatus: "verificado",
  documentsStatus: "aprovado",
  accountProgress: 92,
};

export const accountWalletSummaryMock = {
  totalBalance: 2394.87,
  bonusBalance: 321.44,
  inGameBalance: 180.13,
  lastDeposit: 500,
  totalWonToday: 1320.8,
  totalBetToday: 980.5,
};

export const accountTransactionsMock: AccountTransaction[] = [
  {
    id: "tx-1",
    date: "2026-05-06T21:32:00.000Z",
    type: "ganho",
    description: "Ganho em Sweet Bonanza",
    amount: 845.5,
    balanceBefore: 1220.3,
    balanceAfter: 2065.8,
    status: "concluido",
  },
  {
    id: "tx-2",
    date: "2026-05-06T20:58:00.000Z",
    type: "aposta",
    description: "Aposta em Gates of Olympus",
    amount: -120,
    balanceBefore: 1340.3,
    balanceAfter: 1220.3,
    status: "concluido",
  },
  {
    id: "tx-3",
    date: "2026-05-06T19:02:00.000Z",
    type: "deposito",
    description: "Deposito via Pix",
    amount: 500,
    balanceBefore: 840.3,
    balanceAfter: 1340.3,
    status: "concluido",
  },
  {
    id: "tx-4",
    date: "2026-05-05T23:44:00.000Z",
    type: "cashback",
    description: "Cashback diario",
    amount: 42.7,
    balanceBefore: 797.6,
    balanceAfter: 840.3,
    status: "concluido",
  },
  {
    id: "tx-5",
    date: "2026-05-05T18:20:00.000Z",
    type: "saque",
    description: "Saque Pix",
    amount: -250,
    balanceBefore: 1047.6,
    balanceAfter: 797.6,
    status: "concluido",
  },
];

export const accountBetsMock: BetHistoryItem[] = [
  {
    id: "bet-1",
    gameSlug: "sweet-bonanza",
    gameName: "Sweet Bonanza",
    thumbnail: "/gamecard_img/175x175/quadrado01.avif",
    provider: "Pragmatic Play",
    amount: 40,
    multiplier: 21.1,
    resultAmount: 844,
    status: "win",
    createdAt: "2026-05-06T21:31:00.000Z",
  },
  {
    id: "bet-2",
    gameSlug: "gates-of-olympus",
    gameName: "Gates of Olympus",
    thumbnail: "/gamecard_img/175x175/quadrado02.avif",
    provider: "Pragmatic Play",
    amount: 120,
    multiplier: 0,
    resultAmount: -120,
    status: "loss",
    createdAt: "2026-05-06T20:58:00.000Z",
  },
  {
    id: "bet-3",
    gameSlug: "aviator",
    gameName: "Aviator",
    thumbnail: "/gamecard_img/175x175/quadrado03.avif",
    provider: "Spribe",
    amount: 75,
    multiplier: 3.4,
    resultAmount: 255,
    status: "cashout",
    createdAt: "2026-05-06T17:15:00.000Z",
  },
];

export const accountBonusesMock: AccountBonus[] = [
  {
    id: "bonus-1",
    name: "Boas-vindas 100% ate R$ 500",
    status: "ativo",
    completionPercent: 68,
    rolloverRemaining: 420,
    valueRemaining: 210,
    validUntil: "2026-05-20T23:59:00.000Z",
    eligibleGames: [
      { slug: "sweet-bonanza", name: "Sweet Bonanza", thumbnail: "/gamecard_img/175x175/quadrado01.avif" },
      { slug: "gates-of-olympus", name: "Gates of Olympus", thumbnail: "/gamecard_img/175x175/quadrado02.avif" },
      { slug: "starlight-princess", name: "Starlight Princess", thumbnail: "/gamecard_img/175x175/quadrado04.avif" },
    ],
  },
  {
    id: "bonus-2",
    name: "Cashback Semanal 15%",
    status: "expirando",
    completionPercent: 82,
    rolloverRemaining: 120,
    valueRemaining: 64,
    validUntil: "2026-05-08T23:59:00.000Z",
    eligibleGames: [
      { slug: "aviator", name: "Aviator", thumbnail: "/gamecard_img/175x175/quadrado03.avif" },
      { slug: "mines", name: "Mines", thumbnail: "/gamecard_img/175x175/quadrado05.avif" },
    ],
  },
];

export const accountSessionsMock: LoginSession[] = [
  {
    id: "sess-1",
    deviceName: "Windows Desktop",
    platform: "Windows 10",
    browser: "Chrome 135",
    ip: "177.34.210.10",
    location: "Sao Paulo, BR",
    lastLoginAt: "2026-05-06T22:40:00.000Z",
    current: true,
  },
  {
    id: "sess-2",
    deviceName: "iPhone 14",
    platform: "iOS 18",
    browser: "Safari Mobile",
    ip: "187.81.44.190",
    location: "Guarulhos, BR",
    lastLoginAt: "2026-05-05T20:11:00.000Z",
    current: false,
  },
];
