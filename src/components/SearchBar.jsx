import React, { useState } from 'react';
import { MapPin, Navigation, Search } from 'lucide-react';

export default function SearchBar({ onSearch, popularSearches }) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (origin && destination) {
      onSearch(origin, destination);
    }
  };

  const handlePopularSearchClick = (popOrigin, popDest) => {
    setOrigin(popOrigin);
    setDestination(popDest);
    onSearch(popOrigin, popDest);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <form onSubmit={handleSubmit} className="bg-surface rounded-3xl p-4 shadow-xl border border-gray-800/50 relative overflow-hidden">
        {/* Decorative gradient */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
        
        <div className="space-y-3 relative">
          {/* Tracking Line */}
          <div className="absolute left-[19px] top-6 bottom-6 w-0.5 bg-gray-800 border-l border-dashed border-gray-700 z-0"></div>
          
          <div className="relative z-10 flex items-center bg-gray-900/50 rounded-2xl p-1 border border-transparent focus-within:border-primary/50 focus-within:bg-gray-900 transition-all">
            <div className="p-2 bg-gray-800 rounded-xl mr-3">
              <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
            </div>
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="Current location"
              className="bg-transparent border-none w-full text-white placeholder-gray-500 focus:outline-none py-2 text-lg"
              required
            />
          </div>

          <div className="relative z-10 flex items-center bg-gray-900/50 rounded-2xl p-1 border border-transparent focus-within:border-secondary/50 focus-within:bg-gray-900 transition-all">
            <div className="p-2 bg-gray-800 rounded-xl mr-3">
              <MapPin className="w-4 h-4 text-secondary drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
            </div>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Where are you headed?"
              className="bg-transparent border-none w-full text-white placeholder-gray-500 focus:outline-none py-2 text-lg"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-white text-black font-semibold py-4 rounded-2xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2 text-lg active:scale-[0.98]"
        >
          <Search className="w-5 h-5" />
          Find Route
        </button>
      </form>

      {/* Popular Searches */}
      <div className="space-y-3">
        <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider px-2">Popular routes</h3>
        <div className="flex flex-wrap gap-2">
          {popularSearches.map((search, index) => (
            <button
              key={index}
              onClick={() => handlePopularSearchClick(search.origin, search.destination)}
              className="bg-surface/60 hover:bg-surface border border-gray-800 hover:border-gray-600 text-gray-300 text-sm px-4 py-2.5 rounded-xl transition-all flex items-center gap-2"
            >
              <Navigation className="w-3.5 h-3.5 text-primary" />
              <span>{search.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
