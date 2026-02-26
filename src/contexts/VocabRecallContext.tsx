/**
 * Global state for VocabRecall (PROMPT 2).
 * React state only — no localStorage/sessionStorage.
 */

import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Category, Lesson, VocabPhrase } from '@/types';
import { MOCK_LESSONS, MOCK_VOCAB_PHRASES } from '@/constants/mockData';
import { formatRelativeDate, normalizeSearch } from '@/utils';
import { countTotalWords, sortLessonsByDate } from '@/utils';

export type CategoryFilter = Category | 'all';

function buildLesson(input: Omit<Lesson, 'id'>): Lesson {
  return {
    ...input,
    id: crypto.randomUUID(),
    wordsCount: input.words.length,
  };
}

const initialLessons: Lesson[] = MOCK_LESSONS.map((l) => ({
  ...l,
  id: crypto.randomUUID(),
  wordsCount: l.words.length,
}));

export interface VocabRecallContextValue {
  lessons: Lesson[];
  selectedLesson: Lesson | null;
  vocabPhrases: VocabPhrase[];

  addLesson: (lesson: Omit<Lesson, 'id'>) => void;
  updateLesson: (id: string, data: Partial<Lesson>) => void;
  deleteLesson: (id: string) => void;
  selectLesson: (id: string | null) => void;

  searchText: string;
  selectedCategory: CategoryFilter;
  currentPage: number;
  setSearchText: (text: string) => void;
  setSelectedCategory: (cat: CategoryFilter) => void;
  setCurrentPage: (page: number) => void;

  getFilteredLessons: () => Lesson[];
  getPaginatedLessons: (itemsPerPage: number) => Lesson[];
  getTotalPages: (itemsPerPage: number) => number;
  getTotalWords: () => number;
  getRecentLessons: (limit: number) => Lesson[];

  formatLessonDate: (iso: string) => string;

  showCreateModal: boolean;
  toggleCreateModal: () => void;
  itemsPerPage: number;
}

const VocabRecallContext = createContext<VocabRecallContextValue | null>(null);

export interface VocabRecallProviderProps {
  children: ReactNode;
}

export function VocabRecallProvider({ children }: VocabRecallProviderProps) {
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [vocabPhrases] = useState<VocabPhrase[]>(MOCK_VOCAB_PHRASES);
  const [searchText, setSearchTextState] = useState('');
  const [selectedCategory, setSelectedCategoryState] = useState<CategoryFilter>('all');
  const [currentPage, setCurrentPageState] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const ITEMS_PER_PAGE = 6;

  const selectedLesson = useMemo(
    () => lessons.find((l) => l.id === selectedLessonId) ?? null,
    [lessons, selectedLessonId]
  );

  const addLesson = useCallback((lesson: Omit<Lesson, 'id'>) => {
    setLessons((prev) => [...prev, buildLesson(lesson)]);
  }, []);

  const updateLesson = useCallback((id: string, data: Partial<Lesson>) => {
    setLessons((prev) =>
      prev.map((l) =>
        l.id === id
          ? {
              ...l,
              ...data,
              ...(data.words !== undefined && { wordsCount: data.words.length }),
            }
          : l
      )
    );
  }, []);

  const deleteLesson = useCallback((id: string) => {
    setLessons((prev) => prev.filter((l) => l.id !== id));
    setSelectedLessonId((prev) => (prev === id ? null : prev));
  }, []);

  const selectLesson = useCallback((id: string | null) => {
    setSelectedLessonId(id);
  }, []);

  const toggleCreateModal = useCallback(() => {
    setShowCreateModal((prev) => !prev);
  }, []);

  const setSearchText = useCallback((text: string) => {
    setSearchTextState(text);
    setCurrentPageState(1);
  }, []);

  const setSelectedCategory = useCallback((cat: CategoryFilter) => {
    setSelectedCategoryState(cat);
    setCurrentPageState(1);
  }, []);

  const setCurrentPage = useCallback((page: number) => {
    setCurrentPageState(page);
  }, []);

  const getFilteredLessons = useCallback(() => {
    let list = lessons;

    const searchNorm = normalizeSearch(searchText);
    if (searchNorm) {
      list = list.filter((lesson) => {
        if (normalizeSearch(lesson.title).includes(searchNorm)) return true;
        if (normalizeSearch(lesson.category).includes(searchNorm)) return true;
        if (
          lesson.words.some(
            (w) =>
              normalizeSearch(w.word).includes(searchNorm) ||
              normalizeSearch(w.translation).includes(searchNorm) ||
              (w.context && normalizeSearch(w.context).includes(searchNorm))
          )
        )
          return true;
        return false;
      });
    }

    if (selectedCategory !== 'all') {
      list = list.filter((l) => l.category === selectedCategory);
    }

    return sortLessonsByDate(list, 'desc');
  }, [lessons, searchText, selectedCategory]);

  const getPaginatedLessons = useCallback(
    (itemsPerPage: number) => {
      const filtered = getFilteredLessons();
      const start = (currentPage - 1) * itemsPerPage;
      return filtered.slice(start, start + itemsPerPage);
    },
    [getFilteredLessons, currentPage]
  );

  const getTotalPages = useCallback(
    (itemsPerPage: number) => {
      const filtered = getFilteredLessons();
      return Math.max(1, Math.ceil(filtered.length / itemsPerPage));
    },
    [getFilteredLessons]
  );

  const getTotalWords = useCallback(() => {
    return countTotalWords(lessons);
  }, [lessons]);

  const getRecentLessons = useCallback(
    (limit: number) => {
      return sortLessonsByDate(lessons, 'desc').slice(0, limit);
    },
    [lessons]
  );

  const formatLessonDateFn = useCallback((iso: string) => formatRelativeDate(iso), []);

  const value: VocabRecallContextValue = {
    lessons,
    selectedLesson,
    vocabPhrases,
    addLesson,
    updateLesson,
    deleteLesson,
    selectLesson,
    searchText,
    selectedCategory,
    currentPage,
    setSearchText,
    setSelectedCategory,
    setCurrentPage,
    getFilteredLessons,
    getPaginatedLessons,
    getTotalPages,
    getTotalWords,
    getRecentLessons,
    formatLessonDate: formatLessonDateFn,
    showCreateModal,
    toggleCreateModal,
    itemsPerPage: ITEMS_PER_PAGE,
  };

  return (
    <VocabRecallContext.Provider value={value}>
      {children}
    </VocabRecallContext.Provider>
  );
}

export { VocabRecallContext };
