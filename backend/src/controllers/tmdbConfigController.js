import axios from "axios";

const TMDB_BASE = "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_API_KEY;

let cachedLanguages = null;

export const getLanguages = async (req, res) => {
  try {
    if (cachedLanguages) {
      return res.json(cachedLanguages);
    }

    const response = await axios.get(
      `${TMDB_BASE}/configuration/languages`,
      { params: { api_key: API_KEY } }
    );

    cachedLanguages = response.data;
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch languages" });
  }
};
