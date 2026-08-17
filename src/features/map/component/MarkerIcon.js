import L from 'leaflet';
import { icon } from '@fortawesome/fontawesome-svg-core';
import {
  faLightbulb,
  faTrash,
  faDroplet,
  faRoad,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';

const iconMap = {
  lightbulb: faLightbulb,
  trash: faTrash,
  droplet: faDroplet,
  road: faRoad,
  'location-dot': faLocationDot,
};

export const createTypeIcon = (iconName, color, size = 30) => {
  const faIcon = iconMap[iconName] || faLocationDot;
  const svgHtml = icon(faIcon, {
    styles: { color: 'white', fontSize: `${size * 0.5}px` },
  }).html;

  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${color};
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        ${svgHtml}
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
};