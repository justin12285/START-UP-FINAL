import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import MapView from '../components/MapView';
import RouteCard from '../components/RouteCard';
import Feedback from '../components/Feedback';
import Announcements from '../components/Announcements';
import { findRoute } from '../services/firestore';
import { getMockRoute, popularSearches } from '../services/mockData';

export default function Home() {
  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (origin, destination) => {
    setLoading(true);
    setError('');
    setRoute(null);
    
    try {
      // 1. Try to find route in Firestore
      let foundRoute = await findRoute(origin, destination);
      
      // 2. Fallback to mock data if not found
      if (!foundRoute) {
        foundRoute = getMockRoute(origin, destination);
      }
      
      if (foundRoute) {
        setRoute(foundRoute);
      } else {
        setError("Sorry, we couldn't find a route for this journey.");
      }
    } catch (err) {
      setError("An error occurred while searching for the route.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-8">
        
        {/* Left Column - Controls & Info */}
        <div className="w-full lg:w-[400px] flex flex-col gap-6 shrink-0 z-10">
          <SearchBar onSearch={handleSearch} popularSearches={popularSearches} />
          
          {loading && (
            <div className="bg-surface border border-gray-800 rounded-3xl p-8 flex justify-center items-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-3xl text-center">
              {error}
            </div>
          )}

          {route && !loading && (
            <div className="space-y-6">
              <RouteCard route={route} />
              <Feedback routeId={route.id} />
            </div>
          )}
          
          <div className="mt-auto pt-6">
            <Announcements />
          </div>
        </div>

        {/* Right Column - Map */}
        <div className="w-full flex-1 h-[500px] lg:h-[calc(100vh-8rem)] min-h-[400px] sticky top-24 z-0">
          <MapView coordinates={route?.coordinates} />
        </div>
        
      </main>
    </div>
  );
}
