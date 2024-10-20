import React, { useEffect, useState } from "react";
import axios from "axios";

interface Episode {
  id: number;
  name: string;
  episode: string;
}

const EpisodeList: React.FC<{ onSelect: (id: number) => void }> = ({
  onSelect,
}) => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null);

  useEffect(() => {
    axios
      .get("https://rickandmortyapi.com/api/episode")
      .then((response) => setEpisodes(response.data.results))
      .catch((error) => console.error(error));
  }, []);

  const handleSelect = (id: number) => {
    setSelectedEpisode(id);
    onSelect(id); 
  };

  return (
    <div className="h-full overflow-hidden relative">
      <h2 className="text-2xl font-bold text-center h-10 sticky top-0 mt-2 bg-white z-10">
        Episodes
        <span className="block h-0.5 bg-black w-full absolute left-0 bottom-0"></span>
      </h2>

      <ul className="h-full p-10 overflow-y-auto hide-scrollbar">
        {episodes.map((episode) => (
          <li
            key={episode.id}
            className={`p-4 mb-2 border rounded-md cursor-pointer hover:bg-gray-100 transition-all
              ${
                selectedEpisode === episode.id
                  ? "border-2 border-black"
                  : "border border-gray-300"
              }`}
            onClick={() => handleSelect(episode.id)}
          >
            {episode.name} ({episode.episode})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EpisodeList;
