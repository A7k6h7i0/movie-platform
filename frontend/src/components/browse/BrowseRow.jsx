import MovieCard from "../ui/MovieCard";

const BrowseRow = ({ title, movies }) => {
  if (!movies.length) return null;

  return (
    <div className="mb-8">
      {title && <h2 className="text-xl font-semibold mb-3">{title}</h2>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <div key={movie.id}>
            <MovieCard movie={movie} showTrailerOnHover={true} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseRow;
