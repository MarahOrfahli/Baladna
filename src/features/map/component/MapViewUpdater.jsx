// src/components/map/MapViewUpdater.jsx
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const MapViewUpdater = ({ position, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, zoom, { duration: 1.5 });
    }
  }, [position, zoom, map]);
  return null;
};

export default MapViewUpdater;