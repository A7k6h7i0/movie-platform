import PropTypes from 'prop-types';

const SkeletonLoader = ({ type = 'card' }) => {
  if (type === 'hero') {
    return (
      <div className="relative h-[60vh] md:h-[80vh] bg-gradient-to-r from-gray-800 to-gray-700 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 md:p-16 space-y-4 w-full max-w-2xl">
          <div className="h-12 bg-gray-600 rounded w-3/4 animate-pulse" />
          <div className="h-6 bg-gray-600 rounded w-1/2 animate-pulse" />
          <div className="h-4 bg-gray-600 rounded w-full animate-pulse" />
          <div className="h-4 bg-gray-600 rounded w-5/6 animate-pulse" />
        </div>
      </div>
    );
  }

  if (type === 'detail') {
    return (
      <div className="min-h-screen bg-black">
        <div className="h-96 bg-gradient-to-r from-gray-800 to-gray-700 animate-pulse" />
        <div className="px-6 md:px-16 py-8 space-y-6">
          <div className="h-10 bg-gray-700 rounded w-1/3 animate-pulse" />
          <div className="h-6 bg-gray-700 rounded w-1/4 animate-pulse" />
          <div className="h-4 bg-gray-700 rounded w-full animate-pulse" />
          <div className="h-4 bg-gray-700 rounded w-5/6 animate-pulse" />
        </div>
      </div>
    );
  }

  if (type === 'carousel') {
    return (
      <div className="flex gap-4 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[180px] md:w-[200px] space-y-2"
          >
            <div className="aspect-[2/3] bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg animate-pulse" />
            <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse" />
            <div className="h-3 bg-gray-700 rounded w-1/2 animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  // Default: card type
  return (
    <div className="flex-shrink-0 w-[180px] md:w-[200px] space-y-2">
      <div className="aspect-[2/3] bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg animate-pulse" />
      <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse" />
      <div className="h-3 bg-gray-700 rounded w-1/2 animate-pulse" />
    </div>
  );
};

SkeletonLoader.propTypes = {
  type: PropTypes.oneOf(['card', 'hero', 'detail', 'carousel']),
};

export default SkeletonLoader;
