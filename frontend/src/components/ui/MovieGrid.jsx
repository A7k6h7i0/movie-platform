import PropTypes from 'prop-types';
import MovieCard from './MovieCard';
import SkeletonLoader from './SkeletonLoader';
import EmptyState from './EmptyState';

const MovieGrid = ({ movies, loading, error }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {Array.from({ length: 18 }).map((_, index) => (
          <SkeletonLoader key={index} type="card" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">{error.message || 'Failed to load movies'}</p>
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return <EmptyState message="No movies found" />;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

MovieGrid.propTypes = {
  movies: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.object
};

export default MovieGrid;
