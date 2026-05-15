import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Heart, Skull, HelpCircle, MapPin, Globe, Tv, Calendar, User, Dna, Star } from 'lucide-react';

const statusConfig = {
  Alive: { icon: Heart, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20', gradient: 'from-green-500 to-emerald-500' },
  Dead: { icon: Skull, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', gradient: 'from-red-500 to-orange-500' },
  unknown: { icon: HelpCircle, color: 'text-gray-400', bg: 'bg-gray-500/10', border: 'border-gray-500/20', gradient: 'from-gray-500 to-slate-500' },
};

const Sidebar = ({ character, onClose }) => {
  const status = statusConfig[character.status] || statusConfig.unknown;
  const StatusIcon = status.icon;

  useEffect(() => {
    const handleEscape = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const infoItems = [
    { icon: User, label: 'Name', value: character.name },
    { icon: Dna, label: 'Species', value: character.species },
    { icon: User, label: 'Gender', value: character.gender },
    { icon: Globe, label: 'Origin', value: character.origin?.name || 'Unknown' },
    { icon: MapPin, label: 'Location', value: character.location?.name || 'Unknown' },
    { icon: Tv, label: 'Episodes', value: `${character.episode?.length || 0} episodes` },
    { icon: Calendar, label: 'Created', value: new Date(character.created).toLocaleDateString() },
  ];

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 right-0 bottom-0 z-[100] w-full max-w-md glass-strong border-l border-white/10 overflow-y-auto"
      >
        {/* Featured Banner */}
        <div className={`relative h-48 bg-gradient-to-br ${status.gradient} flex items-end p-6`}>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30" />

          {/* Close Button */}
          <button onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors">
            <X className="w-5 h-5" />
          </button>

          {/* Featured Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm">
            <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
            <span className="text-sm font-semibold text-white">Featured Character</span>
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white font-['Space_Grotesk']">{character.name}</h2>
          </div>
        </div>

        {/* Character Image */}
        <div className="px-6 -mt-16 relative z-10">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-[#0a0a0f] shadow-2xl"
          >
            <img src={character.image} alt={character.name} className="w-full h-full object-cover" />
          </motion.div>
        </div>

        {/* Status Badge */}
        <div className="px-6 mt-4">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${status.bg} ${status.border} border`}>
            <StatusIcon className={`w-5 h-5 ${status.color}`} />
            <span className={`font-semibold ${status.color}`}>{character.status}</span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="px-6 mt-6 space-y-3">
          {infoItems.map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i + 0.3 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">{item.label}</div>
                <div className="text-sm font-semibold text-white">{item.value}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Type */}
        {character.type && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mx-6 mt-4 p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20"
          >
            <div className="text-xs text-cyan-400 uppercase tracking-wider mb-1">Type</div>
            <div className="text-white font-semibold">{character.type}</div>
          </motion.div>
        )}

        {/* Episode List Preview */}
        <div className="px-6 mt-6 pb-8">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Episodes Appeared In</h3>
          <div className="flex flex-wrap gap-2">
            {character.episode?.slice(0, 12).map((ep, i) => {
              const epNum = ep.split('/').pop();
              return (
                <motion.span 
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.05 * i + 0.5 }}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-300 font-medium"
                >
                  EP {epNum}
                </motion.span>
              );
            })}
            {character.episode?.length > 12 && (
              <span className="px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-xs text-purple-400 font-medium">
                +{character.episode.length - 12} more
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;