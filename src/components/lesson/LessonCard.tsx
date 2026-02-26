import { MoreVertical, Calendar, BookOpen, Edit2, Trash2, Eye } from 'lucide-react';
import { useState } from 'react';
import { getCategoryBadgeStyle } from '@/constants/categories';
import { useVocabRecall } from '@/hooks/useVocabRecall';
import type { Category } from '@/types';

interface LessonCardProps {
  id: string;
  title: string;
  date: string;
  wordsCount: number;
  category: Category;
}

export function LessonCard({ id, title, date, wordsCount, category }: LessonCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const { deleteLesson, selectLesson } = useVocabRecall();
  const data = getCategoryBadgeStyle(category);

  const handleEdit = () => {
    // TODO: abrir fluxo de edição (PROMPT 4 documentado no DOCUMENTATION.md)
  };

  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-200/60 overflow-hidden w-full hover-lift">
      <div className="p-4 md:p-5 border-b border-gray-100">
        <div className="flex items-start justify-between gap-2 mb-3">
          <span className={`badge-hover inline-block px-3 py-1 rounded-md text-xs font-semibold shrink-0 ${data.bg} ${data.text}`}>
            {category}
          </span>
          <div className="relative shrink-0">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-1.5 transition-colors"
              aria-label="Abrir menu"
            >
              <MoreVertical size={18} />
            </button>

            {showMenu && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-10">
                <button
                  type="button"
                  onClick={() => {
                    handleEdit();
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                >
                  <Edit2 size={16} />
                  Editar título
                </button>
                <button
                  type="button"
                  onClick={() => {
                    deleteLesson(id);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
                >
                  <Trash2 size={16} />
                  Excluir
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
          <Calendar size={14} />
          <span>{date}</span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <BookOpen size={16} className="text-primary" />
            <span className="font-semibold text-gray-900">{wordsCount}</span>
            <span>palavras</span>
          </div>

          <button
            onClick={() => selectLesson(id)}
            className="btn-secondary-hover flex items-center justify-center gap-1.5 min-h-[44px] px-4 py-2 text-xs font-medium text-primary bg-blue-50 hover:bg-blue-100 rounded-lg"
          >
            <Eye size={14} />
            Ver lição
          </button>
        </div>
      </div>
    </div>
  );
}
