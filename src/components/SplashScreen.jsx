import React from 'react';
import { motion } from 'framer-motion';
import { Map } from 'lucide-react';

export default function SplashScreen({ onComplete }) {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 2 }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center pointer-events-none"
    >
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="bg-primary p-4 rounded-[32px] shadow-[0_0_40px_rgba(79,70,229,0.5)] mb-6"
        >
          <Map className="w-16 h-16 text-white" />
        </motion.div>
        
        <h1 className="text-5xl font-black text-white tracking-tighter">transee</h1>
        <p className="text-primary mt-2 font-semibold tracking-widest text-sm uppercase">Butuan City</p>
      </motion.div>
    </motion.div>
  );
}
