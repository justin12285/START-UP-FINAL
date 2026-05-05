import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const createCustomIcon = (color) => {
  return new L.DivIcon({
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 4px solid white; box-shadow: 0 0 15px ${color};"></div>`,
    className: 'custom-marker-icon',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

const originIcon = createCustomIcon('#3b82f6'); 
const destIcon = createCustomIcon('#10b981'); 

function MapController({ coordinates, origin, destination }) {
  const map = useMap();
  useEffect(() => {
    // If we have an OSRM polyline, bound to it
    if (coordinates && coordinates.length > 0) {
      const bounds = L.latLngBounds(coordinates);
      map.fitBounds(bounds, { padding: [40, 40], animate: true });
    } else if (origin && destination) {
      // Fallback if we only have the two markers
      const bounds = L.latLngBounds([origin, destination]);
      map.fitBounds(bounds, { padding: [60, 60], animate: true });
    } else if (origin) {
      map.setView(origin, 15, { animate: true });
    }
  }, [coordinates, origin, destination, map]);
  return null;
}

export default function MapView({ routeCoords, originPos, destPos }) {
  const defaultCenter = [8.9475, 125.5406];

  return (
    <div className="w-full h-full relative bg-gray-900">
      <div className="absolute top-6 right-6 z-[1000] bg-gray-900/90 backdrop-blur-md border border-gray-700 px-4 py-2 rounded-full flex items-center gap-2 shadow-xl">
        <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
        <span className="text-xs font-bold text-white tracking-widest uppercase">Live Map</span>
      </div>

      <MapContainer 
        center={defaultCenter} 
        zoom={14} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {routeCoords && routeCoords.length > 0 && (
          <Polyline 
            positions={routeCoords} 
            color="#4f46e5" 
            weight={8} 
            opacity={0.9} 
            lineCap="round" 
            lineJoin="round" 
            className="path-anim"
          />
        )}

        {originPos && <Marker position={originPos} icon={originIcon} />}
        {destPos && <Marker position={destPos} icon={destIcon} />}
        
        <MapController coordinates={routeCoords} origin={originPos} destination={destPos} />
      </MapContainer>
    </div>
  );
}
