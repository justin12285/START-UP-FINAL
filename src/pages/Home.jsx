import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import RouteCard from '../components/RouteCard';
import FareCalculator from '../components/FareCalculator';
import Feedback from '../components/Feedback';
import { useRouteContext } from '../contexts/RouteContext';
import { getCoordinates, popularSearches } from '../services/mockData';
import { fetchOSRMRoute } from '../services/routing';
import { recordEarnings, findRoute } from '../services/firestore';
import { Map as MapIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { route, setRouteData } = useRouteContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (origin, destination) => {
    setLoading(true);
    setError('');
    
    try {
      const originPos = getCoordinates(origin);
      const destPos = getCoordinates(destination);

      if (!originPos || !destPos) {
        setError("Location not found in database. Please try a popular location.");
        setLoading(false);
        return;
      }

      // Profit Tracking
      await recordEarnings(2);

      // Fetch route info (type, landmarks)
      let foundRoute = await findRoute(origin, destination);
      
      if (!foundRoute) {
        foundRoute = {
          routeName: "General Route",
          transportType: "Tricycle", // fallback
          landmarks: [],
          origin,
          destination
        };
      }

      // Fetch OSRM Real Road Coordinates
      const coords = await fetchOSRMRoute(originPos, destPos);
      
      if (coords) {
        setRouteData(foundRoute, coords, [originPos.lat, originPos.lng], [destPos.lat, destPos.lng]);
        navigate('/map'); // Navigate to map instantly after searching like a ride hailing app
      } else {
        setError("Failed to fetch road geometry.");
      }

    } catch (err) {
      setError("An error occurred during search.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24 relative">
      {/* Decorative Dark Map Background */}
      <div className="absolute inset-0 bg-[url('https://cartodb-basemaps-a.global.ssl.fastly.net/dark_all/14/13601/7791.png')] opacity-20 bg-cover bg-center pointer-events-none"></div>
      
      <div className="relative z-10 max-w-md mx-auto px-4 pt-12 flex flex-col gap-6">
        <div className="flex flex-col items-center">
          <div className="bg-primary p-2.5 rounded-2xl mb-3 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            <MapIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-white mb-1">transee</h1>
          <p className="text-gray-400 text-sm font-medium">Find your multicab route in Butuan City</p>
        </div>

        <SearchBar onSearch={handleSearch} popularSearches={popularSearches} />

        {loading && (
          <div className="bg-surface/90 border border-gray-800 rounded-3xl p-6 flex justify-center items-center backdrop-blur-sm">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl text-center text-sm font-medium backdrop-blur-sm">
            {error}
          </div>
        )}

        {route && !loading && !error && (
          <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
            <RouteCard route={route} />
            <FareCalculator transportType={route.transportType} />
            <Feedback routeId={route.id || route.routeName} />
          </div>
        )}
      </div>
    </div>
  );
}
