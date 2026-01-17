import { getPosterUrl } from "../../../utils/imageHelper";

const HeroPosterCard = ({ movie }) => {
  return (
    <div className="group relative h-[260px] rounded-xl overflow-hidden bg-gray-900 cursor-pointer">
      <img
        src={getPosterUrl(movie.poster_path)}
        alt={movie.title || movie.name}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

export default HeroPosterCard;
