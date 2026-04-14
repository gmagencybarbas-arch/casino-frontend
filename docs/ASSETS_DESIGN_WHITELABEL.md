# Imagens locais, design system e white-label

Documento de referência para o frontend do casino (`casino-frontend`): onde estão os assets, como o tema é definido e como personalizar marcas (white-label).

---

## 1. Inventário de imagens e media locais

### 1.1 `public/` (servidos em `/…`)

| Caminho | Uso |
|--------|-----|
| **`/gamecard_img/175x175/`** | Thumbnails quadrados dos jogos na grelha (cards “small”, listagens densas). Nomes usados no mock em `src/services/api.ts` (`IMG_175`, extensões `.avif` + ficheiros extra tipo `public.jpg`). |
| **`/gamecard_img/245x367/`** | Capas retangulares (proporção tipo slot) para cards grandes / destaque. Lista em `api.ts` (`IMG_245`, `.jpg`). |
| **`/promo/sidebar-tigre-da-sorte.png`** | Banner lateral do menu (link `/promo/sidebar`), definido em `api.getSidebarBanner()`. |
| **`/img_banner_register/`** | Banners de registo (`registredesktop.png`, `registremobile.png`) — cópia espelhada para uso via URL; o modal global pode importar de `@/services/img_banner_register/` se existir cópia sob `src/`. |
| **`/logos_provedor/*.svg`** | Logos para marquee / vitrine de provedores (duplicados também em `src/components/ProviderLogo/logos_provedor/` para imports). |
| **`/promos/`** | Ex.: `cashback.jpg`, `freebet.jpg` — promoções se referenciadas em rotas/links. |
| Raiz (`next.svg`, `vercel.svg`, …) | Placeholders padrão do template Next (geralmente não usados na UI do casino). |

### 1.2 `src/` (import estático / bundler)

| Caminho | Uso |
|--------|-----|
| **`src/components/BannerSlider/slides/`** | `slide1.jpg`, `slide2.jpg`, `slide3.jpg` — hero da home; importados em `api.getBanners()`. |
| **`src/assets-slidegame/*.webp`** | Fundos e personagens do banner **Provider Showcase** em listagens `/games/*` (`providerShowcase.ts`). |
| **`src/components/ProviderLogo/logos_provedor/*.svg`** | Mesmos SVGs de `/public/logos_provedor` para `Image`/`import` no bloco de provedores. |
| **`src/services/img_banner_register/`** | Se existir no teu clone: imports do `GlobalModal` para banners de registo/login (`registredesktop.png`, `registremobile.png`). *Se a pasta não existir, alinhar imports com `public/img_banner_register/`.* |

### 1.3 APIs e conteúdo dinâmico

- **Banners da home:** `api.getBanners()` — imagens locais via imports dos slides ou URLs absolutas no futuro.
- **Jogos:** thumbnails em `Game.thumbnail` / `thumbnailSmall` — strings `/gamecard_img/...` geradas no mock.
- **next.config:** `images.remotePatterns` — domínios permitidos para `next/image` (ex.: Unsplash, Wikimedia, Novibet se usados em mocks).

---

## 2. Design system (tokens visuais)

### 2.1 Fonte da verdade: variáveis CSS

O aspeto base (dark luxury) está em **`src/themes/theme.css`**, importado em **`src/app/globals.css`**.

**Regra:** componentes devem preferir **`var(--color-*)`** em vez de cores hex fixas, para white-label e consistência.

#### Tokens principais (resumo)

| Variável | Função típica |
|----------|----------------|
| `--color-primary`, `--color-secondary` | Marca, CTAs dourados |
| `--color-background`, `--color-background-secondary` | Fundos de página e secções |
| `--color-card`, `--color-card-hover` | Cartões, superfícies elevadas |
| `--color-text`, `--color-text-muted` | Texto e hierarquia |
| `--color-accent`, `--color-accent-secondary`, `--color-accent-text` | Botões secundários / realce |
| `--color-border` | Contornos discretos |
| `--shadow-card`, `--shadow-card-hover`, `--shadow-elevated` | Profundidade |
| `--radius-md` (12px), `--radius-lg`, `--radius-xl` | Raio consistente (banners, cards) |
| `--sidebar-width`, `--header-height`, `--mobile-nav-height` | Layout |

