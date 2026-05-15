import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Skull, HelpCircle, MapPin, Tv, Eye } from 'lucide-react';

const statusConfig = {
  Alive: { icon: Heart, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20', label: 'Alive' },
  Dead: { icon: Skull, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', label: 'Dead' },
  unknown: { icon: HelpCircle, color: 'text-gray-400', bg: 'bg-gray-500/10', border: 'border-gray-500/20', label: 'Unknown' },
};

const CharacterCard = ({ character, index, onClick, onViewDetails }) => {
  const status = statusConfig[character.status] || statusConfig.unknown;
  const StatusIcon = status.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group cursor-pointer glass rounded-2xl overflow-hidden border border-white/5 hover:border-purple-500/30 transition-all duration-500"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden" onClick={onClick}>
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />

        {/* Status Badge */}
        <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full ${status.bg} ${status.border} border`}>
          <StatusIcon className={`w-3.5 h-3.5 ${status.color}`} />
          <span className={`text-xs font-semibold ${status.color}`}>{status.label}</span>
        </div>

        {/* Episode Count */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm">
          <Tv className="w-3 h-3 text-purple-400" />
          <span className="text-xs text-white font-medium">{character.episode?.length || 0}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors truncate">
          {character.name}
        </h3>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Species:</span>
            <span className="text-gray-300">{character.species}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Gender:</span>
            <span className="text-gray-300">{character.gender}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-gray-300 truncate">{character.location?.name || 'Unknown'}</span>
          </div>
        </div>

        {/* View Details Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => { e.stopPropagation(); onViewDetails(character); }}
          className="mt-4 w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/20 text-purple-400 text-sm font-medium flex items-center justify-center gap-2 hover:bg-purple-500/30 hover:border-purple-500/40 transition-all"
        >
          <Eye className="w-4 h-4" />
          View Details
        </motion.button>

        {/* Hover glow */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: 'inset 0 0 30px rgba(168, 85, 247, 0.1)' }} />
      </div>
    </motion.div>
  );
};

export default CharacterCard;