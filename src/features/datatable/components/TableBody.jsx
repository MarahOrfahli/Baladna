import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const TableBody = ({
  rows,
  columns,
  selectedRowIds,
  toggleSelectRow,
  hasBulkSelect,
  hasActions,
  onEdit,
  onDelete,
  loading,
  rowsPerPage
}) => {
  const checkingType = (value) => {
    if (typeof value === "string") return value;
    else if (typeof value === "boolean")
      return (
        <div className={`${value ? "text-emerald-500" : "text-basic-red"}`}>
          {value ? "Active" : "unactive"}
        </div>
      );
    else if (value == null) return <>—</>;
  };

  if (loading) {
    return (
      <tbody>
        {Array.from({ length: rowsPerPage }).map((_, idx) => (
          <tr key={idx} className="animate-pulse">
            {hasBulkSelect && (
              <td className="p-4">
                <div className="w-4 h-4 bg-slate-200 dark:bg-slate-700 rounded mx-auto"></div>
              </td>
            )}
            {columns.map((_, i) => (
              <td key={i} className="p-4">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-24"></div>
              </td>
            ))}
            {hasActions && (
              <td className="p-4">
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-16 ml-auto"></div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    );
  }

  if (rows.length === 0) {
    const colSpan =
      columns.length + (hasBulkSelect ? 1 : 0) + (hasActions ? 1 : 0);
    return (
      <tbody>
        <tr>
          <td colSpan={colSpan} className="text-center py-12">
            <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
              <i className="fa-solid fa-folder-open text-4xl mb-3"></i>
              <p className="text-base font-semibold text-slate-600 dark:text-slate-300">
                No records found
              </p>
              <p className="text-xs mt-1">
                Try adjusting your search query or filters
              </p>
            </div>
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
      {rows.map((row) => (
        <tr
          key={row.id}
          className={`border-b border-slate-100 dark:border-slate-800/80 hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors ${
            selectedRowIds.includes(row.id)
              ? "bg-indigo-50/40 dark:bg-indigo-950/20"
              : ""
          }`}
        >
          {hasBulkSelect && (
            <td className="px-4 py-3.5 text-center">
              <input
                type="checkbox"
                checked={selectedRowIds.includes(row.id)}
                onChange={() => toggleSelectRow(row.id)}
                className="w-4 h-4 text-indigo-600 bg-slate-100 border-slate-300 rounded focus:ring-indigo-500 cursor-pointer"
              />
            </td>
          )}
          {columns.map((col) => (
            <td
              key={col.key}
              className="px-4 py-3.5 text-sm text-slate-700 dark:text-slate-300"
            >
              {col.render ? col.render(row) : checkingType(row[col.key])}
            </td>
          ))}
          {hasActions && (
            <td className="px-4 py-3.5 text-right">
              <div className="flex items-center justify-end gap-2">
                {onEdit && (
                  <button
                    onClick={() => onEdit(row)}
                    className="px-2.5 py-1.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 rounded-lg transition-all text-xs font-semibold flex items-center gap-1.5 border border-indigo-200/50 dark:border-indigo-800/50"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(row)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-all"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                )}
              </div>
            </td>
          )}
        </tr>
      ))}
    </tbody>
  );
};
