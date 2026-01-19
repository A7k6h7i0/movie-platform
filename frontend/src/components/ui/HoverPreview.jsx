import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FiPlay, FiPlus, FiThumbsUp, FiChevronDown } from 'react-icons/fi';
import { getPosterUrl, getBackdropUrl } from '../../utils/imageHelper';
import { ROUTES } from '../../utils/constants';
import { fetchMovieDetail } from '../../api/tmdb';

const HoverPreview = ({ movie, cardRef, onMouseEnter, onMouseLeave }) => {
  const navigate = useNavigate(); // ✅ ADDED
  const [movieDetails, setMovieDetails] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const previewRef = useRef(null);
  const trailerTimeoutRef = useRef(null);

  const movieUrl = ROUTES.movieDetail(movie.id, movie.title || movie.name);

  /* FETCH DETAILS */
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await fetchMovieDetail(movie.id);
        setMovieDetails(details);
      } catch {}
    };
    fetchDetails();
  }, [movie.id]);

  /* POSITION */
  useEffect(() => {
    if (cardRef?.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const previewWidth = 350;
      const previewHeight = 400;
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      let x = rect.left + rect.width / 2 - previewWidth / 2;
      let y = rect.top;

      if (x < 10) x = 10;
      if (x + previewWidth > vw - 10) x = vw - previewWidth - 10;
      if (y + previewHeight > vh - 10) y = vh - previewHeight - 10;
      if (y < 10) y = 10;

      setPosition({ x, y });
    }
  }, [cardRef]);

  /* TRAILER DELAY */
  useEffect(() => {
    trailerTimeoutRef.current = setTimeout(() => {
      setShowTrailer(true);
    }, 800);

    return () => clearTimeout(trailerTimeoutRef.current);
  }, []);

  const trailer =
    movieDetails?.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube') ||
    movieDetails?.videos?.results?.find(v => v.site === 'YouTube');

  const trailerUrl = trailer
    ? `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailer.key}`
    : null;

  const formatDuration = (m) => {
    if (!m) return '';
    const h = Math.floor(m / 60);
    const min = m % 60;
    return h ? `${h}h ${min}m` : `${min}m`;
  };

  const getCertification = () =>
    movieDetails?.adult ? 'A' : 'U/A 13+';

  const getGenresString = () =>
    movieDetails?.genres?.slice(0, 3).map(g => g.name).join(' • ') || '';

  return (
    <motion.div
      ref={previewRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className="fixed z-[9999] w-[350px] bg-[#181818] rounded-lg overflow-hidden cursor-pointer"
      style={{
        left: position.x,
        top: position.y,
        boxShadow: '0 8px 40px rgba(0, 0, 0, 0.8)',
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClickCapture={() => navigate(movieUrl)} // ✅ CLICK ANYWHERE
    >
      {/* VIDEO / IMAGE */}
      <div className="relative aspect-video bg-gray-900 overflow-hidden">
        {showTrailer && trailerUrl ? (
          <iframe
            src={trailerUrl}
            className="w-full h-full"
            allow="autoplay; encrypted-media"
          />
        ) : (
          <img
            src={getBackdropUrl(movie.backdrop_path) || getPosterUrl(movie.poster_path)}
            alt={movie.title || movie.name}
            className="w-full h-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent pointer-events-none" />
      </div>

      {/* INFO */}
      <div className="p-4">
        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-2 mb-3">
          <Link
            to={movieUrl}
            onClick={(e) => e.stopPropagation()}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center"
          >
            <FiPlay className="text-black" />
          </Link>

          <button
            onClick={(e) => e.stopPropagation()}
            className="w-10 h-10 border border-gray-500 rounded-full flex items-center justify-center"
          >
            <FiPlus />
          </button>

          <button
            onClick={(e) => e.stopPropagation()}
            className="w-10 h-10 border border-gray-500 rounded-full flex items-center justify-center"
          >
            <FiThumbsUp />
          </button>

          <Link
            to={movieUrl}
            onClick={(e) => e.stopPropagation()}
            className="ml-auto w-10 h-10 border border-gray-500 rounded-full flex items-center justify-center"
          >
            <FiChevronDown />
          </Link>
        </div>

        {/* META */}
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

        <div className="text-gray-300 text-sm mb-2">
          {getGenresString()}
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
