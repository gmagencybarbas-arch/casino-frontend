# Casino Frontend - White-Label Platform

Frontend moderno para plataformas de casino white-label, construído com **Next.js (App Router)**, **TypeScript** e **TailwindCSS**. Preparado para integração futura com backend.

## Características

- **White-label**: Sistema de temas via CSS variables (cores, logos, layout)
- **Layout responsivo**: Desktop (header, sidebar colapsável) e mobile (bottom nav, slide-out menu)
- **Blocos dinâmicos**: Layout configurável via API (featured, slider, top10, providers)
- **Performance**: Lazy loading, intersection observer, imports dinâmicos
- **SEO**: Meta tags, títulos e estrutura semântica

## Estrutura do Projeto

```
src/
├── app/              # Next.js App Router
├── components/       # Componentes reutilizáveis
│   ├── Header
│   ├── Sidebar
│   ├── MobileBottomNav
│   ├── MobileSidebarPanel
│   ├── Footer
│   ├── GameCard
│   ├── ProviderLogo
│   ├── BannerSlider
│   ├── CasinoLayout
│   ├── LazyBlock
│   └── BlocksArea
├── blocks/           # Blocos de conteúdo dinâmicos
│   ├── FeaturedGamesBlock
│   ├── GameSliderBlock
│   ├── Top10Block
│   ├── ProvidersBlock
│   └── BlockRenderer
├── services/         # API layer (mock)
├── store/            # Zustand stores
├── types/            # TypeScript types
├── themes/           # CSS variables (white-label)
└── constants/        # Constantes compartilhadas
```

## Instalação

```bash
cd casino-frontend
npm install
npm run dev
```

## Variáveis CSS (White-Label)

O tema é customizável via variáveis em `src/themes/theme.css`:

```css
:root {
  --color-primary: #00d26a;
  --color-background: #0f0f12;
  --color-card: #1a1a20;
  --color-text: #ffffff;
  --color-accent: #00d26a;
  --sidebar-width: 280px;
  --sidebar-collapsed-width: 72px;
}
```

Um backend futuro pode injetar essas variáveis dinamicamente.

## Configuração do Layout

Exemplo de layout configurável (API `getLayout()`):

```json
{
  "blocks": [
    { "type": "featured", "title": "Recommended Games", "category": "hot" },
    { "type": "slider", "title": "Casino Live", "category": "live" },
    { "type": "slider", "title": "Popular Games", "category": "popular" },
    { "type": "top10", "title": "Top 10 Brazil", "category": "top10" },
    { "type": "providers", "title": "Providers" }
  ]
}
```

## Scripts

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run start` - Rodar build de produção
- `npm run lint` - ESLint

## Próximos Passos (Integração Backend)

1. Substituir `src/services/api.ts` por chamadas reais
2. Conectar `useThemeStore` para receber cores/logo do backend
3. Adicionar autenticação (saldo do usuário)
4. Implementar WebP/otimização de imagens via backend
