export const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  count = 1,
  title = 'Confirm Deletion',
  message,
  children,
  confirmLabel = 'Confirm Delete',
  cancelLabel = 'Cancel',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100 dark:border-slate-700 p-6 text-center">
        <div className="w-12 h-12 bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
          <i className="fa-solid fa-triangle-exclamation"></i>
        </div>
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">
          {title}
        </h3>
        {children || (
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            {message || `Are you sure you want to delete ${count > 1 ? `these ${count} selected records` : 'this record'}? This action cannot be undone.`}
          </p>
        )}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-medium transition-all"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-sm font-medium shadow-md shadow-rose-500/20 transition-all flex items-center gap-2"
          >
            <i className="fa-solid fa-trash-can"></i>
            <span>{confirmLabel}</span>
          </button>
        </div>
      </div>
    </div>
  );
};