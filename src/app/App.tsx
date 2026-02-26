import { Search, Plus, Sparkles, LayoutGrid } from 'lucide-react';
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
    <div className="min-h-screen bg-bg-page">
      <header className="bg-white border-b border-gray-200/60 sticky top-0 z-20 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-8 py-5">
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-md">
                <Sparkles className="text-white" size={20} />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">VocabRecall</h1>
            </div>

            <div className="flex-1 max-w-xl">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                <input
                  type="text"
                  placeholder="Search lessons or words..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white outline-none transition-all text-sm"
                />
              </div>
            </div>

            <button
              onClick={toggleCreateModal}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-all shadow-md hover:shadow-lg hover:scale-105 duration-200"
            >
              <Plus size={18} strokeWidth={2.5} />
              New Lesson
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <LayoutGrid size={24} className="text-gray-700" />
                <h2 className="text-2xl font-bold text-gray-900">My Lessons</h2>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                {searchText.trim() ? (
                  <span className="font-medium">
                    {filteredLessons.length} {filteredLessons.length === 1 ? 'result' : 'results'} found
                  </span>
                ) : (
                  <span className="font-medium">{lessons.length} lessons</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentLessons.map((lesson) => (
                <LessonCard
                  key={lesson.id}
                  id={lesson.id}
                  title={lesson.title}
                  date={formatLessonDate(lesson.date)}
                  wordsCount={lesson.wordsCount}
                  category={lesson.category}
                />
              ))}
            </div>

            {totalPages > 1 && <Pagination />}

            {filteredLessons.length === 0 && searchText.trim() && (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Search className="text-gray-400" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-500 mb-6">Try searching with different keywords</p>
                <button
                  onClick={() => setSearchText('')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-all"
                >
                  Clear Search
                </button>
              </div>
            )}

            {lessons.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No lessons yet</h3>
                <p className="text-gray-500 mb-6">Create your first lesson to start learning!</p>
                <button
                  onClick={toggleCreateModal}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-all shadow-md"
                >
                  <Plus size={18} />
                  Create Lesson
                </button>
              </div>
            )}
          </div>

          <div className="space-y-6">
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
