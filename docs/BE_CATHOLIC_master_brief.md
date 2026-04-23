# BE CATHOLIC — Master Brief da Landing Page

> Documento de referência completo para desenvolvimento da landing page.
> Contém: conceito, marca, copy e estrutura de cada seção.

---

## 1. VISÃO GERAL

**Nome do projeto:** Be Catholic  
**Tipo:** Landing page de movimento — não vende nada, não tem produto  
**Objetivo:** Motivar jovens de 12 a 25 anos a viverem a fé católica apostólica romana com orgulho e identidade  
**Idioma:** Português brasileiro  
**Público:** Jovens brasileiros, 12–25 anos  
**Stack:** Next.js 14 App Router + Tailwind CSS

**Tom de voz:** Épico, cinematográfico, guerreiro, belo. Não é linguagem de homilia nem de cartaz de paróquia. É a linguagem de quem cresceu com Dark Souls, Game of Thrones e The Last Kingdom — mas entregando algo real e eterno.

---

## 2. IDENTIDADE VISUAL

### Paleta
| Nome | Hex | Uso |
|---|---|---|
| Dourado Sacro | `#C9A84C` | Cor principal — destaques, ícones, bordas ativas |
| Dourado Claro | `#E8D08A` | Hover, brilhos |
| Preto Profundo | `#0A0A0A` | Fundo primário |
| Preto Card | `#111111` | Cards, seções secundárias |
| Branco Pergaminho | `#F5F0E8` | Todo o texto principal |
| Prata | `#A8A8B0` | Texto secundário, subtítulos |
| Azul Cruzado | `#0D1A2E` | Acento frio ocasional |
| Vermelho Igreja | `#8B1A1A` | Acento quente ocasional |

### Tipografia
- **Headlines:** Cinzel Decorative (Google Fonts) — peso 700
- **Títulos e subtítulos:** Cinzel (Google Fonts) — peso 400 e 700
- **Tags, eyebrows, labels:** Inter — peso 500–600, all caps, letter-spacing amplo
- **Corpo de texto:** Inter — peso 300–400

### Regras visuais
- Fundo sempre escuro — nunca branco
- Texto principal sempre em `#F5F0E8`
- Destaques sempre em dourado `#C9A84C`
- Bordas sutis e elegantes — estética sóbria, não arredondada em excesso
- Sem gradientes coloridos — apenas dark gradients e glows dourados sutis

---

## 3. SEÇÕES DA PÁGINA

A página tem 8 seções em sequência. O scroll é a narrativa.

---

### SEÇÃO 1 — HERO

**Conceito:**
A Praça de São Pedro é revelada em 3 fases durante o scroll, como se 2000 anos de construção acontecessem diante do usuário. Cada fase corresponde a uma frase da headline.

**As 3 fases (imagens):**
- `hero-frame-1.jpg` — Vatican Hill completamente vazio, terra nua, sem nenhuma construção (gerar com IA)
- `hero-frame-2.jpg` — Praça de São Pedro em processo de construção, séculos XVI–XVII (gerar com IA)
- `hero-frame-3.jpg` — A Praça de São Pedro completa ao pôr do sol (foto real fornecida)

**Copy — entra em camadas conforme o scroll:**
```
[fase 1 — imagem vazia]
"Destruam este templo."

[fase 2 — imagem em construção]
"Em três dias o reconstruirei."

[fase 3 — imagem completa]
— João 2, 19

[subline — última a aparecer, menor]
2000 anos depois, ainda de pé.
```

**Efeito de scroll:**
O scroll controla o avanço das fases frame a frame — como um vídeo sendo arrastado. As headlines aparecem no momento exato de cada fase. A imagem fica fixa na tela enquanto o usuário scrolla.

**Elemento adicional:**
Ao final da seção, um scroll indicator sutil (cruz dourada pulsando) convida o usuário a continuar.

---

### SEÇÃO 2 — MANIFESTO

