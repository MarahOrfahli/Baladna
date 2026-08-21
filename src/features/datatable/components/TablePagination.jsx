import React from 'react';

export const TablePagination = ({
  currentPage,
  totalPages,
  rowsPerPage,
  setRowsPerPage,
  setCurrentPage,
  totalEntries,
  startIndex,
  endIndex,
}) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter((page) => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1)
    .map((page, index, array) => {
      const showEllipsis = index > 0 && page - array[index - 1] > 1;
      return (
        <React.Fragment key={page}>
          {showEllipsis && <span className="px-1 text-slate-400 text-xs">...</span>}
          <button
            onClick={() => setCurrentPage(page)}
            className={`w-8 h-8 rounded-xl text-xs font-semibold transition-all ${
              currentPage === page
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            {page}
          </button>
        </React.Fragment>
      );
    });

  return (
    <div className="px-6 py-4 bg-white dark:bg-slate-800 border-t border-slate-200/80 dark:border-slate-700/60 rounded-b-2xl flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
            className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div>
          Showing <span className="font-semibold text-slate-700 dark:text-slate-200">{startIndex + 1}</span> to{' '}
          <span className="font-semibold text-slate-700 dark:text-slate-200">{endIndex}</span> of{' '}
          <span className="font-semibold text-slate-700 dark:text-slate-200">{totalEntries}</span> entries
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 px-3 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-xs font-medium flex items-center gap-1"
        >
          <i className="fa-solid fa-chevron-left text-[10px]"></i>
          <span>Prev</span>
        </button>
        <div className="flex items-center gap-1 px-1">{pageNumbers}</div>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage >= totalPages || totalPages === 0}
          className="p-2 px-3 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-xs font-medium flex items-center gap-1"
        >
          <span>Next</span>
          <i className="fa-solid fa-chevron-right text-[10px]"></i>
        </button>
      </div>
    </div>
  );
};