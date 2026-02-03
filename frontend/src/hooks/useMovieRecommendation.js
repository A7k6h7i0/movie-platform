import { useState, useCallback, useMemo } from 'react';
import { discoverMovies, fetchGenres } from '../api/tmdb';

/**
 * Genre mapping for TMDB genre IDs
 */
const GENRE_MAPPING = {
  'Action': 28,
  'Thriller': 53,
  'Comedy': 35,
  'Horror': 27,
  'Romance': 10749,
  'Drama': 18,
  'Sci-Fi': 878,
  'Fantasy': 14,
  'Mystery': 9648,
  'Adventure': 12
};

/**
 * Language mapping for TMDB language codes
 */
const LANGUAGE_MAPPING = {
  'English': 'en',
  'Telugu': 'te',
  'Hindi': 'hi',
  'Tamil': 'ta',
  'Malayalam': 'ml',
  'Kannada': 'kn',
  'Japanese': 'ja',
  'Korean': 'ko',
  'French': 'fr'
};

/**
 * Mood to genre mapping for recommendations
 */
const MOOD_GENRE_MAPPING = {
  'Happy': [35, 10749, 12, 16, 10402], // Comedy, Romance, Adventure, Animation, Music
  'Sad': [18, 10749, 9648], // Drama, Romance, Mystery
  'Neutral': [28, 878, 53, 14] // Action, Sci-Fi, Thriller, Fantasy
};

/**
 * Custom hook for movie recommendation functionality
 */
