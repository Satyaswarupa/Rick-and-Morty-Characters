import axios from 'axios';

const api = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
});

export const getEpisodes = () => api.get('/episode');
export const getCharacters = (episodeId: number) => api.get(`/episode/${episodeId}`);
