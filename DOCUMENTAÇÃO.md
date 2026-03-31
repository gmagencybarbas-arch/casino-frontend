# Documentação do Frontend - Casino White-Label 🎰

Esta documentação serve como guia definitivo para o projeto do frontend do Cassino. Ela explica toda a arquitetura, como as coisas funcionam por baixo dos panos, o que foi implementado nas últimas atualizações e, mais importante, **como e onde fazer modificações ou integrar com o backend**.

---

## 1. Visão Geral e Arquitetura 🏗️

O projeto é construído em cima de tecnologias modernas para ser rápido, amigável para SEO e fácil de personalizar (White-label):

- **Next.js 14+ (App Router)**: Framework principal para renderização (SSR, SSG e CSR) e roteamento (`src/app`).
- **React 18+**: Biblioteca de UI.
- **Tailwind CSS v4**: Utilizado intensivamente para estilização através de classes utilitárias e gerenciamento do design system (via variáveis de CSS).
- **Zustand**: Gerenciamento de estado global super leve (ex: estado do menu mobile em `src/store/useLayoutStore.ts`).
- **Swiper**: A principal biblioteca de carrosséis e sliders (responsável pelo `BannerSlider`, `WinnersStrip` e grids de jogos).
- **TypeScript**: Tipagem estática em todo o código (`src/types`).

---

## 2. Estrutura do Projeto 📂

A estrutura foi pensada para isolar a responsabilidade de cada parte da UI:

```text
src/
├── app/               # Roteamento do Next.js (layout.tsx, page.tsx, globals.css)
├── blocks/            # Blocos dinâmicos do Layout (Seções da Home)
├── components/        # Componentes visuais estáticos e isolados
├── constants/         # Textos, links e constantes (ex: SIDEBAR_SECTIONS)
├── services/          # Camada de comunicação de rede (API)
├── store/             # Estado global (Zustand)
├── themes/            # Definições de White-Label (theme.css)
└── types/             # Interfaces TypeScript
```

---

## 3. O Sistema de Layout (Engine White-Label) 🎨

### 3.1. Variáveis CSS (`src/themes/theme.css`)
Toda a parte de cores (White-Label) NÃO está "chumbada" (hardcoded) no Tailwind. Ela puxa de variáveis CSS declaradas no `theme.css`.
- **Onde mexer nas cores?** No arquivo `src/themes/theme.css`. Modifique `--color-primary`, `--color-background`, etc. 
- Se quiser que o Backend dite o tema, basta o backend injetar um `<style>` no `<head>` com os valores reescrevendo essas variáveis.

### 3.2. A Engine de Blocos Dinâmicos (`BlocksArea` e `BlockRenderer`)
A Home (`app/page.tsx`) **não renderiza os blocos da página manualmente**. Ela pede para a API um layout (`layout.blocks`) e varre esse array passando cada item para o `BlockRenderer`.

Isso permite que o **Backend** decida a ordem, os títulos e os tipos das seções da Home.

- `src/components/BlocksArea/BlocksArea.tsx`: Faz o `map` do array do layout.
- `src/blocks/BlockRenderer/BlockRenderer.tsx`: Funciona como um "Switch/Case" que pega o tipo do bloco vindo da API (`featured_games`, `live_casino`, `top10`) e decide qual componente carregar da pasta `src/blocks/`.

---

## 4. Componentes Principais e Sliders 🎢

Durante as últimas atualizações, construímos comportamentos avançados ("estilo Netflix") para a navegação. Abaixo, onde encontrar cada peça:

### WinnersStrip (`src/components/WinnersStrip`)
- **O que é:** Ticker horizontal infinito que fica em cima do banner, mostrando vencedores em tempo real em formato de "pílulas".
- **Comportamento:** `Swiper` configurado com `Autoplay` linear. Pause-on-hover e drag ativados.

### BannerSlider (`src/components/BannerSlider`)
- **O que é:** O Hero da página com os banners promocionais principais.
- **Responsividade:** 
  - **Desktop**: Mostra 2 banners alinhados à esquerda, um pedacinho do próximo na direita (`slidesPerView: 2`, `loop: true`).
  - **Mobile**: Mostra apenas 1 banner totalmente centralizado.
- **Onde as imagens ficam?** Como mock, as imagens estão em `src/components/BannerSlider/slides/` e são chamadas na API.

