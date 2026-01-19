import { useQuery } from '@tanstack/react-query';
import { discoverMovies } from '../api/tmdb';

/**
 * Discover movies by filters (genres, language, etc)
 */
export const useDiscoverMovies = (params = {}) => {
  return useQuery({
    queryKey: ['discover', params],
    queryFn: () => discoverMovies(params),
    staleTime: 1000 * 60 * 10, // 10 minutes
    cacheTime: 1000 * 60 * 30, // 30 minutes
    enabled: !!params.genre || !!params.language || !!params.year || !!params.provider || !!params.region,
  });
};
