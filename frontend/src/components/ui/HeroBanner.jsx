import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getBackdropUrl } from '../../utils/imageHelper';
import { ROUTES } from '../../utils/constants';
import RatingBadge from './RatingBadge';

const HeroBanner = ({ movie }) => {
  if (!movie) return null;

  const movieUrl = ROUTES.movieDetail(movie.id, movie.title || movie.name);

  return (
    <div className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${getBackdropUrl(movie.backdrop_path, 'original')})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-transparent to-transparent" />
      </div>

      <div className="relative container mx-auto px-4 h-full flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 text-shadow">
            {movie.title || movie.name}
          </h1>
          
          <div className="flex items-center space-x-4 mb-6">
            <RatingBadge rating={movie.vote_average} size="md" />
            <span className="text-gray-300">
              {new Date(movie.release_date || movie.first_air_date).getFullYear()}
            </span>
          </div>

          <p className="text-gray-200 text-lg mb-8 line-clamp-3 text-shadow">
            {movie.overview}
          </p>

          <div className="flex space-x-4">
            <Link to={movieUrl} className="btn-primary">
              View Details
            </Link>
            <button className="btn-secondary">
              Watch Trailer
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

HeroBanner.propTypes = {
  movie: PropTypes.object
};

export default HeroBanner;
