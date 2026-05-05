import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation2, ChevronUp, ChevronDown, Clock, MapPin } from 'lucide-react';

export default function NavigationSheet({ navigationData }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!navigationData) return null;

  return (
    <motion.div 
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="absolute bottom-0 w-full bg-surface/95 backdrop-blur-xl border-t border-gray-800 rounded-t-3xl z-[2000] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] overflow-hidden"
    >
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full pt-3 pb-5 px-6 flex flex-col items-center cursor-pointer"
      >
        <div className="w-12 h-1.5 bg-gray-600 rounded-full mb-4"></div>
        
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-3xl font-black text-white flex items-baseline gap-1">
              {navigationData.duration} <span className="text-lg font-semibold text-gray-400">min</span>
            </span>
            <span className="text-sm font-medium text-gray-500 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> {navigationData.distance} km • Fastest route
            </span>
          </div>
          
          <motion.button 
            whileTap={{ scale: 0.9 }}
            className="bg-primary hover:bg-indigo-500 text-white p-4 rounded-full shadow-[0_0_20px_rgba(79,70,229,0.5)] transition-colors flex items-center gap-2"
            onClick={(e) => {
              e.stopPropagation();
              // In a real app, this would trigger native navigation or turn-by-turn mode
              alert("Starting simple navigation mode!");
            }}
          >
            <Navigation2 className="w-6 h-6 fill-current" />
            <span className="font-bold pr-2">Start</span>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-6 pb-6 overflow-y-auto max-h-[40vh]"
          >
            <div className="border-t border-gray-800 pt-4 mt-2 space-y-4">
              {navigationData.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="flex flex-col items-center mt-1">
                    <div className="w-3 h-3 rounded-full bg-primary ring-4 ring-primary/20"></div>
                    {idx !== navigationData.steps.length - 1 && (
                      <div className="w-0.5 h-full min-h-[30px] bg-gray-800 my-1"></div>
                    )}
                  </div>
                  <div className="flex flex-col pb-2">
                    <span className="text-white font-medium">{step.instruction}</span>
                    <span className="text-gray-500 text-xs mt-0.5">{step.distance} km</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
