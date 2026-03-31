export interface Game {
  id: string;
  name: string;
  /** Imagem para card grande (245×367) e padrão */
  thumbnail: string;
  /** Imagem para card pequeno (175×175); se não existir, usa thumbnail */
  thumbnailSmall?: string;
  provider: string;
  providerId?: string;
  providerName?: string;
  slug: string;
  gameUrl?: string; // URL for iframe - injected by backend
  tags?: string[];
  isFavorite?: boolean;
  isHot?: boolean;
}

export interface Provider {
  id: string;
  name: string;
  logo: string;
}
