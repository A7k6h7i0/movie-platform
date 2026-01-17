import { Link } from "react-router-dom";
import { getBackdropUrl } from "../../../utils/imageHelper";
import RatingBadge from "../RatingBadge";
import { ROUTES } from "../../../utils/constants";

const HeroFeaturedCard = ({ movie }) => {
  return (
    <div
      className="relative h-[260px] rounded-xl overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url(${getBackdropUrl(movie.backdrop_path)})`,
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

      <div className="relative z-10 p-6 h-full flex flex-col justify-end">
        <h2 className="text-3xl font-bold text-white mb-2">
          {movie.title || movie.name}
        </h2>

        <div className="flex items-center gap-3 mb-3">
          <RatingBadge rating={movie.vote_average} />
          <span className="text-gray-300 text-sm">
            {new Date(
              movie.release_date || movie.first_air_date
            ).getFullYear()}
          </span>
        </div>

        <p className="text-gray-300 text-sm line-clamp-2 mb-4">
          {movie.overview}
        </p>

        <div className="flex gap-3">
          <Link
            to={ROUTES.movieDetail(movie.id, movie.title || movie.name)}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium"
          >
            View Details
          </Link>

          <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-md text-sm">
            Watch Trailer
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroFeaturedCard;
