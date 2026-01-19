import axios from "axios";

export const browseMovies = async ({ language, genre, year }) => {
  const res = await axios.get("/api/movies/browse", {
    params: {
      with_original_language: language,
      with_genres: genre,
      year,
    },
  });

  return res.data?.data?.results || [];
};
