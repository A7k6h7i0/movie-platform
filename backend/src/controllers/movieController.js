import { tmdbService } from '../services/tmdbService.js';

export const movieController = {
  async getTrending(req, res, next) {
    try {
      const { page = 1 } = req.query;
      const data = await tmdbService.getTrending(parseInt(page));
      res.json({
        success: true,
        data
      });
    } catch (error) {
      next(error);
    }
  },

  async getPopular(req, res, next) {
    try {
      const { page = 1 } = req.query;
      const data = await tmdbService.getPopular(parseInt(page));
      res.json({
        success: true,
        data
      });
    } catch (error) {
      next(error);
    }
  },

  async getTopRated(req, res, next) {
    try {
      const { page = 1 } = req.query;
      const data = await tmdbService.getTopRated(parseInt(page));
      res.json({
        success: true,
        data
      });
    } catch (error) {
      next(error);
    }
  },

  async getUpcoming(req, res, next) {
    try {
      const { page = 1 } = req.query;
      const data = await tmdbService.getUpcoming(parseInt(page));
      res.json({
        success: true,
        data
      });
    } catch (error) {
      next(error);
    }
  },

  async getMovieDetail(req, res, next) {
    try {
      const { id } = req.params;
      const data = await tmdbService.getMovieDetail(id);
      res.json({
        success: true,
        data
      });
    } catch (error) {
      next(error);
    }
  },

  async searchMovies(req, res, next) {
    try {
      const { query, page = 1 } = req.query;
      
      if (!query) {
        return res.status(400).json({
          success: false,
          message: 'Search query is required'
        });
      }

      const data = await tmdbService.searchMovies(query, parseInt(page));
      res.json({
        success: true,
        data
      });
    } catch (error) {
      next(error);
    }
  }
};
