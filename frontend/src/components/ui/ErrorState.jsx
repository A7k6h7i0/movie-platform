import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FiAlertCircle } from 'react-icons/fi';

const ErrorState = ({ message = 'Something went wrong', onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20"
    >
      <FiAlertCircle className="text-red-500 mb-4" size={64} />
      <h3 className="text-white text-2xl font-bold mb-2">Oops!</h3>
      <p className="text-gray-400 text-lg mb-6">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary">
          Try Again
        </button>
      )}
    </motion.div>
  );
};

ErrorState.propTypes = {
  message: PropTypes.string,
  onRetry: PropTypes.func
};

export default ErrorState;
