const HeroMovieDetails = ({ movie }) => {
  if (!movie) return null;

  return (
    <div className="mt-3 max-w-full md:max-w-[500px]">
      <div className="flex flex-wrap items-center gap-2 text-xs mb-2">
        <span className="text-green-400 font-semibold">72% Match</span>
        <span className="border px-2 rounded">U/A</span>
        <span className="border px-2 rounded">HD</span>
      </div>

      <p className="
        text-gray-300 text-sm leading-relaxed
        break-words
        line-clamp-3
      ">
        {movie.overview}
      </p>

      <div className="flex flex-wrap gap-3 text-xs text-gray-400 mt-2">
        <span>⭐ {movie.vote_average?.toFixed(1)}</span>
        <span>{movie.release_date?.slice(0, 4)}</span>
        <span>{movie.original_language?.toUpperCase()}</span>
      </div>
    </div>
  );
};

export default HeroMovieDetails;
