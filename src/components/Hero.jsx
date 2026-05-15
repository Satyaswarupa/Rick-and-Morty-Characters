import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Atom, Zap, Globe, Sparkles } from 'lucide-react';

const Hero = () => {
  const scrollToCharacters = () => {
    document.getElementById('characters').scrollIntoView({ behavior: 'smooth' });
  };

  const floatingIcons = [
    { icon: Atom, color: 'text-purple-400', delay: 0, x: -180, y: -80 },
    { icon: Zap, color: 'text-cyan-400', delay: 0.5, x: 180, y: -60 },
    { icon: Globe, color: 'text-green-400', delay: 1, x: -120, y: 100 },
    { icon: Sparkles, color: 'text-amber-400', delay: 1.5, x: 150, y: 120 },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-green-500/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {floatingIcons.map(({ icon: Icon, color, delay, x, y }, i) => (
        <motion.div key={i} className={`absolute hidden lg:block ${color}`}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{ opacity: [0.3, 0.8, 0.3], x: [x, x + 20, x], y: [y, y - 20, y] }}
          transition={{ duration: 5, delay, repeat: Infinity, ease: "easeInOut" }}>
          <Icon className="w-8 h-8" />
        </motion.div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm text-gray-300">Rick and Morty API Explorer</span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-bold font-['Space_Grotesk'] mb-6">
          <span className="text-white">Explore the </span>
          <span className="gradient-text">Multiverse</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mx-auto text-lg text-gray-400 mb-12 leading-relaxed">
          Discover every character, location, and episode from the Rick and Morty universe. 
          Browse through 800+ characters with powerful search and filters.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={scrollToCharacters}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 via-cyan-500 to-green-500 text-white font-semibold flex items-center gap-2 shadow-lg shadow-purple-500/25">
            <Sparkles className="w-5 h-5" />
            Explore Characters
          </motion.button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {[{ value: '826+', label: 'Characters' }, { value: '126', label: 'Locations' }, { value: '51', label: 'Episodes' }, { value: '42', label: 'Pages' }].map((stat, i) => (
            <motion.div key={i} whileHover={{ y: -5 }} className="glass rounded-2xl p-4">
              <div className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.button onClick={scrollToCharacters} animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-gray-500 hover:text-white transition-colors">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ArrowDown className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;