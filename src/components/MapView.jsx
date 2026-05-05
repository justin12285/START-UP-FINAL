import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet's default icon path issues in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Create custom icons to match the UI
const createCustomIcon = (color) => {
  return new L.DivIcon({
    html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px ${color};"></div>`,
    className: 'custom-marker-icon',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

const originIcon = createCustomIcon('#3b82f6'); // primary blue
const destIcon = createCustomIcon('#10b981'); // secondary green

// Component to handle map centering when coordinates change
function MapController({ coordinates }) {
  const map = useMap();
  useEffect(() => {
    if (coordinates && coordinates.length > 0) {
      const bounds = L.latLngBounds(coordinates);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [coordinates, map]);
  return null;
}

export default function MapView({ coordinates }) {
  // Default to Butuan City center
  const defaultCenter = [8.9475, 125.5406];

  return (
    <div className="w-full h-full rounded-3xl overflow-hidden border border-gray-800 shadow-2xl relative">
      {/* Absolute badge to mock 'Live Map' */}
      <div className="absolute top-4 left-4 z-[1000] bg-gray-900/80 backdrop-blur-sm border border-gray-700 px-3 py-1.5 rounded-full flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
        <span className="text-xs font-semibold text-white tracking-wide">LIVE MAP</span>
      </div>

      <MapContainer 
        center={defaultCenter} 
        zoom={14} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" // Dark theme map
        />
        
        {coordinates && coordinates.length > 0 && (
          <>
            <Polyline 
              positions={coordinates} 
              color="#3b82f6" 
              weight={5} 
              opacity={0.8} 
              lineCap="round" 
              lineJoin="round" 
              dashArray="10, 10" 
              className="animate-[dash_20s_linear_infinite]"
            />
            <Marker position={coordinates[0]} icon={originIcon} />
            <Marker position={coordinates[coordinates.length - 1]} icon={destIcon} />
            <MapController coordinates={coordinates} />
          </>
        )}
      </MapContainer>
    </div>
  );
}
