import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Github, Atom } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) { el.scrollIntoView({ behavior: 'smooth' }); setIsMobileMenuOpen(false); }
  };

  return (
    <>
      <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'glass-strong py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <motion.div className="flex items-center gap-2 cursor-pointer" whileHover={{ scale: 1.05 }} onClick={() => scrollToSection('hero')}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 via-cyan-500 to-green-500 flex items-center justify-center">
                <Atom className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-['Space_Grotesk'] gradient-text">R&M Explorer</span>
            </motion.div>

            <div className="hidden md:flex items-center gap-1">
              {['Hero', 'Characters'].map((item) => (
                <button key={item} onClick={() => scrollToSection(item.toLowerCase())}
                  className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                  {item}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <motion.a href="https://github.com/Satyaswarupa" target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }} className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                <Github className="w-4 h-4" />
              </motion.a>
            </div>

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white">
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {isMobileMenuOpen && (
        <motion.div initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }}
          className="fixed inset-0 z-40 glass-strong md:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-6">
            {['Hero', 'Characters'].map((item, i) => (
              <motion.button key={item} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                onClick={() => scrollToSection(item.toLowerCase())} className="text-2xl font-bold text-white hover:text-purple-400 transition-colors">
                {item}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;