import { useState } from 'react';
import { useMovies } from '../hooks/useMovies';
import SEO from '../components/seo/SEO';
import HeroSection from '../components/ui/Hero/HeroSection';
import MovieCarousel from '../components/ui/MovieCarousel';
import SkeletonLoader from '../components/ui/SkeletonLoader';
import ErrorState from '../components/ui/ErrorState';
import OTTGrid from '../components/ui/OTTGrid';

const Home = () => {
  const [heroIndex] = useState(0);

  const { data: trendingData, isLoading: trendingLoading, error: trendingError } =
    useMovies('trending');
  const { data: popularData, isLoading: popularLoading } =
    useMovies('popular');
  const { data: topRatedData, isLoading: topRatedLoading } =
    useMovies('topRated');
  const { data: upcomingData, isLoading: upcomingLoading } =
    useMovies('upcoming');

  if (trendingError) {
    return <ErrorState message={trendingError.message} />;
  }

  return (
    <>
      <SEO
        title="MovieHub - Discover Trending Movies & TV Shows"
        description="Explore trending movies, popular films, top-rated content, and upcoming releases."
      />

      {/* HERO SECTION */}
      {trendingLoading ? (
        <SkeletonLoader type="hero" />
      ) : (
        <HeroSection movies={trendingData?.results?.slice(0, 20)} />
      )}

      {/* OTT PLATFORMS */}
      <div className="px-4 md:px-8 lg:px-16 py-4">
        <OTTGrid title="Streaming Platforms" showEditButton={true} />
      </div>

      {/* TRENDING NOW — FIXED STYLE */}
      {trendingLoading ? (
        <div className="px-6 md:px-10 lg:px-16 py-8">
          <div className="grid grid-cols-6 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonLoader key={i} />
            ))}
          </div>
        </div>
      ) : (
        <div className="px-6 md:px-10 lg:px-16">
          <MovieCarousel
            movies={trendingData?.results?.slice(0, 12)}
            title="Trending Now"
          />
        </div>
      )}

      {/* COMING SOON */}
      {!upcomingLoading && (
        <div className="px-6 md:px-10 lg:px-16">
          <MovieCarousel
            movies={upcomingData?.results?.slice(0, 12)}
            title="Coming Soon"
          />
        </div>
      )}

      {/* POPULAR */}
      {!popularLoading && (
        <div className="px-6 md:px-10 lg:px-16">
          <MovieCarousel
            movies={popularData?.results?.slice(0, 12)}
            title="Popular Movies"
          />
        </div>
      )}

      {/* TOP RATED */}
      {!topRatedLoading && (
        <div className="px-6 md:px-10 lg:px-16">
          <MovieCarousel
            movies={topRatedData?.results?.slice(0, 12)}
            title="Top Rated"
          />
        </div>
      )}
    </>
  );
};

export default Home;
