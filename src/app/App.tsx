import { useState } from 'react';
import { Search, Plus, Sparkles, LayoutGrid } from 'lucide-react';
import { LessonCard } from '@/components/lesson/LessonCard';
import { StatsPanel } from '@/components/layout/StatsPanel';
import { VocabReminder } from '@/components/layout/VocabReminder';
import { CreateLessonModal } from '@/components/lesson/CreateLessonModal';
import { LessonDetailModal } from '@/components/lesson/LessonDetailModal';
import { Pagination } from '@/components/ui/Pagination';
import type { Lesson, VocabPhrase } from '@/types';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const itemsPerPage = 6;

  const allLessons: Lesson[] = [
    {
      id: '1',
      title: 'Business English - Meeting Vocabulary',
      date: 'Feb 24, 2026',
      wordsCount: 12,
      category: 'business',
      words: [
        { word: 'Agenda', translation: 'Pauta', context: 'We need to set the agenda for tomorrow\'s meeting.' },
        { word: 'Stakeholder', translation: 'Parte interessada', context: 'All stakeholders must approve this decision.' },
        { word: 'Deliverable', translation: 'Entregável', context: 'What are the key deliverables for this project?' }
      ]
    },
    {
      id: '2',
      title: 'Travel Essentials',
      date: 'Feb 22, 2026',
      wordsCount: 8,
      category: 'travel',
      words: [
        { word: 'Itinerary', translation: 'Itinerário', context: 'Please send me your travel itinerary.' },
        { word: 'Boarding Pass', translation: 'Cartão de embarque', context: 'Don\'t forget to print your boarding pass.' }
      ]
    },
    {
      id: '3',
      title: 'Tech Terms & Programming',
      date: 'Feb 20, 2026',
      wordsCount: 15,
      category: 'technology',
      words: [
        { word: 'Deploy', translation: 'Implantar', context: 'We will deploy the new version tomorrow.' },
        { word: 'Debugging', translation: 'Depuração', context: 'I spent all morning debugging this code.' },
        { word: 'Framework', translation: 'Framework', context: 'React is a popular JavaScript framework.' }
      ]
    },
    {
      id: '4',
      title: 'Food & Restaurant Vocabulary',
      date: 'Feb 18, 2026',
      wordsCount: 10,
      category: 'food',
      words: [
        { word: 'Appetizer', translation: 'Aperitivo', context: 'Would you like to order an appetizer?' },
        { word: 'Medium Rare', translation: 'Ao ponto', context: 'I\'d like my steak medium rare, please.' }
      ]
    },
    {
      id: '5',
      title: 'Sports Commentary & Terms',
      date: 'Feb 16, 2026',
      wordsCount: 14,
      category: 'sports',
      words: [
        { word: 'Overtime', translation: 'Prorrogação', context: 'The game went into overtime.' },
        { word: 'Underdog', translation: 'Azarão', context: 'The underdog team won the championship.' }
      ]
    },
    {
      id: '6',
      title: 'Airport & Flight Vocabulary',
      date: 'Feb 14, 2026',
      wordsCount: 9,
      category: 'transports',
      words: [
        { word: 'Layover', translation: 'Escala', context: 'I have a two-hour layover in Miami.' },
        { word: 'Baggage Claim', translation: 'Retirada de bagagem', context: 'Meet me at the baggage claim area.' }
      ]
    },
    {
      id: '7',
      title: 'Marketing & Advertising Terms',
      date: 'Feb 12, 2026',
      wordsCount: 11,
      category: 'business',
      words: [
        { word: 'Campaign', translation: 'Campanha', context: 'Our marketing campaign was very successful.' },
        { word: 'Target Audience', translation: 'Público-alvo', context: 'Who is your target audience?' }
      ]
    },
    {
      id: '8',
      title: 'Cooking Methods & Techniques',
      date: 'Feb 10, 2026',
      wordsCount: 13,
      category: 'food',
      words: [
        { word: 'Sauté', translation: 'Refogar', context: 'Sauté the onions until golden.' },
        { word: 'Simmer', translation: 'Ferver em fogo baixo', context: 'Let the sauce simmer for 20 minutes.' }
      ]
    },
    {
      id: '9',
      title: 'Software Development Basics',
      date: 'Feb 8, 2026',
      wordsCount: 16,
      category: 'technology',
      words: [
        { word: 'Repository', translation: 'Repositório', context: 'Clone the repository from GitHub.' },
        { word: 'Merge Conflict', translation: 'Conflito de mesclagem', context: 'We need to resolve this merge conflict.' }
      ]
    },
    {
      id: '10',
      title: 'Hotel & Accommodation Phrases',
      date: 'Feb 6, 2026',
      wordsCount: 7,
      category: 'travel',
      words: [
        { word: 'Check-in', translation: 'Fazer check-in', context: 'What time is check-in?' },
        { word: 'Amenities', translation: 'Comodidades', context: 'The hotel has great amenities.' }
      ]
    },
    {
      id: '11',
      title: 'Public Transportation Vocabulary',
      date: 'Feb 4, 2026',
      wordsCount: 10,
      category: 'transports',
      words: [
        { word: 'Commute', translation: 'Deslocamento', context: 'My daily commute takes 45 minutes.' },
        { word: 'Rush Hour', translation: 'Horário de pico', context: 'Avoid traveling during rush hour.' }
      ]
    },
    {
      id: '12',
      title: 'Fitness & Exercise Terms',
      date: 'Feb 2, 2026',
      wordsCount: 12,
      category: 'sports',
      words: [
        { word: 'Warm-up', translation: 'Aquecimento', context: 'Always do a warm-up before exercising.' },
        { word: 'Repetition', translation: 'Repetição', context: 'Do three sets of 10 repetitions.' }
      ]
    },
    {
      id: '13',
      title: 'Financial & Banking Vocabulary',
      date: 'Jan 31, 2026',
      wordsCount: 15,
      category: 'business',
      words: [
        { word: 'Interest Rate', translation: 'Taxa de juros', context: 'The interest rate has increased.' },
        { word: 'Withdrawal', translation: 'Saque', context: 'I need to make a withdrawal from my account.' }
      ]
    },
    {
      id: '14',
      title: 'Cloud Computing & Infrastructure',
      date: 'Jan 29, 2026',
      wordsCount: 14,
      category: 'technology',
      words: [
        { word: 'Scalability', translation: 'Escalabilidade', context: 'The system offers great scalability.' },
        { word: 'Load Balancer', translation: 'Balanceador de carga', context: 'We need to configure the load balancer.' }
      ]
    },
    {
      id: '15',
      title: 'International Cuisine Terms',
      date: 'Jan 27, 2026',
      wordsCount: 11,
      category: 'food',
      words: [
        { word: 'Delicacy', translation: 'Iguaria', context: 'Caviar is considered a delicacy.' },
        { word: 'Palate', translation: 'Paladar', context: 'This dish has a complex palate.' }
      ]
    },
    {
      id: '16',
      title: 'City Sightseeing & Tourism',
      date: 'Jan 25, 2026',
      wordsCount: 9,
      category: 'travel',
      words: [
        { word: 'Landmark', translation: 'Marco histórico', context: 'The Eiffel Tower is a famous landmark.' },
        { word: 'Guided Tour', translation: 'Tour guiado', context: 'We booked a guided tour of the city.' }
      ]
    },
    {
      id: '17',
      title: 'Team Sports & Rules',
      date: 'Jan 23, 2026',
      wordsCount: 13,
      category: 'sports',
      words: [
        { word: 'Penalty', translation: 'Penalidade', context: 'The referee called a penalty.' },
        { word: 'Substitution', translation: 'Substituição', context: 'The coach made a substitution in the second half.' }
      ]
    },
    {
      id: '18',
      title: 'Driving & Road Vocabulary',
      date: 'Jan 21, 2026',
      wordsCount: 8,
      category: 'transports',
      words: [
        { word: 'Roundabout', translation: 'Rotatória', context: 'Take the second exit at the roundabout.' },
        { word: 'Yield', translation: 'Dar preferência', context: 'You must yield to oncoming traffic.' }
      ]
    }
  ];

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow Ctrl+A (Windows/Linux) or Cmd+A (Mac) to select all text
    if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
      e.currentTarget.select();
    }
  };

  // Filter lessons based on search value
  const filteredLessons = allLessons.filter((lesson) => {
    if (!searchValue.trim()) return true;
    
    const searchLower = searchValue.toLowerCase();
    
    // Search in title
    if (lesson.title.toLowerCase().includes(searchLower)) return true;
    
    // Search in category
    if (lesson.category.toLowerCase().includes(searchLower)) return true;
    
    // Search in words
    if (lesson.words.some(w =>
      w.word.toLowerCase().includes(searchLower) ||
      w.translation.toLowerCase().includes(searchLower) ||
      (w.context && w.context.toLowerCase().includes(searchLower))
    )) return true;
    
    return false;
  });

  const totalPages = Math.ceil(filteredLessons.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLessons = filteredLessons.slice(startIndex, endIndex);

  const totalWords = allLessons.reduce((sum, lesson) => sum + lesson.wordsCount, 0);

  const vocabPhrases: VocabPhrase[] = [
    {
      word: 'Serendipity',
      phrase: 'Finding something good without looking for it was pure serendipity.'
    },
    {
      word: 'Ephemeral',
      phrase: 'The beauty of cherry blossoms is ephemeral, lasting only a few weeks.'
    },
    {
      word: 'Eloquent',
      phrase: 'Her eloquent speech moved everyone in the audience.'
    }
  ];

  const handleEdit = (id: string) => {
    console.log('Edit lesson:', id);
  };

  const handleDelete = (id: string) => {
    console.log('Delete lesson:', id);
  };

  const handleView = (id: string) => {
    const lesson = allLessons.find(l => l.id === id);
    if (lesson) {
      setSelectedLesson(lesson);
      setIsDetailModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-bg-page">
      {/* Header */}
      <header className="bg-white border-b border-gray-200/60 sticky top-0 z-20 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-8 py-5">
          <div className="flex items-center justify-between gap-8">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-md">
                <Sparkles className="text-white" size={20} />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                VocabRecall
              </h1>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-xl">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                <input
                  type="text"
                  placeholder="Search lessons or words..."
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                    setCurrentPage(1); // Reset to first page on search
                  }}
                  onKeyDown={handleSearchKeyDown}
                  className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white outline-none transition-all text-sm"
                />
              </div>
            </div>

            {/* Create Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-all shadow-md hover:shadow-lg hover:scale-105 duration-200"
            >
              <Plus size={18} strokeWidth={2.5} />
              New Lesson
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          {/* Left Side - Lessons */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <LayoutGrid size={24} className="text-gray-700" />
                <h2 className="text-2xl font-bold text-gray-900">My Lessons</h2>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                {searchValue.trim() ? (
                  <span className="font-medium">
                    {filteredLessons.length} {filteredLessons.length === 1 ? 'result' : 'results'} found
                  </span>
                ) : (
                  <span className="font-medium">{allLessons.length} lessons</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentLessons.map((lesson) => (
                <LessonCard
                  key={lesson.id}
                  id={lesson.id}
                  title={lesson.title}
                  date={lesson.date}
                  wordsCount={lesson.wordsCount}
                  category={lesson.category}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onView={handleView}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}

            {/* Empty State */}
            {filteredLessons.length === 0 && searchValue.trim() && (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Search className="text-gray-400" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-500 mb-6">Try searching with different keywords</p>
                <button
                  onClick={() => setSearchValue('')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-all"
                >
                  Clear Search
                </button>
              </div>
            )}
            
            {allLessons.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No lessons yet</h3>
                <p className="text-gray-500 mb-6">Create your first lesson to start learning!</p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-all shadow-md"
                >
                  <Plus size={18} />
                  Create Lesson
                </button>
              </div>
            )}
          </div>

          {/* Right Sidebar - Stats & Reminders */}
          <div className="space-y-6">
            <StatsPanel lessonsCount={allLessons.length} wordsCount={totalWords} />
            <VocabReminder phrases={vocabPhrases} />
          </div>
        </div>
      </div>

      {/* Create Lesson Modal */}
      <CreateLessonModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      {/* Lesson Detail Modal */}
      <LessonDetailModal 
        isOpen={isDetailModalOpen} 
        onClose={() => setIsDetailModalOpen(false)}
        lesson={selectedLesson}
      />
    </div>
  );
}