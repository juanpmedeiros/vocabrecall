import { X, BookOpen, Calendar, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { getCategoryBadgeStyle } from '@/constants/categories';
import { useToast } from '@/hooks/useToast';
import { useVocabRecall } from '@/hooks/useVocabRecall';
import { StudyCard } from '@/components/study/StudyCard';

export function LessonDetailModal() {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { selectedLesson, selectLesson, deleteLesson, formatLessonDate } = useVocabRecall();
  const { showToast } = useToast();

  if (!selectedLesson || !selectedLesson.words || selectedLesson.words.length === 0) {
    return null;
  }

  const lesson = selectedLesson;
  const categoryData = getCategoryBadgeStyle(lesson.category);

  const handleClose = () => {
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
                <span>{lesson.words.length} palavras nesta lição</span>
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
            <StudyCard
              words={lesson.words}
              category={lesson.category}
              onClose={handleClose}
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
