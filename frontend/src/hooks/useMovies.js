import { useQuery } from '@tanstack/react-query';
import {
  fetchTrendingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  fetchSouthIndianMovies,
  fetchTopIndiaMovies
} from '../api/tmdb';

export const useMovies = (category, page = 1) => {
  const categoryMap = {
    trending: fetchTrendingMovies,
    popular: fetchPopularMovies,
    topRated: fetchTopRatedMovies,
    upcoming: fetchUpcomingMovies,
    southIndian: fetchSouthIndianMovies,
    topIndia: fetchTopIndiaMovies
  };

  const fetchFunction = categoryMap[category];

  return useQuery({
    queryKey: [category, 'movies', page],
    queryFn: () => fetchFunction(page),
    staleTime: category === 'topIndia' ? 1000 * 60 * 30 : 1000 * 60 * 10, // 30 mins for top India
    cacheTime: 1000 * 60 * 30,
    keepPreviousData: true
  });
};
