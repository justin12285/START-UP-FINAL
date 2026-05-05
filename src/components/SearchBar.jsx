import React, { useState } from 'react';
import { MapPin, Navigation, Search } from 'lucide-react';
import { locationDictionary } from '../services/mockData';
import { motion } from 'framer-motion';

export default function SearchBar({ onSearch, popularSearches }) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const locations = Object.keys(locationDictionary);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (origin && destination) {
      onSearch(origin, destination);
    }
  };

  const handlePopularSearchClick = (popOrigin, popDest) => {
    setOrigin(popOrigin);
    setDestination(popDest);
    onSearch(popOrigin, popDest); // Automatically trigger search
  };

  return (
    <div className="w-full mx-auto space-y-6">
      <form onSubmit={handleSubmit} className="bg-surface rounded-[32px] p-4 shadow-2xl border border-gray-800/50 relative overflow-hidden">
        {/* Decorative gradient */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-blue-400 to-secondary"></div>
        
        <div className="space-y-4 relative mt-2">
          {/* Tracking Line */}
          <div className="absolute left-[22px] top-8 bottom-8 w-[2px] bg-gray-800 border-l-2 border-dashed border-gray-700 z-0"></div>
          
          <div className="relative z-10 flex items-center bg-gray-900/60 rounded-2xl p-2 border border-gray-800 focus-within:border-primary/50 transition-all">
            <div className="p-2 bg-gray-800 rounded-full mr-3 shrink-0">
              <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(59,130,246,0.6)]"></div>
            </div>
            <input
              type="text"
              list="locations"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="Current location"
              className="bg-transparent border-none w-full text-white placeholder-gray-500 focus:outline-none py-2 text-lg font-medium"
              required
            />
          </div>

          <div className="relative z-10 flex items-center bg-gray-900/60 rounded-2xl p-2 border border-gray-800 focus-within:border-secondary/50 transition-all">
            <div className="p-2 bg-gray-800 rounded-full mr-3 shrink-0">
              <MapPin className="w-5 h-5 text-secondary drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
            </div>
            <input
              type="text"
              list="locations"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Where are you headed?"
              className="bg-transparent border-none w-full text-white placeholder-gray-500 focus:outline-none py-2 text-lg font-medium"
              required
            />
          </div>
        </div>

        <datalist id="locations">
          {locations.map(loc => <option key={loc} value={loc} />)}
        </datalist>

        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full mt-5 bg-primary text-white font-bold py-4 rounded-2xl hover:bg-indigo-500 transition-all flex items-center justify-center gap-2 text-lg shadow-[0_4px_20px_rgba(79,70,229,0.4)]"
        >
          <Search className="w-6 h-6" />
          Find Route
        </motion.button>
      </form>

      {/* Popular Searches */}
      <div className="space-y-4 pt-2">
        <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider px-2">Popular</h3>
        <div className="flex flex-col gap-3">
          {popularSearches.map((search, index) => (
            <motion.button
              key={index}
              whileTap={{ scale: 0.98 }}
              onClick={() => handlePopularSearchClick(search.origin, search.destination)}
              className="bg-surface/60 backdrop-blur-md hover:bg-surface border border-gray-800 text-gray-200 text-left px-5 py-4 rounded-2xl transition-all flex items-center gap-4 group shadow-md"
            >
              <div className="bg-gray-800 p-2.5 rounded-full group-hover:bg-primary/20 transition-colors">
                <Navigation className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">{search.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{search.origin} → {search.destination}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
