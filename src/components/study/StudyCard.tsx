import { getCategoryStudyStyle } from '@/constants/categories';

interface StudyCardProps {
  word: string;
  context: string;
  category: string;
  onReveal: () => void;
}

export function StudyCard({ word, context, category, onReveal }: StudyCardProps) {
  const data = getCategoryStudyStyle(category);

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-2 flex flex-col">
      <div className={`h-1.5 bg-gradient-to-r ${data.gradient}`}></div>

      <div className="p-7 flex-1">
        <div className="flex items-center gap-2 mb-4">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${data.bg} ${data.text} border border-current/10`}>
            {data.icon}
            {category}
          </span>
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">{word}</h3>
        <p className="text-sm text-gray-600 italic leading-relaxed">{context}</p>
      </div>

      <div className="border-t border-gray-100"></div>

      <button
        onClick={onReveal}
        className={`w-full py-4 px-6 text-sm font-semibold text-gray-700 hover:bg-gradient-to-r ${data.gradient} hover:text-white transition-all duration-300 relative overflow-hidden group/btn`}
      >
        <span className="relative z-10">Click to reveal translation</span>
      </button>
    </div>
  );
}
