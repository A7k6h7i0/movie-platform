import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FiPlay, FiPlus, FiThumbsUp, FiChevronDown } from 'react-icons/fi';
import { getPosterUrl, getBackdropUrl } from '../../utils/imageHelper';
import { ROUTES } from '../../utils/constants';
import { fetchMovieDetail } from '../../api/tmdb';

const HoverPreview = ({ movie, cardRef, onMouseEnter, onMouseLeave }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const previewRef = useRef(null);
  const trailerTimeoutRef = useRef(null);

  // Fetch movie details including trailer
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await fetchMovieDetail(movie.id);
        setMovieDetails(details);
      } catch (error) {
        console.error('Failed to fetch movie details:', error);
      }
    };
    fetchDetails();
  }, [movie.id]);

  // Calculate position to avoid viewport overflow
  useEffect(() => {
    if (cardRef?.current) {
      const cardRect = cardRef.current.getBoundingClientRect();
      const previewWidth = 350;
      const previewHeight = 400;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let x = cardRect.left + cardRect.width / 2 - previewWidth / 2;
      let y = cardRect.top;

      // Adjust horizontal position
      if (x < 10) x = 10;
      if (x + previewWidth > viewportWidth - 10) {
        x = viewportWidth - previewWidth - 10;
      }

      // Adjust vertical position - expand upward if near bottom
      if (y + previewHeight > viewportHeight - 10) {
        y = viewportHeight - previewHeight - 10;
      }
      
      // Ensure y is not negative
      if (y < 10) y = 10;

      setPosition({ x, y });
    }
  }, [cardRef]);

  // Start trailer after delay
  useEffect(() => {
    trailerTimeoutRef.current = setTimeout(() => {
      setShowTrailer(true);
    }, 800);

    return () => {
      if (trailerTimeoutRef.current) {
        clearTimeout(trailerTimeoutRef.current);
      }
    };
  }, []);

  // Get trailer URL from movie details
  const getTrailerUrl = useCallback(() => {
    if (!movieDetails?.videos?.results) return null;
    
    const trailer = movieDetails.videos.results.find(
      (video) => video.type === 'Trailer' && video.site === 'YouTube'
    ) || movieDetails.videos.results.find(
      (video) => video.site === 'YouTube'
    );
    
    return trailer ? `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&loop=1&playlist=${trailer.key}` : null;
  }, [movieDetails]);

  // Format duration
  const formatDuration = (minutes) => {
    if (!minutes) return '';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  // Get certification
  const getCertification = () => {
    if (!movieDetails) return 'U/A';
    // Default certification based on adult flag
    return movieDetails.adult ? 'A' : 'U/A 13+';
  };

  // Get genres as string
  const getGenresString = () => {
    if (!movieDetails?.genres) return '';
    return movieDetails.genres.slice(0, 3).map(g => g.name).join(' • ');
  };

  const trailerUrl = getTrailerUrl();
  const movieUrl = ROUTES.movieDetail(movie.id, movie.title || movie.name);

  return (
    <motion.div
      ref={previewRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className="fixed z-[9999] w-[350px] bg-[#181818] rounded-lg overflow-hidden pointer-events-auto"
      style={{
        left: position.x,
        top: position.y,
        boxShadow: '0 8px 40px rgba(0, 0, 0, 0.8)',
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Video/Image Section */}
      <div className="relative aspect-video bg-gray-900 overflow-hidden">
        {showTrailer && trailerUrl ? (
          <iframe
            src={trailerUrl}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={movie.title || movie.name}
          />
        ) : (
          <img
            src={getBackdropUrl(movie.backdrop_path) || getPosterUrl(movie.poster_path)}
            alt={movie.title || movie.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/no-poster.svg';
            }}
          />
        )}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent pointer-events-none" />
        
        {/* Title overlay on video */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-bold text-lg drop-shadow-lg line-clamp-1">
            {movie.title || movie.name}
          </h3>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-4">
        {/* Action Buttons */}
        <div className="flex items-center gap-2 mb-3">
          <Link
            to={movieUrl}
            className="flex items-center justify-center w-10 h-10 bg-white rounded-full hover:bg-gray-200 transition-colors"
          >
            <FiPlay className="text-black text-lg ml-0.5" fill="black" />
          </Link>
          <button className="flex items-center justify-center w-10 h-10 border-2 border-gray-500 rounded-full hover:border-white transition-colors">
            <FiPlus className="text-white text-lg" />
          </button>
          <button className="flex items-center justify-center w-10 h-10 border-2 border-gray-500 rounded-full hover:border-white transition-colors">
            <FiThumbsUp className="text-white text-lg" />
          </button>
          <Link
            to={movieUrl}
            className="ml-auto flex items-center justify-center w-10 h-10 border-2 border-gray-500 rounded-full hover:border-white transition-colors"
          >
            <FiChevronDown className="text-white text-lg" />
          </Link>
        </div>

        {/* Movie Info */}
        <div className="flex items-center gap-2 text-sm mb-2">
          <span className="text-green-500 font-semibold">
            {Math.round((movie.vote_average || 0) * 10)}% Match
          </span>
          <span className="border border-gray-500 text-gray-400 px-1 text-xs">
            {getCertification()}
          </span>
          {movieDetails?.runtime && (
            <span className="text-gray-400">
              {formatDuration(movieDetails.runtime)}
            </span>
          )}
          <span className="border border-gray-500 text-gray-400 px-1 text-xs">
            HD
          </span>
        </div>

        {/* Genres */}
        <div className="text-gray-300 text-sm mb-2">
          {getGenresString()}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {movie.vote_average >= 7 && (
            <span className="text-xs text-gray-400">
              • Highly Rated
            </span>
          )}
          {movieDetails?.popularity > 100 && (
            <span className="text-xs text-gray-400">
              • Trending
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

HoverPreview.propTypes = {
  movie: PropTypes.object.isRequired,
  cardRef: PropTypes.object,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
};

export default HoverPreview;
