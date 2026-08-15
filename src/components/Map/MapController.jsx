// MapController.jsx
import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap
} from "react-leaflet";
import L from "leaflet";
import useMapStore from "../../store/mapStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faLocation } from "@fortawesome/free-solid-svg-icons";
import Button from "../ui/Button";

// ------ مكونات Leaflet المساعدة (كما هي) ------
function MapViewUpdater({ position, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (position) map.flyTo(position, zoom, { duration: 1.5 });
  }, [position, zoom, map]);
  return null;
}

function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    }
  });
  return null;
}

// ------ إنشاء أيقونة مخصصة حسب نوع التقرير ------
const createTypeIcon = (color, iconHtml, size = 30) => {
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="
      background-color: ${color};
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: ${size * 0.6}px;
      line-height: 1;
      color: white;
      text-shadow: 0 1px 2px rgba(0,0,0,0.5);
    ">${iconHtml}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2]
  });
};

// ------ المكون الرئيسي ------
const LocationPicker = ({
  //   className = "",
  reportTypes = {
    lighting: { color: "#fbbf24", icon: "💡" },
    waste: { color: "#6b7280", icon: "🗑️" },
    water: { color: "#3b82f6", icon: "💧" },
    roads: { color: "#f97316", icon: "🛣️" },
    default: { color: "#9ca3af", icon: "📍" }
  },
  onReportClick = null,
  fetchParams = {}, // معاملات إضافية لجلب البلاغات (مثل التصفية)
  autoRefreshInterval = 300000 // 5 دقائق
}) => {
  // استيراد الحالة والإجراءات من الـ store
  const {
    selectedPosition,
    zoom,
    reports,
    isLoadingReports,
    searchQuery,
    isSearching,
    isLocating,
    setPosition,
    // fetchReports,
    searchLocation,
    setSearchQuery,
    locateUser,
    startAutoRefresh,
    stopAutoRefresh
    // cleanup
  } = useMapStore();

  // جلب البلاغات عند تحميل المكون أو تغير fetchParams
  useEffect(() => {
    // fetchReports(fetchParams);
    startAutoRefresh(autoRefreshInterval, fetchParams);
    return () => {
      stopAutoRefresh();
    };
  }, [fetchParams, autoRefreshInterval, startAutoRefresh, stopAutoRefresh]);

  // معالج النقر على الخريطة
  const handleMapClick = (lat, lng) => {
    setPosition(lat, lng);
  };

  // معالج البحث
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchLocation(searchQuery);
    }
  };

  // عرض البلاغات كـ Markers
  const renderReportMarkers = () => {
    return reports.map((report) => {
      const reportType = report.type || "default";
      const typeDef = reportTypes[reportType] ||
        reportTypes.default || { color: "#9ca3af", icon: "📍" };
      const icon = createTypeIcon(typeDef.color, typeDef.icon, 32);
      return (
        <Marker
          key={report.id}
          position={[report.lat, report.lng]}
          icon={icon}
          eventHandlers={{
            click: () => {
              if (onReportClick) onReportClick(report);
              setPosition(report.lat, report.lng);
            }
          }}
        >
          <Popup>
            <div className="text-right">
              <h3 className="font-bold text-base">{report.title || "بلاغ"}</h3>
              <p className="text-sm text-gray-600">
                {report.description || ""}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                النوع: {reportType}{" "}
                {report.status && `| الحالة: ${report.status}`}
              </p>
            </div>
          </Popup>
        </Marker>
      );
    });
  };

  return (
    <div className="bg-white p-2 rounded-2xl shadow-xl border border-slate-200">
      {/* شريط البحث وزر GPS */}
      <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-4">
        <form onSubmit={handleSearchSubmit} className="flex gap-1 w-full">
          <div className="bg-white p-2 rounded-2xl shadow-xl border border-slate-100 w-full flex flex-col sm:flex-row max-w-xl lg:mx-0">
            <div className="relative grow flex items-center p-1 text-slate-400 w-full gap-1">
              <FontAwesomeIcon icon={ faLocation }/>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="أدخل اسم المدينة، الشارع، أو الحي ..."
                className="w-full pl-4 pr-10 py-1 outline-none text-slate-800 placeholder-slate-400 bg-transparent"
                dir="auto"
              />
            </div>
            <Button
              elementIcon={<FontAwesomeIcon icon={faArrowLeft} />}
              type="submit"
              disabled={isSearching}
              className={`bg-secondary hover:bg-slate-800 text-white px-8 py-2 rounded-xl font-bold transition-colors sm:w-auto w-80 flex items-center justify-center gap-2 ${
                isSearching
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-emerald-600 text-white hover:bg-emerald-700"
              }`}
              content={`البحث بالخريطة`}
            />
            {/* <button 
            type="submit"
            disabled={isSearching}
            className={`bg-secondary hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-bold transition-colors sm:w-auto w-full flex items-center justify-center gap-2 ${
              isSearching
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-emerald-600 text-white hover:bg-emerald-700"
            }`}>
              البحث بالخريطة
              <FontAwesomeIcon icon={faArrowLeft}/>
            </button> */}
          </div>
          {/* <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن مدينة، شارع، معلم ..."
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
            dir="auto"
          /> */}
          {/* <button
            type="submit"
            disabled={isSearching}
            className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg ${
              isSearching
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-emerald-600 text-white hover:bg-emerald-700"
            }`}
          >
            {isSearching ? (
              <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
            ) : (
              "🔍 بحث"
            )}
          </button> */}
        </form>
        <Button
          fn={() => locateUser().catch(() => {})}
          disabled={isLocating}
          className={`flex items-center justify-center gap-2 px-5 py-4 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg whitespace-nowrap ${
            isLocating
              ? "bg-gray-400 text-gray-600 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
          content={
            isLocating ? (
              <>
                <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                جاري التحديد...
              </>
            ) : (
              <>
                <span><FontAwesomeIcon icon={faLocation} /></span> موقعي الحالي
              </>
            )
          }
        />
        {/* <button
          onClick={() => locateUser().catch(() => {})}
          disabled={isLocating}
          className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg whitespace-nowrap ${
            isLocating
              ? "bg-gray-400 text-gray-600 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}

          
        >
          
        </button> */}
      </div>

      {/* خريطة Leaflet */}
      <MapContainer
        center={selectedPosition}
        zoom={zoom}
        style={{ height: "450px", width: "100%" }}
        className="rounded-xl shadow-lg border border-gray-200"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <MapClickHandler onMapClick={handleMapClick} />
        <MapViewUpdater position={selectedPosition} zoom={zoom} />
        {renderReportMarkers()}
        {selectedPosition && (
          <Marker position={selectedPosition}>
            <Popup>الموقع المختار</Popup>
          </Marker>
        )}
      </MapContainer>

      <div className="p-4 flex items-center justify-between text-sm text-slate-500 bg-slate-50 mt-2 rounded-xl">
        <span>
          <i className="fa-solid fa-satellite-dish ml-1"></i> يتم التحديث كل 5
          دقائق
        </span>
        <span>
          {isLoadingReports
            ? "جاري التحميل..."
            : `${reports.length} بلاغ نشط في نطاقك`}
        </span>
      </div>
    </div>
  );
};

export default LocationPicker;
