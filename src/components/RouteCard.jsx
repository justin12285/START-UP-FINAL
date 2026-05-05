import React from 'react';
import { Bus, Car, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function RouteCard({ route }) {
  if (!route) return null;

  const getTransportIcon = (type) => {
    switch(type?.toLowerCase()) {
      case 'multicab': return <Bus className="w-5 h-5" />;
      case 'jeepney': return <Bus className="w-5 h-5" />;
      case 'tricycle': return <Car className="w-5 h-5" />;
      default: return <Car className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-surface border border-gray-800 rounded-3xl p-5 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">{route.routeName}</h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-gray-400 capitalize bg-gray-800 px-2.5 py-0.5 rounded-md text-sm font-medium flex items-center gap-1.5">
              {getTransportIcon(route.transportType)}
              {route.transportType}
            </span>
          </div>
        </div>
        <div className="bg-green-500/10 p-2 rounded-full border border-green-500/20">
          <CheckCircle2 className="w-6 h-6 text-green-500" />
        </div>
      </div>

      <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:to-secondary">
        <div className="relative flex items-center gap-4">
          <div className="h-4 w-4 rounded-full bg-primary ring-4 ring-gray-900 z-10 shrink-0"></div>
          <div className="bg-gray-800/50 p-3 rounded-2xl border border-gray-700/50 w-full">
            <p className="text-sm text-gray-400 font-medium">Origin</p>
            <p className="text-white font-semibold">{route.origin}</p>
          </div>
        </div>
        
        <div className="relative flex items-center gap-4">
          <div className="h-4 w-4 rounded-full bg-secondary ring-4 ring-gray-900 z-10 shrink-0"></div>
          <div className="bg-gray-800/50 p-3 rounded-2xl border border-gray-700/50 w-full">
            <p className="text-sm text-gray-400 font-medium">Destination</p>
            <p className="text-white font-semibold">{route.destination}</p>
          </div>
        </div>
      </div>

      {route.landmarks && route.landmarks.length > 0 && (
        <div className="mt-5 pt-5 border-t border-gray-800">
          <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-2">Key Landmarks</p>
          <div className="flex flex-wrap gap-2">
            {route.landmarks.map((landmark, i) => (
              <span key={i} className="text-xs text-gray-300 bg-gray-900 px-3 py-1.5 rounded-lg border border-gray-800">
                {landmark}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
