import NodeCache from 'node-cache';

const cache = new NodeCache({
  stdTTL: 600,
  checkperiod: 120,
  useClones: false
});

export const cacheService = {
  get: (key) => {
    return cache.get(key);
  },

  set: (key, value, ttl) => {
    return cache.set(key, value, ttl || 600);
  },

  del: (key) => {
    return cache.del(key);
  },

  flush: () => {
    return cache.flushAll();
  },

  keys: () => {
    return cache.keys();
  },

  stats: () => {
    return cache.getStats();
  }
};
