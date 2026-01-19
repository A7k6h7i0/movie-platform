import { useDiscoverMovies } from '../../hooks/useDiscoverMovies';
import MovieCarousel from './MovieCarousel';
import SkeletonLoader from './SkeletonLoader';

const GenreSection = ({ title, genreId }) => {
  const { data, isLoading, error } = useDiscoverMovies({ genre: genreId, page: 1 });

  if (isLoading) {
    return (
      <div className="px-6 md:px-10 lg:px-16 py-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">{title}</h2>
        <div className="flex gap-4 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <SkeletonLoader key={i} type="card" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !data?.results?.length) {
    return null;
  }

  return (
    <div className="px-6 md:px-10 lg:px-16">
      <MovieCarousel
        title={title}
        movies={data.results.slice(0, 12)}
      />
    </div>
  );
};

export default GenreSection;
