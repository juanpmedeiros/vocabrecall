# VocabRecall — Análise e Planejamento Inicial (PROMPT 0)

Documento gerado a partir do código existente (Figma Make + código atual).  
**Fonte de verdade:** código em `src/`.  
**Hierarquia:** semântica → primitiva → conversão → jamais hardcoded.

---

## 1. MAPEAMENTO DA ESTRUTURA ATUAL

### 1.1 Árvore de arquivos (excluindo `.git`)

```
VocabRecall/
├── package.json
├── vite.config.ts
├── index.html
├── postcss.config.mjs
├── README.md
├── ATTRIBUTIONS.md
├── guidelines/
│   └── Guidelines.md
├── src/
│   ├── main.tsx
│   ├── app/
│   │   ├── App.tsx                    # Raiz da aplicação (única “página”)
│   │   └── components/
│   │       ├── LessonCard.tsx         # Card de lição na grid
│   │       ├── StudyCard.tsx          # Card de estudo (flashcard) — NÃO USADO
│   │       ├── StatsPanel.tsx         # Painel de estatísticas (sidebar)
│   │       ├── VocabReminder.tsx       # Lembrete de vocabulário (sidebar)
│   │       ├── CreateLessonModal.tsx   # Modal criar lição
│   │       ├── LessonDetailModal.tsx   # Modal detalhe/estudo da lição
│   │       ├── AddWordModal.tsx        # Modal adicionar palavra (não usado no App)
│   │       ├── Pagination.tsx         # Paginação da grid de lições
│   │       ├── figma/
│   │       │   └── ImageWithFallback.tsx
│   │       └── ui/                    # ~40 componentes Radix/shadcn
│   │           ├── alert-dialog.tsx, card.tsx, drawer.tsx, ...
│   │           └── (button, input, dialog, tabs, etc.)
│   └── styles/
│       ├── index.css                  # Orquestra imports
│       ├── tailwind.css               # Tailwind 4 + tw-animate
│       └── theme.css                  # CSS vars + @theme + base
```

### 1.2 Classificação

| Tipo | Arquivos |
|------|----------|
| **Páginas/Views** | Nenhuma rota; uma única “tela” em `App.tsx` (lista + modais). |
| **Componentes de domínio** | `LessonCard`, `StudyCard`, `StatsPanel`, `VocabReminder`, `CreateLessonModal`, `LessonDetailModal`, `AddWordModal`, `Pagination`. |
| **Componentes UI (primitivos)** | Tudo em `src/app/components/ui/` (Radix + CVA). |
| **Utilitários/figma** | `ImageWithFallback.tsx`. |
| **Estilos** | `index.css`, `tailwind.css`, `theme.css`. |
| **Config** | `vite.config.ts`, `postcss.config.mjs`, `package.json`. |

### 1.3 Problemas de qualidade identificados

- **Dados no componente:** `allLessons` e `vocabPhrases` estão hardcoded em `App.tsx` (~200 linhas). Deveriam vir de estado/API/store.
- **Cores hardcoded:** Uso repetido de `#3B5BDB`, `#2F4BC7`, `#F5F7FA` em vários componentes em vez de tokens (veja seção 4).
- **Espaçamentos/layout hardcoded:** `max-w-[1600px]`, `320px` (sidebar), `min-h-[300px]`, `max-h-[90vh]`, etc., sem tokens de layout.
- **Tipografia:** `theme.css` usa `var(--text-2xl)`, `var(--text-xl)`, `var(--text-lg)`, `var(--text-base)` em `@layer base`, mas **essas variáveis não estão definidas** em `:root` nem em `@theme` — risco de fallback incorreto.
- **Componentes não utilizados:** `StudyCard` e `AddWordModal` não são importados em `App.tsx`; `ImageWithFallback` não é usado.
- **Duplicação de mapeamento de categoria:** `LessonCard`, `LessonDetailModal` e `StudyCard` definem cada um seu `categoryData` / `categoryColors` (cores e ícones por categoria). Deveria existir um único mapa (ex.: constantes ou hook).
- **Classes Tailwind repetidas:** Padrões como `focus:ring-2 focus:ring-[#3B5BDB]/20 focus:border-[#3B5BDB]` e `rounded-xl` repetidos em muitos arquivos; botão primário repetido (bg primary + hover).
- **Posicionamento:** Uso de `absolute`/`fixed` apenas em modais e dropdown (adequado). Não há abuso de posicionamento absoluto no layout principal.
- **Tipagem fraca:** `selectedLesson` em `App.tsx` está como `useState<any>(null)`; deveria ser tipado como `Lesson \| null`.
- **Responsividade:** Grid e sidebar usam `lg:grid-cols-[1fr_320px]` e `max-w-[1600px]`; não há tokens para breakpoints/containers.

