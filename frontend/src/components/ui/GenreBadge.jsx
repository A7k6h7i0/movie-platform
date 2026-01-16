import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const GenreBadge = ({ genre }) => {
  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className="inline-block bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1.5 rounded-full font-medium transition-colors cursor-default"
    >
      {genre}
    </motion.span>
  );
};

GenreBadge.propTypes = {
  genre: PropTypes.string.isRequired
};

export default GenreBadge;
