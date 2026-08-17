// src/components/map/MapClickHandler.jsx
import { useMapEvents } from 'react-leaflet';

const MapClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

export default MapClickHandler;