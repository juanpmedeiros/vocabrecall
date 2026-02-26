import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useVocabRecall } from '@/hooks/useVocabRecall';

const BUTTON_SIZE = 'min-h-[44px] min-w-[44px]';

export function Pagination() {
  const { currentPage, setCurrentPage, getTotalPages, itemsPerPage } = useVocabRecall();
  const totalPages = getTotalPages(itemsPerPage);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const inactiveClass =
    'flex items-center justify-center rounded-lg bg-muted text-foreground hover:bg-accent transition-colors font-medium text-sm';

  return (
    <nav
      className="flex items-center justify-center gap-2 mt-8 flex-wrap"
      aria-label="Paginação"
    >
      <button
        type="button"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${BUTTON_SIZE} ${inactiveClass} disabled:opacity-40 disabled:cursor-not-allowed active:scale-95`}
        aria-label="Página anterior"
      >
        <ChevronLeft size={18} strokeWidth={2.5} />
      </button>

      {/* Mobile: only current page label */}
      <span
        className="flex md:hidden items-center justify-center min-h-[44px] px-3 text-sm font-medium text-foreground"
        aria-hidden
      >
        Página {currentPage} de {totalPages}
      </span>

      {/* Tablet/Desktop: full page numbers */}
      {getPageNumbers().map((page, index) =>
        typeof page === 'number' ? (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentPage(page)}
            className={`hidden md:flex items-center justify-center ${BUTTON_SIZE} rounded-lg font-medium text-sm transition-colors shrink-0 active:scale-95 ${
              currentPage === page
                ? 'bg-primary text-primary-foreground'
                : inactiveClass
            }`}
            aria-label={currentPage === page ? `Página ${page}, atual` : `Ir para página ${page}`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        ) : (
          <span
            key={index}
            className="hidden md:flex items-center justify-center min-h-[44px] min-w-[44px] rounded-lg bg-muted text-muted-foreground shrink-0 text-sm font-medium"
            aria-hidden
          >
            {page}
          </span>
        )
      )}

      <button
        type="button"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${BUTTON_SIZE} ${inactiveClass} disabled:opacity-40 disabled:cursor-not-allowed active:scale-95`}
        aria-label="Próxima página"
      >
        <ChevronRight size={18} strokeWidth={2.5} />
      </button>
    </nav>
  );
}
