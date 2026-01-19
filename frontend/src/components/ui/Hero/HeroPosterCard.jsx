const HeroPosterCard = ({ movie }) => {
  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden bg-zinc-900">
      <img
        src={`https://image.tmdb.org/t/p/w342${movie?.poster_path}`}
        alt={movie?.title}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

export default HeroPosterCard;
