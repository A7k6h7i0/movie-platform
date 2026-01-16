import { useState } from 'react';
import { useMovies } from '../hooks/useMovies';
import SEO from '../components/seo/SEO';
import HeroBanner from '../components/ui/HeroBanner';
import MovieCarousel from '../components/ui/MovieCarousel';
import SkeletonLoader from '../components/ui/SkeletonLoader';
import ErrorState from '../components/ui/ErrorState';
import OTTGrid from '../components/ui/OTTGrid';

const Home = () => {
  const [heroIndex] = useState(0);
  
  const { data: trendingData, isLoading: trendingLoading, error: trendingError } = useMovies('trending');
  const { data: popularData, isLoading: popularLoading } = useMovies('popular');
  const { data: topRatedData, isLoading: topRatedLoading } = useMovies('topRated');
  const { data: upcomingData, isLoading: upcomingLoading } = useMovies('upcoming');

  if (trendingError) {
    return <ErrorState message={trendingError.message} />;
  }

  return (
    <>
      <SEO
        title="MovieHub - Discover Trending Movies & TV Shows"
        description="Explore trending movies, popular films, top-rated content, and upcoming releases. Find where to watch on Netflix, Prime, Disney+ and more."
      />

      {trendingLoading ? (
        <SkeletonLoader type="hero" />
      ) : (
        <HeroBanner movie={trendingData?.results?.[heroIndex]} />
      )}

      <div className="container mx-auto px-4 py-12 space-y-12">
        {/* OTT Platforms Grid */}
        <OTTGrid title="Streaming Platforms" showEditButton={true} />

        {trendingLoading ? (
          <div className="grid grid-cols-6 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonLoader key={i} />
            ))}
          </div>
        ) : (
          <MovieCarousel movies={trendingData?.results?.slice(0, 12)} title="Trending Now" />
        )}

        {popularLoading ? null : (
          <MovieCarousel movies={popularData?.results?.slice(0, 12)} title="Popular Movies" />
        )}

        {topRatedLoading ? null : (
          <MovieCarousel movies={topRatedData?.results?.slice(0, 12)} title="Top Rated" />
        )}

        {upcomingLoading ? null : (
          <MovieCarousel movies={upcomingData?.results?.slice(0, 12)} title="Coming Soon" />
        )}
      </div>
    </>
  );
};

export default Home;
