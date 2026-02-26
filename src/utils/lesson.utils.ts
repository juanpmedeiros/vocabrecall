import type { Category, Lesson, Word } from '@/types';

export function countTotalWords(lessons: Lesson[]): number {
  return lessons.reduce((sum, l) => sum + l.words.length, 0);
}

export function getLessonsByCategory(
  lessons: Lesson[],
  category: Category
): Lesson[] {
  return lessons.filter((l) => l.category === category);
}

export function sortLessonsByDate(
  lessons: Lesson[],
  order: 'asc' | 'desc'
): Lesson[] {
  const list = [...lessons];
  list.sort((a, b) => {
    const ta = new Date(a.date).getTime();
    const tb = new Date(b.date).getTime();
    return order === 'asc' ? ta - tb : tb - ta;
  });
  return list;
}

/**
 * Returns words that have no context (empty or missing) — typically harder to recall.
 */
export function getWordsForReview(lesson: Lesson): Word[] {
  return lesson.words.filter((w) => !w.context || w.context.trim() === '');
}
