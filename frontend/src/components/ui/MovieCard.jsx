import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getPosterUrl, getBackdropUrl } from '../../utils/imageHelper';
import { getYear } from '../../utils/dateFormatter';
import { formatRating } from '../../utils/ratingFormatter';
import { ROUTES } from '../../utils/constants';
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
  const trailerTimeoutRef = useRef(null);
  const isMobile = useIsMobile(768); // Disable hover preview on mobile/tablet (viewport < 768px)

  const movieUrl = ROUTES.movieDetail(movie.id, movie.title || movie.name);

  // Get trailer URL
  const trailerUrl = useMemo(() => {
    if (!movieDetails?.videos?.results) return null;

    const trailer = movieDetails.videos.results.find(
      (video) => video.type === 'Trailer' && video.site === 'YouTube'
    ) || movieDetails.videos.results.find(
      (video) => video.site === 'YouTube'
    );

    return trailer ? `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&loop=1&playlist=${trailer.key}` : null;
  }, [movieDetails]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
      if (trailerTimeoutRef.current) clearTimeout(trailerTimeoutRef.current);
    };
  }, []);

  const handleMouseEnter = useCallback(async () => {
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

    // Fetch movie details if not already fetched and showTrailerOnHover is true
    if (showTrailerOnHover && !movieDetails) {
      try {
        const details = await fetchMovieDetail(movie.id);
        setMovieDetails(details);
      } catch (error) {
        console.error('Failed to fetch movie details:', error);
      }
    }

    // Delay before showing preview or trailer (500ms for stability)
    hoverTimeoutRef.current = setTimeout(() => {
      if (showTrailerOnHover) {
        setShowTrailer(true);
      } else {
        setShowPreview(true);
      }
    }, 500);
  }, [isMobile, showTrailerOnHover, movieDetails, movie.id]);

  const handleMouseLeave = useCallback(() => {
    // Clear the open timeout if user leaves before preview shows
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    // Clear trailer timeout
    if (trailerTimeoutRef.current) {
      clearTimeout(trailerTimeoutRef.current);
      trailerTimeoutRef.current = null;
    }

    // Delay closing to allow mouse to move to preview
    closeTimeoutRef.current = setTimeout(() => {
      setShowPreview(false);
      setShowTrailer(false);
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
          <div className={`relative ${size === 'large' ? 'aspect-video' : 'aspect-[2/3]'} rounded-lg overflow-hidden bg-gray-800`}>
            <img
              src={size === 'large' ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}` : getPosterUrl(movie.poster_path)}
              alt={movie.title || movie.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = size === 'large' ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}` : '/no-poster.svg';
              }}
            />

            {/* Trailer overlay */}
            {showTrailerOnHover && showTrailer && trailerUrl && (
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={trailerUrl}
                  allow="autoplay; encrypted-media"
                  allowFullScreen={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-lg font-bold mb-1 line-clamp-2">{movie.title || movie.name}</h3>
                  <p className="text-white/80 text-sm line-clamp-2">{movie.overview}</p>
                </div>
              </motion.div>
            )}

            {/* Default hover overlay when not showing trailer */}
            {!showTrailer && (
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
            )}

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
  movie: PropTypes.object.isRequired,
  size: PropTypes.oneOf(['default', 'large']),
  showTrailerOnHover: PropTypes.bool
};

export default MovieCard;
