import { X, BookOpen, Calendar, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { getCategoryBadgeStyle } from '@/constants/categories';
import { useToast } from '@/hooks/useToast';
import { useVocabRecall } from '@/hooks/useVocabRecall';
import type { Word } from '@/types';

export function LessonDetailModal() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { selectedLesson, selectLesson, deleteLesson, formatLessonDate } = useVocabRecall();
  const { showToast } = useToast();

  if (!selectedLesson || !selectedLesson.words || selectedLesson.words.length === 0) {
    return null;
  }

  const lesson = selectedLesson;
  const currentWord = lesson.words[currentWordIndex] as Word;
  const categoryData = getCategoryBadgeStyle(lesson.category);

  const nextWord = () => {
    if (currentWordIndex < lesson.words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setShowTranslation(false);
    }
  };

  const previousWord = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
      setShowTranslation(false);
    }
  };

  const handleClose = () => {
    setCurrentWordIndex(0);
    setShowTranslation(false);
    setShowDeleteConfirm(false);
    selectLesson(null);
  };

  const handleConfirmDelete = () => {
    deleteLesson(lesson.id);
    setShowDeleteConfirm(false);
    selectLesson(null);
    showToast('Lição excluída', 'success');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-md"
          onClick={handleClose}
        ></motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl"
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`inline-block px-3 py-1 rounded-md text-xs font-semibold ${categoryData.bg} ${categoryData.text}`}>
                  {lesson.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Calendar size={12} />
                  {formatLessonDate(lesson.date)}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-900">{lesson.title}</h2>
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                <BookOpen size={14} className="text-primary" />
                <span>{lesson.words.length} words in this lesson</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                className="text-gray-400 hover:text-destructive hover:bg-destructive/10 rounded-lg p-1.5 transition-colors"
                title="Excluir lição"
              >
                <Trash2 size={20} />
              </button>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors hover:bg-gray-100 rounded-lg p-1.5"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {showDeleteConfirm && (
            <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-black/40 p-4">
              <div
                className="bg-white rounded-xl shadow-xl border border-gray-200 p-6 max-w-sm w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="text-gray-900 font-medium mb-4">
                  Tem certeza que deseja excluir esta lição?
                </p>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmDelete}
                    className="px-4 py-2 text-sm font-medium text-white bg-destructive hover:bg-destructive/90 rounded-lg transition-colors"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="p-8">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 min-h-[300px] flex flex-col justify-center items-center border-2 border-gray-200 shadow-inner">
              <div className="text-center w-full">
                <div className="mb-6">
                  <span className="text-sm font-medium text-gray-500 mb-2 block">
                    Word {currentWordIndex + 1} of {lesson.words.length}
                  </span>
                  <h3 className="text-4xl font-bold text-gray-900 mb-4">{currentWord.word}</h3>
                  <p className="text-base text-gray-600 italic leading-relaxed max-w-lg mx-auto">
                    "{currentWord.context}"
                  </p>
                </div>

                <div className="mt-8">
                  {showTranslation ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-xl p-4 border-2 border-primary/20"
                    >
                      <span className="text-xs font-semibold text-primary uppercase tracking-wide block mb-1">
                        Translation
                      </span>
                      <p className="text-lg font-semibold text-gray-900">{currentWord.translation}</p>
                    </motion.div>
                  ) : (
                    <button
                      onClick={() => setShowTranslation(true)}
                      className="px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-all shadow-md hover:shadow-lg"
                    >
                      Reveal Translation
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <button
                onClick={previousWord}
                disabled={currentWordIndex === 0}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={18} />
                Previous
              </button>

              <div className="flex items-center gap-1.5">
                {lesson.words.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentWordIndex(idx);
                      setShowTranslation(false);
                    }}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentWordIndex ? 'w-8 bg-primary' : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextWord}
                disabled={currentWordIndex === lesson.words.length - 1}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                Next
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
