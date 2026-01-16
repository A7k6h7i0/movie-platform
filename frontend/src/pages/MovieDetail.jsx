import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMovieDetail } from '../hooks/useMovieDetail';
import { fetchMovieProviders } from '../api/tmdb';
import SEO from '../components/seo/SEO';
import { getBackdropUrl, getPosterUrl } from '../utils/imageHelper';
import { formatDate, formatRuntime } from '../utils/dateFormatter';
import RatingBadge from '../components/ui/RatingBadge';
import GenreBadge from '../components/ui/GenreBadge';
import CastCard from '../components/ui/CastCard';
import OTTPlatformBadge from '../components/ui/OTTPlatformBadge';
import TrailerModal from '../components/ui/TrailerModal';
import SkeletonLoader from '../components/ui/SkeletonLoader';
import ErrorState from '../components/ui/ErrorState';
import MovieCarousel from '../components/ui/MovieCarousel';

const MovieDetail = () => {
  const { id } = useParams();
  const { data: movie, isLoading, error } = useMovieDetail(id);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [providers, setProviders] = useState(null);
  const [loadingProviders, setLoadingProviders] = useState(true);

  useEffect(() => {
    if (id) {
      setLoadingProviders(true);
      fetchMovieProviders(id)
        .then(data => setProviders(data))
        .catch(err => console.error('Providers error:', err))
        .finally(() => setLoadingProviders(false));
    }
  }, [id]);

  if (isLoading) return <div className="container mx-auto px-4 py-12"><SkeletonLoader type="detail" /></div>;
  if (error) return <ErrorState message={error.message} />;
  if (!movie) return <ErrorState message="Movie not found" />;

  const trailerKey = movie.videos?.results?.find(v => v.type === 'Trailer')?.key;
  
  // Get providers from all countries
  const allProviders = [];
  if (providers?.results) {
    Object.entries(providers.results).forEach(([countryCode, countryData]) => {
      const streaming = countryData.flatrate || [];
      const rent = countryData.rent || [];
      const buy = countryData.buy || [];
      const countryProviders = [...streaming, ...rent, ...buy];
      
      countryProviders.forEach(provider => {
        provider.country = countryCode;
        provider.type = streaming.includes(provider) ? 'Stream' : 
                        rent.includes(provider) ? 'Rent' : 'Buy';
      });
      allProviders.push(...countryProviders);
    });
  }

  const uniqueProviders = allProviders.filter((provider, index, self) =>
    index === self.findIndex((p) => p.provider_id === provider.provider_id)
  );

  return (
    <>
      <SEO
        title={`${movie.title} (${new Date(movie.release_date).getFullYear()}) - MovieHub`}
        description={movie.overview}
        image={getPosterUrl(movie.poster_path, 'large')}
      />

      {/* Hero Section */}
      <div className="relative min-h-screen">
        {/* Backdrop */}
        <div
          className="absolute top-0 left-0 w-full h-[60vh] md:h-[70vh] bg-cover bg-center"
          style={{ backgroundImage: `url(${getBackdropUrl(movie.backdrop_path, 'original')})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 pt-32 md:pt-40 pb-12">
          {/* Movie Header */}
          <div className="flex flex-col lg:flex-row gap-6 md:gap-8 mb-12">
            {/* Poster */}
            <div className="flex-shrink-0 w-full sm:w-64 md:w-72 lg:w-80 mx-auto lg:mx-0">
              <img
                src={getPosterUrl(movie.poster_path, 'large')}
                alt={movie.title}
                className="w-full rounded-xl shadow-2xl"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/no-poster.svg';
                }}
              />
            </div>

            {/* Movie Info */}
            <div className="flex-1 space-y-4 md:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {movie.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-3 md:gap-4">
                <RatingBadge rating={movie.vote_average} size="lg" />
                <span className="text-white text-base md:text-lg font-medium">
                  {formatDate(movie.release_date)}
                </span>
                <span className="text-white text-base md:text-lg font-medium">
                  {formatRuntime(movie.runtime)}
                </span>
                <span className="text-white text-base md:text-lg font-medium bg-white/10 px-2 py-1 rounded">
                  {movie.original_language?.toUpperCase()}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {movie.genres?.map(genre => (
                  <GenreBadge key={genre.id} genre={genre.name} />
                ))}
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">
                  Overview
                </h2>
                <p className="text-white text-base md:text-lg leading-relaxed">
                  {movie.overview || 'No overview available.'}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 md:gap-4">
                {trailerKey && (
                  <button onClick={() => setTrailerOpen(true)} className="btn-primary text-sm md:text-base">
                    ▶️ Watch Trailer
                  </button>
                )}
                <button className="btn-secondary text-sm md:text-base">
                  + Add to Watchlist
                </button>
              </div>
            </div>
          </div>

          {/* OTT Platforms */}
          {!loadingProviders && uniqueProviders.length > 0 && (
            <div className="mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">
                Available on Streaming Platforms
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
                {uniqueProviders.map((provider) => (
                  <OTTPlatformBadge key={`${provider.provider_id}-${provider.country}`} provider={provider} />
                ))}
              </div>
              <p className="text-gray-300 text-sm md:text-base mt-4 font-medium">
                Showing {uniqueProviders.length} streaming platform{uniqueProviders.length !== 1 ? 's' : ''} available worldwide
              </p>
            </div>
          )}

          {!loadingProviders && uniqueProviders.length === 0 && (
            <div className="mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">
                Streaming Information
              </h2>
              <p className="text-white text-base md:text-lg">
                Currently not available on streaming platforms. Check back later!
              </p>
            </div>
          )}

          {/* Cast */}
          {movie.credits?.cast && movie.credits.cast.length > 0 && (
            <div className="mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">
                Cast
              </h2>
              <div className="flex space-x-3 md:space-x-4 overflow-x-auto hide-scrollbar pb-4">
                {movie.credits.cast.slice(0, 15).map(person => (
                  <CastCard key={person.id} person={person} />
                ))}
              </div>
            </div>
          )}

          {/* Similar Movies */}
          {movie.similar?.results && movie.similar.results.length > 0 && (
            <div className="mb-12">
              <MovieCarousel movies={movie.similar.results.slice(0, 12)} title="Similar Movies" />
            </div>
          )}
        </div>
      </div>

      <TrailerModal
        isOpen={trailerOpen}
        onClose={() => setTrailerOpen(false)}
        videoKey={trailerKey}
      />
    </>
  );
};

export default MovieDetail;