**Conceito:**
Texto épico que se revela palavra por palavra conforme o scroll. O usuário "arrasta" as palavras para dentro da tela. Funciona como uma declaração do movimento.

**Copy completo (ordem exata):**
```
O mundo te oferece identidades que duram uma temporada.

A Igreja existe há 2000 anos.

São Miguel venceu batalhas cósmicas.

Nossa Senhora nunca abandonou seus filhos.

Jesus venceu a morte.

Você foi feito para mais.
```

**Observação de estilo:**
A última frase — "Você foi feito para mais." — deve ser maior e em dourado `#C9A84C`. As demais em branco.

---

### SEÇÃO 3 — GALERIA DE KEY VISUALS

**Conceito:**
Os 7 KVs gerados para a campanha em carrossel horizontal controlado pelo scroll vertical. O usuário scrolla para baixo e os cards se movem para a lateral como se estivesse deslizando uma galeria épica.

**Eyebrow da seção:** "As imagens da nossa fé"

**Os 7 cards (imagens em `/public/KVs/`):**

| Arquivo | Tema | Headline do hover |
|---|---|---|
| KV01_cavaleiro_ajoelhado.jpg | Devoção / Guerreiro | "Ajoelhe para o único que merece." |
| KV02_ressureicao.jpg | Ressurreição / Vitória | "A maior virada da história foi no terceiro dia." |
| KV03_nossa_senhora_guadalupe.jpg | Nossa Senhora | "Ela nunca parou de rezar por você." |
| KV04_brasao_vaticano.jpg | Legado / A Igreja | "2000 anos. Uma só fé." |
| KV05_guardiao_jerusalem.jpg | Missão / Vocação | "Toda geração tem sua cruzada. E a sua?" |
| KV06_eucaristia_ostensorio.jpg | Eucaristia | "O céu desceu à terra. Todo. Santo. Dia." |
| KV07_cruzado_trono.jpg | Identidade / Reinado | "Você foi batizado para reinar, não para assistir." |

**Comportamento do hover:**
Ao passar o mouse sobre o card, um overlay escuro sobe de baixo com a headline do KV em Cinzel branco.

**Cursor custom:**
Nessa seção o cursor padrão é substituído por uma cruz ✝ dourada.

---

### SEÇÃO 4 — OS PILARES

**Conceito:**
4 cards representando os pilares da fé católica. Entram na tela em sequência conforme o scroll. Hover com efeito 3D suave (tilt).

**Eyebrow:** "Os pilares"
**Título da seção:** "Em quem você acredita?"

**Os 4 cards:**

**Card 1 — São Miguel Arcanjo**
Imagem: KV01_cavaleiro_ajoelhado.jpg
Headline: "Quis ut Deus?"
Subline: "Quem como Deus? O guerreiro que venceu o impossível."

**Card 2 — Jesus Cristo**
Imagem: KV02_ressureicao.jpg
Headline: "Ele ressuscitou."
Subline: "A morte perdeu. Uma vez. Para sempre."

**Card 3 — Nossa Senhora**
Imagem: KV03_nossa_senhora_guadalupe.jpg
Headline: "Ela é sua mãe."
Subline: "Antes de você existir, ela já rezava por você."

**Card 4 — A Santa Igreja**
Imagem: KV04_brasao_vaticano.jpg
Headline: "2000 anos de pé."
Subline: "Impérios caíram. A Igreja permanece."

---

### SEÇÃO 5 — VERSÍCULO EM DESTAQUE

**Conceito:**
Uma frase bíblica em destaque absoluto. Fundo com vídeo loop de catedral gótica com luz entrando pelos vitrais. Texto revela da esquerda para a direita.

**Vídeo de fundo:** `/public/videos/cathedral.mp4` — loop de catedral gótica com raios de luz (buscar "cathedral light rays" no Pexels, gratuito)

