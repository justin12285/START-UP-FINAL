import React from 'react';
import MapView from '../components/MapView';
import { useRouteContext } from '../contexts/RouteContext';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MapPage() {
  const { routeCoords, originPos, destPos } = useRouteContext();
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen relative pb-[60px]">
      <button 
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 z-[1000] bg-gray-900/90 backdrop-blur-md p-3 rounded-full text-white shadow-xl hover:bg-gray-800 transition-colors border border-gray-700"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      <MapView routeCoords={routeCoords} originPos={originPos} destPos={destPos} />
    </div>
  );
}
