import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAdvancedSearch, useWatchProviders } from '../hooks/useSearch';
import { useGenres } from '../hooks/useGenres';
import SEO from '../components/seo/SEO';
import SearchBar from '../components/ui/SearchBar';
import MovieGrid from '../components/ui/MovieGrid';
import Pagination from '../components/ui/Pagination';
import { motion, AnimatePresence } from 'framer-motion';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');

  // Fetch genres and providers
  const { data: genresData } = useGenres();
  const { data: providersData } = useWatchProviders();

  // Use advanced search with filters
  const { data, isLoading, error } = useAdvancedSearch({
    query,
    page,
    year: selectedYear || undefined,
    genre: selectedGenre || undefined,
    provider: selectedProvider || undefined,
    language: selectedLanguage || undefined
  });

  // Generate year options (current year to 1900)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);

  // Get popular providers for quick filter
  const popularProviders = providersData?.results?.slice(0, 20) || [];

  useEffect(() => {
    setPage(1);
  }, [query, selectedYear, selectedGenre, selectedProvider, selectedLanguage]);

  const handleClearFilters = () => {
    setSelectedYear('');
    setSelectedGenre('');
    setSelectedProvider('');
    setSelectedLanguage('');
  };

  const hasActiveFilters = selectedYear || selectedGenre || selectedProvider || selectedLanguage;

  return (
    <>
      <SEO
        title={`Search${query ? `: ${query}` : ''} - MovieHub`}
        description={`Search results for ${query || 'movies'}`}
      />

      <div className="container mx-auto px-4 py-12">
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar />
        </div>

        {/* Filter Toggle Button */}
        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="bg-primary-500 text-white text-xs px-2 py-0.5 rounded-full">
                Active
              </span>
            )}
          </button>

          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Year Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Release Year
                    </label>
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="" className="bg-gray-900">All Years</option>
                      {years.map((year) => (
                        <option key={year} value={year} className="bg-gray-900">
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Genre Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Genre
                    </label>
                    <select
                      value={selectedGenre}
                      onChange={(e) => setSelectedGenre(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="" className="bg-gray-900">All Genres</option>
                      {genresData?.genres?.map((genre) => (
                        <option key={genre.id} value={genre.id} className="bg-gray-900">
                          {genre.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* OTT Platform Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      OTT Platform
                    </label>
                    <select
                      value={selectedProvider}
                      onChange={(e) => setSelectedProvider(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="" className="bg-gray-900">All Platforms</option>
                      {popularProviders.map((provider) => (
                        <option key={provider.provider_id} value={provider.provider_id} className="bg-gray-900">
                          {provider.provider_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Language Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Language
                    </label>
                    <select
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="" className="bg-gray-900">All Languages</option>
                      <option value="en" className="bg-gray-900">English</option>
                      <option value="hi" className="bg-gray-900">Hindi</option>
                      <option value="te" className="bg-gray-900">Telugu</option>
                      <option value="ta" className="bg-gray-900">Tamil</option>
                      <option value="ml" className="bg-gray-900">Malayalam</option>
                      <option value="kn" className="bg-gray-900">Kannada</option>
                      <option value="bn" className="bg-gray-900">Bengali</option>
                      <option value="mr" className="bg-gray-900">Marathi</option>
                      <option value="pa" className="bg-gray-900">Punjabi</option>
                      <option value="gu" className="bg-gray-900">Gujarati</option>
                      <option value="or" className="bg-gray-900">Odia</option>
                      <option value="as" className="bg-gray-900">Assamese</option>
                      <option value="ur" className="bg-gray-900">Urdu</option>
                      <option value="es" className="bg-gray-900">Spanish</option>
                      <option value="fr" className="bg-gray-900">French</option>
                      <option value="de" className="bg-gray-900">German</option>
                      <option value="ja" className="bg-gray-900">Japanese</option>
                      <option value="ko" className="bg-gray-900">Korean</option>
                      <option value="zh" className="bg-gray-900">Chinese</option>
                    </select>
                  </div>
                </div>

                {/* Quick OTT Platform Selection */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Quick Select Platform
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {popularProviders.slice(0, 10).map((provider) => {
                    const logoUrl = provider.logo_path 
                    ? `https://image.tmdb.org/t/p/w92${provider.logo_path}` 
                    : null;
                    
                    const isSelected = selectedProvider === String(provider.provider_id);
                      
                      return (
                        <button
                          key={provider.provider_id}
                          onClick={() => setSelectedProvider(isSelected ? '' : String(provider.provider_id))}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                            isSelected 
                              ? 'bg-primary-500 text-white ring-2 ring-primary-400' 
                              : 'bg-white/10 hover:bg-white/20 text-gray-300'
                          }`}
                        >
                          {logoUrl && (
                            <img
                              src={logoUrl}
                              alt={provider.provider_name}
                              className="w-6 h-6 rounded object-cover"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          )}
                          <span className="text-sm">{provider.provider_name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Active Filters Summary */}
                {hasActiveFilters && (
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm text-gray-400">Active filters:</span>
                      {selectedYear && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm">
                          Year: {selectedYear}
                          <button
                            onClick={() => setSelectedYear('')}
                            className="hover:text-white"
                          >
                            ×
                          </button>
                        </span>
                      )}
                      {selectedGenre && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm">
                          Genre: {genresData?.genres?.find(g => g.id === Number(selectedGenre))?.name}
                          <button
                            onClick={() => setSelectedGenre('')}
                            className="hover:text-white"
                          >
                            ×
                          </button>
                        </span>
                      )}
                      {selectedProvider && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm">
                          Platform: {popularProviders.find(p => p.provider_id === Number(selectedProvider))?.provider_name}
                          <button
                            onClick={() => setSelectedProvider('')}
                            className="hover:text-white"
                          >
                            ×
                          </button>
                        </span>
                      )}
                      {selectedLanguage && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm">
                          Language: {selectedLanguage.toUpperCase()}
                          <button
                            onClick={() => setSelectedLanguage('')}
                            className="hover:text-white"
                          >
                            ×
                          </button>
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Section */}
        {(query || hasActiveFilters) && (
          <>
            <h1 className="section-title">
              {query ? `Search Results for "${query}"` : 'Browse Movies'}
              {hasActiveFilters && (
                <span className="text-gray-400 text-lg font-normal ml-2">
                  (filtered)
                </span>
              )}
            </h1>

            <MovieGrid 
              movies={data?.results} 
              loading={isLoading} 
              error={error}
            />

            {data && data.total_pages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={Math.min(data.total_pages, 500)}
                onPageChange={setPage}
              />
            )}
          </>
        )}

        {/* Empty State when no query and no filters */}
        {!query && !hasActiveFilters && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎬</div>
            <h2 className="text-2xl font-bold text-white mb-2">Search for Movies</h2>
            <p className="text-gray-400 mb-6">
              Enter a movie title or use filters to discover movies by year, genre, or streaming platform
            </p>
            <button
              onClick={() => setShowFilters(true)}
              className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
            >
              Browse with Filters
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchPage;
