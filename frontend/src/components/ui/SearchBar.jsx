import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { motion } from 'framer-motion';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          className="w-full bg-primary-card text-white placeholder-gray-400 rounded-full px-6 py-4 pl-14 focus:outline-none focus:ring-2 focus:ring-primary-accent text-lg"
        />
        <FiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-accent hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold transition-colors"
        >
          Search
        </button>
      </div>
    </motion.form>
  );
};

export default SearchBar;
