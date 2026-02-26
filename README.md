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

- ✅ Listagem de lições com busca e paginação
- ✅ Filtro por categoria
- ✅ Criar nova lição com palavras
- ✅ Visualizar lição em modo flashcard
- ✅ Excluir lição com confirmação
- ✅ VocabReminder com frases de exemplo
- ✅ Estatísticas (total de lições e palavras)
- ✅ Sistema de toasts para feedback
- ✅ Validação de formulários

### Funcionalidades planejadas

- 🔄 Lógica completa de sessão de estudo (spaced repetition)
- 🔄 Edição de lição existente
- 🔄 Responsividade completa mobile
- 🔄 Animações e transições
- 🔄 Persistência com Supabase (futura integração)

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
│   └── ui/                 # Toast, Pagination, componentes Radix/shadcn (button, dialog, input, etc.)
├── contexts/               # VocabRecallContext (estado global), ToastContext (feedback)
├── hooks/                  # useVocabRecall, useToast
├── types/                  # Tipos de domínio (Word, Lesson, VocabPhrase, Category)
├── constants/              # mockData (dados iniciais), categories (badges e estilos)
├── styles/                 # theme.css (tokens), tailwind.css, index.css
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
| ⬜ | PROMPT 7: Responsividade (refinamentos) |
| ⬜ | PROMPT 8: Animações e Transições |
| ⬜ | PROMPT 9: Testes e Validação Final |

---

## Licença

Projeto privado.
