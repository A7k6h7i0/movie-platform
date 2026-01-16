import { useRef } from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import PropTypes from 'prop-types';
import MovieCard from './MovieCard';

const MovieCarousel = ({ movies, title }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group">
      <h2 className="section-title">{title}</h2>
      
      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <FiChevronLeft size={24} />
        </button>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <FiChevronRight size={24} />
        </button>

        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-auto hide-scrollbar pb-4"
        >
          {movies?.map((movie) => (
            <motion.div
              key={movie.id}
              className="flex-none w-[180px] sm:w-[200px]"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <MovieCard movie={movie} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

MovieCarousel.propTypes = {
  movies: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
};

export default MovieCarousel;
