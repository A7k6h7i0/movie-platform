import PropTypes from 'prop-types';

const SkeletonLoader = ({ type = 'card' }) => {
  if (type === 'card') {
    return (
      <div className="animate-pulse">
        <div className="aspect-[2/3] bg-gray-700/50 rounded-xl mb-3" />
        <div className="h-4 bg-gray-700/50 rounded w-3/4 mb-2" />
        <div className="h-3 bg-gray-700/50 rounded w-1/2" />
      </div>
    );
  }

  if (type === 'hero') {
    return (
      <div className="h-[70vh] md:h-[80vh] bg-gray-800 animate-pulse">
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl space-y-4">
            <div className="h-12 bg-gray-700 rounded w-3/4" />
            <div className="h-6 bg-gray-700 rounded w-1/2" />
            <div className="h-4 bg-gray-700 rounded w-full" />
            <div className="h-4 bg-gray-700 rounded w-5/6" />
            <div className="flex space-x-4 mt-6">
              <div className="h-12 bg-gray-700 rounded w-32" />
              <div className="h-12 bg-gray-700 rounded w-32" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'detail') {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-[50vh] bg-gray-800 rounded-xl" />
        <div className="h-8 bg-gray-700 rounded w-1/2" />
        <div className="h-6 bg-gray-700 rounded w-1/3" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-700 rounded w-full" />
          <div className="h-4 bg-gray-700 rounded w-5/6" />
          <div className="h-4 bg-gray-700 rounded w-4/6" />
        </div>
      </div>
    );
  }

  return null;
};

SkeletonLoader.propTypes = {
  type: PropTypes.oneOf(['card', 'hero', 'detail'])
};

export default SkeletonLoader;
