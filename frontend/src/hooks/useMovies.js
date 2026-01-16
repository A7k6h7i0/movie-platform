import { useQuery } from '@tanstack/react-query';
import { 
  fetchTrendingMovies, 
  fetchPopularMovies, 
  fetchTopRatedMovies, 
  fetchUpcomingMovies 
} from '../api/tmdb';

export const useMovies = (category, page = 1) => {
  const categoryMap = {
    trending: fetchTrendingMovies,
    popular: fetchPopularMovies,
    topRated: fetchTopRatedMovies,
    upcoming: fetchUpcomingMovies
  };

  const fetchFunction = categoryMap[category];

  return useQuery({
    queryKey: [category, 'movies', page],
    queryFn: () => fetchFunction(page),
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 30,
    keepPreviousData: true
  });
};