### 2.2 Tailwind e `globals.css`

- **Tailwind v4** (`@import "tailwindcss"` em `globals.css`) — classes utilitárias combinadas com as variáveis acima, ex.: `bg-[var(--color-card)]`, `text-[var(--color-text)]`.
- **Utilitários de projeto:** ex. `.scrollbar-hide`, animações `.game-cta-live`, `.provider-showcase-char` (definidas em `globals.css`).

### 2.3 Padrões de UI recorrentes

- **Cards / banners:** `rounded-[12px]` ou `rounded-2xl`, `shadow-[var(--shadow-card)]`, `ring-1 ring-[var(--color-border)]`.
- **Botão primário:** `bg-[var(--color-primary)]`, `text-black`, `font-bold`.
- **Tipografia:** Geist (variáveis `--font-geist-sans` em `layout.tsx`).

---

## 3. White-label — como funciona

Objetivo: a mesma codebase serve várias marcas (cores, logo) sem fork do código.

### 3.1 Camadas

1. **`theme.css` (default)**  
   Carrega no `:root` valores iniciais. Serve como fallback e referência visual.

2. **Injeção em tempo de execução**  
   Qualquer script (ou backend) pode fazer:
   ```js
   document.documentElement.style.setProperty('--color-primary', '#ff0000');
   ```
   Todos os componentes que usam essa variável atualizam.

3. **`useThemeStore` (`src/store/useThemeStore.ts`)**  
   - Mantém `colors` (primary, background, card, text, accent, …) e `logo` / `logoUrl`.
   - **`applyTheme()`** escreve essas cores em `document.documentElement` nas mesmas `--color-*` que o `theme.css` define, alinhando com o design system.

4. **Theme Customizer (modal)**  
   - `ThemeCustomizerModal` + `useThemeCustomizerModalStore` — UI de demo para ajustar cores ao vivo (ex.: fluxo “Personalizar tema” no depósito).
   - Chama `setTheme` + `applyTheme` e pode definir logo (preview).

5. **Header / Footer**  
   - Lêem `logo` / `logoUrl` de `useThemeStore` para a marca (substituir por URL vinda da API quando existir backend).

### 3.2 Integração backend (recomendado)

- **Endpoint de configuração** devolvendo JSON: `{ primary, background, card, text, accent, logoUrl }`.
- No cliente (ex. `layout` ou provider): `setTheme(...)` + `setLogo(logoUrl)` + `applyTheme()`.
- Alternativa: resposta HTML/inject de `<style>:root { --color-primary: … }</style>` no `head` — compatível com o que já consome `var(--color-*)`.

### 3.3 API mock (`src/services/api.ts`)

- Comentado como preparado para substituição por chamadas reais.
- Estruturas (`Game`, `LayoutConfig`, banners) pensadas para não obrigar alteração nos componentes quando trocar o mock por API.

### 3.4 Conteúdo por marca

- Textos “fixos” podem migrar para constantes ou CMS; layout da home já é **blocos dinâmicos** (`getLayout()` + `BlockRenderer`).

---

## 4. Ficheiros-chave (cheat sheet)

| Tema / white-label | `src/themes/theme.css`, `src/store/useThemeStore.ts`, `src/components/ThemeCustomizerModal/` |
|---------------------|-----------------------------------------------------------------------------------------------|
| Estilos globais | `src/app/globals.css` |
| Imagens hero home | `src/components/BannerSlider/slides/` + `api.getBanners()` |
| Cartas de jogo (paths) | `public/gamecard_img/...` + `api.ts` |
| Showcase provedor | `src/data/providerShowcase.ts` + `src/assets-slidegame/` |
| Banner lateral | `public/promo/sidebar-tigre-da-sorte.png`, `api.getSidebarBanner()` |

---

*Última atualização: alinhado ao estado do repositório `casino-frontend`; ajustar caminhos se moveres pastas de assets.*
