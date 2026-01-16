import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FiFilm } from 'react-icons/fi';

const EmptyState = ({ message = 'No results found' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20"
    >
      <FiFilm className="text-gray-600 mb-4" size={64} />
      <p className="text-gray-400 text-xl">{message}</p>
    </motion.div>
  );
};

EmptyState.propTypes = {
  message: PropTypes.string
};

export default EmptyState;
