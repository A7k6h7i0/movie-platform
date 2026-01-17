import { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import HeroFeaturedCard from "./HeroFeaturedCard";
import HeroPosterCard from "./HeroPosterCard";

const CARD_ACTIVE = 420;
const CARD_SMALL = 180;
const GAP = 24;

const HeroRow = ({ movies }) => {
  const rowRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // triple array for bi-directional infinite scroll
  const loopMovies = [...movies, ...movies, ...movies];
  const middleStartIndex = movies.length;

  useEffect(() => {
    const container = rowRef.current;
    if (!container) return;

    // start from middle set
    const cardWidth = CARD_ACTIVE + GAP;
    container.scrollLeft = middleStartIndex * cardWidth;
     setActiveIndex(0);

  }, [movies.length]);

  const handleScroll = () => {
  const container = rowRef.current;
  if (!container) return;

  const cardWidth = CARD_ACTIVE + GAP;
  const scrollLeft = container.scrollLeft;

  const rawIndex = Math.round(scrollLeft / cardWidth);
  const normalizedIndex =
    (rawIndex - middleStartIndex + movies.length) % movies.length;

  setActiveIndex(normalizedIndex);

  const middleWidth = movies.length * cardWidth;
  const totalWidth = loopMovies.length * cardWidth;

  // Left edge → jump right
  if (scrollLeft <= middleWidth * 0.5) {
    container.scrollLeft = scrollLeft + middleWidth;
  }

  // Right edge → jump left
  if (scrollLeft >= totalWidth - middleWidth * 1.5) {
    container.scrollLeft = scrollLeft - middleWidth;
  }
};



  return (
    <section className="relative w-full bg-black pt-20">
      <div
        ref={rowRef}
        onScroll={handleScroll}
        className="flex gap-6 overflow-x-auto px-10 snap-x snap-mandatory scrollbar-hide"
      >
        {loopMovies.map((movie, index) => {
          const isActive = index % movies.length === activeIndex;

          return (
            <div
              key={`${movie.id}-${index}`}
              className="snap-start flex-shrink-0"
              style={{
                width: isActive ? CARD_ACTIVE : CARD_SMALL,
                transition: "all 0.4s ease",
              }}
            >
              {isActive ? (
                <HeroFeaturedCard movie={movie} />
              ) : (
                <HeroPosterCard movie={movie} />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

HeroRow.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default HeroRow;
