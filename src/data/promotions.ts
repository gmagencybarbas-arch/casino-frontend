export interface PromotionSection {
  title: string;
  content: string[];
}

export interface Promotion {
  slug: string;
  title: string;
  image: string;
  description: string;
  sections: PromotionSection[];
  tips?: string[];
  /** Se definido, o cartão abre este link (ex.: promoção no site da Vera) em nova aba. */
  externalUrl?: string;
}

const veraOgImage =
  "https://cdn.vera.bet.br/48d41704-b333-4d22-7c4e-abf4e82cca00/public";

export const promotions: Promotion[] = [
  {
    slug: "tudo-sobre-mini-games",
    title: "Tudo sobre os Mini Games",
    image:
      "https://blog.vera.bet.br/wp-content/uploads/2025/12/Blog-Vera-Bet.png",
    description:
      "Mini games são experiências rápidas e envolventes — ideais para quem quer diversão instantânea entre uma aposta e outra, com regras simples e ritmo dinâmico.",
    sections: [
      {
        title: "O que são",
        content: [
          "Jogos curtos com rodadas ágeis e mecânicas fáceis de entender",
          "Combinam entretenimento leve com a emoção do cassino",
          "Perfeitos para pausas rápidas no mobile ou desktop",
        ],
      },
      {
        title: "Por que jogar",
        content: [
          "Sessões rápidas sem precisar de longos tutoriais",
          "Variedade de temas e estilos para todos os gostos",
          "Integração natural com o restante da plataforma",
        ],
      },
      {
        title: "Como aproveitar melhor",
        content: [
          "Defina um orçamento antes de começar",
          "Alterne entre mini games e outros jogos para variar a experiência",
          "Leia as regras de cada título na primeira jogada",
        ],
      },
    ],
    tips: [
      "Trate mini games como entretenimento — não como forma de recuperar perdas.",
      "Use limites de tempo e valor para manter o controle da sessão.",
    ],
  },
  {
    slug: "clube-vip-verabet",
    title: "Clube VIP Vera.bet",
    image: veraOgImage,
    description:
      "Acumule recompensas, suba de nível e desbloqueie benefícios exclusivos no programa de fidelidade — feito para quem joga com frequência e quer mais valor em cada aposta.",
    sections: [
      {
        title: "O que é",
        content: [
          "Programa de fidelidade com recompensas progressivas",
          "Ganhe moedas ou pontos ao apostar nos jogos elegíveis",
          "Troque benefícios por vantagens dentro da plataforma",
        ],
      },
      {
        title: "Benefícios",
        content: [
          "Rodadas grátis e ofertas personalizadas",
          "Acesso a campanhas e minigames exclusivos",
          "Reconhecimento por nível — quanto mais engajamento, mais vantagens",
        ],
      },
      {
        title: "Como funciona",
        content: [
          "Aposte nos jogos participantes e acumule progresso",
          "Suba de nível conforme as regras do clube",
          "Resgate recompensas conforme disponibilidade e regulamento",
        ],
      },
    ],
    tips: [
      "Confira sempre o regulamento oficial desta promoção antes de participar.",
      "Mantenha o cadastro atualizado para não perder comunicações de VIP.",
    ],
  },
  {
    slug: "acumulador-turbinado",
    title: "Acumulador turbinado",
    image: veraOgImage,
    description:
      "Potencialize suas odds em apostas múltiplas com mecânicas que ampliam o retorno potencial — ideal para quem gosta de combinar seleções no esporte.",
    sections: [
      {
        title: "O que é",
        content: [
          "Formato de aposta múltipla com odds combinadas",
          "Possibilidade de ganhos ampliados quando todas as seleções acertam",
          "Focado em quem acompanha vários eventos na mesma aposta",
        ],
      },
      {
        title: "Vantagens",
        content: [
          "Maior retorno potencial em relação a apostas simples isoladas",
          "Experiência estratégica ao montar o bilhete",
          "Campanhas e regras específicas podem turbinar ainda mais a oferta",
        ],
      },
      {
        title: "Boas práticas",
        content: [
          "Analise estatísticas e notícias antes de fechar o acumulador",
          "Evite excesso de seleções só para subir a odd — equilibre risco",
          "Consulte odds mínimas e mercados elegíveis nas regras da promoção",
        ],
      },
    ],
    tips: [
      "Uma seleção incorreta costuma zerar o acumulador — planeje com calma.",
      "Leia os termos completos na área de regulamento da promoção.",
    ],
  },
  {
    slug: "sorriso-vera",
    title: "Sorriso Vera",
    image:
      "https://blog.vera.bet.br/wp-content/uploads/2025/08/BLOG-SORRISO-VERA-3.png",
    description:
      "Conteúdo e campanhas do ecossistema Vera para você ficar por dentro de novidades, dicas e o tom leve da marca — diversão com responsabilidade.",
    sections: [
      {
        title: "Sobre a campanha",
        content: [
          "Destaque para conteúdo institucional e experiência da marca",
          "Comunicação alinhada ao universo de entretenimento Vera",
          "Novidades e histórias que conectam jogadores à comunidade",
        ],
      },
      {
        title: "O que você encontra",
        content: [
          "Materiais visuais e narrativas no blog e canais oficiais",
          "Lembretes de jogo responsável e transparência",
          "Convites a conhecer produtos dentro das regras de cada região",
        ],
      },
      {
        title: "Como acompanhar",
        content: [
          "Siga as redes e o blog oficial para atualizações",
          "Ative notificações apenas se fizer sentido para o seu hábito de jogo",
          "Participe de ações quando estiver dentro do seu orçamento de lazer",
        ],
      },
    ],
    tips: [
      "Curta o conteúdo sem sentir obrigação de apostar em cada campanha.",
      "Se o jogo deixar de ser divertido, faça uma pausa e busque apoio.",
    ],
  },
];

export function getPromotionBySlug(slug: string): Promotion | undefined {
  return promotions.find((p) => p.slug === slug);
}
