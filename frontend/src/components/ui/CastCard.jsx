import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { getProfileUrl } from '../../utils/imageHelper';

const CastCard = ({ person }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.2 }}
      className="flex-none w-40 bg-primary-card rounded-xl overflow-hidden shadow-lg"
    >
      <div className="relative aspect-[3/4] bg-gray-800">
        <img
          src={getProfileUrl(person.profile_path, 'medium')}
          alt={person.name}
          loading="lazy"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&size=200&background=E50914&color=fff&bold=true`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>
      
      <div className="p-3 space-y-1">
        <p style={{ color: '#FFFFFF' }} className="text-sm font-bold line-clamp-2 leading-tight">
          {person.name}
        </p>
        <p style={{ color: '#D1D5DB' }} className="text-xs font-medium line-clamp-2 leading-tight">
          {person.character}
        </p>
      </div>
    </motion.div>
  );
};

CastCard.propTypes = {
  person: PropTypes.object.isRequired
};

export default CastCard;
