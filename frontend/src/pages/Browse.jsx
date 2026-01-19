import { useEffect, useState } from "react";
import BrowseHeader from "../components/browse/BrowseHeader";
import BrowseRow from "../components/browse/BrowseRow";
import { browseMovies } from "../api/browseApi";
import { fetchGenres } from "../api/genreApi";
import { fetchLanguages } from "../api/tmdbConfigApi";

const Browse = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([
    { iso_639_1: 'en', english_name: 'English' },
    { iso_639_1: 'es', english_name: 'Spanish' },
    { iso_639_1: 'fr', english_name: 'French' },
    { iso_639_1: 'de', english_name: 'German' },
    { iso_639_1: 'it', english_name: 'Italian' },
    { iso_639_1: 'pt', english_name: 'Portuguese' },
    { iso_639_1: 'ru', english_name: 'Russian' },
    { iso_639_1: 'ja', english_name: 'Japanese' },
    { iso_639_1: 'ko', english_name: 'Korean' },
    { iso_639_1: 'zh', english_name: 'Chinese' },
    { iso_639_1: 'hi', english_name: 'Hindi' },
    { iso_639_1: 'ar', english_name: 'Arabic' },
  ]);

  const [filters, setFilters] = useState({
    language: "",
    english: "",
    recommendations: "",
  });

  useEffect(() => {
    fetchGenres().then(setGenres);
    fetchLanguages().then(setLanguages);

    // ✅ Netflix behavior: load movies immediately
    loadMovies({});
  }, []);

  const loadMovies = async (params) => {
    let data;
    if (params.recommendations === 'trending') {
      // Load trending movies via backend
      const response = await fetch('/api/movies/trending');
      const result = await response.json();
      data = result.data?.results || [];
    } else {
      // Use browse API with filters
      const browseParams = { ...params };
      if (params.english === 'en') {
        browseParams.language = 'en';
      }
      delete browseParams.english;
      delete browseParams.recommendations;
      data = await browseMovies(browseParams);
    }
    setMovies(Array.isArray(data) ? data : []);
  };

  const handleFilterChange = (key, value) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    loadMovies(updated);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <BrowseHeader
        genres={genres}
        languages={languages}
        filters={filters}
        onChange={handleFilterChange}
      />

      <div className="px-12 mt-6">
        <BrowseRow title="" movies={movies} />
      </div>
    </div>
  );
};

export default Browse;
