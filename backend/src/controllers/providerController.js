import { tmdbService } from '../services/tmdbService.js';

export const providerController = {
  async getProviders(req, res, next) {
    try {
      const { id } = req.params;
      const data = await tmdbService.getProviders(id);
      res.json({
        success: true,
        data
      });
    } catch (error) {
      next(error);
    }
  },

  async getGenres(req, res, next) {
    try {
      const data = await tmdbService.getGenres();
      res.json({
        success: true,
        data
      });
    } catch (error) {
      next(error);
    }
  }
};
