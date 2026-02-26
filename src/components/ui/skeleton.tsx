/**
 * Skeleton loaders (PROMPT 7 — preparação futura).
 * Não integrado ao fluxo atual; documentado para uso em loading states.
 *
 * - Skeleton: genérico com width, height, className.
 * - Shimmer: gradiente linear da esquerda para direita (1500ms infinito).
 * - SkeletonCard: tamanho aproximado de LessonCard.
 * - SkeletonText: linha de texto.
 */

import { cn } from './utils';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

export function Skeleton({ width, height, className }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn('skeleton-shimmer rounded-md', className)}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
    />
  );
}

/** Tamanho aproximado de um LessonCard para listagem. */
export function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-200/60 overflow-hidden p-4 md:p-5 space-y-3">
      <div className="flex justify-between gap-2">
        <Skeleton className="h-6 w-20 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-lg" />
      </div>
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-5 w-full max-w-[80%]" />
      <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-9 w-24 rounded-lg" />
      </div>
    </div>
  );
}

/** Uma linha de texto placeholder. */
export function SkeletonText({ className }: { className?: string }) {
  return <Skeleton className={cn('h-4 w-full max-w-full rounded', className)} />;
}
