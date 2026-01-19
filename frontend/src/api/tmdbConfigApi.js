import axios from "axios";

export const fetchLanguages = async () => {
  const res = await axios.get("/api/config/languages");

  // Normalize backend response to ARRAY ONLY
  if (Array.isArray(res.data)) {
    return res.data;
  }

  if (Array.isArray(res.data?.languages)) {
    return res.data.languages;
  }

  if (Array.isArray(res.data?.data)) {
    return res.data.data;
  }

  return [];
};
