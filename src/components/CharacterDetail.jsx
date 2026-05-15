import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Heart, Skull, HelpCircle, MapPin, Globe, Tv, Calendar, User, Dna } from 'lucide-react';

const statusConfig = {
  Alive: { icon: Heart, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
  Dead: { icon: Skull, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
  unknown: { icon: HelpCircle, color: 'text-gray-400', bg: 'bg-gray-500/10', border: 'border-gray-500/20' },
};

const CharacterDetail = ({ character, onClose }) => {
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-strong rounded-3xl border border-white/10"
      >
        {/* Close Button */}
        <button onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
          <X className="w-5 h-5" />
        </button>

        {/* Header Image */}
        <div className="relative h-64 sm:h-80 overflow-hidden rounded-t-3xl">
          <img src={character.image} alt={character.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/50 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${status.bg} ${status.border} border mb-3`}>
              <StatusIcon className={`w-4 h-4 ${status.color}`} />
              <span className={`text-sm font-semibold ${status.color}`}>{character.status}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Space_Grotesk']">{character.name}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {infoItems.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-xs text-gray-500">{item.label}</div>
                  <div className="text-sm font-medium text-white">{item.value}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Type */}
          {character.type && (
            <div className="mb-6 p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
              <div className="text-xs text-cyan-400 mb-1">Type</div>
              <div className="text-white font-medium">{character.type}</div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CharacterDetail;