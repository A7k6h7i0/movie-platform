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

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [movies]);

  const featuredMovie = movies?.[featuredIndex] ?? null;

  return (
    <section className="relative min-h-screen w-full bg-black">
      {/* GRADIENTS */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 z-10" />

      <div className="relative z-20 pt-4 pb-6">
        <div className="w-full px-4 md:px-8 lg:px-16 flex gap-6 items-start">

          {/* FEATURED CARD */}
          {featuredMovie && (
            <div className="flex-none">
              <motion.div
                className="rounded-lg overflow-hidden border-2 border-white
                           h-[250px] md:h-[300px]
                           w-[360px] md:w-[500px]"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <HeroFeaturedCard movie={featuredMovie} autoplay />
              </motion.div>

              <HeroMovieDetails movie={featuredMovie} />
            </div>
          )}

          {/* SCROLLER — FIXED */}
          <div
            ref={scrollRef}
            className="
              flex gap-6 pb-4
              overflow-x-auto
              touch-pan-x
              overscroll-x-contain
              scroll-smooth
              hide-scrollbar
            "
          >
            {movies?.map((movie) => (
              <motion.div
                key={movie.id}
                className="flex-none w-[170px] h-[250px] md:w-[200px] md:h-[300px]"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
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
