// src/components/map/MapContainer.jsx
import { MapContainer as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import MapViewUpdater from './MapViewUpdater';
import MapClickHandler from './MapClickHandler';
import ReportMarkers from './ReportMarkers';
import 'leaflet/dist/leaflet.css';

const MapContainer = ({
  center,
  zoom,
  onMapClick,
  reports,
  reportTypes,
  onReportClick,
  setPosition,
  selectedPosition,
}) => {
  return (
    <LeafletMap
      center={center}
      zoom={zoom}
      style={{ height: '450px', width: '100%' }}
      className="rounded-xl shadow-lg border border-gray-200"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <MapClickHandler onMapClick={onMapClick} />
      <MapViewUpdater position={center} zoom={zoom} />
      <ReportMarkers
        reports={reports}
        reportTypes={reportTypes}
        onReportClick={onReportClick}
        setPosition={setPosition}
      />
      {selectedPosition && (
        <Marker position={selectedPosition}>
          <Popup>الموقع المختار</Popup>
        </Marker>
      )}
    </LeafletMap>
  );
};

export default MapContainer;