import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { fetchTopRatedMovies, fetchTopReviewedMovies } from '../api/tmdb';

const ShuffleContext = createContext();

export const useShuffleContext = () => {
  const context = useContext(ShuffleContext);
  if (!context) {
    throw new Error('useShuffleContext must be used within a ShuffleProvider');
  }
  return context;
};

/**
 * Google-style controlled shuffle algorithm:
 * - Top 3 items: Preserved (never shuffled) - these are the best recommendations
 * - Mid-tier items (4-20): Shuffled on user action only
 * - Category diversity: Mix of top rated and top reviewed
 * - No reshuffle on render: Uses useMemo and explicit user action only
 */
export const ShuffleProvider = ({ children }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestedMovies, setSuggestedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastShuffleTime, setLastShuffleTime] = useState(null);

  // Fetch and combine movies with category diversity
  const fetchMovies = useCallback(async () => {
    try {
      const [topRatedData, topReviewedData] = await Promise.all([
        fetchTopRatedMovies(1),
        fetchTopReviewedMovies(1)
      ]);

      const topRated = topRatedData.results || [];
      const topReviewed = topReviewedData.results || [];

      // Score and combine movies with category diversity
      const movieMap = new Map();
      
      // Process top rated (higher weight for quality)
      topRated.forEach((movie, index) => {
        const rankScore = (topRated.length - index) * 2;
        const qualityScore = movie.vote_average * 10;
        const reviewScore = movie.vote_count / 1000;
        const totalScore = rankScore + qualityScore + reviewScore;
        
        movieMap.set(movie.id, {
          movie,
          score: totalScore,
          category: 'topRated'
        });
      });
      
      // Process top reviewed (higher weight for popularity)
      topReviewed.forEach((movie, index) => {
        const rankScore = (topReviewed.length - index) * 2;
        const qualityScore = movie.vote_average * 10;
        const reviewScore = movie.vote_count / 1000;
        const totalScore = rankScore + qualityScore + reviewScore;
        
        const existing = movieMap.get(movie.id);
        if (existing) {
          // Boost score if movie appears in both lists
          movieMap.set(movie.id, {
            ...existing,
            score: existing.score + totalScore * 0.5,
            category: 'both'
          });
        } else {
          movieMap.set(movie.id, {
            movie,
            score: totalScore,
            category: 'topReviewed'
          });
        }
      });

      // Sort by score and get top 20 candidates
      const sortedMovies = Array.from(movieMap.values())
        .sort((a, b) => b.score - a.score)
        .slice(0, 20)
        .map(item => item.movie);

      return { movies: sortedMovies, movieMap };
    } catch (err) {
      console.error('Error fetching movies:', err);
      throw err;
    }
  }, []);

  // Controlled shuffle: preserve top 3, shuffle rest
  const applyControlledShuffle = useCallback((movies) => {
    if (!movies || movies.length === 0) return [];

    // Preserve top 3 items (they are the best recommendations)
    const topPreserved = movies.slice(0, 3);
    
    // Shuffle mid-tier items (positions 4+)
    const midTier = movies.slice(3);
    
    // Fisher-Yates shuffle for mid-tier only
    const shuffledMidTier = [...midTier];
    for (let i = shuffledMidTier.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledMidTier[i], shuffledMidTier[j]] = [shuffledMidTier[j], shuffledMidTier[i]];
    }
    
    // Combine: top 3 preserved + shuffled mid-tier
    return [...topPreserved, ...shuffledMidTier];
  }, []);

  // Main shuffle function - only on explicit user action
  const shuffleSuggestions = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Fetch fresh movies
      const { movies } = await fetchMovies();
      
      // Apply controlled shuffle (preserve top 3, shuffle rest)
      const shuffledMovies = applyControlledShuffle(movies);
      
      setSuggestedMovies(shuffledMovies);
      setShowSuggestions(true);
      setLastShuffleTime(Date.now());
    } catch (err) {
      console.error('Error shuffling suggestions:', err);
      setError('Failed to load suggestions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [fetchMovies, applyControlledShuffle]);

  // Toggle suggestions visibility
  const toggleSuggestions = useCallback((action = 'auto') => {
    if (!showSuggestions) {
      // Show suggestions - fetch if needed
      if (suggestedMovies.length === 0) {
        shuffleSuggestions();
      } else {
        setShowSuggestions(true);
      }
    } else {
      // Already showing
      if (action === 'hide') {
        // Hide but keep movies for next time
        setShowSuggestions(false);
      } else if (action === 'reshuffle') {
        // Reshuffle and keep showing
        shuffleSuggestions();
      }
      // 'auto' does nothing when already showing
    }
  }, [showSuggestions, suggestedMovies, shuffleSuggestions]);

  // Memoized context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    showSuggestions,
    setShowSuggestions,
    suggestedMovies,
    isLoading,
    error,
    lastShuffleTime,
    shuffleSuggestions,
    toggleSuggestions
  }), [
    showSuggestions,
    suggestedMovies,
    isLoading,
    error,
    lastShuffleTime,
    shuffleSuggestions,
    toggleSuggestions
  ]);

  return (
    <ShuffleContext.Provider value={value}>
      {children}
    </ShuffleContext.Provider>
  );
};

ShuffleProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default ShuffleContext;
