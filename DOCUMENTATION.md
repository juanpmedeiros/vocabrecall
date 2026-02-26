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

**Última atualização:** PROMPT 1 concluído. Aguardando "Próximo" para avançar.