**Copy:**
```
[frase principal — grande, Cinzel Decorative]
"As portas do inferno não prevalecerão."

[referência — pequena, dourado, letter-spacing]
Mateus 16, 18

[elemento decorativo]
Linha horizontal dourada acima e abaixo do texto
```

---

### SEÇÃO 6 — NÚMEROS DA IGREJA

**Conceito:**
4 estatísticas sobre a Igreja Católica que mostram escala e poder. Números animam de zero ao valor final quando entram na tela.

**Eyebrow:** "A maior instituição da história"

**Os 4 números:**
```
1.400.000.000   →  de católicos no mundo
2.000+          →  anos de história contínua
266             →  papas desde São Pedro
10.000+         →  santos canonizados
```

Layout em grid horizontal, separador dourado entre os itens. Número em Cinzel Decorative dourado grande, label em Inter cinza pequeno abaixo.

---

### SEÇÃO 7 — ORAÇÃO DO DIA

**Conceito:**
Uma oração completa com atmosfera contemplativa. Fundo com a imagem KV07 (cruzado no trono) ou KV05 (Jerusalém) com overlay escuro. Imagem com movimento lento e suave (ken-burns).

**Eyebrow:** "Reze com a gente"
**Título:** "Oração a São Miguel"

**Texto completo da oração:**
```
São Miguel Arcanjo,
defendei-nos no combate,
sede o nosso refúgio
contra a perversidade e as ciladas do demônio.

Que Deus sobre ele impeire,
humildemente o pedimos.

E vós, Príncipe da Milícia Celestial,
pelo poder divino, precipitai no inferno
Satanás e os outros espíritos malignos
que andam pelo mundo para perder as almas.

Ámen.
```

**Botão:** "Copiar oração"
Ao clicar, o texto do botão muda para "✓ Copiada" por 2 segundos e volta.

---

### SEÇÃO 8 — CTA FINAL

**Conceito:**
Fechamento épico. Explosão de luz dourada do centro ao entrar na seção. Headline grande com letras caindo de cima. Captura de e-mail.

**Copy:**
```
[headline — Cinzel Decorative, enorme]
"Seja Católico. Agora."

[subline]
"Receba orações, conteúdo e inspiração direto no seu e-mail."

[placeholder do campo]
"Seu melhor e-mail"

[botão]
"Entrar"
```

**Botão:** fundo dourado `#C9A84C`, texto preto, Cinzel Bold. Efeito shimmer (brilho passando da esquerda para a direita) ao hover.

**Rodapé dentro da seção:**
```
✝  BE CATHOLIC
Católico, Apostólico, Romano.
```

Links para redes sociais: Instagram e TikTok (ícones, sem texto).

---

## 4. NAVBAR (fixa)

- Logo: "BE CATHOLIC" — Cinzel Decorative, dourado
- Começa transparente, escurece com blur ao scroll
- Sem links de navegação na fase 1

---

## 5. IMAGENS E VÍDEOS NECESSÁRIOS

| Arquivo | Status | Como obter |
|---|---|---|
| `hero-frame-1.jpg` | Gerar com IA | Prompt: Vatican Hill vazio, sem construções, mesma perspectiva aérea da praça atual |
| `hero-frame-2.jpg` | Gerar com IA | Prompt: Praça de São Pedro em construção, séculos XVI–XVII, perspectiva aérea |
| `hero-frame-3.jpg` | ✅ Disponível | Foto real da praça ao pôr do sol (fornecida) |
| `KV01` a `KV07.jpg` | ✅ Gerados | Pasta `/KVs/` — gerados via fal.ai FLUX Pro Ultra |
| `cathedral.mp4` | Buscar grátis | Pexels.com → "cathedral light rays loop" |
| `hero-video.mp4` | Opcional | Timelapse da construção — Runway Gen-4 ou Kling AI (start: frame-1, end: frame-3) |

---

*Be Catholic — Campanha de Motivação à Fé Católica para Jovens 12–25 anos*
*Versão 2.0 — Abril 2026*
