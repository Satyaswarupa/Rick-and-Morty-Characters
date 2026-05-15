import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Sidebar from './components/Sidebar';
import CharacterGrid from './components/CharacterGrid';
import CharacterDetail from './components/CharacterDetail';
import SearchFilter from './components/SearchFilter';
import StatsBar from './components/StatsBar';
import LoadingScreen from './components/LoadingScreen';
import Footer from './components/Footer';

function App() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarCharacter, setSidebarCharacter] = useState(null);

  const handleSearch = (searchFilters) => {
    setFilters(searchFilters);
    setPage(1);
  };

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseDetail = () => {
    setSelectedCharacter(null);
    document.body.style.overflow = 'auto';
  };

  const handleSidebarCharacter = (character) => {
    setSidebarCharacter(character);
  };

  const handleCloseSidebar = () => {
    setSidebarCharacter(null);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="min-h-screen bg-[#0a0a0f]"
        >
          <Navbar />
          <Hero />
          <StatsBar />
          <SearchFilter onSearch={handleSearch} />
          <CharacterGrid
            page={page}
            setPage={setPage}
            filters={filters}
            onCharacterClick={handleCharacterClick}
            onSidebarCharacter={handleSidebarCharacter}
          />
          <Footer />

          <AnimatePresence>
            {selectedCharacter && (
              <CharacterDetail
                character={selectedCharacter}
                onClose={handleCloseDetail}
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {sidebarCharacter && (
              <Sidebar
                character={sidebarCharacter}
                onClose={handleCloseSidebar}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </>
  );
}

export default App;