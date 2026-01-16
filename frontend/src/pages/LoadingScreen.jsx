import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-dark">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="text-6xl mb-4"
        >
          🎬
        </motion.div>
        <h2 className="text-2xl font-bold text-white">Loading...</h2>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
