import { useEffect } from "react";
import {useMapStore} from "../store/mapStore";
import SearchBar from "./SearchBar";
import GpsButton from "./GpsButton";
import MapContainer from "./MapContainer";
import StatusBar from "./StatusBar";

export const LocationPicker = ({
  reportTypes,
  onReportClick = null,
  fetchParams = {},
  autoRefreshInterval = 300000 // every 5 minutes
}) => {
  const {
    selectedPosition,
    zoom,
    reports,
    isLoadingReports,
    searchQuery,
    isSearching,
    isLocating,
    setPosition,
    searchLocation,
    setSearchQuery,
    locateUser,
    startAutoRefresh,
    stopAutoRefresh
  } = useMapStore();

  // بدء التحديث التلقائي عند التحميل
  useEffect(() => {
    startAutoRefresh(autoRefreshInterval, fetchParams);
    return () => {
      stopAutoRefresh();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchParams, autoRefreshInterval]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchLocation(searchQuery);
    }
  };

  const handleLocate = () => {
    locateUser().catch(() => {});
  };

  const handleMapClick = (lat, lng) => {
    setPosition(lat, lng);
  };

  return (
    <div className="bg-white p-2 rounded-2xl shadow-xl border border-slate-200">
      {/* شريط البحث وزر GPS */}
      <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-4">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearchSubmit={handleSearchSubmit}
          isSearching={isSearching}
        />
        <GpsButton onLocate={handleLocate} isLocating={isLocating} />
      </div>

      {/* الخريطة */}
      <MapContainer
        center={selectedPosition}
        zoom={zoom}
        onMapClick={handleMapClick}
        reports={reports}
        reportTypes={reportTypes}
        onReportClick={onReportClick}
        setPosition={setPosition}
        selectedPosition={selectedPosition}
      />

      {/* شريط الحالة */}
      <StatusBar isLoading={isLoadingReports} count={reports.length} />
    </div>
  );
};

