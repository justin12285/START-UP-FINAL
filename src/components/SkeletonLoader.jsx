import React from 'react';
import { motion } from 'framer-motion';

export default function SkeletonLoader() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-6 w-full max-w-md mx-auto space-y-4"
    >
      <div className="flex justify-between items-center">
        <div className="h-6 w-1/3 bg-gray-700/50 rounded-lg animate-pulse"></div>
        <div className="h-6 w-1/4 bg-gray-700/50 rounded-lg animate-pulse"></div>
      </div>
      
      <div className="space-y-3">
        <div className="h-10 w-full bg-gray-700/50 rounded-xl animate-pulse"></div>
        <div className="h-10 w-full bg-gray-700/50 rounded-xl animate-pulse"></div>
        <div className="h-10 w-2/3 bg-gray-700/50 rounded-xl animate-pulse"></div>
      </div>
    </motion.div>
  );
}
