import { TMDB_IMAGE_BASE_URL, IMAGE_SIZES } from './constants';

// Use TMDB images directly to avoid external proxy DNS issues

export const getImageUrl = (path, type = 'poster', size = 'medium') => {
  if (!path) return '/no-poster.svg';
  
  const sizeMap = IMAGE_SIZES[type];
  const selectedSize = sizeMap?.[size] || sizeMap?.medium || 'w500';
  
  const originalUrl = `${TMDB_IMAGE_BASE_URL}/${selectedSize}${path}`;
  return originalUrl;
};

export const getPosterUrl = (path, size = 'medium') => {
  if (!path) return '/no-poster.svg';
  return getImageUrl(path, 'poster', size);
};

export const getBackdropUrl = (path, size = 'large') => {
  if (!path) return '/no-poster.svg';
  return getImageUrl(path, 'backdrop', size);
};

export const getProfileUrl = (path, size = 'medium') => {
  if (!path) return '/no-poster.svg';
  return getImageUrl(path, 'profile', size);
};

export const getOptimizedImageUrl = (path, width) => {
  if (!path) return '/no-poster.svg';
  const originalUrl = `${TMDB_IMAGE_BASE_URL}/w${width}${path}`;
  return originalUrl;
};
