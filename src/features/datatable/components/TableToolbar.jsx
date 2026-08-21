export const TableToolbar = ({
  searchQuery,
  setSearchQuery,
  filterValues,
  setFilterValue,
  resetFilters,
  filters,
  searchKeys,
  searchPlaceholder,
  selectedCount,
  onBulkDelete,
  onAdd,
  addLabel,
}) => {
  const hasActiveFilters = searchQuery || Object.values(filterValues).some(v => v !== 'ALL');

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200/80 dark:border-slate-700/60 mb-6 transition-all">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: Search & Filters */}
        <div className="flex flex-wrap items-center gap-3 flex-1">
          {searchKeys.length > 0 && (
            <div className="relative min-w-65 flex-1 sm:flex-initial">
              <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full pl-10 pr-9 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}
            </div>
          )}

          {filters.map((filter) => (
            <div key={filter.key} className="relative min-w-35">
              <select
                value={filterValues[filter.key] || 'ALL'}
                onChange={(e) => setFilterValue(filter.key, e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 cursor-pointer transition-all"
              >
                <option value="ALL">{filter.label}</option>
                {filter.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          ))}

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-all flex items-center gap-1.5"
            >
              <i className="fa-solid fa-rotate-right"></i> Reset
            </button>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {selectedCount > 0 && onBulkDelete && (
            <button
              onClick={() => onBulkDelete(selectedCount)}
              className="px-4 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-sm font-medium shadow-sm transition-all flex items-center gap-2 animate-fade-in"
            >
              <i className="fa-solid fa-trash-can"></i>
              <span>Delete ({selectedCount})</span>
            </button>
          )}
          {onAdd && (
            <button
              onClick={onAdd}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-medium rounded-xl text-sm shadow-md shadow-indigo-500/20 transition-all flex items-center gap-2"
            >
              <i className="fa-solid fa-plus"></i>
              <span>{addLabel}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};