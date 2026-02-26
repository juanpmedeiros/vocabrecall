# VocabRecall — Documentação da refatoração

Registro dos prompts executados e estado do projeto.

---

## PROMPT 0 — Análise e Planejamento Inicial

**Status:** Concluído  
**Documento:** [docs/ANALISE_PROJETO_PROMPT0.md](docs/ANALISE_PROJETO_PROMPT0.md)

- Mapeamento da estrutura, entidades, telas e tokens visuais.
- Identificação de problemas de qualidade e sugestões de tokens.

---

## PROMPT 1 — Estrutura Base e Tipos TypeScript

**Status:** Concluído

### Alterações realizadas

1. **Estrutura de pastas**
   - `src/components/layout/` — StatsPanel, VocabReminder
   - `src/components/lesson/` — LessonCard, LessonDetailModal, CreateLessonModal
   - `src/components/study/` — StudyCard
   - `src/components/ui/` — Pagination, ImageWithFallback + todos os componentes Radix/shadcn (copiados de `src/app/components/ui/`)
   - `src/components/AddWordModal.tsx` — mantido na raiz de components (destino não definido para modal genérico)
   - `src/contexts/`, `src/hooks/`, `src/types/`, `src/utils/`, `src/constants/` — criados (vazios ou com arquivos novos)
   - Removida a pasta `src/app/components/` (componentes migrados).

2. **Tipos TypeScript** (`src/types/index.ts`)
   - `Category` — union dos 6 valores fixos
   - `Word` — word, translation, context?
   - `Lesson` — id (string), title, date, wordsCount, category, words
   - `VocabPhrase` — word, phrase
   - `selectedLesson` e dados tipados como `Lesson | null` e `Lesson[]`; handlers com `id: string`.

3. **Constants** (`src/constants/categories.tsx`)
   - `getCategoryBadgeStyle(category)` — para LessonCard e LessonDetailModal
   - `getCategoryStudyStyle(category)` — para StudyCard (inclui ícone e gradient)
   - Uso de categorias centralizado; removida duplicação nos 3 componentes.

