import { useQuery } from '@tanstack/react-query';
import { searchMovies, discoverMovies, fetchWatchProviders } from '../api/tmdb';
import { useDebounce } from './useDebounce';

export const useSearch = (query, page = 1) => {
  const debouncedQuery = useDebounce(query, 300);

  return useQuery({
    queryKey: ['search', debouncedQuery, page],
    queryFn: () => searchMovies(debouncedQuery, page),
    enabled: debouncedQuery.length >= 2,
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true
  });
};

// Advanced search with filters (year, genre, provider)
export const useAdvancedSearch = ({ query, page = 1, year, genre, provider, language }) => {
  const debouncedQuery = useDebounce(query || '', 300);
  
  // Determine if we should use search or discover
  const hasFilters = year || genre || provider || language;
  const hasQuery = debouncedQuery.length >= 2;

  return useQuery({
    queryKey: ['advancedSearch', debouncedQuery, page, year, genre, provider, language],
    queryFn: async () => {
      // If we have a text query, use search API
      if (hasQuery && !hasFilters) {
        return searchMovies(debouncedQuery, page);
      }
      
      // If we have filters (with or without query), use discover API
      if (hasFilters) {
        const results = await discoverMovies({ page, year, genre, provider, language });
        
        // If we also have a query, filter results client-side with pagination
        if (hasQuery) {
          const queryLower = debouncedQuery.toLowerCase();
          const filtered = (results.results || []).filter(movie =>
            movie.title?.toLowerCase().includes(queryLower) ||
            movie.original_title?.toLowerCase().includes(queryLower)
          );

          const pageSize = 20;
          const totalPages = Math.ceil(filtered.length / pageSize);
          const currentPage = Math.min(page, Math.max(totalPages, 1));
          const start = (currentPage - 1) * pageSize;
          const pagedResults = filtered.slice(start, start + pageSize);

          return {
            ...results,
            results: pagedResults,
            total_results: filtered.length,
            total_pages: totalPages
          };
        }
        
        return results;
      }
      
      // Default: return empty results
      return { results: [], total_results: 0, total_pages: 0 };
    },
    enabled: hasQuery || hasFilters,
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true
  });
};

// Hook to fetch available watch providers
export const useWatchProviders = () => {
  return useQuery({
    queryKey: ['watchProviders'],
    queryFn: fetchWatchProviders,
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
    cacheTime: 1000 * 60 * 60 * 24 // Keep in cache for 24 hours
  });
};
