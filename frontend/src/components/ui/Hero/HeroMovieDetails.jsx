import PropTypes from "prop-types";
import { motion } from "framer-motion";

const HeroMovieDetails = ({ movie }) => {
  if (!movie) return null;

  const match = Math.min(95, Math.round(movie.vote_average * 10));

  return (
    <motion.div
      key={movie.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="mt-4 max-w-[500px]"
    >
      {/* MATCH + BADGES */}
      <div className="flex items-center gap-3 text-sm mb-2">
        <span className="text-green-400 font-semibold">
          {match}% Match
        </span>
        <span className="border border-gray-400 text-gray-200 px-1 text-xs rounded">
          U/A
        </span>
        <span className="border border-gray-400 text-gray-200 px-1 text-xs rounded">
          HD
        </span>
      </div>

      {/* DESCRIPTION */}
      <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
        {movie.overview || "No description available."}
      </p>

      {/* META */}
      <div className="mt-2 text-xs text-gray-400 flex gap-4">
        <span>⭐ {movie.vote_average.toFixed(1)}</span>
        <span>{movie.release_date?.slice(0, 4)}</span>
        <span>{movie.original_language?.toUpperCase()}</span>
      </div>
    </motion.div>
  );
};

HeroMovieDetails.propTypes = {
  movie: PropTypes.object,
};

export default HeroMovieDetails;
