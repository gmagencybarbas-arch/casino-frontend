import type { StaticImageData } from "next/image";
import fundoMulher from "@/assets-slidegame/fundo_mulher.webp";
import fundoPassaro from "@/assets-slidegame/fundo_passaro.webp";
import fundoVeio from "@/assets-slidegame/fundo_veio.webp";
import imgMulher from "@/assets-slidegame/img_mulher.webp";
import imgPassaro from "@/assets-slidegame/img_passaro.webp";
import imgVeio from "@/assets-slidegame/img_veio.webp";

/**
 * 3 slides = 3 provedores. Fundo + personagem mudam por slide.
 * Jogos vêm do filtro por `providerId` na lista da página.
 */
export interface ProviderShowcaseSlide {
  id: string;
  providerId: string;
  providerName: string;
  background: StaticImageData;
  character: StaticImageData;
  displayGameCount: number;
  allGamesHref: string;
}

export const PROVIDER_SHOWCASE_SLIDES: ProviderShowcaseSlide[] = [
  {
    id: "veio",
    providerId: "pragmatic-play",
    providerName: "Pragmatic Play",
    background: fundoVeio,
    character: imgVeio,
    displayGameCount: 229,
    allGamesHref: "/games/slots",
  },
  {
    id: "passaro",
    providerId: "evolution",
    providerName: "Evolution",
    background: fundoPassaro,
    character: imgPassaro,
    displayGameCount: 156,
    allGamesHref: "/games/live",
  },
  {
    id: "mulher",
    providerId: "spribe",
    providerName: "Spribe",
    background: fundoMulher,
    character: imgMulher,
    displayGameCount: 42,
    allGamesHref: "/games/slots",
  },
];
