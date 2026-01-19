import { useRef, useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, useInView } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useMovies } from '../../hooks/useMovies';
import { getPosterUrl } from '../../utils/imageHelper';
import HoverPreview from './HoverPreview';
import SkeletonLoader from './SkeletonLoader';
import useIsMobile from '../../hooks/useIsMobile';

const TopTenSection = ({ title }) => {
  const { data, isLoading, error } = useMovies('topIndia');
  const scrollRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [showPreview, setShowPreview] = useState(null);
  const [activeCardRef, setActiveCardRef] = useState(null);
  const hoverTimeoutRef = useRef(null);
  const closeTimeoutRef = useRef(null);
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.1, triggerOnce: true });
  const isMobile = useIsMobile(768);

  useEffect(() => {
    setIsInView(inView);
  }, [inView]);

  useEffect(() => {
    return () => {
      clearTimeout(hoverTimeoutRef.current);
      clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -600 : 600;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleMouseEnter = useCallback((movie, cardRef) => {
    if (isMobile) return;
    clearTimeout(closeTimeoutRef.current);
    
    hoverTimeoutRef.current = setTimeout(() => {
      setShowPreview(movie);
      setActiveCardRef(cardRef);
    }, 400);
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    clearTimeout(hoverTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setShowPreview(null);
      setActiveCardRef(null);
    }, 250);
  }, []);

  if (isLoading) {
    return (
      <div className="px-6 md:px-10 lg:px-16 py-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">{title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(10)].map((_, i) => (
            <SkeletonLoader key={i} type="card" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !data?.results?.length) {
    return null;
  }

  const topTenMovies = data.results.slice(0, 10);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="px-6 md:px-10 lg:px-16 py-8 relative group"
    >
      {/* Section Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
        {title}
      </h2>

      {/* Navigation Buttons */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/80 hover:bg-black text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 ml-2 md:ml-6"
        aria-label="Scroll left"
      >
        <FiChevronLeft size={24} />
      </button>

      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/80 hover:bg-black text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 mr-2 md:mr-6"
        aria-label="Scroll right"
      >
        <FiChevronRight size={24} />
      </button>

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {topTenMovies.map((movie, index) => (
          <TopTenCard
            key={movie.id}
            movie={movie}
            rank={index + 1}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        ))}
      </div>

      {/* Hover Preview Portal */}
      {showPreview && !isMobile && activeCardRef && createPortal(
        <div
          onMouseEnter={() => clearTimeout(closeTimeoutRef.current)}
          onMouseLeave={() => setShowPreview(null)}
        >
          <HoverPreview
            movie={showPreview}
            cardRef={activeCardRef}
            onMouseEnter={() => clearTimeout(closeTimeoutRef.current)}
            onMouseLeave={() => setShowPreview(null)}
          />
        </div>,
        document.body
      )}
    </motion.div>
  );
};

// Individual Top 10 Card Component
const TopTenCard = ({ movie, rank, onMouseEnter, onMouseLeave }) => {
  const cardRef = useRef(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: rank * 0.05 }}
      onMouseEnter={() => onMouseEnter(movie, cardRef)}
      onMouseLeave={onMouseLeave}
      className="relative flex-shrink-0 cursor-pointer group/card"
      style={{ width: '180px', minHeight: '280px' }}
    >
      {/* Large Rank Number Background */}
      <div className="absolute -left-4 md:-left-6 bottom-0 z-0 pointer-events-none select-none overflow-visible">
        <span
          className="block text-[140px] md:text-[160px] lg:text-[200px] font-black leading-none"
          style={{
            color: 'transparent',
            WebkitTextStroke: '2px rgba(255, 255, 255, 0.3)',
            textStroke: '2px rgba(255, 255, 255, 0.3)',
            fontFamily: 'Impact, Arial Black, sans-serif',
            transform: 'translateY(10%)',
          }}
        >
          {rank}
        </span>
      </div>

      {/* Movie Poster Container - FIXED Z-INDEX */}
      <div className="relative z-10 ml-10 md:ml-12 transform transition-all duration-300 group-hover/card:scale-105 group-hover/card:-translate-y-2">
        {/* Poster Image */}
        <div className="relative overflow-hidden rounded-md shadow-2xl bg-gray-800">
          <img
            src={getPosterUrl(movie.poster_path, 'w500')}
            alt={movie.title || 'Movie Poster'}
            className="w-full h-auto object-cover aspect-[2/3] block"
            loading="lazy"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x450/1a1a1a/666?text=No+Image';
            }}
          />

          {/* Recently Added Badge */}
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 z-10">
            <span className="bg-red-600 text-white text-[10px] md:text-xs font-bold px-2 md:px-3 py-1 rounded-sm shadow-lg whitespace-nowrap">
              Recently added
            </span>
          </div>

          {/* Hover Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 z-5" />
        </div>

        {/* Movie Title on Hover */}
        <div className="mt-2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
          <p className="text-white text-sm font-medium line-clamp-2 text-center">
            {movie.title}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TopTenSection;
                                                                                                                                                                                                                                                                                                                                                                                                                                                    