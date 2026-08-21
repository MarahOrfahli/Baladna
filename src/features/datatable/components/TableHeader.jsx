export const TableHeader = ({
  columns,
  sortColumn,
  sortDirection,
  onSort,
  hasBulkSelect,
  isAllSelected,
  onSelectAll,
  hasActions,
}) => {
  return (
    <thead className="bg-slate-50/80 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider select-none">
      <tr>
        {hasBulkSelect && (
          <th className="px-4 py-3.5 w-10 text-center">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={onSelectAll}
              className="w-4 h-4 text-indigo-600 bg-slate-100 border-slate-300 rounded focus:ring-indigo-500 cursor-pointer"
            />
          </th>
        )}
        {columns.map((col) => (
          <th
            key={col.key}
            onClick={() => col.sortable && onSort(col.key)}
            className={`px-4 py-3.5 text-left ${
              col.sortable ? 'cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors' : ''
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span>{col.label}</span>
              {col.sortable && (
                <span className="text-slate-400 flex flex-col text-[10px]">
                  {sortColumn === col.key ? (
                    sortDirection === 'asc' ? (
                      <i className="fa-solid fa-arrow-up-wide-short text-indigo-600 font-bold"></i>
                    ) : (
                      <i className="fa-solid fa-arrow-down-wide-short text-indigo-600 font-bold"></i>
                    )
                  ) : (
                    <i className="fa-solid fa-sort text-slate-300 dark:text-slate-600 opacity-60"></i>
                  )}
                </span>
              )}
            </div>
          </th>
        ))}
        {hasActions && <th className="px-4 py-3.5 text-right">Actions</th>}
      </tr>
    </thead>
  );
};