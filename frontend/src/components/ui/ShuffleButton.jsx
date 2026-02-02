import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const ShuffleButton = ({ onClick, isLoading = false, showSuggestions = false }) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={isLoading}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        flex items-center justify-center gap-1.5 px-3 py-2 rounded-full font-semibold transition-all duration-300
        ${showSuggestions 
          ? 'bg-gray-700 hover:bg-gray-600 text-white' 
          : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/30'
        }
        disabled:opacity-50 disabled:cursor-not-allowed
        text-sm
      `}
      title={showSuggestions ? 'Hide Suggestions' : 'Get Movie Suggestion'}
    >
      <motion.svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        animate={isLoading ? { rotate: 360 } : { rotate: 0 }}
        transition={isLoading ? { duration: 1, repeat: Infinity, ease: 'linear' } : { duration: 0.3 }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </motion.svg>
      <span className="hidden xs:inline">
        {isLoading ? '...' : showSuggestions ? 'Hide' : 'Shuffle'}
      </span>
    </motion.button>
  );
};

ShuffleButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  showSuggestions: PropTypes.bool
};

export default ShuffleButton;
