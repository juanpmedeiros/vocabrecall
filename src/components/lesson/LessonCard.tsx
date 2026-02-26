import { MoreVertical, Calendar, BookOpen, Edit2, Trash2, Eye } from 'lucide-react';
import { useState } from 'react';
import { getCategoryBadgeStyle } from '@/constants/categories';
import type { Category } from '@/types';

interface LessonCardProps {
  id: string;
  title: string;
  date: string;
  wordsCount: number;
  category: Category;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}

export function LessonCard({ id, title, date, wordsCount, category, onEdit, onDelete, onView }: LessonCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const data = getCategoryBadgeStyle(category);

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-lg border border-gray-200/60 overflow-hidden transition-all duration-300 hover:-translate-y-1">
      {/* Header */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-start justify-between mb-3">
          <span className={`inline-block px-3 py-1 rounded-md text-xs font-semibold ${data.bg} ${data.text}`}>
            {category}
          </span>
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-1.5 transition-colors"
            >
              <MoreVertical size={18} />
            </button>

            {showMenu && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-10">
                <button
                  onClick={() => {
                    onEdit(id);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                >
                  <Edit2 size={16} />
                  Edit Title
                </button>
                <button
                  onClick={() => {
                    onDelete(id);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
                >
                  <Trash2 size={16} />
                  Delete Block
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

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <BookOpen size={16} className="text-primary" />
            <span className="font-semibold text-gray-900">{wordsCount}</span>
            <span>words learned</span>
          </div>

          <button
            onClick={() => onView(id)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary bg-blue-50 hover:bg-blue-100 rounded-lg transition-all"
          >
            <Eye size={14} />
            View Lesson
          </button>
        </div>
      </div>
    </div>
  );
}
