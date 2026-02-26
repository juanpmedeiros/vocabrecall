# VocabRecall

App de flashcards para memorização de vocabulário em idiomas estrangeiros.

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

---

## Sobre o projeto

O **VocabRecall** é uma aplicação web para quem está aprendendo idiomas. O usuário cria lições por categoria (comida, esportes, tecnologia, viagem, transportes, negócios), adiciona palavras com tradução e contexto e estuda em modo flashcard. O foco é a memorização de vocabulário com listagem, busca, filtros e feedback visual (toasts e validação de formulários).

**Público-alvo:** pessoas aprendendo idiomas que querem organizar e revisar vocabulário em lições.

---

## Funcionalidades implementadas

- ✅ Listagem de lições com busca em tempo real (normalizeSearch) e paginação
- ✅ Filtro por categoria (com reset de paginação)
- ✅ Criar nova lição com validação completa e toast de sucesso
- ✅ Visualizar lição em modo flashcard (flip animado)
- ✅ Sessão de estudo: marcar como "Já sei" / "Revisar", tela de conclusão com estatísticas e opção de revisar difíceis
- ✅ Excluir lição com confirmação inline e toast
- ✅ VocabReminder exibindo frases do Context
- ✅ StatsPanel com totais corretos e animação de contagem
- ✅ Paginação com stagger de cards
- ✅ Sistema de toasts e validação de formulários
- ✅ Responsividade mobile (modais fullscreen, paginação adaptada)
- ✅ Animações e transições globais (prefers-reduced-motion coberto)
- ✅ Estados vazios e acessibilidade (foco, aria-labels, navegação por teclado)

### Funcionalidades planejadas (próxima versão)

- 🔄 Integração com Supabase para persistência real
- 🔄 Edição de lição existente
- 🔄 Algoritmo de spaced repetition (SM-2)
- 🔄 Estatísticas de progresso por lição
- 🔄 Export/import de lições em CSV
- 🔄 Suporte a múltiplos idiomas

---

## Tecnologias

| Tecnologia        | Uso                                      |
|-------------------|------------------------------------------|
| **React 18**      | Biblioteca para interfaces               |
| **TypeScript**    | Tipagem estática                         |
| **Vite**          | Build tool e dev server                  |
| **Tailwind CSS**  | Framework CSS utility-first              |
| **Radix UI / shadcn** | Componentes acessíveis (ui primitives) |

---

## Estrutura do projeto

```
src/
├── app/                    # Componente raiz da aplicação (App.tsx)
├── components/
│   ├── layout/             # StatsPanel, VocabReminder (sidebar)
│   ├── lesson/             # LessonCard, CreateLessonModal, LessonDetailModal, AddWordModal
│   ├── study/              # StudyCard (flashcard de estudo)
│   └── ui/                 # Toast, Pagination, Skeleton, componentes Radix/shadcn
├── contexts/               # VocabRecallContext (estado global), ToastContext (feedback)
├── hooks/                  # useVocabRecall, useToast, useStudySession, useCountUp, useIsMobile
├── services/               # lessons.service.ts (estrutura para integração Supabase)
├── types/                  # Tipos de domínio (Word, Lesson, VocabPhrase, Category)
├── constants/              # mockData (dados iniciais), categories (badges e estilos)
├── utils/                  # date.utils, string.utils, lesson.utils (re-exportados em index.ts)
├── styles/                 # theme.css (tokens), animations.css, tailwind.css, index.css
└── main.tsx                # Entry point (providers + App)
```

---

## Instalação

```bash
npm install
npm run dev
```

Comandos úteis:

| Comando        | Descrição              |
|----------------|------------------------|
| `npm run dev`  | Servidor de desenvolvimento |
| `npm run build`| Build de produção      |
| `npm run preview` | Preview do build (servidor local) |

---

## Breakpoints

| Nome      | Faixa              |
|-----------|--------------------|
| Mobile (base) | &lt; 768px    |
| Tablet    | ≥ 768px e &lt; 1280px |
| Desktop   | ≥ 1280px e &lt; 1920px |
| Wide / 4K | ≥ 1920px           |

---

## Design system

As cores e espaçamentos seguem uma hierarquia de variáveis CSS:

1. **Semânticas** — usadas no código: `--color-primary`, `--color-bg-page`, `--color-error`, `--color-success`, etc. Definidas em `@theme inline` no Tailwind para classes como `bg-primary`, `text-destructive`.
2. **Primitivas** — definidas em `:root`: `--primary`, `--bg-page`, `--destructive`, `--error`, `--success`. Valores hex ou referências (ex.: `--error: var(--destructive)`).
3. **Conversão** — valores fixos do design foram mapeados para o token mais próximo (ex.: azul da marca → `--primary`).
4. **Regra** — não usar cores ou tamanhos hardcoded; sempre usar tokens.

**Arquivo:** `src/styles/theme.css` (tokens em `:root` e `@theme inline`).

---

## Arquitetura de Decisões

- **Context API em vez de Redux/Zustand:** O estado do app (lições, filtros, modais) é pequeno e centralizado. O Context evita dependências extras e prop drilling: apenas `useVocabRecall()` é usado nos componentes. Para uma futura migração para Supabase, o Context continuará como camada de estado; as operações CRUD chamarão o serviço em `src/services/lessons.service.ts`.
- **Sem localStorage/sessionStorage:** Os dados ficam apenas em memória para esta versão. A persistência virá do Supabase (tabelas `lessons` e `vocab_phrases`), evitando duplicar lógica e manter uma única fonte de verdade no backend.
- **Mobile-first:** Layout e breakpoints foram pensados primeiro para telas pequenas; modais em fullscreen no mobile e paginação simplificada (Página X de Y) melhoram a UX em dispositivos touch.
- **Design system:** Tokens em `theme.css` (semânticos → primitivos); nenhum valor hardcoded no código. Animações em `animations.css` com suporte a `prefers-reduced-motion` para acessibilidade.

---

## Tipos TypeScript

| Tipo         | Descrição |
|--------------|-----------|
| **Word**     | Par de vocabulário: `word`, `translation`, `context?` opcional. |
| **Lesson**   | Lição: `id`, `title`, `date`, `wordsCount`, `category`, `words[]`. |
| **VocabPhrase** | Frase de exemplo: `word`, `phrase`. |
| **Category** | Union de 6 categorias fixas. |

---

## Entidades do domínio

- **Lesson:** `id`, `title`, `date`, `wordsCount`, `category`, `words[]`
- **Word:** `word`, `translation`, `context?`
- **VocabPhrase:** `word`, `phrase`
- **Category:** `"food"` \| `"sports"` \| `"technology"` \| `"travel"` \| `"transports"` \| `"business"`

---

## Status do projeto

Progresso dos prompts de refatoração:

| Status | Prompt |
|--------|--------|
| ✅ | PROMPT 0: Análise e Planejamento |
| ✅ | PROMPT 1: Estrutura Base e Tipos |
| ✅ | PROMPT 2: Context Global e Estado |
| ✅ | PROMPT 3: Refatoração de Componentes |
| ✅ | PROMPT 4: Modais com Validação e Toasts |
| ✅ | PROMPT 5: Lógica de Flashcard |
| ✅ | PROMPT 6: Utilitários e Responsividade Mobile |
| ✅ | PROMPT 7: Animações e Transições Globais |
| ✅ | PROMPT 8: Testes e Validação Final |
| ✅ | PROMPT FINAL: Revisão de Entrega |

---

## Licença

Projeto privado.
