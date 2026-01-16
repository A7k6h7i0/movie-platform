import { useState, useRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getPosterUrl } from '../../utils/imageHelper';
import { getYear } from '../../utils/dateFormatter';
import { formatRating } from '../../utils/ratingFormatter';
import { ROUTES } from '../../utils/constants';
import RatingBadge from './RatingBadge';
import HoverPreview from './HoverPreview';
import useIsMobile from '../../hooks/useIsMobile';

const MovieCard = ({ movie }) => {
  const [showPreview, setShowPreview] = useState(false);
  const cardRef = useRef(null);
  const hoverTimeoutRef = useRef(null);
  const closeTimeoutRef = useRef(null);
  const isMobile = useIsMobile(768); // Disable hover preview on mobile/tablet (viewport < 768px)

  const movieUrl = ROUTES.movieDetail(movie.id, movie.title || movie.name);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (isMobile) return;
    
    // Cancel any pending close
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    
    // Clear any existing open timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    // Delay before showing preview (500ms for stability)
    hoverTimeoutRef.current = setTimeout(() => {
      setShowPreview(true);
    }, 500);
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    // Clear the open timeout if user leaves before preview shows
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    
    // Delay closing to allow mouse to move to preview
    closeTimeoutRef.current = setTimeout(() => {
      setShowPreview(false);
    }, 300);
  }, []);

  const handlePreviewMouseEnter = useCallback(() => {
    // Cancel close when mouse enters preview
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const handlePreviewMouseLeave = useCallback(() => {
    // Close preview when mouse leaves it
    setShowPreview(false);
  }, []);

  return (
    <>
      <motion.div
        ref={cardRef}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className="relative group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link to={movieUrl} className="block">
          <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-gray-800">
            <img
              src={getPosterUrl(movie.poster_path)}
              alt={movie.title || movie.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/no-poster.svg';
              }}
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-bold text-lg mb-1 line-clamp-2">
                  {movie.title || movie.name}
                </h3>
                <p className="text-gray-300 text-sm">
                  {getYear(movie.release_date || movie.first_air_date)}
                </p>
              </div>
            </div>

            <div className="absolute top-2 right-2">
              <RatingBadge rating={movie.vote_average} />
            </div>
          </div>

          <div className="mt-3 px-1">
            <h3 className="text-white font-semibold text-sm line-clamp-1">
              {movie.title || movie.name}
            </h3>
            <div className="flex items-center justify-between mt-1">
              <span className="text-gray-400 text-xs">
                {getYear(movie.release_date || movie.first_air_date)}
              </span>
              <span className="text-primary-secondary text-xs font-semibold">
                ⭐ {formatRating(movie.vote_average)}
              </span>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Hover Preview Portal */}
      {showPreview && !isMobile && createPortal(
        <HoverPreview
          movie={movie}
          cardRef={cardRef}
          onMouseEnter={handlePreviewMouseEnter}
          onMouseLeave={handlePreviewMouseLeave}
        />,
        document.body
      )}
    </>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired
};

export default MovieCard;
