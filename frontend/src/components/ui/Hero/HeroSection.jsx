import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import HeroFeaturedCard from "./HeroFeaturedCard";
import HeroPosterCard from "./HeroPosterCard";
import HeroMovieDetails from "./HeroMovieDetails";

const HeroSection = ({ movies }) => {
  const scrollRef = useRef(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container || !movies?.length) return;

    const itemWidth = 180;
    const gap = 24;
    const index = Math.round(container.scrollLeft / (itemWidth + gap));

    setFeaturedIndex(
      Math.min(Math.max(index, 0), movies.length - 1)
    );
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [movies]);

  const featuredMovie =
    Array.isArray(movies) && movies.length > 0
      ? movies[featuredIndex]
      : null;

  return (
    <section className="relative h-[92vh] w-full overflow-hidden bg-black">
      {/* GRADIENT OVERLAYS */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 z-10" />

      <div className="relative z-20 h-full flex items-start pt-6">
        {/* ⬆️ moved slightly closer to navbar */}
        <div className="w-full px-4 md:px-8 lg:px-16 flex gap-6 items-start">

          {/* FEATURED CARD + DETAILS */}
          {featuredMovie && (
            <div className="flex-none">
              <motion.div
                className="
                  rounded-lg overflow-hidden border-2 border-white
                  h-[270px]
                  md:h-[300px]
                  w-[420px]
                  md:w-[500px]
                "
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <HeroFeaturedCard movie={featuredMovie} autoplay />
              </motion.div>

              {/* 🔥 AUTO-SYNC MOVIE DETAILS */}
              <HeroMovieDetails movie={featuredMovie} />
            </div>
          )}

          {/* POSTER SCROLLER */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto hide-scrollbar gap-6 pb-4 scroll-smooth"
            style={{
              scrollSnapType: "x mandatory",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {movies?.map((movie) => (
              <motion.div
                key={movie.id}
                className="flex-none rounded-lg overflow-hidden w-[180px] h-[270px] md:w-[200px] md:h-[300px]"
                style={{ scrollSnapAlign: "start" }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <HeroPosterCard movie={movie} />
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
