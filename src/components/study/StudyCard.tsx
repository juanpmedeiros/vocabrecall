import { ChevronLeft, ChevronRight, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { getCategoryStudyStyle } from '@/constants/categories';
import { useStudySession } from '@/hooks/useStudySession';
import type { Word } from '@/types';

const SLIDE_DURATION = 0.3;

interface StudyCardProps {
  words: Word[];
  category: string;
  onClose?: () => void;
}

export function StudyCard({ words, category, onClose }: StudyCardProps) {
  const session = useStudySession(words);
  const {
    sessionWords,
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

  const [displayIndex, setDisplayIndex] = useState(currentIndex);
  const [slideDirection, setSlideDirection] = useState(1);

  useEffect(() => {
    setDisplayIndex(currentIndex);
  }, [currentIndex]);

  const handleMarkKnown = () => {
    if (currentIndex >= totalWords - 1) {
      setSlideDirection(1);
      setDisplayIndex(totalWords);
      setTimeout(() => markAsKnown(), 300);
      return;
    }
    setSlideDirection(1);
    setDisplayIndex(currentIndex + 1);
    setTimeout(() => markAsKnown(), 300);
  };

  const handleMarkUnknown = () => {
    if (currentIndex >= totalWords - 1) {
      setSlideDirection(1);
      setDisplayIndex(totalWords);
      setTimeout(() => markAsUnknown(), 300);
      return;
    }
    setSlideDirection(1);
    setDisplayIndex(currentIndex + 1);
    setTimeout(() => markAsUnknown(), 300);
  };

  const handleNext = () => {
    setSlideDirection(1);
    setDisplayIndex(currentIndex + 1);
    setTimeout(() => nextCard(), 300);
  };

  const handlePrev = () => {
    setSlideDirection(-1);
    setDisplayIndex(currentIndex - 1);
    prevCard();
  };

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

  const displayWord = displayIndex < totalWords ? sessionWords[displayIndex] : null;
  const showFlipped = displayIndex === currentIndex ? isFlipped : false;

  return (
    <div className="flex flex-col w-full max-w-[90vw] md:max-w-none mx-auto">
      {/* Progress bar — transition width 600ms ease-out */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>{currentIndex + 1} de {totalWords} palavras</span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-[600ms] ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Flip card container — perspective 1000px; flip 400ms cubic-bezier(0.4,0,0.2,1) */}
      <div className="min-h-[260px] md:min-h-[300px] relative" style={{ perspective: '1000px' }}>
        <AnimatePresence mode="wait" initial={false}>
          {displayIndex >= totalWords ? (
            <motion.div
              key="finish"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none"
            />
          ) : displayWord ? (
            <motion.div
              key={displayIndex}
              initial={{ x: slideDirection > 0 ? '100%' : '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: slideDirection > 0 ? '-100%' : '100%', opacity: 0 }}
              transition={{ duration: SLIDE_DURATION, ease: [0, 0, 0.2, 1] }}
              className="absolute inset-0"
            >
              <div
                className="relative w-full h-full transition-transform duration-[400ms] motion-reduce:transform-none"
                style={{
                  transform: showFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  transformStyle: 'preserve-3d',
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                {/* Front */}
                <div
                  className={`w-full rounded-2xl border-2 border-gray-200 bg-white shadow-md overflow-hidden cursor-pointer transition-opacity duration-[400ms] motion-reduce:duration-300 ${
                    showFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}
                  style={{ backfaceVisibility: 'hidden' }}
                  onClick={() => !showFlipped && flipCard()}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (!showFlipped && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      flipCard();
                    }
                  }}
                >
                  <div className={`h-1.5 bg-gradient-to-r ${data.gradient}`} />
                  <div className="p-5 md:p-7 flex flex-col items-center justify-center min-h-[240px] md:min-h-[280px]">
                    <span className={`badge-icon-hover inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 ${data.bg} ${data.text} border border-current/10`}>
                      {data.icon}
                      {category}
                    </span>
                    <h3 className="text-[1.55rem] md:text-3xl font-bold text-gray-900 mb-2 text-center tracking-tight">{displayWord.word}</h3>
                    <p className="text-sm text-muted-foreground">Clique para revelar a tradução</p>
                  </div>
                </div>

                {/* Back */}
                <div
                  className={`study-card-back absolute inset-0 w-full rounded-2xl border-2 border-gray-200 bg-white shadow-md overflow-hidden transition-opacity duration-[400ms] motion-reduce:duration-300 ${
                    showFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <div className={`h-1.5 bg-gradient-to-r ${data.gradient}`} />
                  <div className="p-5 md:p-7 flex flex-col min-h-[240px] md:min-h-[280px]">
                    <p className="text-sm font-medium text-gray-500 mb-2">{displayWord.word}</p>
                    <p className="text-xl md:text-2xl font-bold text-gray-900 mb-3 text-center flex-1 flex items-center justify-center">{displayWord.translation}</p>
                    {displayWord.context && (
                      <p className="text-sm text-gray-600 italic leading-relaxed mb-4">"{displayWord.context}"</p>
                    )}
                    <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                      <button
                        type="button"
                        onClick={handleMarkKnown}
                        className="flex-1 min-h-[44px] py-3 px-4 text-sm font-semibold rounded-xl bg-[var(--success)] text-white hover:opacity-90 transition-opacity w-full"
                      >
                        ✓ Já sei
                      </button>
                      <button
                        type="button"
                        onClick={handleMarkUnknown}
                        className="flex-1 min-h-[44px] py-3 px-4 text-sm font-semibold rounded-xl bg-amber-500 text-white hover:bg-amber-600 transition-colors w-full"
                      >
                        ↺ Revisar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 border border-border rounded-lg text-gray-700 hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
        >
          <ChevronLeft size={18} />
          Anterior
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 border border-border rounded-lg text-gray-700 hover:bg-muted transition-all active:scale-[0.98]"
        >
          Próximo
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