---

## 2. MAPEAMENTO DAS ENTIDADES DO DOMÍNIO

Com base nos componentes e estruturas de dados presentes no código:

### 2.1 Lesson (Lição)

| Campo | Tipo | Observação |
|-------|------|------------|
| `id` | `number` | Identificador único |
| `title` | `string` | Nome da lição |
| `date` | `string` | Ex.: `"Feb 24, 2026"` (formato não normalizado) |
| `wordsCount` | `number` | Quantidade de palavras (redundante com `words.length`) |
| `category` | `string` | Uma de: `business`, `travel`, `technology`, `food`, `sports`, `transports` (lowercase no dado) |
| `words` | `Word[]` | Lista de palavras da lição |

### 2.2 Word (Palavra/Vocábulo)

| Campo | Tipo | Observação |
|-------|------|------------|
| `word` | `string` | Palavra em inglês |
| `translation` | `string` | Tradução (PT-BR) |
| `context` | `string` | Frase de contexto |

### 2.3 VocabPhrase (Lembrete)

| Campo | Tipo | Observação |
|-------|------|------------|
| `word` | `string` | Palavra destacada |
| `phrase` | `string` | Frase que contém a palavra |

Usado no bloco “Vocab Reminder” da sidebar; estrutura independente da lição.

### 2.4 Category (Categoria)

Não é uma entidade persistida; é um valor fixo usado em lições e em mapeamentos visuais:

- Valores: `food`, `sports`, `technology`, `travel`, `transports`, `business`.
- Em UI: labels podem ser “Food”, “Sports”, etc. (ex.: `CreateLessonModal`).

### 2.5 Entidades implícitas / não implementadas

- **StudySession:** Não existe; o fluxo de “estudar” é o `LessonDetailModal` (navegação palavra a palavra + revelar tradução). Não há registro de sessão nem progresso.
- **Deck:** Não existe; o conceito é “lista de lições” (array em memória em `App.tsx`).
- **User/Progress:** Não há usuário nem persistência de “lessons completed” ou “words learned”; os números no `StatsPanel` vêm só da contagem atual em memória.

---

## 3. MAPEAMENTO DAS TELAS E NAVEGAÇÃO

### 3.1 Visão geral

- **SPA sem roteador:** Não há `react-router` (ou similar) em uso. Tudo acontece em uma única view com modais.
- **Telas/views efetivas:**
  1. **Lista de lições** — Layout principal: header (logo, busca, botão “New Lesson”), grid de `LessonCard`, paginação, sidebar (StatsPanel + VocabReminder).
  2. **Modal Criar Lição** — CreateLessonModal (título, categoria, palavras).
  3. **Modal Detalhe da Lição** — LessonDetailModal (flashcard por palavra: palavra + contexto → revelar tradução; navegação anterior/próximo + dots).

### 3.2 Fluxo de navegação

```
[Lista de lições]
  ├── Busca → filtra lições (estado local)
  ├── Paginação → troca página (estado local)
  ├── “New Lesson” → abre CreateLessonModal
  ├── “View Lesson” em um card → abre LessonDetailModal (lesson selecionada)
  ├── Menu do card (Edit / Delete) → apenas console.log (não navega)
  └── Sidebar sempre visível (stats + reminders)
```

Não há navegação para “tela de estudo” separada; `StudyCard` não está integrado.

### 3.3 Estados visuais por contexto

| Contexto | Estados |
|----------|--------|
| **Lista** | Com resultados; sem resultados (busca); lista vazia (nenhuma lição). |
| **LessonCard** | Normal; menu dropdown aberto/fechado. |
| **CreateLessonModal** | Categoria “manager” aberto/fechado; edição de categoria (inline). |
| **LessonDetailModal** | Palavra atual; tradução oculta vs revelada; botões Previous/Next habilitados/desabilitados. |
| **VocabReminder** | Índice da frase atual; lista vazia (mensagem “Start learning…”). |
| **Pagination** | Página atual; botões anterior/próximo desabilitados nas extremidades. |

---

## 4. MAPEAMENTO DOS TOKENS VISUAIS

### 4.1 Cores hardcoded no código (src)

| Valor | Onde aparece | Sugestão de token |
|-------|----------------|-------------------|
| `#F5F7FA` | App.tsx (background da página) | `--color-page-bg` ou usar `--color-muted` se for o mesmo propósito |
| `#3B5BDB` | App, LessonCard, StatsPanel, VocabReminder, CreateLessonModal, LessonDetailModal, Pagination | **Cor primária da marca** → `--color-brand` / `--primary` (e usar `bg-primary` no Tailwind) |
| `#2F4BC7` | App, CreateLessonModal, LessonDetailModal (hover de botão primário) | `--color-brand-hover` ou derivar de `--primary` (ex.: `primary-hover`) |

