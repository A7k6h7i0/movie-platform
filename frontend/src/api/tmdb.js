import axios from 'axios';

const TMDB_API_KEY = '2eb7e6955f3065e47a7386acfd6b396a';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Helper to add API key to params
const addApiKey = (params = {}) => ({
  ...params,
  api_key: TMDB_API_KEY
});

// Direct TMDB API call (works in production with proper CORS headers)
const makeDirectRequest = async (endpoint, params = {}) => {
  const url = `${TMDB_BASE_URL}${endpoint}`;
  const response = await axios.get(url, { 
    params: addApiKey(params),
    timeout: 15000 
  });
  return response.data;
};

// Using multiple CORS proxies with fallback for development
const CORS_PROXIES = [
  { url: 'https://corsproxy.io/?', encode: true },
  { url: 'https://api.allorigins.win/raw?url=', encode: true },
  { url: 'https://proxy.cors.sh/', encode: false, headers: { 'x-cors-api-key': 'temp_' } }
];

// Helper function to make request with proxy fallback
const makeProxiedRequest = async (endpoint, params = {}, retryCount = 0) => {
  const queryString = new URLSearchParams(addApiKey(params)).toString();
  const fullUrl = `${TMDB_BASE_URL}${endpoint}?${queryString}`;
  
  // First try direct request (works in production)
  if (retryCount === 0) {
    try {
      const response = await axios.get(fullUrl, { timeout: 10000 });
      return response.data;
    } catch (directError) {
      // If direct fails, try proxies
      console.log('Direct request failed, trying proxies...');
    }
  }
  
  const proxyIndex = retryCount % CORS_PROXIES.length;
  const proxy = CORS_PROXIES[proxyIndex];
  
  let proxyUrl;
  if (proxy.encode) {
    proxyUrl = `${proxy.url}${encodeURIComponent(fullUrl)}`;
  } else {
    proxyUrl = `${proxy.url}${fullUrl}`;
  }
  
  try {
    const config = { timeout: 15000 };
    if (proxy.headers) {
      config.headers = proxy.headers;
    }
    const response = await axios.get(proxyUrl, config);
    return response.data;
  } catch (error) {
    // Try next proxy if available
    if (retryCount < CORS_PROXIES.length) {
      console.log(`Proxy ${proxy.url} failed, trying next...`);
      return makeProxiedRequest(endpoint, params, retryCount + 1);
    }
    throw error;
  }
};

// Fetch trending movies
export const fetchTrendingMovies = async (page = 1) => {
  return makeProxiedRequest('/trending/movie/week', { page });
};

// Fetch popular movies
export const fetchPopularMovies = async (page = 1) => {
  return makeProxiedRequest('/movie/popular', { page });
};

// Fetch top rated movies
export const fetchTopRatedMovies = async (page = 1) => {
  return makeProxiedRequest('/movie/top_rated', { page });
};

// Fetch upcoming movies
export const fetchUpcomingMovies = async (page = 1) => {
  return makeProxiedRequest('/movie/upcoming', { page });
};

// Fetch movie details
export const fetchMovieDetail = async (id) => {
  return makeProxiedRequest(`/movie/${id}`, { 
    append_to_response: 'credits,videos,similar,recommendations' 
  });
};

// Search movies
export const searchMovies = async (query, page = 1) => {
  return makeProxiedRequest('/search/movie', { query, page });
};

// Discover movies with filters (year, genre, provider)
export const discoverMovies = async ({ page = 1, year, genre, provider, language } = {}) => {
  const params = { page, sort_by: 'popularity.desc' };
  
  if (year) {
    params.primary_release_year = year;
  }
  if (genre) {
    params.with_genres = genre;
  }
  if (provider) {
    params.with_watch_providers = provider;
    params.watch_region = 'IN'; // Default to India
  }
  if (language) {
    // TMDB discover supports with_original_language (ISO 639-1 code)
    params.with_original_language = language;
  }
  
  return makeProxiedRequest('/discover/movie', params);
};

// Fetch available watch providers
export const fetchWatchProviders = async () => {
  return makeProxiedRequest('/watch/providers/movie', { watch_region: 'IN' });
};

// Fetch movie providers (OTT platforms)
export const fetchMovieProviders = async (id) => {
  return makeProxiedRequest(`/movie/${id}/watch/providers`, {});
};

// Fetch genres
export const fetchGenres = async () => {
  return makeProxiedRequest('/genre/movie/list', {});
};

export default { makeProxiedRequest };
