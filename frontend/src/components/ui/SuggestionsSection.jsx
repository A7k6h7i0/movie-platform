import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import MovieCard from './MovieCard';
import SkeletonLoader from './SkeletonLoader';

const SuggestionsSection = ({ 
  show, 
  movies, 
  isLoading, 
  error,
  onToggle 
}) => {
  const scrollRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    setIsInView(true);
  }, []);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

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
          <div className="px-4 md:px-10 lg:px-16">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 pt-4">
              <div className="flex items-center gap-3">
                <h2 className="text-xl md:text-2xl font-bold text-white">
                  Top Pick for You
                </h2>
                {movies.length > 0 && (
                  <span className="text-sm text-gray-400">
                    ({movies.length})
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {movies.length > 6 && (
                  <button
                    onClick={() => onToggle('reshuffle')}
                    disabled={isLoading}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-full font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg
                      className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`}
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
                    <span className="hidden xs:inline">
                      {isLoading ? '...' : 'Reshuffle'}
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* Error State */}
            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Loading State */}
            {isLoading ? (
              <div className="flex gap-3 overflow-hidden pb-4">
                {[...Array(6)].map((_, i) => (
                  <div key={`skeleton-${i}`} className="flex-none w-[140px] md:w-[180px]">
                    <SkeletonLoader type="card" />
                  </div>
                ))}
              </div>
            ) : movies && movies.length > 0 ? (
              /* Movies Carousel - Same as other sections */
              <motion.div
                className="relative group mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                {/* Scroll Buttons */}
                <button
                  onClick={() => scroll('left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black text-white p-2 md:p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hidden md:block"
                >
                  <FiChevronLeft size={20} />
                </button>
                <button
                  onClick={() => scroll('right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black text-white p-2 md:p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hidden md:block"
                >
                  <FiChevronRight size={20} />
                </button>

                {/* Movies Row */}
                <div
                  ref={scrollRef}
                  className="flex gap-3 overflow-x-auto scroll-smooth hide-scrollbar touch-pan-x pb-4"
                  style={{ WebkitOverflowScrolling: 'touch' }}
                >
                  {movies.map((movie, index) => (
                    <motion.div
                      key={movie.id}
                      className="flex-none w-[140px] md:w-[180px]"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.3) }}
                    >
                      <MovieCard movie={movie} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <p>Click shuffle to get movie recommendations!</p>
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
  movies: PropTypes.array,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  onToggle: PropTypes.func.isRequired
};

SuggestionsSection.defaultProps = {
  movies: [],
  isLoading: false,
  error: null
};

export default SuggestionsSection;
