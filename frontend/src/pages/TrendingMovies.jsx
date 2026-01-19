import { useMovies } from '../hooks/useMovies';
import SEO from '../components/seo/SEO';
import MovieCarousel from '../components/ui/MovieCarousel';

const TrendingMovies = () => {
  const { data, isLoading, error } = useMovies('trending');

  if (error) {
    return <div className="container mx-auto px-4 py-12">Error loading movies</div>;
  }

  return (
    <>
      <SEO
        title="Trending Movies - MovieHub"
        description="Discover what's trending in movies right now. Stay updated with the latest popular films."
      />

      <div className="min-h-screen bg-black">
        {/* Hero-like section with featured movie */}
        {isLoading ? (
          <div className="h-screen bg-gray-800 animate-pulse" />
        ) : (
          <MovieCarousel
            movies={data?.results?.slice(0, 12)}
            title="🔥 Trending Movies"
            featuredLayout={true}
          />
        )}
      </div>
    </>
  );
};

export default TrendingMovies;
