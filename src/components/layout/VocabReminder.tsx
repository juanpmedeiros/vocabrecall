import { Lightbulb, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { useVocabRecall } from '@/hooks/useVocabRecall';

export function VocabReminder() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { vocabPhrases } = useVocabRecall();

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % vocabPhrases.length);
  };

  if (vocabPhrases.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200/60">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 bg-amber-500 rounded-lg flex items-center justify-center">
            <Lightbulb size={18} className="text-white" />
          </div>
          <h3 className="font-bold text-gray-900">Vocab Reminder</h3>
        </div>
        <p className="text-sm text-gray-500 italic">Start learning to see reminders here!</p>
      </div>
    );
  }

  const current = vocabPhrases[currentIndex];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200/60">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-amber-500 rounded-lg flex items-center justify-center">
            <Lightbulb size={18} className="text-white" />
          </div>
          <h3 className="font-bold text-gray-900">Vocab Reminder</h3>
        </div>
        <button
          onClick={handleNext}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-400 hover:text-primary hover:bg-blue-50 rounded-lg p-2 transition-all"
          title="Next phrase"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
        <p className="text-sm font-semibold text-amber-900 mb-2">{current.word}</p>
        <p className="text-sm text-gray-700 italic leading-relaxed">"{current.phrase}"</p>
      </div>

      <div className="flex items-center justify-center gap-1.5 mt-4">
        {vocabPhrases.map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all ${
              idx === currentIndex ? 'w-6 bg-amber-500' : 'w-1.5 bg-gray-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
