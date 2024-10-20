import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Character {
  id: number;
  name: string;
  image: string;
}

interface Episode {
  id: number;
  name: string;
}

const CharacterList: React.FC<{ episodeId: number | null }> = ({ episodeId }) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState<number>(1); // State for current page
  const [totalPages, setTotalPages] = useState<number>(0); // Total number of pages available
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null); // Selected episode data

  // Function to fetch all characters with pagination
  const fetchAllCharacters = async (page: number) => {
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
      setCharacters(response.data.results);
      setTotalPages(response.data.info.pages); // Set total pages from API response
    } catch (error) {
      console.error('Error fetching all characters:', error);
    }
  };

  // Function to fetch characters from a specific episode
  const fetchEpisodeCharacters = async (id: number) => {
    try {
      const episodeResponse = await axios.get(`https://rickandmortyapi.com/api/episode/${id}`);
      const characterUrls = episodeResponse.data.characters;

      // Fetch character details from each character URL
      const characterResponses = await Promise.all(characterUrls.map((url: string) => axios.get(url)));
      const characterData = characterResponses.map(res => res.data);

      setCharacters(characterData);
      setSelectedEpisode({ id, name: episodeResponse.data.name }); // Set selected episode name
    } catch (error) {
      console.error('Error fetching characters for episode:', error);
    }
  };

  // Effect to handle initial load (all characters) or episode selection with pagination
  useEffect(() => {
    if (episodeId) {
      // Fetch characters for the selected episode (without pagination)
      fetchEpisodeCharacters(episodeId);
    } else {
      // Fetch all characters with pagination
      fetchAllCharacters(page);
      setSelectedEpisode(null); // Reset selected episode when showing all characters
    }
  }, [episodeId, page]); // Refetch when the page changes or an episode is selected

  // Handle next and previous page
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-7">
      <div className="flex w-full justify-between">
        {/* Display selected episode information on the left side */}
        {selectedEpisode && (
          <div className="mb-6 flex space-x-2">
            <p className="text-xl font-bold">{characters.length}</p>
            <p className="text-lg"> characters in episode</p>
            <p className="text-lg font-bold">"{selectedEpisode.name}"</p>
          </div>
        )}
      </div>

      {/* Character grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 p-10 gap-4">
        {characters.map((character) => (
          <div key={character.id} className="border border-gray-400 rounded-lg shadow-lg p-4 text-center">
            <img
              src={character.image}
              alt={character.name}
              className="w-15 h-15 object-cover rounded-md mb-4" // Resize image to fit the column
            />
            <h3 className="text-sm font-semibold">{character.name}</h3>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      {!episodeId && (
        <div className="flex justify-center items-center mt-8 fixed bottom-6 bg-black text-white">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className="bg-black text-white px-4 py-2 rounded-md mr-4 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4">{`Page ${page} of ${totalPages}`}</span>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className="bg-black text-white px-4 py-2 rounded-md ml-4 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CharacterList;
