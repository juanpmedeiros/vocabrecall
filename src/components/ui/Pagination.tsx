import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useVocabRecall } from '@/hooks/useVocabRecall';

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

  return (
    <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center min-h-[44px] min-w-[44px] rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Mobile: only current page label */}
      <span className="flex md:hidden items-center justify-center min-h-[44px] px-3 text-sm font-medium text-gray-700">
        Página {currentPage} de {totalPages}
      </span>

      {/* Tablet/Desktop: full page numbers */}
      {getPageNumbers().map((page, index) =>
        typeof page === 'number' ? (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className="hidden md:flex items-center justify-center min-h-[44px] w-9 rounded-lg font-medium text-sm transition-all shrink-0 ${
              currentPage === page
                ? 'bg-primary text-white shadow-md'
                : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
            }"
          >
            {page}
          </button>
        ) : (
          <span key={index} className="hidden md:flex items-center justify-center w-9 min-h-[44px] text-gray-400 shrink-0">
            {page}
          </span>
        )
      )}

      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center min-h-[44px] min-w-[44px] rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
