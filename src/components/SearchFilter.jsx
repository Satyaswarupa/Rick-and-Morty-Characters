import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';

const SearchFilter = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState('');
  const [gender, setGender] = useState('');
  const [species, setSpecies] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const filters = {};
    if (searchTerm.trim()) filters.name = searchTerm.trim();
    if (status) filters.status = status;
    if (gender) filters.gender = gender;
    if (species) filters.species = species;
    onSearch(filters);
  };

  const handleClear = () => {
    setSearchTerm('');
    setStatus('');
    setGender('');
    setSpecies('');
    onSearch({});
  };

  const hasFilters = searchTerm || status || gender || species;

  return (
    <section id="characters" className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }} className="glass rounded-2xl p-6 border border-white/5">

          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <form onSubmit={handleSubmit} className="flex-1 w-full">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search characters by name..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
                {searchTerm && (
                  <button type="button" onClick={() => setSearchTerm('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>

            {/* Filter Toggle */}
            <div className="flex gap-3 w-full lg:w-auto">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${showFilters ? 'bg-purple-500 text-white' : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'}`}>
                <Filter className="w-4 h-4" />
                Filters
              </motion.button>

              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSubmit}
                className="flex-1 lg:flex-none px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium shadow-lg shadow-purple-500/25">
                Search
              </motion.button>

              {hasFilters && (
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleClear}
                  className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white font-medium">
                  Clear
                </motion.button>
              )}
            </div>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t border-white/5 grid sm:grid-cols-3 gap-4">

              <div>
                <label className="block text-sm text-gray-400 mb-2">Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500/50">
                  <option value="" className="bg-[#0a0a0f]">All Status</option>
                  <option value="alive" className="bg-[#0a0a0f]">Alive</option>
                  <option value="dead" className="bg-[#0a0a0f]">Dead</option>
                  <option value="unknown" className="bg-[#0a0a0f]">Unknown</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Gender</label>
                <select value={gender} onChange={(e) => setGender(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500/50">
                  <option value="" className="bg-[#0a0a0f]">All Genders</option>
                  <option value="female" className="bg-[#0a0a0f]">Female</option>
                  <option value="male" className="bg-[#0a0a0f]">Male</option>
                  <option value="genderless" className="bg-[#0a0a0f]">Genderless</option>
                  <option value="unknown" className="bg-[#0a0a0f]">Unknown</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Species</label>
                <select value={species} onChange={(e) => setSpecies(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500/50">
                  <option value="" className="bg-[#0a0a0f]">All Species</option>
                  <option value="human" className="bg-[#0a0a0f]">Human</option>
                  <option value="alien" className="bg-[#0a0a0f]">Alien</option>
                  <option value="humanoid" className="bg-[#0a0a0f]">Humanoid</option>
                  <option value="robot" className="bg-[#0a0a0f]">Robot</option>
                  <option value="animal" className="bg-[#0a0a0f]">Animal</option>
                  <option value="mythological" className="bg-[#0a0a0f]">Mythological</option>
                  <option value="unknown" className="bg-[#0a0a0f]">Unknown</option>
                </select>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default SearchFilter;