4. **Tokens visuais** (`src/styles/theme.css`)
   - Definidas variáveis de tipografia: `--text-2xl`, `--text-xl`, `--text-lg`, `--text-base`
   - Cores: `--primary: #3B5BDB`, `--primary-dark: #2F4BC7`, `--bg-page: #F5F7FA` em `:root`
   - Em `@theme`: `--color-primary-dark`, `--color-bg-page`
   - Substituição no código: `bg-primary`, `text-primary`, `focus:ring-primary/20`, `border-primary`, `hover:bg-primary-dark`, `bg-bg-page` (sem valores hardcoded #3B5BDB, #2F4BC7, #F5F7FA).

5. **Regras**
   - Nenhuma lógica de negócio alterada.
   - Aparência mantida (apenas reorganização e tipagem).

### Build

- `npm run build` executado com sucesso após as alterações.

---

## PROMPT 2 — Context Global e Gerenciamento de Estado

**Status:** Concluído

### Alterações realizadas

1. **VocabRecallContext** (`src/contexts/VocabRecallContext.tsx`)
   - Estado principal: `lessons`, `selectedLesson` (derivado de `selectedLessonId`), `vocabPhrases`
   - CRUD: `addLesson` (id via `crypto.randomUUID()`, `wordsCount` de `words.length`), `updateLesson`, `deleteLesson` (zera `selectedLesson` se for a deletada), `selectLesson(id | null)`
   - Estado de filtro: `searchText`, `selectedCategory` (Category | "all"), `currentPage`
   - Funções de filtro: `setSearchText`, `setSelectedCategory`, `setCurrentPage` (as duas primeiras resetam `currentPage` para 1)
   - Derivadas: `getFilteredLessons()` (busca em title, category, words; filtro por categoria; ordenação por date desc), `getPaginatedLessons(itemsPerPage)`, `getTotalPages(itemsPerPage)`, `getTotalWords()`, `getRecentLessons(limit)`, `formatLessonDate(iso)`

2. **useVocabRecall** (`src/hooks/useVocabRecall.ts`)
   - Encapsula `useContext(VocabRecallContext)` e lança erro descritivo se usado fora do Provider.

3. **Mock** (`src/constants/mockData.ts`)
   - 12 lições (2 por categoria), 4–8 palavras cada, datas em ISO nos últimos 3 meses; 4 VocabPhrases. Estado inicial do Provider.

4. **Integração**
   - `main.tsx`: app envolvido com `<VocabRecallProvider>`.
   - `App.tsx`: removidos dados hardcoded e estados locais migrados; uso exclusivo de `useVocabRecall()` para dados e filtros; modal de detalhe abre/fecha via `selectedLesson` e `selectLesson(null)`.

### Estados migrados de App.tsx para o Context

| Antes (App.tsx)        | Depois (Context / hook) |
|------------------------|-------------------------|
| `allLessons` (array hardcoded) | `lessons` + inicialização com `mockData` |
| `selectedLesson`       | `selectedLesson` + `selectLesson(id \| null)` |
| `vocabPhrases` (array hardcoded) | `vocabPhrases` (inicializado no Provider) |
| `searchValue`           | `searchText` + `setSearchText` |
| `currentPage`          | `currentPage` + `setCurrentPage` |
| `filteredLessons` (derivado) | `getFilteredLessons()` |
| `currentLessons` (slice) | `getPaginatedLessons(ITEMS_PER_PAGE)` |
| `totalPages`            | `getTotalPages(ITEMS_PER_PAGE)` |
| `totalWords`            | `getTotalWords()` |
| `handleView` (setSelectedLesson + abrir modal) | `selectLesson(id)`; modal aberto quando `selectedLesson !== null` |
| `handleDelete` (só console.log) | `deleteLesson(id)` |

Mantidos em estado local no App: `isModalOpen` (Create Lesson Modal).

### Regras

- Apenas React state (`useState`); sem localStorage/sessionStorage.
- Nenhum componente alterado além de `App.tsx`; nenhum visual alterado.
- Handlers (Edit, Delete, View) continuam funcionando; fonte dos dados é o contexto.

### Build

- `npm run build` executado com sucesso.

---

## PROMPT 3 — Refatoração dos Componentes (Eliminar Prop Drilling)

**Status:** Concluído

### 1. Mapeamento do prop drilling (antes da refatoração)

| Componente | Props recebidas | Origem possível no Context |
|------------|------------------|----------------------------|
| **LessonCard** | id, title, date, wordsCount, category, onEdit, onDelete, onView | Dados: id, title, date, wordsCount, category. Ações: deleteLesson(), selectLesson() |
| **LessonDetailModal** | isOpen, onClose, lesson | lesson → selectedLesson; onClose → selectLesson(null); isOpen → selectedLesson !== null |
| **CreateLessonModal** | isOpen, onClose | isOpen/onClose → showCreateModal, toggleCreateModal(); ao salvar → addLesson() |
| **StatsPanel** | lessonsCount, wordsCount | lessons.length, getTotalWords() |
| **VocabReminder** | phrases | vocabPhrases |
| **Pagination** | currentPage, totalPages, onPageChange | currentPage, getTotalPages(itemsPerPage), setCurrentPage() |

### 2. Alterações realizadas

- **LessonCard:** Apenas props de apresentação (id, title, date, wordsCount, category). Passa a usar `useVocabRecall()` para `deleteLesson` e `selectLesson`; `onEdit` permanece como console.log local.
- **LessonDetailModal:** Sem props. Usa `useVocabRecall()` para `selectedLesson`, `selectLesson(null)`, `formatLessonDate(lesson.date)`.
- **CreateLessonModal:** Sem props. Usa `showCreateModal`, `toggleCreateModal`, `addLesson` do Context. Formulário controlado (lessonTitle, selectedCategory, words) e ao salvar chama `addLesson()` e `toggleCreateModal()`.
- **StatsPanel:** Sem props. Usa `lessons.length` e `getTotalWords()` do Context.
- **VocabReminder:** Sem props. Usa `vocabPhrases` do Context.
- **Pagination:** Sem props. Usa `currentPage`, `setCurrentPage`, `getTotalPages(itemsPerPage)`, `itemsPerPage` do Context.

### 3. Context (PROMPT 3)

- Adicionados ao Context: `showCreateModal: boolean`, `toggleCreateModal(): void`, `itemsPerPage: number` (6).

### 4. App.tsx

- Apenas layout e orquestração: header (busca, botão New Lesson), lista de LessonCard (dados do context), Pagination, estados vazios, sidebar (StatsPanel, VocabReminder), CreateLessonModal e LessonDetailModal sem props. Nenhum dado de domínio ou handler passado como prop.

### 5. AddWordModal

- Movido de `src/components/AddWordModal.tsx` para `src/components/lesson/AddWordModal.tsx`. Nenhum import existia; uso futuro: `@/components/lesson/AddWordModal`.

### 6. Props removidas por componente

| Componente | Props removidas | Passa a consumir do Context |
|------------|------------------|------------------------------|
| **LessonCard** | onEdit, onDelete, onView | deleteLesson(), selectLesson() |
| **LessonDetailModal** | isOpen, onClose, lesson | selectedLesson, selectLesson(null), formatLessonDate() |
| **CreateLessonModal** | isOpen, onClose | showCreateModal, toggleCreateModal(), addLesson() |
| **StatsPanel** | lessonsCount, wordsCount | lessons.length, getTotalWords() |
| **VocabReminder** | phrases | vocabPhrases |
| **Pagination** | currentPage, totalPages, onPageChange | currentPage, getTotalPages(itemsPerPage), setCurrentPage() |

### Regras

- Nenhum visual alterado; apenas a origem dos dados mudou.
- `useVocabRecall()` é o único ponto de acesso ao Context; nenhum componente importa o Context diretamente (apenas o hook em `useVocabRecall.ts` usa `useContext(VocabRecallContext)`).

### Build

- `npm run build` executado com sucesso.

---

## PROMPT 4 — Modais com Validação e Feedback Visual

**Status:** Concluído

### 1. Sistema de Toast

- **`src/components/ui/Toast.tsx`** — Componente de notificação no canto inferior direito; tipos `success` (verde) e `error` (vermelho); animação fade in/out; tokens do design system (`--color-primary`, `--bg-page`, `--color-error`, `--color-success`).
- **`src/contexts/ToastContext.tsx`** — Provider com estado `toasts[]`, `showToast(message, type)`, `removeToast(id)`, auto-dismiss 3000 ms; container fixo que renderiza os toasts.
- **`src/hooks/useToast.ts`** — Reexporta `useToast` do ToastContext para uso via `@/hooks/useToast`.

**Decisão sobre useToast:** O hook foi colocado em um **contexto próprio (ToastContext)** e exposto em `src/hooks/useToast.ts`. Não foi integrado ao VocabRecallContext para manter o contexto de domínio focado apenas em estado de negócio; toasts são UI/feedback transversal e podem ser usados em qualquer parte da árvore sem acoplar ao vocabulário.

### 2. Tokens de erro/sucesso

- **`src/styles/theme.css`** — Em `:root`: `--error: var(--destructive)`, `--success: #16a34a`. Em `@theme`: `--color-error`, `--color-success`. Uso de `text-destructive`, `border-destructive` para erros de validação.

### 3. CreateLessonModal — Validação

- **Título:** obrigatório, mínimo 3 caracteres; erro: "O título deve ter pelo menos 3 caracteres".
- **Categoria:** obrigatória; erro: "Selecione uma categoria".
- **Palavras:** pelo menos 1; cada palavra com `word` e `translation` preenchidos; erros por palavra e geral: "Palavra e tradução são obrigatórias" / "Adicione pelo menos uma palavra à lição".
- Erros abaixo do campo em vermelho (`text-destructive`), borda vermelha (`border-destructive`); validação em tempo real (erro some ao corrigir).
- Submit válido: `addLesson()`, reset do formulário, `toggleCreateModal()`, toast "Lição criada com sucesso! ✓" (success).
- Fechar/cancelar: limpa formulário e erros, fecha modal.

### 4. LessonDetailModal — Ações com feedback

- **Delete:** Diálogo de confirmação inline (sem `window.confirm`): "Tem certeza que deseja excluir esta lição?" com botões "Cancelar" e "Excluir". Ao confirmar: `deleteLesson(lesson.id)`, `selectLesson(null)`, toast "Lição excluída" (success).
- **Edit:** Não existe no modal (apenas no LessonCard com `console.log`). **TODO** documentado: implementar edição no modal com as mesmas validações do CreateLessonModal e toast "Lição atualizada com sucesso! ✓".

### 5. AddWordModal — Validação

- **`src/components/lesson/AddWordModal.tsx`** — Campos "word" e "translation" obrigatórios (mínimo 1 caractere); "context" opcional. Mesmo padrão visual de erro (borda e texto em vermelho com token). Toast "Palavra adicionada! ✓" (success) ao salvar com sucesso. Cancelar/fechar limpa formulário e erros.

### 6. Regras respeitadas

- Nenhum `alert()` ou `window.confirm()`; toasts não bloqueiam a interface; textos de erro em português; tokens de cor para erro; estados de validação locais aos modais.

### Build

- `npm run build` executado com sucesso.

---

## PROMPT 5 — Lógica de Flashcard e Sessão de Estudo

**Status:** Concluído

### 1. Hook useStudySession (`src/hooks/useStudySession.ts`)

- **Estado:** `sessionWords` (lista atual, inicializada com `words`; alterada em `restartSession` e `restartUnknown`), `currentIndex`, `isFlipped`, `isFinished`, `knownWords[]`, `unknownWords[]`.
- **Funções:** `flipCard()`, `markAsKnown()`, `markAsUnknown()`, `nextCard()`, `prevCard()`, `restartSession()` (volta à lista completa), `restartUnknown()` (reinicia só com `unknownWords`).
- **Derivados:** `currentWord`, `progress` (percentual), `totalWords`, `remainingWords`.
- **Uso:** Hook local; não está no Context global. Usado apenas dentro de `StudyCard`, que recebe `words: Word[]` e `category` (e opcionalmente `onClose`).

### 2. StudyCard (`src/components/study/StudyCard.tsx`)

- **Frente (`isFlipped = false`):** Palavra em destaque, badge da categoria (`getCategoryStudyStyle`), texto "Clique para revelar a tradução"; card inteiro clicável → `flipCard()`.
- **Verso (`isFlipped = true`):** Palavra menor no topo, tradução em destaque, contexto em itálico (se existir); botões "✓ Já sei" (verde, `--success`) e "↺ Revisar" (amber) → `markAsKnown()` / `markAsUnknown()`.
- **Barra de progresso:** No topo; texto "X de Y palavras"; preenchimento com `--color-primary` (progress %).
- **Navegação:** "← Anterior" (`prevCard`, disabled se `currentIndex === 0`), "→ Próximo" (`nextCard`), abaixo do card.
- **Tela de conclusão (`isFinished`):** Ícone de troféu, "Sessão concluída! 🎉", estatísticas (palavras dominadas, para revisar, total), botões "Revisar palavras difíceis" (disabled + tooltip se `unknownWords` vazio), "Reiniciar sessão", "Fechar" (`onClose`).
- **Animação de flip:** CSS `transform: rotateY()` com `backface-visibility: hidden`; transição 400 ms ease-in-out. Em `theme.css`, `@media (prefers-reduced-motion: reduce)` a classe `.study-card-back` usa `transform: none` e a troca de conteúdo é feita apenas por opacidade (fade), sem rotação.

### 3. Integração no LessonDetailModal

- Conteúdo de estudo substituído por `<StudyCard words={lesson.words} category={lesson.category} onClose={handleClose} />`.
- Estado da sessão é local ao modal: ao fechar, o modal (e o StudyCard) desmontam; ao reabrir, uma nova instância do hook inicia do zero.
- Texto da lição ajustado para português: "X palavras nesta lição".

### 4. Regras

- `useStudySession` é hook local; todos os textos em português; cores via tokens (primary, success, destructive, muted); `prefers-reduced-motion` respeitado no flip.

### Build

- `npm run build` executado com sucesso.

---

## PROMPT 6 — Utilitários de Formatação e Responsividade Mobile

**Status:** Concluído

### Parte A — Utilitários criados

1. **`src/utils/date.utils.ts`**
   - `formatDate(dateStr)` — ISO → "DD/MM/YYYY"
   - `formatDateLong(dateStr)` — "15 de novembro de 2025" (Intl pt-BR)
   - `formatRelativeDate(dateStr)` — "Hoje", "Ontem", "Há X dias/semanas" ou `formatDate` se &gt; 30 dias
   - `isRecentDate(dateStr, days)` — true se dentro dos últimos N dias

2. **`src/utils/string.utils.ts`**
   - `truncate(text, maxLength)` — trunca com "..."
   - `capitalize(text)` — primeira letra maiúscula
   - `normalizeSearch(text)` — remove acentos, lowercase, trim (NFD + remove diacríticos)

3. **`src/utils/lesson.utils.ts`**
   - `countTotalWords(lessons)` — soma `words.length` de todas as lições
   - `getLessonsByCategory(lessons, category)` — filtra por categoria
   - `sortLessonsByDate(lessons, order)` — ordena por `date` (asc | desc)
   - `getWordsForReview(lesson)` — palavras sem contexto (para revisão)

4. **`src/utils/index.ts`** — Re-exporta todas as funções dos três arquivos para `import { ... } from "@/utils"`.

### Integração dos utilitários

- **VocabRecallContext:** `formatLessonDate` passou a usar `formatRelativeDate` (datas relativas na UI). `getFilteredLessons()` usa `normalizeSearch(searchText)` e compara com `normalizeSearch()` nos títulos, categorias e palavras — busca sem acentos. `getTotalWords()` usa `countTotalWords(lessons)`. Ordenação feita com `sortLessonsByDate(list, 'desc')`; `getRecentLessons` também usa `sortLessonsByDate`.
- **Componentes:** Nenhuma formatação de data inline restante; datas vêm do Context já formatadas. Contagens vêm do Context (que usa os utils).

### Parte B — Componentes ajustados para responsividade

| Componente | Ajustes |
|------------|--------|
| **App.tsx** | Mobile: coluna única, padding `px-4`; tablet `px-6`, grid 60% / 40% (sidebar com StatsPanel + VocabReminder lado a lado); desktop `px-8`, grid `1fr 320px`. Sidebar: mobile stacked, tablet 2 colunas (50% cada), desktop 1 coluna. `overflow-x-hidden` no root. |
| **Header** | Mobile: logo + botão "New Lesson" na mesma linha; busca em linha inteira abaixo. Tablet/Desktop: busca + botão na mesma linha. Input de busca `min-h-[44px]`, `text-base` no mobile (evita zoom iOS). |
| **LessonCard** | Largura total (`w-full`), informações empilhadas; padding `p-4 md:p-5`. Menu e "View Lesson" com `min-h-[44px]` / `min-w-[44px]`. |
| **CreateLessonModal** | Mobile: `w-full h-full`, sem bordas (padding 0 no overlay); tablet/desktop: `max-w-2xl`, `max-h-[90vh]`, `rounded-2xl`. Corpo do modal com `overflow-y-auto flex-1 min-h-0`; header e footer fixos. Inputs com `text-base` (16px). Botão fechar 44×44. |
| **LessonDetailModal** | Mesmo padrão: mobile full viewport; md+ max-w centralizado. Área do StudyCard com `overflow-y-auto flex-1 min-h-0`. Botões de ação 44×44. |
| **StatsPanel / VocabReminder** | Inseridos no grid do App; mobile largura total empilhados; tablet lado a lado (50% cada); desktop coluna lateral. VocabReminder: botão "Next phrase" com `min-h-[44px] min-w-[44px]`. |
| **Pagination** | Mobile: apenas "Anterior" e "Próximo" + texto "Página X de Y"; números de página ocultos (`hidden md:flex`). Tablet/Desktop: paginação completa. Botões com `min-h-[44px]`. |
| **StudyCard** | Mobile: container `max-w-[90vw]`; palavra principal `text-[1.55rem]` (~15% menor que 3xl); botões "Já sei" e "Revisar" em coluna (`flex-col sm:flex-row`), largura total, `min-h-[44px]`. Desktop: tamanho atual. |

### Breakpoints utilizados

- Base (mobile): &lt; 768px  
- `md`: ≥ 768px (tablet)  
- `lg`: ≥ 1280px (desktop)  
- Larguras fluidas e `max-w`; sem `display:none` para remover navegação (elementos condicionalmente renderizados ou visíveis por breakpoint).

### Build

- `npm run build` executado com sucesso.

---

**Última atualização:** PROMPT 6 concluído. Aguardando "Próximo" para avançar.
