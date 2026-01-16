import { useQuery } from '@tanstack/react-query';
import { fetchMovieDetail } from '../api/tmdb';

export const useMovieDetail = (id) => {
  return useQuery({
    queryKey: ['movie', id],
    queryFn: () => fetchMovieDetail(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 30,
    cacheTime: 1000 * 60 * 60
  });
};
