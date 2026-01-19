import { useState, useEffect } from 'react';
import SEO from '../components/seo/SEO';
import MovieGrid from '../components/ui/MovieGrid';
import Pagination from '../components/ui/Pagination';
import { discoverMovies, fetchPopularMovies } from '../api/tmdb';

/**
 * Browse By Language
 * SAME UI as PopularMovies
 * LOGIC FIXED using TMDB Discover API
 */
const BrowseByLanguage = () => {
  const [page, setPage] = useState(1);
  const [language, setLanguage] = useState('all');

  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch movies correctly based on language
   */
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        let data;

        // ✅ ALL LANGUAGES → POPULAR
        if (language === 'all') {
          data = await fetchPopularMovies(page);
        }
        // ✅ SPECIFIC LANGUAGE → DISCOVER (CORRECT)
        else {
          data = await discoverMovies({
            page,
            language
          });
        }

        setMovies(data?.results || []);
        setTotalPages(Math.min(data?.total_pages || 1, 500));
      } catch (err) {
        setError('Failed to load movies');
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [language, page]);

  return (
    <>
      <SEO
        title="Browse Movies by Language - MovieHub"
        description="Browse movies by language with the same experience as Popular Movies."
      />

      <div className="container mx-auto px-4 py-12">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h1 className="section-title">
            🌍 Browse Movies by Language
          </h1>

          {/* LANGUAGE SELECT (UI UNCHANGED) */}
          <select
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value);
              setPage(1);
            }}
            className="bg-primary-card text-white px-4 py-2 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-primary-accent"
          >
            <option value="all">All Languages</option>
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="ta">Tamil</option>
            <option value="te">Telugu</option>
            <option value="ml">Malayalam</option>
            <option value="kn">Kannada</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
            <option value="fr">French</option>
          </select>
        </div>

        {/* MOVIE GRID (UNCHANGED) */}
        <MovieGrid
          movies={movies}
          loading={loading}
          error={error}
        />

        {/* PAGINATION */}
        {!loading && movies.length > 0 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}

        {/* EMPTY STATE */}
        {!loading && movies.length === 0 && (
          <p className="text-center text-gray-400 mt-10">
            No movies found for this language.
          </p>
        )}
      </div>
    </>
  );
};

export default BrowseByLanguage;
