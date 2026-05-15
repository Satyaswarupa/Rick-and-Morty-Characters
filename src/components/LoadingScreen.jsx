import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-[#0a0a0f] flex flex-col items-center justify-center"
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="relative">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border-2 border-transparent"
            style={{
              borderTopColor: i === 0 ? '#a855f7' : i === 1 ? '#06b6d4' : '#22c55e',
              width: 80 + i * 40,
              height: 80 + i * 40,
              marginLeft: -(40 + i * 20),
              marginTop: -(40 + i * 20),
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2 + i * 0.5, repeat: Infinity, ease: "linear" }}
          />
        ))}
        <motion.div
          className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-cyan-500 to-green-500 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
        >
          <span className="text-white font-bold text-xl font-['Space_Grotesk']">R&M</span>
        </motion.div>
      </div>
      <motion.h2
        className="mt-12 text-2xl font-bold font-['Space_Grotesk'] gradient-text"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Rick & Morty Explorer
      </motion.h2>
      <motion.p className="mt-2 text-sm text-gray-400" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
        Loading the multiverse...
      </motion.p>
      <div className="mt-8 w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
        <motion.div className="h-full bg-gradient-to-r from-purple-500 via-cyan-500 to-green-500" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2, ease: "easeInOut" }} />
      </div>
    </motion.div>
  );
};

export default LoadingScreen;