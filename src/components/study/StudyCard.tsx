import { ChevronLeft, ChevronRight, Trophy } from 'lucide-react';
import { getCategoryStudyStyle } from '@/constants/categories';
import { useStudySession } from '@/hooks/useStudySession';
import type { Word } from '@/types';

interface StudyCardProps {
  words: Word[];
  category: string;
  onClose?: () => void;
}

export function StudyCard({ words, category, onClose }: StudyCardProps) {
  const session = useStudySession(words);
  const {
    currentWord,
    isFlipped,
    isFinished,
    progress,
    totalWords,
    currentIndex,
    knownWords,
    unknownWords,
    flipCard,
    markAsKnown,
    markAsUnknown,
    nextCard,
    prevCard,
    restartSession,
    restartUnknown,
  } = session;

  const data = getCategoryStudyStyle(category);
  const hasUnknown = unknownWords.length > 0;

  if (words.length === 0) {
    return (
      <div className="rounded-2xl border-2 border-border bg-muted/30 p-8 text-center text-muted-foreground">
        Nenhuma palavra nesta lição.
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="flex flex-col items-center rounded-2xl border-2 border-border bg-gradient-to-br from-gray-50 to-gray-100 p-8 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Trophy size={32} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Sessão concluída! 🎉</h3>
        <div className="space-y-1 text-sm mb-6">
          <p className="text-[var(--success)] font-medium">✓ {knownWords.length} palavras dominadas</p>
          <p className="text-amber-600 font-medium">↺ {unknownWords.length} para revisar</p>
          <p className="text-gray-600">📚 Total: {totalWords} palavras</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={restartUnknown}
            disabled={!hasUnknown}
            title={!hasUnknown ? 'Nenhuma palavra para revisar' : undefined}
            className="px-4 py-2.5 text-sm font-semibold rounded-xl bg-amber-500 text-white hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Revisar palavras difíceis
          </button>
          <button
            type="button"
            onClick={restartSession}
            className="px-4 py-2.5 text-sm font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary-dark transition-colors"
          >
            Reiniciar sessão
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-200 rounded-xl transition-colors"
            >
              Fechar
            </button>
          )}
        </div>
      </div>
    );
  }

  if (!currentWord) {
    return null;
  }

  return (
    <div className="flex flex-col w-full max-w-[90vw] md:max-w-none mx-auto">
      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>{currentIndex + 1} de {totalWords} palavras</span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-400 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Flip card container */}
      <div className="min-h-[260px] md:min-h-[300px]" style={{ perspective: '1000px' }}>
        <div
          className="relative w-full transition-transform duration-[400ms] ease-in-out motion-reduce:transform-none"
          style={{
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Front */}
          <div
            className={`w-full rounded-2xl border-2 border-gray-200 bg-white shadow-md overflow-hidden cursor-pointer transition-opacity duration-[400ms] motion-reduce:duration-300 ${
              isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
            style={{ backfaceVisibility: 'hidden' }}
            onClick={() => !isFlipped && flipCard()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (!isFlipped && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                flipCard();
              }
            }}
          >
            <div className={`h-1.5 bg-gradient-to-r ${data.gradient}`} />
            <div className="p-5 md:p-7 flex flex-col items-center justify-center min-h-[240px] md:min-h-[280px]">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 ${data.bg} ${data.text} border border-current/10`}>
                {data.icon}
                {category}
              </span>
              <h3 className="text-[1.55rem] md:text-3xl font-bold text-gray-900 mb-2 text-center tracking-tight">{currentWord.word}</h3>
              <p className="text-sm text-muted-foreground">Clique para revelar a tradução</p>
            </div>
          </div>

          {/* Back — rotateY(180deg) for 3d flip; with prefers-reduced-motion we use opacity only (see theme.css) */}
          <div
            className={`study-card-back absolute inset-0 w-full rounded-2xl border-2 border-gray-200 bg-white shadow-md overflow-hidden transition-opacity duration-[400ms] motion-reduce:duration-300 ${
              isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div className={`h-1.5 bg-gradient-to-r ${data.gradient}`} />
            <div className="p-5 md:p-7 flex flex-col min-h-[240px] md:min-h-[280px]">
              <p className="text-sm font-medium text-gray-500 mb-2">{currentWord.word}</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900 mb-3 text-center flex-1 flex items-center justify-center">{currentWord.translation}</p>
              {currentWord.context && (
                <p className="text-sm text-gray-600 italic leading-relaxed mb-4">"{currentWord.context}"</p>
              )}
              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                <button
                  type="button"
                  onClick={markAsKnown}
                  className="flex-1 min-h-[44px] py-3 px-4 text-sm font-semibold rounded-xl bg-[var(--success)] text-white hover:opacity-90 transition-opacity w-full"
                >
                  ✓ Já sei
                </button>
                <button
                  type="button"
                  onClick={markAsUnknown}
                  className="flex-1 min-h-[44px] py-3 px-4 text-sm font-semibold rounded-xl bg-amber-500 text-white hover:bg-amber-600 transition-colors w-full"
                >
                  ↺ Revisar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          type="button"
          onClick={prevCard}
          disabled={currentIndex === 0}
          className="flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 border border-border rounded-lg text-gray-700 hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft size={18} />
          Anterior
        </button>
        <button
          type="button"
          onClick={nextCard}
          className="flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 border border-border rounded-lg text-gray-700 hover:bg-muted transition-all"
        >
          Próximo
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
