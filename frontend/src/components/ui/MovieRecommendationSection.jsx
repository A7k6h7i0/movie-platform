import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FiCheck, FiChevronLeft, FiChevronRight, FiStar, FiHeart, FiFilm, FiRefreshCw } from 'react-icons/fi';
import useMovieRecommendation from '../../hooks/useMovieRecommendation';
import { getPosterUrl } from '../../utils/imageHelper';
import { formatRating } from '../../utils/ratingFormatter';
import GenreBadge from './GenreBadge';
import RatingBadge from './RatingBadge';

const MovieRecommendationSection = () => {
  const {
    step,
    setStep,
    selections,
    recommendedMovie,
    isLoading,
    error,
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
  } = useMovieRecommendation();

  // Local state for loading animation
  const [showLoading, setShowLoading] = useState(false);

  // Fetch genres on mount
  useEffect(() => {
    fetchAllGenres();
  }, [fetchAllGenres]);

  // Genre options
  const genreOptions = Object.keys(GENRE_MAPPING);

  // Language options
  const languageOptions = Object.keys(LANGUAGE_MAPPING);

  // Mood options
  const moodOptions = ['Happy', 'Sad', 'Neutral'];

  // Generate movie slug for URL
  const getMovieSlug = (movie) => {
    if (!movie) return '';
    return (movie.title || movie.name)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  // Handle find another movie with loading state
  const handleFindAnotherMovie = () => {
    setShowLoading(true);
    findAnotherMovie();
    setTimeout(() => setShowLoading(false), 500);
  };

  return (
    <section className="relative bg-gradient-to-br from-gray-950 via-purple-950/20 to-gray-950 overflow-hidden">
      {/* Background effects - More highlighted */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-60" />
      </div>

      {/* Animated border glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 animate-pulse" style={{ clipPath: 'inset(0 0 100% 0)' }} />

      <div className="relative z-10 px-4 md:px-8 lg:px-16 py-16 md:py-20">
        {/* Header - More highlighted */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500/30 rounded-full mb-6 border border-purple-500/50">
            <FiFilm className="w-5 h-5 text-purple-300" />
            <span className="text-purple-200 font-semibold">Find the Right Movie in One Click</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            Find the Perfect Movie <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">for Your Mood</span>
          </h2>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto">
            Answer 3 quick questions and we'll pick the best movie for you.
          </p>
        </motion.div>

        {/* Progress indicator - Enhanced */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          {[1, 2, 3].map((s) => (
            <button
              key={s}
              onClick={() => step > s && goToStep(s)}
              className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg transition-all duration-300 ${
                step === s
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white scale-110 shadow-lg shadow-purple-500/30'
                  : step > s
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {step > s ? <FiCheck className="w-6 h-6" /> : s}
            </button>
          ))}
        </motion.div>

        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-md mx-auto mb-8 p-4 bg-red-500/20 border border-red-500/40 rounded-xl"
            >
              <p className="text-red-200 text-sm text-center">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step content */}
        <AnimatePresence mode="wait">
          {/* Step 1: Mood Selection */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="max-w-3xl mx-auto"
            >
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-lg mb-4">
                  <span className="text-purple-300 font-medium">Step 1 of 3</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-3">How are you feeling today?</h3>
                <p className="text-gray-400 text-lg">Choose a mood that matches your current vibe</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {moodOptions.map((mood) => (
                  <motion.button
                    key={mood}
                    onClick={() => selectMood(mood)}
                    whileHover={{ scale: 1.03, y: -8 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-8 rounded-2xl border-2 transition-all duration-300 ${
                      selections.mood === mood
                        ? 'border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/20'
                        : 'border-gray-700 bg-gray-800/50 hover:border-purple-400 hover:bg-gray-800'
                    }`}
                  >
                    <div className="text-6xl mb-4">
                      {mood === 'Happy' && '😊'}
                      {mood === 'Sad' && '😢'}
                      {mood === 'Neutral' && '😐'}
                    </div>
                    <h4 className="text-xl font-bold text-white">{mood}</h4>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Genre Selection */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="max-w-5xl mx-auto"
            >
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-lg mb-4">
                  <span className="text-purple-300 font-medium">Step 2 of 3</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-3">What kind of movies interest you?</h3>
                <p className="text-gray-400 text-lg">Select all genres that appeal to you</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {genreOptions.map((genre) => (
                  <motion.button
                    key={genre}
                    onClick={() => toggleGenre(genre)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-xl border transition-all duration-300 ${
                      selections.genres.includes(genre)
                        ? 'border-purple-500 bg-purple-500/20 text-purple-200 shadow-lg shadow-purple-500/20'
                        : 'border-gray-700 bg-gray-800/50 hover:border-purple-400 hover:bg-gray-800 text-gray-300'
                    }`}
                  >
                    {selections.genres.includes(genre) && (
                      <FiCheck className="inline w-5 h-5 mr-2" />
                    )}
                    <span className="text-base font-semibold">{genre}</span>
                  </motion.button>
                ))}
              </div>

              <div className="flex justify-center gap-4 mt-10">
                <motion.button
                  onClick={goBack}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-semibold transition-all border border-gray-700"
                >
                  <FiChevronLeft className="w-5 h-5" />
                  Back
                </motion.button>
                <motion.button
                  onClick={() => setStep(3)}
                  disabled={selections.genres.length === 0}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white rounded-xl font-semibold transition-all shadow-lg shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                  <FiChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Language Selection */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-lg mb-4">
                  <span className="text-purple-300 font-medium">Step 3 of 3</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-3">In which language?</h3>
                <p className="text-gray-400 text-lg">Select your preferred language</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {languageOptions.map((language) => (
                  <motion.button
                    key={language}
                    onClick={() => selectLanguage(language)}
                    whileHover={{ scale: 1.03, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-5 rounded-xl border-2 transition-all duration-300 ${
                      selections.language === language
                        ? 'border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/20'
                        : 'border-gray-700 bg-gray-800/50 hover:border-purple-400 hover:bg-gray-800'
                    }`}
                  >
                    <span className="text-xl font-bold text-white">{language}</span>
                  </motion.button>
                ))}
              </div>

              <div className="flex justify-center gap-4 mt-10">
                <motion.button
                  onClick={goBack}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-semibold transition-all border border-gray-700"
                >
                  <FiChevronLeft className="w-5 h-5" />
                  Back
                </motion.button>
                <motion.button
                  onClick={getRecommendations}
                  disabled={!selections.language || isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-size-200 hover:bg-pos-100 text-white rounded-xl font-bold transition-all shadow-xl shadow-purple-500/40 disabled:opacity-50 disabled:cursor-not-allowed animate-gradient"
                >
                  {isLoading ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Finding...
                    </>
                  ) : (
                    <>
                      <FiHeart className="w-6 h-6" />
                      Get My Movie
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Result Display - Premium highlighted card */}
          {step === 4 && recommendedMovie && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-6xl mx-auto"
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/30 rounded-full mb-4 border border-green-500/50"
                >
                  <FiStar className="w-6 h-6 text-yellow-400" />
                  <span className="text-green-200 font-bold">Perfect Match Found!</span>
                </motion.div>
                <h3 className="text-2xl font-bold text-white">
                  We found the perfect movie for your <span className="text-purple-400">{selections.mood.toLowerCase()}</span> mood
                </h3>
              </div>

              {/* Premium Movie Card */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 rounded-3xl overflow-hidden border-2 border-purple-500/30 shadow-2xl shadow-purple-500/20"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Poster with glow effect */}
                  <div className="md:w-80 lg:w-96 flex-shrink-0 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 z-10" />
                    <div className="relative aspect-[2/3] md:h-full">
                      <img
                        src={getPosterUrl(recommendedMovie.poster_path)}
                        alt={recommendedMovie.title || recommendedMovie.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 z-20">
                        <RatingBadge rating={recommendedMovie.vote_average} />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent md:hidden" />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1 p-8 md:p-10 lg:p-12 flex flex-col">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                      {recommendedMovie.title || recommendedMovie.name}
                    </h2>

                    {/* Metadata */}
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                      <span className="text-gray-400 text-lg">
                        {recommendedMovie.release_date?.split('-')[0] || 'N/A'}
                      </span>
                      <span className="w-2 h-2 bg-purple-500 rounded-full" />
                      <span className="text-gray-300 text-lg capitalize font-medium">
                        {selections.language}
                      </span>
                      <span className="w-2 h-2 bg-purple-500 rounded-full" />
                      <div className="flex items-center gap-2 text-yellow-400">
                        <FiStar className="w-5 h-5 fill-current" />
                        <span className="font-bold text-xl">{formatRating(recommendedMovie.vote_average)}</span>
                        <span className="text-gray-400 text-lg">({recommendedMovie.vote_count?.toLocaleString()} votes)</span>
                      </div>
                    </div>

                    {/* Genres */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {recommendedMovie.genre_ids?.slice(0, 5).map((genreId) => {
                        const genre = Object.entries(GENRE_MAPPING).find(
                          ([, id]) => id === genreId
                        );
                        return genre ? (
                          <span
                            key={genreId}
                            className="px-4 py-2 bg-purple-500/20 border border-purple-500/40 rounded-full text-purple-200 text-sm font-medium"
                          >
                            {genre[0]}
                          </span>
                        ) : null;
                      })}
                    </div>

                    {/* Overview */}
                    <p className="text-gray-300 leading-relaxed text-lg mb-8 flex-grow">
                      {recommendedMovie.overview || 'No description available for this movie.'}
                    </p>

                    {/* Actions - Premium buttons */}
                    <div className="flex flex-wrap gap-4">
                      <Link
                        to={`/movie/${recommendedMovie.id}/${getMovieSlug(recommendedMovie)}`}
                        className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white rounded-xl font-bold transition-all shadow-lg shadow-purple-500/30"
                      >
                        <FiFilm className="w-5 h-5" />
                        View Details
                      </Link>
                      <motion.button
                        onClick={handleFindAnotherMovie}
                        disabled={isLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-2 px-6 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-semibold transition-all border border-gray-700 disabled:opacity-50"
                      >
                        {isLoading ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <FiRefreshCw className="w-5 h-5" />
                        )}
                        Find Another
                      </motion.button>
                      <motion.button
                        onClick={resetSelection}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-2 px-6 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-semibold transition-all border border-gray-700"
                      >
                        Take Quiz Again
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* No match found */}
          {step === 4 && !recommendedMovie && !isLoading && (
            <motion.div
              key="no-result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-md mx-auto text-center"
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700">
                <FiFilm className="w-12 h-12 text-gray-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">No Perfect Match Found</h3>
              <p className="text-gray-400 mb-8 text-lg">
                We couldn't find a movie that matches all your criteria.
              </p>
              <div className="flex flex-col gap-4">
                <motion.button
                  onClick={resetSelection}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold transition-all shadow-lg"
                >
                  Start Over
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

MovieRecommendationSection.propTypes = {};

export default MovieRecommendationSection;
