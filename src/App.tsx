import React, { useState } from 'react';
import EpisodeList from './components/EpisodeList';
import CharacterList from './components/CharacterList';
import Header from './components/Header';

const App: React.FC = () => {
  const [selectedEpisodeId, setSelectedEpisodeId] = useState<number | null>(null);

  return (
    <>
      <Header />
      <div className="flex flex-grow h-[calc(100vh-64px)] overflow-hidden">
        <div className="w-1/4 bg-white-800 border-r overflow-y-auto">
          <EpisodeList onSelect={setSelectedEpisodeId} />
        </div>
        <div className="w-3/4 h-full overflow-y-auto">
          <CharacterList episodeId={selectedEpisodeId} />
        </div>
      </div>
    </>
  );
};

export default App;
