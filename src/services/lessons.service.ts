/**
 * Serviço de integração com Supabase (implementação futura).
 * Substituirá o estado em memória do VocabRecallContext por chamadas à API.
 */

import type { Lesson } from '@/types';

export const lessonsService = {
  getAll: async (): Promise<Lesson[]> => {
    return [];
  },
  create: async (_lesson: Omit<Lesson, 'id'>): Promise<Lesson> => {
    return {} as Lesson;
  },
  update: async (_id: string, _data: Partial<Lesson>): Promise<Lesson | null> => {
    return null;
  },
  delete: async (_id: string): Promise<void> => {},
};
