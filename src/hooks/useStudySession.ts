import { useState, useCallback, useMemo } from 'react';
import type { Word } from '@/types';

export function useStudySession(words: Word[]) {
  const [sessionWords, setSessionWords] = useState<Word[]>(() => words);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [knownWords, setKnownWords] = useState<string[]>([]);
  const [unknownWords, setUnknownWords] = useState<string[]>([]);

  const totalWords = sessionWords.length;
  const currentWord = totalWords > 0 ? sessionWords[currentIndex] ?? null : null;
  const progress = totalWords > 0 ? (currentIndex / totalWords) * 100 : 0;
  const remainingWords = Math.max(0, totalWords - currentIndex);

  const advanceAndMaybeFinish = useCallback(() => {
    if (currentIndex >= totalWords - 1) {
      setIsFinished(true);
    } else {
      setCurrentIndex((i) => i + 1);
    }
    setIsFlipped(false);
  }, [currentIndex, totalWords]);

  const flipCard = useCallback(() => {
    setIsFlipped((f) => !f);
  }, []);

  const markAsKnown = useCallback(() => {
    if (!currentWord) return;
    setKnownWords((k) => [...k, currentWord.word]);
    advanceAndMaybeFinish();
  }, [currentWord, advanceAndMaybeFinish]);

  const markAsUnknown = useCallback(() => {
    if (!currentWord) return;
    setUnknownWords((u) => [...u, currentWord.word]);
    advanceAndMaybeFinish();
  }, [currentWord, advanceAndMaybeFinish]);

  const nextCard = useCallback(() => {
    if (currentIndex >= totalWords - 1) {
      setIsFinished(true);
    } else {
      setCurrentIndex((i) => i + 1);
    }
    setIsFlipped(false);
  }, [currentIndex, totalWords]);

  const prevCard = useCallback(() => {
    setCurrentIndex((i) => Math.max(0, i - 1));
    setIsFlipped(false);
  }, []);

  const restartSession = useCallback(() => {
    setSessionWords(words);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsFinished(false);
    setKnownWords([]);
    setUnknownWords([]);
  }, [words]);

  const restartUnknown = useCallback(() => {
    const next = words.filter((w) => unknownWords.includes(w.word));
    setSessionWords(next);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsFinished(false);
    setKnownWords([]);
    setUnknownWords([]);
  }, [words, unknownWords]);

  return {
    currentIndex,
    isFlipped,
    isFinished,
    knownWords,
    unknownWords,
    currentWord,
    progress,
    totalWords,
    remainingWords,
    flipCard,
    markAsKnown,
    markAsUnknown,
    nextCard,
    prevCard,
    restartSession,
    restartUnknown,
  };
}
