// src/components/map/ReportMarkers.jsx
import { Marker, Popup } from "react-leaflet";
import { createTypeIcon } from "./MarkerIcon";

const ReportMarkers = ({
  reports,
  reportTypes,
  onReportClick,
  setPosition
}) => {
  return reports.map((report) => {
    const reportType = report.type || "default";
    const typeDef = reportTypes[reportType] || reportTypes.default;
    const icon = createTypeIcon(typeDef.icon, typeDef.color, 32);

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
            <p className="text-sm text-gray-600">{report.description || ""}</p>
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

export default ReportMarkers;
