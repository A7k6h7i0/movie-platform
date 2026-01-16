import { useState } from 'react';
import { useMovies } from '../hooks/useMovies';
import SEO from '../components/seo/SEO';
import MovieGrid from '../components/ui/MovieGrid';
import Pagination from '../components/ui/Pagination';

const TopRatedMovies = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useMovies('topRated', page);

  return (
    <>
      <SEO
        title="Top Rated Movies - MovieHub"
        description="Explore the highest-rated movies of all time, critically acclaimed and audience favorites."
      />

      <div className="container mx-auto px-4 py-12">
        <h1 className="section-title">🏆 Top Rated Movies</h1>
        
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

export default TopRatedMovies;
