import { tmdbAxios } from '../config/tmdb.js';
import { cacheService } from './cacheService.js';

const CACHE_DURATION = {
  trending: 21600,
  popular: 43200,
  topRated: 86400,
  upcoming: 43200,
  movieDetail: 86400,
  search: 3600
};

export const tmdbService = {
  async getTrending(page = 1) {
    const cacheKey = `trending_${page}`;
    const cached = cacheService.get(cacheKey);
    if (cached) return cached;

    const data = await tmdbAxios.get('/trending/movie/week', { params: { page } });
    cacheService.set(cacheKey, data, CACHE_DURATION.trending);
    return data;
  },

  async getPopular(page = 1) {
    const cacheKey = `popular_${page}`;
    const cached = cacheService.get(cacheKey);
    if (cached) return cached;

    const data = await tmdbAxios.get('/movie/popular', { params: { page } });
    cacheService.set(cacheKey, data, CACHE_DURATION.popular);
    return data;
  },

  async getTopRated(page = 1) {
    const cacheKey = `topRated_${page}`;
    const cached = cacheService.get(cacheKey);
    if (cached) return cached;

    const data = await tmdbAxios.get('/movie/top_rated', { params: { page } });
    cacheService.set(cacheKey, data, CACHE_DURATION.topRated);
    return data;
  },

  async getUpcoming(page = 1) {
    const cacheKey = `upcoming_${page}`;
    const cached = cacheService.get(cacheKey);
    if (cached) return cached;

    const data = await tmdbAxios.get('/movie/upcoming', { params: { page } });
    cacheService.set(cacheKey, data, CACHE_DURATION.upcoming);
    return data;
  },

  async getMovieDetail(id) {
    const cacheKey = `movie_${id}`;
    const cached = cacheService.get(cacheKey);
    if (cached) return cached;

    const data = await tmdbAxios.get(`/movie/${id}`, {
      params: {
        append_to_response: 'credits,videos,similar,recommendations'
      }
    });
    cacheService.set(cacheKey, data, CACHE_DURATION.movieDetail);
    return data;
  },

  async searchMovies(query, page = 1) {
    const cacheKey = `search_${query}_${page}`;
    const cached = cacheService.get(cacheKey);
    if (cached) return cached;

    const data = await tmdbAxios.get('/search/movie', {
      params: { query, page }
    });
    cacheService.set(cacheKey, data, CACHE_DURATION.search);
    return data;
  },

  async getProviders(id) {
    const cacheKey = `providers_${id}`;
    const cached = cacheService.get(cacheKey);
    if (cached) return cached;

    const data = await tmdbAxios.get(`/movie/${id}/watch/providers`);
    cacheService.set(cacheKey, data, CACHE_DURATION.movieDetail);
    return data;
  },

  async getGenres() {
    const cacheKey = 'genres';
    const cached = cacheService.get(cacheKey);
    if (cached) return cached;

    const data = await tmdbAxios.get('/genre/movie/list');
    cacheService.set(cacheKey, data, 86400 * 7);
    return data;
  }
};
