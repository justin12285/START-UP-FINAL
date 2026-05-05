import React, { useState } from 'react';
import { Tag, Receipt } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FareCalculator({ transportType }) {
  const [passengerType, setPassengerType] = useState('Regular');

  if (!transportType) return null;

  // Base Fares
  const baseFares = {
    'multicab': 12,
    'jeepney': 13,
    'tricycle': 15
  };

  const getBaseFare = (type) => {
    return baseFares[type?.toLowerCase()] || 15;
  };

  const baseFare = getBaseFare(transportType);
  const discount = (passengerType !== 'Regular') ? 0.20 : 0;
  const estimatedFare = Math.max(10, Math.round(baseFare - (baseFare * discount)));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface border border-gray-800 rounded-3xl p-5 shadow-xl mt-4"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-semibold flex items-center gap-2">
          <Receipt className="w-5 h-5 text-primary" />
          Fare Estimate
        </h3>
        <span className="text-2xl font-bold text-green-400">₱{estimatedFare}</span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Tag className="w-4 h-4 text-gray-400" />
          <label className="text-sm text-gray-300">Passenger Type</label>
        </div>
        <select 
          value={passengerType}
          onChange={(e) => setPassengerType(e.target.value)}
          className="w-full bg-gray-900 border border-gray-700 text-white text-sm rounded-xl focus:ring-primary focus:border-primary block p-3"
        >
          <option value="Regular">Regular</option>
          <option value="Student">Student (20% off)</option>
          <option value="Senior">Senior Citizen (20% off)</option>
          <option value="PWD">PWD (20% off)</option>
        </select>
      </div>
    </motion.div>
  );
}
