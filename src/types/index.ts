/**
 * Domain types for VocabRecall (PROMPT 1).
 * Source: docs/ANALISE_PROJETO_PROMPT0.md
 */

export type Category =
  | 'food'
  | 'sports'
  | 'technology'
  | 'travel'
  | 'transports'
  | 'business';

export interface Word {
  word: string;
  translation: string;
  context?: string;
}

export interface Lesson {
  id: string;
  title: string;
  date: string;
  wordsCount: number;
  category: Category;
  words: Word[];
}

export interface VocabPhrase {
  word: string;
  phrase: string;
}
