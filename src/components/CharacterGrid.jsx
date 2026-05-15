import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, Loader2, AlertCircle, Frown } from 'lucide-react';
import { useCharacters } from '../hooks/useCharacters';
import CharacterCard from './CharacterCard';

const CharacterGrid = ({ page, setPage, filters, onCharacterClick, onSidebarCharacter }) => {
  const { data, loading, error } = useCharacters(page, filters);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const characters = data?.results || [];
  const info = data?.info || {};

  if (loading) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center gap-4">
          <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
          <p className="text-gray-400">Loading characters from the multiverse...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
          <h3 className="text-xl font-bold text-white">Oops! Something went wrong</h3>
          <p className="text-gray-400">{error}</p>
        </div>
      </section>
    );
  }

  if (characters.length === 0) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center">
            <Frown className="w-8 h-8 text-amber-400" />
          </div>
          <h3 className="text-xl font-bold text-white">No characters found</h3>
          <p className="text-gray-400">Try adjusting your search or filters</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Results count */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={inView ? { opacity: 1 } : {}} 
          className="flex items-center justify-between mb-8"
        >
          <p className="text-gray-400">
            Showing <span className="text-white font-semibold">{characters.length}</span> of <span className="text-white font-semibold">{info.count || 0}</span> characters
          </p>
          <p className="text-sm text-gray-500">Page {page} of {info.pages || 1}</p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {characters.map((character, i) => (
              <CharacterCard 
                key={`${character.id}-${page}`} 
                character={character} 
                index={i} 
                onClick={() => onCharacterClick(character)}
                onViewDetails={onSidebarCharacter}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {info.pages > 1 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={inView ? { opacity: 1 } : {}} 
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-4 mt-12"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              onClick={() => setPage(p => Math.max(1, p - 1))} 
              disabled={!info.prev}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </motion.button>

            <div className="flex gap-2">
              {Array.from({ length: Math.min(5, info.pages || 1) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <button 
                    key={pageNum} 
                    onClick={() => setPage(pageNum)}
                    className={`w-10 h-10 rounded-xl font-medium transition-all ${
                      page === pageNum 
                        ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg' 
                        : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              onClick={() => setPage(p => p + 1)} 
              disabled={!info.next}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CharacterGrid;