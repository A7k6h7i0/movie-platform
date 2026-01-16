import { cacheService } from '../services/cacheService.js';

export const cacheMiddleware = (duration = 600) => {
  return (req, res, next) => {
    const key = `${req.method}_${req.originalUrl}`;
    const cached = cacheService.get(key);

    if (cached) {
      return res.json(cached);
    }

    const originalJson = res.json.bind(res);
    res.json = (data) => {
      cacheService.set(key, data, duration);
      return originalJson(data);
    };

    next();
  };
};