**Observação:** Em `theme.css` já existem `--primary`, `--background`, etc., mas o tema usa `#030213` como primary (escuro). O azul `#3B5BDB` é o “brand” do Figma Make e está espalhado nos componentes. Recomendação: definir um token semântico (ex.: `--color-brand`) para esse azul e usar em todos os lugares, ou alinhar `--primary` do tema com esse azul e usar `bg-primary` / `text-primary` em vez de hex.

### 4.2 Cores em theme.css (definições :root)

Estas já são tokens; listadas para referência e para evitar duplicar com hex no JSX:

- `#ffffff`, `#030213`, `#ececf0`, `#717182`, `#e9ebef`, `#d4183d`, `#f3f3f5`, `#cbced4`, etc.

Sugestão: onde no app for “fundo de página”, “card”, “texto primário”, usar sempre as variáveis do tema (ex.: `bg-background`, `bg-card`, `text-foreground`) em vez de introduzir novos hex.

### 4.3 Espaçamentos hardcoded (px / rem / valores arbitrários)

| Valor | Onde | Sugestão |
|-------|------|----------|
| `1600px` | App.tsx (`max-w-[1600px]`) | `--container-max-width` ou `max-w-7xl` se couber no design |
| `320px` | App.tsx (sidebar `lg:grid-cols-[1fr_320px]`) | `--sidebar-width` (ex.: 20rem) |
| `300px` | LessonDetailModal (`min-h-[300px]`) | `--card-min-height` ou token de “flashcard” |
| `90vh` | CreateLessonModal, AddWordModal (`max-h-[90vh]`) | `--modal-max-height` (ex.: 90vh) |
| `pl-11`, `px-8`, `py-5`, `gap-8`, etc. | Vários | Preferir escala do Tailwind (4, 5, 6, 8) ou tokens de spacing do theme se existirem |

### 4.4 Border-radius

- Uso consistente de `rounded-xl` e `rounded-2xl`, `rounded-lg`, `rounded-md` nos componentes de domínio.
- Em `theme.css`: `--radius: 0.625rem` e `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl` já definidos no `@theme`.
- Sugestão: usar `rounded-lg` / `rounded-xl` como padrão e evitar valores arbitrários; alinhar com `--radius-*` se quiser tudo via tokens.

### 4.5 Sombras

- Uso de `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-2xl` sem valores customizados nos componentes principais.
- Nenhum token de sombra definido em `theme.css`; o uso atual está adequado com utilitários Tailwind.

### 4.6 Fontes

- `theme.css` define apenas `--font-size: 16px` em `:root`.
- Base typography usa `var(--text-2xl)`, `var(--text-xl)`, `var(--text-lg)`, `var(--text-base)` **não definidos** — é um bug/omissão.
- Sugestão: definir em `@theme` ou `:root` algo como:
  - `--text-2xl: 1.5rem`
  - `--text-xl: 1.25rem`
  - `--text-lg: 1.125rem`
  - `--text-base: 1rem`
  e manter o uso em `@layer base` para h1–h4, label, button, input.

### 4.7 Resumo de ações sugeridas para tokens

1. **Cores:** Criar/usar token para azul da marca (`#3B5BDB` / `#2F4BC7`) e substituir todos os usos nos componentes; fundo de página (`#F5F7FA`) como token ou variável de tema.
2. **Espaçamento/layout:** Definir `--container-max-width`, `--sidebar-width`, `--modal-max-height` (e opcionalmente `min-h` do flashcard) e usar nos componentes.
3. **Tipografia:** Definir `--text-2xl`, `--text-xl`, `--text-lg`, `--text-base` em `theme.css` para o base layer funcionar corretamente.
4. **Consistência:** Preferir sempre classes que mapeiam para o tema (ex.: `bg-primary`, `text-primary`, `border-border`) em vez de hex ou gray-* solto onde fizer sentido semântico.

---

## Próximos passos sugeridos

- Corrigir variáveis de tipografia em `theme.css`.
- Extrair tokens de cor (brand/primary) e layout (container, sidebar, modal) e substituir valores hardcoded.
- Centralizar mapeamento de categorias (cores/ícones) em um único módulo.
- Tipar `selectedLesson` e, se desejado, introduzir tipos globais para `Lesson`, `Word`, `VocabPhrase`.
- Decidir uso de `StudyCard` e `AddWordModal` (integrar ou remover).
- Garantir build obrigatório antes de commit (`pnpm build` / `npm run build`).

Build atual: executar `pnpm build` (ou `npm run build`) na raiz do projeto para validar.
