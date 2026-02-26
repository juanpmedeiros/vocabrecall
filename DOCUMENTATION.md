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

**Última atualização:** PROMPT 2 concluído. Aguardando "Próximo" para avançar.
