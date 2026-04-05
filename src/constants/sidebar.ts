export type SidebarSectionKey = "games" | "sports" | "social" | "support";

export type SidebarItem = {
  label: string;
  href: string;
  icon: string;
};

export type SidebarSection = {
  sectionKey: SidebarSectionKey;
  title: string;
  items: SidebarItem[];
};

export const SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    sectionKey: "games",
    title: "Jogos",
    items: [
      { label: "Todos os jogos", href: "/games/all", icon: "slot" },
      { label: "Favoritos", href: "/games/favorites", icon: "heart" },
      { label: "Jogos de Slots", href: "/games/slots", icon: "slot" },
      { label: "Cassino ao Vivo", href: "/games/live", icon: "live" },
      { label: "Jogos Crash", href: "/games/crash", icon: "fire" },
      { label: "Videobingo", href: "/games/videobingo", icon: "bingo" },
    ],
  },
  {
    sectionKey: "sports",
    title: "Esports",
    items: [
      { label: "Campeonatos", href: "/sports/championships", icon: "trophy" },
      { label: "Apostas ao Vivo", href: "/games/sports", icon: "chart" },
    ],
  },
  {
    sectionKey: "social",
    title: "Redes",
    items: [
      { label: "Instagram", href: "#", icon: "instagram" },
      { label: "Telegram", href: "#", icon: "telegram" },
      { label: "WhatsApp", href: "#", icon: "whatsapp" },
    ],
  },
  {
    sectionKey: "support",
    title: "Suporte",
    items: [
      { label: "Promoções", href: "/promotions", icon: "gift" },
      { label: "Jogo Responsável", href: "/responsible-gaming", icon: "shield" },
      { label: "Central de Ajuda", href: "/help", icon: "help" },
      { label: "Iniciar Chat", href: "#", icon: "chat" },
    ],
  },
];
