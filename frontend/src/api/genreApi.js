import axios from "axios";

export const fetchGenres = async () => {
  const res = await axios.get("/api/tmdb/genres");
  return res.data?.genres || [];
};
