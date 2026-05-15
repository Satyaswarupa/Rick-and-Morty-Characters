import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowUp, Github, Atom } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
              <Atom className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-bold text-white font-['Space_Grotesk']">R&M Explorer</span>
              <span className="text-gray-500 text-sm ml-2">© {new Date().getFullYear()}</span>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-4">
            <a href="https://rickandmortyapi.com" target="_blank" rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-white transition-colors">API Docs</a>
            <a href="https://github.com/Satyaswarupa" target="_blank" rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-white transition-colors">GitHub</a>
          </div>

          {/* Made with */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Made with</span>
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              <Heart className="w-4 h-4 text-red-400 fill-red-400" />
            </motion.div>
            <span>by Satyaswarupa</span>
          </div>

          {/* Back to top */}
          <motion.button onClick={scrollToTop} whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500/30 transition-colors">
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;