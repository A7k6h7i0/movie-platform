import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getBackdropUrl } from '../../utils/imageHelper';
import { getYear } from '../../utils/dateFormatter';
import RatingBadge from './RatingBadge';

const SuggestionsSection = ({ 
  show, 
  movie, 
  isLoading, 
  error,
  onToggle 
}) => {
  if (!show && !isLoading) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.section
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className="px-4 md:px-8 lg:px-16 py-6">
            {/* Header with Reshuffle Button */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Top Pick for You
              </h2>
              <button
                onClick={() => onToggle('reshuffle')}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-full font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span className="hidden sm:inline">
                  {isLoading ? 'Finding...' : 'Reshuffle'}
                </span>
              </button>
            </div>

            {/* Error State */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-400">{error}</p>
              </div>
            )}

            {/* Loading State */}
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-accent"></div>
              </div>
            ) : movie ? (
              /* Single Movie Display */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-2xl overflow-hidden bg-gray-900"
              >
                {/* Backdrop Image */}
                <div className="relative h-[300px] md:h-[400px] lg:h-[500px]">
                  <img
                    src={getBackdropUrl(movie.backdrop_path)}
                    alt={movie.title || movie.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  
                  {/* Movie Details */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <div className="max-w-2xl">
                      {/* Title */}
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                        {movie.title || movie.name}
                      </h3>
                      
                      {/* Meta Info */}
                      <div className="flex flex-wrap items-center gap-4 mb-4 text-gray-300">
                        <span className="flex items-center gap-1">
                          <RatingBadge rating={movie.vote_average} />
                        </span>
                        <span>{getYear(movie.release_date || movie.first_air_date)}</span>
                        {movie.original_language && (
                          <span className="uppercase">{movie.original_language}</span>
                        )}
                      </div>
                      
                      {/* Overview */}
                      <p className="text-gray-300 text-sm md:text-base line-clamp-3 mb-4">
                        {movie.overview || 'No description available.'}
                      </p>
                      
                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3">
                        <Link
                          to={`/movie/${movie.id}/${(movie.title || movie.name).toLowerCase().replace(/\s+/g, '-')}`}
                          className="px-6 py-3 bg-primary-accent hover:bg-red-700 text-white rounded-full font-semibold transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <p>Click shuffle to get a movie recommendation!</p>
              </div>
            )}
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

SuggestionsSection.propTypes = {
  show: PropTypes.bool.isRequired,
  movie: PropTypes.object,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  onToggle: PropTypes.func.isRequired
};

SuggestionsSection.defaultProps = {
  movie: null,
  isLoading: false,
  error: null
};

export default SuggestionsSection;
