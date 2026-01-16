import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { OTT_PLATFORMS } from '../../utils/constants';

const PlatformBadge = ({ providerId }) => {
  const platform = OTT_PLATFORMS[providerId];
  
  if (!platform) return null;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center space-x-2 transition-colors"
    >
      <span className="text-2xl">{platform.logo}</span>
      <span className="text-white font-medium text-sm">{platform.name}</span>
    </motion.div>
  );
};

PlatformBadge.propTypes = {
  providerId: PropTypes.number.isRequired
};

export default PlatformBadge;
