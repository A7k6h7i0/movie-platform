export const ENDPOINTS = {
  trending: '/movies/trending',
  popular: '/movies/popular',
  topRated: '/movies/top-rated',
  upcoming: '/movies/upcoming',
  movieDetail: (id) => `/movies/${id}`,
  search: '/movies/search',
  providers: (id) => `/providers/${id}`,
  genres: '/genres'
};
