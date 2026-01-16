import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const CrewCard = ({ person }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-primary-card rounded-lg p-4"
    >
      <p className="text-white font-medium">{person.name}</p>
      <p className="text-gray-400 text-sm">{person.job}</p>
    </motion.div>
  );
};

CrewCard.propTypes = {
  person: PropTypes.object.isRequired
};

export default CrewCard;
