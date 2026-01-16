import { useState } from 'react';
import { useMovies } from '../hooks/useMovies';
import SEO from '../components/seo/SEO';
import MovieGrid from '../components/ui/MovieGrid';
import Pagination from '../components/ui/Pagination';

const TrendingMovies = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useMovies('trending', page);

  return (
    <>
      <SEO
        title="Trending Movies - MovieHub"
        description="Discover what's trending in movies right now. Stay updated with the latest popular films."
      />

      <div className="container mx-auto px-4 py-12">
        <h1 className="section-title">🔥 Trending Movies</h1>
        
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
    </>
  );
};

export default TrendingMovies;
