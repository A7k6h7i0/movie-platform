import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { getPosterUrl } from '../../utils/imageHelper';
import { getYear } from '../../utils/dateFormatter';
import { formatRating } from '../../utils/ratingFormatter';
import RatingBadge from './RatingBadge';
import HoverPreview from './HoverPreview';
import useIsMobile from '../../hooks/useIsMobile';
import { fetchMovieDetail } from '../../api/tmdb';

const MovieCard = ({ movie, size = 'default', showTrailerOnHover = false }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  const cardRef = useRef(null);
  const hoverTimeoutRef = useRef(null);
  const closeTimeoutRef = useRef(null);
  const isMobile = useIsMobile(768);

  /* ---------------------------------- */
  /* CLEANUP */
  /* ---------------------------------- */
  useEffect(() => {
    return () => {
      clearTimeout(hoverTimeoutRef.current);
      clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  /* ---------------------------------- */
  /* HOVER */
  /* ---------------------------------- */
  const handleMouseEnter = useCallback(async () => {
    if (isMobile) return;

    clearTimeout(closeTimeoutRef.current);

    if (showTrailerOnHover && !movieDetails) {
      try {
        const details = await fetchMovieDetail(movie.id);
        setMovieDetails(details);
      } catch {}
    }

    hoverTimeoutRef.current = setTimeout(() => {
      showTrailerOnHover ? setShowTrailer(true) : setShowPreview(true);
    }, 400);
  }, [isMobile, showTrailerOnHover, movieDetails, movie.id]);

  const handleMouseLeave = useCallback(() => {
    clearTimeout(hoverTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setShowPreview(false);
      setShowTrailer(false);
    }, 250);
  }, []);

  return (
    <>
      <motion.div
        ref={cardRef}
        className="relative group cursor-pointer"
        whileTap={{ scale: 0.97 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={`relative ${
            size === 'large' ? 'aspect-video' : 'aspect-[2/3]'
          } rounded-lg overflow-hidden bg-gray-800`}
        >
          <img
            src={
              size === 'large'
                ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
                : getPosterUrl(movie.poster_path)
            }
            alt={movie.title || movie.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />

          {!showTrailer && (
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-0 p-4">
                <h3 className="text-white font-bold text-lg line-clamp-2">
                  {movie.title || movie.name}
                </h3>
                <p className="text-gray-300 text-sm">
                  {getYear(movie.release_date || movie.first_air_date)}
                </p>
              </div>
            </div>
          )}

          <div className="absolute top-2 right-2 z-20">
            <RatingBadge rating={movie.vote_average} />
          </div>
        </div>

        <div className="mt-3 px-1">
          <h3 className="text-white font-semibold text-sm line-clamp-1">
            {movie.title || movie.name}
          </h3>
          <div className="flex justify-between text-xs mt-1">
            <span className="text-gray-400">
              {getYear(movie.release_date || movie.first_air_date)}
            </span>
            <span className="text-primary-secondary font-semibold">
              ⭐ {formatRating(movie.vote_average)}
            </span>
          </div>
        </div>
      </motion.div>

      {/* HOVER PREVIEW */}
      {showPreview && !isMobile &&
        createPortal(
          <HoverPreview
            movie={movie}
            cardRef={cardRef}
            onMouseEnter={() => clearTimeout(closeTimeoutRef.current)}
            onMouseLeave={() => setShowPreview(false)}
          />,
          document.body
        )}
    </>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  size: PropTypes.oneOf(['default', 'large']),
  showTrailerOnHover: PropTypes.bool
};

export default MovieCard;