### FeaturedGamesBlock (Jogos Recomendados) (`src/blocks/FeaturedGamesBlock`)
- **O que é:** O bloco que possui um GameCard gigante de destaque na esquerda e duas linhas de games roláveis na direita.
- **Mobile**: O Card de destaque some e vira apenas a lista rolável (para caber na tela).

### GameSliderBlock & Top10Block (`src/blocks`)
- **O que é:** Seções convencionais (como Jogos Populares, Casino ao Vivo).
- Eles utilizam o `CarouselContainer` internamente.
- No desktop mostram cards na proporção exata de 245x367.
- No mobile renderizam ocupando `45vw` de tela, garantindo que caibam sem criar overflows laterais estourados.
- Títulos possuem ícones personalizáveis passados via props do Renderizador.

### CarouselContainer (`src/components/CarouselContainer`)
- **O que é:** Componente wrapper mágico que adiciona **`overflow: hidden`** (para não vazar sliders na tela) e adiciona os gradientes esmaecidos (fade) nas bordas esquerda e direita para indicar que existe scroll (o famoso efeito Netflix).

### MobileBottomNav e Sidebar
- O menu de baixo no celular fica em `src/components/MobileBottomNav`. O botão central dele (Home) chama a atenção por herdar a borda da variável `--color-primary`.
- O Sidebar Panel é a aba lateral móvel. O estado dele de "aberto/fechado" vive em `useLayoutStore.ts`.

---

## 5. Como Integrar com o Backend 🔌

A camada de rede foi 100% abstraída no arquivo `src/services/api.ts`.
Atualmente, todos os métodos (`getBanners`, `getGames`, `getLayout`, `getGamesPaginated`) usam um banco de dados **MOCK** (falso) criado nesse mesmo arquivo, simulando um "delay" de internet via `Promise`.

### Como ligar a uma API real?
Basta ir no `src/services/api.ts` e substituir o interior das funções para usar `fetch` ou `axios`.

**Exemplo Atual (Mock):**
```typescript
async getBanners(): Promise<{ id: string; image: string; link: string; title: string }[]> {
  await delay(100);
  return [
    { id: "1", image: slide1.src, link: "/promo/1", title: "Welcome" }
  ];
}
```

**Exemplo Integrado (Real):**
```typescript
async getBanners(): Promise<{ id: string; image: string; link: string; title: string }[]> {
  const response = await fetch("https://api.seubackend.com/v1/banners");
  const data = await response.json();
  return data.banners;
}
```
*Dica: Manter a estrutura das interfaces retornadas (`types/game.ts` etc.) garantirá que você não precise alterar nenhum componente visual após integrar o Backend.*

---

## 6. Cheatsheet Rápido (Onde mexer se...) 🛠️

| Quero modificar... | Onde ir? |
| :--- | :--- |
| **Cores, Fontes e Sombras base do site** | `src/themes/theme.css` e `tailwind.config.ts` (ou a injeção via inline do tailwind v4 em `globals.css`) |
| **Adicionar uma nova categoria de Bloco vindo da API** | Criar em `src/blocks/`, tipar em `src/types/layout.ts` e registrar no switch/case de `BlockRenderer.tsx` |
| **Os links do menu da aba lateral** | Estão todos "chumbados" e mapeados em `src/constants/sidebar.ts` |
| **Botões da Barra Inferior (Mobile)** | `src/components/MobileBottomNav/MobileBottomNav.tsx` |
| **O Ticker de Ganhadores (Winners)** | `src/components/WinnersStrip/WinnersStrip.tsx` |
| **Proporção das imagens dos Games** | `src/components/GameCard/GameCard.tsx` |
| **Os ícones SVG dos Menus e Títulos** | `src/components/Sidebar/SidebarIcon.tsx` (Basta mapear o novo SVG lá dentro) |
| **Tamanho / Quantidade de slides do Banner** | Modificar as props do Swiper dentro de `src/components/BannerSlider/BannerSlider.tsx` |

---

## 7. Como rodar o projeto localmente 🚀

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
3. Para compilar em produção (testar se algo quebra):
   ```bash
   npm run build
   ```

Se a tela aparecer em branco, verifique o terminal para erros (provavelmente algum import quebrando). A arquitetura não usa `use client` nas "Páginas", mas obrigatoriamente usa `use client` dentro de "Componentes" que tem estados ou Sliders (`Swiper`). Evite tirar os `'use client'` dos componentes que dependem de hooks.