// src/components/map/StatusBar.jsx
const StatusBar = ({ isLoading, count }) => {
  return (
    <div className="p-4 flex items-center justify-between text-sm text-slate-500 bg-slate-50 mt-2 rounded-xl">
      <span>
        <i className="fa-solid fa-satellite-dish ml-1"></i> يتم التحديث كل 5 دقائق
      </span>
      <span>
        {isLoading
          ? 'جاري التحميل...'
          : `${count} بلاغ نشط في نطاقك`}
      </span>
    </div>
  );
};

export default StatusBar;