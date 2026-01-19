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
    setFeaturedIndex(Math.min(Math.max(index, 0), movies.length - 1));
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [movies]);

  const featuredMovie = movies?.[featuredIndex] ?? null;

  return (
    <section className="relative min-h-[85vh] bg-black">
      {/* GRADIENTS */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 z-10" />

      <div className="relative z-20 pt-3 pb-2">
        <div className="px-4 md:px-8 lg:px-16 flex gap-6 items-start">

          {/* FEATURED */}
          {featuredMovie && (
            <div className="flex-none max-w-full">
              <motion.div
                className="rounded-lg overflow-hidden border-2 border-white
                           h-[230px] md:h-[300px]
                           w-[340px] md:w-[500px]"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
              >
                <HeroFeaturedCard movie={featuredMovie} autoplay />
              </motion.div>

              <HeroMovieDetails movie={featuredMovie} />
            </div>
          )}

          {/* SCROLLER (MOBILE FIXED) */}
          <div
            ref={scrollRef}
            className="
              flex gap-4
              overflow-x-auto
              scroll-smooth
              hide-scrollbar
              touch-pan-x
            "
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {movies?.map(movie => (
              <motion.div
                key={movie.id}
                className="flex-none w-[160px] h-[230px] md:w-[200px] md:h-[300px]"
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
