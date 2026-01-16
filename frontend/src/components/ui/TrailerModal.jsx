import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import PropTypes from 'prop-types';

const TrailerModal = ({ isOpen, onClose, videoKey }) => {
  if (!videoKey) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute -top-12 right-0 text-white hover:text-primary-accent transition-colors"
              >
                <FiX size={32} />
              </button>
              
              <iframe
                src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
                title="Movie Trailer"
                className="w-full h-full rounded-xl"
                allowFullScreen
                allow="autoplay; encrypted-media"
              />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

TrailerModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  videoKey: PropTypes.string
};

export default TrailerModal;
