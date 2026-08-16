import LocationPicker from "../../../../components/Map/MapController";
import useMapStore from "../../../../store/mapStore";
import { forwardRef } from "react";


const DiscoverReports = forwardRef(({className, reportTypes, onReportClick = null, fetchParams = {}}, ref) => {
  const {
    selectedPosition,
    isLoadingReports,
    reportsError,
    locationDetails,
    isLoadingAddress,
    addressError,
    searchError,
    gpsError,
    lastUpdated,
    // fetchReports,
    zoomIn,
    // cleanup
  } = useMapStore()
   // تنسيق وقت آخر تحديث
  const formatLastUpdated = (isoString) => {
    if (!isoString) return "لم يتم التحديث بعد";
    const date = new Date(isoString);
    return date.toLocaleTimeString("en", {
      //"ar-SA"
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  };

  return ( 
    <div ref={ref} className={`w-full max-w-6xl mx-auto py-25 ${className}`}>
      <div className="flex flex-col lg:flex-row items-stretch gap-8">
        {/* ---- القسم الوصفي (يسار) ---- */}
        <div className="w-full lg:w-1/3 space-y-6">
          <h2 className="text-3xl font-bold text-secondary">
            شاهد مدينتك وهي تتحسن
          </h2>
          <p className="text-slate-600">
            تعرض هذه الخريطة الحية البلاغات الحديثة في منطقتك. يمكنك استكشاف
            المشاكل المحيطة بك، دعمها بصوتك، أو متابعة حالتها.
          </p>

          {/* أساطير الأنواع */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            {Object.entries(reportTypes).map(([key, def]) => {
              if (key === "default") return null;
              const labelMap = {
                lighting: "إنارة",
                waste: "مخلفات",
                water: "مياه صحية",
                roads: "طرق"
              };
              return (
                <div key={key} className="flex items-center gap-3">
                  <span
                    className="w-4 h-4 rounded-full shadow-sm"
                    style={{ backgroundColor: def.color }}
                  ></span>
                  <span className="text-slate-700 font-medium">
                    {labelMap[key] || key}
                  </span>
                </div>
              );
            })}
          </div>

          <button
            onClick={zoomIn}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 mt-4"
          >
            <i className="fa-solid fa-expand"></i> تكبير الخريطة
          </button>

          {/* عرض الإحداثيات والتفاصيل */}
          <div className="mt-4 text-sm bg-gray-50 p-3 rounded-lg border border-gray-200">
            <div className="font-medium">الإحداثيات:</div>
            <div dir="ltr" className="font-mono">
              {selectedPosition[0].toFixed(6)}, {selectedPosition[1].toFixed(6)}
            </div>
            {isLoadingAddress && (
              <div className="mt-1 text-gray-500">جاري تحميل المنطقة...</div>
            )}
            {locationDetails && (
              <div className="mt-2 text-green-700 bg-green-50 p-2 rounded">
                <span className="font-medium">📍 المنطقة:</span>{" "}
                {locationDetails}
              </div>
            )}
            {addressError && (
              <div className="mt-2 text-red-600">⚠️ {addressError}</div>
            )}
            {gpsError && <div className="mt-2 text-red-600">⚠️ {gpsError}</div>}
            {searchError && (
              <div className="mt-2 text-red-600">⚠️ {searchError}</div>
            )}
            {reportsError && (
              <div className="mt-2 text-red-600">⚠️ {reportsError}</div>
            )}
          </div>

          {/* عرض وقت آخر تحديث */}
          <div className="text-xs text-slate-400 text-center border-t pt-2 mt-2">
            <i className="fa-solid fa-clock ml-1"></i>
            آخر تحديث:{" "}
            {isLoadingReports
              ? "جاري التحديث..."
              : formatLastUpdated(lastUpdated)}
          </div>
        </div>

        {/* ---- القسم الأيمن: الخريطة والأدوات ---- */}
        <div className="w-full lg:w-2/3">
          <LocationPicker onReportClick={onReportClick} fetchParams={fetchParams}/>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center">
        📌 انقر على الخريطة، استخدم GPS، أو ابحث عن أي مكان للانتقال إليه وعرض
        بياناته. انقر على علامة بلاغ لمعرفة التفاصيل.
      </p>
    </div>
   );
})
 
export default DiscoverReports;