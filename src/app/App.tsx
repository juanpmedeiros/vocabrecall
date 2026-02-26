import { Search, Plus, Sparkles, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LessonCard } from '@/components/lesson/LessonCard';
import { StatsPanel } from '@/components/layout/StatsPanel';
import { VocabReminder } from '@/components/layout/VocabReminder';
import { CreateLessonModal } from '@/components/lesson/CreateLessonModal';
import { LessonDetailModal } from '@/components/lesson/LessonDetailModal';
import { Pagination } from '@/components/ui/Pagination';
import { useVocabRecall } from '@/hooks/useVocabRecall';

export default function App() {
  const {
    lessons,
    searchText,
    setSearchText,
    toggleCreateModal,
    getFilteredLessons,
    getPaginatedLessons,
    getTotalPages,
    formatLessonDate,
    itemsPerPage,
  } = useVocabRecall();

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
      e.currentTarget.select();
    }
  };

  const filteredLessons = getFilteredLessons();
  const totalPages = getTotalPages(itemsPerPage);
  const currentLessons = getPaginatedLessons(itemsPerPage);

  return (
    <div className="min-h-screen bg-bg-page min-w-0 overflow-x-hidden">
      <header className="bg-white border-b border-gray-200/60 sticky top-0 z-20 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-5">
          {/* Mobile: logo + New Lesson full width; search on next line */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-8">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-md shrink-0">
                  <Sparkles className="text-white" size={20} />
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">VocabRecall</h1>
              </div>
              <button
                onClick={toggleCreateModal}
                className="btn-primary-hover flex md:hidden items-center gap-2 px-4 py-2.5 min-h-[44px] min-w-[44px] bg-primary text-white font-medium rounded-xl hover:bg-primary-dark shadow-md hover:scale-[1.03] transition-transform duration-200"
              >
                <Plus size={18} strokeWidth={2.5} />
                Nova lição
              </button>
            </div>

            <div className="flex flex-1 gap-3 w-full md:max-w-xl">
              <div className="relative group flex-1 min-w-0">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors pointer-events-none" size={18} />
                <input
                  type="text"
                  placeholder="Buscar lições ou palavras..."
                  aria-label="Buscar lições ou palavras"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  className="w-full pl-11 pr-4 py-2.5 min-h-[44px] text-base md:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white outline-none transition-[border-color,box-shadow] duration-200"
                />
              </div>
              <button
                onClick={toggleCreateModal}
                className="btn-primary-hover hidden md:flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark shadow-md min-h-[44px] hover:scale-[1.03] transition-transform duration-200"
              >
                <Plus size={18} strokeWidth={2.5} />
                Nova lição
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
        {/* Mobile: single column. Tablet: 60% list / 40% sidebar (panels side by side). Desktop: 1fr 320px (panels stacked) */}
        <div className="grid grid-cols-1 md:grid-cols-[60%_1fr] lg:grid-cols-[1fr_320px] gap-6 md:gap-8">
          <div className="min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <LayoutGrid size={24} className="text-gray-700 shrink-0" />
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">Minhas lições</h2>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                {searchText.trim() ? (
                  <span className="font-medium">
                    {filteredLessons.length} {filteredLessons.length === 1 ? 'resultado' : 'resultados'}
                  </span>
                ) : (
                  <span className="font-medium">{lessons.length} lições</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <AnimatePresence mode="popLayout">
                {currentLessons.map((lesson, index) => (
                  <motion.div
                    key={lesson.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    transition={{
                      duration: 0.3,
                      ease: [0, 0, 0.2, 1],
                      delay: Math.min(index * 0.05, 0.4),
                    }}
                  >
                    <LessonCard
                      id={lesson.id}
                      title={lesson.title}
                      date={formatLessonDate(lesson.date)}
                      wordsCount={lesson.wordsCount}
                      category={lesson.category}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {totalPages > 1 && <Pagination />}

            {filteredLessons.length === 0 && searchText.trim() && (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Search className="text-gray-400" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Nenhuma lição encontrada para &quot;{searchText.trim()}&quot;
                </h3>
                <p className="text-gray-500 mb-6">Tente buscar com outros termos.</p>
                <button
                  onClick={() => setSearchText('')}
                  className="inline-flex items-center gap-2 px-6 py-3 min-h-[44px] bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-all"
                >
                  Limpar busca
                </button>
              </div>
            )}

            {lessons.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhuma lição encontrada</h3>
                <p className="text-gray-500 mb-6">Crie sua primeira lição para começar a estudar!</p>
                <button
                  onClick={toggleCreateModal}
                  className="inline-flex items-center gap-2 px-6 py-3 min-h-[44px] bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-all shadow-md"
                >
                  <Plus size={18} />
                  Criar primeira lição
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 lg:space-y-6">
            <StatsPanel />
            <VocabReminder />
          </div>
        </div>
      </div>

      <CreateLessonModal />
      <LessonDetailModal />
    </div>
  );
}
