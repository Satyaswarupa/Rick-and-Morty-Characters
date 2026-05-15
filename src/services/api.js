import axios from 'axios';

const API_BASE = 'https://rickandmortyapi.com/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

export const fetchCharacters = async (page = 1, filters = {}) => {
  const params = { page, ...filters };
  const response = await api.get('/character', { params });
  return response.data;
};

export const fetchCharacterById = async (id) => {
  const response = await api.get(`/character/${id}`);
  return response.data;
};

export const fetchLocations = async (page = 1) => {
  const response = await api.get('/location', { params: { page } });
  return response.data;
};

export const fetchEpisodes = async (page = 1) => {
  const response = await api.get('/episode', { params: { page } });
  return response.data;
};

export default api;