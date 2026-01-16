import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import GenreBadge from './GenreBadge';

const FilterPanel = ({ genres, selectedGenres, onGenreToggle, years, selectedYear, onYearChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-primary-card rounded-xl p-6 sticky top-20"
    >
      <h3 className="text-white font-bold text-xl mb-4">Filters</h3>

      <div className="mb-6">
        <h4 className="text-gray-300 font-semibold mb-3">Genres</h4>
        <div className="flex flex-wrap gap-2">
          {genres?.map((genre) => (
            <button
              key={genre.id}
              onClick={() => onGenreToggle(genre.id)}
              className={`${
                selectedGenres.includes(genre.id)
                  ? 'bg-primary-accent'
                  : 'bg-white/10 hover:bg-white/20'
              } transition-colors`}
            >
              <GenreBadge genre={genre.name} />
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-gray-300 font-semibold mb-3">Release Year</h4>
        <select
          value={selectedYear}
          onChange={(e) => onYearChange(e.target.value)}
          className="w-full bg-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-accent"
        >
          <option value="">All Years</option>
          {years?.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </motion.div>
  );
};

FilterPanel.propTypes = {
  genres: PropTypes.array,
  selectedGenres: PropTypes.array,
  onGenreToggle: PropTypes.func,
  years: PropTypes.array,
  selectedYear: PropTypes.string,
  onYearChange: PropTypes.func
};

export default FilterPanel;
