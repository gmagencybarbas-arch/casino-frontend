import type { Tournament } from "@/types/tournament";

/** Mock central — substituir por respostas da API. */
export const tournamentsMock: Tournament[] = [
  {
    id: "t1",
    slug: "mega-multiplicador-mensal",
    title: "Mega Multiplicador Mensal",
    subtitle: "Suba no ranking com as maiores vitórias validadas do mês.",
    banner: "/tournaments/torneio01.jpg",
    thumbnail: "/tournaments/torneio01.jpg",
    provider: "Pragmatic Play",
    badge: "MENSAL",
    prizePool: 250_000,
    participants: 1842,
    startsAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    endsAt: new Date(Date.now() + 9 * 86400000 + 3 * 3600000).toISOString(),
    gameSlugs: ["gates-of-olympus", "sweet-bonanza", "wanted-dead-or-wild", "sugar-rush", "fortune-tiger"],
    status: "live",
    featured: true,
    minimumBet: 1,
    howItWorks: [
      {
        title: "Jogos participantes",
        description:
          "Apenas as rodadas nos títulos listados abaixo contam pontos. Jogue na versão real com saldo em BRL.",
      },
      {
        title: "Aposta mínima",
        description: "Cada aposta válida deve ser de pelo menos o valor mínimo indicado no torneio.",
      },
      {
        title: "Período válido",
        description: "Somente resultados entre a abertura e o encerramento oficial entram no ranking.",
      },
      {
        title: "Como pontua",
        description: "Pontos = multiplicador alcançado × peso da aposta (normalizado). Vitórias acima de x100 recebem bônus leve.",
      },
      {
        title: "Multiplicadores válidos",
        description: "Contam apenas giros que terminam em ganho com multiplicador publicado na tabela oficial.",
      },
      {
        title: "Critérios de ranking",
        description: "Ordem: maior pontuação; em empate, maior multiplicador simples registrado; depois, horário da conquista.",
      },
    ],
    ranking: [
      { position: 1, nickname: "Pixel***", score: 98420, multiplier: "x512", prizeAmount: 75_000 },
      { position: 2, nickname: "Luna***", score: 87210, multiplier: "x256", prizeAmount: 45_000 },
      { position: 3, nickname: "Vex***", score: 81900, multiplier: "x128", prizeAmount: 25_000 },
      { position: 4, nickname: "Neo***", score: 70120, multiplier: "x96", prizeAmount: 12_000 },
      { position: 5, nickname: "Koi***", score: 68900, multiplier: "x88", prizeAmount: 8_000 },
      { position: 6, nickname: "Rio***", score: 61200, multiplier: "x72", prizeAmount: 5_000 },
      { position: 7, nickname: "Ale***", score: 54800, multiplier: "x64", prizeAmount: 0 },
      { position: 8, nickname: "Gui***", score: 52100, multiplier: "x56", prizeAmount: 0 },
    ],
    prizes: [
      { position: 1, label: "1º lugar", amount: 75_000 },
      { position: 2, label: "2º lugar", amount: 45_000 },
      { position: 3, label: "3º lugar", amount: 25_000 },
      { position: 4, label: "4º lugar", amount: 12_000 },
      { position: 5, label: "5º lugar", amount: 8_000 },
      { position: 6, label: "6º lugar", amount: 5_000 },
    ],
    rules: [
      {
        id: "gerais",
        title: "Regras gerais",
        body: "Participação automática ao realizar apostas válidas nos jogos elegíveis durante o período. Um jogador por conta. A organização pode solicitar documentação em prêmios acima de limites internos.",
      },
      {
        id: "desclassificacao",
        title: "Desclassificação",
        body: "Contas com chargeback, múltiplas contas, software de automação ou exploit de bugs serão eliminadas sem aviso prévio.",
      },
      {
        id: "apostas",
        title: "Apostas válidas",
        body: "Apostas canceladas, duplicadas pelo sistema ou fora do período não geram pontos. Rodadas com saldo bônus seguem as regras da carteira promocional.",
      },
      {
        id: "antifraude",
        title: "Anti fraude",
        body: "Padrões artificiais de volume ou colusão entre contas podem ser filtrados por modelos antifraude e revisão manual.",
      },
      {
        id: "termos",
        title: "Termos",
        body: "O regulamento completo da casa aplica-se. Em caso de litígio, prevalece o registro do servidor da operadora.",
      },
    ],
  },
  {
    id: "t2",
    slug: "rush-semanal-live",
    title: "Rush Semanal Live",
    subtitle: "Foco em mesas ao vivo — ritmo intenso e premiação turbo.",
    banner: "/tournaments/torneio2.jpg",
    thumbnail: "/tournaments/torneio2.jpg",
    provider: "Evolution",
    badge: "SEMANAL",
    prizePool: 80_000,
    participants: 620,
    startsAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    endsAt: new Date(Date.now() + 4 * 86400000 + 5000000).toISOString(),
    gameSlugs: ["lightning-roulette", "crazy-time", "blackjack-live", "monopoly-live"],
    status: "live",
    featured: true,
    minimumBet: 2,
    howItWorks: [
      {
        title: "Jogos participantes",
        description: "Contam apenas as mesas listadas na secção de jogos, modo dinheiro real.",
      },
      {
        title: "Regras básicas",
        description: "Cada vitória validada na mesa gera pontos conforme o multiplicador efetivo da rodada.",
      },
      {
        title: "Aposta mínima",
        description: "Mínimo por mão/rodada conforme indicado acima.",
      },
      {
        title: "Período válido",
        description: "Semana corrente do calendário do torneio; fuso America/Sao_Paulo.",
      },
      {
        title: "Como pontua",
        description: "Pontuação proporcional ao payout líquido da rodada com teto diário para evitar distorções.",
      },
      {
        title: "Critérios de ranking",
        description: "Maior soma de pontos; desempates por maior multiplicador único da semana.",
      },
    ],
    ranking: [
      { position: 1, nickname: "Ace***", score: 42000, multiplier: "x48", prizeAmount: 30_000 },
      { position: 2, nickname: "Bet***", score: 38100, multiplier: "x44", prizeAmount: 20_000 },
      { position: 3, nickname: "Fox***", score: 35500, multiplier: "x40", prizeAmount: 12_000 },
      { position: 4, nickname: "Sky***", score: 30000, multiplier: "x36", prizeAmount: 6_000 },
      { position: 5, nickname: "Sol***", score: 27100, multiplier: "x32", prizeAmount: 4_000 },
    ],
    prizes: [
      { position: 1, label: "1º lugar", amount: 30_000 },
      { position: 2, label: "2º lugar", amount: 20_000 },
      { position: 3, label: "3º lugar", amount: 12_000 },
      { position: 4, label: "4º lugar", amount: 6_000 },
      { position: 5, label: "5º lugar", amount: 4_000 },
    ],
    rules: [
      {
        id: "gerais",
        title: "Regras gerais",
        body: "Torneio semanal; premiação creditada em até 48h após validação.",
      },
      {
        id: "desclassificacao",
        title: "Desclassificação",
        body: "Abuso de falhas de transmissão ou delay arbitragem resulta em exclusão.",
      },
      {
        id: "apostas",
        title: "Apostas válidas",
        body: "Rodadas rejeitadas pelo provedor ao vivo não pontuam.",
      },
      {
        id: "antifraude",
        title: "Anti fraude",
        body: "Sincronização com logs do provedor live para todas as premiações.",
      },
      {
        id: "termos",
        title: "Termos",
        body: "Sujeito aos T&C da plataforma e do studio.",
      },
    ],
  },
  {
    id: "t3",
    slug: "crash-ao-vivo-24h",
    title: "Crash & Win — 24h",
    subtitle: "Multiplicadores altos em títulos crash contam em tempo real.",
    banner: "/tournaments/torneio3.jpg",
    thumbnail: "/tournaments/torneio3.jpg",
    provider: "Spribe",
    badge: "AO VIVO",
    prizePool: 45_000,
    participants: 3105,
    startsAt: new Date(Date.now() - 3600000).toISOString(),
    endsAt: new Date(Date.now() + 20 * 3600000).toISOString(),
    gameSlugs: ["aviator", "spaceman", "mines", "plinko"],
    status: "live",
    featured: true,
    minimumBet: 0.5,
    howItWorks: [
      {
        title: "Jogos participantes",
        description: "Crash, mines e variações listadas — apenas rondas concluídas com cash-out válido.",
      },
      {
        title: "Como pontua",
        description: "Destaque para multiplicadores x50+ com cap de pontos por rodada.",
      },
      {
        title: "Período válido",
        description: "24 horas a partir da abertura; countdown oficial na página.",
      },
      {
        title: "Critérios de ranking",
        description: "Soma de pontos; empate desfeito pelo maior número de vitórias x100+.",
      },
      {
        title: "Aposta mínima",
        description: "Consulte o valor acima; centavos abaixo do mínimo são ignorados.",
      },
      {
        title: "Multiplicadores válidos",
        description: "Aceites apenas quando o histórico do jogo confirma o multiplicador.",
      },
    ],
    ranking: [
      { position: 1, nickname: "Jet***", score: 12800, multiplier: "x500", prizeAmount: 18_000 },
      { position: 2, nickname: "Zip***", score: 11200, multiplier: "x350", prizeAmount: 12_000 },
      { position: 3, nickname: "Oz***", score: 9800, multiplier: "x220", prizeAmount: 7_000 },
    ],
    prizes: [
      { position: 1, label: "1º lugar", amount: 18_000 },
      { position: 2, label: "2º lugar", amount: 12_000 },
      { position: 3, label: "3º lugar", amount: 7_000 },
    ],
    rules: [
      {
        id: "gerais",
        title: "Regras gerais",
        body: "Evento relâmpago; horários exibidos no hero são oficiais.",
      },
      {
        id: "desclassificacao",
        title: "Desclassificação",
        body: "Cash-out antecipado fraudulento ou colusão em salas privadas leva a banimento do torneio.",
      },
      {
        id: "apostas",
        title: "Apostas válidas",
        body: "Auto-play dentro dos limites do provedor é aceite.",
      },
      {
        id: "antifraude",
        title: "Anti fraude",
        body: "Correlação com IP e dispositivo aplicada em disputas.",
      },
      {
        id: "termos",
        title: "Termos",
        body: "Prémios podem ser creditados como saldo ou bônus conforme configuração whitelabel.",
      },
    ],
  },
  {
    id: "t4",
    slug: "fortune-series-hot",
    title: "Fortune Series — Hot Week",
    subtitle: "Próxima temporada com prize pool ampliado. Garanta vaga antecipada.",
    banner: "/tournaments/torneio4.jpg",
    thumbnail: "/tournaments/torneio4.jpg",
    provider: "PG Soft",
    badge: "HOT",
    prizePool: 500_000,
    participants: 412,
    startsAt: new Date(Date.now() + 2 * 86400000).toISOString(),
    endsAt: new Date(Date.now() + 16 * 86400000).toISOString(),
    gameSlugs: ["fortune-tiger", "wild-bandito", "sugar-rush-1000", "gates-olympus-1000"],
    status: "upcoming",
    featured: true,
    minimumBet: 1,
    howItWorks: [
      {
        title: "Jogos participantes",
        description: "Linha Fortune e títulos premium indicados — lista final no arranque.",
      },
      {
        title: "Período válido",
        description: "A contagem oficial começa na data de abertura; inscrições antecipadas são lembradas por notificação.",
      },
      {
        title: "Como pontua",
        description: "Mesmo motor de pontos dos torneios série Mega, com peso extra em conquistas consecutivas.",
      },
      {
        title: "Aposta mínima",
        description: "Conforme tabela que será exibida no dia 1 do evento.",
      },
      {
        title: "Multiplicadores válidos",
        description: "Somente após o go-live; pré-visualização do regulamento disponível abaixo.",
      },
      {
        title: "Critérios de ranking",
        description: "Leaderboard global; desempate por horário de inscrição antecipada (mock).",
      },
    ],
    ranking: [],
    prizes: [
      { position: 1, label: "1º lugar", amount: 200_000 },
      { position: 2, label: "2º lugar", amount: 120_000 },
      { position: 3, label: "3º lugar", amount: 70_000 },
      { position: 4, label: "4º lugar", amount: 40_000 },
      { position: 5, label: "5º lugar", amount: 25_000 },
    ],
    rules: [
      {
        id: "gerais",
        title: "Regras gerais",
        body: "Regulamento complementar será publicado na abertura. Inscrições via botão Participar.",
      },
      {
        id: "desclassificacao",
        title: "Desclassificação",
        body: "Critérios padrão da casa aplicam-se integralmente.",
      },
      {
        id: "apostas",
        title: "Apostas válidas",
        body: "Nenhuma aposta antes do início contará para o ranking.",
      },
      {
        id: "antifraude",
        title: "Anti fraude",
        body: "Monitorização contínua durante toda a série.",
      },
      {
        id: "termos",
        title: "Termos",
        body: "Alterações de prize pool serão comunicadas com antecedência mínima de 24h (mock).",
      },
    ],
  },
  {
    id: "t5",
    slug: "winter-cup-finalizado",
    title: "Winter Cup 2025",
    subtitle: "Edição encerrada — veja o pódio e a tabela de prémios.",
    banner: "https://images.unsplash.com/photo-1606159068538-39ab59c3715a?w=1600&q=80",
    thumbnail: "/gamecard_img/245x367/frabbit.jpg",
    provider: "Multi-provider",
    badge: "MENSAL",
    prizePool: 120_000,
    participants: 2400,
    startsAt: new Date(Date.now() - 90 * 86400000).toISOString(),
    endsAt: new Date(Date.now() - 30 * 86400000).toISOString(),
    gameSlugs: ["gates-of-olympus", "sweet-bonanza", "aviator"],
    status: "finished",
    featured: false,
    minimumBet: 1,
    howItWorks: [
      {
        title: "Jogos participantes",
        description: "Fiche arquivada; jogos acima foram os elegíveis na época.",
      },
      {
        title: "Estado",
        description: "Torneio finalizado; prémios distribuídos.",
      },
      {
        title: "Período válido",
        description: "Histórico conservado para consulta.",
      },
      {
        title: "Como pontuou",
        description: "Motor clássico de multiplicadores com bónus de streak.",
      },
      {
        title: "Multiplicadores válidos",
        description: "Conforme regras da edição (arquivo).",
      },
      {
        title: "Critérios de ranking",
        description: "Ranking final congelado; sem recurso.",
      },
    ],
    ranking: [
      { position: 1, nickname: "Ice***", score: 120000, multiplier: "x620", prizeAmount: 50_000 },
      { position: 2, nickname: "Snow***", score: 108000, multiplier: "x400", prizeAmount: 35_000 },
      { position: 3, nickname: "Frost***", score: 99000, multiplier: "x300", prizeAmount: 20_000 },
    ],
    prizes: [
      { position: 1, label: "1º lugar", amount: 50_000 },
      { position: 2, label: "2º lugar", amount: 35_000 },
      { position: 3, label: "3º lugar", amount: 20_000 },
    ],
    rules: [
      {
        id: "gerais",
        title: "Regras gerais",
        body: "Edição encerrada.",
      },
      {
        id: "termos",
        title: "Termos",
        body: "Consulte histórico no arquivo do operador.",
      },
      {
        id: "desclassificacao",
        title: "Desclassificação",
        body: "Não aplicável — evento terminado.",
      },
      {
        id: "apostas",
        title: "Apostas válidas",
        body: "Não aplicável — evento terminado.",
      },
      {
        id: "antifraude",
        title: "Anti fraude",
        body: "Não aplicável — evento terminado.",
      },
    ],
  },
];

export function getTournamentBySlugMock(slug: string) {
  return tournamentsMock.find((t) => t.slug === slug) ?? null;
}

export function getTournamentSlugsMock() {
  return tournamentsMock.map((t) => t.slug);
}
