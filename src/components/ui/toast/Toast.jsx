export const Toast = ({ toast, onClose }) => {
  if (!toast.show) return null;

  const bgColors = {
    success: 'bg-emerald-600 text-white',
    error: 'bg-rose-600 text-white',
    info: 'bg-indigo-600 text-white'
  };

  const icons = {
    success: 'fa-circle-check',
    error: 'fa-circle-exclamation',
    info: 'fa-circle-info'
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl transition-all duration-300 animate-slide-up">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg ${bgColors[toast.type] || bgColors.info}`}>
        <i className={`fa-solid ${icons[toast.type]} text-lg`}></i>
        <span className="text-sm font-medium">{toast.message}</span>
        <button onClick={onClose} className="ml-2 hover:opacity-80 transition-opacity">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  );
};