import { justWatchAxios } from '../config/justwatch.js';
import { cacheService } from './cacheService.js';

const CACHE_DURATION = 86400; // 24 hours

export const justWatchService = {
  async getProviders(tmdbId) {
    const cacheKey = `jw_providers_${tmdbId}`;
    const cached = cacheService.get(cacheKey);
    if (cached) return cached;

    try {
      // JustWatch uses locale, default to US/en
      const locale = 'en_US';
      const response = await justWatchAxios.get(`/titles/movie/${tmdbId}/locale/${locale}`);

      // Extract offers (streaming, rental, purchase)
      const data = {
        results: {
          [locale]: {
            flatrate: [], // streaming
            rent: [],
            buy: []
          }
        }
      };

      if (response.data && response.data.offers) {
        response.data.offers.forEach(offer => {
          const provider = {
            provider_id: offer.provider_id,
            provider_name: offer.provider_name || 'Unknown',
            logo_path: offer.provider_logo_path || null,
            display_priority: offer.display_priority || 0,
            url: offer.urls?.standard_web || null // direct link
          };

          if (offer.monetization_type === 'flatrate') {
            data.results[locale].flatrate.push(provider);
          } else if (offer.monetization_type === 'rent') {
            data.results[locale].rent.push(provider);
          } else if (offer.monetization_type === 'buy') {
            data.results[locale].buy.push(provider);
          }
        });
      }

      cacheService.set(cacheKey, data, CACHE_DURATION);
      return data;
    } catch (error) {
      console.error('JustWatch API error:', error.message);
      // Fallback to empty data
      return {
        results: {
          en_US: {
            flatrate: [],
            rent: [],
            buy: []
          }
        }
      };
    }
  }
};