import { useContext } from 'react';
import { VocabRecallContext } from '@/contexts/VocabRecallContext';

const CONTEXT_ERROR =
  'useVocabRecall must be used within a VocabRecallProvider. Wrap your app with <VocabRecallProvider> in main.tsx or App.tsx.';

export function useVocabRecall() {
  const context = useContext(VocabRecallContext);
  if (context === null) {
    throw new Error(CONTEXT_ERROR);
  }
  return context;
}
