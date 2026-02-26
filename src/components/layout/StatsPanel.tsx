import { GraduationCap, BookMarked, TrendingUp } from 'lucide-react';

interface StatsPanelProps {
  lessonsCount: number;
  wordsCount: number;
}

export function StatsPanel({ lessonsCount, wordsCount }: StatsPanelProps) {
  return (
    <div className="bg-primary rounded-xl p-6 text-white shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
          <TrendingUp size={20} />
        </div>
        <h3 className="text-lg font-bold">Your Progress</h3>
      </div>

      <div className="space-y-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-white/20 rounded-md flex items-center justify-center">
              <GraduationCap size={16} />
            </div>
            <span className="text-sm text-white/80">Lessons Completed</span>
          </div>
          <p className="text-3xl font-bold">{lessonsCount}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-white/20 rounded-md flex items-center justify-center">
              <BookMarked size={16} />
            </div>
            <span className="text-sm text-white/80">Words Learned</span>
          </div>
          <p className="text-3xl font-bold">{wordsCount}</p>
        </div>
      </div>
    </div>
  );
}