export const useMovieRecommendation = () => {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({
    mood: null,
    genres: [],
    language: null
  });
  const [recommendedMovie, setRecommendedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allGenres, setAllGenres] = useState([]);
  const [moviesCache, setMoviesCache] = useState([]);

  // Fetch all available genres on mount
  const fetchAllGenres = useCallback(async () => {
    try {
      const genres = await fetchGenres();
      setAllGenres(genres);
    } catch (err) {
      console.error('Error fetching genres:', err);
    }
  }, []);

  // Selection handlers
  const selectMood = useCallback((mood) => {
    setSelections(prev => ({ ...prev, mood }));
    setStep(2);
  }, []);

  const toggleGenre = useCallback((genre) => {
    setSelections(prev => {
      const newGenres = prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre];
      return { ...prev, genres: newGenres };
    });
  }, []);

  const selectLanguage = useCallback((language) => {
    setSelections(prev => ({ ...prev, language }));
  }, []);

  // Navigation handlers
  const goBack = useCallback(() => {
    setStep(prev => Math.max(prev - 1, 1));
  }, []);

  const goToStep = useCallback((newStep) => {
    if (newStep >= 1 && newStep <= 3) {
      setStep(newStep);
    }
  }, []);

  const resetSelection = useCallback(() => {
    setStep(1);
    setSelections({ mood: null, genres: [], language: null });
    setRecommendedMovie(null);
    setError(null);
  }, []);

  // Find another movie with same preferences
  const findAnotherMovie = useCallback(async () => {
    if (!selections.mood || selections.genres.length === 0 || !selections.language) {
      setError('Preferences not complete.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const languageCode = LANGUAGE_MAPPING[selections.language];
      
      // Fetch more movies for better matching
      const data = await discoverMovies({
        page: 5, // Get more movies for better matching
        language: languageCode,
        sort_by: 'vote_average.desc',
        'vote_count.gte': 50
      });

      const movies = data.results || [];

      // Step 1: Filter by mood (via genre mapping)
      const moodGenres = MOOD_GENRE_MAPPING[selections.mood] || [];
      const moodGenreSet = new Set(moodGenres);
      
      // Step 2: Filter by selected genres (all must match)
      const selectedGenreIds = selections.genres
        .map(g => GENRE_MAPPING[g])
        .filter(Boolean);

      let filteredMovies = movies.filter(movie => {
        const movieGenreIds = new Set(movie.genre_ids || []);
        
        // Check mood compatibility
        const hasMoodGenre = [...movieGenreIds].some(id => moodGenreSet.has(id));
        
        // Check all selected genres
        const hasAllGenres = selectedGenreIds.every(id => movieGenreIds.has(id));
        
        return hasMoodGenre && hasAllGenres;
      });

      // Step 3: If no exact match, relax genre matching
      if (filteredMovies.length === 0 && selectedGenreIds.length > 1) {
        filteredMovies = movies.filter(movie => {
          const movieGenreIds = new Set(movie.genre_ids || []);
          const matchingGenres = selectedGenreIds.filter(id => movieGenreIds.has(id));
          return matchingGenres.length >= Math.ceil(selectedGenreIds.length / 2);
        });
      }

      // Exclude current movie
      filteredMovies = filteredMovies.filter(m => m.id !== recommendedMovie?.id);

      // Sort by rating
      filteredMovies.sort((a, b) => {
        const ratingDiff = b.vote_average - a.vote_average;
        if (Math.abs(ratingDiff) > 0.5) return ratingDiff;
        return b.vote_count - a.vote_count;
      });

      // Select next best match
      const nextBestMatch = filteredMovies[0] || null;
      
      if (nextBestMatch) {
        setRecommendedMovie(nextBestMatch);
      } else {
        setError('No more movies found with these preferences.');
      }
    } catch (err) {
      console.error('Error finding another movie:', err);
      setError('Failed to find another movie. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [selections, recommendedMovie]);

  // Main recommendation logic
  const getRecommendations = useCallback(async () => {
    if (!selections.mood || selections.genres.length === 0 || !selections.language) {
      setError('Please complete all selections before getting a recommendation.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const languageCode = LANGUAGE_MAPPING[selections.language];
      
      // Fetch movies with language filter (larger batch for better matching)
      const data = await discoverMovies({
        page: 3, // Get more movies for better matching
        language: languageCode,
        sort_by: 'vote_average.desc',
        'vote_count.gte': 50
      });

      const movies = data.results || [];
      setMoviesCache(movies);

      // Step 1: Filter by mood (via genre mapping)
      const moodGenres = MOOD_GENRE_MAPPING[selections.mood] || [];
      const moodGenreSet = new Set(moodGenres);
      
      // Step 2: Filter by selected genres (all must match)
      const selectedGenreIds = selections.genres
        .map(g => GENRE_MAPPING[g])
        .filter(Boolean);

      let filteredMovies = movies.filter(movie => {
        const movieGenreIds = new Set(movie.genre_ids || []);
        
        // Check mood compatibility
        const hasMoodGenre = [...movieGenreIds].some(id => moodGenreSet.has(id));
        
        // Check all selected genres
        const hasAllGenres = selectedGenreIds.every(id => movieGenreIds.has(id));
        
        return hasMoodGenre && hasAllGenres;
      });

      // Step 3: If no exact match, relax genre matching (at least 50% of genres)
      if (filteredMovies.length === 0 && selectedGenreIds.length > 1) {
        filteredMovies = movies.filter(movie => {
          const movieGenreIds = new Set(movie.genre_ids || []);
          const matchingGenres = selectedGenreIds.filter(id => movieGenreIds.has(id));
          return matchingGenres.length >= Math.ceil(selectedGenreIds.length / 2);
        });
      }

      // Step 4: Sort by rating and select the best match
      filteredMovies.sort((a, b) => {
        // Primary: vote_average (higher is better)
        const ratingDiff = b.vote_average - a.vote_average;
        if (Math.abs(ratingDiff) > 0.5) return ratingDiff;
        
        // Secondary: vote_count (more popular is better)
        return b.vote_count - a.vote_count;
      });

      // Select only ONE movie (the highest rated)
      const bestMatch = filteredMovies[0] || null;
      setRecommendedMovie(bestMatch);
      setStep(4); // Move to result step
    } catch (err) {
      console.error('Error getting recommendations:', err);
      setError('Failed to find a movie. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [selections]);

  // Memoized value
  const value = useMemo(() => ({
    step,
    setStep,
    selections,
    recommendedMovie,
    isLoading,
    error,
    allGenres,
    GENRE_MAPPING,
    LANGUAGE_MAPPING,
    selectMood,
    toggleGenre,
    selectLanguage,
    goBack,
    goToStep,
    getRecommendations,
    resetSelection,
    findAnotherMovie,
    fetchAllGenres
  }), [
    step,
    selections,
    recommendedMovie,
    isLoading,
    error,
    allGenres,
    selectMood,
    toggleGenre,
    selectLanguage,
    goBack,
    goToStep,
    getRecommendations,
    resetSelection,
    findAnotherMovie,
    fetchAllGenres
  ]);

  return value;
};

export default useMovieRecommendation;
