# BE CATHOLIC

Landing page cinematográfica para o movimento **Be Catholic** — uma campanha de identidade e motivação voltada a jovens brasileiros de 12 a 25 anos.

> *"Não é religião. É identidade."*

## Sobre

Página de manifesto, não de produto. Oito capítulos em latim percorridos por scroll (Principium → Vocatio), com estética de códex sagrado: dourado sobre preto profundo, tipografia Cinzel/Cinzel Decorative, vídeos cinematográficos scrub-driven por GSAP e ornamentação litúrgica (Chi-Rho, Cross Pattée, Fleur-de-lis, IHS).

## Capítulos

| # | Section | Latim | Tema |
|---|---------|-------|------|
| I | Hero | Principium | João 2,19 — "Destruam este templo" |
| II | Manifesto | Manifestum | Declaração de identidade |
| III | Gallery | Imagines | KVs — as imagens da fé |
| IV | Pillars | Columnae | Os 4 pilares |
| V | Verse | Verbum | Mateus 16,18 |
| VI | Stats | Historia | A maior instituição da história |
| VII | Prayer | Oratio | Oração a São Miguel |
| VIII | CTA | Vocatio | Seja Católico. Agora. |

## Stack

- **Next.js 16** · App Router · TypeScript
- **Tailwind CSS v4**
- **GSAP 3** + ScrollTrigger + SplitText + `@gsap/react`
- Google Fonts: Cinzel · Cinzel Decorative · Inter
- Vídeos scrub-driven (`video.currentTime` atrelado ao scroll progress)
- Custom cursor (cruz dourada, `requestAnimationFrame` + lerp)
- Grain overlay SVG global

## Design System

- `#C9A84C` — Dourado Sacro (primary)
- `#E8D08A` — Dourado Claro (hover/display)
- `#0A0A0A` — Preto Profundo
- `#080808` — Preto para sections pinadas
- `#F5F0E8` — Branco Pergaminho
- `#A8A8B0` — Prata (body secondary)

Padding padrão: `7–8rem` vertical · `2rem` horizontal · `max-width: 1100px`. Separador entre sections: `1px solid rgba(201,168,76,0.07)`.

## Elementos ornamentais

- **SectionIndicator** — índice lateral fixo com numerais romanos + nome em latim (IntersectionObserver)
- **ScrollThread** — fio dourado vertical na borda que preenche com scroll progress
- **LatinStamp** — selo `☧ Soli Deo Gloria` bottom-left
- **SacredDivider** — divisor com 8 glyphs (Chi-Rho, Cross Pattée, Fleur-de-lis, IHS, etc.)
- **SacredCorner** — molduras SVG de canto estilo livro litúrgico

## Desenvolvimento

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Estrutura

```
app/
  layout.tsx
  page.tsx
  globals.css
components/
  Navbar.tsx
  CustomCursor.tsx
  GrainOverlay.tsx
  SectionIndicator.tsx
  ScrollThread.tsx
  LatinStamp.tsx
  SacredDivider.tsx
  SacredCorner.tsx
  sections/
    Hero.tsx         # Scrub vídeo de Roma (construção 500 anos)
    Manifesto.tsx    # 6 frases reveladas com scroll
    Gallery.tsx      # 7 KVs em scroll horizontal
    Pillars.tsx      # 4 cards com 3D tilt
    Verse.tsx        # Scrub vídeo + drop cap iluminado
    Stats.tsx        # 4 entradas editoriais com numerais romanos
    Prayer.tsx       # Scrub vídeo São Miguel + oração preenche
    CTA.tsx          # SplitText + explosion + form
public/
  hero-video.mp4
  verse-video.mp4
  prayer-video.mp4
  KVs/              # KV01–KV07
docs/
  BE_CATHOLIC_master_brief.md
  be_catholic_creative_brief.html
  be_catholic_midjourney_prompts.html
  be_catholic_site_structure.html
```

## Brief

Ver `docs/BE_CATHOLIC_master_brief.md` para contexto estratégico completo.

---

*Ad Majorem Dei Gloriam*
