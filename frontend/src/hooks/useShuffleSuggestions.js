import { useState, useCallback } from 'react';
import { fetchTopRatedMovies, fetchTopReviewedMovies, fetchCombinedTopMovie } from '../api/tmdb';

/**
 * Custom hook for managing shuffle suggestions functionality
 * Handles fetching, shuffling, and displaying a single top movie recommendation
 */
export const useShuffleSuggestions = () => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestedMovie, setSuggestedMovie] = useState(null);
  const [previousMovies, setPreviousMovies] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch and return a random top movie from the combined list
   */
  const shuffleSuggestions = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Fetch top rated and top reviewed in parallel
      const [topRatedData, topReviewedData] = await Promise.all([
        fetchTopRatedMovies(1),
        fetchTopReviewedMovies(1)
      ]);

      const topRated = topRatedData.results || [];
      const topReviewed = topReviewedData.results || [];

      // Combine and score movies
      const movieScores = new Map();
      
      // Score top rated (higher weight)
      topRated.forEach((movie, index) => {
        const score = (topRated.length - index) * 2; // Weight: 2x
        const currentScore = movieScores.get(movie.id)?.score || 0;
        movieScores.set(movie.id, { 
          movie, 
          score: currentScore + score,
          combinedRating: (movie.vote_average * 2) + (movie.vote_count / 1000)
        });
      });
      
      // Score top reviewed
      topReviewed.forEach((movie, index) => {
        const score = (topReviewed.length - index); // Weight: 1x
        const currentScore = movieScores.get(movie.id)?.score || 0;
        movieScores.set(movie.id, { 
          movie, 
          score: currentScore + score,
          combinedRating: (movie.vote_average * 2) + (movie.vote_count / 1000)
        });
      });

      // Sort by combined score
      let sortedMovies = Array.from(movieScores.values())
        .sort((a, b) => b.score - a.score)
        .map(item => item.movie);

      // Filter out previously shown movies
      sortedMovies = sortedMovies.filter(movie => !previousMovies.has(movie.id));

      // If all movies have been shown, reset and start over
      if (sortedMovies.length === 0) {
        setPreviousMovies(new Set());
        sortedMovies = Array.from(movieScores.values())
          .sort((a, b) => b.score - a.score)
          .map(item => item.movie);
      }

      // Randomly select from top candidates (top 10)
      const topCandidates = sortedMovies.slice(0, 10);
      const randomIndex = Math.floor(Math.random() * topCandidates.length);
      const selectedMovie = topCandidates[randomIndex];

      // Track shown movies (keep last 20)
      setPreviousMovies(prev => {
        const newSet = new Set(prev);
        newSet.add(selectedMovie.id);
        // Keep only last 20 to avoid memory issues
        if (newSet.size > 20) {
          const iterator = newSet.values();
          newSet.delete(iterator.next().value);
        }
        return newSet;
      });

      setSuggestedMovie(selectedMovie);
      setShowSuggestions(true);
    } catch (err) {
      console.error('Error fetching suggestions:', err);
      setError('Failed to load suggestions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [previousMovies]);

  /**
   * Toggle suggestions visibility
   */
  const toggleSuggestions = useCallback(() => {
    if (!showSuggestions) {
      // If showing for the first time or no movie, fetch one
      if (!suggestedMovie) {
        shuffleSuggestions();
      } else {
        setShowSuggestions(true);
      }
    } else {
      setShowSuggestions(false);
    }
  }, [showSuggestions, suggestedMovie, shuffleSuggestions]);

  return {
    showSuggestions,
    suggestedMovie,
    previousMovies,
    isLoading,
    error,
    shuffleSuggestions,
    toggleSuggestions,
    setShowSuggestions
  };
};

export default useShuffleSuggestions;
