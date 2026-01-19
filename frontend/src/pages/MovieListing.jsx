import { useState } from 'react';
import { useMovies } from '../hooks/useMovies';
import { useGenres } from '../hooks/useGenres';
import SEO from '../components/seo/SEO';
import MovieGrid from '../components/ui/MovieGrid';
import Pagination from '../components/ui/Pagination';

const MovieListing = () => {
  const [page, setPage] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');

  const { data, isLoading, error } = useMovies('popular', page);
  const { data: genresData } = useGenres();

  const years = Array.from({ length: 30 }, (_, i) => 2025 - i);

  const handleGenreToggle = (genreId) => {
    setSelectedGenres(prev =>
      prev.includes(genreId)
        ? prev.filter(id => id !== genreId)
        : [...prev, genreId]
    );
  };

  return (
    <>
      <SEO
        title="Browse Movies - MovieHub"
        description="Browse our extensive collection of movies with advanced filtering options."
      />

      <div className="container mx-auto px-4 py-12">
        <h1 className="section-title">📋 Browse Movies</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          

          <div className="lg:col-span-3">
            <MovieGrid 
              movies={data?.results} 
              loading={isLoading} 
              error={error}
            />

            {data && (
              <Pagination
                currentPage={page}
                totalPages={Math.min(data.total_pages, 500)}
                onPageChange={setPage}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieListing;
