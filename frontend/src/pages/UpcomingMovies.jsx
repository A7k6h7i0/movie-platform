import { useState } from 'react';
import { useMovies } from '../hooks/useMovies';
import SEO from '../components/seo/SEO';
import MovieGrid from '../components/ui/MovieGrid';
import Pagination from '../components/ui/Pagination';

const UpcomingMovies = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useMovies('upcoming', page);

  return (
    <>
      <SEO
        title="Upcoming Movies - MovieHub"
        description="Get a sneak peek at upcoming movie releases. Never miss a premiere!"
      />

      <div className="container mx-auto px-4 py-12">
        <h1 className="section-title">🎬 Upcoming Movies</h1>
        
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

export default UpcomingMovies;
