import { useEffect, useState, useRef } from "react";
import { fetchMovieDetail } from "../../../api/tmdb";

const HeroFeaturedCard = ({ movie, autoplay = false }) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    const fetchTrailer = async () => {
      if (!movie?.id || !autoplay) {
        setTrailerKey(null);
        return;
      }

      try {
        const data = await fetchMovieDetail(movie.id);
        if (!mounted) return;

        const trailer = data?.videos?.results?.find(
          (v) => v.site === "YouTube" && v.type === "Trailer"
        );

        setTrailerKey(trailer?.key || null);
        setIsMuted(true);
      } catch {
        if (mounted) setTrailerKey(null);
      }
    };

    fetchTrailer();
    return () => {
      mounted = false;
    };
  }, [movie?.id, autoplay]);

  const toggleMute = () => {
    if (!iframeRef.current) return;

    const iframe = iframeRef.current;
    const src = iframe.src;

    if (isMuted) {
      iframe.src = src.replace("mute=1", "mute=0");
    } else {
      iframe.src = src.replace("mute=0", "mute=1");
    }

    setIsMuted(!isMuted);
  };

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden bg-black">
      {trailerKey ? (
        <iframe
          ref={iframeRef}
          key={trailerKey}
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerKey}&modestbranding=1&rel=0&playsinline=1&cc_load_policy=1&cc_lang_pref=en&hl=en`}
          allow="autoplay; encrypted-media"
          allowFullScreen={false}
        />
      ) : (
        <img
          src={`https://image.tmdb.org/t/p/w780${movie?.backdrop_path}`}
          alt={movie?.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />

      {/* MOVIE TITLE ONLY (TEXT REMOVED AS REQUESTED) */}
      <div className="absolute bottom-5 left-5 z-20">
        <h1 className="text-white text-xl md:text-2xl font-bold tracking-tight">
          {movie?.title}
        </h1>
      </div>

      {/* 🔊 MUTE / UNMUTE BUTTON */}
      {trailerKey && (
        <button
          onClick={toggleMute}
          className="absolute bottom-5 right-5 z-20 w-10 h-10 rounded-full bg-black/60 backdrop-blur flex items-center justify-center text-white hover:bg-black/80 transition"
          aria-label={isMuted ? "Unmute trailer" : "Mute trailer"}
        >
          {isMuted ? "🔇" : "🔊"}
        </button>
      )}
    </div>
  );
};

export default HeroFeaturedCard;
