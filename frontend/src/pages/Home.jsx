import { useState } from 'react';
import { useMovies } from '../hooks/useMovies';
import SEO from '../components/seo/SEO';
import HeroSection from '../components/ui/Hero/HeroSection';
import MovieCarousel from '../components/ui/MovieCarousel';
import SkeletonLoader from '../components/ui/SkeletonLoader';
import ErrorState from '../components/ui/ErrorState';
import OTTGrid from '../components/ui/OTTGrid';
import GenreSection from '../components/ui/GenreSection';
import MultiGenreSection from '../components/ui/MultiGenreSection';
import RegionalSection from '../components/ui/RegionalSection';
import TopTenSection from '../components/ui/TopTenSection';

const Home = () => {
  const { data: trendingData, isLoading: trendingLoading, error } =
    useMovies('trending');
  const { data: popularData, isLoading: popularLoading } = useMovies('popular');
  const { data: upcomingData, isLoading: upcomingLoading } = useMovies('upcoming');
  const { data: topRatedData, isLoading: topRatedLoading } = useMovies('topRated');

  if (error) return <ErrorState message={error.message} />;

  return (
    <>
      <SEO
        title="MovieHub - Discover Movies"
        description="Explore trending, popular, and genre-based movies."
      />

      {/* HERO */}
      {trendingLoading ? (
        <SkeletonLoader type="hero" />
      ) : (
        <HeroSection movies={trendingData?.results?.slice(0, 20)} />
      )}

      {/* OTT */}
      <div className="px-4 md:px-8 lg:px-16 py-2">
        <OTTGrid title="Streaming Platforms" />
      </div>

      {/* CORE SECTIONS */}
      {trendingLoading ? (
        <div className="px-6 md:px-10 lg:px-16 py-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Trending Now</h2>
          <div className="flex gap-4 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <SkeletonLoader key={i} type="card" />
            ))}
          </div>
        </div>
      ) : (
        trendingData?.results && (
          <div className="px-6 md:px-10 lg:px-16">
            <MovieCarousel
              title="Trending Now"
              movies={trendingData.results.slice(0, 12)}
            />
          </div>
        )
      )}

      {upcomingLoading ? (
        <div className="px-6 md:px-10 lg:px-16 py-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Coming Soon</h2>
          <div className="flex gap-4 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <SkeletonLoader key={i} type="card" />
            ))}
          </div>
        </div>
      ) : (
        upcomingData?.results && (
          <div className="px-6 md:px-10 lg:px-16">
            <MovieCarousel
              title="Coming Soon"
              movies={upcomingData.results.slice(0, 12)}
            />
          </div>
        )
      )}

      {popularLoading ? (
        <div className="px-6 md:px-10 lg:px-16 py-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Popular Movies</h2>
          <div className="flex gap-4 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <SkeletonLoader key={i} type="card" />
            ))}
          </div>
        </div>
      ) : (
        popularData?.results && (
          <div className="px-6 md:px-10 lg:px-16">
            <MovieCarousel
              title="Popular Movies"
              movies={popularData.results.slice(0, 12)}
            />
          </div>
        )
      )}

      {topRatedLoading ? (
        <div className="px-6 md:px-10 lg:px-16 py-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Top Rated</h2>
          <div className="flex gap-4 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <SkeletonLoader key={i} type="card" />
            ))}
          </div>
        </div>
      ) : (
        topRatedData?.results && (
          <div className="px-6 md:px-10 lg:px-16">
            <MovieCarousel
              title="Top Rated"
              movies={topRatedData.results.slice(0, 12)}
            />
          </div>
        )
      )}

      {/* 🇮🇳 TOP 10 MOVIES IN INDIA TODAY - NETFLIX STYLE */}
      <TopTenSection title="Top 10 Movies in India Today" />

      {/* 🎬 SOUTH INDIAN MOVIES */}
      <RegionalSection title="South Indian Movies" category="southIndian" />

      {/* 🎯 COMBINED ACTION + THRILLER SECTION */}
      <MultiGenreSection title="Action & Thriller Movies" genreIds={[28, 53]} />

      {/* 🎭 PRIMARY GENRE SECTIONS */}
      <GenreSection title="Adventure Movies" genreId={12} />
      <GenreSection title="Comedy Movies" genreId={35} />
      <GenreSection title="Drama Movies" genreId={18} />
      <GenreSection title="Horror Movies" genreId={27} />

      {/* 💕 EMOTIONAL & MOOD-BASED SECTIONS */}
      <GenreSection title="Romance Movies" genreId={10749} />
      <GenreSection title="Mystery Movies" genreId={9648} />
      <GenreSection title="Crime Movies" genreId={80} />
      <GenreSection title="War Movies" genreId={10752} />

      {/* 🌟 FANTASY & SCI-FI SECTIONS */}
      <GenreSection title="Sci-Fi Movies" genreId={878} />
      <GenreSection title="Fantasy Movies" genreId={14} />
      <GenreSection title="Animation Movies" genreId={16} />

      {/* 👨‍👩‍👧‍👦 FAMILY & SPECIAL INTEREST */}
      <GenreSection title="Family Movies" genreId={10751} />
      <GenreSection title="Music Movies" genreId={10402} />
      <GenreSection title="Western Movies" genreId={37} />
      <GenreSection title="History Movies" genreId={36} />
      <GenreSection title="Documentary Movies" genreId={99} />
    </>
  );
};

export default Home;
