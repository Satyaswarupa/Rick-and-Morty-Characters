import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchCharacters } from '../services/api';

export const useCharacters = (page = 1, filters = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use ref to track if component is mounted
  const isMounted = useRef(true);

  // Create a stable filters string for dependency comparison
  const filtersKey = JSON.stringify(filters);

  const loadCharacters = useCallback(async () => {
    if (!isMounted.current) return;

    setLoading(true);
    setError(null);

    try {
      const result = await fetchCharacters(page, filters);
      if (isMounted.current) {
        setData(result);
      }
    } catch (err) {
      if (isMounted.current) {
        setError(err.response?.data?.error || 'Failed to fetch characters');
        setData(null);
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, [page, filtersKey]);

  useEffect(() => {
    isMounted.current = true;
    loadCharacters();

    return () => {
      isMounted.current = false;
    };
  }, [loadCharacters]);

  return { data, loading, error, refetch: loadCharacters };
};

export default useCharacters;