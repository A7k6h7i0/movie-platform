import PropTypes from 'prop-types';
import { formatRating, getRatingColor, getRatingBgColor } from '../../utils/ratingFormatter';

const RatingBadge = ({ rating, size = 'sm' }) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2'
  };

  return (
    <div className={`${getRatingBgColor(rating)} ${sizeClasses[size]} rounded-lg backdrop-blur-sm flex items-center space-x-1 font-bold`}>
      <span className={getRatingColor(rating)}>⭐</span>
      <span className="text-white">{formatRating(rating)}</span>
    </div>
  );
};

RatingBadge.propTypes = {
  rating: PropTypes.number.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg'])
};

export default RatingBadge;
