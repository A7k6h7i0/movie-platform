import { useRef, useEffect, useState, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import PropTypes from 'prop-types';
import MovieCard from './MovieCard';

const MovieCarousel = ({ movies, title, featuredLayout = false }) => {
  const scrollRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    setIsInView(inView);
  }, [inView]);

  // Get trailer for featured movie
  const featuredTrailer = useMemo(() => {
    const featuredMovie = movies?.[featuredIndex];
    return featuredMovie?.videos?.results?.find(
      (v) => v.type === "Trailer" && v.site === "YouTube"
    )?.key;
  }, [movies, featuredIndex]);

  // Track scroll position to determine featured movie
  const handleScroll = () => {
    const container = scrollRef.current;
    if (container) {
      const scrollLeft = container.scrollLeft;
      const itemWidth = 180; // Approximate width of small items
      const featuredWidth = 320; // Width of featured item
      const gap = 16;

      // Calculate which item should be featured based on scroll position
      const index = Math.round(scrollLeft / (itemWidth + gap));
      setFeaturedIndex(Math.min(Math.max(index, 0), movies?.length - 1 || 0));
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [movies]);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      ref={ref}
      className="relative group mb-8"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2 className="text-2xl font-bold text-white mb-4 px-4 md:px-0">{title}</h2>

      <div className="relative px-4 md:px-0">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
        >
          <FiChevronLeft size={24} />
        </button>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
        >
          <FiChevronRight size={24} />
        </button>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto hide-scrollbar gap-4 pb-4 scroll-smooth"
          style={{
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {movies?.map((movie, index) => {
            const isFeatured = featuredLayout && index === featuredIndex;
            return (
              <motion.div
                key={movie.id}
                className={`flex-none rounded-lg overflow-hidden transition-all duration-500 ease-out ${
                  featuredLayout && isFeatured
                    ? 'w-[320px] h-[180px] md:w-[400px] md:h-[225px]'
                    : featuredLayout
                    ? 'w-[160px] h-[240px] md:w-[180px] md:h-[270px]'
                    : 'w-[240px] h-[135px] md:w-[280px] md:h-[158px] lg:w-[320px] lg:h-[180px]'
                }`}
                style={{ scrollSnapAlign: 'start' }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                whileHover={{
                  scale: (featuredLayout && isFeatured) ? 1.02 : 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                {featuredLayout ? (
                  <div className="relative">
                    <MovieCard
                      movie={movie}
                      size={isFeatured ? 'large' : 'default'}
                    />
                    {/* Trailer overlay for featured movie */}
                    {isFeatured && featuredTrailer && (
                      <motion.div
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <iframe
                          className="absolute inset-0 w-full h-full"
                          src={`https://www.youtube.com/embed/${featuredTrailer}?autoplay=1&mute=1&controls=0&loop=1&playlist=${featuredTrailer}&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3`}
                          allow="autoplay; encrypted-media"
                          allowFullScreen={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-white text-lg font-bold mb-1">{movie.title}</h3>
                          <p className="text-white/80 text-sm line-clamp-2">{movie.overview}</p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                ) : (
                  <MovieCard movie={movie} size="large" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

MovieCarousel.propTypes = {
  movies: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  featuredLayout: PropTypes.bool
};

export default MovieCarousel;
